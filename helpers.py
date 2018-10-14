import requests
import pandas as pd
import tempfile
import json


def get_ontology(objects_url, rships_url):
    ontology = []
    objects = get_google_sheet(objects_url)
    rships = get_google_sheet(rships_url)
    for i in objects:
        props = json.loads(objects[i]["properties"])
        props["id"] = str(i)
        ontology.append({
            "group": "nodes",
            "data": props
            })
    for i in rships:
        rship = rships[i]
        rship["id"] = str(i)
        rship["source"] = str(rship["source"])
        rship["target"] = str(rship["target"])
        ontology.append({
            "group": "edges",
            "data": rship
            })
    return ontology


def get_google_sheet(url):
    r = requests.get(url)
    with tempfile.NamedTemporaryFile(mode="w") as t:
        t.write(r.text)
        t.seek(0)
        data = pd.read_csv(t.name, index_col=0)
        data_dict = data.to_dict(orient="index")
    return data_dict
