export const postNewUser = async (user) => {
  let resp;

  await fetch("https://faux-api.com/api/v1/users_9121319219472318", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      resp = json;
    });

  return resp;
};

export const postNewChat = async (user) => {
  let resp;

  await fetch("https://faux-api.com/api/v1/chats_9121319219472318", {
    method: "POST",
    body: JSON.stringify([user]),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      resp = json;
    });

  return resp;
};

export const putNewUserData = async (userID, userData) => {
  let resp;

  await fetch("https://faux-api.com/api/v1/users_9121319219472318/" + userID, {
    method: "PUT",
    body: JSON.stringify([userData]),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      resp = json;
    });

  return resp;
};

export const putNewChatData = async (userID, userData) => {
  let resp;

  await fetch("https://faux-api.com/api/v1/chats_9121319219472318/" + userID, {
    method: "PUT",
    body: JSON.stringify([userData]),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      resp = json;
    });

  return resp;
};

export const findUsers = async (username) => {
  let resp;
  await fetch(
    `https://faux-api.com/api/v1/users_9121319219472318/{"username":"${username.toLowerCase()}"}`
  )
    .then((res) => res.json())
    .then((json) => (resp = json));

  return resp;
};

export const findUserByID = async (id) => {
  let resp;
  await fetch(`https://faux-api.com/api/v1/users_9121319219472318/${id}`)
    .then((res) => res.json())
    .then((json) => (resp = json));

  return resp;
};

export const findChatByID = async (id) => {
  let resp;
  await fetch(`https://faux-api.com/api/v1/chats_9121319219472318/${id}`)
    .then((res) => res.json())
    .then((json) => (resp = json));

  return resp;
};

export const login = (user) => {
  sessionStorage.setItem("loggedIn", "1");
  sessionStorage.setItem("userID", user);
};

export const switchMode = (list) => {
  list.forEach((str) => {
    $(str).toggleClass("dark");
  });
};
