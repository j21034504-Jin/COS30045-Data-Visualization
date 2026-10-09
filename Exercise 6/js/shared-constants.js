
// Set up chart dimensions and margins
const margin = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 70
};

const width = 800;
const height = 400;

// Inner chart dimensions
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Chart colours
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Create scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Create the histogram bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);
