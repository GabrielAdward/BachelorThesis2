<script>
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";
  export let variable = "typeOfStore";
  export let question = "";
  export let chartTitle = "";
  export let conclusion = ""; // this is binded by parent
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-4">Step 5: Final Visualization</h2>

  <input
    type="text"
    bind:value={chartTitle}
    class="w-full p-2 mt-1 border rounded"
    placeholder="Example: Revenue vs Profit"
  />

  <!-- Pie Chart -->
  <hr class="my-4" />
  <h3 class="text-md font-semibold mb-2">Pie Chart – Grouped by: 
    <span class="text-blue-600">{variable === 'typeOfStore' ? 'Store Category' : 'Store Size'}</span>
  </h3>
  <p class="text-sm text-gray-600 mb-4">District: {district}</p>
  <PieChart {district} {storeType} variable={variable} />

  <!-- Diverging Bar -->
  <hr class="my-6" />
  <h3 class="text-md font-semibold mb-2">Diverging Bar – Showing: 
    <span class="text-green-600">{economicStat}</span>
  </h3>
  <p class="text-sm text-gray-600 mb-4">District: {district} | Store Type: {storeType}</p>
  <DivergingBar {district} {storeType} {economicStat} />

<!-- Textarea for conclusion -->
<label class="block mt-6 text-left font-semibold">Write your conclusion:</label>
<textarea
  bind:value={conclusion}
  rows="4"
  class="w-full p-2 mt-1 border rounded"
  placeholder="Example: Stores with high revenue tend to have better solvency..."
></textarea>
  </div>

<style>
  .step-content {
    max-width: 1000px;
    margin: auto;
    text-align: center;
  }
</style>
