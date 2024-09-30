<script>
  import { onMount } from 'svelte';

  let currentStep = 1;
  let selectedOption = null;
  let question = "";
  let csvData = []; // Store CSV data
  let fileUploaded = false;
  let errors = {};
  let fileName = ''; // Track the uploaded file name

  // Short explanation for each step
  const stepDescriptions = {
    1: "Please write your question for investigation in this step.",
    2: "Upload a CSV file that contains the relevant data.",
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
    if (currentStep === 2 && !fileUploaded) {
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
    const file = event.target.files[0];
    fileName = file.name;

    if (!file || file.type !== "text/csv") {
      errors.file = "Please upload a valid CSV file.";
      return;
    }

    // Simulate a backend call
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      parseCSV(text); // Parse the CSV data
    };
    reader.readAsText(file);
  };

  // Function to parse CSV data
  const parseCSV = (data) => {
    const rows = data.split("\n").filter(row => row.length > 0);
    const keys = rows[0].split(",");
    const values = rows.slice(1).map(row => {
      const rowValues = row.split(",");
      let rowObj = {};
      keys.forEach((key, index) => {
        rowObj[key] = rowValues[index];
      });
      return rowObj;
    });
    csvData = values;
    fileUploaded = true;
  };

  // Cancel CSV upload
  const cancelFileUpload = () => {
    fileName = '';
    csvData = [];
    fileUploaded = false;
  };
</script>

<!-- Main Form Section -->
<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
    <!-- Step Indicator -->
    <ul class="step-indicator flex justify-between mb-6 md:mb-10">
      {#each [1, 2, 3, 4] as step}
        <li class={`flex-1 text-center p-2 border ${currentStep === step ? 'bg-orange-500 text-white' : currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
          Step {step}
        </li>
      {/each}
    </ul>

    <!-- Steps Content -->
    {#if currentStep === 1}
      <!-- Step 1: Enter Question -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 1: Write a Question</h2>
        <input type="text" class="w-full p-2 border mb-4" placeholder="Enter your question here" bind:value={question} />
        {#if errors.question}
          <p class="text-red-500 text-sm">{errors.question}</p>
        {/if}
      </div>
    {/if}

    {#if currentStep === 2}
      <!-- Step 2: Upload CSV File -->
      <div class="step-content">
        <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 2: Upload CSV File</h2>
        {#if !fileUploaded}
          <input type="file" accept=".csv" on:change={handleFileUpload} />
          {#if fileName}
            <p class="mt-4">Uploading: {fileName}</p>
          {/if}
          {#if errors.file}
            <p class="text-red-500 text-sm mt-2">{errors.file}</p>
          {/if}
        {/if}

        <!-- Show the table with uploaded data if file is uploaded -->
        {#if fileUploaded}
          <div class="table-container">
            <h3 class="mt-4 text-lg">Uploaded Data:</h3>
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
                  {#each csvData as row}
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

          <!-- Cancel Button to clear uploaded data -->
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
            <div class={`option-box p-4 border rounded cursor-pointer ${selectedOption === option ? 'bg-green-500 text-white' : 'bg-gray-300'}`} on:click={() => selectOption(option)}>
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
          Your selected option: {selectedOption || 'None selected'}
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
  padding: 20px; /* Added padding to ensure space on mobile */
}

/* Form box responsiveness */
.form-box {
  width: 100%; /* Full width on mobile */
  max-width: 800px; /* Limit max width on large screens */
  height: auto; /* Allow height to adjust automatically */
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
  flex-wrap: wrap; /* Wrap steps on smaller screens */
}

/* Explanation styling */
.step-explanation {
  margin-top: 20px;
}

/* Option box hover effect */
.option-box {
  flex: 1 1 45%; /* Allow two options per row on mobile */
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

/* New: Add scrollable table styling */
.table-container {
  max-height: 300px; /* Set max height for table container */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ddd; /* Add border around the table */
  margin-top: 20px; /* Add space between table and other elements */
}

.csv-table {
  width: 100%;
  border-collapse: collapse;
}

.csv-table th, .csv-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.csv-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* Cancel button for CSV upload */
.cancel-button {
  display: inline-block;
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #ff4c4c;
}

/* Adjust form padding on smaller screens */
@media (max-width: 640px) {
  .form-box {
    padding: 15px;
  }

  .option-box {
    flex: 1 1 100%; /* Full width option boxes on smaller screens */
  }

  .step-indicator {
    flex-direction: column; /* Stack the steps vertically on small screens */
  }
}

</style>
