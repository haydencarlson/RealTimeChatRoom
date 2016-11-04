var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const server = require('http').createServer();
const io = require('socket.io')(server, { path: '/socket' });

new WebpackDevServer(webpack(config),
{
  proxy:{
    '/socket/*': {
      target: 'ws://localhost:3001',
      ws: true
    }
  },
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})
.listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Running at http://0.0.0.0:3000`);
});

var userCount = 0;
io.on('connection', client => {
  console.log(`Client has connected with id ${client.id}`);
  userCount += 1;
  io.sockets.emit("userCountUp", userCount);

  client.on('message', data => {
    console.log('User:', data.username, 'sent', data.content, "userID", client.id);
    io.sockets.emit('message', data);
  })

  client.on('notification', notificationData => {
    console.log(notificationData);
    io.sockets.emit('notification', notificationData)
  })

  client.on('disconnect', client => {
    userCount -= 1;
    io.sockets.emit("userCountDown", userCount);
  });

})

server.listen(3001, function() { console.log(`WebSocket is listening`); });
