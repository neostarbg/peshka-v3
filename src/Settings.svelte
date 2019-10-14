<script>

    /**
     * Settings.svelte
     * 
     * The settings page for the website. Renders a Bulma options form inside of a hero element
     * Upon change, updates settings in LocalStorage
     * 
     * Required components:
     *   Navbar.svelte
     *   Footer.svelte
     *
     * Optional params:
     *   {Number} group  The lab group
     *   {String} theme  The website theme
     *  
     */
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";

    import { fade } from 'svelte/transition';
    import {onMount} from "svelte";

    export let group = 3;
    let groupText = group.toString();

    export let theme = "light";
    let currentTheme = theme;

    let isNextClassEnabled = window.localStorage.getItem('nextClassEnabled');
    
    let nextClassBtnClassname = "";
    let nextClassBtnText = "";


    let showSuccessNotification = false;

    onMount(() => {
        document.getElementById("labgroup-select").selectedIndex = group-1;
        document.getElementById("theme-select").selectedIndex = theme == "light" ? 0 : 1;

        if(isNextClassEnabled == 1) {
            nextClassBtnClassname = "button is-success";
            nextClassBtnText = "<i class='fa fa-check'></i> Включено"; 
        } else {
            nextClassBtnClassname = "button is-danger";
            nextClassBtnText = "<i class='fa fa-times'></i> Изключено"; 
        }
    })

    let save = (evt) => {
        evt.preventDefault();
        window.localStorage.setItem("uni-group", parseInt(groupText));
        window.localStorage.setItem("theme", theme);
        window.localStorage.setItem('nextClassEnabled', isNextClassEnabled);

        currentTheme = theme;
        document.body.className = theme;

        showSuccessNotification = true;
    }

    const toggleNextClassEnabled = e => {
        e.preventDefault();

        if(isNextClassEnabled == 1) {
            isNextClassEnabled = 0;
            nextClassBtnClassname = "button is-danger";
            nextClassBtnText = "<i class='fa fa-times'></i> Изключено"; 
        } else {
            isNextClassEnabled = 1;
            nextClassBtnClassname = "button is-success";
            nextClassBtnText = "<i class='fa fa-check'></i> Включено"; 
        }
    }
</script>

<Navbar />

{#if showSuccessNotification}
<div class="notification is-success" transition:fade ><button class="delete"on:click={() => {showSuccessNotification = false;}}></button> Промените бяха успешно запазени</div>
{/if}
<div class="hero {currentTheme}">
    <div class="hero-body {currentTheme}">
        <div class="container">
            <a class="button is-info" href="/">Назад</a>
            <hr>
            <div class="title">
                <h3>Настройки</h3>
            </div>
            <form action="#">
                <div class="field">
                    <label>Показване на следващия предмет в header</label><br>
                    <button class={nextClassBtnClassname} on:click={toggleNextClassEnabled}>{@html nextClassBtnText}</button>
                </div>
                <div class="field">
                    <label>Група</label>
                    <p class="control">
                        <span class="select">
                            <select name="labgroup" id="labgroup-select" bind:value={groupText}>
                                <option value="1">1 група</option>
                                <option value="2">2 група</option>
                                <option value="3">3 група</option>
                            </select>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <label>Тема на сайта</label>
                    <p class="control">
                        <span class="select">
                            <select name="theme" id="theme-select" bind:value={theme}>
                                <option value="light">Светла</option>
                                <option value="dark">Тъмна</option>
                            </select>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <button on:click={save} class="button is-success">Запазване </button>
                </div>
            </form>
        </div>
    </div>
</div>
<Footer theme={currentTheme}/>


<style>

    .dark h1, .dark h2, .dark h3 {
        color: #d8d8d8;
    }

    .hero {
        margin-top: 60px;
        padding: 100px 0;
    }

    .container.dark {
        color: #eaeaea;
    }

    .container.dark h3 {
        color: #dadada;
    }

    .card.light {
        background-color: #eaeaea;
    }

    .card.dark {
        background-color: #313131 !important;
    }

    .is-success {
        background-color: rgb(87, 155, 11);
    }

    .notification {
        position: fixed;
        z-index: 99;
        top: 70px;
        right: 10px;
    }

    hr {
        border: 1px solid #bababa;
    }

    .dark hr {
        border: 1px solid #313131;
    }
</style>