import requests
import csv


def get_ontology(objects_url, rships_url):
    data = {
            "objects": get_google_sheet(objects_url),
            "relationships": get_google_sheet(rships_url)
            }
    return data


def get_google_sheet(url):
    r = requests.get(url)
    reader = csv.reader(r.text.splitlines())
    data = {row[0]:row[1] for row in reader}
    return data
