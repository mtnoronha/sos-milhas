<template>
  <div>
    <header>
      <h1>Compra de Pontos</h1>
    </header>

    <div class="field-container">
      <div class="field">
        <label>Custo dos Pontos</label>
        <Money v-model="cost" v-bind="money" />
      </div>

      <div class="field">
        <label>Qntd Pontos.</label>
        <Money v-model="points" decimal="," thousands="." :precision="0" />
      </div>

      <div class="field">
        <label>Transferência Bonificada</label>
        <TheMask
          :mask="['#%', '##%', '###%']"
          v-model="bonus"
          :masked="false"
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
        <p>Custo dos Pontos</p>
        <p>{{ formatCurrency(result.cost) }}</p>

        <p>Qutd. Pontos</p>
        <p>
          {{ formatNumber(result.points) }}
        </p>

        <p>Transferência Bonificada</p>
        <p>{{ result.bonus }}%</p>

        <p>Qutd. Milhas</p>
        <p>
          {{ formatNumber(result.miles) }}
        </p>

        <p>Preço de Venda</p>
        <p>{{ formatCurrency(result.price) }}</p>

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
      cost: undefined,
      points: undefined,
      bonus: 100,
      price: 20,
      results: [],
      money,
    };
  },
  methods: {
    ...formatter,
    calculate() {
      if (!this.points || !this.cost) {
        return;
      }

      const totalMilesAfterBonus =
        this.points + (this.points * this.bonus) / 100;

      const total = (this.price * totalMilesAfterBonus) / 1000;

      this.results.push({
        id: Date.now(),
        cost: this.cost,
        points: this.points,
        bonus: this.bonus,
        price: this.price,
        miles: totalMilesAfterBonus,
        total,
        net: total - this.cost,
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
  grid-template-columns: repeat(3, 33%);
  column-gap: 30px;
  row-gap: 10px;
}

.result-container {
  border: 1px solid white;
  border-radius: 20px;
  padding: 10px;
  display: grid;
  grid-template-columns: 80% 20%;
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
