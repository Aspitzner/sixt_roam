

import json 
import pandas as pd 


df = pd.read_csv("stations.csv", encoding='latin-1', sep=';')
print


ary = [] 

for a,b,c,d, e, f in zip(df["Langengrad"], df["Breitengrad"], df["Hausnummer"], df["Strasse"], df["Ort"], range(10000000)):

    if not (str(e).startswith("M") and str(e).endswith("nchen")): 
        continue 

    if (f % 10 != 0): 
        continue


    ary.append(
        {
            "street_number": c, 
            "latitude": float(str(b).replace(",", ".")), 
            "longitude": float(str(a).replace(",", ".")), 
            "street_name": str(d).encode('ascii', errors='ignore').decode()
        }
    )

t = json.dumps(ary)
f = open("stations.json", "a")
f.write(t)
f.close()