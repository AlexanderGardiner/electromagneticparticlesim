const express = require("express");
const app = express();
const port = process.env.PORT || 3010;
const path = require("path");
app.use(
  "/electromagneticparticlesim",
  express.static(path.join(__dirname, "public"))
);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
