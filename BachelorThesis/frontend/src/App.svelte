<script>
	import Router from 'svelte-spa-router'; // Import the router component
	import { routes } from './routes.js'; // Import the routes configuration
	import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';
  </script>
  
  <Navbar/>
<main class="min-h-screen bg-gray-100 bg-blue-950">
	<Router {routes} useHash={false} />
</main>
<Footer/>
  

  