const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    // HOME
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    // ABOUT
    if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('About Us Page');
    }

    // CONTACT FORM - Show the form
    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Contact</title></head>
                <body>
                    <h2>Contact Us</h2>
                    <form method="POST" action="/contact">
                        <input type="text" name="name" placeholder="Your name" required />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);
    }

    // CONTACT FORM - Handle submission
    if (url === '/contact' && method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsed = querystring.parse(body);
            const name = parsed.name;

            console.log('Form submission received:', parsed);

            const timestamp = new Date().toISOString();
            const line = `[${timestamp}] Name: ${name}\n`;

            fs.appendFile('./submissions.txt', line, (err) => {
                if (err) {
                    console.error('Failed to write to file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('500 Internal Server Error - Could not save submission.');
                }

                console.log('Submission saved to submissions.txt');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>Thank You</title></head>
                        <body>
                            <h2>Thank you, ${name}!</h2>
                            <p>Your submission has been saved.</p>
                            <a href="/contact">Submit another</a>
                        </body>
                    </html>
                `);
            });
        });

        req.on('error', (err) => {
            console.error('Request error:', err);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request');
        });

        return;
    }

    // 404 FALLBACK — standalone, not attached to any if/else
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(3069, () => {
    console.log('Server is running at http://localhost:3069');
});