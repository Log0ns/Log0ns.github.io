var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var mysql = require('mysql');

const pool = mysql.createPool({
    host: 'testdb.ctikxliuo361.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'logan4jacobson',
    password: 'Irfawsdbts132!',
    database: 'testdb'
});

// HTTP server configuration
const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/') {
        serveFile(res, 'index.html', 'text/html');
    } else if (url === '/script.js') {
        serveFile(res, 'script.js', 'application/javascript');
    } else if (url === '/style.css') {
        serveFile(res, 'style.css', 'text/css');
    } else if (url.startsWith('/images/')) {
        const imagePath = url.slice(1);
        serveFile(res, imagePath, getContentType(imagePath));
    } else if (url === '/register' && method === 'POST') {
        handleRegister(req, res);
    } else if (url === '/login' && method === 'POST') {
        handleLogin(req, res);
    } else if (url === '/delete' && method === 'POST') {
        handleDeleteAccount(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

function serveFile(res, filename, contentType) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }
        res.setHeader('Content-Type', contentType);
        res.end(content);
    });
}

function getContentType(filename) {
    const extension = path.extname(filename).toLowerCase();

    switch (extension) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

// Registration logic
function handleRegister(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { username, password } = JSON.parse(body);

        // Check if the username already exists
        pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }

            if (results.length > 0) {
                res.statusCode = 409; // Conflict
                res.end('Username already exists');
            } else {
                // Insert the new user into the database
                pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                        return;
                    }

                    res.statusCode = 200;
                    res.end('Registration successful');
                });
            }
        });
    });
}

// Login logic
function handleLogin(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { username, password } = JSON.parse(body);

        // Check if the username and password match a user in the database
        pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.statusCode = 401; // Unauthorized
                res.end('Invalid username or password');
            } else {
                res.statusCode = 200;
                res.end('Login successful');
            }
        });
    });
}

// Account deletion logic
function handleDeleteAccount(req, res) {
    // Perform any necessary authentication or authorization checks

    // Delete the account from the database
    pool.query('DELETE FROM users WHERE username = ?', [username], (error) => {
        if (error) {
            console.error('Error executing query:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }

        res.statusCode = 200;
        res.end('Account deleted');
    });
}

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Handle user registration
function handleRegister(req, res) {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        const { username, password } = JSON.parse(data);

        // Use the pool to execute the query
        pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.end('User registered successfully');
            }
        });
    });
}

// Handle user login
function handleLogin(req, res) {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        const { username, password } = JSON.parse(data);

        // Use the pool to execute the query
        pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else if (results.length === 0) {
                res.statusCode = 401;
                res.end('Invalid username or password');
            } else {
                res.statusCode = 200;
                res.end('Login successful');
            }
        });
    });
}

// Handle user account deletion
function handleDelete(req, res) {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        const { username } = JSON.parse(data);

        // Use the pool to execute the query
        pool.query('DELETE FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.end('User not found');
            } else {
                res.statusCode = 200;
                res.end('User account deleted');
            }
        });
    });
}

pool.end();

/*http.createServer(function (req, res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);*/