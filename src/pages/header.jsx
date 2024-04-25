import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import HeaderDrag from '../components/dragndrop';
import * as XLSX from 'xlsx';

function Header() {
  const [columns, setColumns] = useState([]);

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

      setColumns(headers);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="one">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some Excel files here, or click to select files</p>
        }
      </div>
      <div className="columns-container">
        {columns.map((column, index) => (
          <div key={index} className="column">
            <h3>{column}</h3>
          </div>
        ))}
      </div>
      <HeaderDrag dragColumn={columns}/>
    </div>
  );
}

export default Header;
