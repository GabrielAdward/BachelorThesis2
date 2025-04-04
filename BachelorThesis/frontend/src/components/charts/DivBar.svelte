<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";
  export let hideZero = false;
  export let barHeightMultiplier = 0.6;

  let chartData = [];
  let hasData = false;

  const margin = { top: 30, right: 60, bottom: 10, left: 100 };
  const width = 1000;
  let height = 0;

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/diverging-bar-data?district=${district}&storeType=${storeType}&economicStat=${economicStat}`
      );
      const rawData = await response.json();

      chartData = d3.sort(rawData, (a, b) => d3.ascending(a.value, b.value))
        .map(d => ({
          ...d,
          value: d.value ?? 0
        }));

      if (hideZero) {
        chartData = chartData.filter(d => d.value !== 0);
      }

      hasData = chartData.length > 0;
      renderChart();
    } catch (error) {
      console.error("Error fetching chart data:", error);
      chartData = [];
      hasData = false;
    }
  };

  const renderChart = () => {
    const svgContainer = d3.select("#diverging-bar-chart");
    svgContainer.selectAll("*").remove();

    if (!hasData) return;

    const barHeight = 25;
    height = Math.ceil((chartData.length + 0.1) * barHeight) + margin.top + margin.bottom;

    const x = d3.scaleLinear()
      .domain(d3.extent(chartData, d => d.value))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(chartData.map(d => d.label))
      .range([margin.top, height - margin.bottom])
      .padding(barHeightMultiplier);

    const format = d3.format("+.1f");

    const svg = svgContainer
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    svg.append("g")
      .selectAll("rect")
      .data(chartData)
      .join("rect")
      .attr("fill", d => d.value > 0 ? "green" : "red")
      .attr("x", d => x(Math.min(0, d.value)))
      .attr("y", d => y(d.label))
      .attr("width", d => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth());

    svg.append("g")
      .selectAll("text")
      .data(chartData)
      .join("text")
      .attr("text-anchor", d => d.value < 0 ? "end" : "start")
      .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
      .attr("y", d => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => format(d.value));

    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80))
      .call(g => g.selectAll(".tick line")
        .clone()
        .attr("y2", height - margin.top - margin.bottom)
        .attr("stroke-opacity", 0.1))
      .call(g => g.select(".domain").remove());

    svg.append("g")
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(6));
  };

  // Run on initial load
  onMount(fetchChartData);

  // Reactively run whenever filters change (including hideZero)
  $: if (district !== undefined && storeType !== undefined && economicStat !== undefined && hideZero !== undefined) {
    fetchChartData();
  }
</script>

{#if hasData}
  <svg id="diverging-bar-chart"></svg>
{:else}
  <p class="no-data">No data available for this combination.</p>
{/if}

<style>
  #diverging-bar-chart {
    width: 100%;
    height: auto;
  }

  .no-data {
    text-align: center;
    font-size: 1rem;
    margin-top: 30px;
    color: #777;
    font-style: italic;
  }
</style>
