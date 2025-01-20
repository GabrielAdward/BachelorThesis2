<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let district = "Oster";
  export let variable = "typeOfStore";

  let chartData = [];
  let colorScale;

  // Fetch chart data from the backend
  const fetchChartData = async () => {
    console.log("Fetching chart data for district:", district, "variable:", variable);
    try {
      const response = await fetch(
        `http://localhost:8080/chart-data?district=${district}&variable=${variable}`
      );
      chartData = await response.json();
      console.log("Fetched chart data:", chartData);

      // Initialize color scale after data is fetched
      colorScale = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(chartData.map((d) => d.label));

      renderChart(); // Render the chart
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Render the pie chart
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
      .attr("fill", (d) => colorScale(d.data.label)) // Use colorScale for slice colors
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
