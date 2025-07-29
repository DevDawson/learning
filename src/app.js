const express = require('express');

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
	res.send(req.body)
})

app.listen(3000, () => { console.log('data') });