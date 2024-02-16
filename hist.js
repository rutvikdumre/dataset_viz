function createHorizontalHistogram(data, columnName, numBins=10) {
    var values = data.map(d => +d[columnName]);
    var histogram = d3.histogram()
        .domain(d3.extent(values))
        .thresholds(numBins)
        (values);

    var margin = {top: 40, right: 40, bottom: 60, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([0, d3.max(histogram, d => d.length)])
        .nice()
        .range([0, width]);

    var y = d3.scaleBand()
        .domain(histogram.map(d => d.x0))
        .range([0, height])
        .padding(0.1);

    var xAxis = g => g
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var yAxis = g => g
        .call(d3.axisLeft(y));

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .attr("fill", "#fff") 
        .text(columnName + " Histogram");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    var bars = svg.selectAll(".bar")
        .data(histogram)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.x0))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.length))
        .attr("fill", "lightyellow");
    svg.append("g")
    .call(xAxis)
    .append("text")
    .attr("x", width/2)
    .attr("y", 40)
    .attr("fill", "#fff")
    .attr("text-anchor", "end")
    .text("Count");

    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("x", 40)
        .attr("y", -30)
        .attr("fill", "#fff")
        .text(columnName);
    
}

function createHistogram(data, columnName, numBins=10) {
    var values = data.map(d => +d[columnName]);
    var histogram = d3.histogram()
        .domain(d3.extent(values))
        .thresholds(numBins)
        (values);

    var margin = {top: 40, right: 40, bottom: 60, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(histogram.map(d => d.x0))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(histogram, d => d.length)])
        .nice()
        .range([height, 0]);

    var xAxis = g => g
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var yAxis = g => g
        .call(d3.axisLeft(y));

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .attr("fill", "#fff") 
        .text(columnName + " Histogram");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    var bars = svg.selectAll(".bar")
        .data(histogram)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.x0))
        .attr("y", d => y(d.length))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.length))
        .attr("fill", "lightyellow");   
        
        svg.append("g")
        .call(xAxis)
        .append("text")
        .attr("x", width/2)
        .attr("y", 40)
        .attr("fill", "#fff")
        .attr("text-anchor", "end")
        .text(columnName);

        svg.append("g")
            .call(yAxis)
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("fill", "#fff")
            .text("Count");
}
