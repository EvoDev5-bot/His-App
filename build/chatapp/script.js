import {
  findChatByID,
  findUserByID,
  putNewUserData,
  switchMode,
} from "../utils.js";

if (sessionStorage.getItem("loggedIn") != "1") window.location = "../";

const modeList = [
  "body",
  ".welcomeMsg",
  "button.createNewChat",
  "div.chat",
  ".exit",
];

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

  $("button.createNewChat").click(() => {
    window.location = "./createNewChat/";
  });

  displayChats(user);

  $(".exit").click(() => (window.location = "../"));
};

const animate = () => {
  $("h2.welcomeMsg")
    .animate({ height: "70px" })
    .animate({ width: "1000px" })
    .animate({ fontSize: "40px" })
    .animate({
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "15px",
    });
  $("button.createNewChat")
    .animate({ height: "70px" })
    .animate({ width: "385px" })
    .animate({ fontSize: "40px" })
    .animate({ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "15px" })
    .animate({ marginLeft: "10px" });
};

const displayChats = (user) => {
  if (user.data.chatapp == undefined || user.data.chatapp.chats == undefined)
    return;

  user.data.chatapp.chats.forEach(async (chatID) => {
    const chat = await findChatByID(chatID).then((res) => res.result[0]);

    let userOrder;
    if (chat.user1 == user.username) userOrder = 1;
    else userOrder = 2;

    const div = document.createElement("div");
    div.classList.add("chat");
    if (document.querySelector(modeList[0]).classList.contains("dark"))
      div.classList.add("dark");
    if (userOrder == 1) div.innerText = "Chat with " + chat.user2;
    else div.innerText = "Chat with " + chat.user1;

    div.setAttribute("id", chat.id);

    div.addEventListener("click", () => {
      window.location = "./chat.html?id=" + div.getAttribute("id");
    });

    document.body.appendChild(div);
  });
};

$("document").ready(start());
