import {  EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/reducers/ToogleReducer';
import { removeEdge } from '../../redux/reducers/NodeReducer';
import { useState } from 'react';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleAddNode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(toggleModal(true));
    };

    const handleRemoveEdge = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(removeEdge(id));
    };

    return (
        <>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                style={style}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />
            {hovered && (
                <EdgeLabelRenderer>
                    <div 
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                        className="nodrag flex gap-1 pointer-events-auto -top-2 items-center shadow bg-[#333] p-1 rounded nopan"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <button
                             className=" text-[.4rem] cursor-pointer hover:text-red-500 "
                            onClick={handleAddNode}
                        >
                            <Plus size={12}/>
                        </button>
                        <button
                            className=" text-[.4rem] cursor-pointer hover:text-red-500 "
                            onClick={handleRemoveEdge}
                        >
                            <FaTrash size={12}/>
                        </button>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    )
}

export default CustomEdge;