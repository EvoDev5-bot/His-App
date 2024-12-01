import {
  findUserByID,
  findUsers,
  postNewChat,
  putNewUserData,
  switchMode,
} from "../../utils.js";

const modeList = [
  ".exit",
  ".error",
  "button.createNewChat",
  "input",
  "div",
  "body",
];

if (sessionStorage.getItem("loggedIn") != "1") {
  window.location = "../../";
}

const start = async () => {
  const user = await findUserByID(sessionStorage.getItem("userID")).then(
    (res) => res.result[0]
  );
  console.log(user);

  if (user.data.prefs) {
    if (user.data.prefs.lightTheme == "0") {
      document
        .querySelector("img")
        .setAttribute("src", "../../assets/moonIcon.png");
      switchMode(modeList);
    }
  }

  $(".switchModeBtn").click(() => {
    if (user.data.prefs == undefined) user.data.prefs = {};
    if (user.data.prefs.lightTheme == undefined) user.data.prefs.lightTheme = 0;
    if (document.querySelector("body").classList.contains("dark")) {
      document
        .querySelector("img")
        .setAttribute("src", "../../assets/sunIcon.png");
      user.data.prefs.lightTheme = 1;
    } else {
      document
        .querySelector("img")
        .setAttribute("src", "../../assets/moonIcon.png");
      user.data.prefs.lightTheme = 0;
    }
    switchMode(modeList);
    putNewUserData(user.id, { data: user.data });
  });

  $("button.createNewChat").click(async () => {
    const input = document.querySelector("input").value;

    if (input == "") {
      shootError("Please fill out the username field.");
      return;
    }

    if (input.toLowerCase() == user.username.toLowerCase()) {
      shootError("You cannot start a chat with yourself.");
      return;
    }

    const userArray = await findUsers(input).then((res) => res.result);

    if (userArray.length == 0) {
      shootError("There is no such user.");
      return;
    }

    const otherUser = userArray[0];

    if (user.data.chatapp == undefined) user.data.chatapp = {};
    if (user.data.chatapp.chats == undefined) user.data.chatapp.chats = [];

    if (otherUser.data.chatapp == undefined) otherUser.data.chatapp = {};
    if (otherUser.data.chatapp.chats == undefined)
      otherUser.data.chatapp.chats = [];

    putNewUserData(user.id, { data: user.data });
    putNewUserData(otherUser.id, { data: otherUser.data });

    const chatAlreadyExists = user.data.chatapp.chats.some((chat) =>
      otherUser.data.chatapp.chats.includes(chat)
    );

    if (chatAlreadyExists) {
      shootError("You already have a chat with this user.");
      return;
    }

    const addedChat = await postNewChat({
      user1: user.username,
      user2: otherUser.username,
      messages: [],
    }).then((res) => res.result[res.result.length - 1]);

    user.data.chatapp.chats.push(addedChat.id);
    otherUser.data.chatapp.chats.push(addedChat.id);

    await putNewUserData(user.id, { data: user.data });
    await putNewUserData(otherUser.id, { data: otherUser.data });

    alert("Success");
    window.location = "../";
  });

  $(".exit").click(() => {
    window.location = "../";
  });
};

const shootError = (err) => {
  document.querySelector("p.error").innerText = err;
};

$("document").ready(start);
