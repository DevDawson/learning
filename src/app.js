const express = require('express');

const app = express();

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



app.listen(3000, () => { console.log('data') });