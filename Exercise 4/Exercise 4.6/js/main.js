"use strict";


const svg = d3
    .select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 700")
    .style("border", "1px solid black");


d3.csv("data/tvBrandCounts.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Sort from highest count to lowest
    data.sort((a, b) => b.count - a.count);

    console.log("Data:", data);

    drawBarChart(data);

});


const drawBarChart = data => {


    // Linear scale for count values
    const xScale = d3
        .scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);


    // Band scale for brand categories
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 700])
        .padding(0.1);


    svg
        .selectAll("rect")
        .data(data)
        .join("rect")

        .attr("class", d => `bar-${d.count}`)

        .attr("x", 0)

        .attr("y", d => yScale(d.brand))

        .attr("width", d => xScale(d.count))

        .attr("height", yScale.bandwidth())

        .attr("fill", "steelblue");

};