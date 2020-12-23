import express from "express";

import { getTrianglesFromSizes } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;
const staticDir = "docs";

app.set("port", PORT);

app.use("/", express.static(staticDir));

app.use(express.json()); // for parsing application/json

app.post("/box", (req, res) => {
  console.log(req.body);
  res.json(getTrianglesFromSizes(req.body));
});

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Start server on port ${PORT}.`);
});
