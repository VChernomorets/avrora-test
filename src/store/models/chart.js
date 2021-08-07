import ChartServices from "../../services/ChartServices";

const state = {
    peopleZone: [],
};

const mutations = {
    SET_PEOPLE_ZONE:(state, payload) => {
        state.peopleZone = payload
    },
};

const actions = {
    async getPeopleZone({commit}){
        let {data} = ChartServices.getPeopleZoneData();
        commit('SET_PEOPLE_ZONE', data);
    },
}

const getters = {
    peopleZone: state => state.peopleZone,
}

export default {
    state,
    mutations,
    actions,
    getters
}
