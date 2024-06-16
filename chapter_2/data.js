const items = [
  {
    name: "鉛筆",
    price: 300,
    quantity: 0,
  },
  {
    name: "ノート",
    price: 400,
    quantity: 0,
  },
  {
    name: "消しゴム",
    price: 500,
    quantity: 0,
  },
];
const vm = new Vue({
  el: "#app",
  data: {
    // dataプロパティ
    items: items,
  },
});

// コンソール上で確認するためにwindowオブジェクトに代入
window.vm = vm;
