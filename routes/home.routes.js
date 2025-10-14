import express from "express";
import db from "../db.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   db.query("SELECT (SELECT COUNT(*) FROM condominios) AS total_condominios, (SELECT COUNT(*) FROM unidades) AS total_unidades, (SELECT COUNT(*) FROM usuarios WHERE rol = 'empleado') AS total_empleados, (SELECT SUM(balance) FROM bank_accounts WHERE account_type = 'Ahorro') AS total_balance",
//     (err, result) => {
//     if (err) return express.status(500).json(err);
//     res.json(result);
//   });
// });

router.get("/:condo_id", (req, res) => {
  const { condo_id } = req.params;
  // (SELECT COUNT(*) FROM usuarios WHERE rol = 'empleado' AND condo_id = ?) AS total_empleados,

  const query = `
    SELECT 
      (SELECT COUNT(*) FROM condominios) AS total_condominios,
      (SELECT COUNT(*) FROM unidades WHERE condo_id = ?) AS total_unidades,
      (SELECT COUNT(*) FROM usuarios WHERE rol = 'empleado') AS total_empleados,
      (SELECT SUM(balance) FROM bank_accounts WHERE condo_id = ?) AS total_balance
  `;

  db.query(query, [condo_id, condo_id], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});


export default router;
