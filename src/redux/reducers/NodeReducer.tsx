import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, Node, MarkerType, Position } from "@xyflow/react";
import { Plus } from "lucide-react"
interface FlowState {
  nodes: Node[];
  edges: Edge[];
  triggeringNode: string | null;
  lastCreatedNode: string | null;
}

export const edgeStyle = {
  markerStart: {
    type: MarkerType.Arrow
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
    color: '#888'
  },
  style: {
    strokeWidth: 2,
    stroke: '#888',
    opacity: 0.7,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      stroke: '#ff6f5b',
      opacity: 1
    }
  },
  type: 'custom',
};


const initialState: FlowState = {
  nodes: [
    {
      id: "33",
      position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 },
      type: "start",
      data: {
        title: "When clicking 'Execute Workflow'",
        icon: <Plus size={20} />,
        description: "Trigger workflow execution",
        plusButton: null
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      sourceHandle: "source",
      targetHandle: "target"
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
    addNode: (state, action: PayloadAction<Node>) => {
      const newNode = {
        ...action.payload,
      }
      state.lastCreatedNode = state.nodes[state.nodes.length - 1].id
      console.log(state.lastCreatedNode)

      if (state.triggeringNode) {
        const plusButtonNode = state.nodes.find(node => node.data.plusButton);
        if (plusButtonNode) {
          state.nodes = state.nodes.filter(node => node.id !== plusButtonNode.id);
          state.edges = state.edges.filter(edge =>
            edge.source !== plusButtonNode.id &&
            edge.target !== plusButtonNode.id
          );
        }


        const newEdge: Edge = {
          id: `e${state.triggeringNode}-${newNode.id}`,
          source: state.triggeringNode,
          target: newNode.id,
          sourceHandle: 'source',
          targetHandle: 'target',
          ...edgeStyle,
          data: { removable: true }
        };
        state.edges.push(newEdge);
      }

      state.nodes.push(newNode);

      // Only create plus button if this node isn't connected to anything
      const isNodeConnected = state.edges.some(edge => edge.source === newNode.id);
      if (!isNodeConnected) {
        const plusButtonNode: Node = {
          id: `plus-${newNode.id}`,
          position: {
            x: newNode.position.x + 100,
            y: newNode.position.y
          },
          type: "open",
          data: {
            icon: <Plus size={16} />,
            plusButton: true
          }
        };

        state.nodes.push(plusButtonNode);

        const plusButtonEdge: Edge = {
          id: `e${newNode.id}-${plusButtonNode.id}`,
          source: newNode.id,
          target: plusButtonNode.id,
          sourceHandle: 'source',
          targetHandle: 'target',
          ...edgeStyle,
          style: {
            ...edgeStyle.style,
          },
          data: { removable: true }
        };
        state.edges.push(plusButtonEdge);

      }

      if (state.lastCreatedNode) {
        state.triggeringNode = newNode.id;
      }



      // state.lastCreatedNode = newNode.id;
      // state.triggeringNode = null;
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
        if (state.nodes[index].data.plusButton) {
          // Remove the plus button node and its connecting edge
          state.nodes = state.nodes.filter(node => node.id !== action.payload.id);
          state.edges = state.edges.filter(edge =>
            edge.source !== action.payload.id && edge.target !== action.payload.id
          );
        } else {
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
        });
      }
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      const unwantedEdge = state.edges.find(edge => edge.id === action.payload)
      if (unwantedEdge) {
        state.edges = state.edges.filter(edge => edge.id !== unwantedEdge?.id)
      }
    },

    // Set the triggering node (Plus button)
    setTriggeringNode: (state: FlowState, action: PayloadAction<string | null>) => {

      state.triggeringNode = action.payload;
    },

    // Set the last created node
    setLastCreatedNode: (state, action: PayloadAction<string | null>) => {

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

