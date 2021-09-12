import { Menu } from "electron";

const isMac = process.platform === "darwin";

export default webContents => {
  const template = [
    {
      label: "File",
      submenu: [{ role: isMac ? "close" : "quit" }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
