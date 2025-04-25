/// <reference types="vite/client" />

interface EpubMetadata {
  title: string
  creator: string
  language: string
  publisher: string
  description: string
  cover: string
  coverPath: string | null
}

interface EpubTocItem {
  level: number
  order: number
  title: string
  href: string
  id: string
}

interface EpubSpineItem {
  id: string
  mediaType: string
  href: string
}

interface EpubContents {
  path: string
  metadata: EpubMetadata
  toc: EpubTocItem[]
  spine: EpubSpineItem[]
  ncxPath: string
  opfPath: string
}

interface Window {
  electron: {
    openFile: (filePath: string) => Promise<string>
    openFileDialog: (filters: { name: string, extensions: string[] }[]) => Promise<string | null>
    parseEpub: (filePath: string) => Promise<EpubContents>
  }
  ipcRenderer: {
    on: (channel: string, listener: (...args: any[]) => void) => void
    off: (channel: string, ...args: any[]) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
  }
}
