<template>
  <div class="">
    <div class="options">
      <div class="options__option">
        <p>Интервал вывода данных в минутах: </p>
        <input type="number" v-model="step" @input="updateChart" min="1" max="60">
      </div>
      <div class="options__option">
        <p>2 человека более 60 секунд подряд: </p>
        <input type="checkbox" class="custom-checkbox" id="skip">
        <label for="skip" @click="() => {skip = !skip; updateChart()}"/>
      </div>
    </div>
    <vue3-chart-js
        :id="'peopleChart'"
        :type="type"
        ref="peopleChart"
        :data="dataChart"
        :options="options"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  name: "PeopleChart",
  components: {
    Vue3ChartJs,
  },
  props: {
    type: {
      type: String,
    },
    data: {
      type: Array,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String
    }
  },
  data() {
    return {
      peopleChart: null,
      skip: false,
      step: 15,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Отображение графика количества людей в выбранной зоне'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
      dataChart: {
        labels: Object.keys(this.data),
        datasets: [
          {
            label: 'Минимум',
            backgroundColor: 'red',
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: 'Среднее',
            backgroundColor: 'green',
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: 'Максимум',
            backgroundColor: 'blue',
            data: [20, 10, 12, 33, 22, 4, 0, 2]
          }
        ]
      },
    }
  },
  watch: {
    data: function () {
      this.updateChart();
    },
    step: function () {
      if (this.step < 1 && this.step !== '') {
        this.step = 1;
      }
      if (this.step > 60) {
        this.step = 60;
      }
    }
  },
  methods: {
    updateChart: function () {
      let groupData = this.groupData(this.data);
      this.dataChart.labels = groupData.map(group => group.label);
      this.dataChart.datasets[0].data = groupData.map(group => group.data.length > 0 ? Math.min.apply(null, group.data.map(item => item.num)) : 0);
      this.dataChart.datasets[1].data = groupData.map(group => group.data.length > 0 ? group.data.map((item) => item.num).reduce((a, b) => a + b) / group.data.length : 0);
      this.dataChart.datasets[2].data = groupData.map(group => group.data.length > 0 ? Math.max.apply(null, group.data.map(item => item.num)) : 0);
      this.$refs.peopleChart.update();
    },
    groupData(data) {
      let result = [];
      let counter = 0;
      let index = 0;
      data = this.skip ? this.skipGroup(data) : data;

      data.forEach(group => {
        if (!result[index]) {
          result[index] = {
            label: group.time,
            data: [],
          };
        }
        result[index].data = result[index].data.concat(group.data)
        counter++;
        if (counter >= this.step) {
          index++;
          counter = 0;
        }
      })

      if (this.skip) {
        result = result.filter(group => {
          return group.data.length > 0
        })
      }
      return result;
    },
    skipGroup(data) {
      return data.map((group) => {
        return group.data.length && group.data.filter((item) => {
          return item.num === 0
        }).length > 0 ? {time: group.time, data: []} : group;
      })
    },
  },
}
</script>

<style scoped lang="scss">
.options {

  &__option {
    display: flex;
    align-items: center;

    p {
      padding-right: 10px;
      margin: 10px 0;
    }

    input {
      height: max-content;
      border: 1px solid #adb5bd;
      border-radius: 5px;
      padding: 5px;
      outline: none;
    }
  }
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.custom-checkbox + label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

/* стили при наведении курсора на checkbox */
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}

/* стили для активного состояния чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #80bdff;
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}
</style>