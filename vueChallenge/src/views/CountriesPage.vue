<script>
import Countries from '../components/Countries.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { myListData } from '/store.js';

export default{

    data() {
        return {
            countriesData: [],
            pageNum: 1,
            loading: false,
            searchInput: null,
            myListData
        }
    },

    components: {
        Countries
    },

    computed: {
        firstPage() {
            return this.pageNum > 1 ? '<button style="display:block;">Previous Page</button>' : '<button style="display:none;">Previous Page</button>'
        },
        pageItems() {
            let myMagicRatio = ((this.pageNum * 10) - 10)
            return this.countriesData.slice(myMagicRatio, myMagicRatio+10)
        }
    },

    beforeMount() {
        this.loading = true
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                this.loading = false
                this.countriesData = response.data})
    },

    methods: {
        createLinkFromSearch(){
            let apiLink = "https://restcountries.com/v3.1/name/"
            apiLink = apiLink + this.searchInput
            return apiLink
        },
        search(){
            event.preventDefault();
            if(this.searchInput){
                this.loading = true
                axios.get(this.createLinkFromSearch())
                    .then(response => {
                        this.loading = false
                        this.countriesData = response.data})
            }
            else{
                this.loading = true
                axios.get('https://restcountries.com/v3.1/all')
                    .then(response => {
                        this.loading = false
                        this.countriesData = response.data})
            }
        }
    },
}
</script>

<template>

    <div class="Search">
        <form action="post">
            <input v-model="searchInput" type="text" placeholder="Search">
            <button @click="search()" type="submit">Search</button>
        </form>
    </div>

    <div class="countriesRender">
        <div v-for="country in pageItems" v-if="!this.loading">
            <Countries 
            :name="country.name.common"
            :flag="country.flags.png"
            :latLon="country.latlng[0] + '*' + ', ' + country.latlng[1] + '*'"
            :region="country.region"
            :subregion="country.subregion"
            :uID="country.cca3"
             />
        </div>
    </div>

    <div class="pageThrough">
        <ul class="pageList">
            <li><span v-html="firstPage" @click="this.pageNum--"></span></li>
            <li><p>Page {{ this.pageNum }}</p></li>
            <li><button @click="this.pageNum++">Next Page</button></li>
        </ul>
    </div>
    
</template>

<style scoped>

* {
    box-sizing: border-box;
    margin: 0;
}

.Search {
    background-color: rgb(40, 40, 40);
    padding-bottom: 1.5rem;
    text-align: center;
}



.countriesRender {
    background: rgb(80, 80, 80);
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.pageThrough {
    background-color: rgb(40, 40, 40);
    color: white;
    text-align: center;
    padding: 0.5rem;
}

.pageList{
    list-style-type: none;
}

.pageList li {
    display: inline;
}
</style>