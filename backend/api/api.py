import flask
from flask_cors import CORS
import psycopg2
import urllib.parse as urlparse
import json
from flask import request, Response
import urllib.request
from urllib.request import Request
import csv
from datetime import datetime
import requests



app = flask.Flask(__name__)


dbname = ""
user = ""
password = ""
host = ""
port = ""



class Charger:
    def __init__(self, id, avg_power,comm_name):
        self.id = id
        self.avg_power = avg_power
        self.comm_name = comm_name
    def to_json(self):
        data = {}
        data['id'] = self.id
        data['avg_power'] = self.avg_power
        data['comm_name'] = self.comm_name
        return data

class Owner:
    def __init__(self, id, name,surname,phone_number,email,contacted):
        self.id = id
        self.name = name
        self.surname = surname
        self.phone_number = phone_number
        self.email = email
        self.contacted = contacted
    def to_json(self):
        data = {}
        data['id'] = self.id
        data['name'] = self.name
        data['surname'] = self.surname
        data['phone_number'] = self.phone_number
        data['email'] = self.email
        data['contacted'] = self.contacted
        
        return data

class Cost:
    def __init__(self, pc, energy_cost):
        self.pc = pc.strip()
        self.energy_cost = energy_cost
    def to_json(self):
        data = {}
        data['pc'] = self.pc
        data['energy_cost'] = self.energy_cost
        return data
        

class Roam:
    def __init__(self, id, pc,street_name,street_number,owner_id,charger_type,city,latitude,longitude,available):
        self.id = id.strip()
        self.pc = pc.strip()
        self.street_name = street_name
        self.street_number = street_number
        self.owner_id = owner_id
        self.charger_type = charger_type
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.available = available
    def to_json(self):
        data = {}
        data['id'] = self.id
        data['pc'] = self.pc
        data['street_name'] = self.street_name
        data['street_number'] = self.street_number
        data['owner_id'] = self.owner_id
        data['charger_type'] = self.charger_type
        data['city'] = self.city
        data['latitude'] = self.latitude
        data['longitude'] = self.longitude
        data['available'] = self.available
        return data


class Charge:
    def __init__(self, roam_id, reservation_id,init_time,finish_time,cost):
        self.roam_id = roam_id.strip()
        self.reservation_id = reservation_id
        self.init_time = init_time
        self.finish_time = finish_time
        self.cost = cost
        
    def to_json(self):
        data = {}
        data['roam_id'] = self.roam_id
        data['reservation_id'] = self.reservation_id
        data['init_time'] = str(self.init_time)
        data['finish_time'] = str(self.finish_time)
        data['cost'] = self.cost
        
        return data

class Position:
    def __init__(self, id, title,address,latitude,longitude):
        self.id = id
        self.title = title
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
    def to_json(self):
        data = {}
        data['id'] = self.id
        data['title'] = self.title
        data['address'] = self.address
        data['latitude'] = self.latitude
        data['longitude'] = self.longitude
        return data

def return_bad_request():
    response = Response(
            "Bad Request",
            status=400,)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def create_tables():
    
    conn = init_connection()
    cur = conn.cursor()
    #cur.execute("CREATE TABLE owners (id SERIAL PRIMARY KEY, name TEXT, surname TEXT, phone_number TEXT, email TEXT, contacted boolean DEFAULT false);")
    #cur.close()
    #cur.execute("CREATE TABLE chargers (id SERIAL PRIMARY KEY, avg_power INT, comm_name TEXT);")
    #cur.execute("CREATE TABLE costs (pc char(10) PRIMARY KEY, energy_cost INT);")
    #cur.execute("CREATE TABLE roams (id char(25) PRIMARY KEY, pc char(10), street_name TEXT, street_number INT, owner_id INT, charger_type INT, CONSTRAINT FK_pc_costs FOREIGN KEY(pc) REFERENCES costs(pc), CONSTRAINT FK_owner_id FOREIGN KEY(owner_id) REFERENCES owners(id),CONSTRAINT FK_charger_type FOREIGN KEY(charger_type) REFERENCES chargers(id));")
    close_connection(conn)

def init_connection():
    con = psycopg2.connect(
                dbname=dbname,
                user=user,
                password=password,
                host=host,
                port=port
                )
    return con

def close_connection(con):
    con.commit()
    con.close()

def json_owner(row,cur):
    values = []
    
    while row is not None:
        obj = Owner(row[0],row[1],row[2],row[3],row[4],row[5]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

# Chargers
def json_charger(row,cur):
    values = []
    
    while row is not None:
        obj = Charger(row[0],row[1],row[2]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

# Charges/Uses
def json_charges(row,cur):
    values = []
    
    while row is not None:
        obj = Charge(row[0],row[1],row[2],row[3],row[4]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

def json_cost(row,cur):
    values = []
    
    while row is not None:
        obj = Cost(row[0],row[1]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

def json_roam(row,cur):
    values = []
    
    while row is not None:
        obj = Roam(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

def json_pos(row,cur):
    values = []
    
    while row is not None:
        obj = Position(row[0],row[1],row[2],row[3],row[4]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return values

def default_get(db,json_call):
    con = init_connection()
    cur = con.cursor()
    results = []

    cur.execute("SELECT * from " + db)
    if cur.rowcount == 0:
        return json.dumps({})
    row = cur.fetchone()

    return json_call(row,cur)


@app.route('/api/roams', methods=['GET'])
def roams():
    response = flask.jsonify(default_get("roams",json_roam))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/roams', methods=['POST'])
def insert_roam():

    id = request.args.get('id')
    pc = request.args.get('pc')
    street_name = request.args.get('street_name')
    street_number = request.args.get('street_number')
    owner_id = request.args.get('owner_id')
    charge_type = request.args.get('charge_type')
    city = request.args.get('city')
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    if (id is None or pc is None or street_name is None or street_number is None or owner_id is None or charge_type is None or city is None or latitude is None or longitude is None):
        return return_bad_request()

    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into roams values ('"+id+"','"+pc+"','"+street_name+"',"+street_number+","+owner_id+","+charge_type+",'"+city+"',"+latitude+","+longitude+",true);"
        print(query)
        cur.execute(query)
    except:
        return return_bad_request()
    con.commit()
    cur.close()
    con.close()
    response = flask.jsonify(json.dumps({}), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route('/api/roams/<id>', methods=['GET'])
def roams_by_id(id):
    con = init_connection()
    cur = con.cursor()
    results = []

    cur.execute("select * from roams where roams.id = '" + str(id)+"'")
    if cur.rowcount == 0:
        return json.dumps({})
    row = cur.fetchone()

    response = flask.jsonify(Roam(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9]).to_json())
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/chargers', methods=['GET'])
def chargers():
    response =  flask.jsonify(default_get("chargers",json_charger))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/costs', methods=['GET'])
def costs():
    response = flask.jsonify(default_get("costs",json_cost))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/owners', methods=['GET'])
def owners():
    response =  flask.jsonify(default_get("owners",json_owner))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/owners', methods=['POST'])
def insert_owners():
    name = request.args.get('name')
    surname = request.args.get('surname')
    phone_number = request.args.get('phone_number')
    email = request.args.get('email')

    if (name is None or surname is None or phone_number is None or email is None):
        return return_bad_request()

    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into owners(name,surname,phone_number,email) values ('"+name+"','"+surname+"','"+ phone_number +"','"+email+"');"
        print(query)
        cur.execute(query)
    except:
        return return_bad_request()
    con.commit()
    cur.close()
    con.close()
    response = flask.jsonify(json.dumps({}), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/charges', methods=['GET'])
def charges():
    response = flask.jsonify(default_get("charges",json_charges))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/charges/<roam_id>', methods=['GET'])
def get_last_charge(roam_id):
    
    con = init_connection()
    cur = con.cursor()
    results = []

    cur.execute("select * from charges where roam_id = '" + roam_id+"' and finish_time is null")
    if cur.rowcount == 0:
        return json.dumps({})
    row = cur.fetchone()

    response = flask.jsonify(Charge(row[0],row[1],row[2],row[3],row[4]).to_json())
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route('/api/charges', methods=['POST'])
def insert_charge():
    roam_id = request.args.get('roam_id')
    reservation_id = request.args.get('reservation_id')
    init_time = datetime.now()
    
    
    if (roam_id is None or reservation_id is None):
        return return_bad_request()
    

    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into charges(roam_id, reservation_id, init_time) values ('"+roam_id+"',"+str(reservation_id)+",'"+str(init_time)+"');"
        cur.execute(query)
        
        query = "update roams set available = false where id = '"+roam_id+"';"
        
        cur.execute(query)
    except:
        return return_bad_request()
    con.commit()
    cur.close()
    con.close()
    response = flask.jsonify(json.dumps({}), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route('/api/charges', methods=['PUT'])
def finish_charge():
    roam_id = request.args.get('roam_id')
    reservation_id = request.args.get('reservation_id')
    #finish_time = request.args.get('finish_time')
    finish_time = datetime.now()

    if (roam_id is None or reservation_id is None):
        return return_bad_request()

    con = init_connection()
    cur = con.cursor()

    try:
        query = "update charges set finish_time = '"+str(finish_time)+"', cost = ((select extract(epoch from '"+str(finish_time)+"'::timestamp - init_time::timestamp)/60 from charges where charges.roam_id = '"+roam_id+"' and charges.reservation_id = "+reservation_id+") * ((select avg_power from chargers where chargers.id = (select charger_type from roams where roams.id = charges.roam_id)) * (select energy_cost from costs where costs.pc = (select r.pc from roams as r where r.id = charges.roam_id)))) where roam_id = '"+roam_id+"' and reservation_id = "+reservation_id+";"
        cur.execute(query)
        
        query = "update roams set available = true where id = '"+roam_id+"';"
        cur.execute(query)
    except:
        return return_bad_request()
    con.commit()
    cur.close()
    con.close()
    response = flask.jsonify(json.dumps({}), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

# SIXT API

@app.route('/api/sixt/stations', methods=['GET'])
def sixt_stations():
    term = request.args.get('term')
    vehicleType = request.args.get('vehicleType')
    #type = request.args.get('type')
    type = "station"
    print("request")
    req = Request(url="https://api.orange.sixt.com/v1/locations?term="+term+"&vehicleType="+vehicleType+"&type="+type,headers={'User-Agent': 'Mozilla/5.0'})
    contents = json.loads(urllib.request.urlopen(req).read())
    
    response = flask.jsonify(contents)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/sixt/positions', methods=['GET'])
def sixt_positions_munich():
   
    response = flask.jsonify(default_get("positions",json_pos))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
    

@app.route('/api/sixt/stations/<station_id>', methods=['GET'])
def sixt_station_by_id(station_id):
    req = Request(url="https://api.orange.sixt.com/v1/locations/"+station_id,headers={'User-Agent': 'Mozilla/5.0'})
    contents = json.loads(urllib.request.urlopen(req).read())
    
    response = flask.jsonify(contents)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route('/api/sixt/stations/positions', methods=['GET'])
def sixt_station_positions():
    term = request.args.get('term')
    vehicleType = request.args.get('vehicleType')
    type = request.args.get('type')
    type = "station"

    print("request")
    a = requests.get("https://api.orange.sixt.com/v1/locations?term=Munich&vehicleType=car&type=station",headers={'User-Agent': 'Mozilla/5.0'},stream='True',verify='sni-cloudflaressl-com.pem')
    #a = urllib.request.urlopen(req).read()
    print(a)
    #contents = json.loads(urllib.request.urlopen(req).read())
    contents = json.loads(a.text)
    print(contents)

    positions = []
    for station in contents:
        print(station[0]["id"])
        position = sixt_station_by_id(station[0]["id"])["coordinates"]
        positions.append(position)
        print(position)
    
    
    response = flask.jsonify(positions)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def insert_psql_roam(id,pc,street_name,street_number,owner_id,charge_type,city,latitude,longitude):
    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into roams values ('"+id+"','"+pc+"','"+street_name+"',"+str(street_number)+","+str(owner_id)+","+str(charge_type)+",'"+city+"',"+str(latitude)+","+str(longitude)+");"
        print(query)
        cur.execute(query)
    except:
        return Response(
        "Bad Request",
        status=400,)
    con.commit()
    cur.close()
    con.close()

# def insert_csv_roams():
#     id = 6
#     with open('coord_roam.csv', newline='') as csv_file:
#         csv_reader = csv.reader(csv_file, delimiter=',')
#         line_count = 0
#         for row in csv_reader:
#             #print("Pair: (" + row[0] + ", "+ row[1]+")")
#             insert_psql_roam("roam"+str(id),"80805","Boltzmannstrasse",18,2,1,"Muenchen",row[0],row[1])
#             line_count += 1
#             id += 1
#         print(f'Processed {line_count} lines.')

# def load_positions():
#     f = open('locations_munich.json')
#     data = json.load(f)
#     print(data)
#     with open('loc.csv', 'w', newline='') as csvfile:
#         spamwriter = csv.writer(csvfile, delimiter=',')
#         for d in data:
#             id = d["id"]
#             title = d["title"]
#             subtitle = d["subtitle"]
#             spamwriter.writerow([id,title,subtitle])

def insert_psql_loc(id,title,subtitle,latitude,longitude):
    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into positions values ('"+id+"','"+title+"','"+subtitle+"',"+str(latitude)+","+str(longitude)+");"
        print(query)
        cur.execute(query)
    except:
        return Response(
        "Bad Request",
        status=400,)
    con.commit()
    cur.close()
    con.close()

def insert_loc():
    with open('loc.csv', newline='') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            #print("Pair: (" + row[0] + ", "+ row[1]+")")
            insert_psql_loc(row[0],row[1],row[2],row[3],row[4])
            line_count += 1
            
        print(f'Processed {line_count} lines.')


def main():
    app.run()
    #insert_csv_roams()
    #load_positions()
    #insert_loc()
    

if __name__ == "__main__":
    main()



