# Contributing to FreeTube Companion Extension

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

---

## How Can I Contribute?

### Reporting Bugs

- Use the [Bug Report](../../issues/new?template=bug_report.md) template
- Include your browser and version
- Describe the steps to reproduce the issue
- Include screenshots if applicable

### Suggesting Features

- Use the [Feature Request](../../issues/new?template=feature_request.md) template
- Describe the feature and why it would be useful
- Consider how it fits with existing features

### Code Contributions

1. **Fork** the repository
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** in the appropriate files
4. **Test** your changes in both Chrome and Firefox
5. **Commit** with clear, descriptive messages:
   ```bash
   git commit -m "feat: add support for YouTube Music links"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a **Pull Request** against the `main` branch

---

## Development Setup

### Chrome
1. Clone the repository
2. Open `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked** and select the project folder
5. Make changes → click **Reload** on the extension card

### Firefox
1. Clone the repository
2. Open `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on**
4. Select `manifest.json` from the `freetube-extension-firefox/` folder
5. Make changes → click **Reload**

---

## Project Structure

| File | Purpose |
|---|---|
| `manifest.json` | Extension configuration and permissions |
| `background.js` | Service worker — context menus, message handling, URL processing |
| `content.js` | Content script — video control, click interception, DOM interaction |
| `popup.html` | Popup UI markup |
| `popup.css` | Popup styles |
| `popup.js` | Popup logic and user interaction |

---

## Coding Guidelines

### General
- Use `var` declarations (project convention for broad browser compatibility)
- Use clear, descriptive function names
- Add `console.log("FreeTube: ...")` for debug messages
- Keep functions focused on a single responsibility

### JavaScript
- No external dependencies — vanilla JS only
- Use `chrome.*` APIs for Chrome version, `browser.*` APIs for Firefox version
- Handle errors gracefully with try/catch and `.catch()`

### CSS
- Follow existing naming conventions
- Use CSS custom properties for colors where applicable
- Maintain the dark theme aesthetic

### HTML
- Semantic HTML5
- Accessible markup (labels, roles)

---

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

Examples:
```
feat: add support for YouTube Music URLs
fix: context menu not appearing on shorts pages
docs: update installation guide for Firefox
```

---

## Pull Request Guidelines

- Fill out the PR template completely
- Reference any related issues
- Test on at least one Chromium browser AND Firefox
- Keep PRs focused — one feature or fix per PR
- Update documentation if your change affects user-facing behavior

---

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Questions?

Open a [Discussion](../../discussions) or [Issue](../../issues) if you have questions about contributing.

Thank you for helping make FreeTube Companion better! 🎉
