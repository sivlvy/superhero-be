const router = require("express").Router();
const validateBody = require("../middlewares/validateBody");
const superHeroesControllers = require("../controllers/superheroes.controllers");
const {
  createSuperheroSchema,
  updateSuperheroSchema,
} = require("../schemes/superheroes.schemes");

router.get("/", superHeroesControllers.getAllHeroes);

router.post(
  "/",
  validateBody(createSuperheroSchema),
  superHeroesControllers.createHero,
);

router.put(
  "/:id",
  validateBody(updateSuperheroSchema),
  superHeroesControllers.updateHero,
);

router.delete("/:id", superHeroesControllers.deleteHero);

module.exports = router;
