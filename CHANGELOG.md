# Changelog

All notable changes to FreeTube Companion Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-03-01

### Added
- **FreeTube Mode** — toggle to auto-redirect all YouTube video clicks to FreeTube
- **Open at Current Time** button — send video to FreeTube at the exact timestamp
- **Open Channel** button — open any YouTube channel in FreeTube
- **Open Playlist** button — open any YouTube playlist in FreeTube
- **Context menu integration** — right-click YouTube links/pages to open in FreeTube
- **Keyboard shortcut** (`Alt+F`) to instantly open current video in FreeTube
- **Auto-pause** — YouTube video pauses automatically when switching to FreeTube
- **Smart button states** — buttons enable/disable based on current page type
- **Status messages** — visual feedback for all actions
- **Firefox support** — separate Firefox-compatible extension (Manifest V2)
- Comprehensive documentation (README, FEATURES, INSTALLATION, USAGE)
- GitHub repository files (LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, PRIVACY)
- Issue and PR templates

### Changed
- Upgraded to Manifest V3 for Chrome/Chromium browsers
- Redesigned popup UI with modern dark theme
- Improved URL parsing for all YouTube URL formats

### Removed
- Settings section (timestamp toggle) — replaced by dedicated "Open at Current Time" button

## [1.0.0] - Initial Release

### Added
- Basic "Open in FreeTube" functionality
- YouTube video URL detection
- Simple popup interface
