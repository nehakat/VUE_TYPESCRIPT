<template>
  <div id="app">
    <div id="nav">
      <Layout />
       <!-- <b-spinner variant="primary" label="Spinning"></b-spinner> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import Layout from './components/Layout';
// import Firebase from "firebase";
// import toastr from "toastr";

// const config = {
//   apiKey: "AIzaSyD4OIKGywEPS74dJ8l9GVIYU6-NX9hAjFM",
//   authDomain: "vuejs-bfb95.firebaseapp.com",
//   databaseURL: "https://vuejs-bfb95.firebaseio.com",
//   projectId: "vuejs-bfb95",
//   storageBucket: "vuejs-bfb95.appspot.com",
//   messagingSenderId: "656974544360",
//   appId: "1:656974544360:web:869c62c18f9aeb0df9785d",
//   measurementId: "G-6W1J7TY023",
// };

// const app = Firebase.initializeApp(config);
// const db = app.database();
// const textref = db.ref("stock");

export default {
  name: "App",
  components: {
    Layout
  },
  // firebase: {
  //   texts: textref,
  // },
  created() {
    console.log('$store.getters.getTotalInvestment', this.$store.getters.getTotalInvestment)
    this.$store.dispatch('getInvestmentList')
    // textref.once("value").then((dataSnapshot) => {
    //   const itemsArray = [];
    //   dataSnapshot.forEach((childSnapshot) => {
    //     debugger;
    //     const childData = childSnapshot.val();
    //     itemsArray.push({
    //       currentValue: childData.currentValue,
    //       investmentId: childData.investmentId,
    //       investmentType: childData.investmentType,
    //       investmentAmount: childData.investmentAmount,
    //     });
    //   });
    //   this.chatItems = itemsArray;
    //   console.log("this.chatItems", this.chatItems);
    //   debugger;
    //   this.$store.commit("change", this.chatItems[0]);
    //   console.log('after $store.getters.getTotalInvestment', this.$store.getters.getTotalInvestment)
  
    // });
    },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
