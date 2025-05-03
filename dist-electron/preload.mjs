"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electron", {
  // File operations
  openFile: (filePath) => electron.ipcRenderer.invoke("open-file", filePath),
  openFileDialog: (filters) => electron.ipcRenderer.invoke("open-file-dialog", filters),
  unzipEpub: (filePath) => electron.ipcRenderer.invoke("unzip-epub", filePath),
  getSpineItemContent: (spineItemPath) => electron.ipcRenderer.invoke("get-spine-item-content", spineItemPath),
  // Network requests (bypassing CORS)
  apiRequest: (url, method, data, isBinary = false) => electron.ipcRenderer.invoke("api-request", url, method, data, isBinary)
});
