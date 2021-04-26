//build a Latin table
const sampleArray = []
for (let i = 0; i < 100; i++) {
  sampleArray.push(1)
}
for (let i = 0; i < 400; i++) {
  sampleArray.push(2)
}
for (let i = 0;  i < 200; i++) {
  sampleArray.push(3)
}
for (let i = 0; i < 100; i++) {
  sampleArray.push(4)
}

randomize(sampleArray)
console.log(sampleArray)

function randomize(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor( Math.random() * (i + 1) )
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}


console.log(sampleArray)

class Table {
  constructor(dimension) {
    this.dimension = dimension
    this.positions = this.randomizedPositionArray(dimension).map(val => val - 1) // move position by 1 to have 0 position
    this.baseArray = this.arrayCreator(dimension)
    this.table = this.positions.map(position => {
      const shiftedArray = this.moveArrayPosition(this.baseArray, position)
      return shiftedArray
    })
  }

  randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor( Math.random() * (i + 1) )
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
  
  arrayCreator(num) {
    const array = []
    for (let i = 0; i < num; i++) {
      array.push(num - i)
    }
    return array
  }
  
  
  randomizedPositionArray(num) {
    const array = this.arrayCreator(num)
    this.randomize(array)
    return array
  }
  
  moveArrayPosition(base, distance) {
    const maxSwitch = base.reduce(function (a, b) {
     return Math.max(a, b)
    })
    return base.map(val => {
      let coVal = val
      for (let i = 1; i <= distance; i++) {
        coVal++

        if (coVal > maxSwitch) {
          coVal = 1
        }
      }
      return coVal
    })
  }

  printTable() {
    console.log(this.table)
  }
}




//how to build a graph
//addVertex(v)
//addEdge(v,w)
//printGraph()
//bfs(v)
//dfs(v)

class Node {
  constructor(value) {
    //Nodes in the graph
    this.value = value
    //Linked list array
    this.adjacents = []
    //Create a new LinkedList for each index
  }
  
  addAdjacent(node) {
    // Ini null array
    this.adjacents.push(node)
  }

  removeAjacent(node) {
    const index = this.adjacents.indexOf(node)
    if (index > -1) {
      this.adjacents.splice(index, 1)
      return node
    }
  }

  getAdjacent() {
    return this.adjacents
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1
  }
}

class Graph {
  constructor() {
    this.nodes = new Map()
  }


  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value)
    } else {
      const vertex = new Node(value)
      this.nodes.set(value, vertex)
      return vertex
    }
  }

  addEdge(source, des) {
    const sourceNode = this.addVertex(source)
    
    
    sourceNode.addAdjacent(des)
  }

  printGraph() {
    console.log(this.nodes)
  }
}

const newGraph = new Graph(3)
const newTable = new Table(4)

// memory of unused spaces 
// create box, assign box size
// randomly select an unused space
// crawl from the first cell 
// switch current position as the moved cell, 
// if there is no room to move then cut number of box

