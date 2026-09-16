<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Roulette Analyzer Mobile</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#06140f;color:#f5f5f5;font-family:Arial,Helvetica,sans-serif}
.app{width:100%;max-width:520px;min-height:100vh;margin:auto;padding:12px}
.topo{border-bottom:1px solid #244237;padding:4px 2px 12px}.titulo{font-size:22px;font-weight:900}.versao{color:#20e6a1}
.subtitulo,.label{color:#aab7b1;font-size:12px}.secao{margin-top:14px}.resultado{font-size:58px;font-weight:900;line-height:1;margin:5px 0 10px}
.vermelho{color:#ff2638}.preto{color:#fff}.verde{color:#19d982}
.historico{display:flex;gap:6px;overflow-x:auto;padding:4px 0 10px}
.bola{min-width:29px;height:29px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:1px solid #777;background:#151515;color:#fff}
.bola.vermelho{background:#df1f32;border-color:#ff4d5d}.bola.verde{background:#07965d;border-color:#20e6a1}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}.card{border:1px solid #315244;border-radius:9px;background:#081b14;padding:9px}
.nome{color:#b8c2bd;font-size:11px}.ok{color:#18e69a;font-weight:bold;margin-top:3px}.off{color:#ff5967;font-weight:bold;margin-top:3px}
.bloco{margin-top:10px;border:1px solid #315244;border-radius:10px;background:#081b14;padding:11px}
.aviso{margin-top:7px;color:#8f9d97;font-size:12px}.status{text-align:center;margin-top:12px;padding:10px;border-radius:9px;border:1px solid #1a6046;background:#09271c;font-weight:bold}
.rodape{text-align:center;color:#71817a;font-size:10px;padding:12px}.linha{margin-top:7px;font-size:13px}.valor{font-weight:bold;color:#f5f5f5}.sinal{margin-top:8px;padding:8px;border:1px solid #315244;border-radius:8px}.sinal.ativo{border-color:#20e6a1;background:#09271c}
</style>
</head>
<body>
<div class="app">
 <div class="topo"><div class="titulo">ROULETTE ANALYZER <span class="versao">MOBILE</span></div><div class="subtitulo">Dados reais recebidos da v6.0.3</div></div>
 <div class="secao"><div class="label">ÚLTIMO RESULTADO</div><div id="resultado" class="resultado">--</div><div id="historico" class="historico"></div></div>
 <div class="grid">
  <div class="card"><div class="nome">LEITOR DA MESA</div><div id="leitor" class="off">AGUARDANDO</div></div>
  <div class="card"><div class="nome">EXTENSÃO</div><div id="extensao" class="off">AGUARDANDO</div></div>
  <div class="card"><div class="nome">PONTE MOBILE</div><div id="ponte" class="off">AGUARDANDO</div></div>
  <div class="card"><div class="nome">SERVIDOR</div><div id="servidor" class="off">AGUARDANDO</div></div>
 </div>
 <div class="bloco"><div class="nome">CRUPIÊ / SINAIS / GREEN-RED / BANCA</div><div id="mobileDados" class="aviso">Aguardando dados reais do Analyzer...</div></div>
 <div id="status" class="status off">● CONECTANDO</div>
 <div id="rodape" class="rodape">Aguardando...</div>
</div>
<script>
const reds=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
function cor(n){return n===0?"verde":reds.has(n)?"vermelho":"preto"}
function st(id,ok){const e=document.getElementById(id);e.textContent=ok?"OK":"AGUARDANDO";e.className=ok?"ok":"off"}
async function atualizar(){
 try{
  const r=await fetch("/estado?t="+Date.now(),{cache:"no-store"});
  if(!r.ok)throw new Error();
  const d=await r.json(), n=Number(d.numero);
  if(Number.isInteger(n)&&n>=0&&n<=36){const e=document.getElementById("resultado");e.textContent=n;e.className="resultado "+cor(n)}
  const h=document.getElementById("historico");h.innerHTML="";
  (Array.isArray(d.historico)?d.historico:[]).slice(0,30).forEach(x=>{const b=document.createElement("div");b.className="bola "+cor(Number(x));b.textContent=x;h.appendChild(b)});
  st("leitor",!!d.diagnosticos?.leitor);st("extensao",!!d.diagnosticos?.extensao);st("ponte",!!d.diagnosticos?.ponte);st("servidor",true);
  const md=document.getElementById("mobileDados"),m=d.mobile;
  if(m&&typeof m==="object"){
   const dealer=m.dealer?.current; const active=m.signals?.active; const list=Array.isArray(m.signals?.list)?m.signals.list:[]; const f=m.finance||{};
   const dealerNome=(dealer&&typeof dealer==="object")?(dealer.nome||dealer.name||"--"):(dealer||"--");
   const activeArr=Array.isArray(active)?active:(active?[active]:[]);
   const sinais=activeArr.length?activeArr:list.slice(0,3);
   const sinalHtml=sinais.length?sinais.map(x=>{const o=(x&&typeof x==="object")?x:{nome:String(x)};const nome=o.nome||o.name||o.estrategia||o.strategy||"Sinal";const nums=o.numeros||o.numbers||o.alvos||o.targets;return `<div class="sinal ${activeArr.length?'ativo':''}"><b>${activeArr.length?'SINAL ATIVO':'SINAL'}</b>: ${nome}${Array.isArray(nums)&&nums.length?`<br>Números: ${nums.join(', ')}`:''}</div>`}).join(''):'<div class="linha">Sinais ativos: <span class="valor">nenhum</span></div>';
   md.innerHTML=`<div class="linha">Crupiê: <span class="valor">${dealerNome}</span></div>${sinalHtml}<div class="linha">GREEN / RED: <span class="valor">${f.greens??0} / ${f.reds??0}</span></div><div class="linha">Banca: <span class="valor">${f.bankrollEstimated!=null?'R$ '+Number(f.bankrollEstimated).toFixed(2).replace('.',','):'--'}</span></div>`;
  }else md.textContent="Aguardando dados reais do Analyzer...";
  const s=document.getElementById("status");s.textContent=d.online?"● ANALYZER ONLINE":"● ANALYZER OFFLINE";s.className=d.online?"status ok":"status off";
  document.getElementById("rodape").textContent=(d.horario?"Último giro: "+d.horario:"Aguardando resultado")+(d.seq!=null?" | seq "+d.seq:"");
 }catch(e){st("servidor",false);const s=document.getElementById("status");s.textContent="● SEM CONEXÃO";s.className="status off"}
}
atualizar();setInterval(atualizar,1000);
</script>
</body>
</html>
