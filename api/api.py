import time
import requests
from flask import Flask
from utils import get_coordinates, get_stop_points, get_buses, verify

app = Flask(__name__)

@app.route('/bus/<postcode>')
def get_bus(postcode):
    is_verified = verify(postcode)
    
    
    if not is_verified:
        return "Invalid postcode", 500
    
    longitude, latitude = get_coordinates(postcode)
    
    stop_points = get_stop_points(longitude, latitude)
    
    results = get_buses(stop_points)

    return {'response': results, 'status': 'success'}
