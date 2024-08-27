// Set the current time

function change_text() {
    const now = new Date()
    let tm = document.getElementById("current_time")

    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    if (minute < 10) {
        minute = minute.toString().padStart(2, '0')
    }
    if (second < 10) {
        second = second.toString().padStart(2, '0')
    }

    let meridiem = 'am'
    if (hour > 11) {
        meridiem = 'pm'
    }

    if (hour != 12) {
        hour %= 12
    }

    tm.textContent += `${hour}:${minute}:${second} ${meridiem}`
}

function get_prediction_time() {
    let hour = Number(document.getElementById("hour").textContent)
    let minute = Number(document.getElementById("minute").textContent)
    let second = Number(document.getElementById("second").textContent)
    let meridiem = document.getElementById("meridiem").textContent
    if (meridiem == "pm") {
        hour += 12
    }
    return {'hour': hour, 'minute': minute, 'second': second}
}

function set_difference_time() {
    const now = new Date()
    let tm = document.getElementById("difference_time")
    time = get_prediction_time()
    let now_sec = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
    let pred_sec = (time['hour'] * 3600) + (time['minute'] * 60) + time['second']

    let total_diff = pred_sec - now_sec

    if (total_diff <= 0) {
        window.location.reload()
        return
    } 

    // Bus predictions will never be greater than 30 minutes
    // so there is no need to calculate hour_diff
    let min_diff = Math.floor(total_diff / 60)
    let sec_diff = total_diff % 60

    if (min_diff < 10) {
        min_diff = min_diff.toString().padStart(2, '0')
    }
    if (sec_diff < 10) {
        sec_diff = sec_diff.toString().padStart(2, '0')
    }

    tm.textContent = `You have ${min_diff}:${sec_diff} remaining`
}

function reload_webpage() {
    window.location.reload()
}

window.onload = function() {
    change_text()
    setInterval(set_difference_time, 1000)
    setInterval(reload_webpage, 20000)
}