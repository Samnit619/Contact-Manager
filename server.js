const express = require("express");

const app = express();

const port = process.env.PORT || 5000;


app.use("/api/contacts", require("./routes/contact_routes"));

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})