<template>
  <div class="wrapper">
    <div class="chart">
      <queue-people :data="peopleZone" :type="'bar'" :start-time="startTime" :end-time="endTime"/>
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
  created() {
    this.$store.dispatch('getPeopleZone')
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