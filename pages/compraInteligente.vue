<template>
  <div>
    <header>
      <h1>Compra Inteligente</h1>
    </header>
    <div class="field-container">
      <div class="field">
        <label>Preço do Produto: </label>
        <Money v-model="price" v-bind="money" />
      </div>

      <div class="field">
        <label>Qntd. de Pontos por Real</label>
        <TheMask :mask="['#', '##', '###']" v-model="points" />
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
        <label>Preço deVenda Milheiro</label>
        <Money v-model="milePrice" v-bind="money" />
      </div>

      <button id="calc-btn" @click="calculate">Calcular</button>
    </div>

    <button id="clean-btn" v-if="results.length > 0" @click="results = []">
      Limpar
    </button>

    <div class="results">
      <div class="result-container" v-for="result in results" :key="result.id">
        <p>O valor inicial do produto</p>
        <p>{{ formatCurrency(result.price) }}</p>

        <p>total de pontos ganhos</p>
        <p>
          {{ formatNumber(result.totalPoints) }}
        </p>

        <p>Transferência Bonificada</p>
        <p>{{ result.bonus }}%</p>

        <p>Venda 1k milhas</p>
        <p>
          {{ formatCurrency(result.milePrice) }}
        </p>

        <p>Total de Milhas:</p>
        <p>{{ formatNumber(result.totalMilesAfterBonus) }}</p>

        <p>Valor recuperado:</p>
        <p>{{ formatCurrency(result.rebateValue) }}</p>

        <p>Desconto em porcentagem:</p>
        <p>{{ result.discountInPercent }}%</p>

        <p>Valor final do produto</p>
        <p>{{ formatCurrency(result.finalValue) }}</p>
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
      price: 250,
      points: 10,
      bonus: 100,
      milePrice: 20,
      money,
      results: [],
    };
  },
  methods: {
    ...formatter,
    calculate() {
      if (this.price == 0) {
        return;
      }

      const totalPoints = this.price * this.points;
      const totalMilesAfterBonus =
        totalPoints + (totalPoints * this.bonus) / 100;
      const rebateValue = (this.milePrice * totalMilesAfterBonus) / 1000;
      const discountInPercent = (rebateValue / this.price) * 100;

      this.results.push({
        id: Date.now(),
        price: this.price,
        totalPoints,
        bonus: this.bonus,
        totalMilesAfterBonus,
        milePrice: this.milePrice,
        rebateValue,
        discountInPercent,
        finalValue: this.price - rebateValue,
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
