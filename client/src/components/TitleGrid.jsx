import React, { useState } from 'react';
import titlesData from '../titlesData.json';
import '../TitleGrid.css';

const TitleGrid = () => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleClick = (id) => {
    const title = titlesData.find(t => t.id === id);
    setSelectedTitle(title);
  };

  const handleClose = () => {
    setSelectedTitle(null);
  };

  return (
    <div className="container">
      <h1></h1>
      <div className="title-grid">
        {titlesData.map((title) => (
          <div key={title.id} className="title-item" onClick={() => handleClick(title.id)}>
            <h2>{title.event}</h2>
            <p> <span className='head'>Host:</span> {title.host}</p>
            <p> <span className='start'>Start:</span> {title.start}</p>
            <p> <span className='end'>End:</span> {title.end}</p>
            <p> <span className='head'>Duration:</span> {title.duration}</p>
            <a href={title.href} target="_blank" rel="noopener noreferrer">View Contest</a>
          </div>
        ))}
      </div>
      {selectedTitle && (
        <div className="title-details active">
          <h2>{selectedTitle.event}</h2>
          <p><strong><span className='head'>Host:</span></strong> {selectedTitle.host}</p>
          <p><strong><span className='start'>Start:</span></strong> {selectedTitle.start}</p>
          <p><strong><span className='end'>End:</span></strong> {selectedTitle.end}</p>
          <p><strong><span className='head'>Duration:</span></strong> {selectedTitle.duration}</p>
          <a href={selectedTitle.href} target="_blank" rel="noopener noreferrer">View Contest</a>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TitleGrid;