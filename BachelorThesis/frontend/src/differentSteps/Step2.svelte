<script>
  import { onMount } from 'svelte';

  export let storeData = []; // Ensure this is passed from Form.svelte
  export let districts = [];
  export let selectedDistrict = "Show All";

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/'); // Use root route
      const data = await response.json();
      storeData = data; // Update storeData with fetched data

      // Extract unique districts for toggling
      if (!districts.length) {
        districts = ["Show All", ...new Set(data.map(item => item.district))];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on mount or when district changes
  $: if (selectedDistrict) {
    fetchData();
  }
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 2: Browse Data</h2>

  <!-- Toggle Options for Districts -->
  <div class="toggle-options flex gap-2 mb-4">
    {#each districts as district}
      <button
        class={`p-2 rounded ${
          selectedDistrict === district ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        on:click={() => (selectedDistrict = district)}
      >
        {district}
      </button>
    {/each}
  </div>

  <!-- Scrollable Data Table -->
  <div class="table-container">
    {#if storeData.length > 0}
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Store Name</th>
            <th class="border border-gray-300 p-2">District</th>
            <th class="border border-gray-300 p-2">Type</th>
            <th class="border border-gray-300 p-2">Size</th>
            <th class="border border-gray-300 p-2">Revenue</th>
            <th class="border border-gray-300 p-2">Yearly Result</th>
            <th class="border border-gray-300 p-2">Result After Financial Net</th>
            <th class="border border-gray-300 p-2">Total Assets</th>
            <th class="border border-gray-300 p-2">Profit Margin</th>
            <th class="border border-gray-300 p-2">Solvency</th>
            <th class="border border-gray-300 p-2">Cash Flow</th>
            <th class="border border-gray-300 p-2">Gross Profit Margin</th>
            <th class="border border-gray-300 p-2">Num Employees</th>
            <th class="border border-gray-300 p-2">Num Dept Stores</th>

          </tr>
        </thead>
        <tbody>
          {#each storeData.filter(row => selectedDistrict === "Show All" || row.district === selectedDistrict) as row}
            <tr>
              <td class="border border-gray-300 p-2">{row.storeName}</td>
              <td class="border border-gray-300 p-2">{row.district}</td>
              <td class="border border-gray-300 p-2">{row.typeOfStore}</td>
              <td class="border border-gray-300 p-2">{row.sizeOfStore}</td>
              <td class="border border-gray-300 p-2">{row.revenue}</td>
              <td class="border border-gray-300 p-2">{row.yearlyResult}</td>
              <td class="border border-gray-300 p-2">{row.resultAfterFinancialNet}</td>
              <td class="border border-gray-300 p-2">{row.totalAssets}</td>
              <td class="border border-gray-300 p-2">{row.profitMargin}</td>
              <td class="border border-gray-300 p-2">{row.solvency}</td>
              <td class="border border-gray-300 p-2">{row.cashFlow}</td>
              <td class="border border-gray-300 p-2">{row.grossProfitMargin}</td>
              <td class="border border-gray-300 p-2">{row.numEmployees}</td>
              <td class="border border-gray-300 p-2">{row.numDeptStores}</td>

            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="text-gray-500 mt-4">No data available for the selected district.</p>
    {/if}
  </div>
</div>

<style>
  .toggle-options button {
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .table-container {
    max-height: 500px; /* Adjust height as needed */
    overflow: auto; /* Enable scrolling */
    border: 1px solid #ddd; /* Optional: Add border for clarity */
    margin-top: 20px;
  }

  table {
    width: max-content; /* Allow table to scroll horizontally */
    border-collapse: collapse;
    margin: 0;
  }

  th,
  td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
</style>
