import { sendPusherRequest, sendPusherMessage, leavGroup } from "./pusher.js";

// global data object
const data = {
  username: "",
  groupName: "",
  side: "",
  online: 0,
};

const toggleScreens = () => {
  const joinCard = document.querySelector(".join-card");
  const chatCard = document.querySelector(".chat-card");

  joinCard.classList.toggle("d-none");
  chatCard.classList.toggle("d-none");
};

const updateOnlineUsers = () => {
  const online = document.querySelector(".online-users");
  online.innerText = data.online;
};

const joinGroup = () => {
  const groupNameInput = document.querySelector(".group-name").value;
  const groupName = document.querySelectorAll(".group-name")[1];
  data.username = document.querySelector(".name").value;

  data.groupName = groupNameInput;
  groupName.innerText = groupNameInput;

  sendPusherRequest(updateOnlineUsers, appendMessage, data);

  toggleScreens();
};

const logOut = () => {
  leavGroup(data);
  toggleScreens();
  console.log("logout!");
};

const creatMessage = (text, username) => {
  const messageCard = document.createElement("div");
  const messageHeader = document.createElement("h5");
  const messageBody = document.createElement("p");

  messageHeader.innerText = username;
  messageBody.innerText = text;

  messageCard.classList.add("message", `message-${data.side}`, "p-2");
  messageCard.appendChild(messageHeader);
  messageCard.appendChild(messageBody);

  return messageCard;
};

const appendMessage = (messageText, username) => {
  const messagesBox = document.querySelector(".messages-box");
  const message = creatMessage(messageText, username);

  messagesBox.appendChild(message);

  messagesBox.scrollTo(0, messagesBox.scrollHeight);

  const audio = new Audio("./sound/send-message.mp3");
  audio.play();
};

const sendMessage = () => {
  const textArea = document.querySelector(".message-input");

  if (!textArea.value) return;

  const message = {
    username: data.username,
    message: textArea.value,
    groupName: data.groupName,
  };

  sendPusherMessage("send-message", message);

  textArea.value = "";
};

const handleTextAreaKeypress = (event) => {
  if (event.keyCode === 13 && !event.altKey) {
    // Cancel the default action
    event.preventDefault();
    sendMessage();
  } else if (event.keyCode === 13 && event.altKey) {
    event.target.value += "\n";
  }
};

window.joinGroup = joinGroup;
window.logOut = logOut;
window.handleTextAreaKeypress = handleTextAreaKeypress;
window.sendMessage = sendMessage;

export { joinGroup };
