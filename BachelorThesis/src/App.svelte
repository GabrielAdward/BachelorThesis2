<script>
	import Router from 'svelte-spa-router'; // Import the router component
	import { routes } from './routes.js'; // Import the routes configuration
  </script>
  
  <nav>
	<a href="#/">Home</a>
	<a href="#/about">About</a>
  </nav>
  
  <main>
	<Router {routes} useHash={false} />
</main>
  