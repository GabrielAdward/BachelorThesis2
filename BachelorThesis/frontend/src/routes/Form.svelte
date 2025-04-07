<script>
  import Step1 from "../differentSteps/Step1.svelte";
  import Step2 from "../differentSteps/Step2.svelte";
  import Step3 from "../differentSteps/Step3.svelte";
  import Step4 from "../differentSteps/Step4.svelte";
  import Step5 from "../differentSteps/Step5.svelte";

  let question = "";
  let storeData = [];
  let districts = [];
  let selectedDistrict = "Show All";
  let district = "All";
  let storeType = "All";
  let economicStat = "revenue";
  let pieVariable = "typeOfStore";
  let currentTool = 1;
  let currentStep = 1;
  let saving = false;
  let successMessage = "";

  let chartTitle = "";
let conclusion = "";

  
const saveAttempt = async () => {
  const payload = {
    userId: 1,
    chartType: "mixed",
    columnsUsed: {
      district,
      storeType,
      economicStat,
      variable: pieVariable
    },
    title: chartTitle,
    conclusion: conclusion,
    dataSummary: null
  };

  const res = await fetch("http://localhost:8080/save-chart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert("Saved!");
  } else {
    alert("Error saving.");
  }
};

</script>

<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
    <!-- Step Progress -->
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

    <!-- Dynamic Step Content -->
    {#if currentStep === 1}
      <Step1 bind:question={question} />
    {:else if currentStep === 2}
      <Step2 bind:storeData={storeData} bind:districts={districts} bind:selectedDistrict={selectedDistrict} />
    {:else if currentStep === 3}
      <Step3 bind:district={district} bind:variable={pieVariable} />
    {:else if currentStep === 4}
      <Step4 bind:district={district} bind:storeType={storeType} bind:economicStat={economicStat} bind:currentTool={currentTool} />
    {:else if currentStep === 5}
    <Step5
      {district}
      {storeType}
      {economicStat}
      {question}
      variable={pieVariable}
      bind:chartTitle
      bind:conclusion
    />
  {/if}
  

    <!-- Navigation & Save Buttons -->
    <div class="button-group mt-6 flex justify-end gap-3">
      {#if currentStep > 1}
        <button class="bg-gray-500 text-white py-2 px-4 rounded" on:click={() => currentStep--}>Back</button>
      {/if}

      {#if currentStep < 5}
        <button class="bg-blue-500 text-white py-2 px-4 rounded" on:click={() => currentStep++}>Next</button>
      {/if}

      {#if currentStep === 5}
        <button class="bg-green-600 text-white py-2 px-4 rounded" on:click={saveAttempt} disabled={saving}>
          {saving ? 'Saving...' : 'Save Attempt'}
        </button>
      {/if}
    </div>

    {#if successMessage}
      <p class="text-center mt-3 text-sm text-green-600">{successMessage}</p>
    {/if}
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
    max-width: 1200px;
    background-color: #f0f4f8;
    padding: 30px;
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
