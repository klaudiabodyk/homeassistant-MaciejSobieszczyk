import React, { useRef, useEffect } from 'react';
import * as fabric from 'fabric';

interface FabricCanvasProps {
    children?: React.ReactNode;
    hexColor?: string;
}

const FabricCanvas: React.FC<FabricCanvasProps> = ({ children, hexColor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = new fabric.Canvas(canvasRef.current, {width: 1500, height: 1000});
            const circle = new fabric.Circle({
                top: 155,
                left: 370,
                radius: 20,
                fill: hexColor
            });

            canvas.add(circle);


            // Animation
            const animate =  () => {
                canvas.item(0).animate('top', canvas.item(0).get('top') === 500 ? '100' : '500', {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: animate
                });
            }

            animate();

            return () => {
                // Clean up when component unmounts
                canvas.dispose();
            };
        }
    }, []);

    return <canvas ref={canvasRef} />;
};

export default FabricCanvas;
