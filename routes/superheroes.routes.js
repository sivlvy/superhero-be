const router = require("express").Router();
const validateBody = require("../middlewares/validateBody");
const superHeroesControllers = require("../controllers/superheroes.controllers");
const {
  createSuperheroSchema,
  updateSuperheroSchema,
} = require("../schemes/superheroes.schemes");
const upload = require("../configs/multer.config");

router.get("/", superHeroesControllers.getAllHeroes);

router.post(
  "/",

  validateBody(createSuperheroSchema),
  upload.array("images", 10),
  superHeroesControllers.createHero,
);

router.put(
  "/:id",
  validateBody(updateSuperheroSchema),
  upload.array("images", 10),
  superHeroesControllers.updateHero,
);

router.delete("/:id", superHeroesControllers.deleteHero);

module.exports = router;
