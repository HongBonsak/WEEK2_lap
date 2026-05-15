const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello, World!');
  return res.end();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



// Q1 – What error message do you see in the terminal when you access http://localhost:3000? What line of code causes it?
// The problem is a typo: endd() should be end()

// Q2 – What is the purpose of res.write() and how is it different from res.end()?
// -You can call it multiple times
// -Example: res.write('Hello') sends "Hello" to the browser
// -Tells the server "I'm done sending data"
// -Must be called to complete the response
// -Can optionally send final data: res.end('Goodbye')

// Q3 – What do you think will happen if res.end() is not called at all?
// The browser will hang and wait forever because the server never tells it the response is complete. Eventually the browser will timeout with an error.

// Q4 – Why do we use http.createServer() instead of just calling a function directly?
//  The callback function passed to http.createServer() runs every time a request comes in. This lets the server:
// -Listen continuously (not just once)
// -Handle multiple requests
// -Keep running indefinitely

// Q5 – How can the server be made more resilient to such errors during development?
// -Use linters (ESLint) — catches typos like endd
// -Use TypeScript — catches method name errors
// -Use nodemon — auto-restarts when you fix errors
// -Add try-catch blocks — catches runtime errors
// -Add logging — helps debug what went wrong




