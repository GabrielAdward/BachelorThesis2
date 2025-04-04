<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";

  export let district = "All";
  export let variable = "typeOfStore";

  let chartData = [];
  let colorScale;
  let hoveredLabel = null;

  let prevDistrict, prevVariable;

  const fetchChartData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chart-data?district=${district}&variable=${variable}`);
      chartData = await response.json();

      const allLabels = chartData.map(d => d.label);
      const colorPalette = [
        ...d3.schemeTableau10,
        ...d3.schemeSet3,
        ...d3.schemeSet2,
        ...d3.schemePaired
      ].flat();

      colorScale = d3.scaleOrdinal()
        .domain(allLabels)
        .range(colorPalette.slice(0, allLabels.length)); // cut to size

      renderChart();
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const renderChart = () => {
    const width = 500;
    const height = 500;
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
    const arcHover = d3.arc().innerRadius(0).outerRadius(radius + 10);

    const arcs = svg.selectAll("g")
      .data(dataReady)
      .enter()
      .append("g")
      .attr("class", "slice");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => colorScale(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.9)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover);
        hoveredLabel = d.data.label;
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc);
        hoveredLabel = null;
      });
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

<div class="chart-with-legend">
  <svg id="pie-chart"></svg>

  <div class="legend">
    {#each chartData as d}
      <div
        class="legend-item {hoveredLabel === d.label ? 'highlighted' : ''}"
        on:mouseover={() => (hoveredLabel = d.label)}
        on:mouseout={() => (hoveredLabel = null)}
      >
        <span class="color-box" style="background-color: {colorScale(d.label)};"></span>
        <span>{d.label} ({d.value})</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .chart-with-legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 20px;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 1000px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
    border: 1px solid transparent;
  }

  .legend-item.highlighted {
    background-color: #f5f5f5;
    border-color: #ccc;
    font-weight: bold;
  }

  .color-box {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    border-radius: 3px;
  }

  svg {
    display: block;
  }
</style>
