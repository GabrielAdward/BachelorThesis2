<script>
  import PieChart from "../components/charts/PieChart.svelte";

  let district = "All";

  const districts = [
    { label: "All", value: "All" },
    { label: "Oster", value: "Oster" },
    { label: "Vaster", value: "Vaster" },
    { label: "Ingen", value: "Ingen" },
  ];
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 3: View Pie Chart</h2>
  <p class="text-gray-700 mb-4">Explore store types in selected districts.</p>

  <label for="district" class="block font-medium text-center">Select District:</label>
  <select id="district" bind:value={district} class="dropdown mb-4">
    {#each districts as d}
      <option value={d.value}>{d.label}</option>
    {/each}
  </select>

  <PieChart {district} variable="typeOfStore" />
</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .dropdown {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
  }
</style>
