// AddRowModal.js
import React, { useState } from 'react';
import './modalPage.css'

const AddRowModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({
      name: '',
      type: '',
      details: ''
    });
  };

  return (
    <div className="modal" style={{ display: isOpen? 'flex' : 'none' }} >
      <div className="modal-content">
        <div className='modal-header'>
          <h3>Enter the details</h3>
        <button onClick={onClose}>Close</button>
        </div>
        <div className='form'>
        {Object.keys(formData).map((key) => (
          <div className= 'form-group' key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input type="text" id={key} name={key} value={formData[key]} onChange={handleChange} />
          </div>
        ))}
        </div>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddRowModal;
