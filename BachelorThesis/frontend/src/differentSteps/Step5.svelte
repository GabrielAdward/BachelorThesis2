<script>
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let selectedOption = null;
  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 5: View Chart</h2>

  {#if selectedOption === 1}
  <DivergingBar {district} {storeType} {economicStat} barHeightMultiplier={0.6} />
  {:else if selectedOption === 2}
    <PieChart {district} variable="typeOfStore" />
  {/if}
</div>

<style>
  .step-content {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
