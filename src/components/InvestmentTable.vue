<template>
  <div>
    <b-table
      striped
      hover
      :items="$store.getters.generateCurrentValue"
      :fields="fields"
    >

    <template #cell(currentValue)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>

      <template v-slot:cell(addAmount)="data">
        <b-button
          size="sm"
          @click="investMore(data.item)"
          class="mr-1"
          variant="success"
          v-b-modal.investMoreFlag
        >
          Invest More
        </b-button>
      </template>
    </b-table>
    <InvestMore v-model="investmentObj" />
  </div>
</template>

<script>
import InvestMore from "./InvestMore.vue";
export default {
  name: "InvestmentTable",
  data: function() {
    return {
      investmentObj: {},
      fields: [
        {
          key: "investmentType",
          label: "Investment Type",
        },
        {
          key: "investmentAmount",
          label: "Investment Amount",
        },
        {
          key: "currentValue",
          label: "Current Value",
        },
        {
          key: "addAmount",
          label: "Action",
        },
      ],
    };
  },

  //   props: ["addPortfolio"],
  methods: {
    investMore: function(data) {
      this.investmentObj = { ...data };
      console.log(this.investmentObj["investmentId"], "this.investmentObj");
    },
  },
  components: { InvestMore },
};
</script>

<style scoped lang="scss">
.marginbottom {
  margin-bottom: 15px;
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
