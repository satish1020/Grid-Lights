import React, { useCallback, useEffect, useState } from "react";
import "./GridLight.css";

export default function GridLight() {
  const matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const [activeCells, setActiveCells] = useState(new Set());
  const [removalInProgress, setRemovalProgress] = useState(false);

  // Calculate total active cells needed for completion.
  const totalActiveCellsNeeded = matrix.flat().filter(Boolean).length;

  useEffect(() => {
    // If all active cells are selected, start removal process.
    if (activeCells.size === totalActiveCellsNeeded && !removalInProgress) {
      setRemovalProgress(true);
      removeActiveCellsSequentially();
    }
  }, [activeCells, removalInProgress]);

  const handleCellClick = (cellKey) => {
    setActiveCells((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(cellKey)) {
        newSet.add(cellKey);
      }
      return newSet;
    });
  };

  const removeActiveCellsSequentially = useCallback(() => {
    const activeCellsArray = Array.from(activeCells);
    const removeNext = () => {
      if (activeCellsArray.length > 0) {
        setActiveCells(new Set(activeCellsArray.slice(0, -1)));
        activeCellsArray.pop();
        setTimeout(removeNext, 200);
      } else {
        setRemovalProgress(false);
      }
    };
    removeNext();
  }, [activeCells]);

  const renderCellView = (row, rowIndex) => {
    return (
      <>
        {row.map((column, columnIndex) => {
          const cellKey = `${rowIndex}${columnIndex}`;
          let cellClassName = column ? "cell-show" : "cell-hide";
          if (activeCells.has(cellKey)) {
            cellClassName += " active";
          }
          return (
            <div
              className={cellClassName}
              key={cellKey}
              onClick={() => handleCellClick(cellKey)}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="grid-view">
      {matrix.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {renderCellView(row, rowIndex)}
        </div>
      ))}
    </div>
  );
}