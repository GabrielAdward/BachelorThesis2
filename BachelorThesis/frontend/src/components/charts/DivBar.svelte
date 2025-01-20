<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
  
    export let district = "All";
    export let storeType = "All";
    export let economicStat = "revenue";
  
    let chartData = [];
    let margin = { top: 20, right: 30, bottom: 40, left: 100 };
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
  
    const fetchChartData = async () => {
      console.log("Fetching diverging bar data for:", { district, storeType, economicStat });
      try {
        const response = await fetch(
          `http://localhost:8080/diverging-bar-data?district=${district}&storeType=${storeType}&economicStat=${economicStat}`
        );
        const rawData = await response.json();
  
        // Transform the data into relative values
        const total = d3.sum(rawData, (d) => Math.abs(d.value));
        chartData = rawData.map((d) => ({
          label: d.label,
          value: d.value,
          relative: (d.value / total) * 100, // Calculate percentage
        }));
  
        console.log("Transformed chart data:", chartData);
        renderChart();
      } catch (error) {
        console.error("Error fetching diverging bar data:", error);
      }
    };
  
    const renderChart = () => {
      // Clear existing chart
      const svgContainer = d3.select("#diverging-bar-chart");
      svgContainer.selectAll("*").remove();
  
      const svg = svgContainer
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Scales
      const x = d3
        .scaleLinear()
        .domain([-100, 100]) // Relative percentages
        .range([0, width]);
      const y = d3
        .scaleBand()
        .domain(chartData.map((d) => d.label))
        .range([0, height])
        .padding(0.1);
  
      // Add bars
      svg
        .selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(Math.min(0, d.relative)))
        .attr("y", (d) => y(d.label))
        .attr("width", (d) => Math.abs(x(d.relative) - x(0)))
        .attr("height", y.bandwidth())
        .attr("fill", (d) => (d.relative < 0 ? "red" : "blue"));
  
      // Add labels
      svg
        .selectAll(".label")
        .data(chartData)
        .enter()
        .append("text")
        .attr("x", (d) => (d.relative < 0 ? x(d.relative) - 5 : x(d.relative) + 5))
        .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", (d) => (d.relative < 0 ? "end" : "start"))
        .text((d) => `${d.relative.toFixed(1)}%`)
        .style("fill", "black")
        .style("font-size", "12px");
  
      // Add axes
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat((d) => `${d}%`));
      svg.append("g").call(d3.axisLeft(y));
  
      // Add central axis line
      svg
        .append("line")
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
  