<p align="center">
  <img src="icon.png" alt="FreeTube Companion Logo" width="128" height="128">
</p>

<h1 align="center">FreeTube Companion Extension</h1>

<p align="center">
  <strong>Seamlessly open YouTube videos, channels, and playlists in FreeTube</strong>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Version-2.0.0-green.svg" alt="Version 2.0.0">
  <img src="https://img.shields.io/badge/Manifest-V3-orange.svg" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Chrome-Extension-yellow?logo=googlechrome&logoColor=white" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefoxbrowser&logoColor=white" alt="Firefox Add-on-">
</p>

---

Firefox users can install from add-ons section [FireFox](https://addons.mozilla.org/en-US/firefox/addon/freetube-companion-extension/)

## About

**FreeTube Companion** is a browser extension that bridges YouTube and [FreeTube](https://freetubeapp.io/) — the privacy-focused desktop YouTube player. With one click or keyboard shortcut, you can send any YouTube video, channel, or playlist directly to FreeTube.

## Features

- **One-Click Open** — Open the current YouTube video in FreeTube instantly
- **Open at Current Time** — Jump to the exact timestamp you're watching
- **Channel Support** — Open any YouTube channel in FreeTube
- **Playlist Support** — Send entire playlists to FreeTube
- **FreeTube Mode** — Auto-redirect all YouTube video clicks to FreeTube
- **Context Menus** — Right-click any YouTube link to open it in FreeTube
- **Keyboard Shortcut** — `Alt+F` to instantly open the current video
- **Video Auto-Pause** — Automatically pauses the YouTube player when switching to FreeTube

## Screenshots

| Popup Interface | Context Menu |
|:-:|:-:|
| Extension popup with all controls | Right-click integration |

## Quick Start

1. **Install** the extension ([Installation Guide](INSTALLATION.md))
2. Navigate to any YouTube video
3. Click the extension icon and press **Open Video** — or just hit `Alt+F`
4. FreeTube opens with your video!

> **Prerequisite:** [FreeTube](https://freetubeapp.io/) must be installed on your system.

## Documentation

| Document | Description |
|---|---|
| [FEATURES.md](FEATURES.md) | Detailed feature documentation |
| [INSTALLATION.md](INSTALLATION.md) | Step-by-step installation guide |
| [USAGE.md](USAGE.md) | How to use every feature |
| [CHANGELOG.md](CHANGELOG.md) | Version history and changes |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [PRIVACY.md](PRIVACY.md) | Privacy policy |

## Browser Support

| Browser | Version | Manifest |
|---|---|---|
| Google Chrome | 88+ | V3 |
| Microsoft Edge | 88+ | V3 |
| Brave | 1.20+ | V3 |
| Chromium | 88+ | V3 |
| Mozilla Firefox | 57+ | V2 |

> The Firefox version is in a separate directory (`freetube-extension-firefox/`).

## Project Structure

```
├── background.js       # Service worker — context menus, shortcuts, messaging
├── content.js          # Content script — video control, click interception
├── popup.html          # Extension popup UI
├── popup.css           # Popup styles
├── popup.js            # Popup logic
├── manifest.json       # Extension manifest (V3 for Chrome, V2 for Firefox)
├── icon.png            # Extension icon
├── LICENSE             # MIT License
├── README.md           # This file
├── FEATURES.md         # Detailed features
├── INSTALLATION.md     # Installation guide
├── USAGE.md            # Usage guide
├── CONTRIBUTING.md     # Contribution guidelines
├── CODE_OF_CONDUCT.md  # Code of conduct
├── CHANGELOG.md        # Version history
├── PRIVACY.md          # Privacy policy
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    ├── PULL_REQUEST_TEMPLATE.md
    └── SECURITY.md
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FreeTube](https://freetubeapp.io/) — The free and open-source privacy-focused YouTube player
- All contributors and users who help improve this extension

---

<p align="center">
  Made with ❤️ for the FreeTube community
</p>
