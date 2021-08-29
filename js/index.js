const toggleScreens = () => {
  const joinCard = document.querySelector(".join-card");
  const chatCard = document.querySelector(".chat-card");

  joinCard.classList.toggle("d-none");
  chatCard.classList.toggle("d-none");
};

const joinGroup = () => {
  const groupNameInput = document.querySelector(".group-name").value;
  const groupName = document.querySelectorAll(".group-name")[1];

  groupName.innerText = groupNameInput;

  toggleScreens();
};

const logOut = () => {
  toggleScreens();
  console.log("logout!");
};

const creatMessage = (text) => {
  const message = document.createElement("p");
  message.classList.add("message", "message-right", "p-2");
  message.innerText = text;

  return message;
};

const sendMessage = () => {
  const textArea = document.querySelector(".message-input");
  const messagesBox = document.querySelector(".messages-box");

  if (!textArea.value) return;

  const message = creatMessage(textArea.value);

  messagesBox.appendChild(message);
  textArea.value = "";

  messagesBox.scrollTo(0, messagesBox.scrollHeight);

  console.log("sent!");
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
