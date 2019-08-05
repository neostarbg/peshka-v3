<script>
	// 404 Error
	import E404 from "./E404.svelte";
	import Home from "./Home.svelte";
	import Cheatsheet from "./Cheatsheet.svelte"; 

	let loc = window.location.pathname;

	let currentPage = "home";

	if (loc.match(/^\/$/) || loc.match(/^\/home\/?$/)) {
		//Home Page
	} else if (loc.match(/^\/cheat(sheet)?\/?$/)) {
		currentPage = "cheatsheet";
	} else {
		currentPage = "404";
	}

</script>

{#if currentPage == "home"}
	<Home />
{:else if currentPage == "cheatsheet"}
	<Cheatsheet />
{:else}
	<E404 />
{/if}