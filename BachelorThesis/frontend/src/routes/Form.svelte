<script>
 import PieChartUpd from '../components/charts/PieChartUpd.svelte';
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Define analysisOptions first
  const analysisOptions = [
    { label: "Type of Store", value: "Type" },
    { label: "Size of Store", value: "Size" },
    { label: "Revenue", value: "Revenue" },
    { label: "Yearly Result", value: "YearlyResult" },
    { label: "Result After Financial Net", value: "ResultAfterFinancialNet" },
    { label: "Total Assets", value: "TotalAssets" },
    { label: "Profit Margin", value: "ProfitMargin" },
    { label: "Solvency", value: "Solvency" },
    { label: "Cash Flow", value: "CashFlow" },
    { label: "Gross Profit Margin", value: "GrossProfitMargin" }
  ];

  // Now define selectedAnalysisOption, which relies on analysisOptions
  let selectedAnalysisOption = analysisOptions[0].value; // Default to the first option

  let currentStep = 1;
  let selectedOption = null;
  let question = "";
  let csvData = [];
  let filteredData = [];
  let districts = [];
  let selectedDistrict = "Show All";
  let fileUploaded = false;
  let errors = {};
  let fileName = '';
  let availableColumns = [];
  let selectedColumn = "District";
  let districtCategories = []; // Data for the pie chart

  const options = [
    { id: 1, title: "Diverging bars", imagePath: "/src/images/DivergBarChart.png" },
    { id: 2, title: "Pie chart", imagePath: "/src/images/PieChart.png" },
    { id: 3, title: "Diverging stacked bars", imagePath: "/src/images/DivSec.png" },
    { id: 4, title: "Pie chart update", imagePath: "/src/images/PieUpd.png" }
  ];

  // Continue with the rest of your functions and code
  const stepDescriptions = {
    1: "Please write your question for investigation in this step.",
    2: "Upload a CSV file that contains the relevant data or filter existing data.",
    3: "Select the tool you want to use to analyze the data.",
    4: "Choose the column of data to visualize.",
    5: "View the result of your data analysis."
  };

  const updateDistrictCategories = () => {
  if (selectedDistrict !== "Show All") {
    // Filter by selected district if not showing all
    filteredData = csvData.filter(row => row.District === selectedDistrict);
  } else {
    // Reset filteredData to all data if "Show All" is selected
    filteredData = csvData;
  }

  // Process based on selectedAnalysisOption
  if (selectedAnalysisOption === "Type") {
    const groupedData = d3.group(filteredData, d => d.Type);
    districtCategories = Array.from(groupedData, ([label, items]) => ({
      label,
      value: items.length
    }));
  } else if (selectedAnalysisOption === "Size") {
    const groupedData = d3.group(filteredData, d => d.Size);
    districtCategories = Array.from(groupedData, ([label, items]) => ({
      label,
      value: items.length
    }));
  } else {
    // For financial metrics like Revenue, Yearly Result, etc.
    districtCategories = [
      { label: "Positive", value: filteredData.filter(d => +d[selectedAnalysisOption] > 0).length },
      { label: "Negative", value: filteredData.filter(d => +d[selectedAnalysisOption] < 0).length },
      { label: "NaN", value: filteredData.filter(d => isNaN(+d[selectedAnalysisOption])).length }
    ];
  }
  console.log("District Categories:", districtCategories); // For debugging
};



const handleNextStep = () => {
    if (validateStep()) {
      currentStep += 1;
      if (currentStep === 5) {
        updateDistrictCategories();
        console.log("District categories updated for visualization:", districtCategories);
      }
    }
};


  const handlePrevStep = () => {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  };

  const validateStep = () => {
    errors = {};
    if (currentStep === 1 && !question) {
      errors.question = "Question is required!";
      return false;
    }
    if (currentStep === 2 && !fileUploaded && csvData.length === 0) {
      errors.file = "You need to upload a file!";
      return false;
    }
    return true;
  };

  const selectOption = (optionId) => {
    selectedOption = optionId;
  };

  const handleFileUpload = async (event) => {
  resetFileState();

  const file = event.target.files[0];
  fileName = file.name;

  if (!file || file.type !== "text/csv") {
    errors.file = "Please upload a valid CSV file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    parseCSV(text);
    filteredData = csvData; // Set filteredData after parsing
    fileUploaded = true;
    console.log("File uploaded and data parsed. Filtered data initialized.");
  };
  reader.readAsText(file);
};

const parseCSV = (data) => {
  const rows = d3.csvParse(data);
  csvData = rows.map(d => d);

  if (csvData.length > 0) {
    availableColumns = Object.keys(csvData[0]);
    districts = [...new Set(csvData.map(row => row.District))];
    filteredData = csvData;  // Initialize filteredData with all parsed data
  }
  console.log("Filtered Data:", filteredData); // For debugging
};






  const resetFileState = () => {
    fileName = '';
    csvData = [];
    filteredData = [];
    fileUploaded = false;
    districts = [];
    selectedDistrict = "Show All";
    availableColumns = [];
    selectedColumn = "District";
    selectedAnalysisOption = "Type";
    districtCategories = [];
  };
</script>


<!-- Main Form Section -->
<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
    <!-- Step Indicator -->
    <ul class="step-indicator flex justify-between mb-6 md:mb-10">
      {#each [1, 2, 3, 4, 5] as step}
        <li class={`flex-1 text-center p-2 border ${currentStep === step ? "bg-orange-500 text-white" : currentStep > step ? "bg-green-500 text-white" : "bg-gray-300"}`}>
          Step {step}
        </li>
      {/each}
    </ul>

    <!-- Steps Content -->
    {#if currentStep === 1}
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 1: Write a Question</h2>
        <input type="text" class="w-full p-2 border mb-4" placeholder="Enter your question here" bind:value={question} />
        {#if errors.question}
          <p class="text-red-500 text-sm">{errors.question}</p>
        {/if}
      </div>
    {/if}

    {#if currentStep === 2}
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 2: Upload CSV File</h2>
        {#if !fileUploaded}
          <input type="file" accept=".csv" on:change={handleFileUpload} />
          {#if errors.file}
            <p class="text-red-500 text-sm mt-2">{errors.file}</p>
          {/if}
        {/if}
      </div>
    {/if}

    {#if currentStep === 3}
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 3: Choose an Option</h2>
        <div class="options-grid">
          {#each options as option}
            <div class="option-container" on:click={() => selectOption(option.id)}>
              <div class={`option-box ${selectedOption === option.id ? "selected-option" : ""}`}>
                <img src={option.imagePath} alt="Option Image" class="option-image" />
                <p class="option-title">{option.title}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if currentStep === 4}
  <div class="step-content">
    <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: Select Data Column</h2>

    <!-- Fixed "District" dropdown -->
    <select disabled class="w-full p-2 border mb-4">
      <option value="District">District</option>
    </select>

    <!-- Add this dropdown for analysis options below -->
    <label>Select Analysis Option:</label>
    <select bind:value={selectedAnalysisOption} class="w-full p-2 border" on:change={updateDistrictCategories}>
      {#each analysisOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>

    {#if errors.column}
      <p class="text-red-500 text-sm mt-2">{errors.column}</p>
    {/if}
  </div>
{/if}

{#if currentStep === 5 && selectedOption === 4}
  <div class="step-content">
    <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 5: View Result</h2>

    {#if selectedAnalysisOption === "Type"}
      <PieChartUpd data={districtCategories} title="Store Types" />
    {:else if selectedAnalysisOption === "Size"}
      <PieChartUpd data={districtCategories} title="Store Sizes" />
    {:else if selectedAnalysisOption === "Revenue"}
      <PieChartUpd data={districtCategories} title="Revenue" />
    {:else if selectedAnalysisOption === "YearlyResult"}
      <PieChartUpd data={districtCategories} title="Yearly Result" />
    {:else if selectedAnalysisOption === "ResultAfterFinancialNet"}
      <PieChartUpd data={districtCategories} title="Result After Financial Net" />
    {:else if selectedAnalysisOption === "TotalAssets"}
      <PieChartUpd data={districtCategories} title="Total Assets" />
    {:else if selectedAnalysisOption === "ProfitMargin"}
      <PieChartUpd data={districtCategories} title="Profit Margin" />
    {:else if selectedAnalysisOption === "Solvency"}
      <PieChartUpd data={districtCategories} title="Solvency" />
    {:else if selectedAnalysisOption === "CashFlow"}
      <PieChartUpd data={districtCategories} title="Cash Flow" />
    {:else if selectedAnalysisOption === "GrossProfitMargin"}
      <PieChartUpd data={districtCategories} title="Gross Profit Margin" />
    {/if}
  </div>
{/if}




    <!-- Step Explanation -->
    <div class="step-explanation my-4 md:my-6">
      <p class="text-gray-700 text-center">{stepDescriptions[currentStep]}</p>
    </div>

    <!-- Step Navigation Buttons -->
    <div class="button-group mt-6 flex justify-end gap-3">
      {#if currentStep > 1}
        <button class="bg-gray-500 text-white py-2 px-4 rounded" on:click={handlePrevStep}>Back</button>
      {/if}
      {#if currentStep < 5}
        <button class="bg-blue-500 text-white py-2 px-4 rounded" on:click={handleNextStep}>Next</button>
      {/if}
    </div>
  </div>
</div>



<style>
  /* Full-screen centered form container with background */
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }
  .form-box {
    width: 100%;
    max-width: 800px;
    height: auto;
    background-color: #f0f4f8;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  h2 {
    font-size: 1.25rem;
  }
  .step-indicator {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    flex-wrap: wrap;
  }
  .step-explanation {
    margin-top: 20px;
  }
  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-items: center;
  }
  .option-container {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  .option-box {
    width: 220px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .selected-option {
    background-color: #e0f2ff;
    border-color: #007bff;
  }
  .option-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }
  .option-title {
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>
