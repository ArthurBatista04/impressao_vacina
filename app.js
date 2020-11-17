// IrfanView é necessário para funcionar
const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var text2png = require("text2png");
const app = express();
const port = 3007;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const imprimir = async () => {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  try {
    await exec(
      '"C:\\Program Files\\IrfanView\\i_view64.exe" .\\image.png /print'
    );
    console.log("tryyyyy");
    return 200;
  } catch (error) {
    console.log("catchhh");
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

  fs.writeFileSync("out.png", text2png(nomeGenerico));
  const status = await imprimir();
  res.sendStatus(status);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
