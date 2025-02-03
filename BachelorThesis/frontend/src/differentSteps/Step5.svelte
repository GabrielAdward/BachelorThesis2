<script>
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let economicStat = "revenue";
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 5: View Charts</h2>

  <div class="charts-container">
    <div class="chart-box">
      <h3 class="font-bold text-center">Pie Chart</h3>
      <PieChart {district} variable="typeOfStore" />
    </div>

    <div class="chart-box">
      <h3 class="font-bold text-center">Diverging Bar Chart</h3>
      <DivergingBar {district} {economicStat} />
    </div>
  </div>
</div>

<style>
  .charts-container {
    display: flex;
    justify-content: center;
    gap: 40px;
    width: 100%;
  }

  .chart-box {
    width: 45%;
  }
</style>
