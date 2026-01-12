console.log("--- ЗАВДАННЯ 1 ---");
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  print() {
    let current = this.head;
    const elements = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(" -> "));
  }

  deleteItem(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  addNthElement(data, position) {
    const newNode = new Node(data);
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === position) {
        newNode.next = current.next;

        current.next = newNode;
        return;
      }
      count++;
      current = current.next;
    }

    console.log("Помилка: Позиція виходить за межі списку");
  }
}

const myList = new LinkedList();

myList.append(10);
myList.append(20);
myList.append(30);
myList.append(40);

console.log("Початковий список:");
myList.print();

console.log("\nВидаляємо 20:");
myList.deleteItem(20);
myList.print();

console.log("\nВставляємо 99 після позиції 1:");
myList.addNthElement(99, 1);
myList.print();

console.log("\nВидаляємо 10 (head):");
myList.deleteItem(10);
myList.print();

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
