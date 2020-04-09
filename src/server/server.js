import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';

const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Star Match Game</title>
        <link rel="stylesheet" href="/main.css">
      </head>
      <body>
        <div id="mountNode">${initialMarkup}</div>
        <script src="/main.js"></script>
        <script src="/vendor.js"></script>
      </body>
    </html>
  `)
});

server.listen(4242, () => console.log('Server is running...'));