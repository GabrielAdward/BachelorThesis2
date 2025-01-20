<script>
  export let selectedOption = null;
  export let district = "All";
  export let variable = "typeOfStore";

  const variableOptions = [
    { label: "Type of Store", value: "typeOfStore" },
    { label: "Size of Store", value: "sizeOfStore" },
  ];

  console.log("Step 4: selectedOption is", selectedOption);
  console.log("Step 4 (initial): district =", district);
console.log("Step 4 (initial): variable =", variable);
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Configure and View Chart</h2>

  {#if selectedOption === 2}
    <!-- Pie Chart Configuration -->
    <div>

      <div class="mb-4">
        <label for="district" class="block mb-1 font-medium">Select District:</label>
        <select id="district" bind:value={district} class="w-full p-2 border">
          <option value="All">All</option>
          <option value="Oster">Oster</option>
          <option value="Vaster">Vaster</option>
          <option value="Ingen">Ingen</option> <!-- Replaced "null" with "Ingen" -->
        </select>
        
      </div>
      

      <!-- Variable Dropdown -->
      <div class="mb-4">
        <label for="variable" class="block mb-1 font-medium">Select Variable:</label>
        <select id="variable" bind:value={variable} class="w-full p-2 border">
          {#each variableOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>
  {:else}
    <!-- Message if Pie Chart is not selected -->
    <p class="text-gray-500 mt-4">
      Please select the <strong>Pie Chart</strong> tool in Step 3 to configure and view the chart.
    </p>
  {/if}
</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
