import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEdge,Edge, Node } from "@xyflow/react";
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
            description: "Initial step of the workflow"
        }
      }
  ],
  edges: [],
  triggeringNode: null,
  lastCreatedNode: null,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    // Add a new node
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
      state.lastCreatedNode = action.payload.id; // Store last created node
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
        state.nodes[index] = action.payload;
      }
    },

    // Handle edges
    addNewEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push({
        id: action.payload.id,
        source: action.payload.source,
        target: action.payload.target,
      });
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

export const { addNode, removeNode, updateNode, addNewEdge, setTriggeringNode, setLastCreatedNode } =
  nodeSlice.actions;
export default nodeSlice.reducer;
