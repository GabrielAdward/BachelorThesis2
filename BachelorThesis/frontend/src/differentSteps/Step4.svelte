<script>
  import { onMount, tick } from "svelte";
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let economicStat = "revenue";

  let toolStep = 1; // Track which tool is being displayed

  const districts = [
    { label: "All", value: "All" },
    { label: "Oster", value: "Oster" },
    { label: "Vaster", value: "Vaster" },
    { label: "Ingen", value: "Ingen" },
  ];

  const economicOptions = [
    { label: "Revenue", value: "revenue" },
    { label: "Yearly Result", value: "yearlyResult" },
    { label: "Result After Financial Net", value: "resultAfterFinancialNet" },
    { label: "Total Assets", value: "totalAssets" },
    { label: "Profit Margin", value: "profitMargin" },
    { label: "Solvency", value: "solvency" },
    { label: "Cash Flow", value: "cashFlow" },
    { label: "Gross Profit Margin", value: "grossProfitMargin" },
    { label: "Num Employees", value: "numEmployees" },
    { label: "Num Dept Stores", value: "numDeptStores" },
  ];

  // Navigate between the tools
  const handleNext = async () => {
    if (toolStep < 2) {
      toolStep++;
      await tick(); // Ensure UI updates before fetching
    }
  };

  const handlePrev = async () => {
    if (toolStep > 1) {
      toolStep--;
      await tick(); // Ensure UI updates before fetching
    }
  };
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Configure and View Charts</h2>
  <p class="text-center text-gray-700 mb-4">Tool {toolStep} / 2</p>

  <!-- PIE CHART -->
  {#if toolStep === 1}
    <div class="chart-container">
      <h3 class="font-bold text-center">Pie Chart</h3>
      <label for="district" class="block font-medium text-center">Select District:</label>
      <select id="district" bind:value={district} class="dropdown">
        {#each districts as d}
          <option value={d.value}>{d.label}</option>
        {/each}
      </select>
      <PieChart {district} variable="typeOfStore" />
    </div>
  {/if}

  <!-- DIVERGING BAR CHART -->
  {#if toolStep === 2}
    <div class="chart-container">
      <h3 class="font-bold text-center">Diverging Bar Chart</h3>

      <div class="selection-container">
        <div>
          <label for="district" class="block font-medium text-center">Select District:</label>
          <select id="district" bind:value={district} class="dropdown">
            {#each districts as d}
              <option value={d.value}>{d.label}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="economicStat" class="block font-medium text-center">Select Economic Variable:</label>
          <select id="economicStat" bind:value={economicStat} class="dropdown">
            {#each economicOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <DivergingBar {district} {economicStat} />
    </div>
  {/if}

  <!-- Navigation -->
  <div class="button-group">
    {#if toolStep > 1}
      <button class="button back" on:click={handlePrev}>Back</button>
    {/if}
    {#if toolStep < 2}
      <button class="button next" on:click={handleNext}>Next</button>
    {/if}
  </div>
</div>

<style>
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: auto;
  }

  .selection-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .dropdown {
    width: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin: 0 10px;
  }

  .back {
    background-color: gray;
    color: white;
  }

  .next {
    background-color: blue;
    color: white;
  }
</style>
