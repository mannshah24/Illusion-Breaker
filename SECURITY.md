# Security Policy

## Overview

IllusionBreaker is designed with security and privacy as core principles. This document outlines the security posture of the project and provides guidance for users and contributors.

---

## No Secrets or Credentials

✅ **This repository contains NO secrets, API keys, tokens, or credentials.**

- No `.env` files are committed
- No hardcoded API keys in source code
- No authentication tokens or passwords
- All configuration is public-safe

---

## Data Privacy

### What Data is Collected?

**NONE.** IllusionBreaker does not collect, store, or transmit user data to any external services.

### Extension Data Handling

The browser extension:

- ✅ Extracts page content **locally** when user clicks "Inspect Reality"
- ✅ Sends content **only to your own local/deployed backend** (localhost:3000 or your Vercel URL)
- ✅ Does NOT store browsing history
- ✅ Does NOT track user behavior
- ✅ Does NOT send data to third-party services

### Extension Permissions

```json
{
  "permissions": ["activeTab", "storage"],
  "host_permissions": ["http://localhost:3000/*"]
}
```

- **`activeTab`**: Required to extract content from the current page when user clicks the button
- **`storage`**: Currently unused, may be used in future for caching analysis results locally
- **`localhost:3000`**: Only communicates with your own local development server

**To use with Vercel deployment:** Update `manifest.json` with your own Vercel URL.

---

## No External APIs

IllusionBreaker does NOT use:

- ❌ OpenAI or any paid LLM services
- ❌ External fact-checking databases
- ❌ Cloud storage services
- ❌ Analytics or tracking services
- ❌ Third-party authentication

All analysis is performed using **local heuristic rules** without external API calls.

---

## Safe for Public Deployment

This project is **safe to deploy publicly** on platforms like Vercel because:

1. No secrets are required
2. No environment variables needed
3. No database connections
4. No paid services
5. All code is open-source and auditable

---

## Manual Installation Safety

The browser extension requires **manual installation** (Developer Mode) because:

- It is not published to the Chrome Web Store (this is a hackathon project)
- Users maintain full control over what code runs in their browser
- All source code is visible and auditable in the `/extension` folder

**Users should review the extension code before installing** to verify:

- No malicious scripts
- No data exfiltration
- No excessive permissions

---

## Reporting Security Issues

If you discover a security vulnerability in this project:

1. **DO NOT** open a public GitHub issue
2. Email the maintainer directly: [Contact via GitHub](https://github.com/mannshah24)
3. Provide detailed information about the vulnerability
4. Allow reasonable time for a fix before public disclosure

---

## Security Best Practices for Contributors

If you contribute to this project:

- ✅ Never commit `.env` files or secrets
- ✅ Use `.env.example` for documenting environment variables (without real values)
- ✅ Avoid hardcoding URLs, tokens, or credentials
- ✅ Keep dependencies up to date
- ✅ Review code for security issues before submitting PRs

---

## Audit Results (December 2025)

**Status:** ✅ **PASS**

- No secrets found in repository
- No hardcoded credentials
- Extension permissions are minimal and justified
- .gitignore properly configured
- No sensitive files committed
- Safe for public GitHub submission

---

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

---

**Last Updated:** December 14, 2025  
**Audit Conducted By:** Repository maintainer  
**Next Review:** Before any major release or deployment changes
