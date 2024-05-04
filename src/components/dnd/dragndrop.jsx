import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './dnd.css'

function HeaderDrag({ dragColumn, isVisible, toggleVisibility  }) {
  const [columns, setColumns] = useState([]);

  const data = [
    { id: 1, title: 'Available Columns', items: dragColumn },
    { id: 2, title: 'Filtered Columns', items: [] }
  ];

  const [renderSecondColumn, setRenderSecondColumn] = useState(false);

  const handleButtonClick = () => {
    setRenderSecondColumn(true);
  };

  const handleReset = () => {
    toggleVisibility()
    setRenderSecondColumn(false);
    console.log(filter)
  }
  const [fields, setFields] = useState([{ id: 1, name: '', value: '' }]);

  const addField = () => {
    const newField = { id: fields.length + 1, name: '', value: '' };
    setFields([...fields, newField]);
  };

  const handleFieldChange = (id, field, value) => {
    const updatedFields = fields.map(field =>
      field.id === id ? { ...field, [field]: value } : field
    );
    setFields(updatedFields);
  };

  useEffect(() => {
    console.log('executed')
    setColumns(data);
  },[dragColumn])
  
  const handleDragStart = (e, columnId, itemIndex) => {
    e.dataTransfer.setData('columnId', columnId);
    e.dataTransfer.setData('itemIndex', itemIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId, index) => {
    console.log(index)
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

  const handleDragEnd = (e) => {
    // If the drag ends outside a valid drop target, remove the item from the source list
    const sourceColumnId = e.dataTransfer.getData('columnId');
    const itemIndex = e.dataTransfer.getData('itemIndex');
  
    // Check if the dragend event happened outside the valid drop targets
    if (!e.currentTarget.contains(e.relatedTarget)) {
      const updatedColumns = columns.map(column => {
        if (column.id === parseInt(sourceColumnId)) {
          column.items.splice(itemIndex, 1);
        }
        return column;
      });
      setColumns(updatedColumns);
    }
  };
  return (
    <div className="two" style={{ display: !isVisible ? 'flex' : 'none' }}     onDragEnd={(e) => handleDragEnd(e)}>
      <div className="columns-container">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="column"
            style={{ display: (index !== 0 && !renderSecondColumn) ? 'none' : 'flex' }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, column.id, column.index)}
          >
            <div className='column-header'>
            <h3 className='title'>{column.title}</h3>
            </div>
            <ul className='list' draggable>
              {column.items.map((item, index) => (
                <a
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column.id, index)}
                >{item}</a>
              ))}
              </ul>
          </div>
        ))}
        <div className='column' style={{ display: (!renderSecondColumn) ? 'none' : 'flex' }}>
          <div className='column-header'>
          <h3>Final Column</h3>
          </div>
          <ul className='list'>
          {fields.map(field => (
          <li className='item' key={field.id}>
            <label htmlFor={`name-${field.id}`}>Column:</label>
            <input
              id={`name-${field.id}`}
              placeholder='Name'
              value={field.name}
              onChange={e => handleFieldChange(field.id, 'name', e.target.value)}
            />
            <input
              id={`value-${field.id}`}
              placeholder='Value'
              value={field.value}
              onChange={e => handleFieldChange(field.id, 'value', e.target.value)}
            />
          </li>
        ))}
          </ul>
          <button className='addbtn' onClick={addField}><PlusOutlined /></button>
        </div>
      </div>
      {!renderSecondColumn && (
        <button className='resetbtn' onClick={handleButtonClick}>all good</button>
      )}
      <button className='resetbtn' onClick={handleReset}>reUpload</button>
    </div>
  );
}

export default HeaderDrag;