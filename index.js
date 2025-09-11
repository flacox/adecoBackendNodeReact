import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.routes.js";
import condominiosRoutes from "./routes/condominios.routes.js";
import unidadesRoutes from "./routes/unidades.router.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/condominios", condominiosRoutes);
app.use("/api/unidades", unidadesRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));