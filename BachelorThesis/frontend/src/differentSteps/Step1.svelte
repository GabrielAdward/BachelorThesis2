<script>
    export let question = "";
    export let errors = {};
  </script>
  
  <div class="step-content">
    <h2 class="text-lg md:text-xl mb-2 md:mb-4">Step 1: Write a Question</h2>
    <input
      type="text"
      class="w-full p-2 border mb-4"
      placeholder="Enter your question here"
      bind:value={question} 
    />

  </div>
  