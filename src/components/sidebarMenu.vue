<template>
  <div id="sideBar">
    <el-tree :data="data" :props="props"  node-key="id" @node-click="handleNodeClick">
      <template #default="{ node }">
        <span class="prefix" :class="{ 'is-leaf': node.isLeaf }"
          >[ElementPlus]</span
        >
        <span>{{ node.label }}</span>
      </template>
    </el-tree>
  </div>
  </template>
<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
//使用vuex的store储存空间
const store = useStore()
  function handleNodeClick(data){
    //判断是否已经被选中
    if(store.id !== data.id){
      //改变目前选中id
      store.commit("changeId",data.id)
      store.commit("sideBarClick")
      //镜头移动
      console.log(viewer)
      // store.commit("flyToCar",data.id)
    }
  }
  //获取所有实例信息
  let tempData = ref(store.state.entities)
  let tempArr = []
  console.log(tempData.value)
  for(let key in tempData.value) {
            // console.log(key + '---' +obj[key]);
            let tempUri
           if(tempData.value.hasOwnProperty(key)) {
              if(key === "car"){
                tempArr.push(tempData.value.car)
              }else if(key === "station"){
                tempArr.push(tempData.value.station)
              }else{
                tempArr.push(tempData.value.source)
              }
            }
          }
          console.log(tempArr)
  // let tempData = [{id:0,label:"监测车",children:[{id:"xnCar1",label:"咸宁车1"},{id:"xnCar2",label:"咸宁车2"},{id:"xnCar3",label:"咸宁车3"}]},
  //   {id:1,label:"监测站",children:[{id:"xnStation1",label:"咸宁站1"},{id:"xnStation2",label:"咸宁站2"},{id:"xnStation3",label:"咸宁站3"}]},
  //   {id:2,label:'信号源',children:[{id:"source1",label:"信号源1"},{id:"source2",label:"信号源2"},{id:"source3",label:"信号源3"}]}
  // ]
  
  const props = {
    value: 'id',
    label: 'label',
    children: 'children',
  }
  // const data = createData(4, 30, 40)
  const data = tempArr
  console.log(data)
  </script>
  
  <style scoped>
  .prefix {
    color: var(--el-color-primary);
    margin-right: 10px;
  }
  .prefix.is-leaf {
    color: var(--el-color-success);
  }
  #sideBar{
    position: absolute;
    background-color: rgba(0,0,0,0);
    z-index: 1000;
    width:300px;
    min-height:100%;

  }
  #sideBar>.el-tree{
    background-color: rgba(0,0,0,0.5);
    color:rgb(255, 255, 255);
    height:100vh;
  }
  .el-vl__window.el-tree-virtual-list{
    height: 100vh;
  }
  </style>
  