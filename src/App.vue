<script setup>
import cesiumeMap from './components/cesiumeMap.vue'
import sidebarMenu from './components/sidebarMenu.vue'
import carState from './components/carState.vue'
import * as Cesium from 'cesium';
import { onMounted } from 'vue';

import { useStore } from 'vuex'
const store = useStore()

getAllData()

//获取全部车、站、干扰源信息
function getAllData(){

  //测试用初始值,上线用axios获取后再更改值
let allData = {
            car:{
            id:0,
            label:"监测车",
            children:[
              {
                id:"xnCar1",
                label:"咸宁车1",
                position:{
                  j: 120.5552,
                  w: 31.87532,
                  direction:31,
                },
                date:"2023-5-5 18:07:06"
              },
              {
                id:"xnCar2",
                label:"咸宁车2",
                position:{
                  j: 120.5554,
                  w: 31.87432,
                  direction:31,
                },
                date:"2023-5-5 18:07:06"
              },
            ]
          },
          station:{
            id:1,
            label:"监测站",
            children:[
              {
                id:"xnStation1",
                label:"咸宁站1",
                position:{
                  j: 120.5532,
                  w: 31.87532,
                },
              },{
                id:"xnStation2",
                label:"咸宁站2",
                position:{
                  j: 120.5540,
                  w: 31.87530,
                },
              }
            ]
          },
          source:{
            id:2,
            label:"干扰源",
            children:[
              {
                id:"source1",
                label:"干扰源1",
                position:{
                  j: 120.5502,
                  w: 31.87522,
                },
              },{
                id:"source2",
                label:"干扰源2",
                position:{
                  j: 120.5440,
                  w: 31.87430,
                },
              }
            ]
          }
        }

  store.commit("initAllData",allData)
}

</script>

<template>
  <sidebarMenu></sidebarMenu>
  <cesiumeMap></cesiumeMap>
  <carState></carState>
</template>

<style scoped>

</style>
