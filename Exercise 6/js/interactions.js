
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