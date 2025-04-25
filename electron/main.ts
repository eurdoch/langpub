import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import AdmZip from 'adm-zip'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()

  // Handle file open requests from the renderer
  ipcMain.handle('open-file', async (_event, filePath) => {
    try {
      // Check if file exists
      await fs.promises.access(filePath, fs.constants.F_OK)
      
      // You could perform additional operations with the file here
      // For example, reading its contents:
      // const content = await fs.promises.readFile(filePath, 'utf8')
      
      return filePath
    } catch (error) {
      console.error('Error opening file:', error)
      throw new Error('Failed to open file')
    }
  })
  
  // Handle file dialog open requests
  ipcMain.handle('open-file-dialog', async (_event, filters) => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: filters || [{ name: 'All Files', extensions: ['*'] }]
      })
      
      if (canceled || filePaths.length === 0) {
        return null
      }
      
      return filePaths[0]
    } catch (error) {
      console.error('Error showing open dialog:', error)
      throw new Error('Failed to show open dialog')
    }
  })
  
  // Handle unzip epub file
  ipcMain.handle('unzip-epub', async (_event, filePath) => {
    try {
      // Check if file exists
      await fs.promises.access(filePath, fs.constants.F_OK)
      
      // Read and parse the EPUB file (which is a zip file)
      const zip = new AdmZip(filePath)
      const zipEntries = zip.getEntries()
      
      // Create a list of all the entries for logging
      const entries = zipEntries.map(entry => ({
        name: entry.entryName,
        isDirectory: entry.isDirectory,
        size: entry.header.size,
      }))
      
      // Try to find and parse container.xml to locate OPF file
      const containerXml = zip.getEntry('META-INF/container.xml')?.getData().toString('utf8') || null
      
      // Try to extract simple metadata
      let metadata = null
      let toc = []
      
      // Look for content.opf file
      const contentOpfEntry = zipEntries.find(entry => 
        entry.entryName.endsWith('.opf') || entry.entryName.includes('content.opf')
      )
      
      if (contentOpfEntry) {
        const opfContent = contentOpfEntry.getData().toString('utf8')
        
        // Very basic extraction of title and creator
        const titleMatch = opfContent.match(/<dc:title[^>]*>(.*?)<\/dc:title>/i)
        const creatorMatch = opfContent.match(/<dc:creator[^>]*>(.*?)<\/dc:creator>/i)
        
        metadata = {
          title: titleMatch ? titleMatch[1] : 'Unknown Title',
          creator: creatorMatch ? creatorMatch[1] : 'Unknown Author',
          opfPath: contentOpfEntry.entryName
        }
      }
      
      // Return information about the EPUB contents
      return {
        path: filePath,
        entries: entries,
        containerXml,
        metadata,
        toc
      }
    } catch (error) {
      console.error('Error parsing EPUB:', error)
      throw new Error(`Failed to parse EPUB: ${error.message}`)
    }
  })
})
