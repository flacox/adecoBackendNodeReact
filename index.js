import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.routes.js";
import condominiosRoutes from "./routes/condominios.routes.js";
import unidadesRoutes from "./routes/unidades.router.js";
import bancosRoutes from "./routes/bancos.routes.js";
import bancoCuentasRoutes from "./routes/bancoCuentas.routes.js";
import homeRoutes from "./routes/home.routes.js";
import supplierRoutes from "./routes/suplidores.routes.js";
import ownerRoutes from "./routes/owners.routes.js";
import pettyCashRoutes from "./routes/pettyCash.routes.js";
import expesesRoutes from "./routes/expenses.routes.js";
 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/home", homeRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/condominios", condominiosRoutes);
app.use("/api/unidades", unidadesRoutes);
app.use("/api/bancos", bancosRoutes);
app.use("/api/cuentas", bancoCuentasRoutes);
app.use("/api/pettyCash", pettyCashRoutes);
app.use("/api/suplidores", supplierRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/expenses", expesesRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));