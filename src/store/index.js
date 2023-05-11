import { createStore, createLogger } from 'vuex'
import * as Cesium from 'cesium';
export default createStore({
    state () {
        return {
          id:"",
          nowId:'',//聚焦的车辆实例
          nowCar:{id:"xnCar1",
          label:"咸宁车1",
          position:{
            j: 120.5552,
            w: 31.87532,
            direction:31,
          },
          date:"2023-5-5 18:07:06"
        },
          entities:{
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
          }
        },
          
            // {id:2,label:'信号源',children:[{id:"source1",label:"信号源1"},{id:"source2",label:"信号源2"},{id:"source3",label:"信号源3"}]}
          
          count: 0,
          viewer:{},
          allCar:{},
          allStattion:{},
          allScore:{},
          temptest:{},
          whichClick:''
        }
    },
    mutations: {
      //初始改变全体车辆、站、信号源位置
      initAllData(state,allData){
        state.entities = allData
      },
      sideBarClick(state){
        state.whichClick = "sideBar"
      },
      mapClick(state){
        state.whichClick = "map"
      },
      updatePosition(state,id){
        var winpos = viewer.scene.cartesianToCanvasCoordinates(viewer.entities.getById(id).position._value);
        var info = document.getElementById("carState");
          // 对位置进行定位
          if(winpos) {
            info.style.left = (winpos.x).toFixed(0) + 'px';
            info.style.top = (winpos.y - 120).toFixed(0) + 'px';
          }
          // 显示框里的内容
          // info.innerHTML = '';
          // info.innerHTML = viewer.entities.getById(id).name;
          // info.style.display = 'block';

      },
      flyToCar(state,id){ 
        viewer.scene.postRender.removeEventListener(updatePosition);
        //随着地图拖动实时更新弹框位置
        state.nowId = id
        var info = document.getElementById("carState");
        function updatePosition(){
          var winpos = viewer.scene.cartesianToCanvasCoordinates(viewer.entities.getById(id).position._value);
            // 对位置进行定位
            if(winpos) {
              info.style.left = (winpos.x).toFixed(0) + 'px';
              info.style.top = (winpos.y - 120).toFixed(0) + 'px';
            }
            info.style.display = 'block'
        }
        
        let carStateClose = document.getElementById("carStateClose");
        //监听渲染，实时更新弹框位置
        viewer.scene.postRender.addEventListener(updatePosition)
        carStateClose.addEventListener('click',function(){
          viewer.scene.postRender.removeEventListener(updatePosition)
          info.style.display = 'none';
        })
        //通过id获取实例，将镜头转移到实例位置
        viewer.flyTo(viewer.entities.getById(id),{
          duration:1,
          offset:new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0.0),Cesium.Math.toRadians(-45.0),2000)
        })
        // viewer.camera.flyTo(state.entities[id].position)
      },
        increment (state) {
          state.count++
        },
        changeId(state,id){
          state.id = id
          //选择正确的信息
          function nowC(){
            let temp
            if(id.includes("Car")){
              temp = state.entities.car.children
            }else if(id.includes("Station")){
                temp = state.entities.station.children
              }else{
                temp = state.entities.source.children
              }
              for(let i=0;i<temp.length;i++){
                console.log(temp[i].id)
                if(temp[i].id === id){
                  return temp[i]
                }
              }
            
          }
          state.nowCar = nowC()
          let data = Object.assign({},state.nowCar,nowC())
          state.nowCar = data
        },
        changeAllCar(state,id){
          state.allCar = id
        },
        changeNowId(state,nowId){
          state.nowId = nowId
          console.log("change"+nowId)
        },
        //第一次获取到车辆数据时执行
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
          }
        },
        initEntities2(state,allData){
          for(let key in allData) {
            // console.log(key + '---' +obj[key]);
            let tempUri
           if(allData.hasOwnProperty(key)) {
              if(key === "car"){
                tempUri = '/src/assets/car.glb'
              }else if(key === "station"){
                tempUri = '/src/assets/tower.glb'
              }else{
                tempUri = '/src/assets/source.glb'
              }
            }
            let entity = allData[key].children
            console.log(entity)
            for(let i = 0; i < entity.length; i++){
              viewer.entities.add({
                id: entity[i].id, // id 为唯一的
                name: entity[i].label, // 名字
                position: Cesium.Cartesian3.fromDegrees(entity[i].position.j, entity[i].position.w), // 广告牌在地图上的位置,@params(经度{Number},维度{Number},高度{Number})
                model:{
                  uri:tempUri,
                  minimumPixelSize: 128,
                  maximumScale: 4,
                },
            // 图标下的点 pixelSize为大小
                point: {
                  pixelSize: 5
                },
            // 标签名
                label: {
                  // show: false,
                  text:entity[i].label,
                  font: "12px monospace",
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                  // fillColor: Cesium.Color.LIME,
                  fillColor: Cesium.Color.fromCssColorString("rgb(11, 255, 244)"),
                  outlineWidth: 4,
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                  pixelOffset: new Cesium.Cartesian2(0, -25), // 偏移量 文字处于 (1,2) 1、正为右，负为左，2、上为负，下为正
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,6000),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY,//设置在模型上方
                },
              })
            }
          }
        }
      },
      actions:{
      
      }
    })