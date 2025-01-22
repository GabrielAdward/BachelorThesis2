<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";

  // Variable to control the bar height (padding)
  export let barHeightMultiplier = 0.6; // Default value for the height adjustment

  let chartData = [];
  const margin = { top: 50, right: 400, bottom: 20, left: 100 }; // Left margin for alignment
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const fetchChartData = async () => {
    console.log("Fetching diverging bar data for:", { district, storeType, economicStat });
    try {
      const response = await fetch(
        `http://localhost:8080/diverging-bar-data?district=${district}&storeType=${storeType}&economicStat=${economicStat}`
      );
      const rawData = await response.json();

      const total = d3.sum(rawData, (d) => Math.abs(d.value));
      chartData = rawData.map((d) => ({
        label: d.label,
        value: d.value,
        relative: (d.value / total) * 100,
        formattedValue:
          Math.abs(d.value) >= 1e6
            ? `${(d.value / 1e6).toFixed(1)}M`
            : Math.abs(d.value) >= 1e3
            ? `${(d.value / 1e3).toFixed(1)}k`
            : d.value.toFixed(1),
      }));

      console.log("Processed chart data:", chartData);
      renderChart();
    } catch (error) {
      console.error("Error fetching diverging bar data:", error);
    }
  };

  const renderChart = () => {
    const svgContainer = d3.select("#diverging-bar-chart");
    svgContainer.selectAll("*").remove();

    const svg = svgContainer
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const maxRelative = d3.max(chartData, (d) => Math.abs(d.relative));
    const x = d3
      .scaleLinear()
      .domain([-maxRelative, maxRelative])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .range([0, height])
      .padding(barHeightMultiplier); // Adjust bar height dynamically

    svg.append("g")
      .attr("transform", `translate(0,0)`)
      .call(d3.axisTop(x).ticks(5).tickFormat((d) => `${d}%`))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("y2", height)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) => g.select(".domain").remove());

    svg.selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(Math.min(0, d.relative)))
      .attr("y", (d) => y(d.label))
      .attr("width", (d) => Math.abs(x(d.relative) - x(0)))
      .attr("height", y.bandwidth())
      .attr("fill", (d) => (d.relative < 0 ? "red" : "green"));

    svg.selectAll(".store-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("x", (d) =>
        d.relative < 0 ? x(Math.min(0, d.relative)) - 15 : x(Math.max(0, d.relative)) + 15
      )
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.relative < 0 ? "end" : "start"))
      .text((d) => d.label)
      .style("fill", "black")
      .style("font-size", "12px");

    svg.selectAll(".value-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("x", (d) => (d.relative < 0 ? x(d.relative) + 5 : x(d.relative) - 5))
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.relative < 0 ? "start" : "end"))
      .text((d) => d.formattedValue)
      .style("fill", "white")
      .style("font-size", "10px");

    svg.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4");
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
