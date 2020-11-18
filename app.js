// IrfanView é necessário para funcionar
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const text2png = require("text2png");

const app = express();
const port = 3010;
const fileOutput = 'output.png'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const imprimir = () => {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  try {
    exec(
      `"C:\\Program Files\\IrfanView\\i_view64.exe" C:\\Users\\thiag\\Desktop\\impressao_vacina\\output.png /print`
    );
    return 200;
  } catch (error) {
    throw new Error(error)
  }
};

app.get("/teste", (req, res) => {
  return res.sendStatus(200)
})

app.post("/", (req, res) => {
  const {
    nomeComercial,
    nomeGenerico,
    lote,
    aplicador,
    dataAplicacao,
  } = req.body;

  const text = `${nomeComercial}\n${nomeGenerico}\n${lote}\n${aplicador}\n${dataAplicacao}`

  const config = {
    backgroundColor: '#fff',
    font: '60px sans-serif',
    strokeWidth: 2,
    strokeColor: 'black',
  }

  fs.writeFileSync('C:\\Users\\thiag\\Desktop\\impressao_vacina\\output.png', text2png(text, config));
  try {
    imprimir();
    res.send({
      ok: true,
      data: req.body
    })
  }catch(error) {
    throw new Error(error)
  }
  
});

app.listen(port, () => {
  console.log(`Eureka Printer listening at http://localhost:${port}`);
});
