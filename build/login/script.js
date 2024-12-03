import { findUsers, login, switchMode } from "../utils.js";
const modeList = [".exit", ".error", "button.login", "input", "div", "body"];

if (sessionStorage.getItem("loggedIn") == "1") {
  window.location = "../home/";
}
const start = () => {
  $(".switchModeBtn").click(() => {
    if (document.querySelector(modeList[0]).classList.contains("dark"))
      document
        .querySelector("img")
        .setAttribute("src", "../assets/sunIcon.png");
    else
      document
        .querySelector("img")
        .setAttribute("src", "../assets/moonIcon.png");

    switchMode(modeList);
  });

  $(".exit").click(() => {
    window.location = "../";
  });

  $(".login").click(() => {
    const un = document.querySelector("#username").value;
    const pw = document.querySelector("#password").value;
    const errorField = document.querySelector(".error");
    // let error = false;

    if (un == "" || pw == "") {
      errorField.innerText = "Both field should be filled.";
    } else {
      findUsers(un.toLowerCase()).then((resp) => {
        if (resp.result.length == 0) {
          errorField.innerText = "No such user found.";
        } else {
          if (pw != resp.result[0].password) {
            errorField.innerText = "Username/Password incorrect.";
          } else {
            errorField.innerText = "";
            login(resp.result[0].id);
            window.location = "../";
          }
        }
      });
    }

    // findUsers(un);
  });
};

$("document").ready(start);
