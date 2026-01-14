console.log("--- ЗАВДАННЯ 1: LinkedList (з Error Handling) ---");

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
    let output = "";

    while (current) {
      output += current.data;
      if (current.next) {
        output += " -> ";
      }
      current = current.next;
    }

    console.log(output || "Список порожній");
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
    if (typeof position !== "number") {
      throw new Error(
        `Помилка: Позиція має бути числом (отримано ${typeof position})`
      );
    }

    if (position < 0) {
      throw new Error(`Помилка: Позиція не може бути від'ємною (${position})`);
    }

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

    throw new Error(
      `Помилка: Позиція ${position} виходить за межі списку (довжина: ${count})`
    );
  }
}

const myList = new LinkedList();
myList.append(10);
myList.append(20);
myList.append(30);

console.log("Початковий список:");
myList.print();

try {
  console.log("\n1. Спроба додати елемент на позицію 1 (успіх):");
  myList.addNthElement(55, 1);
  myList.print();

  console.log("\n2. Спроба додати елемент на позицію -5 (має бути помилка):");
  myList.addNthElement(99, -5);

  console.log("Цей текст не виведеться, бо сталася помилка вище");
} catch (error) {
  console.error("ПОМИЛКА:", error.message);
}

try {
  console.log("\n3. Спроба додати за межі списку:");
  myList.addNthElement(100, 999);
} catch (error) {
  console.error("ПОМИЛКА:", error.message);
}

console.log("--- ЗАВДАННЯ 2 та 3 ---"); //переробив

class NumberedCollection {
  constructor() {
    Object.defineProperty(this, "count", {
      value: 1,
      writable: true,
      enumerable: false,
    });
  }

  add(data) {
    this[`*${this.count}*`] = data;
    this.count++;
  }

  [Symbol.iterator]() {
    let index = 1;
    const collection = this;

    return {
      next() {
        if (index < collection.count) {
          const value = collection[`*${index}*`];
          index++;
          return { value: value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}
const myCollection = new NumberedCollection();
myCollection.add("first value");
myCollection.add("second value");
myCollection.add("third value");

console.log("1. Вигляд об'єкта (Завдання 2):");
console.log(myCollection);

console.log("\n2. Перебір циклом (Завдання 3):");
for (const item of myCollection) {
  console.log(item);
}
console.log("\n--- ЗАВДАННЯ 4  ---"); //переробив,створив класс стек та використав .push,pop,isEmpty замість методів масиву

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const checkSequence = (expression, config = ["()", "[]", "{}", "<>"]) => {
  const bracketsMap = {};
  const openBrackets = [];

  for (let pair of config) {
    bracketsMap[pair[1]] = pair[0];
    openBrackets.push(pair[0]);
  }

  const stack = new Stack();

  for (let char of expression) {
    if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (bracketsMap[char]) {
      if (stack.isEmpty()) {
        return false;
      }

      const lastOpen = stack.pop();

      if (lastOpen !== bracketsMap[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty();
};

console.log("Тест стеку:");
const myStack = new Stack();
myStack.push(1);
myStack.push(2);
console.log("Peek:", myStack.peek());
console.log("Pop:", myStack.pop());
console.log("IsEmpty:", myStack.isEmpty());

console.log("\nТест функції checkSequence:");
console.log("()(([])) ->", checkSequence("()(([]))"));
console.log("{][) ->", checkSequence("{][)"));
console.log("(( ->", checkSequence("(("));
console.log("(Text) ->", checkSequence("(Text)"));

console.log("\nКастомні налаштування (тільки <>):");
console.log("<> ->", checkSequence("<>", ["<>"]));
console.log("() ->", checkSequence("()", ["<>"]));
