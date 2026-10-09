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

    // Check loaded data in the browser console
    console.log("Loaded TV data:", data);

    // Draw the histogram
    drawHistogram(data);

    // Prepare for filters in Exercise 6.2
    populateFilters(data);

})
.catch(error => {
    console.error("Error loading CSV file:", error);
});
