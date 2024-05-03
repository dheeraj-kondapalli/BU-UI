import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import AddRowModal from './modalpage/modalPage';
import { DeleteTwoTone } from '@ant-design/icons';
import './adminPage.css';

const AdminPage = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: '1',
      type: 'AWS',
      details: '1.2.3.4',
      descrip: 'new'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addRow = (newRow) => {
    setTableData([...tableData, { ...newRow, id: tableData.length + 1 }]);
    closeModal();
  };

  const removeRow = (id) => {
    const updatedData = tableData.filter(row => row.id !== id);
    setTableData(updatedData);
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true
    },
    {
      name: 'Details',
      selector: row => row.details,
      sortable: true
    },
    {
      name: 'Description',
      selector: row=> row.descrip,
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => <button className='delete' onClick={() => removeRow(row.id)}><DeleteTwoTone className='delicon'/></button>
    }
  ];

  return (
    <div className='admin'>
      <div className='topcontainer'>
        <h2>admin</h2>
        <button onClick={openModal}>+ Add File</button>
      </div>
        <DataTable
          className='table'
          columns={columns}
          data={tableData}
          selectableRows
          fixedHeader
          pagination
        />

      <AddRowModal isOpen={isModalOpen} onClose={closeModal} onSave={addRow} />      
    </div>
  );
};

export default AdminPage;
