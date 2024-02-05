import { MinHeap } from "./minheap.js"
import { Vertex } from "./Vertex.js";


//used to maintain heap position in the A* priority queue
const QueueComparator = (a,b)=>a[0]-b[0]

//distance estimators for A* 
const DistanceHeuristics = {
    /**
     * @about best suited for grid environments where only up, down, left, right, movement is permitted
     * @param {Vertex} startNode 
     * @param {Vertex} endNode 
     * @returns {Number} the manhattan distance estimation between startNode and endNode based on position
     */
    manhattan: ( startNode,endNode ) => {
        const xDistance = Math.abs(startNode.position[0]-endNode.position[0]);
        const yDistance = Math.abs(startNode.position[1]-endNode.position[1]);		
        return xDistance + yDistance;
    },

    /**
     * @about best suited environments where direct / diagonal movement is permitted
     * @param {Vertex} startNode 
     * @param {Vertex} endNode 
     * @returns {Number} the euclidean distance estimation between startNode and endNode based on position
     */
    euclidean: ( startNode,endNode ) => {
        const xDistance = Math.abs(startNode.position[0]-endNode.position[0]);
		const yDistance = Math.abs(startNode.position[1]-endNode.position[1]);		
		return Math.sqrt( (xDistance*xDistance) + (yDistance*yDistance))
    }
}

/**
 * @param {{[vertexName:string]:[Vertex,number][]}} graph 
 * @param {Vertex} start 
 * @param {Vertex} target 
 * @param {"manhattan"|"euclidean"} heuristic 
 * @returns {[Number,string[]]} the cost of the shortest path along with the path itself
 */
export function aStar(graph,start,target,heuristic="manhattan"){
    //sanity checks
    if(!(start.name in graph) || !(target.name in graph)) throw new Error("One or more of the provided vertices do not exist on the provided graph")
	if(!heuristic in DistanceHeuristics) throw new Error(`Invalid heuristic: '${heuristic}}... Use "manhattan" or "euclidean"`);
	//end sanity checks

    const dp = {} //the distance and path
	for(const vertex in graph)
		dp[vertex] = [Infinity,[start.name]]
	dp[start.name][0] = 0;
    
    //create a 'Priority Queue' for path search 
	const explorable = new MinHeap(QueueComparator)
	explorable.insert([0,start])

    //until we find a path to the target node and have explorable nodes...
	while( explorable.size > 0 && dp[target.name][0] == Infinity){ 
		const [currentDistance,currentVertex] = explorable.extract();
		for( const [neighbor,edgeWeight] of graph[currentVertex.name]){
			const newDistance = currentDistance + edgeWeight + DistanceHeuristics[heuristic](neighbor,target);
			if( newDistance < dp[neighbor.name][0] ){
				const newPath = [...dp[currentVertex.name][1],neighbor.name];
				dp[neighbor.name][0] = newDistance;
				dp[neighbor.name][1] = newPath;
				explorable.insert([newDistance,neighbor])
			} 
		}
	}
	return dp[target.name]
}