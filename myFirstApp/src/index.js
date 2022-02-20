
// 1.import express
const express = require("express");

// 2.inicjalizacja
const app = express();

// 3.zdefiniowanie handlera 
app.get("/", (req, res) => {
  res.send("Welcome to our schedule website");
}); //console.log(req);

app.get("/users", (req, res) => {
  res.json(myData.users); //zwraca liste uzytkowników
});

app.get("/schedules", (req, res) => {
  res.send(myData.schedules); //zwraca liste terminow
});

const myData = require("./data");

// 4.ustawienie nasluchiwania

app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});