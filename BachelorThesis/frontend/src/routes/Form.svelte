<script>
  import Step1 from "../differentSteps/Step1.svelte";
  import Step2 from "../differentSteps/Step2.svelte";
  import Step3 from "../differentSteps/Step3.svelte";
  import Step4 from "../differentSteps/Step4.svelte";
  import Step5 from "../differentSteps/Step5.svelte";

  // Shared data across steps
  let question = ""; // Step 1: User input question
  let storeData = []; // Step 2: Display data
  let districts = []; // Step 2: Available districts for selection
  let selectedDistrict = "Show All"; // Step 2: Selected district
  let district = "All"; // Step 4: Selected district for visualization
  let storeType = "All"; // Step 4: Selected store type
  let economicStat = "revenue"; // Step 4: Selected economic variable
  let selectedOption = null; // Previously used for selecting visualization, now redundant
  let currentTool = 1; // Tracks Pie Chart and Diverging Bar Chart selection in Step 4

  let currentStep = 1; // Tracks current form step
  let errors = {}; // Placeholder for validation errors

  const handleNextStep = () => {
    if (currentStep < 5) {
      currentStep++;
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      currentStep--;
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
      <Step1 bind:question={question} />
    {:else if currentStep === 2}
      <Step2 bind:storeData={storeData} bind:districts={districts} bind:selectedDistrict={selectedDistrict} />
    {:else if currentStep === 3}
      <Step3 />
    {:else if currentStep === 4}
      <Step4 bind:district={district} bind:storeType={storeType} bind:economicStat={economicStat} bind:currentTool={currentTool} />
    {:else if currentStep === 5}
      <Step5 {district} {storeType} {economicStat} />
    {/if}

    <!-- Navigation Buttons -->
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
