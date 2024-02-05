import { aStar } from "./src/a_star.js"
import { Vertex } from "./src/Vertex.js";
function test_astar(){
	// Create vertices
	const A = new Vertex("A", 0, 0);
	const B = new Vertex("B", 1, 0);
	const C = new Vertex("C", 2, 0);
	const D = new Vertex("D", 0, 1);
	const E = new Vertex("E", 1, 1);
	const F = new Vertex("F", 2, 1);
	const G = new Vertex("G", 0, 2);
	const H = new Vertex("H", 1, 2);
	const I = new Vertex("I", 2, 2);

	// Define the graph
	const graph = {
		"A": [[B, 1], [D, 1]],
		"B": [[A, 1], [E, 1], [C, 1]],
		"C": [[B, 1], [F, 1]],
		"D": [[A, 1], [E, 1], [G, 1]],
		"E": [[B, 1], [D, 1], [H, 1], [F, 1]],
		"F": [[C, 1], [E, 1], [I, 1]],
		"G": [[D, 1], [H, 1]],
		"H": [[G, 1], [E, 1], [I, 1]],
		"I": [[F, 1], [H, 1]]
	};


    console.time("A* test")
	const [shortestPathLength,shortestPath] = aStar(graph,A,I,"manhattan")
    console.timeEnd("A* test")
	console.log("A* found a path of cost: ", shortestPathLength)
	console.log(`It took ${shortestPath.length} steps.`)
	console.log("Path: ", shortestPath.join(" --> "))
}

test_astar();