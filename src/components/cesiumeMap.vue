<script setup>
import * as Cesium from 'cesium';
import { onMounted ,ref,watch} from 'vue';
import { useStore } from 'vuex';
const store = useStore()
onMounted(()=>{
  // const viewer = new Cesium.Viewer('cesiumContainer');

  //储存弹框位置
  let pickObj = undefined
  //记录实体
  let entities ={}
  let custom = new Cesium.ArcGisMapServerImageryProvider({
    url:'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
  })
  window.viewer = new Cesium.Viewer('cesiumContainer',{
    //设置小部件
    baseLayerPicker:false,
    //左下角仪表器
    animation:false,
    //是否显示全屏按钮
    fullscreenButton:false,
    //睡觉哦否显示geocoder小器件，右上角查询按钮
    geocoder:false,
    //是否显示home按钮
    homeButton:false,
    infoBox : false,//是否显示信息框  
    //是否显示3D/2D选择器 
    sceneModePicker : false, 
    //是否显示选取指示器组件 
    selectionIndicator : false,
    //是否显示时间轴  
    timeline : false,
    //是否显示右上角的帮助按钮  
    navigationHelpButton : false, 
    //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源 
    scene3DOnly : true, 
    //用于控制当前时间的时钟对象
    clock : new Cesium.Clock(), 
    //全屏时渲染的HTML元素
    fullscreenElement:document.body,
    //如果需要控制渲染循环，则设为true  
    useDefaultRenderLoop : true,
    //使用默认render loop时的帧率  
    targetFrameRate : undefined,
    //如果设为true，将在一个HTML面板中显示错误信息  
    showRenderLoopErrors : false, 
    //自动追踪最近添加的数据源的时钟设置
    automaticallyTrackDataSourceClocks : true,  
    //传递给Scene对象的上下文参数（scene.options）
    contextOptions : undefined,
    //初始场景模式  
    sceneMode : Cesium.SceneMode.SCENE3D,
    //地图投影体系  
    mapProjection : new Cesium.WebMercatorProjection(),
    //需要进行可视化的数据源的集合  
    dataSources : new Cesium.DataSourceCollection(),  
    //设置图像提供的程序
    imageryProvider:custom,
    //设置地形
    terrainProvider:Cesium.createWorldTerrain({
      requestWaterMask:true,
      requestVertexNormals:true,
    }),

  })

  // 定位到某个点位上
  const boundingSphere = new Cesium.BoundingSphere(
    Cesium.Cartesian3.fromDegrees(120.55538, 31.87532, 100),
    200, // 控制高度
  );
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
    duration: 0,
  });
  // 将地图默认显示的文字和logo 隐藏掉
  viewer._cesiumWidget._creditContainer.style.display = "none";


  // 文字颜色
  const _textColor = "rgb(11, 255, 244)";

  //初始渲染所有实体
  store.commit("initEntities2",store.state.entities)
  store.commit("changeAllCar",entities)
  let nowId = ref(store.state.nowId)
  watch(() => store.state.id,(newValue,oldValue)=>{
    flyToCar2(newValue)
  },{ deep: true })
      function flyToCar2(id){ 
        viewer.scene.postRender.removeEventListener(updatePosition);
        //随着地图拖动实时更新弹框位置
        var info = document.getElementById("carState");
        updatePosition()
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
      }

      function updatePosition2(id){
          var winpos = viewer.scene.cartesianToCanvasCoordinates(viewer.entities.getById(id).position._value);
            // 对位置进行定位
            if(winpos) {
              info.style.left = (winpos.x).toFixed(0) + 'px';
              info.style.top = (winpos.y - 120).toFixed(0) + 'px';
            }
            info.style.display = 'block'
        }
      // 点击车辆的事件
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      let leftclick = Cesium.ScreenSpaceEventType.LEFT_CLICK;
      viewer.screenSpaceEventHandler.removeInputAction(leftclick);
      //取消双击模型事件
      handler.setInputAction(function(movement) {
        viewer.trackedEntity = undefined;
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      // 鼠标左键事件
      handler.setInputAction((e) => {
        store.commit("mapClick")
            pickObj = viewer.scene.pick(e.position,3, 3);
            console.log(pickObj);
            // 判断是否点击到地图上的图标
            if(Cesium.defined(pickObj)){
              if(pickObj.id && pickObj.id instanceof Cesium.Entity&&store.state.nowId !== pickObj.id){
                viewer.scene.postRender.removeEventListener(updatePosition);
                console.log(store.state.nowId)
                store.commit("changeNowId",pickObj.id)
                console.log(pickObj.id.id)
                store.commit("changeId",pickObj.id.id)
                // updatePosition();
                // viewer.scene.postRender.addEventListener(updatePosition);
                console.log('x')
              }
            }else{
              // viewer.scene.postRender.removeEventListener(updatePosition);
              hideInfo()
              store.commit("changeNowId",undefined)
          }
        }, leftclick);

 //随着地图拖动实时更新弹框位置
 function updatePosition(){
    console.log(pickObj.id._position._value)
    var winpos = viewer.scene.cartesianToCanvasCoordinates(pickObj.id._position._value);
    showInfo(viewer.entities.getById(pickObj.id.id),winpos);
  }
  //消除弹框
  function hideInfo() {
    var info = document.getElementById("info");
		info.style.display = 'none';
    pickObj = undefined
	}


  // viewer.camera.setView({
  //   // 设置初始视角
  //   destination:new Cesium.Cartesian3(1332761,-4662399,4137888),
  //   // 方向、俯视和仰视视角
  //   orientation:{
  //     heading:0.60,
  //     pitch:-0.66,
  //   },
  // })
  //引入3d模型
  let city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url:Cesium.IonResource.fromAssetId(75343)}))
  //引入样式
  let heighStyle = new Cesium.Cesium3DTileStyle({
    color:{
      conditions:[
      ['${Height} >= 300','rgba(45,0,75,0.5)'],
      ['${Height} >= 200','rgba(255,255,255,0.5)'],
      ['${Height} >= 100','rgba(170,162,204,0.5)'],
      ['${Height} >= 50','rgba(248,176,87,0.5)'],
      ['${Height} >= 5','rgba(198,106,11,0.5)'],
      ['true','rgba(0,0,0,1)']
    ]
    }
  }) 
  
  city.style = heighStyle
      // 显示弹框信息
			function showInfo(entity,winpos) {
		        var info = document.getElementById("info");
		        // 对位置进行定位
		        if(winpos) {
		          info.style.left = (winpos.x).toFixed(0) + 'px';
		          info.style.top = (winpos.y - 120).toFixed(0) + 'px';
		        }
		        // 显示框里的内容
				info.innerHTML = '';
				info.innerHTML = entity.name;
				info.style.display = 'block';
			}

})

</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <div id="cesiumContainer">
    <div id="info"></div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
html,body,#cesiumContainer{
  width:100%;
  height:100%;
  overflow:hidden;
  margin:0;
  padding:0;
}
#info {
    position: absolute;  
    width: 100px;
    height: 100px;
    z-index: 1000;
    display: none;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid greenyellow;
    border-radius: 4px;
} 
</style>
