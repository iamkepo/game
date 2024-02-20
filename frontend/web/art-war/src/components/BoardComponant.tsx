import React, { Component, ReactNode } from "react";
import CelComponent from "@/components/CelComponent";

interface BoardProps {
  config: {
    rows: number;
    cels: number;
  };
  padding: string;
}

class BoardComposant extends Component<BoardProps> {
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(): ReactNode {
    const { config, padding } = this.props;
    const { rows = 0, cels = 0 } = config || {};

    const tab: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cels; j++) {
        row.push('');
      }
      tab.push(row);
    }

    return (
      <div id="board" className="mx-auto">
        <table>
          <thead></thead>
          <tbody>
            {tab.map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cel: string, j: number) => (
                  <CelComponent
                    key={j}
                    cel={cel}
                    backgroundColor={this.getRandomColor()}
                    padding={padding}
                  />
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default BoardComposant;
