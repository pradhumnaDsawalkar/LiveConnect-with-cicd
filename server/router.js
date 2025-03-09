const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.send('Server is up and running');
});

//------------------------ Deployment --------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Serve static React files
    router.use(express.static(path.join(__dirname1, "client", "build")));

    // Serve React's index.html for all unknown routes
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
    });
}

//------------------------ Deployment --------------------------

module.exports = router;
