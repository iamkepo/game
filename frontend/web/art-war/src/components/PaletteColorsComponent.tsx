import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';

interface PaletteColorsProps {
  onSelect: (color: string) => void;
}

const PaletteColorsComponent: React.FC<PaletteColorsProps> = ({onSelect}) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    generateRandomColors();
  }, []);

  const generateRandomColors = () => {
    const newColors = [];
    for (let i = 0; i < 50; i++) {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      newColors.push(randomColor);
    }
    setColors(newColors);
  };

  const handleColorSelect = (color: string) => {
    onSelect(color);
  };
  return (
    <div className="row">
      {colors.map((color, index) => (
        <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3">
          <Button className='p-3' style={{ backgroundColor: color }} onClick={() => handleColorSelect(color)} />
        </Col>
      ))}
    </div>
  );
};

export default PaletteColorsComponent;
