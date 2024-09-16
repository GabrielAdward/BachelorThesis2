<script>
  import { onMount } from 'svelte';
</script>

<!-- Main Text Section -->
<div class="main text-center pt-16">
  <h1 class="text-6xl font-bold uppercase animate-textclip">
    Engage Audiences with Stunning Videos
  </h1>

  <h3 class="text-3xl font-bold mt-8">
    Boost Your Brand with High-Impact Videos
  </h3>
</div>

<!-- Call-to-Action Button Section -->
<div class="button-container text-center mt-12">
  <button class="gradient-btn">Get Started</button>
</div>

<style>
  h1, h3 {
    background: linear-gradient(to right, #33B7FF 10%, #BD23FF 50%, #FCFF33 60%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: textclip 3s linear infinite;
  }

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }

  /* Button Styles */
  .gradient-btn {
    padding: 12px 36px;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    border-radius: 50px;
    background: linear-gradient(to right, #33B7FF 10%, #BD23FF 50%, #FCFF33 60%);
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 10px rgba(51, 183, 255, 0.5), 
                0 0 10px rgba(189, 35, 255, 0.5), 
                0 0 0px rgba(252, 255, 51, 0.5);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  .gradient-btn:hover {
    transform: scale(1.1);
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
