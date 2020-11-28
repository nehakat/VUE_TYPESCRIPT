<template>
  <b-modal
    id="addPortfolioflag"
    ref="addPortfolioflag"
    title="Add Portfolio"
    hide-footer="true"
  >
    <b-form>
      <b-container fluid>
        <b-row class="marginbottom">
          <b-form-select
            v-model="investmentType"
            :options="investmentOptions"
            required
          ></b-form-select>
        </b-row>
        <b-row>
          <b-form-input
            type="number"
            v-model.number="investmentAmount"
            placeholder="Enter amount to invest"
            required
          />
        </b-row>
        <b-row>
          <div class="margintop">
            <b-button variant="danger">Button</b-button>
            <b-button variant="success" v-on:click="amountChange"
              >Button</b-button
            >
            <span v-if="!investmentType || !investmentAmount">{{
              requiredMsg
            }}</span>
          </div>
        </b-row>
      </b-container>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "AddPorfolio",
  data: function() {
    return {
      investmentType: "",
      investmentOptions: [
        { value: null, text: "Please select an option" },
        { value: "Aditya Birla", text: "Aditya Birla" },
        { value: "Axis fund", text: "Axis fund" },
        { value: "Lnt funds", text: "Lnt funds" },
        { value: "SBI blue chp", text: "SBI blue chp" },
      ],
      investmentAmount: "",
      requiredMsg: "",
    };
  },
  created: function() {
    console.log("inside created of add portfolio");
  },
  props: ["addPortfolio"],
  methods: {
    amountChange: function() {
      if (this.investmentType && this.investmentAmount) {
        this.$refs["addPortfolioflag"].hide();
        let obj = {
          investmentId: this.$store.getters.generateCurrentValue.length + 1,
          investmentType: this.investmentType,
          investmentAmount: this.investmentAmount,
        };
        debugger;
        this.$store.dispatch("addInvestment", obj);
        this.$store.dispatch("getInvestmentList", obj);
        this.investmentType = "";
        this.investmentAmount = null;
      } else {
        this.requiredMsg = "Please select investment type and enter amount";
      }
      //   this.$store.commit("change", {
      //     investmentId: this.$store.getters.generateCurrentValue.length + 1,
      //     investmentType: this.investmentType,
      //     investmentAmount: this.investmentAmount,
      //   });
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
