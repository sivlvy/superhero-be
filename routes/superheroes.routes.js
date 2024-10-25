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
  upload.array("images", 10),

  validateBody(createSuperheroSchema),
  superHeroesControllers.createHero,
);

router.put(
  "/:id",
  upload.array("images", 10),
  validateBody(updateSuperheroSchema),
  superHeroesControllers.updateHero,
);

router.delete("/:id", superHeroesControllers.deleteHero);

module.exports = router;
