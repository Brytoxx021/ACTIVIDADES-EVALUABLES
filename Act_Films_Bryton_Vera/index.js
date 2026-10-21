// primero npm init - y

const datos = require("./films.json");
const express = require("express");
const app = express(); //npm i express
const port = 3033;
const path = require("path"); //npm i path
app.set("view engine", "ejs"); //npm i ejs
app.set("views", path.join(__dirname, "/views")); //__dirname es para el nome del directori
app.use(express.static(path.join(__dirname,"public")))


app.get("/search", (req, res) => {
  const q = req.query.q || "";

  // Busca sin distinguir mayúsculas/minúsculas
  const pelicula = Object.values(datos).find((film) =>
    film.Title.toLowerCase().includes(q.toLowerCase())
  );
  res.render("search", { q, pelicula });
})

app.get("/", (req, res) => {
	res.render("googlemovies.ejs", { });
});


//TODO ESTO AL FINAL DEL CODIGO
//anbtes de levantar el servidor
//AÑADIMOS LA RUTA POR DEFECTO, en caso de no exitir
app.use((req, res) => {
	res.render(`notfound.ejs`, { });
});

//levantar el server
app.listen(port, () => {
	console.log(`http.//localhost:${port}`);
});
