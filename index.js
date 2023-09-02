import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/upload", upload.single("numbers"), (req, res) => {
  const executionStartTime = process.hrtime();

  // Read the uploaded file and split into an array of numbers
  const readingStartTime = process.hrtime();
  const numbers = fs
    .readFileSync(req.file.path, "utf-8")
    .trim()
    .split(" ")
    .map(Number);
  const readingEndTime = process.hrtime();

  // Find the max number and its index
  const processingStartTime = process.hrtime();
  /**
   * const max = Math.max(...numbers);
   * const index = numbers.indexOf(max);
   * RangeError: Maximum call stack size exceeded.
   */
  let max = numbers[0];
  let index = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
      index = i;
    }
  }
  const processingEndTime = process.hrtime();

  const executionEndTime = process.hrtime();

  const readingTime =
    (readingEndTime[0] - readingStartTime[0]) * 1000 +
    (readingEndTime[1] - readingStartTime[1]) / 1e6;
  const processingTime =
    (processingEndTime[0] - processingStartTime[0]) * 1000 +
    (processingEndTime[1] - processingStartTime[1]) / 1e6;
  const executionTime =
    (executionEndTime[0] - executionStartTime[0]) * 1000 +
    (executionEndTime[1] - executionStartTime[1]) / 1e6;

  // Send the result as a JSON object
  res.json({ max, index, readingTime, processingTime, executionTime });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
