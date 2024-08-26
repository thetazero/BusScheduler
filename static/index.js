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

    if (hour == 12) {
        hour = 12
    }
    hour %= 12

    tm.textContent += `${hour}:${minute}:${second} ${meridiem}`
}

function get_prediction_time() {
    let tm = document.getElementById("estimated_time").textContent.slice(30)
    let hour = tm.slice(0, 1)
    let minute = tm.slice(2, 4)
    let second = tm.slice(5, 7)
    if (tm.slice(8, 11) == 'pm' && hour != '12') {
        hour = (Number(hour) + 12).toString()
    }
    return {'hour': Number(hour), 'minute': Number(minute), 'second': Number(second)}
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

window.onload = function() {
    change_text()
    setInterval(set_difference_time, 1000)
}