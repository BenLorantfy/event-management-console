// @ts-check

class Node {
    data = null
    priority = 0

    /**
     * @type {null|Node}
     */
    next = null
}

export class PriorityQueue {
    /**
     * @type {null|Node}
     */
    head = null

    enqueue(data, priority) {
        const newNode = new Node();
        newNode.data = data;
        newNode.priority = priority;

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        if (this.head.priority < newNode.priority) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        let temp = this.head;
        while (temp.next !== null && temp.next.priority >= priority) {
            temp = temp.next;
        }

        newNode.next = temp.next;
        temp.next = newNode;
    }

    dequeue() {
        if (this.head) {
            this.head = this.head.next;
        }
    }

    /**
     * @param {(params: { priority: number, data: unknown }) => void} callback 
     */
    forEach(callback) {
        let node = this.head;
        while (node !== null) {
            callback({ priority: node.priority, data: node.data });
            node = node.next;
        }
    }
}

