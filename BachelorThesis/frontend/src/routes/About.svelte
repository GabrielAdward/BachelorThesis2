<script>
    let selectedCard = null; // Track the currently selected card
  
    const cards = [
      { title: "Marks", description: "Plot doesn't have chart types. Instead, it has layered geometric shapes such as bars, dots, and lines." },
      { title: "Scales", description: "Scales map an abstract value such as time or temperature to a visual value such as position or color." },
      { title: "Transforms", description: "Derive data on-the-fly while plotting, say to bin quantitative values or compute a rolling average." },
      { title: "Facets", description: "Small multiples facilitate comparison by repeating a plot across partitions of data." },
      { title: "Projections", description: "Plot supports GeoJSON and D3's spherical projection system for geographic maps." },
      { title: "Built with D3", description: "Plot is built by the same team as D3. If you know some D3, you’ll be right at home with Plot." },
      { title: "Plot without code", description: "With Observable's chart cell, quickly create plots with a GUI, then eject to code to customize." },
      { title: "Built by Observable", description: "Plot is developed by Observable, the platform for collaborative data analysis." }
    ];
  
    // Function to handle clicking on a card
    const openCard = (card) => {
      selectedCard = card;
    };
  
    // Function to close the modal
    const closeCard = () => {
      selectedCard = null;
    };
  </script>
  
  <!-- Main "About Us" Section -->
  <section class="about-us-section text-center py-16">
    <h1 class="text-4xl font-bold mb-4 text-white">About us</h1>
    <p class="text-lg max-w-lg mx-auto text-white">
      We are specialists in web development. Creativity and fun are our ingredients for awesome work.
    </p>
  </section>
  
  <!-- Cards Section with 8 Cards -->
  <section class="cards-section py-16">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each cards as card (card.title)}
        <div class="card cursor-pointer" on:click={() => openCard(card)}>
          <div class="card-content p-6 bg-transparent border border-gray-600 rounded-lg shadow-lg h-full">
            <h3 class="text-xl font-bold mb-2 text-white">{card.title}</h3>
            <p class="text-white">{card.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Modal for Enlarged Card -->
  {#if selectedCard}
    <div class="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div class="modal-content bg-blue-950 text-white p-8 rounded-lg shadow-lg max-w-lg relative">
        <h2 class="text-2xl font-bold mb-4">{selectedCard.title}</h2>
        <p class="mb-4">{selectedCard.description}</p>
        <!-- Close Button -->
        <button 
          class="close-button bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 absolute bottom-4 right-4"
          on:click={closeCard}
        >
          Close
        </button>
      </div>
    </div>
  {/if}
  
  <style>
    /* About Us Section */
    .about-us-section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  
    /* Cards Section */
    .cards-section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  
    .card-content {
      height: 100%; /* Ensure all cards have the same height */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.05); /* Make the cards semi-transparent */
      transition: transform 0.3s ease; /* Smooth transition for the zoom effect */
    }
  
    /* Card Zoom Effect */
    .card:hover .card-content {
      transform: scale(1.05);
      background-color: rgba(255, 255, 255, 0.2); /* Slightly increase opacity on hover */
    }
  
    /* Modal Styles */
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .modal-content {
      position: relative;
      max-width: 600px;
      width: 90%;
      background-color: #1e3a8a; /* Set the background to bg-blue-950 */
      padding: 2rem;
      border-radius: 8px;
    }
  
    .modal h2, .modal p {
      color: #ffffff; /* Set the text to white */
    }
  
    .close-button {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }
  
    .modal button {
      background-color: #1a73e8;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      color: #ffffff;
      cursor: pointer;
    }
  
    .modal button:hover {
      background-color: #155ab0;
    }
  </style>
  