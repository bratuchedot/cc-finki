const form = document.querySelector("#upload-form");
const responseDiv = document.querySelector("#response");
const spinner = document.querySelector("#spinner");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numbersInput = document.querySelector("#numbers");
  const numbersFile = numbersInput.files[0];
  const formData = new FormData();
  formData.append("numbers", numbersFile);
  showSpinner(); // show the spinner
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      hideSpinner(); // hide the spinner
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
            <td>${data.readingTime.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Processing Time (ms)</th>
            <td>${data.processingTime.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Total Execution Time (ms)</th>
            <td>${data.executionTime.toFixed(2)}</td>
          </tr>
        </table>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
