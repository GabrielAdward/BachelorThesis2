<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let district = "Oster";
  export let variable = "typeOfStore";

  let chartData = [];
  let colorScale;

  const fetchChartData = async () => {
    console.log("Step 5: Fetching data for district =", district, "variable =", variable);

    // Map "Ingen" to "null" for the backend (if needed)
    const mappedDistrict = district === "Ingen" ? null : district;

    try {
      const response = await fetch(
        `http://localhost:8080/chart-data?district=${mappedDistrict}&variable=${variable}`
      );
      chartData = await response.json();

      console.log("Step 5: Fetched chartData =", chartData);

      // Generate color scale
      colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(chartData.map((d) => d.label));

      renderChart(); // Render the chart after data is fetched
    } catch (error) {
      console.error("Step 5: Error fetching chart data:", error);
    }
  };

  const renderChart = () => {
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  // Check if the SVG container exists
  const svgContainer = d3.select("#pie-chart");
  if (!svgContainer.node()) {
    console.error("SVG container not found!");
    return;
  }

  // Clear any existing chart
  svgContainer.selectAll("*").remove();

  // Create the main SVG element
  const svg = svgContainer
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Create pie layout
  const pie = d3.pie().value((d) => d.value);
  const dataReady = pie(chartData);

  console.log("Step 5: Render Chart - dataReady", dataReady);

  // Create arc generator
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Draw slices
  svg
    .selectAll("path")
    .data(dataReady)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.label))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.8);

  // Add labels
  svg
    .selectAll("text")
    .data(dataReady)
    .enter()
    .append("text")
    .text((d) => `${d.data.label} (${d.data.value})`)
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px");
};


  onMount(() => {
    console.log("Step 5: Component mounted");
    fetchChartData();
  });
</script>

<svg id="pie-chart"></svg>

<style>
  #pie-chart {
    width: 100%;
    height: auto;
  }
</style>
