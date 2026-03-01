# Usage Guide

How to use every feature of the FreeTube Companion Extension.

---

## Opening the Popup

Click the **FreeTube Extension icon** (▶️) in your browser toolbar. The popup shows:

- **FreeTube Mode** toggle
- **Action buttons** for opening videos, channels, and playlists
- **Keyboard shortcut** reference

---

## Open a Video

1. Navigate to any YouTube video page
2. Click the extension icon
3. Click **"Open Video"**
4. FreeTube launches and plays the video

**Supported URL formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

---

## Open at Current Time

1. Start watching a YouTube video
2. Pause or let it play to the desired moment
3. Click the extension icon
4. Click **"Open at Current Time"** (⏱️)
5. The YouTube player pauses automatically
6. FreeTube opens the video at that exact timestamp

---

## Open a Channel

**From a channel page:**
1. Navigate to any YouTube channel (`youtube.com/@handle`)
2. Click the extension icon
3. Click **"Open Channel"**

**From a video page:**
1. While watching any YouTube video
2. Click the extension icon
3. Click **"Open Channel"** — it finds the video's channel automatically
4. The video pauses and FreeTube opens the channel

---

## Open a Playlist

1. Navigate to a YouTube playlist page
2. Click the extension icon
3. Click **"Open Playlist"**
4. FreeTube opens the full playlist

---

## FreeTube Mode (Auto-Redirect)

FreeTube Mode intercepts all video link clicks on YouTube and redirects them to FreeTube.

### Enable:
1. Click the extension icon
2. Toggle **FreeTube Mode** to **ON**
3. The status shows 🟢 and "All video clicks open in FreeTube"

### Disable:
1. Click the extension icon
2. Toggle **FreeTube Mode** to **OFF**
3. The status shows "Videos play in browser"

### How it works:
- When ON, clicking any video thumbnail/title on YouTube opens it in FreeTube
- Only video links are intercepted — channel links, settings, etc. work normally
- The setting persists across browser sessions

---

## Right-Click Context Menu

Right-click on any YouTube link or page to see FreeTube options:

### On a video link:
> ▶️ Play on FreeTube

### On a YouTube video page (right-click the page background or video):
> ▶️ Play this video on FreeTube

### On a channel link:
> 📺 Open Channel in FreeTube

### On a channel page:
> 📺 Open this Channel in FreeTube

### On a playlist link:
> 📋 Open Playlist in FreeTube

### On a playlist page:
> 📋 Open this Playlist in FreeTube

---

## Keyboard Shortcut

| Shortcut | Action |
|---|---|
| `Alt+F` | Open current YouTube video in FreeTube (with timestamp) |

The shortcut:
1. Pauses the current YouTube video
2. Captures the current timestamp
3. Opens FreeTube at that exact time

### Customize the shortcut:
- **Chrome:** Go to `chrome://extensions/shortcuts`
- **Firefox:** Go to `about:addons` → ⚙️ gear icon → **Manage Extension Shortcuts**

---

## Button States

Buttons automatically enable/disable based on the current page:

| You're on... | Available actions |
|---|---|
| YouTube video | Open Video, Open at Current Time, Open Channel |
| YouTube channel | Open Channel |
| YouTube playlist | Open Playlist |
| Non-YouTube page | None (error message shown) |

---

## Tips & Tricks

- **Quick workflow:** Navigate to a video → press `Alt+F` → done
- **FreeTube Mode** is great for browsing YouTube while watching everything in FreeTube
- **Right-click** is useful for opening linked videos without navigating to them first
- The extension **auto-pauses** YouTube when switching to FreeTube — no double audio
