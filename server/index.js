const app = require("./app");
const connectDB = require("./db");
const config = require("./config");

const port = config.port || 8082;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
