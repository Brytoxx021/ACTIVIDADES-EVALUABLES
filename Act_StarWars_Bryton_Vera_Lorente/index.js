import fs from 'fs/promises';

const express = require("express"); // npm i express
const axios = require("axios"); // npm i axios
const app = express();
const port = 3012;
const path = require("path");	
const methodOverride = require("method-override"); // npm i method-override
//ns si va
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Para poder leer datos del request body en métodos post tenemos que hacer:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

function modificarJson(json , photo){
	

}


async function gestionarJson() {
  try {
    // 1. Leer el archivo de forma asíncrona
    const data = await fs.readFile('datos.json', 'utf-8');
    
    // 2. Parsear a array
    const miArray = JSON.parse(data);
    
    // 3. Trabajar con el array
    console.log(miArray);

    // Opcional: Agregar y reescribir
    miArray.push({ id: 4, nombre: "Sofia" });
    await fs.writeFile('datos.json', JSON.stringify(miArray, null, 2), 'utf-8');
    
  } catch (error) {
    console.error("Error:", error);
  }
}

gestionarJson();

modificarJson(starwarsJson.json,"/images/")