import { app, BrowserWindow, ipcMain, dialog, net } from 'electron'
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
          
          // Instead of parsing spine content here, add a method to retrieve content later
          // This will allow parsing to happen in the renderer process
          
          // Add a new handler to get spine item content
          ipcMain.handle('get-spine-item-content', async (_event, spineItemPath) => {
            try {
              // Get a list of all entries for debugging
              const allEntries = zip.getEntries()
              console.log(`EPUB contains ${allEntries.length} files, looking for: ${spineItemPath}`)
              console.log(`File basename: ${path.basename(spineItemPath)}, directory: ${path.dirname(spineItemPath)}`)
              
              // First try the exact path provided
              let itemEntry = zip.getEntry(spineItemPath)
              
              // If not found, try some common path variations
              if (!itemEntry) {
                console.log(`Spine item not found at exact path: ${spineItemPath}, trying variations...`)
                
                // Try without leading "./" if present
                if (spineItemPath.startsWith('./')) {
                  const normalizedPath = spineItemPath.substring(2)
                  itemEntry = zip.getEntry(normalizedPath)
                  if (itemEntry) {
                    console.log(`Found at normalized path without ./: ${normalizedPath}`)
                  }
                }
                
                // Try with leading "./" if not present
                if (!itemEntry && !spineItemPath.startsWith('./')) {
                  const withDotSlash = './' + spineItemPath
                  itemEntry = zip.getEntry(withDotSlash)
                  if (itemEntry) {
                    console.log(`Found with added ./: ${withDotSlash}`)
                  }
                }
                
                // If still not found, try with OEBPS/ prefix (common in EPUBs)
                if (!itemEntry && !spineItemPath.startsWith('OEBPS/')) {
                  const withOEBPS = 'OEBPS/' + (spineItemPath.startsWith('./') ? 
                                   spineItemPath.substring(2) : spineItemPath)
                  itemEntry = zip.getEntry(withOEBPS)
                  if (itemEntry) {
                    console.log(`Found with OEBPS/ prefix: ${withOEBPS}`)
                  }
                }
                
                // If still not found, try looking for the filename in any directory
                if (!itemEntry) {
                  const filename = path.basename(spineItemPath)
                  console.log(`Looking for filename: ${filename} in any directory`)
                  
                  // Log all entries for debugging
                  console.log('All available files in EPUB:')
                  allEntries.forEach(entry => {
                    if (!entry.isDirectory) {
                      console.log(`- ${entry.entryName}`)
                    }
                  })
                  
                  // Search all entries for a matching filename with enhanced matching:
                  // 1. Case-insensitive matching for all comparisons
                  // 2. Handle .xhtml vs .html extension variations
                  // 3. Improved path resolution with dirname/basename handling
                  const matchingEntries = allEntries.filter(entry => {
                    if (entry.isDirectory) return false;
                    
                    const entryBaseName = path.basename(entry.entryName).toLowerCase();
                    const entryDirname = path.dirname(entry.entryName).toLowerCase();
                    const searchFilename = filename.toLowerCase();
                    const searchDirname = path.dirname(spineItemPath).toLowerCase();
                    
                    // Direct case-insensitive match
                    if (entryBaseName === searchFilename) return true;
                    
                    // Match with path ending (case-insensitive)
                    if (entry.entryName.toLowerCase().endsWith('/' + searchFilename)) return true;
                    
                    // Check if the directory structure matches partially
                    const entryDirParts = entryDirname.split('/');
                    const searchDirParts = searchDirname.split('/');
                    const dirMatches = searchDirParts.some(part => 
                      part.length > 0 && entryDirParts.includes(part)
                    );
                    
                    // Handle .xhtml vs .html extension variations with more robust handling
                    const fileWithoutExt = searchFilename.replace(/\.(x?html|htm)$/i, '');
                    const entryWithoutExt = entryBaseName.replace(/\.(x?html|htm)$/i, '');
                    
                    if (fileWithoutExt === entryWithoutExt) {
                      // Base filenames match without extensions
                      return true;
                    }
                    
                    // Try to match with partial path and filename
                    if (dirMatches && entryBaseName.includes(fileWithoutExt)) {
                      return true;
                    }
                    
                    return false;
                  });
                  
                  if (matchingEntries.length > 0) {
                    itemEntry = matchingEntries[0]
                    console.log(`Found matching file by filename: ${itemEntry.entryName}`)
                    console.log(`Match details: requested=${filename}, found=${path.basename(itemEntry.entryName)}`)
                    console.log(`Full paths: requested=${spineItemPath}, found=${itemEntry.entryName}`)
                    
                    // If multiple matches, log them all
                    if (matchingEntries.length > 1) {
                      console.log(`Note: Multiple matches found for ${filename}:`)
                      matchingEntries.forEach(entry => console.log(`- ${entry.entryName}`))
                    }
                  } else {
                    console.log(`⚠️ No matching files found for ${filename} after trying all resolution methods`)
                    // List some sample entries for debugging
                    console.log(`Sample of available files:`)
                    allEntries.slice(0, 10).forEach(entry => {
                      if (!entry.isDirectory) {
                        console.log(`- ${entry.entryName} (${path.basename(entry.entryName)})`)
                      }
                    })
                  }
                }
              }
              
              if (itemEntry) {
                // Get the content of the file
                const content = itemEntry.getData().toString('utf8')
                const actualPath = itemEntry.entryName // Use the actual path found
                
                // Also check if there are any referenced CSS files to send
                const cssFiles = []
                
                // Simple regex to find stylesheet references
                const cssMatches = content.match(/href=['"]([^'"]*\.css)['"]|@import\s+['"]([^'"]*\.css)['"]/g)
                
                if (cssMatches) {
                  console.log(`Found CSS references in ${actualPath}:`, cssMatches)
                  
                  // Get the base directory of the spine item
                  const baseDir = path.dirname(actualPath)
                  
                  // For each CSS match, try to get the CSS content
                  for (const cssMatch of cssMatches) {
                    // Extract the path from the match
                    const cssPath = cssMatch.match(/['"]([^'"]*\.css)['"]/)?.[1]
                    
                    if (cssPath) {
                      // Try multiple path variations for CSS
                      let cssEntry = null
                      const cssVariations = [
                        path.join(baseDir, cssPath).replace(/\\/g, '/'), // Relative to HTML file
                        cssPath, // Direct path as in the HTML
                        cssPath.startsWith('./') ? cssPath.substring(2) : cssPath // Without leading ./
                      ]
                      
                      // Try each variation
                      for (const cssVariation of cssVariations) {
                        cssEntry = zip.getEntry(cssVariation)
                        if (cssEntry) {
                          console.log(`Found CSS file at: ${cssVariation}`)
                          break
                        }
                      }
                      
                      // If still not found, search by filename
                      if (!cssEntry) {
                        const cssFilename = path.basename(cssPath)
                        const allEntries = zip.getEntries()
                        const matchingCss = allEntries.filter(entry => 
                          entry.entryName.endsWith('/' + cssFilename) || entry.entryName === cssFilename
                        )
                        
                        if (matchingCss.length > 0) {
                          cssEntry = matchingCss[0]
                          console.log(`Found CSS by filename: ${cssEntry.entryName}`)
                        }
                      }
                      
                      if (cssEntry) {
                        cssFiles.push({
                          path: cssEntry.entryName,
                          content: cssEntry.getData().toString('utf8')
                        })
                      } else {
                        console.warn(`Referenced CSS file not found: ${cssPath}`)
                      }
                    }
                  }
                }
                
                // Return the content and any found CSS
                return {
                  success: true,
                  content: content,
                  path: actualPath,
                  cssFiles: cssFiles
                }
              } else {
                console.error(`Spine item file not found: ${spineItemPath} (tried multiple variations)`)
                return {
                  success: false,
                  error: `File not found in EPUB: ${spineItemPath}. The file may be missing, have a different path, or use a different file extension (.html/.xhtml).`,
                  requestedPath: spineItemPath,
                  availableFiles: allEntries.slice(0, 10).map(e => e.entryName)
                }
              }
            } catch (error) {
              console.error(`Error getting spine item content for ${spineItemPath}:`, error)
              return {
                success: false,
                error: error.message
              }
            }
          })
          
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
  
  // Handle API requests (bypass CORS)
  ipcMain.handle('api-request', async (_event, url, method, data, isBinary = false) => {
    try {
      console.log(`API Request: ${method} ${url}`)
      console.log('Request data:', data)
      console.log('Binary mode:', isBinary)
      
      return new Promise((resolve, reject) => {
        const request = net.request({
          method: method,
          url: url,
          redirect: 'follow'
        })
        
        // Add headers
        request.setHeader('Content-Type', 'application/json')
        
        request.on('response', (response) => {
          console.log(`Response status: ${response.statusCode}`)
          console.log('Response headers:', response.headers)
          
          if (response.statusCode !== 200) {
            reject(new Error(`Request failed with status code ${response.statusCode}`))
            return
          }
          
          // Check if handling binary data
          if (isBinary) {
            const chunks: Buffer[] = []
            
            response.on('data', (chunk) => {
              chunks.push(Buffer.from(chunk))
            })
            
            response.on('end', () => {
              try {
                // For binary data, concatenate buffers and convert to base64
                const buffer = Buffer.concat(chunks)
                const base64Data = buffer.toString('base64')
                resolve(base64Data)
              } catch (error) {
                reject(error)
              }
            })
          } else {
            // Handle text/JSON data
            let responseData = ''
            
            response.on('data', (chunk) => {
              responseData += chunk.toString()
            })
            
            response.on('end', () => {
              try {
                const parsedData = JSON.parse(responseData)
                resolve(parsedData)
              } catch (error) {
                resolve(responseData) // Return raw data if not JSON
              }
            })
          }
        })
        
        request.on('error', (error) => {
          reject(error)
        })
        
        // Send the data if it exists
        if (data) {
          const postData = JSON.stringify(data)
          request.write(postData)
        }
        
        request.end()
      })
    } catch (error) {
      console.error('Error making API request:', error)
      throw error
    }
  })
})
