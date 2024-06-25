const express = require("express");
const app = express();
const port = process.env.PORT || 3010;

app.use(
  "/electromagneticparticles",
  express.static(path.join(__dirname, "public"))
);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
