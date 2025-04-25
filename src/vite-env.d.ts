/// <reference types="vite/client" />

interface EpubEntry {
  name: string
  isDirectory: boolean
  size: number
}

interface EpubSimpleMetadata {
  title: string
  creator: string
  language: string
  publisher: string
  opfPath: string
  opfContent: string
}

interface EpubSpineItem {
  idref: string
  id: string
  href: string
  mediaType: string
  fullPath: string
}

interface SpineItemContent {
  success: boolean
  content?: string
  path?: string
  error?: string
}

interface EpubContents {
  path: string
  entries: EpubEntry[]
  containerXml: string | null
  metadata: EpubSimpleMetadata | null
  spine: EpubSpineItem[]
  toc: any[]
}

interface Window {
  electron: {
    openFile: (filePath: string) => Promise<string>
    openFileDialog: (filters: { name: string, extensions: string[] }[]) => Promise<string | null>
    unzipEpub: (filePath: string) => Promise<EpubContents>
    getSpineItemContent: (spineItemPath: string) => Promise<SpineItemContent>
  }
  ipcRenderer: {
    on: (channel: string, listener: (...args: any[]) => void) => void
    off: (channel: string, ...args: any[]) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
  }
}
