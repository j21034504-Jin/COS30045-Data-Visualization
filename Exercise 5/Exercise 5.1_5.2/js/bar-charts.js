"use strict";

const width = 800;
const height = 500;

const margin = {
    top: 50,
    right: 30,
    bottom: 80,
    left: 90
};

const innerWidth =
    width - margin.left - margin.right;

const innerHeight =
    height - margin.top - margin.bottom;


const svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);


const innerChart = svg
    .append("g")
    .attr(
        "transform",
        `translate(${margin.left}, ${margin.top})`
    );


d3.csv("data/Data_exercise 5.1-1.csv", d => {

    return {
        screenType: d.Screen_Tech,

        energy:
            +d["Mean(Labelled energy consumption (kWh/year))"]
    };

}).then(data => {

    console.log("Processed data:", data);

    data.sort((a, b) =>
        b.energy - a.energy
    );

    drawBarChart(data);
});


const drawBarChart = data => {

    // X SCALE
    const xScale = d3
        .scaleBand()
        .domain(
            data.map(d => d.screenType)
        )
        .range([0, innerWidth])
        .padding(0.25);


    // Y SCALE
    const yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, d => d.energy)
        ])
        .nice()
        .range([
            innerHeight,
            0
        ]);


    // X AXIS
    const bottomAxis =
        d3.axisBottom(xScale);


    innerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);


    // Y AXIS
    const leftAxis =
        d3.axisLeft(yScale);


    innerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);


    // BARS
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr(
            "x",
            d => xScale(d.screenType)
        )
        .attr(
            "y",
            d => yScale(d.energy)
        )
        .attr(
            "width",
            xScale.bandwidth()
        )
        .attr(
            "height",
            d =>
                innerHeight -
                yScale(d.energy)
        );


    // VALUE LABELS
    innerChart
        .selectAll(".value-label")
        .data(data)
        .join("text")
        .attr("class", "value-label")
        .attr(
            "x",
            d =>
                xScale(d.screenType) +
                xScale.bandwidth() / 2
        )
        .attr(
            "y",
            d =>
                yScale(d.energy) - 8
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(d => `${Math.round(d.energy)} kWh`);

    // Y AXIS LABEL
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr(
            "transform",
            "rotate(-90)"
        )
        .attr(
            "x",
            -innerHeight / 2
        )
        .attr(
            "y",
            -60
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(
            "Average Energy Consumption (kWh/year)"
        );


    // X AXIS LABEL
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr(
            "x",
            innerWidth / 2
        )
        .attr(
            "y",
            innerHeight + 60
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text("Screen Type");

};