import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import AdmZip from 'adm-zip'
import { DOMParser } from 'xmldom'

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
      let opfPath = null
      
      // First try to find OPF path from container.xml
      if (containerXml) {
        const opfPathMatch = containerXml.match(/full-path="([^"]+\.opf)"/i)
        if (opfPathMatch && opfPathMatch[1]) {
          opfPath = opfPathMatch[1]
          console.log('Found OPF path from container.xml:', opfPath)
        }
      }
      
      // If we found the OPF path, try to get that file directly
      let opfContent = null
      if (opfPath) {
        const opfEntry = zip.getEntry(opfPath)
        if (opfEntry) {
          opfContent = opfEntry.getData().toString('utf8')
          console.log('Successfully loaded OPF file from', opfPath)
        }
      }
      
      // If we didn't find it from container.xml, search for any .opf file
      if (!opfContent) {
        const contentOpfEntry = zipEntries.find(entry => 
          entry.entryName.endsWith('.opf') || entry.entryName.includes('content.opf')
        )
        
        if (contentOpfEntry) {
          opfPath = contentOpfEntry.entryName
          opfContent = contentOpfEntry.getData().toString('utf8')
          console.log('Found OPF file by searching:', opfPath)
        }
      }
      
      // If we have OPF content, parse it with xmldom
      let spine = []
      
      if (opfContent) {
        try {
          // Parse the OPF file with xmldom
          const parser = new DOMParser()
          const opfDoc = parser.parseFromString(opfContent, 'application/xml')
          
          // Extract metadata
          const titleElement = opfDoc.getElementsByTagName('dc:title')[0]
          const creatorElement = opfDoc.getElementsByTagName('dc:creator')[0]
          const languageElement = opfDoc.getElementsByTagName('dc:language')[0]
          const publisherElement = opfDoc.getElementsByTagName('dc:publisher')[0]
          
          // Create metadata object
          metadata = {
            title: titleElement ? titleElement.textContent.trim() : 'Unknown Title',
            creator: creatorElement ? creatorElement.textContent.trim() : 'Unknown Author',
            language: languageElement ? languageElement.textContent.trim() : 'Unknown',
            publisher: publisherElement ? publisherElement.textContent.trim() : '',
            opfPath: opfPath || 'Unknown',
            opfContent: opfContent
          }
          
          console.log('Extracted metadata from XML:', metadata)
          
          // Extract the manifest items to get file info
          const manifestItems = opfDoc.getElementsByTagName('manifest')[0]?.getElementsByTagName('item')
          const manifestMap = {}
          
          if (manifestItems) {
            for (let i = 0; i < manifestItems.length; i++) {
              const item = manifestItems[i]
              const id = item.getAttribute('id')
              const href = item.getAttribute('href')
              const mediaType = item.getAttribute('media-type')
              
              if (id && href) {
                manifestMap[id] = { id, href, mediaType }
              }
            }
          }
          
          console.log('Found manifest items:', Object.keys(manifestMap).length)
          
          // Calculate the base directory for the OPF file
          const opfDir = opfPath ? path.dirname(opfPath) + '/' : ''
          
          // Extract spine items, which reference manifest items
          const spineElements = opfDoc.getElementsByTagName('spine')[0]?.getElementsByTagName('itemref')
          
          if (spineElements) {
            for (let i = 0; i < spineElements.length; i++) {
              const spineItem = spineElements[i]
              const idref = spineItem.getAttribute('idref')
              
              if (idref && manifestMap[idref]) {
                const item = manifestMap[idref]
                
                // Create full path by joining OPF directory and href
                const fullPath = opfDir + item.href
                
                spine.push({
                  idref,
                  id: item.id,
                  href: item.href,
                  mediaType: item.mediaType,
                  fullPath
                })
              }
            }
          }
          
          console.log('Extracted spine items:', spine.length)
          
          // Now parse each spine item's content
          for (const spineItem of spine) {
            try {
              const itemEntry = zip.getEntry(spineItem.fullPath)
              
              if (itemEntry) {
                // Get the content of the file
                const content = itemEntry.getData().toString('utf8')
                
                // Parse with xmldom if it's HTML/XML content
                if (spineItem.mediaType && 
                    (spineItem.mediaType.includes('html') || 
                     spineItem.mediaType.includes('xml') || 
                     spineItem.mediaType.includes('xhtml'))) {
                  
                  try {
                    const itemDoc = parser.parseFromString(content, 'application/xhtml+xml')
                    
                    // Get the body content or title
                    const title = itemDoc.getElementsByTagName('title')[0]?.textContent || 'No title'
                    const bodyContent = itemDoc.getElementsByTagName('body')[0]
                    
                    console.log(`Parsed spine item: ${spineItem.fullPath}`)
                    console.log(`  Title: ${title}`)
                    console.log(`  Has body: ${!!bodyContent}`)
                    
                    // Add parsed content to spine item - without passing the DOM elements
                    spineItem.parsedContent = {
                      title,
                      hasBody: !!bodyContent,
                      bodyText: bodyContent ? 
                        bodyContent.textContent?.substring(0, 200) + (bodyContent.textContent?.length > 200 ? '...' : '') : 
                        null
                    }
                  } catch (parseError) {
                    console.error(`Error parsing spine item ${spineItem.fullPath}:`, parseError.message)
                    spineItem.parsedContent = {
                      error: parseError.message,
                      rawContent: content.substring(0, 100) + '...' // First 100 chars
                    }
                  }
                } else {
                  // Just store basic info for non-HTML content
                  console.log(`Non-HTML spine item: ${spineItem.fullPath} (${spineItem.mediaType})`)
                  spineItem.parsedContent = {
                    mediaType: spineItem.mediaType,
                    size: itemEntry.header.size
                  }
                }
              } else {
                console.error(`Spine item file not found: ${spineItem.fullPath}`)
                spineItem.parsedContent = { error: 'File not found in EPUB' }
              }
            } catch (error) {
              console.error(`Error processing spine item ${spineItem.fullPath}:`, error)
              spineItem.parsedContent = { error: error.message }
            }
          }
          
        } catch (xmlError) {
          console.error('Error parsing OPF XML:', xmlError)
          
          // Fallback to regex if XML parsing fails
          const titleMatch = opfContent.match(/<dc:title[^>]*>(.*?)<\/dc:title>/i)
          const creatorMatch = opfContent.match(/<dc:creator[^>]*>(.*?)<\/dc:creator>/i)
          const languageMatch = opfContent.match(/<dc:language[^>]*>(.*?)<\/dc:language>/i)
          const publisherMatch = opfContent.match(/<dc:publisher[^>]*>(.*?)<\/dc:publisher>/i)
          
          metadata = {
            title: titleMatch ? titleMatch[1] : 'Unknown Title',
            creator: creatorMatch ? creatorMatch[1] : 'Unknown Author',
            language: languageMatch ? languageMatch[1] : 'Unknown',
            publisher: publisherMatch ? publisherMatch[1] : '',
            opfPath: opfPath || 'Unknown',
            opfContent: opfContent
          }
        }
      }
      
      // Return information about the EPUB contents
      return {
        path: filePath,
        entries: entries,
        containerXml,
        metadata,
        spine,
        toc
      }
    } catch (error) {
      console.error('Error parsing EPUB:', error)
      throw new Error(`Failed to parse EPUB: ${error.message}`)
    }
  })
})
