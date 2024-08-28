from flask import Flask, render_template
from transport import Transport
from temperature import Temperature

app = Flask(__name__)

bus = Transport()

temp = Temperature()

@app.route('/')
def index():
    pred = bus.get_prediction(7097) # 7097 is the STOP id at forbes-wightman
    tmp = temp.read_temp()
    return render_template('index.html', 
                           date=pred['date'], 
                           hour=pred['hour'], 
                           minute=pred['minute'],
                           second=pred['second'],
                           meridiem=pred['meridiem'],
                           bus=pred['bus'],
                           temp=tmp
    )