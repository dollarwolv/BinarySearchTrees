class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {}

  buildTreeRec(array, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTreeRec(array, start, mid - 1);
    root.right = this.buildTreeRec(array, mid + 1, end);

    return root;
  }

  buildTree(arr) {
    arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTreeRec(arr, 0, arr.length - 1);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(val, node) {
    if (!node) return;
    if (val < node.data) {
      if (!node.left) {
        node.left = new Node(val);
      } else {
        this.insert(val, node.left);
      }
    }
    if (val > node.data) {
      if (!node.right) {
        node.right = new Node(val);
      } else {
        this.insert(val, node.right);
      }
    }
  }

  deleteItem(val, node, previousNode) {
    // go to node
    if (val > node.data) {
      previousNode = node;
      return this.deleteItem(val, node.right, previousNode);
    } else if (val < node.data) {
      previousNode = node;
      return this.deleteItem(val, node.left, previousNode);
    } else if (val === node.data) {
      // logic to delete item
      // case 0: node is root
      if (node === this.root && !previousNode) {
        const pseudoRoot = new Node(null);
        pseudoRoot.left = this.root;
        this.deleteItem(val, this.root, pseudoRoot);
        this.root = pseudoRoot.left;
        return;
      }
      // case 1: node is a leaf
      if (!node.left && !node.right) {
        if (previousNode.left && previousNode.left.data === val) {
          previousNode.left = null;
        } else if (previousNode.right && previousNode.right.data === val) {
          previousNode.right = null;
        }
      }

      // case 2: node only has 1 child
      // if only a right child exists:
      else if (!node.left) {
        // if node is a left child, set left child of the previous node to the node's right child.
        if (previousNode.left && previousNode.left.data === val) {
          previousNode.left = node.right;
          // if node is a right child, set left child of the previous node to the node's right child.
        } else if (previousNode.right && previousNode.right.data === val) {
          previousNode.right = node.right;
        }
        // if only a left child exists:
      } else if (!node.right) {
        // if node is a left child, set left child of the previous node to the node's left child.
        if (previousNode.left && previousNode.left.data === val) {
          previousNode.left = node.left;
          // if node is a right child, set left child of the previous node to the node's left child.
        } else if (previousNode.right && previousNode.right.data === val) {
          previousNode.right = node.left;
        }
      }

      // case 3: node has 2 children
      else {
        let childNode = node.right;
        let parent = childNode;
        while (childNode.left) {
          parent = childNode;
          childNode = childNode.left;
        }
        node.data = childNode.data;
        if (childNode.data === parent.data) {
          node.right = childNode.right;
        } else {
          parent.left = childNode.right;
        }
      }
    }
  }

  find(val) {
    return this.findRec(val, this.root);
  }

  findRec(val, node) {
    if (!node) return null;

    if (val > node.data) {
      return this.findRec(val, node.right);
    } else if (val < node.data) {
      return this.findRec(val, node.left);
    } else if (val === node.data) {
      return node;
    }
  }

  levelOrderForEach(callback) {
    let queue = [this.root];
    this.levelOrderForEachRec(callback, queue[0], queue);
  }

  levelOrderForEachRec(callback, node, queue) {
    if (!callback || typeof callback !== "function") {
      throw new Error("No callback function provided.");
    }
    if (!node) return;

    callback(queue[0]);
    queue.shift();

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    this.levelOrderForEachRec(callback, queue[0], queue);
  }

  preOrderForEach(callback) {
    this.preOrderForEachRec(callback, this.root);
  }

  preOrderForEachRec(callback, node) {
    if (!callback || typeof callback !== "function") {
      throw new Error("No callback function provided.");
    }
    if (!node) return;

    console.log(node.data);
    callback(node);

    if (node.left) this.preOrderForEachRec(callback, node.left);
    if (node.right) this.preOrderForEachRec(callback, node.right);
  }

  inOrderForEach(callback) {
    this.inOrderForEachRec(callback, this.root);
  }

  inOrderForEachRec(callback, node) {
    if (!callback || typeof callback !== "function") {
      throw new Error("No callback function provided.");
    }
    if (!node) return;

    if (node.left) this.inOrderForEachRec(callback, node.left);
    callback(node);
    if (node.right) this.inOrderForEachRec(callback, node.right);
  }

  postOrderForEach(callback) {
    this.postOrderForEachRec(callback, this.root);
  }

  postOrderForEachRec(callback, node) {
    if (!callback || typeof callback !== "function") {
      throw new Error("No callback function provided.");
    }
    if (!node) return;

    if (node.left) this.postOrderForEachRec(callback, node.left);
    if (node.right) this.postOrderForEachRec(callback, node.right);
    callback(node);
  }

  height(val) {
    const node = this.find(val);
    return this.goDown(node, 0, 0);
  }

  goDown(node, depth, maxDepth) {
    if (depth > maxDepth) maxDepth = depth;

    if (node.left) maxDepth = this.goDown(node.left, depth + 1, maxDepth);

    if (node.right) maxDepth = this.goDown(node.right, depth + 1, maxDepth);

    return maxDepth;
  }

  depth(val) {
    return this.depthRec(val, this.root, 0, 0);
  }

  depthRec(val, node, depth) {
    if (val > node.data) {
      return this.depthRec(val, node.right, depth + 1);
    } else if (val < node.data) {
      return this.depthRec(val, node.left, depth + 1);
    } else if (val === node.data) {
      return depth;
    }
  }
}

let shcwanz = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 12, 14, 18, 22, 11, 14, 29,
];
const tree = new Tree();
tree.buildTree(shcwanz);
tree.insert(6, tree.root);
tree.prettyPrint(tree.root);
console.log(tree.depth(3));
