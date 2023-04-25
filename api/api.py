import time
import requests
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/bus/<postcode>')
def get_bus(postcode):
    postcode_url = "https://api.postcodes.io/postcodes/{}".format(postcode)
    response = requests.get(postcode_url)
    print(response)
    return {'response': response.json()}