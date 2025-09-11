import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT u.*, c.nombre AS condominio FROM unidades u INNER JOIN condominios c ON u.condo_id = c.condo_id", (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { condo_id, numero, tipo, area, estado } = req.body;
    db.query("INSERT INTO unidades (condo_id, numero, tipo, area, estado) VALUES (?, ?, ?, ?, ?)", [condo_id, numero, tipo, area, estado], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({id: result.insertId, condo_id, numero, tipo, area, estado});
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM unidades WHERE unit_id = ?", [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({message: "Unidad eliminada correctamente"});
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {condo_id, numero, tipo, area, estado} = req.body;
    db.query("UPDATE unidades SET condo_id = ?, numero = ?, tipo = ?, area = ?, estado = ? WHERE unit_id = ?", [condo_id, numero, tipo, area, estado, id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({message: "Unidad actualizada correctamente"});
    });
});

export default router;