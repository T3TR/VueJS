<script>

export default {
    data() {
        return {
            showMore: false,
        }
    },
    props: {
        uID: String,
        name: String,
        flag: String,
        latLon: String,
        region: String,
        subregion: String
    },
        methods: {
        toggleShowMore(){
            if(this.showMore == false){
                this.showMore = true
            }
            else{
                this.showMore = false
            }
            console.log(this.showMore)
        }
    },
    computed: {
        toggleShow() {
            return this.showMore == true ? 
            '<button>Show Less</button>' :
            '<button>Show More</button>'
        }
    }
}
</script>

<template>

    <div class="Countries">
        <div>
            <div class="Name">{{ name }}</div>
            <div class="extraInfo">Region: {{ region }}</div>
            <span @click="toggleShowMore()" v-html="toggleShow"></span>
        </div>
        <div v-if="showMore == true">
            <div><img :src="flag"></div>
            <div class="extraInfo">Latitude/Longitude: {{ latLon }}</div>
            <div class="extraInfo">Subregion: {{ subregion }}</div>
        </div>
    </div>

</template>

<style scoped>

* {
    box-sizing: border-box;
    margin: 0;
}

.Countries {
    margin: 1rem;
    border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    padding: 0.5rem;
}

.Name {
    font-size: 2.5rem;
    color: rgb(83, 165, 212);
}

.extraInfo {
    color: rgb(240, 191, 102);
}
</style>