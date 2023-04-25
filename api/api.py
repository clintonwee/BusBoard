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
    
    stopid_url = "https://api.tfl.gov.uk/StopPoint/?lat={}&lon={}&stopTypes=NaptanPublicBusCoachTram".format(latitude, longitude)
    response = requests.get(stopid_url)
    result = response.json()
    
    #distance, name of road (commonName), name of stop (indicator), stopcode (naptanId)
    results = []
    for stopPoint in result['stopPoints'][:2]:
        stopid = stopPoint['id']
        bus_url = 'https://api.tfl.gov.uk/StopPoint/{}/Arrivals'.format(stopid)
        response = requests.get(bus_url)
        next_buses = [
                {
                    'eta': bus['timeToStation'],
                    'destination': bus['destinationName'],
                    'busName': bus['lineName']
                } for bus in response.json()]
        
        stop_info = {
            "stopName": stopPoint['indicator'],
            "roadName": stopPoint['commonName'],
            "buses": next_buses
        }
        
        results.append(stop_info)
        # print(stopPoint['commonName'])
    
    
    return {'response': results, 'status': 'success'}