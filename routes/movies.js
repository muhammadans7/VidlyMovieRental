const exprees = require("express");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = exprees.Router();

router.get("/", async (req, res) => {
	const movies = await Movie.find();

	res.send(movies);
});



router.post("/", [auth, admin], async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(404).send("id not found of given genre");

	let movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name,
		},
	});

	movie = await movie.save();

	res.send(movie);
}); 

class Shape{
	constructor(color) {
		this.color = color;
	}
}



router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const theGenre = await Genre.findById(req.body.genreId);
	if (!theGenre) return res.status(404).send("genre id was wrong");

	const movie = await Movie.updateOne(
		{ _id: req.params.id },
		{
			$set: {
				title: req.body.title,
				genre: {
					_id: theGenre._id,
					name: theGenre.name,
				},

				numberInStock: req.body.numberInStock,

				dailyRentalRate: req.body.dailyRentalRate,
			},
		},
		{ new: true }
	);

	res.send(movie);
});

router.delete("/:id", async (req, res) => {
	const movie = await Movie.findByIdAndDelete(req.params.id);

	if (!movie) return res.status(404).send("not found");

	res.send(movie);
});

router.get("/:id", async (req, res) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) return res.status(404).send("not found");

	res.send(movie);
});

module.exports = router;
