require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customers.js')
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const json = {
	"name": "dawson mandago",
	"industry": "developer",
	"favouriteColors": [
		"yellow", "green", "blue"
	],
	"favouriteNumbers": [
		1, 2, 3
	],
	"favouritePeople": [
		{ "name": "mom", "role": "parent" },
		{ "name": "dad", "role": "parent" }
	]
}


app.get('/', (req, res) => {
	res.send(json)
})

app.get('/customers/all', async (req, res) => {
	try {
		const customers = await Customer.find();
		res.send({ 'Customers': customers });
	} catch (error) {
		console.log(error.message);
	}
})

app.get('/customer/:id', async (req, res) => {
	const data = req.params

	try {
		const customer = await Customer.findById(data.id);
		res.status(200).json({
			"message": "Only user", "user": {
				"user": customer.name,
				"industry": customer.industry
			}
		})
	} catch (error) {
		res.status(400).json({ "Error": error.message, "ml": "Failed to get data invalid uid" })
	}
})

app.get('/customers/', async (req, res) => {
	try {
		const data = await Customer.findOne({ "industry": req.query.ind })

		if (data) {
			res.status(200).json({ data })
		} else {
			res.status(200).json({ "message": "Not mached our data" })
		}
	} catch (error) {
		res.status(500).json({ "error": error.message })
	}
	// res.status(200).json({
	// 	"param": req.params,
	// 	"querys": req.query
	// })
})


app.post('/customers', async (req, res) => {
	try {
		const customer = new Customer({
			name: req.body.name,
			industry: req.body.industry
		})

		await customer.save()
		res.send({
			"message": "customer created", "customer-data": {
				name: customer.name,
				industry: customer.industry
			}
		});
	} catch (error) {
		console.log(error.message)
	}
})


app.patch('/customers/:id', async (req, res) => {
	try {

		const customer = await Customer.findByIdAndUpdate(req.params.id, {
			$set: { industry: req.body.industry }
		}, { new: true, runValidators: true });


		if (!customer) {
			return res.status(404).send({ message: 'Customer not found' });
		}

		res.send({
			message: 'Customer updated',
			'customer-data': {
				name: customer.name,
				industry: customer.industry,
			},
		});
	} catch (error) {

		console.log(error.message)

	}
})


app.delete('/customers/delAll', async (req, res) => {
	try {
		const findAll = await Customer.find();

		findAll.forEach(async element => {
			await Customer.findByIdAndDelete(element._id)
		});

		res.send({ "message": " all Data deleted" });
	} catch (error) {

		console.log(error.message);

	}
})




const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
	try {

		await mongoose.connect(process.env.MONGO_URI).then(() => { console.log('Connected to database') });
		console.log(`Api running on port ${PORT}`);

	} catch (error) {

		console.log(`Error: ${error.message}`)

	}
});

// git push -u origin main