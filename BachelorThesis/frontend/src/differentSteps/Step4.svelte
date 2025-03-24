<script>
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let economicStat = "revenue";
  export let storeType = "All";

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

  const storeTypes = [
    "All", "Clothes", "Book Store", "Laundry Store", "Art", "Medicin"
  ];
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: View Diverging Bar Chart</h2>
  <p class="text-center text-gray-700 mb-4">Analyze economic metrics by district and store type.</p>

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
      <label for="storeType" class="block font-medium text-center">Select Store Type:</label>
      <select id="storeType" bind:value={storeType} class="dropdown">
        {#each storeTypes as type}
          <option value={type}>{type}</option>
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

  <DivergingBar {district} {storeType} {economicStat} />
</div>

<style>
  .step-content {
    width: 100%;
    max-width: 900px;
    margin: auto;
    text-align: center;
  }

  .selection-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .dropdown {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 200px;
  }
</style>
