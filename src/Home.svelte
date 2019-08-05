<script>
    import Navbar from "./Navbar.svelte";
    import {onMount} from "svelte";
    import {getCurrent, getNext} from "./schedule";

    let group = 4;

    if(window.localStorage.getItem("uni-group")) {
        group = window.localStorage.getItem("uni-group");
    } else {
        window.localStorage.setItem('uni-group', 4);
    }

    let current = undefined;
    let next = undefined;

    $: loaded = current == undefined;
    onMount(async () => {
        getCurrent().then((x) => {
            current = x;
        })

        getNext().then((x) => {
            next = x;
        })
    })
</script>

<section class="hero is-fullheight">
    <div class="hero-content is-fullheight">
        <div class="container is-fullheight">

            {#if !loaded}
            <h1 class="title is-1 has-text-centered is-vertical-center has-text-shadow">
                <span class="time">{current.time}:15</span> 
                <span class="{current.type == "l"? "lecture" : "exercise"}">{current.type == "l"? "Лекция" : "Упр"}</span> 
                по <span class="subject">{current.subject}</span> 
                в стая <span class="room">{current.room}</span> 
            </h1>

            <h2 class="subtitle is-3 has-text-centered has-text-shadow">
                <span class="time">14:15</span> 
                <span class="lecture">Лекция</span> 
                по <span class="subject">Изкуствен интелект</span> 
                в стая <span class="room">406</span> 
            </h2>
            {/if}
        </div>
    </div>
</section>

<Navbar />

asd  {loaded}

<div style="height:400px;"></div>
<style>
.hero {
    background-image: url("/img/hero-bg.jpg");
    background-size: cover;
    background-position: top;
}

h1 {
    padding-top: 20%;
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

</style>