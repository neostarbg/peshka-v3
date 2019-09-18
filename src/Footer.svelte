<script>
    export let theme = "light";
    /**
     * Navbar.svelte
     * 
     * Renders the footer of the website
     * 
     * Optional params:
     *   {String} theme  The website theme - "light" or "dark"
     * 
     */
</script>

<footer class={theme}>
    <div class="container has-text-centered">
        Peshka v3.0.1 alpha 3  - Design by <a href="http://pj-webdesign.com" id="pj">pj-webdesign</a>
    </div>
</footer>


<style>

footer {
    height: 60px;
    padding-top: 18px;
    margin: 30px 0 0 0;
    display: block;
    font-family: "Roboto", sans-serif;

    box-shadow: 0 -1px 3px rgba(0,0,0,0.5);

    background-color: #dadada;
    color: black;
}

footer.dark {
    color: #dadada;
    background-color: #313131;
}

</style>