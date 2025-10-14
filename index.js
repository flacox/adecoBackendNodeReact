import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.routes.js";
import condominiosRoutes from "./routes/condominios.routes.js";
import unidadesRoutes from "./routes/unidades.router.js";
import bancosRoutes from "./routes/bancos.routes.js";
import bancoCuentasRoutes from "./routes/bancoCuentas.routes.js";
import homeRoutes from "./routes/home.routes.js";

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

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));