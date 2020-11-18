// IrfanView é necessário para funcionar
const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var text2png = require("text2png");
const app = express();
const port = 3008;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const imprimir = async () => {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  try {
    await exec(
      '"C:\\Program Files\\IrfanView\\i_view64.exe" .\\out.png /print'
    );
    return 200;
  } catch (error) {
    return 500;
  }
};

app.post("/", async (req, res) => {
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
    font: '13px',
    strokeWidth: .1,
    strokeColor: 'black',
    localFontPath: 'Goldman-Bold.ttf',
  localFontName: 'Goldman-Bold'
  }

  fs.writeFileSync("out.png", text2png(text, config));
  const status = await imprimir();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
