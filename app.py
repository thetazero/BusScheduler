from flask import Flask, render_template
from transport import Transport

app = Flask(__name__)

bus = Transport()

@app.route('/')
def index():
    return render_template('index.html', time=bus.get_prediction(7097))