<script>
  export let selectedOption = null;
  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";

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
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Configure and View Chart</h2>

  {#if selectedOption === 1}
    <!-- Diverging Bar Configuration -->
    <div>
      <div class="mb-4">
        <label for="district" class="block mb-1 font-medium">Select District:</label>
        <select id="district" bind:value={district} class="w-full p-2 border">
          <option value="All">All</option>
          <option value="Oster">Oster</option>
          <option value="Vaster">Vaster</option>
          <option value="Ingen">Ingen</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="storeType" class="block mb-1 font-medium">Select Store Type:</label>
        <select id="storeType" bind:value={storeType} class="w-full p-2 border">
          <option value="All">All</option>
          <option value="Clothes">Clothes</option>
          <option value="Book Store">Book Store</option>
          <option value="Medicin">Medicin</option>
          <!-- Add more store types as needed -->
        </select>
      </div>

      <div class="mb-4">
        <label for="economicStat" class="block mb-1 font-medium">Select Economic Variable:</label>
        <select id="economicStat" bind:value={economicStat} class="w-full p-2 border">
          {#each economicOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>
  {:else}
    <p class="text-gray-500 mt-4">
      Please select the <strong>Diverging Bar</strong> tool in Step 3 to configure and view the chart.
    </p>
  {/if}
</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
