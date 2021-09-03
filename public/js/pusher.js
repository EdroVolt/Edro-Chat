Pusher.logToConsole = true;

const pusher = new Pusher("953c6cec894653cecd0a", {
  cluster: "ap2",
  encrypted: true,
  authEndpoint: "pusher/auth",
});

// fetch post request function
const postData = (url = "", data) => {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// listen for joining groups and binding sending messages to this group
const listen = (appendMessage, data) => {
  const channel = pusher.subscribe(`presence-${data.groupName}`);

  channel.bind("message_sent", ({ username, message }) => {
    data.side =
      username === document.querySelector(".name").value ? "right" : "left";
    appendMessage(message, username);
  });
};

const sendPusherRequest = (updateOnlineUsers, appendMessage, data) => {
  postData("join-chat", {
    username: document.querySelector(".name").value,
  }).then((res) => {
    const channel = pusher.subscribe(`presence-${data.groupName}`);

    channel.bind("pusher:subscription_succeeded", (members) => {
      console.log(channel.members);
      data.online = members.count;
      updateOnlineUsers();
    });

    // User joins chat
    channel.bind("pusher:member_added", (member) => {
      console.log(`${member.id} joined the chat`);
      data.online++;
      updateOnlineUsers();
    });

    // User leave chat
    channel.bind("pusher:member_removed", (member) => {
      console.log(`${member.id} leaved the chat`);
      data.online--;
      updateOnlineUsers();
    });

    // Listen for chat messages
    listen(appendMessage, data);
  });
};

const sendPusherMessage = (url, message) => {
  postData(url, message);
};

const leavGroup = (data) => {
  pusher.unsubscribe(`presence-${data.groupName}`);
};

export { sendPusherRequest, sendPusherMessage, leavGroup };
