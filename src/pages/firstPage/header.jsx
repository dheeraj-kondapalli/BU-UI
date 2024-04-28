import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import HeaderDrag from '../../components/dnd/dragndrop';
import './header.css'
import * as XLSX from 'xlsx';

function Header() {
  const [columns, setColumns] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);

      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: range.s.r })];
        let hdr = 'UNKNOWN ' + C;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      console.log('1')
      setColumns(headers);
      setIsVisible(!isVisible)
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (

    <div className="one" >
      <div className='admin-container'>
      <h3>Select a File source</h3>
      <div className='input-box'>
        <div className='select-field'>
        <select id="source" name="source" value={selectedValue} onChange={handleChange}>
        <option value="">Select a file source</option>
        <option value="AWS">AWS</option>
        <option value="SFTP">SFTP</option>
        <option value="NAS">NAS</option>
        <option value="NDM">NDM</option>
      </select>
      <button>go</button>
      </div>
      <h4>or</h4>
      <div {...getRootProps()} className="dropzone" style={{ display: isVisible ? 'flex' : 'none' }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>
            <p>Drag 'n' drop some Excel files here,</p>
            <p> or click to select files</p>
            </p>
        }
      </div>
      </div>
      </div>
      <HeaderDrag dragColumn={columns} isVisible={isVisible} toggleVisibility={() => {console.log('reached'); setIsVisible(!isVisible)}} />
    </div>
  );
}

export default Header;
