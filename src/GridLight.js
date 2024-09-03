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
  const [totalActiveCellsNeeded, setTotalActiveCellsNeeded] = useState(0);

  useEffect(() => {
    setTotalActiveCellsNeeded(matrix.flat().filter(Boolean).length);
  }, []);

  useEffect(() => {
    // Define the function to remove active cells sequentially inside useEffect
    const removeActiveCellsSequentially = () => {
      const activeCellsArray = Array.from(activeCells);
      let index = activeCellsArray.length - 1; // Start from the last item

      const removeNext = () => {
        if (index >= 0) {
          setActiveCells(new Set(activeCellsArray.slice(0, index)));
          // setActiveCells(activeCellsArray.pop())
          index--; // Move to the previous item
          setTimeout(removeNext, 300);
        } else {
          setRemovalProgress(false);
        }
      };

      removeNext();
    };

    // Check if all active cells are selected and removal is not in progress, then start the removal process
    if (activeCells.size === totalActiveCellsNeeded && !removalInProgress) {
      setRemovalProgress(true);
      setTimeout(removeActiveCellsSequentially, 300);
    }
  }, [activeCells, removalInProgress, totalActiveCellsNeeded]);

  const handleCellClick = (cellKey) => {
    setActiveCells((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(cellKey)) {
        newSet.add(cellKey);
      }
      return newSet;
    });
  };

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
