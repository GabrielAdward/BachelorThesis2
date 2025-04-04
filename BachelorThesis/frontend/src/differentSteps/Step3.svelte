<script>
  import PieChart from "../components/charts/PieChart.svelte";

  let district = "All";
  let variable = "typeOfStore"; // default pie chart variable

  const districts = [
    { label: "All", value: "All" },
    { label: "Oster", value: "Oster" },
    { label: "Vaster", value: "Vaster" },
    { label: "Ingen", value: "Ingen" },
    { label: "Tändsticksområdet", value: "Tändsticksområdet" },
    { label: "Atollen", value: "Atollen" },
    { label: "Resecentrum", value: "Resecentrum" }

  ];

  const pieOptions = [
    { label: "Store Category", value: "typeOfStore" },
    { label: "Store Size", value: "sizeOfStore" },
  ];
</script>


<div class="step-content">
  <h2 class="text-xl mb-2">Step 3: View Pie Chart</h2>
  <p class="text-gray-700 mb-4">Explore store types in selected districts.</p>

  <div class="controls flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
    <div>
      <label for="district" class="block font-medium text-center">Select District:</label>
      <select id="district" bind:value={district} class="dropdown">
        {#each districts as d}
          <option value={d.value}>{d.label}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="variable" class="block font-medium text-center">Group by:</label>
      <select id="variable" bind:value={variable} class="dropdown">
        {#each pieOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="chart-wrapper">
    <PieChart {district} {variable} />
  </div>
</div>


<style>
  .step-content {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  .form-controls {
    margin-bottom: 20px;
  }

  .dropdown {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }

  .chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
  }
</style>
