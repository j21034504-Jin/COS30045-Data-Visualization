"use strict";

// Exercise 4.3–4.7 on the PowerWise televisions.html page.
// The original exercises were progressive versions of the same TV brand chart.

const tvChartSettings = {
    color: "steelblue",
    rawBarHeight: 16,
    rawBarSpacing: 4,
    chartHeight: 650
};

// Exercise 4.3: create a responsive SVG and append one rectangle.
function drawExercise43() {
    const svg = d3.select("#tv-chart-43")
        .append("svg")
        .attr("viewBox", "0 0 1200 90");

    svg.append("rect")
        .attr("x", 10)
        .attr("y", 12)
        .attr("width", 414)
        .attr("height", 16)
        .attr("fill", "steelblue");
}

// Exercise 4.4: display selected information after the CSV has loaded.
function showDataPreview(data) {
    d3.select("#tv-brand-total").text(data.length);
    d3.select("#tv-brand-max").text(d3.format(",")(d3.max(data, d => d.count)));
    d3.select("#tv-brand-min").text(d3.format(",")(d3.min(data, d => d.count)));

    d3.select("#tv-data-preview")
        .selectAll("tr")
        .data(data.slice(0, 5))
        .join("tr")
        .html(d => `<td>${escapeText(d.brand)}</td><td>${d3.format(",")(d.count)}</td>`);
}

function escapeText(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

// Exercise 4.5: bind counts directly to the width of raw bars.
function drawExercise45(data) {
    const svg = d3.select("#tv-chart-45")
        .append("svg")
        .attr("viewBox", "0 0 1200 520");

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * (tvChartSettings.rawBarHeight + tvChartSettings.rawBarSpacing))
        .attr("width", d => d.count)
        .attr("height", tvChartSettings.rawBarHeight)
        .attr("fill", tvChartSettings.color);
}

// Exercise 4.6: add scales so data values fit the available drawing area.
function drawExercise46(data) {
    const width = 950;
    const height = tvChartSettings.chartHeight;
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, 870]);
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, height])
        .padding(0.1);

    const svg = d3.select("#tv-chart-46")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height + 10}`);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", tvChartSettings.color);
}

// Exercise 4.7: group bars with their brand names and numeric labels.
function drawExercise47(data) {
    const width = 1100;
    const height = tvChartSettings.chartHeight;
    const left = 160;
    const plotWidth = 800;
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, plotWidth]);
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, height])
        .padding(0.12);

    const svg = d3.select("#tv-chart-47")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height + 12}`);

    const barAndLabel = svg.selectAll("g.brand-row")
        .data(data)
        .join("g")
        .attr("class", "brand-row")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel.append("rect")
        .attr("x", left)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", tvChartSettings.color);

    barAndLabel.append("text")
        .attr("class", "chart-label")
        .attr("x", left - 10)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .text(d => d.brand);

    barAndLabel.append("text")
        .attr("class", "chart-count")
        .attr("x", d => left + xScale(d.count) + 8)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .text(d => d3.format(",")(d.count));
}

function drawTelevisionExerciseCharts() {
    drawExercise43();

    d3.csv("assets/data/tvBrandCounts.csv", row => ({
        brand: row.brand,
        count: +row.count
    }))
    .then(data => {
        data.sort((a, b) => b.count - a.count);
        console.log("Exercise 4.4 TV brand data:", data);
        console.log("Number of brands:", data.length);
        console.log("Maximum count:", d3.max(data, d => d.count));
        console.log("Minimum count:", d3.min(data, d => d.count));
        console.log("Extent:", d3.extent(data, d => d.count));
        showDataPreview(data);
        drawExercise45(data);
        drawExercise46(data);
        drawExercise47(data);
    })
    .catch(error => {
        console.error("Cannot load the TV brand CSV:", error);
        const notice = document.getElementById("tv-data-error");
        notice.style.display = "block";
        notice.textContent = "Unable to load TV brand data. Open the site through Live Server and check assets/data/tvBrandCounts.csv.";
    });
}

if (typeof d3 === "undefined") {
    const notice = document.getElementById("tv-data-error");
    notice.style.display = "block";
    notice.textContent = "D3 did not load. Please check your internet connection and reload the page.";
} else {
    drawTelevisionExerciseCharts();
}
