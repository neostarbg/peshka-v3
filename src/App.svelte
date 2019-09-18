<script>
	/**
	 * App.svelte
	 * 
	 * The main access point for the app. Acts as a router and loads the lab group and website theme from localStorage
	 */

	import Home from "./Home.svelte";
	import Settings from "./Settings.svelte";

	let loc = window.location.pathname;

	let group = 3;
	if(window.localStorage.getItem("uni-group")) {
        group = window.localStorage.getItem("uni-group");
    } else {
        window.localStorage.setItem('uni-group', 3);
	}
	
	let theme = "light";
	if(window.localStorage.getItem("theme")) {
        theme = window.localStorage.getItem("theme");
    } else {
        window.localStorage.setItem('theme', "light");
	}

	document.getElementsByTagName("body")[0].className = theme;

</script>

{#if loc.match(/^\/$/) || loc.match(/^\/home\/?$/)}
	<Home group={group} theme={theme}/>
{:else if loc.match(/^\/settings\/?$/)}
	<Settings group={group} theme={theme}/>
{/if}