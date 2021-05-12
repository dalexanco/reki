import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  OpenDialogSyncOptions,
  app,
  dialog,
  shell,
} from "electron";
import { APP_WEBSITE_URL } from "./constants";
import OpenSingleFileJob from "./jobs/openSingleFileJob";

type MenuEntry = MenuItemConstructorOptions | MenuItem;

function createMacAppMenuItem(): MenuEntry | null {
  if (process.platform !== "darwin") return null;
  return {
    label: app.getName(),
    submenu: [
      {
        label: "About " + app.getName(),
        role: "about",
      },
      { type: "separator" },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => app.quit(),
      },
    ],
  };
}

export enum MenuItemIds {
  OPEN_SINGLE_FILE = "open-single-file",
}

export function createMenuTemplate(): Array<MenuEntry> {
  const base = [
    createMacAppMenuItem(),
    {
      label: "File",
      submenu: [
        {
          id: MenuItemIds.OPEN_SINGLE_FILE,
          label: "Open",
          role: "open",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              const dialogOptions: OpenDialogSyncOptions = {
                title: "Open a file",
                properties: ["openFile"],
                filters: [
                  { name: 'Fichiers de requêtes http', extensions: ['http'] },
                ],
              };
              const selectedFilenames = dialog.showOpenDialogSync(focusedWindow, dialogOptions);
              if (selectedFilenames) {
                const job = new OpenSingleFileJob()
                const httpRequest = await job.run(selectedFilenames[0])
                focusedWindow.webContents.send("open-file", JSON.stringify(httpRequest));
              }
            }
          },
        },
      ],
    },
    {
      label: "Window",
      role: "window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "CmdOrCtrl+M",
          role: "minimize",
        },
        {
          label: "Close",
          accelerator: "CmdOrCtrl+W",
          role: "close",
        },
      ],
    },
    {
      label: "Help",
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: () => shell.openExternal(APP_WEBSITE_URL),
        },
      ],
    },
  ];

  return <Array<MenuEntry>>base.filter((entry) => entry != null);
}

export function onAllWindowClosed() {
  const appMenu = Menu.getApplicationMenu();
  if (!appMenu) return;

  const openFileMenu = appMenu.getMenuItemById(MenuItemIds.OPEN_SINGLE_FILE);
  if (openFileMenu) openFileMenu.enabled = false;
}
