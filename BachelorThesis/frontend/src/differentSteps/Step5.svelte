<script>
    import PieChartUpd from '../components/charts/PieChartUpd.svelte';
  
    export let selectedAnalysisOption = "";
    export let districtCategories = [];
  </script>
  
  <div class="step-content">
    <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 5: View Result</h2>
    <PieChartUpd data={districtCategories} title={selectedAnalysisOption} />
  </div>
  