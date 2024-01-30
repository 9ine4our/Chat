document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website List</title>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
  
  <style>
    body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h2 {
  text-align: center;
  color: #333;
}

form {
  margin-bottom: 20px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 40%;
  box-sizing: border-box;
}

button:hover {
  background-color: #45a049;
}

.table-wrapper {
  width: 100%;
  max-width: 500px;
  overflow-x: auto;
  margin-top: 20px;
}

table {
  margin: 10px;
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  word-wrap: break-word;
}

tbody tr:hover {
  background-color: #f5f5f5;
}

th {
  background-color: #4caf50;
  color: white;
}

tfoot {
  background-color: #4a524a;
  color: white;
}
  </style>
</head>
<body>
  <h2>Daftar Website</h2>

  <form id="websiteForm">
    <label for="websiteName">Website:</label>
    <input type="text" id="websiteName" name="websiteName" required>

    <label for="websiteURL">URL:</label>
    <input type="url" id="websiteURL" name="websiteURL" required>

    <button type="button" onclick="addWebsite()">Tambah Website</button>
    
  <div id="notification"></div>
  </form>

  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Website</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody id="websiteTableBody">
      <!-- Data akan ditambahkan di sini -->
    </tbody>
  </table>

  <script>
    const firebaseConfig = {
      databaseURL: "https://upload-98f07-default-rtdb.firebaseio.com/",
    };

    // Inisialisasi Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    function addWebsite() {
      const websiteNameInput = document.getElementById('websiteName');
      const websiteURLInput = document.getElementById('websiteURL');
      const messageInput = document.getElementById('messageInput');  // Declare messageInput

      const websiteName = websiteNameInput.value;
      const websiteURL = websiteURLInput.value;

      if (websiteName && websiteURL) {
        // Tambahkan data ke Firebase Realtime Database
        const newWebsiteRef = database.ref('websites').push();
        newWebsiteRef.set({
          name: websiteName,
          url: websiteURL
        });

        // Bersihkan input setelah ditambahkan
        websiteNameInput.value = '';
        websiteURLInput.value = '';
        messageInput.value = '';
        
        // Display success notification
        const notificationElement = document.getElementById('notification');
        notificationElement.innerHTML = '<p class="success-notification">Website added successfully!</p>';
        setTimeout(() => {
          notificationElement.innerHTML = '';
        }, 3000);
      } else {
        alert('Mohon isi semua kolom.');
      }
    }

    // Ambil data dari Firebase saat halaman dimuat
    const websiteTableBody = document.getElementById('websiteTableBody');
    let rowNumber = 1; // Initialize rowNumber

    database.ref('websites').on('child_added', function(snapshot) {
      const website = snapshot.val();
      const newRow = websiteTableBody.insertRow(websiteTableBody.rows.length);

      const cellNumber = newRow.insertCell(0);
      const cellName = newRow.insertCell(1);
      const cellURL = newRow.insertCell(2);

      cellNumber.textContent = rowNumber;
      rowNumber++; // Increment rowNumber for the next entry
      cellName.textContent = website.name;
      cellURL.innerHTML = `<a href="${website.url}" target="_blank">${website.url}</a>`;
    });
  </script>
</body>
</html>
`);
