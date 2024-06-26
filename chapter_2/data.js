const items = [
  {
    name: "鉛筆",
    price: 300,
    quantity: 1,
  },
  {
    name: "ノート",
    price: 400,
    quantity: 1,
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
  computed: {
    totalPrice: function () {
      // this経由でインスタンス内のデータにアクセス
      // dataや算出プロパティを参照したいときは、this経由で参照する。
      // このthisが指すのはvVueインタンス自身。
      return this.items.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
    },
    totalPriceWithtax: function () {
      // 算出プロパティに依存した算出プロパティも定義できる
      return Math.floor(this.totalPrice * 1.1);
    },
    canBuy: function () {
      return this.totalPrice >= 1000;
    },
    errorMessageClass: function () {
      return {
        error: !this.canBuy,
      };
    },
    errorMessageStyle: function () {
      return {
        boreder: this.canBuy ? "" : "1px solid red",
        color: this.canBuy ? "" : "red",
      };
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
  /**
   * メソッドの実装
   * Vueインスタンスのメソッドとして機能する。
   * methodsはデータの変更やサーバーにHTTPリクエストを送る際に用いる。
   */
  methods: {
    doBuy: function () {
      alert(`${this.totalPriceWithtax} 円のお買い上げ`);
      this.items.forEach(function (item) {
        item.quantity = 0;
      });
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
