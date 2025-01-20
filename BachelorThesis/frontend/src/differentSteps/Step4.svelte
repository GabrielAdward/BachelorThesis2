<script>
  export let selectedOption = null;
  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";

  const economicStats = [
    { label: "Revenue", value: "revenue" },
    { label: "Profit Margin (%)", value: "profitMargin" },
    { label: "Solvency (%)", value: "solvency" },
  ];

  const storeTypes = ["All", "Clothes", "Book Store", "Medicin", "Art", "Laundry Store"];
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Configure Your Chart</h2>

  {#if selectedOption === 1}
    <!-- Diverging Bar Chart Configuration -->
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
          {#each storeTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>

      <div class="mb-4">
        <label for="economicStat" class="block mb-1 font-medium">Select Economic Statistic:</label>
        <select id="economicStat" bind:value={economicStat} class="w-full p-2 border">
          {#each economicStats as stat}
            <option value={stat.value}>{stat.label}</option>
          {/each}
        </select>
      </div>
    </div>
  {:else if selectedOption === 2}
    <!-- Pie Chart Configuration -->
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
    </div>
  {/if}
</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
