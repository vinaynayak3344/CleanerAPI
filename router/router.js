const express = require("express")
const userController = require("../controller/middleware")
const router = express.Router()


const fs = require('fs');
const path = require('path');

const tempDirectory = 'C:\\Windows\\Temp';

// Check if the directory exists
if (!fs.existsSync(tempDirectory)) {
  console.error(`The directory ${tempDirectory} does not exist.`);
  return;
}

// Log current working directory
console.log('Current working directory:', process.cwd());

// Read the contents of the temp directory
fs.readdir(tempDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log('Files in directory:', files);

  // Delete each file
  files.forEach(file => {
    const filePath = path.join(tempDirectory, file);

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting file ${filePath}:`, unlinkErr);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  });
});







// router.post("/emailsend", userOTP.emailSand)

module.exports = router
