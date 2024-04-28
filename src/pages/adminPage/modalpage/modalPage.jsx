import React, { useState } from 'react';
import './modalPage.css'

const AddRowModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    descrip: ''
  });

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setFormData({ ...formData, source: event.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({
      name: '',
      type: '',
      descrip: ''
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
          <div className= 'form-group'>
            <label htmlFor='name'>Name :</label>
            <input type="text" id='name' name='name' value={formData.name} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='source'>Source :</label>
            <select id="source" name="source" value={formData.type = selectedValue} onChange={handleSelectChange}>
              <option value="">Select a file source</option>
              <option value="AWS">AWS</option>
              <option value="SFTP">SFTP</option>
              <option value="NAS">NAS</option>
              <option value="NDM">NDM</option>
            </select>
          </div>
          <div className= 'form-group'>
            <label htmlFor='descrip'>Description :</label>
            <input type="text" id='descrip' name='descrip' value={formData.descrip} onChange={handleChange} />
          </div>
        </div>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddRowModal;
