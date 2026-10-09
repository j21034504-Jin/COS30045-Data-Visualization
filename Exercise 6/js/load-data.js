// Load the TV dataset
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
}))
.then(data => {
    // Keep the histogram bin boundaries consistent
    const maxEnergy = Math.ceil(
        d3.max(data, d => d.energyConsumption) / 200
    ) * 200;
    binGenerator
        .domain([0, maxEnergy])
        .thresholds(d3.range(200, maxEnergy, 200));
    // Draw histogram and populate filters
    
    // Draw the Exercise 6.1 histogram
    drawHistogram(data);

    // Create the Exercise 6.2 filters
    populateFilters(data);

    // Draw the Exercise 6.3 scatterplot
    drawScatterplot(data);

    // Prepare tooltip functionality for Exercise 6.4
    createTooltip();
    handleMouseEvents();

})
.catch(error => {
    console.error("Error loading CSV file:", error);
});
