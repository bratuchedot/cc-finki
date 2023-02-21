import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/upload", upload.single("numbers"), (req, res) => {
  const startTime = process.hrtime(); // Start measuring the execution time

  // Read the uploaded file and split into an array of numbers
  const readStartTime = process.hrtime(); // Start measuring the reading time of the file
  const numbers = fs
    .readFileSync(req.file.path, "utf-8")
    .trim()
    .split(" ")
    .map(Number);
  const readEndTime = process.hrtime(); // Stop measuring the reading time of the file

  // Find the max number and its index
  const calcStartTime = process.hrtime(); // Start measuring the processing time
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
  const calcEndTime = process.hrtime(); // Stop measuring the processing time

  // Send the result as a JSON object
  const endTime = process.hrtime(); // Stop measuring the execution time

  const readTime =
    (readEndTime[0] - readStartTime[0]) * 1000 +
    (readEndTime[1] - readStartTime[1]) / 1e6;
  const calcTime =
    (calcEndTime[0] - calcStartTime[0]) * 1000 +
    (calcEndTime[1] - calcStartTime[1]) / 1e6;
  const totalTime =
    (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1e6;

  res.json({ max, index, readTime, calcTime, totalTime });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
