<script>

    /**
     * Home.svelte
     * 
     * The home page of peshka.ml
     * 
     * Optional params:
     * {Number} group  The lab group
     * {String} theme  The website theme - "light" or "dark" 
     * 
     */
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import Timetable from "./Timetable.svelte";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition"
    import {getClasses, localize, getSchedule} from "./nextClass";

    export let group = 3;
    export let theme = "light";

    let schedule = undefined;
    let timetable = undefined;
    let current = undefined;
    let next = undefined;

    let showNotification = true;

    if(window.localStorage.getItem("seenChangeGroupNotification")) {
        showNotification = false;
    }

    const dismissNotification = () => {
        showNotification = false;
    }
    
    if(!window.localStorage.getItem("seenChangeGroupNotification")) {
        window.localStorage.setItem("seenChangeGroupNotification", true)

        // Auto dismiss after 5 seconds
        setTimeout(dismissNotification, 5000);
    }

    $: loaded = schedule != undefined && current != undefined && next != undefined;

    onMount(async () => {
        schedule = await getSchedule();
        timetable = cloneArray(schedule);

        let classes = await getClasses(schedule);

        current = classes.current;
        next = classes.next;

        localize(current, next);

    })


    const cloneArray = arr => {
        let clone = []

        for(let i = 0; i < arr.length; i++) {
            clone.push(arr[i]);
        }

        return clone;
    }
</script>
{#if showNotification}
    <div class="notification is-info" transition:fade ><button class="delete"on:click={dismissNotification}></button> Можете да смените групата си и темата на сайта от <i class="fa fa-cog"></i></div>
{/if}
<section class="hero is-fullheight {theme}">
    <div class="hero-content is-fullheight">
        <div class="container is-fullheight">

            {#if loaded}
                <h1 class="title is-size-1-tablet has-text-centered is-vertical-center has-text-shadow">
                    <span class="time">{current.time}:15</span> 
                    <span class="{current["Л/У"] == "Л"? "lecture" : "exercise"}">{current["Л/У"]== "Л"? "Лекция" : "Упр"}</span> 
                    по <span class="subject">{current["Дисциплина"]}</span> 
                    в зала <span class="room">{current["Зала"]}</span> 
                    
                </h1>

                <h2 class="subtitle is-size-3-tablet has-text-centered has-text-shadow">
                    <span class="time">{next.time}:15</span> 
                    <span class="{next["Л/У"] == "Л"? "lecture" : "exercise"}">{next["Л/У"]== "Л"? "Лекция" : "Упр"}</span> 
                    по <span class="subject">{next["Дисциплина"]}</span> 
                    в зала <span class="room">{next["Зала"]}</span> 
                </h2>
            {/if}
        </div>
    </div>
</section>

<Navbar />
{#if loaded}
    <Timetable schedule={timetable} group={group} theme={theme}/>
{/if}
<Footer theme={theme} />

<style>
.hero {
    background-image: url("/img/hero-bg.jpg");
    background-size: cover;
    background-position: top;
}

.hero.dark {
    background-image: url("/img/hero-bg-dark.jpg");
}

h1 {
    padding-top: 30%;
}

@media screen and (max-width: 769px) {
    h1 {
        padding-top: 50%;
    }
}

.dark h1, .dark h2 {
    color: #dadada;

}

.has-text-shadow {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.time {
    color: rgb(189, 145, 63);
}

.exercise {
    color: rgb(42, 197, 76);
}

.lecture {
    color: rgb(47, 172, 177);
}

.subject {
    color: rgb(77, 100, 233);
}

.room {
    color: rgb(233, 77, 137);
}


.notification {
    position: fixed;
    top: 65px;
    right: 5px;
    z-index: 100;
}
</style>