// primero npm init - y

const datos = require("./films.json"); // cargamos las películas desde films.json
const express = require("express"); //npm i express
const app = express();
const port = 3033;
const path = require("path");
app.set("view engine", "ejs"); //npm i ejs
app.set("views", path.join(__dirname, "/views")); 
app.use(express.static(path.join(__dirname,"public")))


// raíz: muestra el formulario tipo Google
app.get("/", (req, res) => {
	res.render("googlemovies.ejs", { });
});

// /search: recoge el queryString "q" y busca la película en films.json
app.get("/search", (req, res) => {
  // texto buscado (si no viene nada, cadena vacía) y sin espacios sobrantes
  const q = String(req.query.q || "").trim();

  // Busca sin distinguir mayúsculas/minúsculas
  // (si q está vacío no buscamos, porque includes("") coincidiría con todas)
  const pelicula = q === "" ? undefined : Object.values(datos).find((film) =>
    film.Title.toLowerCase().includes(q.toLowerCase())
  );

  // Si NO existe la película vista notfound con el nombre buscado como parámetro
  if (!pelicula) {
    return res.status(404).render("notfound", { q });
  }

  // Si existe -> vista search con los datos de la película
  res.render("search", { q, pelicula });
})


//TODO ESTO AL FINAL DEL CODIGO
//anbtes de levantar el servidor
//AÑADIMOS LA RUTA POR DEFECTO, en caso de no exitir
// (cualquier otra URL también muestra notfound, pasando la ruta como parámetro)
app.use((req, res) => {
	res.status(404).render(`notfound.ejs`, { q: req.path });
});

//levantar el server
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
