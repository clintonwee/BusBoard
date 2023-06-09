import requests

def get_coordinates(postcode):
    postcode_url = "https://api.postcodes.io/postcodes/{}".format(postcode)
    response = requests.get(postcode_url)
    result = response.json()
    
    longitude = result['result']['longitude']
    latitude = result['result']['latitude']
    
    return longitude, latitude

def get_stop_points(longitude, latitude):
    stopid_url = "https://api.tfl.gov.uk/StopPoint/?lat={}&lon={}&stopTypes=NaptanPublicBusCoachTram&radius=1000".format(latitude, longitude)
    response = requests.get(stopid_url)
    result = response.json()
    print(stopid_url)
    return result['stopPoints'][:2]

def get_buses(stop_points):
    results = []
    for stopPoint in stop_points:
        stopid = stopPoint['id']
        bus_url = 'https://api.tfl.gov.uk/StopPoint/{}/Arrivals'.format(stopid)
        response = requests.get(bus_url)
        next_buses = [
                {
                    'eta': bus['timeToStation'],
                    'destination': bus['destinationName'],
                    'busName': bus['lineName']
                } for bus in response.json()]
        
        sorted_buses = sorted(next_buses, key=lambda d: d['eta'])
        stop_info = {
            "stopName": stopPoint['indicator'],
            "roadName": stopPoint['commonName'],
            "buses": sorted_buses
        }
        
        results.append(stop_info)
    
    return results

def verify(postcode):
    verify_url = 'http://api.postcodes.io/postcodes/{}'.format(postcode)
    response = requests.get(verify_url)
    result = response.json()
    if result['status'] == 404:
        return False
    else:
        return True
    