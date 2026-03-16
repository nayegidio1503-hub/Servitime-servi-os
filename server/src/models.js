import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false,
});

export const Empresa = sequelize.define(
  "Empresa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefoneFixo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tempoContrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contratoPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "empresas",
    timestamps: true,
  },
);

export const Servico = sequelize.define(
  "Servico",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "servicos",
    timestamps: false,
  },
);

export const EmpresaServico = sequelize.define(
  "EmpresaServico",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "empresa_servicos",
    timestamps: false,
  },
);

Empresa.belongsToMany(Servico, { through: EmpresaServico, as: "servicos" });
Servico.belongsToMany(Empresa, { through: EmpresaServico, as: "empresas" });
