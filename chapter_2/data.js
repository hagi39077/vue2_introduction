const items = [
  {
    name: "鉛筆",
    price: 300,
    quantity: 2,
  },
  {
    name: "ノート",
    price: 400,
    quantity: 1,
  },
  {
    name: "消しゴム",
    price: 500,
    quantity: 3,
  },
];
const vm = new Vue({
  el: "#app",
  data: {
    // dataプロパティ
    items: items,
  },
  computed: {
    totalPrice: function () {
      // this経由でインスタンス内のデータにアクセス
      return this.items.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
    },
  },
  filters: {
    numberWithDelimiter: function (value) {
      if (!value) {
        return "0";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
});

// コンソール上で確認するためにwindowオブジェクトに代入
window.vm = vm;

// watchによる監視を追加
// 値の変更を開始しているので、トリガーとなってビューの再描画・DOM要素の更新が行われる。
vm.$watch(
  function () {
    // 鉛筆の個数
    return this.items.quantity;
  },
  function (quantity) {
    // このコールバックは、鉛筆の購入個数が変更されたら呼ばれる
    console.log(`quantity: ${quantity}`);
  }
);
