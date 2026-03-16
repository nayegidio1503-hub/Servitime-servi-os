import express from "express";
import { Servico } from "../models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Servico.findAll({ order: [["nome", "ASC"]] });
  res.json(services);
});

export default router;
