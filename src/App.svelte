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

	let isNextClassEnabled = 1;

	if(window.localStorage.getItem("nextClassEnabled") != undefined) {
        isNextClassEnabled = window.localStorage.getItem("nextClassEnabled");
    } else {
        window.localStorage.setItem('nextClassEnabled', 1);
	}

	document.getElementsByTagName("html")[0].className = theme;
	document.getElementsByTagName("body")[0].className = theme;

</script>

{#if loc.match(/^\/$/) || loc.match(/^\/home\/?$/)}
	<Home group={group} theme={theme} nextclass={isNextClassEnabled}/>
{:else if loc.match(/^\/settings\/?$/)}
	<Settings group={group} theme={theme}/>
{/if}