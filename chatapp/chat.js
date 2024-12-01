import {
  findChatByID,
  findUserByID,
  putNewChatData,
  putNewUserData,
  switchMode,
} from "../utils.js";

const modeList = ["body", ".msg", "div", ".exit"];

const start = async () => {
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const chatID = urlParams.get("id");

  const user = await findUserByID(sessionStorage.getItem("userID")).then(
    (res) => res.result[0]
  );

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

  if (!chatID) window.location = "./";
  const chatArray = await findChatByID(chatID).then((res) => res.result);
  if (chatArray.length == 0) window.location = "./";
  const chat = chatArray[0];

  // addMockMsg(chat, "Hi", 12);
  // addMockMsg(chat, "Hi. How are you doing?", 21);
  // addMockMsg(chat, "I'm fine, how about you?", 12);

  displayMessages(chat, user);

  $("button.send").click(() => {
    const msg = document.querySelector("input").value;
    if (msg == "") return;
    const arrayDoesntHaveOnlySpaces = msg.split("").some((char) => char != " ");
    if (!arrayDoesntHaveOnlySpaces) return;

    let order;
    if (chat.user1 == user.username) order = 12;
    else order = 21;
    chat.messages.push({ text: msg, order: order });
    displayMessages(chat, user);
    putNewChatData(chat.id, { messages: chat.messages });
  });

  $(".exit").click(() => (window.location = "./"));
};

const addMockMsg = (chat, text, order) => {
  chat.messages.push({ text: text, order: order });
};

const displayMessages = (chat, user) => {
  document.querySelectorAll("div.msg").forEach((div) => {
    div.parentNode.removeChild(div);
  });

  chat.messages.forEach((msg) => {
    let sender;
    if (msg.order == "12") sender = chat.user1;
    else sender = chat.user2;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg");
    if (sender.toLowerCase() == user.username.toLowerCase())
      msgDiv.classList.add("sent");
    else msgDiv.classList.add("received");
    const emptyElem = document.createElement("div");
    const paraElem = document.createElement("p");
    paraElem.innerText = msg.text;

    if (msgDiv.classList.contains("sent")) {
      msgDiv.appendChild(emptyElem);
      msgDiv.appendChild(paraElem);
    } else {
      msgDiv.appendChild(paraElem);
      msgDiv.appendChild(emptyElem);
    }

    document.body.appendChild(msgDiv);
  });
};

$("document").ready(start);
