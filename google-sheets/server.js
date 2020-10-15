const PORT = process.env.PORT || 4000;
const http = require('http');
const app = require('./routes/app')
const server = http.createServer(app);
server.listen(PORT)