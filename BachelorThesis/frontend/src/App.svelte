<script>

	import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';
	import Home from './routes/Home.svelte';
  </script>
  
  <Navbar />
  <main class="min-h-screen bg-blue-950">
	<!-- Only apply bg-blue-950 to the parent container -->
	<Home  />
  </main>
  <Footer />
  

  