<template>
  <div class="wrapper">
    <div class="chart">
      <queue-people :data="peopleZone" :type="'bar'" :start-time="startTime" :end-time="endTime" />
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import QueuePeople from "../components/chars/QueuePeople";

export default {
  name: "PeopleZone",
  components: {QueuePeople},
  data() {
    return {
      dataGroupedByMinutes: [],
      startTime: '08:00:00',
      endTime: '20:00:00',
    }
  },
  methods: {
    processData: function () {
      let data = this.fillEmptyArray(this.startTime, this.endTime);
      this.peopleZone.forEach((item) => {
        let minutes = this.convertDateToMinutes(item.time);
        if (data[minutes]) {
          data[minutes].data.push(item);
        }
      });
      this.dataGroupedByMinutes = data;
    },
    fillEmptyArray: function (start, end) {
      let emptyArray = [];
      for (let minutes = this.convertTimeToMinutes(start); minutes < this.convertTimeToMinutes(end); minutes++) {
        emptyArray[minutes] = {
          time: `${Math.trunc(minutes / 60)}:${(minutes % 60) > 9 ? minutes % 60 : '0' + minutes % 60}`,
          data: []
        };
      }
      return emptyArray;
    },
    convertDateToMinutes: function (date) {
      return this.convertTimeToMinutes(date.split(' ')[1]);
    },
    convertTimeToMinutes: function (time) {
      time = time.split(':');
      return (+time[0]) * 60 + (+time[1]);
    },
    clearIndex: function (input) {
      let result = [];
      input.forEach((item) => {
        result.push(item)
      })
      return result;
    }
  },
  created() {
    this.$store.dispatch('getPeopleZone').then(() => {
      this.processData();
    });
  },
  computed: mapGetters(['peopleZone']),
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

.chart {
  width: 80vw;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 30px;
  background-color: white;
  border-radius: 30px;
}
</style>