const ctrlWrapper = require("../helpers/ctrlWrapper");
const Superhero = require("../models/superheroes.models");

const getAllHeroes = async (req, res) => {
  const result = await Superhero.findAll();
  res.status(200).json({
    data: {
      heroes: result,
      totalHeroes: result.length,
    },
  });
};

const createHero = async (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = req.body;

  const newHero = await Superhero.create({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  });
  res.status(201).json(newHero);
};

const updateHero = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const [updated] = await Superhero.update(updateData, { where: { id } });

  if (!updated) return res.status(404).json({ message: "Superhero not found" });

  const updatedHero = await Superhero.findByPk(id);

  res.status(200).json(updatedHero);
};

const deleteHero = async (req, res) => {
  const { id } = req.params;

  const deleted = await Superhero.destroy({ where: { id } });

  if (!deleted) return res.status(404).json({ message: "Superhero not found" });

  res.status(204).send();
};

module.exports = {
  getAllHeroes: ctrlWrapper(getAllHeroes),
  createHero: ctrlWrapper(createHero),
  updateHero: ctrlWrapper(updateHero),
  deleteHero: ctrlWrapper(deleteHero),
};
