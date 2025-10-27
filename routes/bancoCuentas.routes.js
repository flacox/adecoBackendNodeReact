import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  
const queryListAll = `
              SELECT 
              ba.id_account,
              ba.account_number,
              ba.account_type,
              ba.balance,
              ba.currency,
              ba.id_bank AS id_bank,
              b.name AS bank_name,
              ba.condo_id AS condo_id,
              c.nombre AS condo_nombre
              FROM bank_accounts AS ba
              INNER JOIN banks AS b ON ba.id_bank = b.id_bank
              LEFT JOIN condominios AS c ON ba.condo_id = c.condo_id;`

  db.query(queryListAll, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

router.post("/", (req, res) => {
  const { account_number, id_bank, account_type, balance, currency, condo_id } = req.body;
  db.query(
    "INSERT INTO bank_accounts (account_number, id_bank, account_type, balance, currency, condo_id) VALUES (?, ?, ?, ?, ?, ?)",
    [account_number, id_bank, account_type, balance, currency, condo_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.id_account,
        account_number,
        id_bank,
        account_type,
        balance,
        currency,
        condo_id,
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { account_number, id_bank, account_type, balance, currency, condo_id, } = req.body;
  db.query(
    "UPDATE bank_accounts SET account_number = ?, id_bank = ?, account_type = ?, balance = ?, currency = ?, condo_id = ? WHERE id_account = ?",
    [account_number, id_bank, account_type, balance, currency, condo_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Cuenta actualizada correctamente");
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM bank_accounts WHERE id_account = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Cuenta bancaria eliminada correctamente");
  });
});

export default router;
