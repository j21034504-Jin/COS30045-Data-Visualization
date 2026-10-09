
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

// Array of filter options for TV screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Exercise 6.3 - Scatterplot

// Inner chart for scatterplot
let innerChartS;

// Tooltip dimensions (for Exercise 6.4)
const tooltipWidth = 65;
const tooltipHeight = 32;

// Scatterplot scales
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

// Colour scale for TV screen technology
const colorScale = d3.scaleOrdinal();
