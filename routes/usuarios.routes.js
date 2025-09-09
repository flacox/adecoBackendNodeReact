import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nombre, email, tel, rol, password } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre, email, tel, rol, password) VALUES (?, ?, ?, ?, ?)",
    [nombre, email, tel, rol, password],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nombre, email, tel, rol, password });
    }
  );
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM usuarios WHERE user_id = ?", [id], (err, result) => {
    if(err) res.status(500).json(err);
    res.json({message: "Usuario eliminado correctamente"});
  });
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM usuarios WHERE user_id = ?", [id], (err, result) => {
    if(err) res.status(500).json(err);
    res.json(result);
  });
});

router.put("/:id", (req, res) => {
  const {id} = req.params;
  const {nombre, email, tel, rol, password} = req.body;
  db.query("UPDATE usuarios SET nombre=?, email=?, tel=?, rol=?, password=? WHERE user_id=?", [nombre, email, tel, rol, password, id], (err, result) => {
    if(err) res.status(500).json(err);
    res.json({message: "Usuario actualizado correctamente"});
  });

});

export default router;