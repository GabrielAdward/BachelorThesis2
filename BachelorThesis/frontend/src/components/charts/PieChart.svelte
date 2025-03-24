<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";

  export let district = "All";
  export let variable = "typeOfStore";

  let chartData = [];
  let colorScale;

  let prevDistrict, prevVariable;

  const fetchChartData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chart-data?district=${district}&variable=${variable}`);
      chartData = await response.json();

      colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(chartData.map(d => d.label));

      renderChart();
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const renderChart = () => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svgContainer = d3.select("#pie-chart");
    svgContainer.selectAll("*").remove();

    const svg = svgContainer
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const dataReady = pie(chartData);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll("path")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => colorScale(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.8);

    svg.selectAll("text")
      .data(dataReady)
      .enter()
      .append("text")
      .text(d => `${d.data.label} (${d.data.value})`)
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "10px");
  };

  onMount(() => {
    fetchChartData();
    prevDistrict = district;
    prevVariable = variable;
  });

  afterUpdate(() => {
    if (prevDistrict !== district || prevVariable !== variable) {
      fetchChartData();
      prevDistrict = district;
      prevVariable = variable;
    }
  });
</script>

<svg id="pie-chart"></svg>
