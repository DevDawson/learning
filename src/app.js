const express = require('express');
const mongoose  = require('mongoose');

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const json = {
	"name":"dawson mandago",
	"industry": "developer",
	"favouriteColors": [
		"yellow","green","blue"
	],
	"favouriteNumbers":[
		1,2,3
	],
	"favouritePeople": [
		{"name": "mom", "role": "parent"},
		{"name": "dad", "role": "parent"}
	]
}

app.get('/', (req,res) => {
	res.send({"data": json})
})


app.post('/customers', (req,res) => {
	res.send(req.body);
})

app.listen(3000, async () => { 
	try {
		await mongoose.connect('mongodb://localhost:27017/today').then(()=>{console.log('Connected to database')})
		console.log('data') 
	} catch (error) {
		console.log(`Error: ${error}`)
	}	
});

// git push -u origin main