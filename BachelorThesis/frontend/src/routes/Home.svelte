<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const refreshPage = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', refreshPage);

    return () => {
      window.removeEventListener('popstate', refreshPage);
    };
  });
</script>

<div class="overlay-container">
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
    <a href="/form" class="black-btn">Get Started!</a>
  </div>
</div>

<!-- New Section: Three Frames Side by Side -->
<div class="new-section frame-group">
  <!-- Frame 1 -->
  <div class="rectangular-frame"></div>
  
  <!-- Frame 2 -->
  <div class="rectangular-frame"></div>
  
  <!-- Frame 3 -->
  <div class="rectangular-frame"></div>
</div>

<!-- New Info Section -->
<div class="info-section">
  <h2 class="section-title text-center">Build your best work with Plot on Observable</h2>
  <p class="subtitle text-center">The only data workflow platform capable of supporting the full power of Plot</p>

  <div class="info-columns info-column2">
    <!-- Column 1 -->
    <div class="info-column info-column2">
      <h3>Connect to your data instantly</h3>
      <p>Pull live data from the cloud, files, and databases into one secure place — without installing anything, ever.</p>
    </div>
    
    <!-- Column 2 -->
    <div class="info-column info-column2">
      <h3>Code faster than you thought possible</h3>
      <p>Get everything you need and none of what you don't with lightweight automatic versioning, instant sharing, and real-time multiplayer editing.</p>
    </div>
    
    <!-- Column 3 -->
    <div class="info-column   info-column2  ">
      <h3>Accelerate your team's analysis</h3>
      <p>Create a home for your team’s data analysis where you can spin up charts, maps, and data apps to explore, analyze, and iterate on together.</p>
    </div>
  </div>
</div>

<style>
  /* Overlay container */
  .overlay-container {
    position: relative;
    padding: 50px;
    border: 1% solid black;
  }

  /* Text animation */
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

 /* Black Button Styles */
.black-btn {
  padding: 12px 36px;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;
  background-color: blue; /* Solid black background */
  color: white;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

/* Keep the hover effect */
.black-btn:hover {
  transform: scale(1.1);
}


  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* New Section Styles */
  .new-section {
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  /* Responsive Layout for Frames */
  .frame-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 90px;
    flex-wrap: wrap;
  }

  .rectangular-frame {
    width: 250px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    margin-top: 5px;
    transition: transform 0.4s, box-shadow 0.4s;
    box-shadow: 0 0 10px rgba(51, 183, 255, 0.3),
                0 0 10px rgba(189, 35, 255, 0.3),
                0 0 10px rgba(252, 255, 51, 0.3);
  }

  /* Hover Effect for Frames */
  .rectangular-frame:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(51, 183, 255, 0.8),
                0 0 20px rgba(189, 35, 255, 0.8),
                0 0 20px rgba(252, 255, 51, 0.8);
  }

  /* Info Section Styling */
  .info-section {
    padding: 50px;
    background-color: transparent;
    color: white;
  }

  .section-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: white; /* Title text color set to white */

  }

  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
    color: white; /* Subtitle text color set to white */

  }

  .info-columns {
    display: flex;
    justify-content: space-between;
    text-align: left;
    gap: 30px;
    flex-wrap: wrap;
  }

  .info-column {
    flex: 1;
    padding: 0 20px;
    min-width: 300px;
      color: white; /* Paragraph text color set to white */

  }

 

  .info-column h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: white; /* Ensure heading color is white */

  }

  .info-column p {
    font-size: 1.1rem;
    color: #aaa;
  }

  @media (max-width: 768px) {
    .new-section {
      flex-direction: column;
    }

    .frame-group {
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 4rem;
    }

    h3 {
      font-size: 2rem;
    }

    .gradient-btn {
      font-size: 1.25rem;
      padding: 10px 24px;
    }

    .rectangular-frame {
      width: 200px;
      height: 200px;
    }

    .info-columns {
      flex-direction: column;
      gap: 20px;
    }

    .info-column {
      min-width: 100%;
      padding: 0;
    }
  }
</style>
