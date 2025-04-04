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
  let currentTool = 1;
  let pieVariable = "typeOfStore";
  let currentStep = 1;
  let errors = {};
  let conclusion = "";
  let attempts = [];

  const handleNextStep = () => {
    if (currentStep < 5) currentStep++;
  };

  const handlePrevStep = () => {
    if (currentStep > 1) currentStep--;
  };

  const handleLoop = () => {
    const timestamp = new Date();
    attempts.push({
      question,
      pieVariable,
      district,
      storeType,
      economicStat,
      conclusion,
      timestamp,
    });
    currentStep = 1;
    question = "";
    storeType = "All";
    economicStat = "revenue";
    pieVariable = "typeOfStore";
    conclusion = "";
  };

  const formatDate = (date) => format(date, "Pp");

  const expandAttempt = (attempt) => {
    currentStep = 5;
    question = attempt.question;
    pieVariable = attempt.pieVariable;
    district = attempt.district;
    storeType = attempt.storeType;
    economicStat = attempt.economicStat;
    conclusion = attempt.conclusion;
  };
</script>

<!-- 💡 Previous Attempts above form -->
<div class="attempts-container">
  <h3>Previous Attempts</h3>
  <div class="attempts-grid">
    {#each attempts as a}
      <div class="attempt-box" on:click={() => expandAttempt(a)}>
        <strong>{a.question}</strong>
        <div class="text-sm text-gray-500">{formatDate(a.timestamp)}</div>
      </div>
    {/each}
  </div>
</div>

<!-- 🧾 Form Component -->
<div class="form-container flex items-center justify-center">
  <div class="form-box p-6 md:p-10 rounded-lg shadow-md">
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
      <Step3 bind:district={district} bind:variable={pieVariable} />
    {:else if currentStep === 4}
      <Step4 bind:district={district} bind:storeType={storeType} bind:economicStat={economicStat} bind:currentTool={currentTool} />
    {:else if currentStep === 5}
      <Step5 {district} {storeType} {economicStat} {question} variable={pieVariable} bind:conclusion />
    {/if}

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
  .attempts-container {
    margin: 20px auto 10px auto;
    max-width: 1200px;
    padding: 10px;
    text-align: left;
  }

  .attempts-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 5px;
  }

  .attempt-box {
    background: white;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    width: fit-content;
  }

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
