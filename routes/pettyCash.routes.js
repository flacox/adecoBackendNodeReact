import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
                    SELECT 
                    pc.id_petty_cash,
                    c.nombre AS condominio,
                    pc.initial_balance,
                    pc.current_balance,
                    pc.created_at,
                    pc.updated_at
                FROM 
                    petty_cash pc
                INNER JOIN 
                    condominios c ON pc.condo_id = c.condo_id;
                `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { condo_id, initial_balance, current_balance } = req.body;
  db.query(
    "INSERT INTO petty_cash (condo_id, initial_balance, current_balance) VALUES (?, ?, ?)",
    [condo_id, initial_balance, current_balance],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.id_petty_cash,
        condo_id,
        initial_balance,
        current_balance,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM petty_cash WHERE id_petty_cash = ?", [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json("caja eliminada correctamente");
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { condo_id, initial_balance, current_balance } = req.body;
  db.query(
    "UPDATE petty_cash SET condo_id = ?, initial_balance = ?, current_balance = ? WHERE id_petty_cash = ?",
    [condo_id, initial_balance, current_balance, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("resgitro actualizado correctamente");
    }
  );
});

export default router;
