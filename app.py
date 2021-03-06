from flask import Flask, render_template, session, request
from gevent.pywsgi import WSGIServer
import helpers as helpers
import settings as settings


app = Flask(__name__)
app.secret_key = settings.SECRET_KEY


ontology = helpers.get_ontology(
        objects_url="https://docs.google.com/spreadsheets/d/e/2PACX-1vRDjYuiffPJjPReUeitCSQ5_hk2AEeje3EFTtULHxNvmmg_ptsX741rIS_yg_88VwjOuueXl2WJSBs7/pub?gid=0&single=true&output=csv",
        rships_url="https://docs.google.com/spreadsheets/d/e/2PACX-1vRDjYuiffPJjPReUeitCSQ5_hk2AEeje3EFTtULHxNvmmg_ptsX741rIS_yg_88VwjOuueXl2WJSBs7/pub?gid=1290619477&single=true&output=csv"
        )


@app.before_request
def make_session_permanent():
    session.permanent = True

@app.route("/")
def home():
    if "q" in request.args and request.args["q"] != "":
        filtered = helpers.search(ontology, request.args["search_by"], request.args["q"])
    else:
        filtered = helpers.search(ontology, "label", "Southeast Asia")
    return render_template("home.html", ontology=filtered)


http_server = WSGIServer(("", settings.PORT), app)
http_server.serve_forever()
