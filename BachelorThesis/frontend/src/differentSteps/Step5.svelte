<script>
  import PieChart from "../components/charts/PieChart.svelte";
  import DivergingBar from "../components/charts/DivBar.svelte";

  export let question = "";
  export let district = "All";
  export let storeType = "All";
  export let economicStat = "revenue";
  export let pieVariable = "typeOfStore";

  const pieLabels = {
    typeOfStore: "Store Category",
    sizeOfStore: "Store Size"
  };

  const economicLabels = {
    revenue: "Revenue",
    yearlyResult: "Yearly Result",
    resultAfterFinancialNet: "Result After Financial Net",
    totalAssets: "Total Assets",
    profitMargin: "Profit Margin",
    solvency: "Solvency",
    cashFlow: "Cash Flow",
    grossProfitMargin: "Gross Profit Margin",
    numEmployees: "Number of Employees",
    numDeptStores: "Number of Department Stores"
  };
</script>

<div class="step-content">
  <h2 class="text-lg md:text-xl mb-4">Step 5: Final Visualization</h2>

  <p class="italic text-gray-600 mb-6">
    <strong>Your Question:</strong> {question}
  </p>

  <!-- Pie Chart Section -->
  <div class="chart-section">
    <h3 class="text-md font-semibold mb-2">
      Pie Chart – Grouped by: <span class="text-blue-600">{pieLabels[pieVariable]}</span>
    </h3>
    <p class="text-sm text-gray-500 mb-3">
      District: <strong>{district}</strong>
    </p>
    <PieChart {district} variable={pieVariable} />
  </div>

  <!-- Diverging Bar Chart Section -->
  <div class="chart-section mt-6">
    <h3 class="text-md font-semibold mb-2">
      Diverging Bar – Showing: <span class="text-green-600">{economicLabels[economicStat]}</span>
    </h3>
    <p class="text-sm text-gray-500 mb-3">
      District: <strong>{district}</strong> | Store Type: <strong>{storeType}</strong>
    </p>
    <DivergingBar {district} {storeType} {economicStat} />
  </div>
</div>

<style>
  .step-content {
    max-width: 1000px;
    margin: auto;
    text-align: center;
  }

  .chart-section {
    margin-bottom: 30px;
  }

  h3 span {
    font-weight: 600;
  }

  p {
    margin-bottom: 0.5rem;
  }
</style>
