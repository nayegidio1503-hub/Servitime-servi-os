import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { Empresa, Servico } from "../models.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "server", "uploads", "contracts");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // add timestamp to avoid collisions
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const resolveContractPath = (filename) => `/uploads/contracts/${filename}`;

// Convert a stored contract URL to a filesystem path for deletion
const getContractFsPath = (contractPath) => {
  const relative = contractPath.startsWith("/") ? contractPath.slice(1) : contractPath;
  return path.join(process.cwd(), "server", relative);
};

router.get("/", async (req, res) => {
  const empresas = await Empresa.findAll({ include: [{ model: Servico, as: "servicos" }] });
  res.json(empresas);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const empresa = await Empresa.findByPk(id, { include: [{ model: Servico, as: "servicos" }] });
  if (!empresa) {
    return res.status(404).json({ message: "Empresa não encontrada" });
  }
  res.json(empresa);
});

router.post("/", upload.single("contrato"), async (req, res) => {
  const { nome, endereco, telefone, telefoneFixo, cep, cnpj, tempoContrato, servicos } = req.body;
  const servicosIds = Array.isArray(servicos) ? servicos.map(Number) : servicos ? [Number(servicos)] : [];

  const contratoPath = req.file ? resolveContractPath(req.file.filename) : null;

  const empresa = await Empresa.create({
    nome,
    endereco,
    telefone,
    telefoneFixo: telefoneFixo || null,
    cep: cep || null,
    cnpj,
    tempoContrato,
    contratoPath,
  });

  if (servicosIds.length) {
    const atuais = await Servico.findAll({ where: { id: servicosIds } });
    await empresa.setServicos(atuais);
  }

  const created = await Empresa.findByPk(empresa.id, { include: [{ model: Servico, as: "servicos" }] });
  res.status(201).json(created);
});

router.put("/:id", upload.single("contrato"), async (req, res) => {
  const id = Number(req.params.id);
  const empresa = await Empresa.findByPk(id, { include: [{ model: Servico, as: "servicos" }] });
  if (!empresa) {
    return res.status(404).json({ message: "Empresa não encontrada" });
  }

  const { nome, endereco, telefone, telefoneFixo, cep, cnpj, tempoContrato, servicos } = req.body;
  const servicosIds = Array.isArray(servicos) ? servicos.map(Number) : servicos ? [Number(servicos)] : [];

  if (req.file) {
    // remove old contract file if exists
    if (empresa.contratoPath) {
      const existing = getContractFsPath(empresa.contratoPath);
      try {
        await fs.unlink(existing);
      } catch {
        // ignore failures
      }
    }
    empresa.contratoPath = resolveContractPath(req.file.filename);
  }

  empresa.nome = nome || empresa.nome;
  empresa.endereco = endereco || empresa.endereco;
  empresa.cep = cep || empresa.cep;
  empresa.telefone = telefone || empresa.telefone;
  empresa.telefoneFixo = telefoneFixo || empresa.telefoneFixo;
  empresa.cnpj = cnpj || empresa.cnpj;
  empresa.tempoContrato = tempoContrato || empresa.tempoContrato;

  await empresa.save();

  if (servicosIds.length) {
    const atuais = await Servico.findAll({ where: { id: servicosIds } });
    await empresa.setServicos(atuais);
  }

  const updated = await Empresa.findByPk(id, { include: [{ model: Servico, as: "servicos" }] });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const empresa = await Empresa.findByPk(id);
  if (!empresa) {
    return res.status(404).json({ message: "Empresa não encontrada" });
  }

  if (empresa.contratoPath) {
    const existing = getContractFsPath(empresa.contratoPath);
    try {
      await fs.unlink(existing);
    } catch {
      // ignore
    }
  }

  await empresa.destroy();

  res.json({ success: true });
});

export default router;
