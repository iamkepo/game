import React, { useState } from 'react';

interface CelProps {
  cel: string;
  backgroundColor: string;
  padding: string
}

const CelComponent: React.FC<CelProps> = ({cel, backgroundColor, padding}) => {
  const [color, setColor] = useState<string>('');  

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
