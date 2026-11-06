const express = require("express"); // npm i express
const axios = require("axios"); // npm i axios
const app = express();
const port = 3012;
const path = require("path");
const methodOverride = require("method-override"); // npm i method-override
const starwarsJson = require("./starwars.json");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Para poder leer datos del request body en métodos post tenemos que hacer:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.redirect("search.html");
});

function modificarJson(json) {
	for (let p of json) {
		p.photo = "../images/" + p.name.split(" ")[0] + ".jpg";
	}
	return json;
}

let jsonModificado = modificarJson(starwarsJson);
console.log(jsonModificado);

app.get("/starwars", (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
        // Si no hay búsqueda, puedes mandar todos o una lista vacía
        return res.render("starwars.ejs", { personajes: jsonModificado });
    }

    const terminoBusqueda = q.toLowerCase().trim();
    
    // Usamos .filter() para obtener un array con todas las coincidencias
    const personajes = jsonModificado.filter((p) => 
        p.name.toLowerCase().includes(terminoBusqueda)
    );

    if (personajes.length === 0) {
        return res.render("error.ejs", { msg: "Personaje no encontrado crack" });
    }

    // Pasamos el array a la vista (nota el cambio a 'personajes' en plural)
    res.render("show.ejs", { q, personajes });
});

//levantar el server
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
