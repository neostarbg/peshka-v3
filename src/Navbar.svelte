
<script>
    import {slide} from "svelte/transition";
    import {onMount} from "svelte";

    let menuActive = false;
    let toggleMenu = () => {
        menuActive = !menuActive;
    }

    let setGroup = group => {
        window.localStorage.setItem('uni-group', group);
    }

    let windowWidth = window.innerWidth;
    $: desktop = windowWidth > 1024;


</script> 
<svelte:window bind:innerWidth={windowWidth} />
<nav class="navbar has-text-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <!-- <img alt="logo" src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
      <span class="logo">Peshka</span>
    </a>

    <a role="button" class="navbar-burger burger" id="burger" aria-label="menu" aria-expanded="false" data-target="navbar" on:click={toggleMenu}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
{#if menuActive || desktop}
  <div id="navbar" class="navbar-menu{menuActive? " is-active":""}" transition:slide>
    <div class="navbar-end">
      <a class="navbar-item" href="/">
        <span class="icon"><i class="fa fa-home"></i></span>
        <span class="is-hidden-desktop">Начало</span>
      </a>
      <a href="/settings" class="navbar-item">
        <span class="icon"><i class="fa fa-cog"></i></span>
        <span class="is-hidden-desktop">Настройки</span>
      </a>
      <a href="https://github.com/neostarbg/peshka-v3" class="navbar-item">
        <span class="icon"><i class="fa fa-github"></i></span>
        <span class="is-hidden-desktop">GitHub</span>
      </a>

      <!-- <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Група
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" on:click={() => {setGroup(1)}}> 1 </a>
          <a class="navbar-item" on:click={() => {setGroup(2)}}> 2 </a>
          <a class="navbar-item" on:click={() => {setGroup(3)}}> 3 </a>
          <a class="navbar-item" on:click={() => {setGroup(4)}}> 4 </a>
        </div>
      </div> -->
    </div>
  </div>
{/if}
</nav>

<style>

    .navbar, .navbar-menu, .navbar-menu.is-active, .navbar-item, .navbar-link, .navbar-dropdown {
        background-color: #212121;
    }

    .navbar-item, .burger, .navbar-link, .navbar-dropdown .navbar-item, .navbar-item:hover {
        color: #dcdcdc;
    }

    .navbar-item:hover, .navbar-link:hover, .navbar-link:active, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown:focus .navbar-link {
        background-color: #252525 !important;
    }

    .navbar-dropdown {
        border-color: #252525;
    }

    .navbar-divider {
        background-color: #313131;
    }

    .logo {
        font-family: "Comfortaa", sans-serif;
        font-size: 1.8rem;
    }

</style>