import { BinarySearchTree } from './modules/BinarySearchTree.js';
import { Graph } from './modules/Graph.js';
import { PriorityQueue } from './modules/PriorityQueue.js';

/**
 * Create data structures and seed demo data
 */

/**
 * Queue for storying event requests
 */
const eventRequestsQueue = new PriorityQueue();

// Add some initial data for demo purposes
eventRequestsQueue.enqueue({ eventName: 'Johnson Wedding' }, 0);
eventRequestsQueue.enqueue({ eventName: 'Herbert Wedding' }, 0);
eventRequestsQueue.enqueue({ eventName: 'Lorantfy Wedding' }, 0);
eventRequestsQueue.enqueue({ eventName: 'Kelly Wedding' }, 0);
eventRequestsQueue.enqueue({ eventName: 'Washington Wedding' }, 0);

/**
 * Graph for storing event locations
 */
const eventLocationsGraph = new Graph();

/**
 * BST for storying events
 */
const eventsBST = new BinarySearchTree();
eventsBST.addNode('08:30', { eventName: 'Herbert Wedding' });
eventsBST.addNode('05:30', { eventName: 'Kelly Wedding' });
eventsBST.addNode('06:00', { eventName: 'Pizza Party' });
eventsBST.addNode('12:00', { eventName: 'John and Connie 40th Anniversary' });
eventsBST.addNode('14:00', { eventName: 'Postmedia Christmas Party' });
eventsBST.addNode('19:00', { eventName: 'Voldemort Awareness Day' });
eventsBST.addNode('19:30', { eventName: 'Ben\'s Surprise party' });
eventsBST.addNode('17:30', { eventName: 'Pool Party' });

/**
 * UI Event Handlers
 */
document.getElementById("add-event-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formValues = getValuesFromForm(e.target);
    eventRequestsQueue.enqueue({ eventName: formValues.eventName }, Number(formValues.priority));

    renderEventQueue();
})

document.getElementById("process-next-event").addEventListener("click", () => {
    eventRequestsQueue.dequeue();
    renderEventQueue();
});

document.getElementById("calculate-approximate-quickest-route").addEventListener("click", () => {
    document.getElementById("approximate-quickest-route-result").innerText = "Approximate Quickest Path: " + eventLocationsGraph.approximateTSPViaNearestNeighbor().join(",");
})

document.getElementById("search-events-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const values = getValuesFromForm(e.target); 
    const events = eventsBST.searchRange(values.minTime, values.maxTime);

    document.getElementById("searchResults").innerHTML = '';
    for(let event of events) {
        const li = document.createElement("li");
        li.innerText = `[${event.key}] ${event.data.eventName}`;
        document.getElementById("searchResults").appendChild(li);
    }
})

Array.from(document.getElementsByClassName("location-node")).forEach((node) => node.addEventListener("click", (e) => {
    const nodeName = e.currentTarget.getAttribute("id");    
    if (eventLocationsGraph.contains(nodeName)) {
        eventLocationsGraph.removeNode(nodeName);
        e.currentTarget.style.border = "1px solid transparent";
    } else {
        eventLocationsGraph.addNode(
            nodeName, 
            getDistancesToEveryOtherNode(e.currentTarget)
        );
        e.currentTarget.style.border = "1px solid blue";
    }
}))

/**
 * @param {HTMLElement} target 
 */
function getDistancesToEveryOtherNode(target) {
    const distances = {};
    const existingNodeNames = eventLocationsGraph.getNodeNames();
    for (let existingNodeName of existingNodeNames) {
        const existingNodeOnMap = document.getElementById(existingNodeName);
        const existingNodeOnMapBoundingBox = existingNodeOnMap.getBoundingClientRect();
        const targetBoundingBox = target.getBoundingClientRect();

        const existingNodeOnMapCenter = {
            left: existingNodeOnMapBoundingBox.left + (existingNodeOnMapBoundingBox.width / 2),
            top: existingNodeOnMapBoundingBox.top + (existingNodeOnMapBoundingBox.height / 2)
        }

        const targetCenter = {
            left: targetBoundingBox.left + (targetBoundingBox.width / 2),
            top: targetBoundingBox.top + (targetBoundingBox.height / 2)
        }

        const distance = Math.sqrt(
            Math.pow(existingNodeOnMapCenter.left - targetCenter.left, 2) +
            Math.pow(existingNodeOnMapCenter.top - targetCenter.top, 2)
        )

        distances[existingNodeName] = distance;
    }

    return distances;
}

function getValuesFromForm(form) {
    const formData = new FormData(form);
    const values = {};
    formData.forEach((value, key) => {
        values[key] = value;
    });
    return values;
}

/**
 * UI Rendering
 */
function renderEventQueue() {
    document.getElementById("event-request-queue").innerHTML = '';
    eventRequestsQueue.forEach((node) => {
        const li = document.createElement("li");
        li.innerText = node.data.eventName;
        document.getElementById("event-request-queue").appendChild(li);
    });
}

renderEventQueue();
