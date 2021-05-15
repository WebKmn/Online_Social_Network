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
    name: { first: "Jimbo", last: "He" },
    username: "JimboHe",
    email: "jimbo@gmail.com",
    password: "Aa123",
    DOB: "1995-05-20",
    securityQuestion: "What city did you grow up in?",
    securityQuestionAnswer: "LA"
  },
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

users.forEach(body => {
  let newUser = new User({
    name: {
      first: body.name.first,
      last: body.name.last
    },
    username: body.username,
    email: body.email,
    location: body.location,
    password: body.password,
    gender: body.gender,
    DOB: body.DOB,
    securityQuestion: body.securityQuestion,
    securityQuestionAnswer: body.securityQuestionAnswer,
    bio: body.bio
  })
  User.register(newUser, body.password, (error, user) => {
    if (user) {
      console.log("User added successfully");
    }
    else {
      console.log("Failed to add user");
    }
  });
});