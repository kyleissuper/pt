import requests
import pandas as pd
import tempfile
import json


def get_ontology(objects_url, rships_url, filtered_ids=["49"]):
    ontology = []
    objects = get_google_sheet(objects_url)
    rships = get_google_sheet(rships_url)
    for i in objects:
        props = json.loads(objects[i]["properties"])
        props["id"] = str(i)
        ontology.append({
            "group": "nodes",
            "classes": ["graph_node"],
            "data": props
            })
    for i in rships:
        rship = rships[i]
        rship["id"] = str(i)
        rship["source"] = str(rship["source"])
        rship["target"] = str(rship["target"])
        ontology.append({
            "group": "edges",
            "classes": ["graph_edge"],
            "data": rship
            })
    return filter_ontology(ontology, filtered_ids)


def filter_ontology(ontology, desired_nodes):
    accepted_ids = set()
    for node_id in desired_nodes:
        for obj in ontology:
            if obj["group"] == "edges":
                if node_id in [obj["data"]["source"], obj["data"]["target"]]:
                    accepted_ids.add(obj["data"]["id"])
                    accepted_ids.add(obj["data"]["source"])
                    accepted_ids.add(obj["data"]["target"])
    modified_ontology = []
    for obj in ontology:
        if obj["data"]["id"] in accepted_ids:
            modified_ontology.append(obj)
    return modified_ontology


def get_google_sheet(url):
    r = requests.get(url)
    with tempfile.NamedTemporaryFile(mode="w") as t:
        t.write(r.text)
        t.seek(0)
        data = pd.read_csv(t.name, index_col=0)
        data_dict = data.to_dict(orient="index")
    return data_dict
