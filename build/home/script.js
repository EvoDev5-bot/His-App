import { findUserByID, putNewUserData, switchMode } from "../utils.js";
const modeList = ["body", "div.content", "button.logout", ".head"];

if (sessionStorage.getItem("loggedIn") != "1") window.location = "../";

const start = async () => {
  animate();

  const user = await findUserByID(sessionStorage.getItem("userID")).then(
    (res) => res.result[0]
  );
  console.log(user);
  if (user.data.prefs) {
    if (user.data.prefs.lightTheme == "0") {
      document
        .querySelector("img")
        .setAttribute("src", "../assets/moonIcon.png");
      switchMode(modeList);
    }
  }
  $(".switchModeBtn").click(() => {
    if (user.data.prefs == undefined) user.data.prefs = {};
    if (user.data.prefs.lightTheme == undefined) user.data.prefs.lightTheme = 0;
    if (document.querySelector("body").classList.contains("dark")) {
      document
        .querySelector("img")
        .setAttribute("src", "../assets/sunIcon.png");
      user.data.prefs.lightTheme = 1;
    } else {
      document
        .querySelector("img")
        .setAttribute("src", "../assets/moonIcon.png");
      user.data.prefs.lightTheme = 0;
    }
    switchMode(modeList);
    putNewUserData(user.id, { data: user.data });
  });

  $(".logout").click(() => {
    sessionStorage.clear();
    window.location = "../";
  });

  $(".chatapp").click(() => {
    window.location = "../chatapp/";
  });
};

$("document").ready(start);

const animate = () => {
  $(".head")
    .animate({ height: "80px" })
    .animate({ width: "900px" })
    .animate({ fontSize: "40px" })
    .animate(
      {
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "22px",
      },
      {
        complete: () => {
          $(".contentInfo").animate({ fontSize: "35px" });
          $("div.content")
            .animate({
              width: "42.5%",
            })
            .animate(
              { marginTop: "50px" },
              {
                complete: () => {
                  $(".contentIcon")
                    .animate({ width: "120px" })
                    .animate({ top: "-30px" });
                  $(".contentTitle").animate(
                    { fontSize: "40px" },
                    {
                      complete: () => {
                        $("div.content").animate(
                          { padding: "40px" },
                          {
                            complete: () => {
                              $(".contentTitle").animate({ top: "-35px" });
                            },
                          }
                        );
                      },
                    }
                  );
                },
              }
            );
        },
      }
    );

  $("button.logout")
    .animate({ height: "70px" })
    .animate({ width: "300px" })
    .animate({ fontSize: "40px" })
    .animate({ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "15px" });
};
