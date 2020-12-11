<template>
  <div class="calculator">
    <div class="toggle">
      <p @click="toggleCalculator">Toggle calculator</p>
    </div>
    <div v-if="showCalculator" class="calculatorBody">
      <div class="display">{{ display }}</div>
      <div class="btn" @click="clear">A/C</div>
      <div class="btn" @click="switchSign">+/-</div>
      <div class="btn" @click="percent">%</div>
      <div class="btn" @click="divide">/</div>
      <div class="btn" @click="append('7')">7</div>
      <div class="btn" @click="append('8')">8</div>
      <div class="btn" @click="append('9')">9</div>
      <div class="btn" @click="multiply">X</div>
      <div class="btn" @click="append('4')">4</div>
      <div class="btn" @click="append('5')">5</div>
      <div class="btn" @click="append('6')">6</div>
      <div class="btn" @click="subtract">-</div>
      <div class="btn" @click="append('1')">1</div>
      <div class="btn" @click="append('2')">2</div>
      <div class="btn" @click="append('3')">3</div>
      <div class="btn" @click="add">+</div>
      <div class="btn zero" @click="append('0')">0</div>
      <div class="btn" @click="decimal">.</div>
      <div class="btn" @click="equals">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      showCalculator: false,
      display: '0',
      currentNumbers: [],
      previousNumber: undefined,
      operator: undefined,
    };
  },
  methods: {
    toggleCalculator() {
      if (this.showCalculator == false) {
        this.showCalculator = true;
      } else {
        this.showCalculator = false;
      }
    },
    clear() {
      this.display = '0';
      this.currentNumbers = [];
    },
    join() {
      this.display = this.currentNumbers.join('');
    },
    append(number) {
      this.currentNumbers.push(number);
      this.join();
    },
    percent() {
      this.display = this.display / 100;
      this.currentNumbers = [];
    },
    switchSign() {
      if (
        this.currentNumbers.includes('-') &&
        this.currentNumbers.length !== 0
      ) {
        this.currentNumbers.shift();
        this.join();
      } else if (
        !this.currentNumbers.includes('-') &&
        this.currentNumbers.length !== 0
      ) {
        this.currentNumbers.unshift('-');
        this.join();
      } else if (
        Math.sign(this.display) == -1 &&
        this.currentNumbers.length == 0
      ) {
        this.display = Math.abs(this.display);
      } else if (
        Math.sign(this.display) == 1 &&
        this.currentNumbers.length == 0
      ) {
        this.display = -Math.abs(this.display);
      }
    },
    decimal() {
      if (!this.currentNumbers.includes('.') && this.display == '0') {
        this.currentNumbers.push('0.');
      } else if (!this.currentNumbers.includes('.')) {
        this.currentNumbers.push('.');
      } else if (this.currentNumbers.includes('.')) {
        this.join();
      }
      this.join();
    },
    // Math equations
    switch() {
      this.previousNumber = this.display;
      this.currentNumbers = [];
      this.display = '0';
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.switch();
    },
    multiply() {
      this.operator = (a, b) => a * b;
      this.switch();
    },
    subtract() {
      this.operator = (a, b) => a - b;
      this.switch();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.switch();
    },
    equals() {
      this.display = this.operator(
        Number(this.previousNumber),
        Number(this.display)
      );
      this.previousNumber = undefined;
      this.currentNumbers = [];
    },
  },
};
</script>

<style scoped>
.calculator {
  border: solid 2pt red;
  background-color: white;
  width: 315px;
}
.toggle {
  text-align: center;
}
p {
  color: red;
  cursor: pointer;
}
.calculatorBody {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px auto);
  margin: auto;
  font-size: 25px;
  width: 275px;
  border: 1pt solid green;
  margin-bottom: 20px;
  padding: 0 7px 7px 7px;
}
.display {
  grid-column: 1 / 5;
  text-align: end;
  font-size: 20px;
}
.zero {
  grid-column: 1 / 3;
}
.btn {
  cursor: pointer;
  border: 1pt solid black;
  color: black;
  text-align: center;
}
</style>
