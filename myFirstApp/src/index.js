
// 1.import express
const express = require("express");

// umozliwia pobranie content type application json
const bodyParser = require("body-parser");

const myData = require("./data");



// 2.inicjalizacja
const app = express();
//Expressie uzywaj bodyParser
app.use(bodyParser.json());

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

app.get("/users/:id", (req, res) => {
  const idNumber = req.params.id; //look params
  if (idNumber >= myData.users.length){
    res.json("No such a user");
    return;}
  res.json(myData.users[idNumber]);
});

//const myData = require("./data");

// 4.ustawienie nasluchiwania

app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});