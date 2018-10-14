const coseLayout = require("./cytoscape-cose-bilkent.js");
cytoscape.use(coseLayout);


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
        'background-color': '#ad1a66',
        'label': 'data(label)',
        'font-size': '14px'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'target-arrow-shape': 'triangle',
        'line-color': '#ad1a66',
				'label': 'data(label)',
        'color': '#c00',
        'font-size': '8px'
      }
    }
  ],

  elements: ontology
});
