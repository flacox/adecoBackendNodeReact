import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
   db.query("SELECT * FROM banks", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post("/", (req, res) => {
  const { name, contact_name, contact, email, rnc, address } = req.body;
  db.query(
    "INSERT INTO banks (name, contact_name, contact, email, rnc, address) VALUES (?, ?, ?, ?, ?, ?)",
    [name, contact_name, contact, email, rnc, address],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.id_bank,
        name,
        contact_name,
        contact,
        email,
        rnc,
        address,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM banks WHERE id_bank = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Banco eliminado correctamente");
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, contact_name, contact, email, rnc, address } = req.body;
  db.query(
    "UPDATE banks SET name = ?, contact_name = ?, contact = ?, email = ?, rnc = ?, address = ? WHERE id_bank =?",
    [name, contact_name, contact, email, rnc, address, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Banco actualizado correctamente");
    }
  );
});

export default router;
