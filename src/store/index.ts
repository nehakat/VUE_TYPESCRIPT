import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import Firebase from "firebase";
var config = {
  apiKey: "AIzaSyDnYk_HqKV9oBOyoUVM508OQm5g-4EcKX0",
  authDomain: "newvue-b62d3.firebaseapp.com",
  databaseURL: "https://newvue-b62d3.firebaseio.com",
  projectId: "newvue-b62d3",
  storageBucket: "newvue-b62d3.appspot.com",
  messagingSenderId: "1062894052011",
  appId: "1:1062894052011:web:9654b47e2b87724c1c8dee",
  measurementId: "G-7M074JRLZS"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


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

const app = Firebase.initializeApp(config);
const db = app.database();
const stocksRef = db.ref("stock");

Vue.use(Vuex)

interface investmentTypeDetail {
  key: string,
  investmentId: number,
  investmentType: string,
  investmentAmount: number,
  currentValue: number,
}

let objType: investmentTypeDetail[] = [];
export default new Vuex.Store({
  state: {
    investmentDetails: objType,
    totalInvestment: 0,
    totalCurrentValue: 0,
    stocksRef: stocksRef
  },
  mutations: {
    change(state, investmentDetail) {
      debugger;
      state.investmentDetails = investmentDetail
    },
    updateInvestmentAmount(state, obj) {
      state.investmentDetails.filter((inv) => {
        if (inv.investmentId == obj.investmentId) {
          inv.investmentAmount += obj.investmentAmount;
        }
      });
    },
  },
  actions: {
    async getInvestmentList({ commit }, context) {
      stocksRef.once("value").then((data) => {
        const investmentList: investmentTypeDetail[] = [];
        data.forEach((item) => {
          let childData = item.val();
          childData["key"] = item.key;

          console.log('childData', childData);
          investmentList.push({
            key: childData.key,
            currentValue: childData.currentValue,
            investmentId: childData.investmentId,
            investmentType: childData.investmentType,
            investmentAmount: childData.investmentAmount,
          });
        });
        commit("change", investmentList);
      });
    },
    async addInvestment({ commit }, payload) {
      console.log(payload);
      stocksRef.push(payload);
    }
  },
  getters: {
    investmentDetails: (state) => state.investmentDetails,
    generateCurrentValue: function (state) {
      let current = 0;
      let abc = state.investmentDetails.map((investment) => {
        // let xu;

        let currentValue: number = Math.floor((Math.random() + 0.5) * (investment.investmentAmount));
        current = current + currentValue;
        //   currentValue = currentValue + inv.currentValue;
        console.log('total current values', current);
        state['totalCurrentValue'] = current;
        console.log("currentValue",   currentValue);
        return ({ investmentId: investment.investmentId, investmentType: investment.investmentType, investmentAmount: investment.investmentAmount, currentValue: currentValue })
      });
      // console.log(abc);
      return abc;
    },
    updateInvestmentAmount: (state) => (obj: investmentTypeDetail) => {
      state.investmentDetails.filter((inv) => {
        if (inv.investmentId == obj.investmentId) {
          console.log('obj["investmentAmount"]', obj["investmentAmount"])
          debugger;
          inv.investmentAmount = inv.investmentAmount + obj.investmentAmount;
          debugger;
          console.log('keys inside', inv.key);
          let key = inv.key;
          stocksRef.child(key).update({
            investmentAmount: inv.investmentAmount
          });
        }
        console.log(inv["investmentAmount"])
        return inv;
      });
    },
    getTotalInvestment: function (state) {
      let totalInvestment: number = 0;
      state.investmentDetails.forEach((inv) => {
        totalInvestment = totalInvestment + inv.investmentAmount;
        console.log('state.totalInvestment', state.totalInvestment);

      });
      return totalInvestment;
    },
    // getCurrentValue: function (state) {
    //   let currentValue: number = 0;
    //   state.investmentDetails.forEach((inv) => {
    //     console.log('current value', inv.currentValue);
    //     currentValue = currentValue + inv.currentValue;
    //     console.log('state.totalInvestment', currentValue);

    //   });
    //   return currentValue;
    // },
  },

})
