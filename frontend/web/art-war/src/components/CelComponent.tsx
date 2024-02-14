import React, { useRef, useState } from 'react';

interface CelProps {
  cel: any;
  backgroundColor: string;
  padding: string
}

const CelComponent: React.FC<CelProps> = ({cel, backgroundColor, padding}) => {
  const [color, setColor] = useState<string | null>(null);  

  return (
    <td 
      style={{ backgroundColor: color || backgroundColor, padding: padding }}
      onClick={()=> setColor('#FFFFFF')}
    > 
      {cel} 
    </td> 
  );
};

export default CelComponent;
