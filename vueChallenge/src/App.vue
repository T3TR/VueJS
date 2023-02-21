<script>
import { RouterLink, RouterView } from 'vue-router'
import { myListData } from '/store.js';

export default {
    data() {
        return {
        myListData
        }
    },

    methods: {
    },

    computed: {
        displayMyList() {
            return this.myListData.listData.length > 0 ?
                '<button>My List</button>' :
                ''
        }
    }
}
</script>

<template>
    <header class="Head">

        <div class="siteName">
            <h1 class="Title">My Travel Destinations</h1>
        </div>

        <div class="Routes">
            <router-link to="/"><button>Countries</button></router-link>
            <span><router-link to="/myList" v-html="displayMyList"></router-link></span>
        </div>
    </header>

  <RouterView />
</template>

<style scoped>

* {
    box-sizing: border-box;
    margin: 0;
}



.Head {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: rgb(40, 40, 40);
    color: rgb(163, 101, 65);
    text-align: center;
    padding-top: 1.5rem;
}

.Title {
    font-size: 3.5rem;
}

.Routes {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

</style>


