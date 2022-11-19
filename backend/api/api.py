import flask
import psycopg2
import urllib.parse as urlparse
import json
from flask import request, Response

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
        self.pc = pc
        self.energy_cost = energy_cost
    def to_json(self):
        data = {}
        data['pc'] = self.pc
        data['energy_cost'] = self.energy_cost
        return data
        

class Roam:
    def __init__(self, id, pc,street_name,street_number,owner_id,charger_type):
        self.id = id
        self.pc = pc
        self.street_name = street_name
        self.street_number = street_number
        self.owner_id = owner_id
        self.charger_type = charger_type
    def to_json(self):
        data = {}
        data['id'] = self.id
        data['pc'] = self.pc
        data['street_name'] = self.street_name
        data['street_number'] = self.street_number
        data['owner_id'] = self.owner_id
        data['charger_type'] = self.charger_type
        return data


class Charge:
    def __init__(self, roam_id, reservation_id,init_time,finish_time,cost):
        self.roam_id = roam_id
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
    
    return json.dumps(values)

# Chargers
def json_charger(row,cur):
    values = []
    
    while row is not None:
        obj = Charger(row[0],row[1],row[2]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return json.dumps(values)

# Charges/Uses
def json_charges(row,cur):
    values = []
    
    while row is not None:
        obj = Charge(row[0],row[1],row[2],row[3],row[4]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return json.dumps(values)

def json_cost(row,cur):
    values = []
    
    while row is not None:
        obj = Cost(row[0],row[1]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return json.dumps(values)

def json_roam(row,cur):
    values = []
    
    while row is not None:
        obj = Roam(row[0],row[1],row[2],row[3],row[4],row[5]).to_json()
        values.append(obj)
        row = cur.fetchone()
    
    return json.dumps(values)

def default_get(db,json_call):
    con = init_connection()
    cur = con.cursor()
    results = []

    cur.execute("SELECT * from " + db)
    if cur.rowcount == 0:
        return json.dumps({})
    row = cur.fetchone()

    return json_call(row,cur)


@app.route('/roams', methods=['GET'])
def roams():
    return default_get("roams",json_roam)

@app.route('/roams/<id>', methods=['GET'])
def roams_by_id(id):
    con = init_connection()
    cur = con.cursor()
    results = []

    cur.execute("select * from roams where roams.id = '" + str(id)+"'")
    if cur.rowcount == 0:
        return json.dumps({})
    row = cur.fetchone()

    return json.dumps(Roam(row[0],row[1],row[2],row[3],row[4],row[5]).to_json())

@app.route('/chargers', methods=['GET'])
def chargers():
    return default_get("chargers",json_charger)

@app.route('/costs', methods=['GET'])
def costs():
    return default_get("costs",json_cost)

@app.route('/owners', methods=['GET'])
def owners():
    return default_get("owners",json_owner)

@app.route('/owners', methods=['POST'])
def insert_owners():
    name = request.args.get('name')
    surname = request.args.get('surname')
    phone_number = request.args.get('phone_number')
    email = request.args.get('email')

    if (name is None or surname is None or phone_number is None or email is None):
        return Response(
        "Bad Request",
        status=400,
    )

    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into owners(name,surname,phone_number,email) values ('"+name+"','"+surname+"','"+ phone_number +"','"+email+"');"
        print(query)
        cur.execute(query)
    except:
        return Response(
        "Bad Request",
        status=400,)
    con.commit()
    cur.close()
    con.close()
    return json.dumps({}), 200

@app.route('/charges', methods=['GET'])
def charges():
    return default_get("charges",json_charges)

@app.route('/charges', methods=['POST'])
def insert_charge():
    roam_id = request.args.get('roam_id')
    reservation_id = request.args.get('reservation_id')
    init_time = request.args.get('init_time')

    if (roam_id is None or reservation_id is None or init_time is None):
        return Response(
        "Bad Request",
        status=400,
    )

    con = init_connection()
    cur = con.cursor()

    try:
        query = "insert into charges(roam_id, reservation_id, init_time) values ('"+roam_id+"',"+str(reservation_id)+",'"+str(init_time)+"');"
        cur.execute(query)
    except:
        return Response(
        "Bad Request",
        status=400,)
    con.commit()
    cur.close()
    con.close()
    return json.dumps({}), 200

@app.route('/charges', methods=['PUT'])
def finish_charge():
    roam_id = request.args.get('roam_id')
    reservation_id = request.args.get('reservation_id')
    finish_time = request.args.get('finish_time')

    if (finish_time is None):
        return Response(
        "Bad Request",
        status=400,
    )

    con = init_connection()
    cur = con.cursor()

    try:
        query = "update charges set finish_time = '"+finish_time+"', cost = ((select extract(epoch from '"+finish_time+"'::timestamp - init_time::timestamp)/60 from charges where charges.roam_id = '"+roam_id+"' and charges.reservation_id = "+reservation_id+") * ((select avg_power from chargers where chargers.id = (select charger_type from roams where roams.id = charges.roam_id)) * (select energy_cost from costs where costs.pc = (select r.pc from roams as r where r.id = charges.roam_id)))) where roam_id = '"+roam_id+"' and reservation_id = "+reservation_id+";"
        print(query)
        cur.execute(query)
    except:
        return Response(
        "Bad Request",
        status=400,)
    con.commit()
    cur.close()
    con.close()
    return json.dumps({}), 200

def main():
    app.run()

if __name__ == "__main__":
    main()



