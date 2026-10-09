
// Populate the TV screen technology filters
const populateFilters = (data) => {

    // Create filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("type", "button")
        .attr("class", "filter")
        .classed("active", d => d.isActive)
        .text(d => d.label)

        // Handle button clicks
        .on("click", (event, d) => {

            console.log("Clicked filter:", d.id);

            // Only update when a different filter is clicked
            if (!d.isActive) {

                // Update active filter status
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });

                // Update the button styles
                d3.select("#filters_screen")
                    .selectAll(".filter")
                    .classed("active", filter => filter.isActive);

                // Update the histogram
                updateHistogram(d.id, data);
            }
        });
};


// Update histogram based on the selected filter
const updateHistogram = (filterId, data) => {

    // Filter the TV dataset
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    console.log("Filtered records:", updatedData.length);

    // Generate new bins
    const updatedBins = binGenerator(updatedData);

    // Animate histogram bars
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));


const populateFilters = (data) => {}
};


// Exercise 6.4 - Tooltip functionality

// Create the tooltip on the scatterplot
const createTooltip = () => {

    // Create tooltip group
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .attr("pointer-events", "none")
        .style("opacity", 0);

    // Create tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Create tooltip text
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};


// Handle mouse interactions
const handleMouseEvents = () => {

    // Select scatterplot circles only
    innerChartS
        .selectAll("circle")

        // When mouse enters a circle
        .on("mouseenter", (event, d) => {

            console.log("Mouse entered circle", d);

            // Update tooltip text with TV screen size
            innerChartS
                .select(".tooltip text")
                .text(d.screenSize);

            // Get the position of the circle
            const cx = +event.currentTarget.getAttribute("cx");
            const cy = +event.currentTarget.getAttribute("cy");

            // Position and display the tooltip
            innerChartS
                .select(".tooltip")
                .attr(
                    "transform",
                    `translate(${cx - 0.5 * tooltipWidth},
                    ${cy - 1.5 * tooltipHeight})`
                )
                .interrupt()
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        // When mouse leaves a circle
        .on("mouseleave", (event, d) => {

            console.log("Mouse left circle", d);

            // Hide the tooltip
            innerChartS
                .select(".tooltip")
                .interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};
