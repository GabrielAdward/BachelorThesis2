<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";

  let chartData = [];
  const width = 1000; // Specify chart width

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/diverging-bar-data?district=${district}&storeType=${storeType}&economicStat=${economicStat}`
      );
      const rawData = await response.json();

      // Process data to fit the chart requirements
      chartData = d3.sort(rawData, (d) => d.value)
        .map((d) => ({
          ...d,
          value: d.value, // Use actual value for diverging bar
        }));

      renderChart();
    } catch (error) {
      console.error("Error fetching diverging bar data:", error);
    }
  };

  const renderChart = () => {
    const marginTop = 30;
    const marginRight = 60;
    const marginBottom = 10;
    const marginLeft = 100; // Adjust for long store names
    const barHeight = 25;
    const height =
      Math.ceil((chartData.length + 0.1) * barHeight) + marginTop + marginBottom;

    const svgContainer = d3.select("#diverging-bar-chart");
    svgContainer.selectAll("*").remove();

    // Create scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(chartData, (d) => d.value))
      .rangeRound([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    const format = d3.format("+.1f");

    // Create SVG container
    const svg = svgContainer
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Add bars
    svg
      .append("g")
      .selectAll()
      .data(chartData)
      .join("rect")
      .attr("fill", (d) => (d.value > 0 ? "green" : "red"))
      .attr("x", (d) => x(Math.min(d.value, 0)))
      .attr("y", (d) => y(d.label))
      .attr("width", (d) => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth());

    // Add labels for values
    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll()
      .data(chartData)
      .join("text")
      .attr("text-anchor", (d) => (d.value < 0 ? "end" : "start"))
      .attr("x", (d) => x(d.value) + Math.sign(d.value - 0) * 4)
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => format(d.value));

    // Add X-axis and grid lines
    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("y2", height - marginTop - marginBottom)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) => g.select(".domain").remove());

    // Add Y-axis (labels for bars)
    svg
      .append("g")
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(6))
      .call((g) =>
        g
          .selectAll(".tick text")
          .filter((_, i) => chartData[i].value < 0)
          .attr("text-anchor", "start")
          .attr("x", 6)
      );
  };

  onMount(() => {
    fetchChartData();
  });
</script>

<svg id="diverging-bar-chart"></svg>
<style>
  #diverging-bar-chart {
    width: 100%;
    height: auto;
  }
</style>
