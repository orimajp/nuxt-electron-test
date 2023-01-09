var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_electron = require("electron");
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
process.env.ROOT = import_path.default.join(__dirname, "../..");
process.env.DIST = import_path.default.join(process.env.ROOT, "dist-electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? import_path.default.join(process.env.ROOT, "public") : import_path.default.join(process.env.ROOT, ".output/public");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const preload = import_path.default.join(process.env.DIST, "preload.js");
const bootstrap = () => {
  const win = new import_electron.BrowserWindow({
    width: 800,
    height: 540,
    webPreferences: {
      preload
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(import_path.default.join(process.env.VITE_PUBLIC, "index.html"));
  }
};
import_electron.app.whenReady().then(() => {
  bootstrap();
  import_electron.app.on("activate", () => {
    if (import_electron.BrowserWindow.getAllWindows().length === 0)
      bootstrap();
  });
});
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    import_electron.app.quit();
});
const openFile = async () => {
  const win = import_electron.BrowserWindow.getFocusedWindow();
  const result = await import_electron.dialog.showOpenDialog(
    win,
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Documents",
          extensions: ["txt", "html", "md", "js", "ts"]
        }
      ]
    }
  );
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const textData = import_fs.default.readFileSync(filePath, "utf8");
    return {
      filePath,
      textData
    };
  }
  return null;
};
const saveFile = async (event, currentPath, textData) => {
  let saveFilePath;
  if (currentPath) {
    saveFilePath = currentPath;
  } else {
    const win = import_electron.BrowserWindow.getFocusedWindow();
    const result = await import_electron.dialog.showSaveDialog(
      win,
      {
        properties: ["openFile"],
        filters: [
          {
            name: "Documents",
            extensions: ["txt", "html", "md", "js", "ts"]
          }
        ]
      }
    );
    if (result.canceled) {
      return;
    }
    saveFilePath = result.filePath;
  }
  import_fs.default.writeFileSync(saveFilePath, textData);
  return { filePath: saveFilePath };
};
import_electron.ipcMain.handle("openFile", openFile);
import_electron.ipcMain.handle("saveFile", saveFile);
