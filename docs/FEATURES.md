# Features

A detailed breakdown of every feature in FreeTube Companion Extension.

---

## 1. Open Video in FreeTube

Send the current YouTube video directly to FreeTube with one click.

- Works on standard videos (`youtube.com/watch?v=...`)
- Works on Shorts (`youtube.com/shorts/...`)
- Works on short URLs (`youtu.be/...`)
- Automatically extracts the video ID from any URL format

## 2. Open at Current Time

Opens the video in FreeTube and jumps to the exact timestamp you were watching.

- Click **"Open at Current Time"** in the popup
- The YouTube player is **automatically paused** when switching
- FreeTube receives the timestamp via the `&t=` URL parameter
- Accurate to the second

## 3. Open Channel in FreeTube

Open any YouTube channel directly in FreeTube.

- Works from channel pages (`/@handle`, `/channel/ID`, `/c/name`)
- Works **from video pages** — the extension finds the channel link automatically
- Supports all YouTube channel URL formats

## 4. Open Playlist in FreeTube

Send a YouTube playlist to FreeTube.

- Works from playlist pages (`youtube.com/playlist?list=...`)
- Extracts the playlist ID and constructs the FreeTube URL

## 5. FreeTube Mode (Auto-Redirect)

When enabled, **every video link click** on YouTube is intercepted and opened in FreeTube instead.

- Toggle ON/OFF from the popup
- Works across all YouTube pages
- Intercepts clicks on thumbnails, titles, and video links
- Non-video links (channels, playlists, settings) are unaffected
- Real-time status indicator in the popup

## 6. Context Menu Integration

Right-click any YouTube link or page to open it in FreeTube.

| Menu Item | Appears On | Action |
|---|---|---|
| ▶️ Play on FreeTube | Video links | Opens linked video |
| ▶️ Play this video on FreeTube | Video pages | Opens current video |
| 📺 Open Channel in FreeTube | Channel links | Opens linked channel |
| 📺 Open this Channel in FreeTube | Channel pages | Opens current channel |
| 📋 Open Playlist in FreeTube | Playlist links | Opens linked playlist |
| 📋 Open this Playlist in FreeTube | Playlist pages | Opens current playlist |

## 7. Keyboard Shortcut

Press `Alt+F` on any YouTube video page to instantly open it in FreeTube.

- Works from any YouTube video page
- Pauses the video and captures the current timestamp
- Opens FreeTube at that exact moment
- Customizable via browser's extension shortcut settings

## 8. Auto-Pause

Whenever you switch a video to FreeTube, the YouTube player is **automatically paused** so you don't hear double audio.

- Applies to: Open Video, Open at Current Time, Open Channel (from video page), Open Playlist, and keyboard shortcut
- Seamless transition between YouTube and FreeTube

## 9. Smart Button States

The popup intelligently enables/disables buttons based on the current page:

| Current Page | Open Video | Open at Time | Open Channel | Open Playlist |
|---|---|---|---|---|
| Video page | ✅ | ✅ | ✅ | ❌ |
| Channel page | ❌ | ❌ | ✅ | ❌ |
| Playlist page | ❌ | ❌ | ❌ | ✅ |
| Non-YouTube | ❌ | ❌ | ❌ | ❌ |

## 10. Status Messages

Clear feedback messages appear in the popup after every action:

- **Success** (green): "Opening in FreeTube...", "Video paused. Opening in FreeTube..."
- **Error** (red): "Open a YouTube page first", "Could not find channel"
- Messages auto-dismiss after 3 seconds
