function matchOrder(incomingOrder , orderBook){
    const trades = [];
    const oppositeHeap = incomingOrder.side === 'buy' ? orderBook.sellHeap : orderBook.buyHeap ;


    while(incomingOrder.quantity > 0){
        const bestResting = orderBook.popLiveOrder(oppositeHeap);//this will give the best possible live orer from the orderbook
        if(!bestResting) break;

        if(incomingOrder.type === 'limit' && !pricesCross(incomingOrder , bestResting)){
            oppositeHeap.push(bestResting);
            break;
        }

        const execQty = Math.min(incomingOrder.quantity , bestResting.quantity);

        //to record the trade 
        trades.push({
            price: bestResting.price,
            quantity: execQty,
            buyOrderId: incomingOrder.side === 'buy' ? incomingOrder.id : bestResting.id,
            sellOrderId: incomingOrder.side === 'sell' ? incomingOrder.id : bestResting.id
            
            });

        //subtract quantity from the data
        incomingOrder.quantity -= execQty;
        bestResting.quantity -= execQty;

        if(bestResting.quantity > 0){
            oppositeHeap.push(bestResting);//case of partial fill id is same and timestamp too and we push it back 
        }else{
            bestResting.status = 'filled';
        }
        }


        //partial fill case 
        if(incomingOrder.quantity > 0 && incomingOrder.type ==='limit'){
            if(incomingOrder.side === 'buy'){
                   orderBook.buyHeap.push(incomingOrder);
            }else{
                orderBook.sellHeap.push(incomingOrder);
            }
            incomingOrder.status = 'resting';
            orderBook.orders.set(incomingOrder.id, incomingOrder);
        }
        console.log(incomingOrder.status);
        return {
            trades,
            remainingQty: incomingOrder.quantity,
            status: incomingOrder.quantity === 0 ? 'filled' : (trades.length > 0 ? 'partial' : 'resting')
        
            
        };

    
function pricesCross(incoming, resting){
  if (incoming.side === 'buy') return incoming.price >= resting.price;
  else return incoming.price <= resting.price;
}
}