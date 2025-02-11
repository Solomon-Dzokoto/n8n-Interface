import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, Node } from "@xyflow/react";
import { Plus } from "lucide-react"
interface FlowState {
  nodes: Node[];
  edges: Edge[];
  triggeringNode: string | null; // Stores the node that opened the modal
  lastCreatedNode: string | null; // Stores the last created node
}


const initialState: FlowState = {
  nodes: [
    {
        id: "33",
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        type: "start",
        data: {
            title: "Start",
            icon: <Plus size={20} />,
            description: "Initial step of the workflow",
            plusButton: null 
        }
      }
  ],
  edges: [] as Edge[],
  triggeringNode: null,
  lastCreatedNode: null,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    // Add a new node
    addNode: (state, action: PayloadAction<Node>) => {
      const newNode = action.payload;
      state.nodes.push(newNode);
      state.lastCreatedNode = action.payload.id; // Store last created node

      const plusButtonNode: Node = {
        id: `plus-${newNode.id}`,
        position: {
          x: newNode.position.x + 100, // Offset to the right
          y: newNode.position.y 
        },
        type: "open",
        data: {
          title: "Add next step",
          icon: <Plus size={10} />,
          description: "Add next workflow step",
          plusButton: true
        }
      };
      
      // Add the plus button node
      state.nodes.push(plusButtonNode);
    
      // Create edge from action node to plus button
      const newEdge: Edge = {
        id: `e${newNode.id}-${plusButtonNode.id}`,
        source: newNode.id,
        target: plusButtonNode.id,
        type: 'smoothstep',
        animated: true,
      };
      state.edges.push(newEdge);
    
      state.lastCreatedNode = plusButtonNode.id;
  
    },

    // Remove a node
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.edges = state.edges.filter((edge) => edge.source !== action.payload && edge.target !== action.payload);
    },

    // Update an existing node
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (index !== -1) {
    // If updating a plus button node, remove it and its edge
    if (state.nodes[index].data.plusButton) {
      state.edges = state.edges.filter(edge => 
        edge.source !== action.payload.id && edge.target !== action.payload.id
      );
      state.nodes.splice(index, 1);
    } else {
      // Normal node update
      state.nodes[index] = {
        ...state.nodes[index],
        ...action.payload,
        data: {
          ...state.nodes[index].data,
          ...action.payload.data
        }
      };
    }
  }
    },

    // Handle edges
    addNewEdge: (state, action: PayloadAction<Edge>) => {
      const { source, target } = action.payload;
      
      // Check if source and target nodes exist
      const sourceExists = state.nodes.some(node => node.id === source);
      const targetExists = state.nodes.some(node => node.id === target);
      
      // Check if edge already exists
      const edgeExists = state.edges.some(
        edge => edge.source === source && edge.target === target
      );

      if (sourceExists && targetExists && !edgeExists) {
        state.edges.push({
          ...action.payload,
          type: 'smoothstep',
          animated: true,
        });
      }
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      const edgeExists = state.edges.some(edge => edge.id === action.payload);
      if (edgeExists) {
        state.edges = state.edges.filter(edge => edge.id !== action.payload);
      }
    },



    // Set the triggering node (Plus button)
    setTriggeringNode: (state, action: PayloadAction<string | null>) => {
      console.log("Setting triggering node:", action.payload);
      state.triggeringNode = action.payload;
    },

    // Set the last created node
    setLastCreatedNode: (state, action: PayloadAction<string | null>) => {
      console.log("Setting lastCreatedNode:", action.payload);
      state.lastCreatedNode = action.payload;
    },
  },
});

export const { 
  addNode,
  removeNode,
  updateNode,
  addNewEdge,
  removeEdge,
  setTriggeringNode,
  setLastCreatedNode
 } =
  nodeSlice.actions;
export default nodeSlice.reducer;
