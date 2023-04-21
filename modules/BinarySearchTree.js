// @ts-check

class Node {
    /**
     * @type {null|Node}
     */
    left = null

    /**
     * @type {null|Node}
     */
    right = null

    /**
     * @type {null|Node}
     */
    parent = null

    /**
     * @type {string}
     */
    key = ''

    /**
     * @type {unknown}
     */
    data = null
}

export class BinarySearchTree {
    /**
     * @type {Node|null}
     */
    root = null

    addNode(key, data) {
        const newNode = new Node();
        newNode.data = data;
        newNode.key = key;

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let temp = this.root;

        while (temp !== null) {
            if (newNode.key < temp.key) {
                if (temp.left === null) {
                    temp.left = newNode;
                    newNode.parent = temp.left;
                    break;
                }

                temp = temp.left;
            } else if (newNode.key > temp.key) {
                if (temp.right === null) {
                    temp.right = newNode;
                    newNode.parent = temp.right;
                    break;
                }

                temp = temp.right;
            } else {
                throw new Error("Can not insert multiple of the same key into a BST");
            }
        }
    }

    /**
     * Searches the tree for a range of nodes
     *
     * @param {string} min The minimum of the range to search
     * @param {string} max The maximum of the range to search
     */
    searchRange(min, max) {
        /**
         * @type {Node[]}
         */
        const nodes = [];
        
        this.inOrderTraversal(this.root, (node) => {
            if (node.key >= min && node.key <= max) {
                nodes.push(node);
            }
        });

        return nodes.map((node) => {
            return {
                key: node.key,
                data: node.data
            }
        })
    }

    /**
     * @param {Node|null} tree 
     * @param {(node: Node) => void} visit Callback that is called when a node is visited
     */
    inOrderTraversal(tree, visit) {
        if (tree === null) {
            return;
        }

        this.inOrderTraversal(tree.left, visit);
        visit(tree);
        this.inOrderTraversal(tree.right, visit)
    }
}
