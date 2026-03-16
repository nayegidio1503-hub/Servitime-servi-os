import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { sequelize, Servico } from "./models.js";
import empresasRouter from "./routes/empresas.js";
import servicosRouter from "./routes/servicos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure upload directories exist to prevent multer errors
const uploadsDir = path.join(__dirname, "..", "uploads", "contracts");
fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded contract files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/servicos", servicosRouter);
app.use("/api/empresas", empresasRouter);

async function seed() {
  const existing = await Servico.count();
  if (existing > 0) return;

  const defaultServices = [
    "Limpeza",
    "Pós-Obra",
    "Portaria",
    "Controlador de Acesso",
    "Jardinagem",
    "Piscina",
    "Estofados",
    "Saúde",
    "Reformas",
  ];

  await Promise.all(defaultServices.map((nome) => Servico.create({ nome })));
  console.log("✨ Seeded default services");
}

const PORT = process.env.PORT || 3333;

sequelize
  .sync({ alter: true })
  .then(() => seed())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
