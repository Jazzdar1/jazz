const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/license', (req, res) => {
    const message = req.body;
    const license = generateClearKeyLicense(message);
    res.send(license);
});

function generateClearKeyLicense(message) {
    // Implement ClearKey license generation logic
    // This is a placeholder function
    return Buffer.from('your_clearkey_license_here', 'base64');
}

app.get('/api/generate-link', (req, res) => {
    const { stream, epg, key } = req.query;
    const link = generateLink('http://your_frontend_url', stream, epg, key);
    res.send({ link });
});

function generateLink(baseUrl, streamUrl, epgUrl, clearkey) {
    const params = new URLSearchParams({ stream: streamUrl, epg: epgUrl, key: clearkey });
    return `${baseUrl}?${params.toString()}`;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
