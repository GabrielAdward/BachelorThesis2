<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte"
  import Form from './routes/Form.svelte';
  import { Router, Link, Route } from "svelte-routing";



</script>

<Router>
  <Navbar/>
  <main class="min-h-screen bg-blue-950">
    <Route path="/" component={Home} />  
    <Route path="/about" component={About} />
    <Route path ="/form" component= {Form} />
  </main>
  <Footer/>
</Router>