const express=require("express");const app=express(),PORT=process.env.PORT||3000,OFF=20000;
app.use(express.json({limit:"1mb"}));app.use(express.static(__dirname));
let e={numero:null,seq:null,timestamp:null,horario:null,online:false,historico:[],diagnosticos:{leitor:false,extensao:false,ponte:false},mobile:null,recebidoEm:null};
app.get("/health",(q,r)=>r.json({ok:true,service:"roulette-api",version:"0.4"}));
app.get("/estado",(q,r)=>{r.set("Cache-Control","no-store");let a=e.recebidoEm&&Date.now()-e.recebidoEm<OFF;r.json({...e,online:Boolean(e.online&&a),diagnosticos:{...e.diagnosticos,ponte:Boolean(e.diagnosticos.ponte&&a)}})});
app.post("/resultado",(q,r)=>{let n=Number(q.body?.numero);if(!Number.isInteger(n)||n<0||n>36)return r.status(400).json({ok:false});let h=Array.isArray(q.body?.historico)?q.body.historico.map(Number).filter(x=>Number.isInteger(x)&&x>=0&&x<=36).slice(0,100):[n];e={numero:n,seq:Number(q.body?.seq),timestamp:Number(q.body?.timestamp||Date.now()),horario:String(q.body?.horario||""),online:q.body?.online!==false,historico:h,diagnosticos:{leitor:Boolean(q.body?.diagnosticos?.leitor),extensao:Boolean(q.body?.diagnosticos?.extensao),ponte:true},mobile:q.body?.mobile||null,recebidoEm:Date.now()};r.json({ok:true})});
app.listen(PORT,()=>console.log("ROULETTE ANALYZER API v0.4 - porta",PORT));
