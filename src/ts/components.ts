//通用按鈕
Vue.component('c-button', {
  template: `
    <button 
      class="c-button"
      :class="{
        'c-button--disabled': disabled,
        'c-button--round': round,
      }"
      :type="type"
      @click="handleClick"
      :disabled="disabled"
    >
      <i class="fas fa-spinner fa-pulse" v-if="loading"></i>
      <i :class="icon" v-if="icon && !loading"></i>
      <span><slot>按鈕</slot></span>
    </button>
  `,
  props: {
    type: {
      type: String,
      default: "button"
    },
    icon: {
      type: String,
      default: ""
    },
    loading: Boolean,
    disabled: Boolean,
    round: Boolean,
  },
  methods: {
    handleClick(evt) {
      if(this.disabled) return;
      this.$emit('click', evt);
    }
  }
})

//通用input表單
Vue.component('c-input', {
  template: `
    <input 
      type="text" 
      :placeholder="placeholder" 
      :required="required" 
      :value="value" 
      @input="$emit('input', $event.target.value)"
    >
  `,
  props: {
    placeholder: {
      type: String,
      default: "請輸入此欄位"
    },
    value: String,
    required: Boolean
  },
  methods: {
  },
})

//通用checkbox表單
Vue.component('c-checkbox', {
  template: `
    <input
      class="c-checkbox"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
})

//通用radio表單
Vue.component('c-radio', {
  template: `
    <input
      class="c-checkbox"
      type="radio"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
})

//通用通知
Vue.component('c-notify', {
  template: `
    <div :class="type" class="c-notify">
      <i :class="iconClass" class="icon fl"/>
      <span>{{ msg }}</span>
      <span class="close fr eqf-no" @click="close"></span>
    </div>
  `,
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClass() {
      switch (this.type) {
        case 'success':
          return 'eqf-info-f'
        case 'fail':
          return 'eqf-no-f'
        case 'info':
          return 'eqf-info-f'
        case 'warn':
          return 'eqf-alert-f'
      }
    }
  },
  mounted() {
    setTimeout(() => this.close(), 4000)
  },
  methods: {
    close() {
    }
  }
})

//圖形驗證碼
Vue.component('c-captcha', {
  template: `
    <div class="c-captcha">
      <canvas id="verify-canvas" ref="verifyCanvas" width="126" height="48"></canvas>
      <img id="captcha-img" ref="captchaImg">
      <input id="verify-hidden" ref="verifyHidden" type="hidden" v-model="verify">
      <div id="refresh" ref="refresh" v-if="hasRefresh">
        <i class="refresh fas fa-sync-alt"></i>
      </div>
    </div>
  `,
  mounted() {
    this.captchaInit();
  },
  data() {
    return {
      verify: "",
    }
  },
  props: {
    color: {
      type: String,
      default: "#333"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    lineColor: {
      type: String,
      default: "#777"
    },
    font: {
      type: String,
      default: "25px Arial"
    },
    value: String,
    noLine: Boolean,
    noDots: Boolean,
    hasRefresh: Boolean,
  },
  methods: {
    captchaInit: function(){
      let verifyValue;
      let nums = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz".split("");
      let vm = this;
      drawCode();
      //繪製驗證碼
      function drawCode() {
        let canvas = vm.$refs.verifyCanvas; //獲取HTML端畫布
        let context = canvas.getContext("2d"); //獲取畫布2D上下文
        context.fillStyle = vm.bgColor; //畫布填充色
        context.fillRect(0, 0, canvas.width, canvas.height); //清空畫布
        context.fillStyle = vm.color; //設置字體顏色
        context.font = vm.font; //設置字體
        let rand = new Array();
        let x = new Array();
        let y = new Array();
        for (let i = 0; i < 4; i++) {
            rand[i] = nums[Math.floor(Math.random() * nums.length)]
            x[i] = i * 16 + 10;
            y[i] = Math.random() * 20 + 20;
            context.fillText(rand[i], x[i], y[i]);
        }
        verifyValue = rand.join('').toLowerCase();
        vm.verify = verifyValue;
        
        //畫3條隨機線
        if(!vm.noLine){
          for (let i = 0; i < 3; i++) {
            drawline(canvas, context);
          }
        }
        //畫30個隨機點
        if(!vm.noDots){
          for (let i = 0; i < 30; i++) {
            drawDot(canvas, context);
          }
        }
        convertCanvasToImage(canvas)
      }
      //隨機線
      function drawline(canvas, context) {
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
        context.lineWidth = 0.5; //隨機線寬
        context.strokeStyle = vm.lineColor; //隨機線描邊屬性
        context.stroke(); //描邊，即起點描到終點
      }
      //隨機點(所謂畫面其實就是畫1px像素的線)
      function drawDot(canvas, context) {
        let px = Math.floor(Math.random() * canvas.width);
        let py = Math.floor(Math.random() * canvas.height);
        context.moveTo(px, py);
        context.lineTo(px + 1, py + 1);
        context.lineWidth = 0.2;
        context.stroke();
      }
      //繪製圖片
      function convertCanvasToImage(canvas) {
        vm.$refs.verifyCanvas.style.display = "none";
        let image = vm.$refs.captchaImg;
        image.src = canvas.toDataURL("image/png");
        return image;
      }
      //點擊圖片刷新
      vm.$refs.captchaImg.onclick = function () {
        $('#verify-canvas').remove();
        $('#verify').after('<canvas width="126" height="48" id="verify-canvas"></canvas>')
        drawCode();
      }
      vm.$refs.refresh.onclick = function () {
        $('#verify-canvas').remove();
        $('#verify').after('<canvas width="126" height="48" id="verify-canvas"></canvas>')
        drawCode();
      }
    }
  }
})

//文字省略
Vue.component('c-ellipsis', {
  template: '<p class="c-ellipsis" :style="{webkitLineClamp: maxLine }"><slot></slot></p>',
  props: {
    maxLine: {
      type: Number,
      default: 1,
    }
  },
})

//modal彈窗
Vue.component('c-modal', {
  template: `
    <transition name="modal">
      <div class="modal-mask c-modal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                default footer
                <c-button class="modal-default-button" @click="$emit('close')">
                  OK
                </c-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  `,
})

//圖片上傳預覽
Vue.component('c-image-upload', {
  template: `
    <div class="c-image-upload">
      <input type="file" accept="image/*" ref="input" @change="previewImage">
      <template v-if="preview">
        <div class="image-preview">
          <img :src="preview" class="img-fluid" />
          <div class="image-info">
            <p>檔案名稱：{{ image.name }}</p>
            <p>檔案大小：{{ parseInt(image.size/1024) }}KB</p>
          </div>
        </div>
        <c-button @click="reset">刪除圖片</c-button>
      </template>
    </div>
  `,
  data: function() {
    return {
      preview: "",
      image: "",
    };
  },
  methods: {
    previewImage: function(event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    reset: function() {
      this.image = "";
      this.preview = "";
      this.$refs.input.value = "";
    }
  }
})

//圖片上傳預覽(多張)
Vue.component('c-image-upload-multiple', {
  template: `
    <div class="c-image-upload-multiple">
      <input type="file" accept="image/*" multiple="multiple" ref="input" @change="previewMultiImage">
      <template v-if="preview_list.length">
        <div class="image-preview">
          <div v-for="item, index in preview_list" :key="index">
            <img :src="item"/>
            <div class="image-info">
              <p>檔案名稱：{{ image_list[index].name }}</p>
              <p>檔案大小：{{ parseInt(image_list[index].size/1024) }}KB</p>
            </div>
          </div>
          <c-button @click="reset">刪除圖片</c-button>
        </div>
      </template>
    </div>
  `,
  data: function() {
    return {
      preview_list: [],
      image_list: []
    };
  },
  methods: {
    previewMultiImage: function(event) {
      let input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while(count --) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }
    },
    reset: function() {
      this.image_list = [];
      this.preview_list = [];
      this.$refs.input.value = "";
    }
  }
})

//播放Youtube影片(無控制版)
Vue.component('c-youtube', {
  template: `
    <div class="c-youtube">
      <div class="video-wrapper">
        <iframe width="560" height="315" :src="videoIdAfter" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  `,
  props: {
    videoId: { //影片ID
      type: String,
      default: "p6qjpdi8XuE"
    },
    start: { //開始時間
      type: Number,
      default: 0
    },
    autoplay: Boolean, //自動播放
    loop: Boolean, //自動循環
    noControl: Boolean, //移除控制介面
  },
  computed: {
    videoIdAfter: function(){
      let urlTemp = `https://www.youtube.com/embed/${this.videoId}?`;
      if(this.start) urlTemp = `${urlTemp}&start=${this.start}`;
      if(this.autoplay) urlTemp = `${urlTemp}&autoplay=1`;
      if(this.loop) urlTemp = `${urlTemp}&loop=1&playlist=${this.videoId}`;
      if(this.noControl) urlTemp = `${urlTemp}&controls=0`;
      return urlTemp;
    }
  },
})

//播放Youtube影片(可控制版)
Vue.component('c-youtube-api', {
  template: `
    <div class="c-youtube-api">
      <div class="video-wrapper">
        <div :id="videoId" ref="player"></div>
      </div>
    </div>
  `,
  props: {
    videoId: { //影片id
      type: String,
      default: "KnWMMgEDva0"
    },
    start: { //開始時間
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 560
    },
    height: {
      type: Number,
      default: 315
    },
    autoplay: Boolean, //自動播放
    loop: Boolean, //自動循環
    noControl: Boolean, //移除控制介面
    mute: Boolean //開始時靜音
  },
  data() {
    return {
      player: {}
    }
  },
  computed: {
    control: function(){
      return this.noControl ? 0 : 1;
    }
  },
  mounted() {
    let _this = this;
    let tag = document.createElement('script');
    let player;
    let firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function(){
      player = new YT.Player(_this.videoId, {
        videoId: _this.videoId, //YouTube 影片ID
        width: _this.width, //播放器寬度 (px)
        height: _this.height, //播放器高度 (px)
        playerVars: {
          autoplay: _this.autoplay, //在讀取時自動播放影片
          controls: _this.control, //在播放器顯示暫停／播放按鈕
          start: _this.start //開始時間
          // loop: _this.loop, //讓影片循環播放
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        }
      });
    }
    function onPlayerReady(e) {
      if(_this.mute) e.target.mute();
    };
    function onPlayerStateChange(e) {
      if (e.data === YT.PlayerState.ENDED) {
        player.playVideo(); 
      }
    };
  },
  methods: {

  },
})

//回頂部
Vue.component('c-backtop', {
  template: `
    <c-button @click="scrollToTop">回最頂</c-button>
  `,
  methods: {
    scrollToTop: function(){
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, c - c / 6);
      }
    }
  },
})

//刮刮樂(引入套件：plugins/scratchcard/scratchcard.min.js)
Vue.component('c-scratch', {
  template: `
    <div class="c-scratch">
      <div class="sc__wrapper">
        <div class="sc__container" :id="id"></div>
      </div>
    </div>
  `,
  mounted() {
    this.initScratch();
  },
  props: {
    id: { //刮刮樂id 區分複數刮刮樂
      type: String,
      default: "js--sc--container"
    },
    coverSrc: { //封面圖片
      type: String,
      default: "img/silver.jpg"
    },
    brushSrc: { //筆刷圖片
      type: String,
      default: "img/brush.png"
    },
    prizeSrc: { //獎品圖片
      type: String,
      default: "img/prize_01.jpg"
    },
    aspectRatio: { //長寬比
      type: Number,
      default: 1.65
    },
    percent: { //完成所需%數
      type: Number,
      default: 10
    },
  },
  methods: {
    initScratch: function(){
      let _this = this;
      const scContainer = document.getElementById(this.id);
      const sc = new ScratchCard(`#${this.id}`, {
        scratchType: SCRATCH_TYPE.BRUSH,
        containerWidth: scContainer.offsetWidth,
        containerHeight: scContainer.offsetWidth/this.aspectRatio,
        brushSrc: this.brushSrc,
        imageForwardSrc: this.coverSrc,
        imageBackgroundSrc: this.prizeSrc,
        percentToFinish: this.percent,
        callback: function () {
          _this.$emit("finish"); //刮完事件
        }
      })
      sc.init().then(() => {
        sc.canvas.addEventListener('scratch.move', () => {
          _this.$emit("move", Math.floor(sc.getPercent())); //移動中事件(帶百分比)
        })
      }).catch((error) => {
        alert(error.message);
      });
    }
  },
})

//倒數計時(有期限)
// Vue.component('c-countdown-deadline', {
//   template: `
//     <div>距離5月13號 15點0分0秒 還有</div>
//     <i></i>
//     <i></i>
//     <i></i>
//   `,
//   mounted() {
//     let aI = document.getElementsByTagName("i");
//     setInterval(function() {  // 設置倒數計時: 結束時間 - 當前時間
//       // 當前時間
//       let time = new Date();
//       let nowTime = time.getTime(); // 獲取當前毫秒數
//       // 設置結束時間 : 5月13號 15點0分0秒
//       time.setMonth(4); //   獲取當前 月份 (從 '0' 開始算)
//       time.setDate(13); //   獲取當前 日
//       time.setHours(15); //   獲取當前 時
//       time.setMinutes(0); //   獲取當前 分
//       time.setSeconds(0);
//       let endTime = time.getTime();
//       // 倒數計時: 差值
//       let offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位
//       let sec = parseInt(offsetTime % 60); // 秒
//       let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
//       let hr = parseInt(offsetTime / 60 / 60); // 時

//       aI[0].textContent = hr + "時";
//       aI[1].textContent = min + "分";
//       aI[2].textContent = sec + "秒";
//     }, 1000);
//   },
// })

//倒數計時(無期限)
Vue.component('c-countdown', {
  template: `
    <span class="c-countdown" ref="count">{{cTime}}</span>
  `,
  props: {
    time: {
      type: Number,
      default: 60
    },
    delay: Boolean
  },
  data() {
    return {
      cTime: this.time
    }
  },
  mounted() {
    if(!this.delay) this.countdown();
  },
  methods: {
    countdown: function(){
      let _this = this;
      let countdown = setInterval(function(){
        _this.cTime -= 1;
        if(_this.cTime <= 0){
          _this.$emit("timeup");
          clearInterval(countdown);
        }
      }, 1000);
    },
    reset: function(){
      this.cTime = 10;
      this.countdown();
    }
  },
})