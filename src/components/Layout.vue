<template>
  <div class="hello">
    
    <div id="nav" v-if="$store.getters.investmentDetails.length">
      <header>
      <router-link to="/" class="links">My Investments   </router-link>   |    
      <router-link to="/about" class="links">   Explore</router-link>
      <div class="btn-parent">
      <b-button variant="success" v-b-modal.addPortfolioflag>Add portfolio</b-button>
      </div>
      </header>
      <div class="total-inv">
       <p>Total Investments: {{ $store.getters.getTotalInvestment }}</p>
       <p>Current Value: {{ $store.getters.getCurrentValue }}</p>
       </div>
      
      <AddPortfolio />
      <InvestmentTable />
     
    </div>
    <router-view />
    
    <b-spinner
      variant="primary"
      label="Spinning"
      v-if="!$store.getters.investmentDetails.length"
    ></b-spinner>
  </div>
</template>

<script>
import AddPortfolio from "./AddPortfolio.vue";
import InvestmentTable from "./InvestmentTable.vue";

export default {
  components: {
    AddPortfolio,
    InvestmentTable,
  },
  name: "Layout",
  data: function() {
    return {
      addPortfolioflag: false,
    };
  },
  methods: {
  },
};
</script>



<style scoped lang="scss">
header {
 height: 60px;
 display: flex;
 flex-direction: row;
}
.links{
  width: 100px;
  flex:1;
}
.btn-parent{
  flex:8;
  button{
    float: right;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.total-inv{
  height: 60px;
}
</style>
