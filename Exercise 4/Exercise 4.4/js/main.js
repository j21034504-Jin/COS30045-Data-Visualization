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

    console.log("Data:", data);

    console.log("Number of brands:", data.length);

    console.log(
        "Maximum count:",
        d3.max(data, d => d.count)
    );

    console.log(
        "Minimum count:",
        d3.min(data, d => d.count)
    );

    console.log(
        "Extent:",
        d3.extent(data, d => d.count)
    );


    // Sort brands from highest count to lowest
    data.sort((a, b) => b.count - a.count);

    console.log("Sorted data:", data);

    drawBarChart(data);

});


const drawBarChart = data => {

    // Bar chart will be created in Exercise 4.5
    console.log("Data passed to drawBarChart:", data);

};