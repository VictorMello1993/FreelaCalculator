import express from "express";

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
