<script>
    import { onMount } from "svelte";
    import PieChart from "../components/charts/PieChart.svelte";
    import DivergingBar from "../components/charts/DivBar.svelte";
  
    let savedCharts = [];
    let selectedChart = null;
    let config = {};
    let showModal = false;
  
    onMount(async () => {
      const res = await fetch("http://localhost:8080/saved-charts");
      savedCharts = await res.json();
    });
  
    const loadChart = async (id) => {
      const res = await fetch(`http://localhost:8080/chart/${id}`);
      selectedChart = await res.json();
  
      try {
        config = JSON.parse(selectedChart.columnsUsed || "{}");
      } catch (e) {
        config = {};
      }
  
      showModal = true;
    };
  
    const closeModal = () => {
      showModal = false;
      selectedChart = null;
      config = {};
    };
  </script>
  
  <h2 class="text-xl mb-4 text-white">Saved Chart Attempts</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each savedCharts as chart}
      <div
        class="p-4 border rounded shadow cursor-pointer bg-white"
        on:click={() => loadChart(chart.id)}
      >
        <h3 class="font-bold">Chart #{chart.id}</h3>
        <p><strong>Type:</strong> {chart.chartType}</p>
        <p><strong>Date:</strong> {new Date(chart.createdAt).toLocaleString()}</p>
      </div>
    {/each}
  </div>
  
  <!-- Modal -->
  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-5xl p-6 rounded shadow-lg relative overflow-y-auto max-h-[90vh] text-black">
        <!-- Close Button -->
        <button class="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-red-600" on:click={closeModal}>
          &times;
        </button>
  
        <!-- Chart Content -->
        <h3 class="text-lg font-bold mb-2">Chart #{selectedChart.id}</h3>
        <p class="mb-2"><strong>Title:</strong> {selectedChart.title || "Untitled"}</p>
        <p class="mb-4">District: {config.district} | Store Type: {config.storeType || "All"} | Economic Variable: {config.economicStat}</p>
  
        <!-- Pie Chart -->
        <div class="bg-white p-4 rounded shadow mb-6">
          <h4 class="text-md font-semibold mb-2 text-center">
            Pie Chart – Grouped by:
            <span class="text-blue-600">{config.variable === 'typeOfStore' ? 'Store Category' : 'Store Size'}</span>
          </h4>
          <PieChart district={config.district} variable={config.variable} />
        </div>
  
        <!-- Diverging Bar Chart -->
        <div class="bg-white p-4 rounded shadow mb-6">
          <h4 class="text-md font-semibold mb-2 text-center">
            Diverging Bar – Showing:
            <span class="text-green-600">{config.economicStat}</span>
          </h4>
          <DivergingBar district={config.district} storeType={config.storeType || "All"} economicStat={config.economicStat} />
        </div>
  
        <!-- Conclusion -->
        <div class="bg-white p-4 rounded shadow">
          <h4 class="text-md font-semibold mb-2">Conclusion</h4>
          <p class="mb-2"><strong>Conclusion:</strong> {selectedChart.conclusion || "No conclusion provided."}</p>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    h2 {
      color: white;
    }
  </style>
  