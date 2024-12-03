import { postNewUser, findUsers, login, switchMode } from "../utils.js";
const modeList = [
  ".exit",
  ".error",
  "button.createAcc",
  "input",
  "div",
  "body",
];
if (sessionStorage.getItem("loggedIn") == "1") window.location = "../home/";

const start = async () => {
  $(".switchModeBtn").click(() => {
    if (document.querySelector(modeList[0]).classList.contains("dark")) {
      document
        .querySelector("img")
        .setAttribute("src", "../assets/sunIcon.png");
    } else
      document
        .querySelector("img")
        .setAttribute("src", "../assets/moonIcon.png");

    switchMode(modeList);
  });
  $("button.createAcc").click((e) => {
    const un = document.querySelector("#username").value;
    const pw = document.querySelector("#password").value;
    const errorField = document.querySelector(".error");
    let error = false;
    if (pw.split("").length < 8) {
      errorField.innerText = "Password must be atleast 8 characters long";
    } else {
      if (un == "" || pw == "")
        errorField.innerText = "Please fill both fields.";
      else {
        un.split("").forEach((char) => {
          if (char == " ") {
            document.querySelector(".error").innerText =
              "Username cannot include spaces";
            error = true;
          }
        });

        findUsers(un).then((resp) => {
          if (resp.result.length > 0) {
            errorField.innerText = "Username already taken.";
          } else if (!error) {
            errorField.innerText = "";
            postNewUser([
              {
                username: un.toLowerCase(),
                password: pw,
                data: {},
              },
            ]).then((res) => {
              login(res.result[res.result.length - 1].id);
              window.location = "../";
            });
          }
        });
      }
    }
  });

  $("button.exit").click(() => {
    window.location = "../";
  });
};

$("document").ready(start);
