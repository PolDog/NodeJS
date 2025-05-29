const express = require("express");
const { checkBody, checkParams } = require("./validation/validator");
const { idScheme, userScheme } = require("./validation/scheme");
const { loadData, saveData } = require("./controller/DataOperation");


const app = express();
app.use(express.json());

const users1 = [
	{ id: 1, name: "Name 1", description: "PC user 1" },
	{ id: 2, name: "Name 2", description: "PC user 2" },
	{ id: 3, name: "Name 3", description: "PC user 3" },
	{ id: 4, name: "Name 4", description: "PC user 4" },
	
];

let users=null;

app.use((req, res, next) => {
	users=loadData().users;
	next();
});

app.get("/users", (req, res) => {
	res.send({users});
});

app.get("/users/:id", checkParams(idScheme), (req, res) => {
	const user = users.find((user) => user.id === Number(req.params.id));
	if (user) {
		res.send({ user });
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.put("/users/:id", checkParams(idScheme), checkBody(userScheme), (req, res) => {
	const user = users.find((user) => user.id === Number(req.params.id));
	if (user) {
		const userIndex = users.indexOf(user);
		users[userIndex].name = req.body.name;
		users[userIndex].description = req.body.description;
		saveData(users)
		res.send(user.name+" is modify!");
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.delete("/users/:id", checkParams(idScheme), (req, res) => {
	const user = users.find((user) => user.id === Number(req.params.id));
	if (user) {
		const userIndex = users.indexOf(user);
		users.splice(userIndex, 1);
		saveData(users);
		res.send(user.name+" is delete!");
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.post("/users", checkBody(userScheme), (req, res) => {
	const uniqueID =Number(users.at(-1).id)+1;
	users.push({
		id: uniqueID,
		...req.body,
	});
	saveData(users);
	res.send(users.at(-1).name+" is create!");
});


app.use((req,res)=>{
	res.status(404).send({
		message:"URL not found"
	})
});


const port = 3000;

app.listen(port, () => {
	console.log(`server start on ${port} port`);
});
