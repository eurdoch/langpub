import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

// Expose an API for file operations
contextBridge.exposeInMainWorld('electron', {
  openFile: (filePath: string) => ipcRenderer.invoke('open-file', filePath),
  openFileDialog: (filters: { name: string, extensions: string[] }[]) => 
    ipcRenderer.invoke('open-file-dialog', filters),
  unzipEpub: (filePath: string) => ipcRenderer.invoke('unzip-epub', filePath),
  getSpineItemContent: (spineItemPath: string) => ipcRenderer.invoke('get-spine-item-content', spineItemPath)
})