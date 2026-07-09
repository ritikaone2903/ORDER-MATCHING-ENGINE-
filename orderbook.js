class Heap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn;
  }

  push(item) {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const max = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown(0);
    return max;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parent])) {
        [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
        index = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;
      if (left < length && this.compare(this.heap[left], this.heap[largest])) largest = left;
      if (right < length && this.compare(this.heap[right], this.heap[largest])) largest = right;
      if (largest === index) break;
      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}

class OrderBook {
  constructor() {
    this.orders = new Map();
    this.buyHeap = new Heap((a, b) => {
      if (a.price !== b.price) return a.price > b.price;
      return a.timestamp < b.timestamp;
    });
    this.sellHeap = new Heap((a, b) => {
      if (a.price !== b.price) return a.price < b.price;
      return a.timestamp < b.timestamp;
    });
  }

  addOrder(id, side, price, quantity, timestamp) {
    const order = { id, side, price, quantity, timestamp, status: 'active' };
    this.orders.set(id, order);
  }

  getOrder(id) {
    return this.orders.get(id);
  }

  cancelOrder(id) {
    const order = this.orders.get(id);
    if (order) order.status = 'cancelled';
  }

  popLiveOrder(heap) {
    while (heap.heap.length > 0) {
      const top = heap.pop();
      if (top.status !== 'cancelled') return top;
    }
    return null;
  }
}

module.exports = { OrderBook, Heap };




 

 



 













