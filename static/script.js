const coseLayout = require("./cytoscape-cose-bilkent.js");
cytoscape.use(coseLayout);


document.querySelector("#cy").style.height = window.innerHeight - 250 + "px";


const describe = (evt) => {
  let tbl = document.querySelector("#describer");
  tbl.innerHTML = "";
  let data = evt.target._private.data;
  delete data.id;
  Object.keys(data).forEach((k) => {
    let row = "<tr><td>" + k + "</td>";
    row += "<td>";
    if (["label", "company_size", "city"].includes(k)) {
      row += "<a href='/?search_by=" + k + "&q=" + data[k] + "'>";
      row += data[k];
      row += "</a>";
    } else {
      row += data[k];
    }
    row += "</td></tr>";
    tbl.innerHTML += row;
  });
};


var cy = window.cy = cytoscape({
  container: document.getElementById('cy'),
  boxSelectionEnabled: false,
  autounselectify: true,
  layout: {
    name: 'cose-bilkent',
    animate: false
  },
  style: [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'width': 75,
        'height': 75,
        "text-max-width": 70,
        'background-color': '#fff',
        'border-width': 1,
        'border-color': '#000',
        'text-valign': 'center',
        //'text-outline-width': 1,
        //'text-outline-color': '#000',
        'color': '#000',
        'font-size': '10px',
        'font-weight': 'bold',
        'font-family': 'Krub',
        "text-wrap": "wrap"
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 1,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'line-color': '#000',
        'target-arrow-color': '#000',
				'label': 'data(label)',
        'color': 'hsl(0, 0%, 53.3%)',
        'font-size': '9px'
      }
    }
  ],
  elements: ontology
});
const colorMap = {
  company_size: {
    Small: ["#CDCDCD", '#000'],
    Medium: ["#CDCDCD", '#000'],
    Large: ["#000", "#fff"]
  }
};
cy._private.elements.forEach((el) => {
  if (el._private.group == "nodes") {
    Object.keys(el._private.data).forEach((k) => {
      if (Object.keys(colorMap).includes(k)) {
        el.style("background-color", colorMap[k][el._private.data[k]][0]);
        el.style("color", colorMap[k][el._private.data[k]][1]);
      }
    });
  }
});
cy.on('tap', 'node', function(evt){
  describe(evt);
});


// document.querySelector("form").addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   let goToURL = "/?search_by=" + evt.srcElement[0].value + "&q=" + evt.srcElement[1].value;
//   window.location.replace(goToURL);
// });
//


let queryHeadingString = "";
let queryString = window.location.href.split("/").pop();
if (queryString[0] == "?") {
  let queryLabel = queryString.split("&")[0].split("=")[1];
  let queryValue = queryString.split("&")[1].split("=")[1].replace(/%20/g, " ");
  queryHeadingString = "Searched for " + queryLabel + "='" + queryValue + "'";
} else {
  queryHeadingString = "Searched for label='Southeast Asia'";
}
document.querySelector("#query").innerHTML = queryHeadingString;


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};


document.querySelector("#share").addEventListener("click", (evt) => {
  evt.preventDefault();
  copyToClipboard(window.location.href);
  alertify.log("Copied URL to clipboard");
});
