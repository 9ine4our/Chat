document.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <link rel="stylesheet" href="https://rawcdn.githack.com/9ine4our/Chat/1904497b7035d5196d3b1d30801d79571bc836d5/styles.css" />
  </head>
  <body>
    <h1>Chat App</h1>
    <div id="chat">
      <div id="messages"></div>
      <input type="text" id="messageInput" placeholder="Type your message">
      <button onclick="sendMessage()">Send</button>
    </div>
    <div id="notification"></div>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="https://rawcdn.githack.com/9ine4our/Chat/982068e3ccdb990e24a3af333d7bf9584d274a41/config.js"></script>
    <script src="https://rawcdn.githack.com/9ine4our/Chat/68164ae5b5109ba8c5f25d07e6386322f1164816/scripts.js"></script>
  </body>
  </html>
`);
