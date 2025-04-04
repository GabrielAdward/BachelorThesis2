<script>
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";
  export let pieVariable = "typeOfStore";
  export let question = "";

  let conclusion = "";
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-4">Step 5: Final Visualization</h2>

  <div class="summary-info mb-6">
    <p><strong>Question:</strong> {question}</p>
  </div>

  <div class="chart-section mb-6 border-b pb-6">
    <h3 class="text-md font-semibold mb-2">Pie Chart</h3>
    <p class="text-sm text-gray-600 mb-2">District: {district} | Group by: {pieVariable}</p>
    <PieChart {district} variable={pieVariable} />
  </div>

  <div class="chart-section mb-6 border-b pb-6">
    <h3 class="text-md font-semibold mb-2">Diverging Bar Chart</h3>
    <p class="text-sm text-gray-600 mb-2">District: {district} | Store Type: {storeType} | Variable: {economicStat}</p>
    <DivergingBar {district} {storeType} {economicStat} />
  </div>

  <div class="conclusion-section">
    <h3 class="text-md font-semibold mb-2">Conclusion</h3>
    <textarea bind:value={conclusion} placeholder="Write your conclusion here..." rows="5" class="conclusion-box"></textarea>
  </div>

  <div class="button-group mt-6 flex justify-end gap-3">
    <button class="bg-gray-500 text-white py-2 px-4 rounded" on:click={() => dispatch("back")}>Back</button>
    <button class="bg-yellow-500 text-white py-2 px-4 rounded" on:click={() => dispatch("loop", { district, storeType, economicStat, pieVariable, conclusion, question })}>Loop</button>
    <button class="bg-green-600 text-white py-2 px-4 rounded">Save</button>
  </div>
</div>

<style>
  .step-content {
    max-width: 1000px;
    margin: auto;
    text-align: center;
  }

  .chart-section {
    margin-bottom: 30px;
  }

  .conclusion-box {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
    font-size: 14px;
  }
</style>
