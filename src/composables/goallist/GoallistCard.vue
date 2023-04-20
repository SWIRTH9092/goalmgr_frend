<template>

    <div>
        <div class="goallist-name">
            <p >{{ cardName }}</p>
        </div>
        <br>
        <span class="goal-data"> Start Date: {{ cardStartDate }}</span><br>
        <span class="goal-data">End Date: {{ cardEndDate }}</span><br> 
        <span class="goal-data">Priority: {{ cardPriority }}</span><br>
        <span class="goal-data">Status: {{ cardStat }}</span><br>
    </div>  

</template>

<script>

    export default {
        props: {
            cardName: String,
            cardStartDate: String,
            cardEndDate: String,
            cardPriority: Number,
            cardStat: String,
         }
    }
</script>

 