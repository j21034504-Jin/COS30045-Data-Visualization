"use strict";


// ======================================================
// LOAD DATA
// ======================================================

d3.csv("data/Data_exercise 5.3.csv", d => {

    return {
        category: d.Screensize_Category,
        count: +d.Count
    };

}).then(data => {

    console.log("Donut chart data:", data);

    drawDonutChart(data);

});


// ======================================================
// DRAW DONUT CHART
// ======================================================

const drawDonutChart = data => {

    // --------------------------------------------------
    // CHART DIMENSIONS
    // --------------------------------------------------

    const donutWidth = 800;
    const donutHeight = 500;

    const radius =
        Math.min(donutWidth, donutHeight) / 2 - 20;


    // --------------------------------------------------
    // COLOUR SCALE
    // --------------------------------------------------

    const color = d3
        .scaleOrdinal()
        .domain(
            data.map(d => d.category)
        )
        .range(d3.schemeSet2);


    // --------------------------------------------------
    // CALCULATE PIE ANGLES
    // --------------------------------------------------

    const pie = d3
        .pie()
        .value(d => d.count)
        .sort(null);


    const pieData = pie(data);


    // --------------------------------------------------
    // ARC GENERATOR
    // --------------------------------------------------

    const arcGenerator = d3
        .arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);


    // --------------------------------------------------
    // CREATE SVG
    // --------------------------------------------------

    const donutSvg = d3
        .select("#donut-chart")
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${donutWidth} ${donutHeight}`
        );


    // --------------------------------------------------
    // CENTRE THE DONUT
    // --------------------------------------------------

    const donutInnerChart = donutSvg
        .append("g")
        .attr(
            "transform",
            `translate(
                ${donutWidth / 2},
                ${donutHeight / 2}
            )`
        );


    // --------------------------------------------------
    // DRAW ARCS
    // --------------------------------------------------

    donutInnerChart
        .selectAll(".donut-slice")
        .data(pieData)
        .join("path")
        .attr("class", "donut-slice")
        .attr("d", arcGenerator)
        .attr(
            "fill",
            d => color(d.data.category)
        )
        .attr("stroke", "white")
        .attr("stroke-width", 2);


    // --------------------------------------------------
    // LABELS
    // --------------------------------------------------

    donutInnerChart
        .selectAll(".donut-label")
        .data(pieData)
        .join("text")
        .attr("class", "donut-label")
        .attr(
            "transform",
            d =>
                `translate(${arcGenerator.centroid(d)})`
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .attr(
            "dominant-baseline",
            "middle"
        )
        .text(
            d => d.data.category
        );

};