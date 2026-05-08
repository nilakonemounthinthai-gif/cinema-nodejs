const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// ─── Global error guards ────────────────────────────────────────────────────
// EADDRINUSE must exit — if we just log and continue, the process lives but
// is NOT bound to any port, so every frontend request gets ERR_CONNECTION_REFUSED.
// All other uncaught errors are logged and the server keeps serving.
process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`[FATAL] Port ${err.port || 4000} is already in use.`);
        console.error('Stop the other process first, then restart the server.');
        process.exit(1);
    }
    console.error('[uncaughtException]', err);
});
process.on('unhandledRejection', (reason) => {
    console.error('[unhandledRejection]', reason);
});
// ────────────────────────────────────────────────────────────────────────────

const app = express();

app.use(cors());
app.options('*', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
});

app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));

require('./config/db');

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/api', require('./routes'));

app.listen(process.env.PORT || 4000, function () {
    console.log('Node app is running on port 4000');
});

module.exports = app;
