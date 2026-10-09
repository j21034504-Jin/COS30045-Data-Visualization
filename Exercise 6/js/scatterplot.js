
// Exercise 6.3 - TV Energy Consumption Scatterplot

const drawScatterplot = (data) => {

    // Clear the existing scatterplot
    d3.select("#scatterplot")
        .selectAll("*")
        .remove();

    // 1. Create the SVG container
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    // 2. Create the inner chart
    innerChartS = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    // 3. Set up the X and Y scales
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // X-axis: Star Rating
    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth]);

    // Y-axis: Energy Consumption
    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // 4. Set up the colour scale
    colorScale
        .domain(["LED", "LCD", "OLED"])
        .range(d3.schemeCategory10.slice(0, 3));

    // 5. Draw the scatterplot circles
    innerChartS
        .selectAll("circle")
        .data(data.filter(d =>
            Number.isFinite(d.star) &&
            Number.isFinite(d.energyConsumption)
        ))
        .join("circle")
        .attr("r", 3)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // 6. Create the X-axis
    const bottomAxis = d3.axisBottom(xScaleS)
        .ticks(8);

    innerChartS
        .append("g")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    // X-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .text("Star Rating");

    // 7. Create the Y-axis
    const leftAxis = d3.axisLeft(yScaleS)
        .ticks(10)
        .tickFormat(d3.format(","));

    innerChartS
        .append("g")
        .call(leftAxis);

    // Y-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", 10)
        .attr("y", 22)
        .text("Labelled Energy Consumption (kWh/year)");

    // 8. Create the legend
    const legend = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width - 100}, ${margin.top})`
        );

    // Add an entry for each screen technology
    colorScale.domain().forEach((screenTech, i) => {

        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        // Coloured rectangle
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // Legend label
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech);
    });

    console.log("Scatterplot created successfully");
};
