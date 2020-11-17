// IrfanView é necessário para funcionar
const express = require("express");
const bodyParser = require("body-parser");
const nodeHtmlToImage = require("node-html-to-image");
const app = express();
const port = 3000;
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
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

app.post("/", (req, res) => {
  const { nomeComecial, nomeGenerico, lote, aplicador, dataAplicacao } = req;
  nodeHtmlToImage({
    output: "./image.png",
    html: `<html>  <style>body {width: 100px;height: 120px;}</style><body><div style="width:100px;height:120px;background-color:#f5f5f5;display:flex;flex-direction:column;justify-content:space-around; align-items:center;">
	<p  style="font-size:18px; margin: 0px; color:#424242"><b>${nomeComecial}</b></p>
	
	<p style="font-size:15px; font-weight:bold;color:#424242; margin: 0px">${nomeGenerico}</p>
	
	<p style="font-size:18px; font-weight:bold; margin:0px; color: color:#424242">Lote: ${lote}</p> 
	
	<p style="font-size:18px; font-weight:bold; color:color:#424242; margin: 0px">${dataAplicacao}</p>
	
	<p style="font-size:18px; font-weight: bold; margin: 0px; color:color:#424242">Enf. ${aplicador}</p>
	</div></body></html>`,
  }).then(async () => {
	const status = await imprimir();
	res.sendStatus(status)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
