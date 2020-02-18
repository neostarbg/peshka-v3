<script>

import marked from 'marked';

export let course;
export let topic;

let promise = fetch(`/lectures/${course}/${topic}.md`)

</script>


<div class="container">
<a href={`/lecture/${course}`} class="button">Назад</a>

    <div class="lecture">
    {#await promise}
    <p>Loading...</p>
    {:then value}
        {#await value.text()}
        <p>Parsing...</p>
        {:then text}
            {@html marked(text)}
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {:catch error}
    <p>Something went wrong: {error.message}</p>
    {/await}
    </div>
</div>

<style>

.container {
    margin-top: 30px;

}
:global(h1, h2, h3, h4, h5, h6) {
    font-weight: bold !important;
}

:global(code) { color: #8f0000;}
:global(h1) { font-size: 24px !important; }
:global(h2) { font-size: 20px !important; }
:global(h3) { font-size: 18px !important; }
:global(h4) { font-size: 14px !important; }
:global(h5) { font-size: 12px !important; }
:global(h6) { font-size: 10px !important; }
:global(.dark em) { color: #dadada !important; }
:global(.dark code) { color: #dadada !important; background-color: #414141 }
:global(.dark pre) {background-color: #414141;}
</style>