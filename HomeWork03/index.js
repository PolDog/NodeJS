const express = require("express");
const patch = require("path");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
	// console.log("receve request ", req.method, req.url);
	next();
});

app.get("/", (req, res) => {

	res.send(`<h1>Корневая страница!</h1>
        <p>Просмотров: ${setAmountView(req.url)}</p>
        <p><a href="http://localhost:3000/about">Ссылка на страницу /about</a></p>
        `);
});

app.get("/about", (req, res) => {
	res.send(`
        <h1>about</h1>
        <p>Просмотров: ${setAmountView(req.url)}</p>
        <p><a href="http://localhost:3000/">Ссылка на страницу /</a></p>
        `);
});

const port = 3000;

app.listen(port, () => {
	console.log(`server start on ${port} port`);
});

function setAmountView(value) {
	try {
		let result = JSON.parse(fs.readFileSync("./amountView.json", "utf-8"));
        let amount=0;
		switch (value) {
			case "/":
				amount = Number(result.main) + 1;
				result.main = amount;
				fs.writeFileSync("./amountView.json", JSON.stringify(result));
				return amount;
			case "/about":
				amount = Number(result.about) + 1;
				result.about = amount;
				fs.writeFileSync("./amountView.json", JSON.stringify(result));
				return amount;
			default:
				return 0;
		}
	} catch (err) {
		console.error(err);
		return 0;
	}
}
