var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("myApp", {
  openFile: async () => {
    const result = await import_electron.ipcRenderer.invoke("openFile");
    return result;
  },
  saveFile: async (currentPath, textData) => {
    const result = await import_electron.ipcRenderer.invoke("saveFile", currentPath, textData);
    return result;
  }
});
