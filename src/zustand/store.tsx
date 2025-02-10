import { create } from "zustand";
import StartNode from "../components/Nodes/StartNode";

export const nodeTypes = {
    commerce: StartNode
};

interface NodeProps {
    id: string;
    position: { x: number; y: number };
    type: string;
    data: Record<string, unknown>;
}

interface IStoreState {
    extend: boolean;
    showModal: boolean;
    nodes: NodeProps[];
}

interface IStoreActions {
    toggleExtend: () => void;
    toggleModal: (value: boolean) => void;
    setNodes: (nodes: NodeProps[]) => void;
}

const createDefaultNodes = (): NodeProps[] => [
    {
        id: "1",
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        type: "commerce",
        data: {}
    }
];

const useStore = create<IStoreState & IStoreActions>((set) => ({
    extend: false,
    showModal: false,
    nodes: createDefaultNodes(), 

    toggleExtend: () => set((state) => ({ extend: !state.extend })),
    toggleModal: (value) => set(() => ({ showModal: value })),
    setNodes: (nodes) => set(() => ({ nodes })) // Update nodes properly
}));

export default useStore;
