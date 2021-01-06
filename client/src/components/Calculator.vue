<template>
  <div
    class="calculator"
    :class="{ unopenedCalc: hideCalculator }"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div class="toggle" v-if="hideCalculator">
      <div @click="openCalculator"><i class="fas fa-calculator fa-2x"></i></div>
    </div>
    <div class="toggle" v-if="showCalculator">
      <p @click="closeCalculator">Toggle calculator</p>
    </div>
    <div v-if="showCalculator" class="calculatorBody">
      <div class="display">{{ display }}</div>
      <div class="btn special" @click="clear">A/C</div>
      <div class="btn special" @click="switchSign">+/-</div>
      <div class="btn special" @click="percent">%</div>
      <div class="btn operator" @click="divide">/</div>
      <div class="btn  number" @click="append('7')">7</div>
      <div class="btn  number" @click="append('8')">8</div>
      <div class="btn  number" @click="append('9')">9</div>
      <div class="btn operator" @click="multiply">X</div>
      <div class="btn  number" @click="append('4')">4</div>
      <div class="btn  number" @click="append('5')">5</div>
      <div class="btn  number" @click="append('6')">6</div>
      <div class="btn operator" @click="subtract">-</div>
      <div class="btn  number" @click="append('1')">1</div>
      <div class="btn  number" @click="append('2')">2</div>
      <div class="btn  number" @click="append('3')">3</div>
      <div class="btn operator" @click="add">+</div>
      <div class="btn zero" @click="append('0')">0</div>
      <div class="btn  number" @click="decimal">.</div>
      <div class="btn operator" @click="equals">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      showCalculator: false,
      hideCalculator: true,
      display: '0',
      currentNumbers: [],
      previousNumber: undefined,
      operator: undefined,
      width: 60,
      height: 60,
    };
  },
  methods: {
    // Toggling component methods
    openCalculator() {
      this.showCalculator = true;
      this.hideCalculator = false;
      this.width = 315;
      this.height = 320;
    },
    closeCalculator() {
      this.showCalculator = false;
      this.hideCalculator = true;
      this.width = 60;
      this.height = 60;
    },
    // Calculator methods
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
/* Main calculator component wrapper styling */
.calculator {
  border: solid 2pt black;
  background-color: white;
}
.unopenedCalc {
  border: solid 1pt black;
  background-color: rgba(255, 255, 255, 0.5);
}
.unopenedCalc:hover {
  border: solid 2pt black;
  background-color: white;
}
.toggle {
  text-align: center;
}
.toggle div {
  cursor: pointer;
  margin-top: 10px;
}
p {
  color: black;
  cursor: pointer;
  margin: 3px 0;
}

/* Calculator styling */
.calculatorBody {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px auto);
  margin: auto;
  font-size: 25px;
  width: 275px;
  border: 1.5pt solid grey;
  padding: 0 7px 7px 7px;
  background-color: black;
  color: white;
}
.display {
  grid-column: 1 / 5;
  text-align: end;
  font-size: 20px;
  background-color: grey;
  margin: 5px 0 3px 0;
  padding-right: 5px;
}
.btn {
  color: white;
  cursor: pointer;
  text-align: center;
  margin: 2pt;
}
.zero {
  grid-column: 1 / 3;
  background-color: rgb(75, 75, 75);
}
.operator {
  background-color: orange;
}
.number {
  background-color: rgb(75, 75, 75);
}
.special {
  background-color: lightgray;
  color: black;
}
</style>
