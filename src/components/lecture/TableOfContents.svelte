<script>

import Navbar from "../../Navbar.svelte";
export let course;

let promise = fetch(`/lectures/${course}/contents.json`);

</script>
<Navbar />
<div class="container">
    {#await promise}
    <p>Loading ...</p>
    {:then response}
        {#await response.json()}
        <p>Parsing ...</p>
        {:then data}
        
        <h1 class="is-title">{data.title}</h1>
        <ul>
            {#each data.content as item}
            <li><a href={`/lecture/${course}?topic=${item.href}`}>{item.text}</a></li>
            {/each}
        </ul>
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {:catch error}
    <p>Something went wrong: {error.message}</p>
    {/await}
</div>


<style>

    a {
        font-size: 1.2rem;
    }

    :global(.dark a) {color: #51c8ff;}
    

    .container {
        margin-top: 90px !important;
    }

</style>
