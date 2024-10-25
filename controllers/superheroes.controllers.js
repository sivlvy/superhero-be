const ctrlWrapper = require("../helpers/ctrlWrapper");
const Superhero = require("../models/superheroes.models");
const cloudinary = require("../configs/cloudinary.config");

const uploadImagesToCloudinary = async (files) => {
  const uploads = files.map((file) => {
    return cloudinary.uploader.upload(file.path, { folder: "superheroes" });
  });

  const results = await Promise.all(uploads);
  return results.map((result) => result.secure_url);
};

const getAllHeroes = async (req, res) => {
  const result = await Superhero.findAll();
  res.status(200).json({
    heroes: result,
    totalHeroes: result.length,
  });
};

const createHero = async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;

  let images = [];

  if (req.files && req.files.length > 0) {
    images = await uploadImagesToCloudinary(req.files);
  }

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

  if (req.files && req.files.length > 0) {
    const images = await uploadImagesToCloudinary(req.files);
    updateData.images = images;
  }

  const [updated] = await Superhero.update(updateData, { where: { id } });

  if (!updated) return res.status(404).json({ message: "Superhero not found" });

  const updatedHero = await Superhero.findByPk(id);

  res.status(200).json(updatedHero);
};

const deleteHero = async (req, res) => {
  const { id } = req.params;

  const deletedHero = await Superhero.findByPk(id);
  if (deletedHero) {
    deletedHero.images.forEach((image) => {
      const publicId = image.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(publicId);
    });
  }

  const deleted = await Superhero.destroy({ where: { id } });

  if (!deleted) return res.status(404).json({ message: "Superhero not found" });

  res.status(200).json({ message: "Superhero deleted" });
};

module.exports = {
  getAllHeroes: ctrlWrapper(getAllHeroes),
  createHero: ctrlWrapper(createHero),
  updateHero: ctrlWrapper(updateHero),
  deleteHero: ctrlWrapper(deleteHero),
};
