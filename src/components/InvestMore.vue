<template>
  <b-modal id="investMoreFlag" ref="investMoreFlag" title="Add Portfolio"  hide-footer=true>
    <b-form>
      <b-container fluid>
        <b-row>
          <b-form-input
            v-bind:value="value.investmentType"
            class="marginbottom"
          ></b-form-input>
        </b-row>
        <b-row>
          <b-form-input
            type="number"
            v-model="value.investmentAmount"
            disabled="true"
            class="marginbottom"
          ></b-form-input>
          <b-form-input
            type="number"
            v-model.number="investmentAmount"
            placeholder="Enter amount to invest More"
            @change="amountChange"
            class="marginbottom"
          />
        </b-row>
          <b-row>
             <div class="margintop">
            <b-button variant="danger">Button</b-button>
            <b-button variant="success" v-on:click="amountChange"
              >Button</b-button>
              <!-- <span v-if="!investmentType || !investmentAmount">{{requiredMsg}}</span> -->
          </div>
        </b-row>
      </b-container>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "InvestMore",
  props: ["value"],
  data: function() {
    return {
      val: { ...this.value },
      investmentAmount: null,
    };
  },
  //   watch: {
  //     dataprops: function() {
  //       this.investment = this.dataprops;
  //     //  console.log(" inside watch", this.investment);
  //     },
  //   },
  created: function() {
    // console.log("inside created", this.dataprops["schemeAmount"]);
    //debugger;
  },
  updated: function() {
    console.log("schemeObj inside updated", this.value["investmentAmount"]);
    //debugger;
  },
  methods: {
    amountChange: function() {
      //console.log('inside method amount change', this.dataprops["schemeAmount"]);
      //Note change the way obj is created
      this.$refs['investMoreFlag'].hide();
      let obj = {
        investmentId: this.value.investmentId,
        investmentType: this.value.investmentType,
        investmentAmount: this.investmentAmount,
      };
      this.$store.getters.updateInvestmentAmount(obj);
      this.investmentAmount = null;
    },
  },
};
</script>

<style scoped lang="scss">
.marginbottom {
  margin-bottom: 15px;
}
.margintop {
  margin-top: 15px;

  button {
    float: right;
    margin-right: 15px;
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
</style>
