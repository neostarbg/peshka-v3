<script>
	// 404 Error
	import E404 from "./E404.svelte";
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
{:else}
	<E404 />
{/if}