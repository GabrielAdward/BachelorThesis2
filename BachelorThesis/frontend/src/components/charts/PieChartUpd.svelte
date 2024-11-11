<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let data = [];
  export let title = ""; 

  const drawPieChart = () => {
    if (data.length === 0) {
      console.warn("No data to display in the pie chart.");
      return;
    }

    const width = 500;
    const height = 400;
    const outerRadius = Math.min(width, height) / 2 - 10;
    const innerRadius = outerRadius * 0.5;
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const svg = d3.select("#pie-chart")
      .html("") // Clear any existing chart
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    svg.selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.label}: ${d.data.value}`);
  };

  onMount(drawPieChart);

  $: if (data.length > 0) drawPieChart(); // Redraw when data has items
</script>

<div id="pie-chart">
  <h3 class="chart-title">{title}</h3>
  {#if data.length > 0}
    <!-- Pie chart rendering code here -->
  {:else}
    <p>No data to display in the pie chart.</p>
  {/if}
</div>



<style>
  #pie-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    text-align: center;
  }
  .chart-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }
</style>
