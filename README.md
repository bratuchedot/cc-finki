# Cloud Computing Project - FCSE Skopje
## _Find maximum number and its index from an array of random integers_

This repository contains a Node.js application that provides a simple interface for uploading a text file (.txt) containing numbers. The application reads the numbers from the file, iterates through them, and finds the maximum number along with its index. It also calculates the time needed for various parts of the process, including reading the file, processing the numbers, and the overall execution time.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/bratuchedot/cc-finki.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cc-finki
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Start the Node.js application:
    ```bash
    node .
    ```
5. Open your web browser and visit http://localhost:3000 to access the application.

## How to Use

1. Once the application is running, you will see a simple interface with a file upload button.
2. Click the "Choose File" button to select a text file (.txt) containing numbers and upload it.
3. The application will process the file and display the following information:
    - Maximum Number: The largest number found in the file.
    - Index of Maximum Number: The position of the maximum number in the array.
    - Reading Time: The time taken to read the file and convert it into an array.
    - Processing Time: The time taken to find the maximum number and its index.
    - Total Execution Time: The overall time taken to execute the entire function.

## Technology Stack
- Node.js: Used to build the backend of the application.
- Express.js: A web framework for handling HTTP requests.
- Multer: Middleware for handling file uploads.
- fs: Node.js built-in module for file system operations.
