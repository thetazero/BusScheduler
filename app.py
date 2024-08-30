from flask import Flask, render_template
from transport import Transport
from pghbustime import BustimeError
from temperature import Temperature, tempAvailable
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

bus = Transport()

@app.route('/')
def index():
    tmp = '[No sensor]'
    if tempAvailable:
        temp = Temperature()
        tmp = temp.read_temp()
    try:
        pred = bus.get_prediction(7097) # 7097 is the STOP id at forbes-wightman
        return render_template('index.html', 
                        date=pred['date'], 
                        hour=pred['hour'], 
                        minute=pred['minute'],
                        second=pred['second'],
                        meridiem=pred['meridiem'],
                        bus=pred['bus'],
                        temp=tmp
        )
    except BustimeError:
        error = "There is not a bus for at least the next 30 minutes."
        return render_template('error.html', error=error)
    except Exception as e:
        return render_template('error.html', error=e)

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e
    return render_template('error.html', error=e)