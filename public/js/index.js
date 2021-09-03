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

const creatMessage = (text) => {
  const message = document.createElement("p");
  message.classList.add("message", `message-${data.side}`, "p-2");
  message.innerText = text;

  return message;
};

const appendMessage = (messageText) => {
  const messagesBox = document.querySelector(".messages-box");
  const message = creatMessage(messageText);

  messagesBox.appendChild(message);

  messagesBox.scrollTo(0, messagesBox.scrollHeight);

  const audio = new Audio("./sound/send-message.mp3");
  audio.play();
};

const sendMessage = () => {
  const textArea = document.querySelector(".message-input");

  if (!textArea.value) return;

  const message = {
    username: document.querySelector(".name").value,
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
