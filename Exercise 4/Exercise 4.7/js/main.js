"use strict";


const svg = d3
    .select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 600 500")
    .style("border", "1px solid black");


d3.csv("data/tvBrandCounts.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Sort brands from highest count to lowest
    data.sort((a, b) => b.count - a.count);

    console.log("Data:", data);

    drawBarChart(data);

});


const drawBarChart = data => {


    // Scale the count values to fit the chart
    const xScale = d3
        .scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);


    // Position each brand vertically
    const yScale = d3
        .scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 500])
        .padding(0.1);


    // Group each bar and its labels together
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr(
            "transform",
            d => `translate(0, ${yScale(d.brand)})`
        );


    // Draw bars
    barAndLabel
        .append("rect")
        .attr("x", 120)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");


    // Add brand names
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 110)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "11px");


    // Add count values
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 130 + xScale(d.count))
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-size", "11px");

};