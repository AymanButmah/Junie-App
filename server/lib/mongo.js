const Mongoose = require("mongoose");

// const mongo_host = process.env.MONGO_HOST || 'mongo';
// const mongo_port = process.env.MONGO_PORT || 27017;
// const mongo_db_name = process.env.MONGO_DATABASE || 'task-tracker';

const mongo_url = `mongodb+srv://admin:admin123@cluster0.mwloy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.connect_to_db = async (callback) => {
  console.log("Connecting to database...");
  try {
    Mongoose.connect(mongo_url, options);
  } catch (e) {
    console.log(e);
    process.exit();
  }
  const db = Mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Successfully connected to database");
    callback();
  });
};
