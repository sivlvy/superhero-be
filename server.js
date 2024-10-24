const express = require("express");
const sequelize = require("./configs/db.config");
const app = express();
const superHeroesRoutes = require("./routes/superheroes.routes");

const PORT = 3000;

app.use(express.json());

app.use("/api", superHeroesRoutes);

sequelize
  .sync()
  .then(() => console.log("All models were synchronized successfully."))
  .catch((error) => console.error("Unable to synchronize models:", error));

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
