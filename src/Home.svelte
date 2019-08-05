<script>
    import Navbar from "./Navbar.svelte";
</script>

<section class="hero is-fullheight">
    <div class="hero-content is-fullheight">
        <div class="container is-fullheight">

            <h1 class="title is-1 has-text-centered is-vertical-center has-text-shadow">
                <span class="time">12:15</span> 
                <span class="exercise">Упр</span> 
                по <span class="subject">Програмиране на Python</span> 
                в стая <span class="room">702</span> 
            </h1>

            <h2 class="subtitle is-3 has-text-centered has-text-shadow">
                <span class="time">14:15</span> 
                <span class="lecture">Лекция</span> 
                по <span class="subject">Изкуствен интелект</span> 
                в стая <span class="room">406</span> 
            </h2>

        </div>
    </div>
</section>

<Navbar />

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