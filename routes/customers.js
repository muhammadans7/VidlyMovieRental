const express = require("express");

const mongoose = require("mongoose");

const { Customer, validateCustomer } = require("../models/customer");

const router = express.Router();



router.get("/", async (req, res) => {
	const customers = await Customer.find();
	res.send(customers);
});




router.post("/", async (req, res) => {
	

	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone,
	});

	const result = await customer.save();

	res.send(result);
});

router.put("/:id", async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			isGold: req.body.isGold,
			phone: req.body.phone,
		},
		{
			new: true,
		}
	);

	if (!customer) return res.status(404).send("id is wrong");

	res.send(customer);
});

router.delete("/:id", async (req, res) => {

	const customer = await Customer.findByIdAndDelete(req.params.id);

	if (!customer) return res.status(404).send("id is wrong");

	res.send(customer);
});

router.delete("/:id", async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);

	if (!customer) return res.status(404).send("id invalid");

	res.send(customer);
});


router.get("/:id", async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer) return res.status(404).send("id is wrong");

	res.send(customer);
});

module.exports = router;
