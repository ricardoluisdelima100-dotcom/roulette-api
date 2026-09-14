const express = require("express");
const path = require("path");

const app = express();

// Na internet, o Render informa a porta.
// No PC, continua usando 3000.
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Página visual
app.use(express.static(__dirname));

// Estado atual da roleta
let estado = {
  numero: null,
  horario: null,
  online: false,
  atualizadoEm: null
};

// Teste da API
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    servico: "roulette-api",
    horarioServidor: new Date().toISOString()
  });
});

// Estado atual
app.get("/estado", (req, res) => {
  res.json(estado);
});

// Recebe resultado
app.post("/resultado", (req, res) => {
  const { numero, horario, online } = req.body;

  if (
    numero !== null &&
    numero !== undefined &&
    (!Number.isInteger(numero) || numero < 0 || numero > 36)
  ) {
    return res.status(400).json({
      ok: false,
      erro: "numero deve ser inteiro entre 0 e 36"
    });
  }

  estado = {
    numero: numero ?? estado.numero,
    horario: horario ?? new Date().toLocaleTimeString("pt-BR"),
    online: online ?? true,
    atualizadoEm: new Date().toISOString()
  };

  res.json({
    ok: true,
    estado
  });
});

// Garante abertura do index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("======================================");
  console.log("   ROULETTE ANALYZER API");
  console.log("======================================");
  console.log(`API rodando na porta ${PORT}`);
  console.log("======================================");
  console.log("");
});
