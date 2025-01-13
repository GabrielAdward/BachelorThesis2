<script>
  import PieChart from "../components/charts/PieChart.svelte"; // Path to PieChart.svelte

  export let district = "All"; // Passed from Step 4
  export let variable = "typeOfStore"; // Passed from Step 4
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 5: View Pie Chart</h2>

  <!-- Render Pie Chart Component -->
  <PieChart {district} {variable} />

</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
