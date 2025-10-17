import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM owners", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { first_name, last_name, contact, email, address, balance } = req.body;
  db.query(
    "INSERT INTO owners (first_name, last_name, contact, email, address, balance) VALUES (?, ?, ?, ?, ?, ?)",
    [first_name, last_name, contact, email, address, balance],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.id_owner,
        first_name,
        last_name,
        contact,
        email,
        address,
        balance,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM owners WHERE id_owner = ?", [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json("registro eliminado correctamente");
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, contact, email, address, balance} = req.body;
    db.query("UPDATE owners SET first_name = ?, last_name = ?, contact = ?, email = ?, address = ?, balance = ? WHERE id_owner = ?",
        [first_name, last_name, contact, email, address, balance, id],
        (err) => {
            if(err) return res.status(500).json(err);
            res.json("Registro actualizado correctamente");
        }
    );
});

export default router;
