"use strict";


const tvSvg = d3
    .select(".tv-brand-chart")
    .append("svg")
    .attr("viewBox", "0 0 650 560");


d3.csv("data/tvBrandCounts.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Sort from highest count to lowest
    data.sort((a, b) => b.count - a.count);

    drawTVBrandChart(data);

});


const drawTVBrandChart = data => {

    const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, 400]);


    const yScale = d3
        .scaleBand()
        .domain(data.map(d => d.brand))
        .range([20, 540])
        .padding(0.15);


    const barAndLabel = tvSvg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr(
            "transform",
            d => `translate(0, ${yScale(d.brand)})`
        );


    // Bars
    barAndLabel
        .append("rect")
        .attr("x", 150)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#0b6b3a");


    // Brand names
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 140)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px");


    // Count labels
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 160 + xScale(d.count))
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold");

};