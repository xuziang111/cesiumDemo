import { createStore, createLogger } from 'vuex'
import * as Cesium from 'cesium';
export default createStore({
    state () {
        return {
          id:"",
          nowId:'',//聚焦的车辆id
          entities:{},
          count: 0,
          viewer:{},
          allCar:{},
          allStattion:{},
          allScore:{}
        }
    },
    mutations: {
      flyToCar(state,id){
        console.log(id)
        console.log(viewer.entities.getById("xnCar2"))
        console.log('xxxx')
        viewer.flyTo(viewer.entities.getById(id),{
          duration:1
        })
        // viewer.camera.flyTo(state.entities[id].position)
      },
        increment (state) {
          state.count++
        },
        changeId(state,id){
          state.id = id
          console.log("change"+id)
        },
        // changeAllCar(state,id){
        //   state.allCar[id.id] = id.entities
        //   console.log('xxx')
        //   console.log(entities)
        // },
        changeAllCar(state,id){
          state.allCar = id
        },
        changeNowId(state,nowId){
          state.nowId = nowId
          console.log("change"+nowId)
        },
        initEntities(state,shuj){
          for(let i = 0; i < shuj.length; i++){
            // 添加实体的api
            console.log(viewer)
            state.entities[shuj[i].id]=viewer.entities.add({
              id: shuj[i].id, // id 为唯一的
              name: shuj[i].name, // 名字
              position: Cesium.Cartesian3.fromDegrees(shuj[i].j, shuj[i].w), // 广告牌在地图上的位置,@params(经度{Number},维度{Number},高度{Number})
              billboard: {
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 广告牌的对齐方式
                image: shuj[i].img, // 图片需要放在public/assets下
                width: 18,
                height: 24,
              },
              // 图标下的点 pixelSize为大小
              point: {
                pixelSize: 5
              },
              // 标签名
              label: {
                // show: false,
                text:shuj[i].name,
                font: "12px monospace",
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // fillColor: Cesium.Color.LIME,
                fillColor: Cesium.Color.fromCssColorString("rgb(11, 255, 244)"),
                outlineWidth: 4,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -25), // 偏移量 文字处于 (1,2) 1、正为右，负为左，2、上为负，下为正
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,6000),
              },
            });
        // console.log(entities[shuj[i].id])
        
            // store.commit("changeAllCar",{
            //   id:shuj[i].id,
            //   entities:entities[shuj[i].id]
            // })
        
          }
        }
    },
    actions:{
      
    }
})