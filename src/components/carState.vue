<template>
    <div id="carState">
        <div id="carStateClose">X</div>
        <div>名称：{{state.nowCar.label}}</div>
        <div>经度：{{state.nowCar.position.j}}</div>
        <div>纬度：{{state.nowCar.position.w}}</div>
        <div>地址：null</div>
        <div @click="xxx">时间：{{state.nowCar.date}}</div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref,watch } from 'vue'
//使用vuex的store储存空间
const store = useStore()
const state= ref({ nowCar:store.state.nowCar })
console.log(store.state.nowCar)
watch(()=>store.state.nowCar,(newx)=>{
  console.log("bianle")
  state.value.nowCar =  newx
},{deep:true})
function xxx(){
  console.log("store.state.nowCar")
    console.log(store.state.nowCar)
    // state.value.nowCar = {id:"xnCar1",
    //       label:"咸宁车1",
    //       position:{
    //         j: 120.5552,
    //         w: 31.87532,
    //         direction:31,
    //       },
    //       date:"2023-5-5 18:07:36"
    //     }
    state.value.nowCar =  store.state.nowCar
}
  </script>
  
  <style scoped>
#carState {
    position: absolute;  
    width: 300px;
    height: 200px;
    z-index: 10000;
    display: none;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid greenyellow;
    border-radius: 4px;
} 
#carStateClose{
    position: absolute;
    right:0px;
    top:0px;
    background: blanchedalmond;
    cursor: pointer
}
  </style>
  