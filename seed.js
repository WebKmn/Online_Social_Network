"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

  mongoose.connect(
    "mongodb://localhost:27017/ponyo_db",
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);
  mongoose.connection;

  var users = [
    {
      name: { first: "Xin", last: "Li" },
      username: "li0180",
      email: "xinlijason@gmail.com",
      password: "Aa123",
      DOB: "1995-08-23",
      securityQuestion: "What city did you grow up in?",
      securityQuestionAnswer: "Guangzhou"
    },
    {
        name: { first: "John", last: "Doe" },
        username: "John001",
        email: "john@example.com",
        password: "ABCabc123",
        DOB: "1960-01-01",
        securityQuestion: "What city did you grow up in?",
        securityQuestionAnswer: "Vermont"
      },
      {
        name: { first: "Joe", last: "Doe" },
        username: "Joe10000",
        email: "joe@gmail.com",
        password: "Joe123",
        DOB: "2000-05-20",
        securityQuestion: "What city did you grow up in?",
        securityQuestionAnswer: "LA"
      },
  ];
  
  User.deleteMany()
    .exec()
    .then(() => {
      console.log("User data is empty!");
    });
  
  var commands = [];
  
  users.forEach(c => {
    commands.push(
      User.create({
        name: c.name,
        username: c.username,
        email: c.email,
        password: c.password,
        DOB: c.DOB,
        securityQuestion: c.securityQuestion,
        securityQuestionAnswer: c.securityQuestionAnswer
      })
    );
  });
  
  Promise.all(commands)
    .then(r => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
    });
  