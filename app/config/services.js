/*NOTE: 
  Online, composeFile, and terminalLink, have not been programming into the EJS prowlarr to work properly. The online indicator is purely cosmetic, and the composeFile and terminalLink currently just go to the base ZimaOS web terminal. Ill have to figure out how to actually access the terminal and pass text into it to access the individual containers.

*/

/*
export const uptimekuma = {
  name: "uptimekuma",
  icon: "icons/uptimekuma-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:0000",
  online: "false",
  port: "0000",
  description: "description",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};
*/

/*Services available to display on serviceCards*/
export const jellyfin = {
  name: "Jellyfin",
  icon: "icons/jellyfin-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:8097/web/#/home.html",
  online: "false",
  port: "8097",
  description: "Self hosted media streaming",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const qbittorrent = {
  name: "qBittorrent",
  icon: "icons/qbittorrent-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:8181",
  online: "false",
  port: "8181",
  description: "downloading client",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const sonarr = {
  name: "Sonarr",
  icon: "icons/sonarr-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:8989",
  online: "false",
  port: "8989",
  description: "TV show organizer",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const radarr = {
  name: "Radarr",
  icon: "icons/radarr-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:7878",
  online: "false",
  port: "7878",
  description: "Movie organizer",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const prowlarr = {
  name: "Prowlarr",
  icon: "icons/prowlarr-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:9696",
  online: "false",
  port: "9696",
  description: "Download indexer",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const clonarr = {
  name: "Clonarr",
  icon: "icons/clonarr-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:6060",
  online: "false",
  port: "6060",
  description: "TRASH guides media profiles and settings",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const uptimeKuma = {
  name: "uptimeKuma",
  icon: "icons/uptime-kuma-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:3001",
  online: "false",
  port: "3001",
  description: "Service monitoring",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const crafty = {
  name: "Crafty",
  icon: "icons/crafty-icon.png",
  url: "https://zimaos.shorthair-artichoke.ts.net:8111",
  online: "false",
  port: "8111",
  description: "Minecraft Server management",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const immich = {
  name: "Immich",
  icon: "icons/immich-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:2283",
  online: "false",
  port: "2283",
  description: "Image viewer and management",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const omegga = {
  name: "Omegga WebUI",
  icon: "icons/omegga-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:8081",
  online: "false",
  port: "8081",
  description: "Brickadia Dedicated Server",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const portainer = {
  name: "Portainer",
  icon: "icons/portainer-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:9000",
  online: "false",
  port: "9000",
  description: "Docker container management",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const customDashboard = {
  name: "Pasty Dash",
  icon: "icons/browser-dashboard-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:8085",
  online: "false",
  port: "8081",
  description: "Custom dashboard for server management",
  containerType: "Portainer",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const mullvad = {
  name: "Mullvad",
  icon: "icons/browser-dashboard-icon.png",
  url: "https://mullvad.net/en/account/login",
  online: "false",
  port: "",
  description: "VPN used in the media stack",
  containerType: "Gluetun",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const fileBrowser = {
  name: "File Browser",
  icon: "icons/file-browser-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net/modules/icewhale_files/#/files/ZimaOS-HD",
  online: "false",
  port: "",
  description: "File browsing and management for the OS",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const serverTerminal = {
  name: "Web Terminal",
  icon: "icons/terminal-icon.png",
  url: "http://zimaos.shorthair-artichoke.ts.net:7681",
  online: "false",
  port: "7681",
  description: "Main terminal for the OS",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const tailscale = {
  name: "Tailscale",
  icon: "icons/tailscale-icon.png",
  url: "https://login.tailscale.com/admin/machines",
  online: "false",
  port: "5252",
  description: "Remote connection software",
  containerType: "ZimaOS",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const playit = {
  name: "playitGG",
  icon: "icons/playit-icon.png",
  url: "https://playit.gg/account/analytics/overview",
  online: "false",
  port: "7681",
  description: "Minecraft server tunnel",
  containerType: "Docker",
  composeFile: "/path/to/Docker/compose",
  terminalLink: "Url to terminal"
};

export const zimaos = {
  name: "ZimaOS",
  icon: "icons/zimaos-icon.png",
  url: "http://192.168.68.51/#/",
  online: "false",
  port: "",
  description: "ZimaOS admin dashboard",
  containerType: "ZimaOS",
  composeFile: "",
  terminalLink: "http://zimaos.shorthair-artichoke.ts.net:7681"
};