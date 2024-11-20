const username = prompt("Enter your username");
const url = new URL(`./ws?username=${username}`, location.href);
const ws = new WebSocket(url);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.event) {
    case "update-users":
      updateUserList(data.usernames);
      break;
    case "send-message":
      addMessage(data.username, data.message);
      break;
  }
}

function updateUserList(usernames) {
  const userList = document.getElementById("users");
  userList.replaceChildren();

  for (const username of usernames) {
    const li = document.createElement("li");
    li.textContent = username;
    userList.appendChild(li);
  }
}

function addMessage(username, message) {
  const template = document.getElementById("message");
  const clone = template.content.cloneNode(true);
  clone.querySelector("span").textContent = username;
  clone.querySelector("p").textContent = message;
  document.getElementById("conversation").prepend(clone);
}

const input = document.getElementById("input");
input.focus();
const form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();
  const message = input.value;
  ws.send(JSON.stringify({ event: "send-message", message }));
  input.value = "";
};
