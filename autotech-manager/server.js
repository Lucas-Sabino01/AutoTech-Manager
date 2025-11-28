const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

class Veiculo {
  constructor(placa, modelo, ano) {
    this.placa = placa;
    this.modelo = modelo;
    this.ano = ano;
  }

  getDetalhes() {
    return `${this.modelo} (${this.ano})`;
  }
}

class Pessoa {
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
  }
}

class Mecanico extends Pessoa {
  constructor(nome, id, especialidade) {
    super(nome, id);
    this.especialidade = especialidade;
  }

  getInfo() {
    return `Mec. ${this.nome} [${this.especialidade}]`;
  }
}

const vehicles_db = [
  new Veiculo("ABC-1234", "Honda Civic", 2021),
  new Veiculo("XYZ-9876", "VW Gol", 2020),
];

const mechanics_db = [
  new Mecanico("Roberto Santos", "MEC001", "Motor"),
  new Mecanico("Fernanda Lima", "MEC002", "Elétrica"),
];

const orders_db = [
  {
    id: 1001,
    data: "25/10/2023",
    veiculo: "Honda Civic (ABC-1234)",
    total: 450.0,
    status: "Concluído",
  },
  {
    id: 1002,
    data: "26/10/2023",
    veiculo: "VW Gol (XYZ-9876)",
    total: 1200.0,
    status: "Andamento",
  },
];
let next_order_id = 1003;

app.get("/api/vehicles", (req, res) => {
  res.json(vehicles_db);
});

app.post("/api/vehicles", (req, res) => {
  try {
    const { placa, modelo, ano } = req.body;
    if (!placa || !modelo || !ano) {
      return res
        .status(400)
        .json({ status: "error", message: "Dados incompletos." });
    }
    const newVehicle = new Veiculo(placa, modelo, parseInt(ano));
    vehicles_db.push(newVehicle);
    console.log("Novo veículo cadastrado:", newVehicle);
    res
      .status(201)
      .json({ status: "success", message: "Veículo criado com sucesso!" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

app.get("/api/mechanics", (req, res) => {
  res.json(mechanics_db);
});

app.post("/api/mechanics", (req, res) => {
  try {
    const { nome, cpf, especialidade } = req.body;
    if (!nome || !cpf || !especialidade) {
      return res
        .status(400)
        .json({ status: "error", message: "Dados incompletos." });
    }
    const newMechanic = new Mecanico(nome, cpf, especialidade);
    mechanics_db.push(newMechanic);
    console.log("Novo mecânico cadastrado:", newMechanic);
    res
      .status(201)
      .json({ status: "success", message: "Mecânico cadastrado com sucesso!" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

app.get("/api/orders", (req, res) => {
  res.json(orders_db);
});

app.post("/api/orders", (req, res) => {
  try {
    const { nome, cpf, especialidade } = req.body;
    if (!nome || !cpf || !especialidade) {
      return res
        .status(400)
        .json({ status: "error", message: "Dados incompletos." });
    }
    const newMechanic = new Mecanico(nome, cpf, especialidade);
    mechanics_db.push(newMechanic);
    console.log("Novo mecânico cadastrado:", newMechanic);
    res
      .status(201)
      .json({ status: "success", message: "Mecânico cadastrado com sucesso!" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

app.get("/api/orders", (req, res) => {
  res.json(orders_db);
});

app.post("/api/orders", (req, res) => {
  try {
    const { vehicleId, mechanicId, items } = req.body;
    console.log("Nova OS recebida:", req.body);

    const newOrderId = next_order_id++;
    res.json({
      status: "success",
      message: "Ordem de Serviço criada com sucesso!",
      orderId: newOrderId,
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
  console.log("O front-end está sendo servido na rota principal.");
  console.log("A API está disponível sob o prefixo /api.");
});
