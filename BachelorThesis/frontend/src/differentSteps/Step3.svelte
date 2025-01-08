<script>
    export let options = [];
    export let selectedOption = null;
  
    const selectOption = (id) => {
      selectedOption = id;
    };
  </script>
  
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
  