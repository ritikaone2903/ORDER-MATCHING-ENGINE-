class orderbook{
    //maps for storing order and details 
    constructor() { // to  initialize objects automatically 
        this.orders = new Map(); 
    }

    addOrder(id, side, price, quantity, timestamp){
        const order = {id, side, price, quantity, timestamp};
        status: 'active';
        this.orders.set(id,order);
        }

       getOrder(id) {
         return this.orders.get(id);
       }


       cancelOrder(id){
       this.orders.delete(id);
       }
}




 //heaps for bo and so . heaps are not built in js so we use core idea of heaps i.e arrays 
       //left child = 2i+1, right child = 2i+2, parent = (i-1)/2 (floor)

       //buy orders : maxheap parent >= both children


 const buyHeap = new Heap((a,b) => {
    if ( a.price !== b.price) return a.price > b.price;
    return a.timestamp < b.timestamp;
 });

 const sellHeap = new Heap((a,b) => {
    if( a.price !== b.price) return a.price < b.price;
    returna.timestamp < b.timestamp;
 });




 cancelOrder(id) ;{
    const order = this.orders.get(id);
    if(order) {
        order.status = 'cancelled';
    }
 }


 popLiveOrder(heap); {
    while(heap.heap.length > 0){
        const top = heap.pop();
        if (top.status !== 'cancelled'){
            return top;
        }
        return null;
    }

    
 }






class Heap {
    constructor(compareFn){
        this.heap = [];
        this.compare = compareFn;
    }


    push(item) {
        //add to the end then bubble up 
        this.heap.push(item);
        this.bubbleUp(this.heap.length-1);
    }

    pop(){
        //save root(max element) , move last to root , bubble down , return saved root 
        const max = this.heap[0]; //saving root
        this.heap[0] = this.heap[this.heap.length - 1];//moving last element to the root
        this.heap.pop();
        this.bubbleDown(0);
        return max;

    }

   
        //compare with parent , swap while needed
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
    

         


    bubbleDown(index){
        //compare with children , swap with the correct one while needed
       
        const length = this.heap.length;

        while(true) {
            let left = 2*index + 1;
            let right = 2*index + 2;
            let largest = index;

            if(left<length && this.compare(this.heap[left],this.heap[largest])){
                largest = left ;
            }

            if(right < length && this.compare(this.heap[right],this.heap[largest])){
                largest = right;
            }

            if (largest === index) break;

        [this.heap[index], this.heap[largest]] =
            [this.heap[largest], this.heap[index]];

        index = largest;

        }
    }
}


