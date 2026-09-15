const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

let estado = {
  numero: null,
  seq: null,
  timestamp: null,
  horario: null,
  online: false,
  historico: [],
  diagnosticos: {
    leitor: false,
    extensao: false,
    ponte: false
  },
  recebidoEm: null
};

app.get("/health", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ ok: true, service: "roulette-api", version: "0.2" });
});

app.get("/estado", (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.set("Pragma", "no-cache");

  const recebidoEm = Number(estado.recebidoEm || 0);
  const ativo = recebidoEm > 0 && Date.now() - recebidoEm < 15000;

  res.json({
    ...estado,
    online: Boolean(estado.online && ativo),
    diagnosticos: {
      ...estado.diagnosticos,
      ponte: Boolean(estado.diagnosticos?.ponte && ativo)
    }
  });
});

app.post("/resultado", (req, res) => {
  const numero = Number(req.body?.numero);

  if (!Number.isInteger(numero) || numero < 0 || numero > 36) {
    return res.status(400).json({ ok: false, error: "numero-invalido" });
  }

  const historico = Array.isArray(req.body?.historico)
    ? req.body.historico.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 36).slice(0, 100)
    : [numero];

  estado = {
    numero,
    seq: Number.isFinite(Number(req.body?.seq)) ? Number(req.body.seq) : estado.seq,
    timestamp: Number.isFinite(Number(req.body?.timestamp)) ? Number(req.body.timestamp) : Date.now(),
    horario: String(req.body?.horario || new Date().toLocaleTimeString("pt-BR")),
    online: req.body?.online !== false,
    historico,
    diagnosticos: {
      leitor: Boolean(req.body?.diagnosticos?.leitor),
      extensao: Boolean(req.body?.diagnosticos?.extensao),
      ponte: true
    },
    recebidoEm: Date.now()
  };

  res.json({ ok: true, numero: estado.numero, seq: estado.seq, historico: estado.historico.length });
});

app.listen(PORT, () => {
  console.log("ROULETTE ANALYZER API v0.2");
  console.log(`API rodando na porta ${PORT}`);
});
