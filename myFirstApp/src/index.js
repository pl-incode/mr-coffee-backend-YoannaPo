
// 1.import express
const express = require("express");

// umozliwia pobranie content type application json
const bodyParser = require("body-parser");

const myData = require("./data");

// 2.inicjalizacja
const app = express();
//Expressie uzywaj bodyParser
app.use(bodyParser.json());

const mustacheExpress = require('mustache-express');
app.set('views', `${__dirname}/../views`);

//teraz express wie, ze chcemy uzywac mustache jako nasz view engine:
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());




// 3.zdefiniowanie handlera 
app.get("/", (req, res, next) => {
  res.render("Welcome", {"Welcome": "Welcome to our awesome website"});
}); //console.log(req);

app.get("/users", (req, res, next) => {
  //odwolujemy się do bazy myData zdefiniowanej wiersz 8
  const usersNumber = [...myData.users];
    for (let i=0; i<usersNumber.length; i++) {
      usersNumber[i].id = i;
    }
    res.render("users", {
      "Title": "List of users",
      "user": usersNumber,
    });
  //res.json(myData.users); //zwraca liste uzytkowników
});

app.get("/schedules", (req, res, next) => {

  res.render("schedules", {
    "Title" : "All schedules - list",
    "schedule": myData.schedules,
  });
  //send(myData.schedules); //zwraca liste terminow
});

app.get("/users/:id", (req, res, next) => {
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