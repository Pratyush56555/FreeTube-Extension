# Privacy Policy

**FreeTube Companion Extension** is committed to protecting your privacy.

---

## Data Collection

**This extension does not collect, store, transmit, or sell any personal data.**

### What the extension accesses:
- **Current tab URL** — to determine if you're on a YouTube page and extract video/channel/playlist IDs
- **Page DOM** — to find the video player (for pausing and timestamp) and channel links
- **Browser storage** — to save your FreeTube Mode preference locally

### What the extension does NOT do:
- ❌ Does not collect browsing history
- ❌ Does not track your activity
- ❌ Does not send data to any external server
- ❌ Does not use analytics or telemetry
- ❌ Does not store any video, channel, or playlist information
- ❌ Does not access data on non-YouTube pages
- ❌ Does not inject ads or sponsored content

---

## Permissions Explained

| Permission | Why it's needed |
|---|---|
| `contextMenus` | To add "Open in FreeTube" options to the right-click menu |
| `activeTab` | To access the current tab's URL and communicate with the content script |
| `storage` | To save your FreeTube Mode ON/OFF preference |
| `tabs` | To query the current tab and update tab URLs for the `freetube://` protocol |
| `host_permissions` (YouTube domains) | To run the content script on YouTube pages for video control and link interception |

---

## Data Storage

The only data stored is your **FreeTube Mode setting** (ON or OFF), saved locally in your browser via `chrome.storage.sync` (Chrome) or `browser.storage.sync` (Firefox). This data:

- Is stored locally on your device
- Syncs only via your browser's built-in sync if enabled
- Contains no personal information
- Can be deleted by removing the extension

---

## Third-Party Services

This extension communicates only with:

1. **YouTube** (youtube.com) — where the content script runs
2. **FreeTube** (local application) — via the `freetube://` protocol handler

No other third-party services are contacted.

---

## Open Source

This extension is open source. You can review the complete source code to verify these privacy claims.

---

## Changes to This Policy

Any changes to this privacy policy will be noted in the [CHANGELOG](CHANGELOG.md) and reflected in a new version release.

---

## Contact

If you have questions about this privacy policy, please open an issue on GitHub.

*Last updated: March 1, 2026*
