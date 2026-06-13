const mysql = require('mysql2');

// Use a connection POOL instead of a single createConnection.
// With createConnection, if MySQL closes the idle connection (wait_timeout),
// any subsequent query throws a fatal error that crashes Node.js.
// A pool automatically creates new connections as needed, preventing crashes.
const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'nodejsapi',
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4',
    timezone: 'UTC',
    connectionLimit: 10,
    multipleStatements: false,
};
const db = mysql.createPool(dbConfig);

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
