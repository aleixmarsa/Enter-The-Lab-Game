
class Queue {

    constructor(){
        this.dataStore = Array.prototype.slice.call(arguments, 0);
    }

    enqueue(element) {
        this.dataStore.push(element);
    }

    dequeue() {
        return this.dataStore.shift();
    }

    empty() {
        return this.dataStore = [];
    }

    print(element) {
        this.dataStore.forEach(function (item) {
            // element.appendChild(item.node);
            console.log(item);
        });
    }
}


class Node{
    constructor(x, y, distanceFromSource){
        this.x = x;
        this.y = y;
        this.distanceFromSource = distanceFromSource;
    }
}


function addNeighbours(poped, matrix){
    let list= [];
    if((poped.x-1 >= 0 && poped.x-1 < matrix.length) && matrix[poped.x-1][poped.y] != 1) {
        list.push(new Node(poped.x-1, poped.y, poped.distanceFromSource+1));
    }
    if((poped.x+1 >= 0 && poped.x+1 < matrix.length) && matrix[poped.x+1][poped.y] != 1) {
        list.push(new Node(poped.x+1, poped.y, poped.distanceFromSource+1));
    }
    if((poped.y-1 >= 0 && poped.y-1 < matrix.length) && matrix[poped.x][poped.y-1] != 1) {
        list.push(new Node(poped.x, poped.y-1, poped.distanceFromSource+1));
    }
    if((poped.y+1 >= 0 && poped.y+1 < matrix.length) && matrix[poped.x][poped.y+1] != 1) {
        list.push(new Node(poped.x, poped.y+1, poped.distanceFromSource+1));
    }		
    return list;

}


function pathExists(matrix, sourceX, sourceY){
    
    let source = new Node(sourceX,sourceY,0);
    let queue = new Queue;
    queue.enqueue(source);
    console.log(queue.dataStore.length)
    while(queue.dataStore.length !== 0){
        let poped = queue.dequeue();
        //S'ha d'afegir que quan el heroi es mou posi un 8 a la matriu
        if(matrix[poped.x][poped.y] === 8){
            return poped.distanceFromSource;
        }else{
            matrix[poped.x][poped.y] = 1;
            let neighbourList = addNeighbours(poped, matrix);
            console.log(neighbourList)
            for(let neighbour of neighbourList){
                queue.enqueue(neighbour)
            }
        }
    }
    return -1;

}


