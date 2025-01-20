<script>
  export let selectedOption = null;

  const tools = [
    {
      id: 1,
      title: "Diverging Bars",
      description: "A tool to compare economic statistics across stores using diverging bar charts.",
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

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 3: Choose Your Analysis Tool</h2>
  <p class="text-gray-700 mb-6">Please select the tool you'd like to use for data visualization.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each tools as tool}
      <div
        class={`tool-box p-4 rounded-md shadow-md border cursor-pointer ${
          selectedOption === tool.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        on:click={() => selectTool(tool.id)}
      >
        <img src={tool.image} alt={tool.title} class="w-full h-32 object-cover rounded-md mb-4" />
        <h3 class="text-md font-bold mb-2">{tool.title}</h3>
        <p class="text-sm text-gray-600">{tool.description}</p>
      </div>
    {/each}
  </div>

  {#if selectedOption}
    <div class="selected-info mt-6 p-4 border border-blue-300 bg-blue-50 rounded-md">
      <h3 class="text-md font-bold">Selected Tool:</h3>
      <p>{tools.find((tool) => tool.id === selectedOption).title}</p>
    </div>
  {/if}
</div>

<style>
  .tool-box {
    transition: all 0.3s ease;
  }
  .tool-box:hover {
    border-color: #2563eb;
    background-color: #f0f9ff;
  }
  .tool-box img {
    transition: transform 0.3s ease;
  }
  .tool-box:hover img {
    transform: scale(1.05);
  }
</style>
