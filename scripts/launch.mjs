import { chromium, firefox, webkit } from "playwright";

const browsers = [
  {
    name: "Chromium (Desktop)",
    browserType: chromium,
    launchServerOptions: { port: 9222, wsPath: "/", args: ["--disable-gpu", "--force-color-profile=srgb"] },
  },
  {
    name: "Firefox (Desktop)",
    browserType: firefox,
    launchServerOptions: { port: 9223, wsPath: "/", args: ["--disable-gpu", "--force-color-profile=srgb"] },
  },
  {
    name: "WebKit (Desktop)",
    browserType: webkit,
    launchServerOptions: { port: 9224, wsPath: "/" },
  },
];

await Promise.all(
  browsers.map(async ({ browserType, launchServerOptions }) => {
    const browserServer = await browserType.launchServer(launchServerOptions);
    console.log(`Launched remote ${browserType.name()} on ${browserServer.wsEndpoint()}`);
  })
);
