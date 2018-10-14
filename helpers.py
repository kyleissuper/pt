import requests
import pandas as pd
import tempfile


def get_ontology(objects_url, rships_url):
    data = {
            "objects": get_google_sheet(objects_url),
            "relationships": get_google_sheet(rships_url)
            }
    return data


def get_google_sheet(url):
    r = requests.get(url)
    with tempfile.NamedTemporaryFile(mode="w") as t:
        t.write(r.text)
        t.seek(0)
        data = pd.read_csv(t.name, index_col=0)
        data_dict = data.to_dict(orient="index")
    return data_dict
