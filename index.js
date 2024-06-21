const express = require("express");
const AppRoutes = require("./routes")

const app = express();
app.use(express.json());

app.use("/",AppRoutes)




app.listen(8000, () => console.log("App is listening to port 8000"));