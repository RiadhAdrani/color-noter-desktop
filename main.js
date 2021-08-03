const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
     console.log("App is ready");
     mainWindow = new BrowserWindow({
          webPreferences: {
               nodeIntegration: true,
               contextIsolation: false,
               enableRemoteModule: true,
          },
     });
     mainWindow.loadURL(`file://${__dirname}/index.html`);
});
