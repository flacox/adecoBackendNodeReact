import express from "express";
import db from "../db.js";

const router = express.Router();

// listas los gastos
router.get("/", (req, res) => {
  const expensesListAll = `
        SELECT 
                e.id,
                c.nombre AS condominio,
                e.description,
                e.amount,
                e.payment_source_type,
                CASE 
                    WHEN e.payment_source_type = 'BANK_ACCOUNT' THEN 
                        CONCAT( b.name, ' - ', ba.account_number)
                    WHEN e.payment_source_type = 'PETTY_CASH' THEN 
                        CONCAT('Caja chica - ', c.nombre)
                    ELSE 
                        'N/A'
                END AS payment_source,
                e.date,
                e.created_at
            FROM 
                expenses e
            INNER JOIN 
                condominios c ON e.condo_id = c.condo_id
            LEFT JOIN 
                bank_accounts ba 
                ON e.payment_source_type = 'BANK_ACCOUNT' AND e.payment_source_id = ba.id_account
            LEFT JOIN 
                banks b 
                ON ba.id_bank = b.id_bank
            ORDER BY 
                e.date DESC;`;

  db.query(expensesListAll, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un gasto nuevo y actualizar la fuente
router.post("/", (req, res) => {
  const {
    condo_id,
    description,
    amount,
    payment_source_type,
    payment_source_id,
    date,
  } = req.body;

  // validacion de los campos
  if (
    !condo_id ||
    !description ||
    !amount ||
    !payment_source_type ||
    !payment_source_id ||
    !date
  ) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const insertExpense = `
        INSERT INTO expenses (condo_id, description, amount, payment_source_type, payment_source_id, date) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    insertExpense,
    [
      condo_id,
      description,
      amount,
      payment_source_type,
      payment_source_id,
      date,
    ],
    (err, result) => {
      if (err) {
        return db.rollback(() => res.status(500).json(err));
      }

      // actualizacion del balance de la cuenta utilizada
      let updateBalanceSQL;
      if (payment_source_type === "PETTY_CASH") {
        updateBalanceSQL =
          "UPDATE petty_cash SET current_balance = current_balance - ? WHERE id_petty_cash = ?";
      } else if (payment_source_type === "BANK_ACCOUNT") {
        updateBalanceSQL =
          "UPDATE bank_accounts SET balance = balance - ? WHERE id_account = ?";
      }

      db.query(updateBalanceSQL, [amount, payment_source_id], (err2) => {
        if (err2) return db.rollback(() => res.status(500).json(err2));
      });

      res.json({ id: result.id, message: "Gasto registrado correctamente" });
    }
  );
});

export default router;
