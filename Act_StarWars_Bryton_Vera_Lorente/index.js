const express = require("express"); // npm i express
const axios = require("axios"); // npm i axios
const app = express();
const port = 3012;
const path = require("path");
const methodOverride = require("method-override"); // npm i method-override
const starwarsJson = require("./starwars.json");
//ns si va
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Para poder leer datos del request body en métodos post tenemos que hacer:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.redirect("/search.html");
});

function modificarJson(json) {
	for (let p of json) {
		p.photo = "/images/" + p.name.split(" ")[0] + ".jpg";
	}
	return json;
}

let jsonModificado = modificarJson(starwarsJson);
console.log(jsonModificado);

app.get("/starwars", (req, res) => {
	// texto buscado (si no viene nada, cadena vacía) y sin espacios sobrantes
	const q = String(req.query.q || "").trim();

	// Busca sin distinguir mayúsculas/minúsculas
	// (si q está vacío no buscamos, porque includes("") coincidiría con todas)
	const personaje =
		q === ""
			? undefined
			: Object.values(jsonModificado).find((photo) =>
					name.photo.toLowerCase().includes(q.toLowerCase()),
				);

	// Si NO existe la película vista notfound con el nombre buscado como parámetro
	if (!personaje) {
		return res.status(404).render("notfound", { q });
	}

	res.render("starwars", { q, personaje });
});




//levantar el server
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
