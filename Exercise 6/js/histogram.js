
const drawHistogram = (data) => {

    // Clear any previous histogram
    d3.select("#histogram").selectAll("*").remove();

    // 1. Create the SVG container
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Create the inner chart
    const innerChart = svg.append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    // 2. Generate bins from the data
    const bins = binGenerator(data);

    console.log("Histogram bins:", bins);

    // 3. Calculate minimum and maximum values
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    // Find the maximum frequency
    const binsMaxLength = d3.max(bins, d => d.length);

    console.log(
        "minEng:", minEng,
        "maxEng:", maxEng,
        "binsMaxLength:", binsMaxLength
    );

    // 4. Set the scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // 5. Draw the histogram bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // 6. Add the X-axis
    const bottomAxis = d3.axisBottom(xScale)
        .ticks(14)
        .tickFormat(d3.format(","));

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // X-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .text("Labelled Energy Consumption (kWh/year)");

    // 7. Add the Y-axis
    const leftAxis = d3.axisLeft(yScale)
        .ticks(10)
        .tickFormat(d3.format(","));

    innerChart
        .append("g")
        .call(leftAxis);

    // Y-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", 10)
        .attr("y", 22)
        .text("Frequency");

};
