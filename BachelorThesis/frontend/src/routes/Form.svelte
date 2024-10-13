<script>
  import { onMount } from 'svelte';

  let currentStep = 1;
  let selectedOption = null;
  let question = "";
  let csvData = []; // Store CSV data
  let filteredData = []; // Data filtered based on selected district
  let districts = []; // Store unique district names
  let selectedDistrict = "Show All"; // Default selected district
  let fileUploaded = false;
  let errors = {};
  let fileName = ''; // Track the uploaded file name

  // Short explanation for each step
  const stepDescriptions = {
    1: "Please write your question for investigation in this step.",
    2: "Upload a CSV file that contains the relevant data or filter existing data.",
    3: "Select the tool you want to use to analyze the data.",
    4: "View the result of your data analysis."
  };

  const handleNextStep = () => {
    if (validateStep()) {
      currentStep += 1;
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

  const selectOption = (option) => {
    selectedOption = option;
  };

  // Handle CSV File Upload
  const handleFileUpload = async (event) => {
    resetFileState(); // Clear previous file data

    const file = event.target.files[0];
    fileName = file.name;

    if (!file || file.type !== "text/csv") {
      errors.file = "Please upload a valid CSV file.";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      parseCSV(text); // Parse the CSV data
      updateFilteredData();
      fileUploaded = true;
    };
    reader.readAsText(file);
  };

  // Function to parse CSV data
  const parseCSV = (data) => {
    const rows = data.split("\n").filter((row) => row.length > 0);
    const keys = rows[0].split(",");
    const values = rows.slice(1).map((row) => {
      const rowValues = row.split(",");
      let rowObj = {};
      keys.forEach((key, index) => {
        rowObj[key.trim()] = rowValues[index]?.trim(); // Trim values to avoid leading/trailing spaces
      });
      return rowObj;
    });
    csvData = values;

    // Extract unique districts (excluding any empty or "Null" values)
    if (fileName === "Test.csv") {
      districts = [...new Set(csvData.map((row) => row.District).filter(district => district && district.toLowerCase() !== "null"))];
    } else {
      districts = []; // If the file name is not "Test.csv", do not display the buttons
    }
  };

  // Update the filtered data based on selected district
  const updateFilteredData = () => {
    if (selectedDistrict === "Show All") {
      filteredData = csvData;
    } else {
      filteredData = csvData.filter((row) => row.District === selectedDistrict);
    }
  };

  // Function to handle district selection
  const selectDistrict = (district) => {
    selectedDistrict = district;
    updateFilteredData();
  };

  // Reset the file state
  const resetFileState = () => {
    fileName = '';
    csvData = [];
    filteredData = [];
    fileUploaded = false;
    districts = [];
    selectedDistrict = "Show All"; // Reset the selected district to "Show All"
  };

  // Cancel CSV upload
  const cancelFileUpload = () => {
    resetFileState();
  };
</script>

<!-- Main Form Section -->
<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
    <!-- Step Indicator -->
    <ul class="step-indicator flex justify-between mb-6 md:mb-10">
      {#each [1, 2, 3, 4] as step}
        <li
          class={`flex-1 text-center p-2 border ${
            currentStep === step
              ? "bg-orange-500 text-white"
              : currentStep > step
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Step {step}
        </li>
      {/each}
    </ul>

    <!-- Steps Content -->
    {#if currentStep === 1}
      <!-- Step 1: Enter Question -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 1: Write a Question</h2>
        <input
          type="text"
          class="w-full p-2 border mb-4"
          placeholder="Enter your question here"
          bind:value={question}
        />
        {#if errors.question}
          <p class="text-red-500 text-sm">{errors.question}</p>
        {/if}
      </div>
    {/if}

    {#if currentStep === 2}
      <!-- Step 2: View and Filter CSV Data -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 2: Uploaded CSV File</h2>

        <!-- File Upload Input -->
        {#if !fileUploaded}
          <input type="file" accept=".csv" on:change={handleFileUpload} />
          {#if fileName}
            <p class="mt-4">Uploading: {fileName}</p>
          {/if}
          {#if errors.file}
            <p class="text-red-500 text-sm mt-2">{errors.file}</p>
          {/if}
        {/if}

        <!-- District Selection Buttons -->
        {#if fileUploaded && fileName === "Test.csv"}
          <div class="district-buttons flex flex-wrap gap-2 mt-4">
            <button
              class={`district-button ${
                selectedDistrict === "Show All"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } p-2 rounded transition-colors duration-300`}
              on:click={() => selectDistrict("Show All")}
            >
              Show All
            </button>
            {#each districts as district}
              <button
                class={`district-button ${
                  selectedDistrict === district
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } p-2 rounded transition-colors duration-300`}
                on:click={() => selectDistrict(district)}
              >
                {district}
              </button>
            {/each}
          </div>
        {/if}

        <!-- Show the table with uploaded data -->
        {#if fileUploaded}
          <div class="table-container">
            <div class="scrollable-table">
              <table class="csv-table">
                <thead>
                  <tr>
                    {#each Object.keys(csvData[0]) as key}
                      <th>{key}</th>
                    {/each}
                  </tr>
                </thead>
                <tbody>
                  {#each filteredData as row}
                    <tr>
                      {#each Object.values(row) as value}
                        <td>{value}</td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}

        <!-- Cancel Button to clear uploaded data -->
        {#if fileUploaded}
          <button class="cancel-button bg-red-500 text-white py-2 px-4 rounded mt-4" on:click={cancelFileUpload}>
            Cancel Upload
          </button>
        {/if}
      </div>
    {/if}

    {#if currentStep === 3}
      <!-- Step 3: Select an Option -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 3: Choose an Option</h2>
        <div class="flex flex-wrap gap-2 md:gap-4">
          {#each [1, 2, 3, 4] as option}
            <div
              class={`option-box p-4 border rounded cursor-pointer ${
                selectedOption === option ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              on:click={() => selectOption(option)}
            >
              Option {option}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if currentStep === 4}
      <!-- Step 4: Display Result -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 4: The result is displayed!</h2>
        <div class="result-box p-4 border rounded">
          Your selected option: {selectedOption || "None selected"}
        </div>
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
      {#if currentStep < 4}
        <button class="bg-blue-500 text-white py-2 px-4 rounded" on:click={handleNextStep}>Next</button>
      {/if}
      {#if currentStep === 4}
        <button class="bg-green-500 text-white py-2 px-4 rounded">Finish</button>
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

  /* Form box responsiveness */
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

  /* Responsive typography */
  h2 {
    font-size: 1.25rem;
  }

  /* Step indicator styling */
  .step-indicator {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    flex-wrap: wrap;
  }

  /* Explanation styling */
  .step-explanation {
    margin-top: 20px;
  }

  /* Option box hover effect */
  .option-box {
    flex: 1 1 45%;
  }
  .option-box:hover {
    transform: scale(1.05);
  }

  /* Result box styling */
  .result-box {
    font-size: 1.25rem;
    font-weight: bold;
  }

  /* Right-aligned buttons */
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  /* Add scrollable table styling */
  .table-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    margin-top: 20px;
  }

  .csv-table {
    width: 100%;
    border-collapse: collapse;
  }

  .csv-table th,
  .csv-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .csv-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  /* District buttons styling */
  .district-buttons {
    margin-bottom: 15px;
  }

  .district-button {
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .district-button:hover {
    background-color: #2c7edb;
    color: white;
  }

  @media (max-width: 640px) {
    .form-box {
      padding: 15px;
    }

    .option-box {
      flex: 1 1 100%;
    }

    .step-indicator {
      flex-direction: column;
    }
  }
</style>
