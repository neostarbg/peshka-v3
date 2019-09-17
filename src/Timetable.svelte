<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    export let schedule = undefined;
    export let group = 3; 
    export let theme = "light";

    let displayGroup = group;
    let searchTerm = "";

    let optionsVisible = true;

    let today = new Date();
    
    let daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
    let shortDaysOfWeek = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];


    for(let i = 0; i < schedule.length; i++) {
        for (let j = 0; j < schedule[i].length; j++) {
            for (let k = 0; k < daysOfWeek.length; k++) {
                if(schedule[i][j]["Ден"] == daysOfWeek[k]) {
                    schedule[i][j].day = k;
                }
            }
        }
    }

    onMount(() => {
        document.getElementById("groupSelect").selectedIndex = displayGroup;
        optionsVisible = false;
    });

</script>

<div class="container {theme}">

    <div class="optionsToggle">
        <button class="button is-info is-outlined" id="toggleOptionsBtn" on:click={()=>{optionsVisible = !optionsVisible;}}>
            {#if optionsVisible}<i class="fa fa-times"></i>{:else}<i class="fa fa-gear"></i>{/if}
        </button>
    </div>
    {#if optionsVisible}
    <div class="options" transition:slide>
        <div class="tile is-ancestor">
            <div class="tile is-parent is-2">
                <div class="tile is-child">
                    <div class="field">
                        <label for="groupSelect">Група</label>
                        <div class="control">
                            <div class="select is-primary">
                                <select name="groupSelect" id="groupSelect" bind:value={displayGroup}>
                                    <option value="0">Всички</option>
                                    <option value="1">1 лаб.</option>
                                    <option value="2">2 лаб.</option>
                                    <option value="3">3 лаб.</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tile is-parent is-10">    
                <div class="tile is-child">
                    <div class="field">
                        <label for="searchInput">Търсене</label>
                        <div class="control">
                            <input type="text" class="input" name="searchInput" id="searchInput" placeholder="Търсене" bind:value={searchTerm}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}

    <div class="table-container">
        <table class="table is-fullwidth is-striped" id="timetable">
            <thead>
                <th>Ден</th>
                <th>Час</th>
                <th>Седм.</th>
                <th>Гр.</th>
                <th>Зала</th>
                <th>Дисциплина</th>
                <th>Преподавател</th>
            </thead>
            <tbody>
                {#each schedule as day}
                    {#each day as subject}
                        {#if (subject["Група"] == 0 || subject["Група"] == displayGroup || displayGroup == 0) && JSON.stringify(subject).toLowerCase().search(searchTerm.toLowerCase()) > -1}
                            <tr class="{today.getDay() == subject["day"] ? "selected": ""}">
                            <td>{shortDaysOfWeek[subject["day"]]}</td>
                            <td>{(subject["time"]+"").match(/(\d+)/)[0]}:15</td>
                            <td>{subject["Седмица"]}</td>
                            <td>{subject["Група"] == 0 ? "Л" : subject["Група"]}</td>
                            <td>{subject["Зала"]}</td>
                            <td>{subject["Дисциплина"]}</td>
                            <td>{subject["Преподавател"]}</td>
                        </tr>
                        {/if}
                    {/each}
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .container {
        margin-top: 40px;
        margin-bottom: 40px;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.4); 
    }
    .field {
        padding: 30px;
    }
    #timetable {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;        
    }

    #timetable td, #timetable th {
        border: 1px solid #d8d8d8;
        padding: 16px;
    }
    #timetable th {
        border: 1px solid #202020;
    }

    .dark #timetable td {
        border: 1px solid #303030;
        background-color: #313131;
        color: white;
    }

    .dark #timetable tr.selected, .dark #timetable tr.selected td {
        background-color: #1e3042;
    }

    .dark #timetable tr.selected td {
        border: 1px solid #203346;
    }

    #timetable tr:nth-child(even){background-color: #f2f2f2;}

    #timetable tr:hover {background-color: #ddd;}

    #timetable th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #212121;
        color: white;
    }

    #timetable tr.selected {
        background-color: #aecdeb;
    }

    #timetable tr.selected td {
        border: 1px solid #adc9e6;
    }

    .dark input {
        background-color: #313131;
        border: 1px solid #343853;
        color: #d7d7d7;
    }

    .optionsToggle {
        padding: 20px;
    }

</style>