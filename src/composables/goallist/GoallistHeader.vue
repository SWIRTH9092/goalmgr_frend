<template>
    <div>
        <div class="headerbox-goallist">
            <br>
            <h2 class="headerbox-text">Goal List </h2> 
            <br>
        </div>

    </div>
</template>
<script>
export default {
    props: {
            displayStatus: String
         }
}
</script>
<style>

    .headerbox-goallist {
        background-color: var(--color1);
        text-align: center; 
        border-bottom: var(--color11) solid 7px;
        border-left: var(--color11) solid 7px;
        border-right: var(--color11) solid 7px;
    }

    .headerbox-text {
        text-align:center;
        color: var(--color8);
        margin: 0;
        font-size: 1.75em;
    }   
</style>