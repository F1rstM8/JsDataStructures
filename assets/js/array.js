console.log("--- ЗАВДАННЯ 2 ---");
class NumberedCollection {
  constructor() {
    this.items = {};
    this.count = 1;
  }

  add(data) {
    this.items[`*${this.count}*`] = data;
    this.count++;
  }
}
const list = new NumberedCollection();
list.add("Перший");
list.add("Другий");

console.log(list.items);
