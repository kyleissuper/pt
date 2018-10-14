const coseLayout = require("./cytoscape-cose-bilkent.js");
cytoscape.use(coseLayout);


const describe = (evt) => {
  let tbl = document.querySelector("#describer");
  tbl.innerHTML = "";
  let data = evt.target._private.data;
  delete data.id;
  Object.keys(data).forEach((k) => {
    let row = "<tr><td>" + k + "</td>";
    row += "<td>" + data[k] + "</td></tr>";
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
        'background-color': '#000',
        'color': '#fff',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': '#000',
        'font-size': '10px'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'line-color': '#000',
        'target-arrow-color': '#000',
				'label': 'data(label)',
        'color': 'hsl(0, 0%, 53.3%)',
        'font-size': '8px'
      }
    }
  ],
  elements: ontology
});
cy.on('tap', 'node', function(evt){
  describe(evt);
});
cy.on('mouseover', 'node', function(evt){
  describe(evt);
});
