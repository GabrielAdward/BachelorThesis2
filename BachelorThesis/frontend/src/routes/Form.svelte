<script>
  import Step1 from "../differentSteps/Step1.svelte";
  import Step2 from "../differentSteps/Step2.svelte";
  import Step3 from "../differentSteps/Step3.svelte";
  import Step4 from "../differentSteps/Step4.svelte";
  import Step5 from "../differentSteps/Step5.svelte";

  let currentStep = 1; // Controls which step is displayed

  // Shared data
  let question = ""; // Question input for Step 1
  let storeData = []; // Initialize storeData (was missing before)
  let districts = [];
  let selectedDistrict = "Show All";
  let selectedOption = null; // Selected tool from Step 3
  let district = "All"; // Default district for Step 4
  let variable = "typeOfStore"; // Default variable for Step 4
  let analysisOptions = [
    { label: "Type of Store", value: "Type" },
    { label: "Size of Store", value: "Size" },
    { label: "Revenue", value: "Revenue" },
  ];
  let selectedAnalysisOption = analysisOptions[0].value;
  let districtCategories = [];
  let errors = {}; // Placeholder for future validation errors

  const handleNextStep = () => {
    currentStep++; // Move to the next step without any validation
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      currentStep--; // Move to the previous step
    }
  };
</script>

<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
    <!-- Step Indicator -->
    <ul class="step-indicator flex justify-between mb-6 md:mb-10">
      {#each [1, 2, 3, 4, 5] as step}
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

    <!-- Step Content -->
    {#if currentStep === 1}
      <Step1 {question} />
    {:else if currentStep === 2}
      <Step2 {storeData} {districts} {selectedDistrict} />
      {:else if currentStep === 3}
      {console.log("Form: Passing selectedOption to Step 3:", selectedOption)}
      <Step3 bind:selectedOption={selectedOption} />
    {:else if currentStep === 4}
      {console.log("Form: Passing selectedOption to Step 4:", selectedOption)}
      <Step4 bind:district bind:variable {selectedOption} />
    
      {:else if currentStep === 5}
      <Step5 {district} {variable} />
        
    {/if}

    <!-- Step Navigation Buttons -->
    <div class="button-group mt-6 flex justify-end gap-3">
      {#if currentStep > 1}
        <button
          class="bg-gray-500 text-white py-2 px-4 rounded"
          on:click={handlePrevStep}
        >
          Back
        </button>
      {/if}
      {#if currentStep < 5}
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded"
          on:click={handleNextStep}
        >
          Next
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
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
    background-color: #f0f4f8;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  .step-indicator {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    flex-wrap: wrap;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>
