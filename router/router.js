const express = require("express")
const userController = require("../controller/middleware")
const router = express.Router()


const fs = require('fs').promises;
const path = require('path');

const directoryPath = '/opt/render/project/src/router/Temp';

async function deleteFiles() {
    try {
        // Check if the directory exists
        await fs.access(directoryPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: Directory ${directoryPath} does not exist`);
            // Optionally, you can create the directory here using fs.mkdir
            // await fs.mkdir(directoryPath);
            process.exit(1); // Exit the script with an error code
        } else {
            console.error('Error:', error);
            process.exit(1); // Exit the script with an error code
        }
    }

    try {
        // Read the contents of the directory
        const files = await fs.readdir(directoryPath);

        // Delete each file
        const unlinkPromises = files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            await fs.unlink(filePath);
            console.log(`File ${filePath} deleted successfully`);
        });

        // Wait for all unlink promises to resolve
        await Promise.all(unlinkPromises);

        console.log('All files deleted successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}

deleteFiles();



module.exports = router
