const form = document.querySelector("#upload-form");
const responseDiv = document.querySelector("#response");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numbersInput = document.querySelector("#numbers");
  const numbersFile = numbersInput.files[0];
  const formData = new FormData();
  formData.append("numbers", numbersFile);
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the result in a table
      responseDiv.innerHTML = `
        <table>
          <tr>
            <th>Max Number</th>
            <td>${data.max}</td>
          </tr>
          <tr>
            <th>Index</th>
            <td>${data.index}</td>
          </tr>
          <tr>
            <th>Reading Time (ms)</th>
            <td>${data.readTime.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Processing Time (ms)</th>
            <td>${data.calcTime.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Total Execution Time (ms)</th>
            <td>${data.totalTime.toFixed(2)}</td>
          </tr>
        </table>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
