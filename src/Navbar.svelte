
<script>
    import {slide} from "svelte/transition";
    import {onMount} from "svelte";

    let menuActive = false;
    let toggleMenu = () => {
        menuActive = !menuActive;
    }

    let windowWidth = window.innerWidth;
    $: desktop = windowWidth > 1024;


</script> 
<svelte:window bind:innerWidth={windowWidth} />
<nav class="navbar has-text-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img alt="logo" src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" id="burger" aria-label="menu" aria-expanded="false" data-target="navbar" on:click={toggleMenu}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
{#if menuActive || desktop}
  <div id="navbar" class="navbar-menu{menuActive? " is-active":""}" transition:slide>
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable"> <!--is-active -->
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
</nav>

<h1 class="title is-">{desktop} {windowWidth}</h1>

<style>

    .navbar, .navbar-menu, .navbar-menu.is-active, .navbar-item, a.navbar-link, .navbar-dropdown {
        background-color: #212121;
    }

    a.navbar-item, .burger, .navbar-link {
        color: #dcdcdc;
    }

    a.navbar-item:hover, a.navbar-link:hover {
        background-color: #252525;
    }

    .is-active .navbar-dropdown {
        border-color: #252525;
    }

    .navbar-divider {
        background-color: #313131;
    }

</style>