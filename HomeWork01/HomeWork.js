const http = require("http");
let amountMain = 0;
let amountAbout = 0;
let amountError = 0;

const server = http.createServer((req, res) => {
	console.log("запрос получен ", amountMain);
	if (req.url === "/") {
		res.writeHead(200, {
			"content-type": "text/html; charset=UTF-8",
		});
		this.amountMain = amountMain++;
		res.end(`
			<p><h1>Welcome! Число просмотров ${amountMain}</h1></p>
			<p><a href="http://localhost:3000/about">About</a></p>
			`);
	} else if (req.url === "/about") {
		res.writeHead(200, {
			"content-type": "text/html; charset=UTF-8",
		});
		this.amountAbout = amountAbout++;
		res.end(`<h1>About  Число просмотров ${amountAbout}</h1>
			<p><a href="http://localhost:3000/">Main</a></p>
			`);
	} else {
		res.writeHead(404, {
			"content-type": "text/html; charset=UTF-8",
		});
		this.amountError = amountError++;
		res.end(`
			<h1>Нету тут   Число просмотров ${amountError}</h1>
			<p><a href="http://localhost:3000/">Main</a></p>
			`);
	}
});

const port = 3000;

server.listen(port, () => {
	console.log(`сервер работает на проту ${port}`);
});
