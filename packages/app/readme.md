## Application (TODO)

- Easily generate a new reactive email + password combination for a new service. Because I don't want to manage passwords, I'll definitely be integrating with a password manager like Bitwarden.

- How the integration is likely to work is probably just a simple Dock app where you can enter a service name, version number, and your reactive hash secret to generate a new email. The reactive hash secret should be hashed so that you don't accidentally mistype it.

- The application should automate the process of whitelisting the email over at Google Workspace (since that's what makes this whole system work). I'll need to experiment with integrating Puppeteer with Electron.
  d
