import { app, BrowserWindow, protocol, ipcMain, dialog, net } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const filePath = decodeURI(request.url.slice("file://".length));
    try {
      return callback(filePath);
    } catch (error) {
      console.error("Error registering file protocol:", error);
    }
  });
  createWindow();
  ipcMain.handle("open-file-dialog", async () => {
    if (!win) return { canceled: true };
    const result = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
      filters: [
        { name: "EPUB Files", extensions: ["epub"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    return result;
  });
  ipcMain.handle("read-file", async (_, filePath) => {
    try {
      const data = await fs.promises.readFile(filePath);
      return { success: true, data: data.toString("base64") };
    } catch (error) {
      console.error("Error reading file:", error);
      return { success: false, error: error.message };
    }
  });
  ipcMain.handle("api-proxy", async (_, { endpoint, method, data }) => {
    try {
      const apiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "https://langpub.directto.link";
      console.log(`Proxying API request to: ${apiBaseUrl}${endpoint}`);
      const request = net.request({
        method: method || "POST",
        url: `${apiBaseUrl}${endpoint}`
      });
      request.setHeader("Content-Type", "application/json");
      const isBinaryResponse = endpoint === "/speech";
      const responsePromise = new Promise((resolve, reject) => {
        const chunks = [];
        request.on("response", (response) => {
          response.on("data", (chunk) => {
            if (isBinaryResponse) {
              chunks.push(Buffer.from(chunk));
            } else {
              chunks.push(chunk);
            }
          });
          response.on("end", () => {
            if (isBinaryResponse) {
              const buffer = Buffer.concat(chunks);
              resolve({
                status: response.statusCode,
                data: buffer.toString("base64"),
                contentType: response.headers["content-type"] || "audio/mpeg"
              });
            } else {
              try {
                const responseData = Buffer.concat(chunks).toString();
                const parsedData = JSON.parse(responseData);
                resolve({
                  status: response.statusCode,
                  data: parsedData
                });
              } catch (error) {
                resolve({
                  status: response.statusCode,
                  data: Buffer.concat(chunks).toString()
                });
              }
            }
          });
          response.on("error", (error) => {
            reject(error);
          });
        });
        request.on("error", (error) => {
          reject(error);
        });
      });
      if (data) {
        request.write(JSON.stringify(data));
      }
      request.end();
      return await responsePromise;
    } catch (error) {
      console.error("API proxy error:", error);
      return {
        status: 500,
        error: error.message || "Internal Server Error"
      };
    }
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
