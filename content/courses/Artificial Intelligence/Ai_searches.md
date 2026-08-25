Blind Search vs Informed Search

Tree search paradigm and general graph search paradigm 

function tree-search(root-node):
fringe <- successor(root-node)
explored <- empty
while(nonempty(fringe))
	{node = remove-first(fringe)
	state = state(node)
	if goal(state) return solution(node) // checking if the state is a goal or not 
explored -< insert(node, explored)
fringe <- insert all successor(node), fringe, if node not in explored)
}
return failure 


best first search: evaluation function for each node -> estimate of desirability. -> order the nodes in the fringe in decreasing order of desirability 
priority queue, with least f(n) value 

breadth first search is like a best first search with f(n) = depth(n) 

uniform cost search is like a best first search with f(n) = the sum of edge costs from start to n = g(n)

f(n) is evaluation function that Best first search uses to figure out which node to not expand 

g(n) = cost from start state to this node 

h(n) = is the guess of the cost from n to the goal 


Greedy best first search: 

evaluation function is h(n) : estimate of cost from n to goal 
greedy best-first search expands the node that appears to be closest to goal 

- can get stuck in the loop : incomplete 


A*

avoid expanding paths that are already expensive 
evaluation function is f(n) = g(n) + h(n) 

when would this A* be optimal? 
heuristic function h(n) is admissible if it is optimistic 
Admissible heuristics will be less than equal to optimal for minimization problem and will be more than equal to optimal for maximization problem. 
most optimistic heuristic would be zero 

if h(n) is admissible, then A* using the tree-search is optimal 
but for graph search version, admissibility is not sufficient 
for graph search we need the consistency 

Consistent Heuristics: 
triangular inequality is satisfied 
h(n) <= c(n, a, n') + h(n'), for every node n and for every successor n' due to legal action a 

every consistent heuristic is also admissible 