const path = require('path')
const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os

let cpuOverload = 80

notifyUser({
    title: "CPU Overload",
    body: `CPU is over ${cpuOverload} %`,
    icon: path.join(__dirname, 'img', 'icon.png')
})

// Run every 2 seconds
setInterval(() => {
    // CPU Usage
    cpu.usage().then(info => {
        document.getElementById('cpu-usage').innerText = info + '%'

        document.getElementById('cpu-progress').style.width = info + '%'

        // Make Progress bar red if overload
        document.getElementById('cpu-progress').style.background = info > cpuOverload ? 'red' : '#30c88b'
    })

    cpu.free().then(info => {
        document.getElementById('cpu-free').innerText = info + '%'
    })

    // uptime
    document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime())
}, 2000)

// set model
document.getElementById('cpu-model').innerText = cpu.model()

// ComputerName
document.getElementById('comp-name').innerText = os.hostname()

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`

// Total Mem
mem.info().then(info => {
    document.getElementById('mem-total').innerText = `${info.totalMemMb} MB`
})

function secondsToDhms(seconds){
    seconds = +seconds
    const d = Math.floor(seconds / (3600*24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds%60)
    return `${d}d, ${h}h, ${m}m, ${s}s`
}

function notifyUser(options){
    new Notification(options.title, options)
    console.log(options)
}