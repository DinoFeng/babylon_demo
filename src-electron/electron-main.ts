import { app, BrowserWindow, session } from "electron"
import path from "path"
import os from "os"
import fs from "fs"
// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

let mainWindow: BrowserWindow | undefined

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

  mainWindow.on("closed", () => {
    mainWindow = undefined
  })
}
const vueDevToolsPath = () => {
  const vueDevToolsId = "nhdogjmejiglipccpnnnanhbledajbpd"
  const extToolsPath = path.join(
    os.homedir(),
    `/AppData/Local/Google/Chrome/User Data/Default/Extensions/${vueDevToolsId}`,
  )
  const files = fs.readdirSync(extToolsPath)
  const dirs = files.filter((f) => fs.statSync(path.join(extToolsPath, f)).isDirectory)
  const versionDir = dirs.length > 0 ? dirs[0] : ""
  return path.join(extToolsPath, versionDir)
}

app
  .whenReady()
  .then(async () => {
    if (process.env.DEBUGGING) {
      await session.defaultSession.loadExtension(vueDevToolsPath())
    }
  })
  .then(createWindow)

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === undefined) {
    createWindow()
  }
})
