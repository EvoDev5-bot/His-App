import { switchMode } from "./utils.js";

if (sessionStorage.getItem("loggedIn") == "1") {
  window.location = "./home";
}

const darkModeList = ["body", ".welcomeMsg", "button.normal", ".info"];

const code = () => {
  $(".switchModeBtn").click(() => {
    if (document.querySelector(darkModeList[0]).classList.contains("dark"))
      document.querySelector("img").setAttribute("src", "./assets/sunIcon.png");
    else
      document
        .querySelector("img")
        .setAttribute("src", "./assets/moonIcon.png");

    switchMode(darkModeList);
  });
  $("button.normal")
    .animate({ height: "70px" })
    .animate({ width: "300px" })
    .animate({ fontSize: "40px" })
    .animate({ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "15px" })
    .animate({ marginLeft: "10px" });
  $(".welcomeMsg")
    .animate({ height: "70px" })
    .animate({ width: "1000px" })
    .animate({ fontSize: "40px" })
    .animate(
      {
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "15px",
      },
      400,
      function () {
        $(".info")
          .animate({ height: "550px" })
          .animate({ width: "100%" })
          .animate({ marginTop: "50px" })
          .animate({ fontSize: "40px" })
          .animate({
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "22px",
          });
      }
    );

  $(".signup").click(() => {
    window.location = "./signup";
  });
  $(".login").click(() => {
    window.location = "./login";
  });

  if (sessionStorage.getItem("loggedIn") == "1") {
    console.log("User logged In", JSON.parse(sessionStorage.getItem("user")));
  }
};

$("document").ready(code);
