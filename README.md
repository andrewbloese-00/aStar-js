# A* With JavaScript
Implementation of the popular A* algorithm using JavaScript. Inspired by the codecademy python implementation. 

> Run `npm test` to see it working

## minheap.js
A flexible minheap implementation that is used to create a PriorityQueue. Has the expected bells and whistles of a minheap... 

## Vertex.js
Not much to say here , just that each vertex has a position and a name that we use to traverse a graph 

## a_star.js
* defined a couple of standard distance heuristic functions `manhattan` and `euclidean`, and stored them in an object for easy flexibility with a string parameter in the A* function. 
* the actual A* is implemented in the exported function `aStar`
    * The parameters allow for usage of either manhattan or euclidean heuristic functions to suit different situations. 
* The cost of the "cheapest" path is returned as well as an array representing the path taken using the `name` of each vertex as labels. 


## test.js
A basic test case showing how to use the `aStar` on an example graph. 


