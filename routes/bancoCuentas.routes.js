import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT ba.id_account, ba.account_number, ba.account_type, ba.balance, ba.currency, b.name AS bank_name FROM bank_accounts AS ba INNER JOIN banks AS b ON ba.id_bank = b.id_bank;",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

router.post("/", (req, res) => {
  const { account_number, id_bank, account_type, balance, currency } = req.body;
  db.query(
    "INSERT INTO bank_accounts (account_number, id_bank, account_type, balance, currency) VALUES (?, ?, ?, ?, ?)",
    [account_number, id_bank, account_type, balance, currency],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.id_account,
        account_number,
        id_bank,
        account_type,
        balance,
        currency,
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { account_number, id_bank, account_type, balance, currency } = req.body;
  db.query(
    "UPDATE bank_accounts SET account_number = ?, id_bank = ?, account_type = ?, balance = ?, currency = ? WHERE id_account = ?",
    [account_number, id_bank, account_type, balance, currency, id],
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
