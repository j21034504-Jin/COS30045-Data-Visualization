"use strict";


// ======================================================
// CHART SIZE AND MARGINS
// ======================================================

const lineWidth = 800;
const lineHeight = 500;

const lineMargin = {
    top: 50,
    right: 30,
    bottom: 80,
    left: 90
};

const lineInnerWidth =
    lineWidth - lineMargin.left - lineMargin.right;

const lineInnerHeight =
    lineHeight - lineMargin.top - lineMargin.bottom;


// ======================================================
// CREATE SVG
// ======================================================

const lineSvg = d3
    .select("#line-chart")
    .append("svg")
    .attr(
        "viewBox",
        `0 0 ${lineWidth} ${lineHeight}`
    );


// ======================================================
// CREATE INNER CHART
// ======================================================

const lineInnerChart = lineSvg
    .append("g")
    .attr(
        "transform",
        `translate(${lineMargin.left}, ${lineMargin.top})`
    );


// ======================================================
// LOAD DATA
// ======================================================

d3.csv("data/ARE_Spot_Prices.csv", d => {

    return {

        year: +d.Year,

        averagePrice:
            +d["Average Price (notTas-Snowy)"]

    };

}).then(data => {

    console.log("Line chart data:", data);

    drawLineChart(data);

});


// ======================================================
// DRAW LINE CHART
// ======================================================

const drawLineChart = data => {


    // ==================================================
    // X SCALE
    // ==================================================

    const xScale = d3
        .scaleLinear()
        .domain(
            d3.extent(
                data,
                d => d.year
            )
        )
        .range([
            0,
            lineInnerWidth
        ]);


    // ==================================================
    // Y SCALE
    // ==================================================

    const yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(
                data,
                d => d.averagePrice
            )
        ])
        .nice()
        .range([
            lineInnerHeight,
            0
        ]);


    // ==================================================
    // X AXIS
    // ==================================================

    const bottomAxis = d3
        .axisBottom(xScale)
        .ticks(14)
        .tickFormat(
            d3.format("d")
        );


    lineInnerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${lineInnerHeight})`
        )
        .call(bottomAxis);


    // ==================================================
    // Y AXIS
    // ==================================================

    const leftAxis =
        d3.axisLeft(yScale);


    lineInnerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);


    // ==================================================
    // SCATTER PLOT
    // ==================================================

    lineInnerChart
        .selectAll(".data-point")
        .data(data)
        .join("circle")
        .attr("class", "data-point")
        .attr(
            "cx",
            d => xScale(d.year)
        )
        .attr(
            "cy",
            d => yScale(d.averagePrice)
        )
        .attr("r", 4);


    // ==================================================
    // LINE GENERATOR
    // ==================================================

    const lineGenerator = d3
        .line()
        .x(
            d => xScale(d.year)
        )
        .y(
            d => yScale(d.averagePrice)
        )
        .curve(d3.curveStep);;


    // ==================================================
    // DRAW LINE
    // ==================================================

    lineInnerChart
        .append("path")
        .datum(data)
        .attr(
            "class",
            "price-line"
        )
        .attr(
            "d",
            lineGenerator
        );


    // ==================================================
    // Y AXIS LABEL
    // ==================================================

    lineInnerChart
        .append("text")
        .attr(
            "class",
            "axis-label"
        )
        .attr(
            "x",
            -55
        )
        .attr(
            "y",
            -20
        )
        .attr(
            "text-anchor",
            "start"
        )
        .text(
            "Average Price ($ per MWh)"
        );


    // ==================================================
    // X AXIS LABEL
    // ==================================================

    lineInnerChart
        .append("text")
        .attr(
            "class",
            "axis-label"
        )
        .attr(
            "x",
            lineInnerWidth / 2
        )
        .attr(
            "y",
            lineInnerHeight + 55
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text("Year");

};