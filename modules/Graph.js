// @ts-check

export class Graph {
    adjacencyMatrix = []

    names = []

    /**
     * Adds a node to the graph
     *
     * @param {string} name The display name of the node
     * @param {{ [nodeName: string]: number }} _distances An object containing the distances to every other node
     */
    addNode(name, _distances) {
        const index = this.adjacencyMatrix.length;
        this.names[index] = name;

        const distances = {
            ..._distances,
            [name]: 0
        }

        const bottomRow = [];
        Object.keys(distances).forEach((nodeName) => {
            const index = this.names.indexOf(nodeName);
            bottomRow[index] = distances[nodeName];

            if (nodeName !== name) {
                this.adjacencyMatrix[index].push(distances[nodeName])
            }
        });

        this.adjacencyMatrix.push(bottomRow);
    }

    /**
     * Removes a node by name
     *
     * @param {string} name 
     */
    removeNode(name) {
        const index = this.names.indexOf(name);
        this.names.splice(index, 1);

        this.adjacencyMatrix.splice(index, 1);
        this.adjacencyMatrix.forEach((row) => {
            row.splice(index, 1);
        });
    }

    /**
     * Checks if graph has a node with this name
     *
     * @param {string} name 
     */
    contains(name) {
        return this.names.includes(name);
    }

    getNodeNames() {
        return [...this.names];
    }

    approximateTSPViaNearestNeighbor() {
        const path = [0];
        let currentNode = 0;
        
        while (path.length < this.adjacencyMatrix.length) {
            let closestNode = null;
            for (let i = 0; i < this.adjacencyMatrix.length; i++) {
                if (path.includes(i)) {
                    continue;
                }

                if (closestNode === null || this.adjacencyMatrix[currentNode][i] < this.adjacencyMatrix[currentNode][closestNode]) {
                    closestNode = i;
                }
            }

            if (closestNode === null) {
                throw new Error("Something went wrong");
            }

            path.push(closestNode);
            currentNode = closestNode;
        }

        return path.map((index) => this.names[index]);
    }
}
