import React, { useState } from 'react';

interface CelProps {
  cel: string;
  backgroundColor: string;
  padding: string;
  color: {
    _id: string;
    color: string
  }
}

const CelComponent: React.FC<CelProps> = ({cel, backgroundColor, padding, color}) => {
  const [bgColor, setBgColor] = useState<string>('');  

  return (
    <td 
      style={{ backgroundColor: bgColor || backgroundColor, padding: padding }}
      onClick={()=> setBgColor(color?.color)}
    > 
      {cel} 
    </td> 
  );
};

export default CelComponent;
