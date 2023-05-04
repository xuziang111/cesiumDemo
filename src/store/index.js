import { createStore, createLogger } from 'vuex'

export default createStore({
    state () {
        return {
          id:"",
          count: 0,
          allCar:{},
          allStattion:{},
          allScore:{}
        }
    },
    mutations: {
        increment (state) {
          state.count++
        },
        changeId(state,id){
          state.id = id
          console.log("change"+id)
        }
    }
})