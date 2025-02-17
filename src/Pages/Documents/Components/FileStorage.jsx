import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, Row, Col, Input, Button, List } from 'antd';

// Folder names
const folderNames = [
  'Staff', 'Report', 'Contracts', 'Employee', 'Events', 
  'Announcements', 'Incidents', 'Government', 'Confidential'
];

const Folder = ({ name, documents, onDropDocument }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'document',
    drop: (item) => onDropDocument(item.name, name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Col md={8} sm={12} xs={24} style={{ marginBottom: 20 }}>
      <div ref={drop} style={{ border: '2px dashed #1890ff', padding: 20 }}>
        <h3>{name}</h3>
        <div style={{ backgroundColor: isOver ? '#f0f5ff' : '#fff' }}>
          <List
            bordered
            dataSource={documents}
            renderItem={(doc, index) => <List.Item key={index}>{doc}</List.Item>}
          />
        </div>
      </div>
    </Col>
  );
};

const Document = ({ name }) => {
  const [, drag] = useDrag({
    type: 'document',
    item: { name },
  });

  return (
    <div ref={drag} style={{ marginBottom: 20 }}>
      <Card style={{ width: 200, textAlign: 'center' }}>
        <p>{name}</p>
      </Card>
    </div>
  );
};

const FileStorage = () => {
  const [folders, setFolders] = useState(
    folderNames.reduce((acc, folder) => {
      acc[folder] = [];
      return acc;
    }, {})
  );

  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState('');

  // Handle document drop into folder
  const handleDropDocument = (docName, folderName) => {
    setFolders((prevFolders) => {
      const newFolders = { ...prevFolders };
      newFolders[folderName].push(docName);
      return newFolders;
    });
  };

  // Handle adding document
  const handleAddDocument = () => {
    if (docName.trim()) {
      setDocuments((prevDocuments) => [...prevDocuments, docName]);
      setDocName('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{display: 'flex', justifyContent: 'end'}}>
      <Input
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
        placeholder="Enter document name"
        style={{ width: 200, marginBottom: 20,}}
      />
      <Button onClick={handleAddDocument} type="primary">
        Add Document
      </Button>
      </div>

      <Row gutter={20}>
        {/* Display Folders */}
        {folderNames.map((folder) => (
          <Folder
            key={folder}
            name={folder}
            documents={folders[folder]}
            onDropDocument={handleDropDocument}
          />
        ))}
      </Row>

      {/* Document Input */}
      

      {/* Display Documents to be dragged */}
      <Row gutter={20} style={{ marginTop: 20 }}>
        {documents.map((doc) => (
          <Col span={4} key={doc}>
            <Document name={doc} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FileStorage;
