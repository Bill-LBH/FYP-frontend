
<template>
  <div style="width: 100%;height: 100%;">
    <Select v-model="modelSel" style="width:200px;margin-bottom:1%;" @on-change="changeSel">
      <Option v-for="(item,index) in videoArr" :value="item.id" :key="index">{{ item.label }}</Option>
    </Select>
    <div class="testTracking">

      <!--canvas截取流-->
      <canvas style="display:none; margin-left: 900px" ref="canvas" :width="videoWidth" :height="videoHeight"></canvas>
      <!--图片展示-->
      <video ref="video" id="video" :width="videoWidth" :height="videoHeight" autoplay style="display: block; margin-left: 900px"></video>
      <canvas id="canvas"  :width="videoWidth" :height="videoHeight" style="margin-left: 900px"></canvas>
      <!--开启摄像头-->
      <el-button  type="primary" style="width: 120px;margin-top: 400px" @click="callCamera">Open camera</el-button>
      <!--关闭摄像头-->
      <el-button  type="primary"  @click="closeCamera" style="margin-top: 450px;width: 120px">Close camera</el-button>
      <el-button  type="primary"  @click="setImage" style="margin-top: 500px;width: 120px">Take picture</el-button>
      <!--确认-->
      <img :src="imgBase64" alt="" class="tx_img" style="margin-left: 200px;width: 450px;height: 300px">
    </div>



  </div>
</template>
<script>
require("tracking/build/tracking-min.js");
require("tracking/build/data/face-min.js");
require("tracking/build/data/mouth-min.js");
require("tracking/examples/assets/stats.min.js");
export default {
  props:['src'],
  data () {
    return {
      videoWidth: 450,
      videoHeight: 300,
      videoArr:[],//所有的摄像头
      modelSel:'',//
      myInterval: null,
      imgSrc: '',
      imgBase64:'',
      isHasFace:false,//默认没有人脸
      tracker:null,
    }
  },
  created(){
  },
  mounted(){
    this.callCamera();
    this.changePhoto();
    this.checkFace();
    if(this.src!='user'){
      this.myInterval = setInterval(()=>{
        this.setImage();
      },2000)
    }
  },
  methods: {
    // 调用摄像头
    callCamera () {
      // H5调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },
    // 拍照
    setImage () {
      console.log(this.isHasFace);
      if(!this.isHasFace){
        return false;
      }
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0,  this.videoWidth, this.videoHeight)
      // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      // let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg');
      // this.imgSrc = imgBase64;
      // this.$emit('refreshDataList', imgBase64)
      // return true;
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);
      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      this.base64 = str;
      this.request.post("/img",this.base64).then(res=>{
        this.acc = res.acc;
      })
      // const { data: res } = await this.$http.post("/img", this.base64);
      /**------------到这里为止，就拿到了base64位置的地址，后面是下载功能----------*/

      // // 由字节转换为KB 判断大小
      // let str = imgBase64.replace('data:image/jpeg;base64,', '')
      // let strLength = str.length
      // let fileLength = parseInt(strLength - (strLength / 8) * 2)　　　 // 图片尺寸  用于判断
      // let size = (fileLength / 1024).toFixed(2)

      // // 保存到本地
      // let ADOM = document.createElement('a')
      // ADOM.href = this.imgSrc
      // ADOM.download = new Date().getTime() + '.jpeg'
      // ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },


    //切换本地摄像头
    changePhoto(){
      /**得到所有的设备*/
      navigator.mediaDevices.enumerateDevices()
          .then((devices)=> {
            console.log(devices)
            this.videoArr = [];
            devices.forEach((device)=> {
              if(device.kind == 'videoinput'){
                this.videoArr.push({
                  'label': device.label,
                  'id': device.deviceId
                })
              }

            });
          })
          .catch(function(err) {
            layer.msg(err.name + ": " + err.message);
          });
    },
    //切换下拉
    changeSel(val){
      const videoConstraints = {};
      if (val === '') {
        videoConstraints.facingMode = 'environment';
      } else {
        videoConstraints.deviceId = { exact: val };
      }
      var constraints = {
        video: videoConstraints,
      };
      this.getUserMedia(constraints);

    },

    /**打开摄像头*/
    getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success=>{
          // 摄像头开启成功
          this.$refs['video'].srcObject = success
          // 实时拍照效果
          this.$refs['video'].play()
        }).catch(error);

      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints,success, error)
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },


    /**
     * 检查取景框是否有人脸
     * */
    checkFace() {
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      this.tracker = new tracking.ObjectTracker("face");
      this.tracker.setInitialScale(4);
      this.tracker.setStepSize(2);
      this.tracker.setEdgesDensity(0.1);
      this.trackerTask = tracking.track("#video",  this.tracker, { camera: true });
      let self = this;
      this.tracker.on("track", event=> {
        if (event.data.length <= 0) {
          self.setFace(false);
          return;
        }
        self.setFace(true);
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function (rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
    },
    setFace(data){
      this.isHasFace = data;
    }



  },

  beforeDestroy () {
    clearInterval(this.myInterval);
    // 停止侦测
    this.trackerTask.stop();
  }

}
</script>
<style lang="less" scoped>
.testTracking {
  min-height: 700px;
  width: 100%;
  position: relative;
  > * {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  video,
  canvas {
    top: 0;
  }
  .buttonDiv {
    bottom: 10px;
  }
}
</style>