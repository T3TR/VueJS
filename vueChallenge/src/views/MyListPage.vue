<script>
import MyListCountries from '../components/MyListCountries.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { myListData } from '/store.js';

export default {

    data() {
        return {
            myListCountriesData: [],
            pageNum: 1,
            loading: false,
            myListData
        }
    },

    components: {
        MyListCountries
    },

    computed: {
        firstPage() {
            return this.pageNum > 1 ? '<button style="display:block;">Previous Page</button>' : '<button style="display:none;">Previous Page</button>'
        },
        pageItems() {
            let myMagicRatio = ((this.pageNum * 10) - 10)
            return this.myListCountriesData.slice(myMagicRatio, myMagicRatio+10)
        },
    },

    methods: {
        createLinkFromListData() {

            let apiLink = "https://restcountries.com/v3.1/alpha?codes="

            for(let i = 0; i < this.myListData.listData.length; i++){
                if(i == this.myListData.listData.length-1){
                    apiLink = (apiLink + this.myListData.listData[i])
                }
                else{
                    apiLink = (apiLink + this.myListData.listData[i] + ',')
                }
            }
            return apiLink
        },
        removeFromMyList(uID) {
            let i = this.myListData.listData.indexOf(uID)
            if(i > -1){
                this.myListData.listData.splice(i, 1)
                this.myListCountriesData = this.myListCountriesData.filter(country => country.cca3 != uID)
            }
        }
    },

    beforeMount() {
        this.loading = true
        if(this.createLinkFromListData() != "https://restcountries.com/v3.1/alpha?codes="){
            axios.get(this.createLinkFromListData())
                .then(response => {
                    this.loading = false
                    this.myListCountriesData = response.data})
        }
    },

}
</script>

<template>

    <div class="countriesRender">
        <div v-for="country in pageItems" v-if="!this.loading">
            <MyListCountries
            :name="country.name.common"
            :flag="country.flags.png"
            :latLon="country.latlng[0] + '*' + ', ' + country.latlng[1] + '*'"
            :region="country.region"
            :subregion="country.subregion"
            :uID="country.cca3"
             />
             <button @click="removeFromMyList(country.cca3)">Remove From My List</button>
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

