const path = require('path')
module.exports = {
  version: "3.7",
  title: "PuLID Gradio Demo",
  description: "",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app") && info.exists(".env") 
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: `Open v${local.edition || '1'} Web UI`,
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: `Terminal`,
            href: "start.js",
            params: { local },
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: `Terminal`,
            href: "start.js",
            params: { local },
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else if (running.link) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Deduplicating",
          href: "link.js",
        }]
      } else {
        return [
          {
            default: true,
            icon: "fa-solid fa-power-off",
            text: "Start",
            href: "start.js",
            params: { edition: "default" },
          }, {
            default: true,
            icon: "fa-solid fa-power-off",
            text: "Start (v1.1)",
            href: "start.js",
            params: { edition: "1.1" },
          }, {
            default: true,
            icon: "fa-solid fa-power-off",
            text: "Start (Flux)",
            href: "start.js",
            params: { edition: "flux" },
          }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"

        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
