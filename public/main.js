const { app, BrowserWindow, ipcMain } = require("electron");
let fs = require("fs");

let win;

function createWindow() {
     win = new BrowserWindow({
          minWidth: 800,
          minHeight: 800,
          icon: __dirname + "/app.ico",
          webPreferences: {
               nodeIntegration: true,
               contextIsolation: false,
               enableRemoteModule: true,
          },
     });

     win.removeMenu();
     win.loadURL("http://localhost:3000");
}

ipcMain.on("db:get", (event) => {
     const data = JSON.parse(fs.readFileSync("local_data/db.json", { encoding: "utf8" }));
     win.webContents.send("db:send", data);
});

ipcMain.on("db:update", (event, data) => {
     fs.writeFileSync("local_data/db.json", JSON.stringify(data), "utf8", () => {});
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
     if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
     if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
