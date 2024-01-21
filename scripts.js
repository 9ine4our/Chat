firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();

  if (message !== '') {
    const sender = 'User';
    database.ref('messages').push({
      sender: sender,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });

    messageInput.value = '';
    const notificationElement = document.getElementById('notification');
    notificationElement.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
    setTimeout(() => {
      notificationElement.innerHTML = '';
    }, 3000);
  }
}

function receiveMessages() {
  const messagesDiv = document.getElementById('messages');

  database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');

    const senderName = message.sender === 'User' ? `<strong>${message.sender}</strong>` : message.sender;
    messageElement.innerHTML = `<p>${senderName}: ${message.message}</p><small>${formatTimestamp(message.timestamp)}</small>`;

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return `${hours}:${minutes}`;
}

receiveMessages();
