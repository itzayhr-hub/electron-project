/* eslint-env node */
const { app, BrowserWindow } = require("electron");
const express = require("express");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "Test";

const expressApp = express();
const port = 3000;

expressApp.use(express.json());

//#region CORS
const cors = require("cors");
const whitelist = ["http://localhost:5173"];
expressApp.use(
	cors({
		// origin: process.env.ORIGIN
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);
//#endregion

expressApp.get("/api/mongodb-data", async (_request, response) => {
	try {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection("Colores");
		const documents = await collection.find({}).toArray();
		response.json(documents);
	} catch (error) {
		console.error("Error retrieving documents:", error);
		response.status(500).json({ error: "Error retrieving documents" });
	} finally {
		client.close();
	}
});

expressApp.post("/api/mongodb-data", async (request, response) => {
	try {
		const { user, color } = request.body;
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection("Colores");
		const result = await collection.insertOne({ user, color });
		response.json({ status: true, data: result, message: "¡Se insertó nuevo dato!" });
	} catch (error) {
		console.error("Error creating document:", error);
		response.status(500).json({ error: "Error creating document" });
	} finally {
		client.close();
	}
});

// Agrega rutas adicionales para actualizar y eliminar documentos

expressApp.listen(port, () => {
	console.log(`API Express en el puerto ${port}`);
});

function createWindow() {
	console.log("__dirname", __dirname);
	const mainWindow = new BrowserWindow({ width: 800, height: 600, icon: "public/icon2.png" });
	mainWindow.loadURL("http://localhost:5173/");
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("ready", () => {
	const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added extension: ${name}`))
		.catch((error) => console.error("Error adding extension: ", error));
});
