import { BaseEdge, EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/reducers/ToogleReducer';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';


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
    const [hover, setHover] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onHover = () => {
            if (ref.current) {
                setHover((prev: boolean) => !prev)
            }
        }
        document.addEventListener("mouseup", onHover)
        return () => {
            document.removeEventListener("mousedown", onHover)
        }
    }, [setHover])


    const dispatch = useDispatch();
    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(toggleModal(true))
    }

    return (
        <>
            <BaseEdge 
            path={edgePath}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            markerEnd={markerEnd} 
            style={style} 
            />
            { hover  && (
                <EdgeLabelRenderer>
                    <div
                        ref={ref}
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,

                        }}
                        className="nodrag bg-[#2d2d2e] h-fit w-fit px-2 justify-center  flex items-center gap-1 pointer-events-auto text-[1rem] nopan "
                    >
                        <button onClick={(e) => toggle(e)} className="p-1 hover:text-[#ff6f5b] cursor-pointer mt-6 border rounded ">
                            <Plus size={10} />
                        </button>
                        <button
                            className=" text-gray 
                         flex items-center justify-center transition-colors
                         hover:text-[#ff6f5b] cursor-pointer"
                            onClick={(event) => {
                                event.stopPropagation();
                                console.log('remove edge');
                            }}
                        >
                            <FaTrash size={10} />
                        </button>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default CustomEdge;