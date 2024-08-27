from flask import Flask, render_template
from transport import Transport

app = Flask(__name__)

bus = Transport()

@app.route('/')
def index():
    pred = bus.get_prediction(7097) # 7097 is the STOP id at forbes-wightman
    return render_template('index.html', 
                           date=pred['date'], 
                           hour=pred['hour'], 
                           minute=pred['minute'],
                           second=pred['second'],
                           meridiem=pred['meridiem'],
                           bus=pred['bus']
    )