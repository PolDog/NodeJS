const fs = require("fs");

function loadData() {
	try {
		let result = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
		return result;
	} catch (err) {
		console.error(err);
		return err;
	}
}

function saveData(incomingData) {
	try {
        const stringToSave='{"users":'+JSON.stringify(incomingData)+'}';
		fs.writeFileSync("./data.json", stringToSave);
		return "Save change!";
	} catch (err) {
		console.error(err);
		return err;
	}
}

module.exports = { loadData, saveData };
