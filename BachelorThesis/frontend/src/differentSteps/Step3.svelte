<script>
  export let selectedOption = null; // Holds the ID of the selected option
  const tools = [
    {
      id: 1,
      title: "Diverging Bars",
      description: "A tool to compare multiple categories with diverging bar charts.",
      image: "/src/images/DivergBarChart.png",
    },
    {
      id: 2,
      title: "Pie Chart",
      description: "A tool to visualize data distribution using a pie chart.",
      image: "/src/images/PieChart.png",
    },
  ];

  const selectTool = (toolId) => {
    selectedOption = toolId;
    console.log("Step 3: selectedOption updated to", selectedOption);
  };
</script>

<!-- Step 3 UI -->
<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 3: Choose Your Analysis Tool</h2>
  <p class="text-gray-700 mb-6">
    Please select the tool you'd like to use for data visualization. Click on the tool below to learn more and proceed.
  </p>

  <!-- Tools Grid -->
  <div>
    {#each tools as tool}
      <div on:click={() => selectTool(tool.id)}>
        {tool.title}
      </div>
    {/each}
  </div>

  <!-- Selected Tool Info -->
  {#if selectedOption}
    <div class="selected-info mt-6 p-4 border border-blue-300 bg-blue-50 rounded-md">
      <h3 class="text-md font-bold">Selected Tool:</h3>
      <p>{tools.find((tool) => tool.id === selectedOption).title}</p>
    </div>
  {/if}
</div>


<style>
  .tool-container {
    transition: all 0.3s ease;
  }
  .tool-container:not(.selected-tool):hover {
    border-color: #d1d5db; /* Light gray hover border for non-selected tools */
  }
  .selected-tool {
    border-color: #2563eb; /* Blue border for selected tool */
    background-color: #eff6ff; /* Light blue background for selected tool */
  }
  .selected-info {
    background-color: #f0f9ff; /* Light blue info box */
  }
</style>
