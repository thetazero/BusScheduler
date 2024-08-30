let endTime = 0

function reload_timer() {
    let timer = document.getElementById("timer")
    const now = new Date()
    let currentTime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
    let total_diff = endTime - currentTime
    let minute = Math.floor(total_diff / 60)
    let second = (total_diff % 60)

    if (total_diff == 0) {
        window.location.reload()
        return
    }

    if (minute < 10) {
        minute = minute.toString().padStart(2, '0')
    }
    if (second < 10) {
        second = second.toString().padStart(2, '0')
    }

    timer.textContent = `Page will auto refresh in: ${minute}:${second}`
}

window.onload = function() {
    const now = new Date()
    endTime = (now.getHours() * 3600) 
                + (now.getMinutes() * 60) 
                + now.getSeconds()
                + 1200 // Adds 20 minutes
    setInterval(reload_timer, 1000)
}