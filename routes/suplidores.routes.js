import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM suppliers", (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const {company_name, contact_name, phone, email, address, rnc, service_type, status} = req.body;
    db.query("INSERT INTO suppliers (company_name, contact_name, phone, email, address, rnc, service_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [company_name, contact_name, phone, email, address, rnc, service_type, status],
        (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({
                id: result.supplier_id, company_name, contact_name, phone, email, address, rnc, service_type, status
            });
        }
    );
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM suppliers WHERE supplier_id = ?", [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json("supplier borrado correctamente");
    });
});

router.put("/:id", (req, res) => {
    const {id} = req. params;
    const {company_name, contact_name, phone, email, address, rnc, service_type, status} = req.body;
    db.query("UPDATE suppliers SET company_name = ?, contact_name = ?, phone = ?, email = ?, address = ?, rnc = ?, service_type = ?, status = ? WHERE supplier_id = ?",
        [company_name, contact_name, phone, email, address, rnc, service_type, status, id],
        (err) => {
            if(err) return res.status(500).json(err);
            res.json("supplier actualizado correctamente");
        }
    );
});

export default router;