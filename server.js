// Минимальный статический сервер без зависимостей.
// Railway передаёт порт через переменную окружения PORT.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const indexFile = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  // Простая защита от обхода путей; отдаём только index.html (одностраничное приложение).
  fs.readFile(indexFile, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Ошибка чтения index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Игра в интерпретацию слушает порт ' + PORT);
});
