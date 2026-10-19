// PM2 config for all four versions. Build each folder first (npm install && npm run build),
// then: pm2 start ecosystem.config.js && pm2 save
// Next is started through its own bin with node, so this works on Windows and Linux alike.
const path = require("path");

const apps = [
  { folder: "1", name: "uk-treks-v1-classic", port: 2026 },
  { folder: "2", name: "uk-treks-v2-journal", port: 2027 },
  { folder: "3", name: "uk-treks-v3-glacier", port: 2028 },
  { folder: "4", name: "uk-treks-v4-yatra", port: 2029 },
];

module.exports = {
  apps: apps.map(({ folder, name, port }) => ({
    name,
    cwd: path.join(__dirname, folder),
    script: "node_modules/next/dist/bin/next",
    args: `start -p ${port}`,
    interpreter: "node",
    env: { NODE_ENV: "production", PORT: String(port) },
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    max_memory_restart: "500M",
    time: true,
  })),
};
