function createScatterPlot(data, xColumn, yColumn) {
    var margin = {top: 40, right: 40, bottom: 60, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var xScale, yScale;

    if (isNaN(data[0][xColumn])) {
        xScale = d3.scalePoint()
            .domain(data.map(d => d[xColumn]))
            .range([margin.left, width - margin.right]);
    } else {
        xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => +d[xColumn]))
            .nice()
            .range([margin.left, width - margin.right]);
    }

    if (isNaN(data[0][yColumn])) {
        yScale = d3.scalePoint()
            .domain(data.map(d => d[yColumn]))
            .range([height - margin.bottom, margin.top]);
    } else {
        yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => +d[yColumn]))
            .nice()
            .range([height - margin.bottom, margin.top]);
    }

    var xAxis = g => g
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .attr("fill", "#fff");

    var yAxis = g => g
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(yScale))
        .attr("fill", "#fff");

    var svg1 = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg1.append("g")
        .call(xAxis);

    svg1.append("g")
        .call(yAxis);

        svg1.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => {
            if (isNaN(d[xColumn])) {
                return xScale(d[xColumn]) + Math.random() * 10 - 5; // Adding jitter to x coordinate for categorical data
            } else {
                return xScale(+d[xColumn]);
            }
        })
        .attr("cy", d => {
            if (isNaN(d[yColumn])) {
                return yScale(d[yColumn]) + Math.random() * 10 - 5; // Adding jitter to y coordinate for categorical data
            } else {
                return yScale(+d[yColumn]);
            }
        })
        .attr("r", 1) // Set radius to 1
        .attr("fill", "lightyellow")
        .attr("opacity", 0.7);
    

    // Title
    svg1.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("fill", "#fff")
        .text("Scatter Plot Title");
}
