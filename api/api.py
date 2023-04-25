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
    result = response.json()
    
    
    longitude = result['result']['longitude']
    latitude = result['result']['latitude']
    
    print("Longitude : {}".format(longitude))
    print("Latitude : {}".format(latitude))
    print(response)
    return {'response': response.json()}