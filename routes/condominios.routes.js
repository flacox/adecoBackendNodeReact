import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM condominios", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nombre, direccion, telefono, num_unidades } = req.body;
  db.query(
    "INSERT INTO condominios (nombre, direccion, telefono, num_unidades) VALUES (?, ?, ?, ?)",
    [nombre, direccion, telefono, num_unidades],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.usertId,
        nombre,
        direccion,
        telefono,
        num_unidades,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM condominios WHERE condo_id = ?", [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json("Condominio eliminado correctamente");
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, direccion, telefono, num_unidades} = req.body;
    db.query("UPDATE condominios SET nombre = ?, direccion = ?, telefono = ?, num_unidades = ? WHERE condo_id = ?", [nombre, direccion, telefono, num_unidades, id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({message: "Condominio actualizado correctamente"});
    });
});

export default router;
