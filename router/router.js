const express = require("express")
const userController = require("../controller/middleware")
const router = express.Router()


const fs = require('fs').promises;
const path = require('path');

const directoryPath = path.join(__dirname, 'temp');

// Read the contents of the directory
fs.readdir(directoryPath)
    .then(files => {
        // Delete each file
        const unlinkPromises = files.map(file => {
            const filePath = path.join(directoryPath, file);
            return fs.unlink(filePath)
                .then(() => console.log(`File ${filePath} deleted successfully`))
                .catch(err => console.error(`Error deleting file ${filePath}:`, err));
        });

        // Wait for all unlink promises to resolve
        return Promise.all(unlinkPromises);
    })
    .then(() => {
        console.log('All files deleted successfully');
    })
    .catch(err => {
        console.error('Error:', err);
    });



module.exports = router
