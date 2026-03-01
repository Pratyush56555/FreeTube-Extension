# Installation Guide

Step-by-step instructions for installing FreeTube Companion on all supported browsers.

---

## Prerequisites

- **FreeTube** must be installed on your computer.
  - Download: [https://freetubeapp.io/](https://freetubeapp.io/)
  - The extension uses the `freetube://` protocol handler, which is registered when FreeTube is installed.

---

## Chrome / Edge / Brave / Chromium

### Method 1: Load Unpacked (Developer Mode)

1. Download or clone this repository
2. Open your browser and go to the extensions page:
   - **Chrome:** `chrome://extensions/`
   - **Edge:** `edge://extensions/`
   - **Brave:** `brave://extensions/`
3. Enable **Developer Mode** (toggle in the top-right corner)
4. Click **"Load unpacked"**
5. Select the `freetube-extension V 2.0` folder
6. The extension icon will appear in your toolbar

### Method 2: Pack and Install (.crx)

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **"Pack extension"**
4. Browse to the extension folder
5. Click **"Pack Extension"** — a `.crx` file is created
6. Drag the `.crx` file onto the extensions page to install

> **Note:** Packed extensions from outside the Chrome Web Store may be disabled by Chrome. Use "Load unpacked" for reliable local installation.

---

## Firefox

### Method 1: Temporary Installation (Development)

1. Download or clone the **Firefox version** from `freetube-extension-firefox/`
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on..."**
4. Navigate to the `freetube-extension-firefox` folder
5. Select the `manifest.json` file
6. The extension is now loaded (it will be removed when Firefox closes)

### Method 2: Install as Signed Add-on

1. Package the extension as a `.zip` file containing all files from `freetube-extension-firefox/`
2. Submit to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Once approved, install from the Add-ons page

### Method 3: Install Unsigned (Developer Edition / Nightly)

1. Open `about:config` in Firefox Developer Edition or Nightly
2. Set `xpinstall.signatures.required` to `false`
3. Package the extension as a `.xpi` file (rename `.zip` to `.xpi`)
4. Go to `about:addons` → gear icon → **"Install Add-on From File..."**
5. Select the `.xpi` file

---

## Verify Installation

After installing, verify everything works:

1. ✅ Extension icon appears in the browser toolbar
2. ✅ Click the icon — the popup opens with the FreeTube interface
3. ✅ Navigate to a YouTube video — the "Open Video" button becomes active
4. ✅ Right-click a YouTube video link — FreeTube context menu items appear
5. ✅ Press `Alt+F` on a YouTube video page — FreeTube opens

---

## Troubleshooting

### Extension doesn't load
- Ensure Developer Mode is enabled
- Check the browser console for errors
- Verify all files are present in the extension folder

### FreeTube doesn't open
- Make sure FreeTube is installed: [https://freetubeapp.io/](https://freetubeapp.io/)
- Test the protocol handler: type `freetube://https://www.youtube.com/watch?v=dQw4w9WgXcQ` in your address bar
- On Linux, you may need to register the protocol handler manually

### Buttons are greyed out
- You must be on a YouTube page for the buttons to activate
- Different buttons activate on different page types (video, channel, playlist)

### Keyboard shortcut doesn't work
- Another extension may be using `Alt+F`
- Go to `chrome://extensions/shortcuts` (Chrome) or `about:addons` → gear → **Manage Extension Shortcuts** (Firefox) to check or reassign

---

## Updating

### Chrome (unpacked)
1. Pull/download the latest version
2. Replace the extension folder contents
3. Go to `chrome://extensions/` and click the **reload** button on the extension

### Firefox (temporary)
1. Pull/download the latest version
2. Go to `about:debugging` and click **"Reload"** on the extension
