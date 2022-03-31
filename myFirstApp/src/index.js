
// 1.import express
const express = require("express");

// umozliwia pobranie content type application json
const bodyParser = require("body-parser");

const myData = require("./data");

// 2.inicjalizacja
const app = express();

const sha256 = require('js-sha256');

//Expressie uzywaj bodyParser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false})); 


const mustacheExpress = require('mustache-express');
app.set('views', `${__dirname}/../views`);

//teraz express wie, ze chcemy uzywac mustache jako nasz view engine:
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

//stworzyc const Pool 




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
  //res.render.("users"); //zwraca liste uzytkowników
});

//dodany post
app.post('/users', (req, res) => {
  res.json(req.body)
  myData.users.push(req.body)
  res.redirect('/users/$(users/lenght-1)}')
})

app.get('/users/new', (req, res, next) => {
  res.render('newUser', {});
});

//koniec dodanego

app.get("/schedules", (req, res, next) => {
  res.render("schedules", {
    "Title" : "All schedules - list",
    "schedule": myData.schedules,
  });
  //res.render("schedules"); //zwraca liste terminow
});

app.get("/users/:id", (req, res, next) => {
  const idNumber = req.params.id; //look params
  idNumber >= myData.users.length ? res.render('user', {"Title":"No such user"}) : res.render("user", {"Title": `User ${idNumber}`, 'user': myData.users[idNumber]});
});

app.get("/users/:id/schedules", (req, res, next) => {
  const idNumber = req.params.id;
  if (idNumber >= myData.users.length){
    res.render('schedules', {"Title": "No such user"});
    return;}
  const arr=[];
  for ( let i = 0; i < myData.schedules.length; i ++){
    if (idNumber==myData.schedules[i].user_id){
      arr.push(myData.schedules[i]);
    }
  }
  if (arr.length<1) {
    res.render('schedules', {"Title": "Make an appointment"});
    return;
  }
  res.render('schedules', {"Title": `User ${idNumber} schedule`, 'schedule': arr });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  const b = {
    "firstname": newUser.firstname,
    "lastname": newUser.lastname,
    "email": newUser.email,
    "password": sha256(newUser.password)
  }
  myData.users.push(b);
  res.json(b);
})

app.post('/schedules', (req, res) => {
  const newSchedule = req.body;
  const b = {
    "user_id": parseInt(newSchedule.user_id),
    "day": parseInt(newSchedule.day),
    "start_at": newSchedule.start_at,
    "end_at": newSchedule.end_at
  }
  myData.schedules.push(b);
  res.json(b);
  res.redirect('/schedules/$(schedules/lenght-1}')
})


  //   res.json("No such a user");
  //   return;}
  // res.json(myData.users[idNumber]);


//const myData = require("./data");

// 4.ustawienie nasluchiwania

app.listen(3000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});