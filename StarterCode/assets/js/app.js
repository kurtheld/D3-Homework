// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold my chart, and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  //
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
   
  //  console.log(d3.min(data, d => d.poverty));
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)])
      .range([0, width]);

  //  console.log(d3.max(data, d => d.smokes));
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.smokes)-1, d3.max(data, d => d.smokes)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

  // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty Level");

          // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".4");


    var textGroup = chartGroup.selectAll("abbr")
    .data(data)//Getting the data from line 26-27
    .enter()//joins the data to the chartGroup
    .append("text")//puts the data on chartGroup
    .attr("x", d => xLinearScale(d.poverty)-7)//placing the abbe text in same place on x axis
    .attr("y", d => yLinearScale(d.smokes))//placing the abbe text in same place on x axis
    .text(d => d.abbr);//inserts the text in abbr column from the data array








    
  //   // Step 6: Initialize tool tip
  //   // ==============================
  //   var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function(d) {
  //       return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
  //     });

  // //   // Step 7: Create tooltip in the chart
  // //   // ==============================
  // //   chartGroup.call(toolTip);

  // //   // Step 8: Create event listeners to display and hide the tooltip
  // //   // ==============================
  // //   circlesGroup.on("click", function(data) {
  // //     toolTip.show(data, this);
  // //   })
  // //     // onmouseout event
  // //     .on("mouseout", function(data, index) {
  // //       toolTip.hide(data);
  // //     });

  
  });

