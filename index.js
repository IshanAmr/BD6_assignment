const { connectDB, startServer } = require('./server');

connectDB().then(() => {
  startServer();
});
