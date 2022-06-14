<template>
  <div>
    <header>
      <h1>Venda de Milhas</h1>
    </header>

    <div class="field-container">
      <div class="field">
        <label>Custo do Milheiro</label>
        <Money v-model="cost" v-bind="money" />
      </div>

      <div class="field">
        <label>Milheiro Qntd.</label>
        <TheMask
          :mask="['#', '##', '###', '####']"
          v-model="milesInThousands"
        />
      </div>

      <div class="field">
        <label>Preço de Venda (Milheiro)</label>
        <Money v-model="price" v-bind="money" />
      </div>

      <button id="calc-btn" @click="calculate">Calcular</button>
    </div>

    <button id="clean-btn" v-if="results.length > 0" @click="results = []">
      Limpar
    </button>

    <div class="results">
      <div class="result-container" v-for="result in results" :key="result.id">
        <p>Custo do Milheiro</p>
        <p>{{ formatCurrency(result.cost) }}</p>

        <p>Custo Total</p>
        <p>{{ formatCurrency(result.totalCost) }}</p>

        <p>Preço de Venda</p>
        <p>{{ formatCurrency(result.price) }}</p>

        <p>Qutd. Milhas (milheiro)</p>
        <p>
          {{ result.milesInThousands }}
        </p>

        <p>Receita Bruta</p>
        <p>{{ formatCurrency(result.total) }}</p>

        <p>Lucro/Prejuizo</p>
        <p>{{ formatCurrency(result.net) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";
import { TheMask } from "vue-the-mask";
import money from "../components/money-config";
import formatter from "../components/formatter";

export default {
  components: {
    Money,
    TheMask,
  },
  data() {
    return {
      cost: 18.5,
      milesInThousands: undefined,
      price: 20,
      results: [],
      money,
    };
  },
  methods: {
    ...formatter,
    calculate() {
      if (!this.milesInThousands) {
        return;
      }

      const totalCost = this.milesInThousands * this.cost;
      const total = this.milesInThousands * this.price;

      this.results.push({
        id: Date.now(),
        cost: this.cost,
        milesInThousands: this.milesInThousands,
        price: this.price,
        total,
        totalCost,
        net: total - totalCost,
      });
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

input {
  width: fit-content;
}

h1,
h2 {
  color: #bf0713;
}

#calc-btn {
  width: 80px;
  height: 40px;
}

#clean-btn {
  margin: 10px;
}

.field-container {
  display: grid;
  grid-template-columns: repeat(4, 20%) 90px;
  place-items: center;
}

.results {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  column-gap: 30px;
  row-gap: 10px;
}

.result-container {
  border: 1px solid white;
  border-radius: 20px;
  padding: 10px;
  display: grid;
  grid-template-columns: 75% 25%;
}

.result-container p {
  margin: 0;
  margin-bottom: 5px;
}

.result-container p:nth-child(even) {
  text-align: right;
}

.field {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

@media all and (max-width: 700px) {
  #calc-btn {
    place-self: center;
  }

  .field-container {
    grid-template-columns: 100%;
    place-items: start;
  }

  .results {
    grid-template-columns: 100%;
  }
}
</style>
