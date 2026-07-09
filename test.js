const {OrderBook} = require('./orderbook.js');
const {matchOrder} = require('./matchorder.js');
const ob = new OrderBook();

const restingSell = {id: 'a1', side:'sell', price:105, quantity: 10, timestamp: 1, status: 'active', type: 'limit'};
ob.sellHeap.push(restingSell);
ob.orders.set('a1',restingSell);

const incomingBuy = {id:'b1',side: 'buy', price: 100, quantity: 10, timestamp: 2, status: 'active', type:'limit' };
 
const result = matchOrder(incomingBuy,ob);

console.log(result);
console.log(restingSell.quantity);

console.log('sellHeap length after:', ob.sellHeap.heap.length);