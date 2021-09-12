import "regenerator-runtime/runtime";
import { app, BrowserWindow, shell } from "electron";
import { join } from "path";

import createMenu from "./createMenu";

const isMac = process.platform === "darwin";
let mainWindow = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const { webContents } = mainWindow;

  createMenu(webContents);

  const address =
    process.env.NODE_ENV === "production"
      ? "./index.html"
      : "../renderer/index.html";

  mainWindow.loadURL(`file://${join(__dirname, address)}`);

  webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error(`"mainWindow" is not defined`);
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
    if (process.env.NODE_ENV === "development") {
      webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch(console.log);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
