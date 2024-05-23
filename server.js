const express = require("express");
const errorHandler = require("./Middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", require("./routes/contact_routes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
