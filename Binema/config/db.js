const mysql = require('mysql');

// Use a connection POOL instead of a single createConnection.
// With createConnection, if MySQL closes the idle connection (wait_timeout),
// any subsequent query throws a fatal error that crashes Node.js.
// A pool automatically creates new connections as needed, preventing crashes.
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hqhhg',
    database: 'nodejsapi',
    charset: 'utf8mb4',
    connectionLimit: 10,
    multipleStatements: false,
});

// Explicitly catch pool-level errors (e.g., connection drops) so they never
// become uncaught EventEmitter exceptions that could kill the server.
db.on('error', (err) => {
    console.error('[MySQL pool error]', err.code, err.message);
});

// Verify the pool can connect at startup, set charset + raise packet limit.
db.getConnection((err, connection) => {
    if (err) { console.error('MySQL connect error:', err); return; }
    // utf8mb4 so Vietnamese text is never garbled
    connection.query("SET NAMES 'utf8mb4'");
    connection.query('SET CHARACTER SET utf8mb4');
    // Increase per-session max_allowed_packet so large base64 images don't get
    // rejected with ER_NET_PACKET_TOO_LARGE. Also run a GLOBAL upgrade once.
    connection.query('SET SESSION max_allowed_packet = 67108864', () => {
        connection.query('SET GLOBAL max_allowed_packet = 67108864', (e) => {
            if (e) console.warn('[MySQL] Could not SET GLOBAL max_allowed_packet:', e.message);
        });
        connection.release();
    });
    console.log('MySQL connected');
});

module.exports = db;
