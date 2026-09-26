"use strict";

const svg = d3
    .select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 500")
    .style("border", "1px solid black");


d3.csv("data/tvBrandCounts.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Sort from largest count to smallest
    data.sort((a, b) => b.count - a.count);

    console.log("Data:", data);

    drawBarChart(data);

});


const drawBarChart = data => {

    const barHeight = 16;
    const barSpacing = 4;

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")

        .attr("class", d => `bar-${d.count}`)

        .attr("x", 0)

        .attr("y", (d, i) =>
            i * (barHeight + barSpacing)
        )

        .attr("width", d => d.count)

        .attr("height", barHeight)

        .attr("fill", "steelblue");

};