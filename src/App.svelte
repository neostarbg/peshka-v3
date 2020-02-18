<script>
	/**
	 * App.svelte
	 * 
	 * The main access point for the app. Acts as a router and loads the lab group and website theme from localStorage
	 */

	import Home from "./Home.svelte";
	import Settings from "./Settings.svelte";
	import LectureTOC from './components/lecture/TableOfContents.svelte';
	import Lecture from './components/lecture/Lecture.svelte';

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

	// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

</script>

{#if loc.match(/^\/$/) || loc.match(/^\/home\/?$/)}
	<Home group={group} theme={theme} nextclass={isNextClassEnabled}/>
{:else if loc.match(/^\/settings\/?$/)}
	<Settings group={group} theme={theme}/>
{:else if loc.match(/^\/lecture\/.+$/)}
	<!-- 
		e.g. /lecture/translation_methods?topic=1_languages
		course = translation_methods
		topic = 1_languages
	 -->
	{#if !getParameterByName("topic")}
		<LectureTOC course={loc.split("/")[loc.split("/").length-1].split("?")[0]} />
	{:else}
		<Lecture course={loc.split("/")[loc.split("/").length-1].split("?")[0]} topic={getParameterByName("topic")} />
	{/if}
{/if}