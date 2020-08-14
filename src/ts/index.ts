declare var $: (selector: string) => any;

Vue.use(VueFormulate);

let vm = new Vue({
  el: "#app",
  data: {
    title: "UDON",
    isModalShow: 0,
    modalMessage: "啊啊啊",
    value: 0,
    test: [],
    form: {
    },
    testOptions: {
      nico: "妮可",
      maru: "花丸",
      pomu: "步夢",
      rin: "凜",
      kasukasu: "阿霞",
    },
    generate: {},
    schema: [
      {
        "component": "h3",
        "children": "Student registration"
      },
      {
        "label": "Your name",
        "name": "name",
        "validation": "required"
      },
      {
        component: 'div',
        children: 'sdfsdf'
      },
      {
        "type": "submit"
      }
    ]
  },
  computed: {
    testFilter: function(){
      return deleteObj(this.testOptions,['maru','rin']);
    }
  },
  watch: {
    "testArr.a": {
      deep: true,
      handler: function(newValue, oldValue){
        alert(`改變!${newValue}，${oldValue}`);
      }
    }
  },
  mounted: function () {
    
  },
  methods: {
    alert: function(){
      alert('表單成功送出');
    },
    reset: function(){
      this.$formulate.reset('my-form');
    },
    random: function(){
      console.log(getRandom());
    },
    showModal: function(msg){
      this.isModalShow = 1;
      this.modalMessage = msg;
    }
  }
});