import time
import requests
from flask import Flask
from utils import get_coordinates, get_stop_points, get_buses

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/bus/<postcode>')
def get_bus(postcode):

    longitude, latitude = get_coordinates(postcode)
    
    stop_points = get_stop_points(longitude, latitude)
    
    results = get_buses(stop_points)
    
    return {'response': results, 'status': 'success'}