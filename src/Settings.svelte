<script>
import Navbar from "./Navbar.svelte";
import Footer from "./Footer.svelte";

import { fade } from 'svelte/transition';
import {onMount} from "svelte";

export let group = 4;
let groupText = group.toString();

export let theme = "light";
let currentTheme = theme;


let showSuccessNotification = false;

onMount(() => {
    document.getElementById("labgroup-select").selectedIndex = group-1;
    document.getElementById("theme-select").selectedIndex = theme == "light" ? 0 : 1;
})

let save = (evt) => {
    evt.preventDefault();
    window.localStorage.setItem("uni-group", parseInt(groupText));
    window.localStorage.setItem("theme", theme);

    currentTheme = theme;
    document.body.className = theme;

    showSuccessNotification = true;

}
</script>

<Navbar />

{#if showSuccessNotification}
<div class="notification is-success" transition:fade ><button class="delete"on:click={() => {showSuccessNotification = false;}}></button> Промените бяха успешно запазени</div>
{/if}
<div class="container {currentTheme}">
    <div class="card {currentTheme}">
        <div class="card-content">
            <div class="title">
                <h3>Настройки</h3>
            </div>
            <form action="#">
                <div class="field">
                    <label>Група</label>
                    <p class="control">
                        <span class="select">
                            <select name="labgroup" id="labgroup-select" bind:value={groupText}>
                                <option value="1">1 група</option>
                                <option value="2">2 група</option>
                                <option value="3">3 група</option>
                                <option value="4">4 група</option>
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
        position: absolute;
        z-index: 99;
        top: 10px;
        right: 10px;

    }
</style>