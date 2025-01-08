<script>
    export let analysisOptions = [];
    export let selectedAnalysisOption = "";
    export let updateDistrictCategories;
  </script>
  
  <div class="step-content">
    <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Select Data Column</h2>
  
    <label>Select Analysis Option:</label>
    <select 
      bind:value={selectedAnalysisOption} 
      class="w-full p-2 border mb-4" 
      on:change={updateDistrictCategories}
    >
      {#each analysisOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
  