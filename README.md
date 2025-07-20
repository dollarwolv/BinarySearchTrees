# Binary Search Tree Project

This project implements a binary search tree (BST) in JavaScript as part of my learning journey through The Odin Project’s data structures curriculum. It includes core BST operations like insertion, deletion, search, and multiple types of traversal, as well as utility functions to assess and maintain tree balance.

## Features
- `buildTree()` — builds a balanced BST from an unsorted array (removes duplicates and sorts internally)
- `insert(val)` — inserts a value into the tree
- `deleteItem(val)` — deletes a node with careful handling for 0, 1, or 2 children
- `find(val)` — locates and returns a node by its value
- `height(val)` — returns the height of a node (distance to its deepest child)
- `depth(val)` — returns the depth of a node (distance from the root)
- `isBalanced()` — checks if the tree is height-balanced
- `rebalance()` — rebuilds the tree into a balanced form using in-order traversal
- Tree traversals: level-order, in-order, pre-order, and post-order (with callback support)

## What I Learned
- **Recursive thinking**: Writing recursive functions for insertion, deletion, and traversal helped strengthen my ability to think in terms of base and recursive cases.
- **Tree structure logic**: I learned how the left < root < right rule enables BSTs to maintain order, and how in-order traversal naturally produces sorted arrays.
- **Balance detection**: I built a working `isBalanced()` function that checks tree height at every node and short-circuits if imbalance is found — a subtle recursive pattern that took some debugging to get right.
- **Rebalancing**: I used in-order traversal to collect node values in sorted order, then rebuilt the tree to restore balance. I also explored why traversal order matters in this process.
- **Debugging mindset**: I took time to understand *why* my solutions didn’t work before fixing them. I resisted the urge to just copy answers and focused on reasoning things through myself, asking questions like “why doesn’t this bubble up?” or “why does in-order return a sorted array?”

## Reflections
This project was deceptively deep. At first glance, it’s just a set of tree methods — but writing them from scratch showed me how many little edge cases you have to think through. 
