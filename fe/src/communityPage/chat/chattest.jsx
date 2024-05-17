import React, { useState } from 'react';
import {Resizable} from 're-resizable';
import Draggable from 'react-draggable';

const ResizableComponent = () => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    // console.log(data)
  };
  const handleResizeStop = (e, direction, ref, d) => {
    setSize({
      width: size.width + d.width,
      height: size.height + d.height,
    });
  };

  return (
    <Draggable onDrag={(e, data) => trackPos(data)}>
    <Resizable
      size={size}
      onResizeStop={handleResizeStop}
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        background: '#f0f0f0',
      }}
    >
      Sample with size
    </Resizable>
    </Draggable>
  );
};

export default ResizableComponent;
