import React, { useState } from 'react';

function HeaderDrag({ dragColumn }) {
  console.log({dragColumn})
  const [columns, setColumns] = useState([
    { id: 1, title: 'Column 1', items: dragColumn },
    { id: 2, title: 'Column 2', items: [] },
    { id: 3, title: 'Column 3', items: [] }
  ]);

  const handleDragStart = (e, columnId, itemIndex) => {
    e.dataTransfer.setData('columnId', columnId);
    e.dataTransfer.setData('itemIndex', itemIndex);
    console.log(columnId)
    console.log(itemIndex)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    const sourceColumnId = e.dataTransfer.getData('columnId');
    const itemIndex = e.dataTransfer.getData('itemIndex');

    if (targetColumnId !== 1) {
      const updatedColumns = columns.map(column => {
        if (column.id === parseInt(targetColumnId)) {
          const newItem = columns.find(c => c.id === parseInt(sourceColumnId)).items[itemIndex];
          column.items.push(newItem);
        }
        return column;
      });
      setColumns(updatedColumns);

      const updatedColumns2 = columns.map(column => {
        if (column.id === parseInt(sourceColumnId) & column.id !== 1) {
            column.items.splice(itemIndex, 1);
        }
        return column;
      });

      setColumns(updatedColumns2);
    }
  };

  return (
    <div className="two">
      <div className="columns-container">
        {columns.map(column => (
          <div
            key={column.id}
            className="column"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column.id, index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderDrag;
