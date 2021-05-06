import { app, MenuItem, MenuItemConstructorOptions, shell } from "electron";
import { APP_WEBSITE_URL } from "./constants";

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
      // {
      //   type: "separator",
      // },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => app.quit(),
      },
    ],
  };
}

export default function createMenuTemplate(): Array<MenuEntry> {
  const base = [
    createMacAppMenuItem(),
    {
      label: "File",
      submenu: [
        {
          label: "Open",
          role: "open",
          accelerator: "CmdOrCtrl+O",
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
