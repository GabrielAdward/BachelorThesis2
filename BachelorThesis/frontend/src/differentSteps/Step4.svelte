<script>
  import { onMount } from "svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let district = "All";
  export let economicStat = "revenue";
  export let storeType = "All";
  let hideZero = false;

  let storeTypes = [{ type: "All", count: 0 }];

  const districts = [
    { label: "All", value: "All" },
    { label: "Oster", value: "Oster" },
    { label: "Vaster", value: "Vaster" },
    { label: "Ingen", value: "Ingen" },
    { label: "Tändsticksområdet", value: "Tändsticksområdet" },
    { label: "Atollen", value: "Atollen" },
    { label: "Resecentrum", value: "Resecentrum" }
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
    { label: "Num Dept Stores", value: "numDeptStores" }
  ];

  const fetchStoreTypes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/store-types?district=${district}`);
      const data = await response.json();

      // Add "All" as first option
      storeTypes = [{ type: "All", count: 0 }, ...data];

      // Reset storeType if current one doesn't exist in filtered list
      const validTypes = storeTypes.map(t => t.type);
      if (!validTypes.includes(storeType)) {
        storeType = "All";
      }
    } catch (err) {
      console.error("Failed to fetch store types:", err);
    }
  };

  onMount(fetchStoreTypes);

  // Reactive: refetch types when district changes
  $: if (district !== undefined) {
    fetchStoreTypes();
  }
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
        {#each storeTypes as t}
          <option value={t.type}>
            {t.type === "All" ? "All" : `${t.type} (${t.count})`}
          </option>
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

  <div class="toggle-container mb-4">
    <label class="flex items-center justify-center gap-2 text-sm text-gray-700">
      <input type="checkbox" bind:checked={hideZero} />
      Hide stores with value 0
    </label>
  </div>

  <DivergingBar {district} {storeType} {economicStat} {hideZero} />
</div>

<style>
  .step-content {
    width: 100%;
    max-width: 1000px;
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
    width: 220px;
  }

  .toggle-container input {
    transform: scale(1.2);
    margin-right: 6px;
  }
</style>
