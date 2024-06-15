import React, { useState } from 'react';
import Navbar from '../Navbar.jsx';

const PublicProblems = ({ publicProblems }) => {
  const [comments, setComments] = useState({});

  const handleCommentChange = (id, event) => {
    setComments({
      ...comments,
      [id]: event.target.value,
    });
  };

  const handleCommentSubmit = (id) => {
    console.log(`Comment for problem ${id}: ${comments[id]}`);
    // Here you can add logic to save the comment, e.g., sending it to a server
    alert(`Comment for problem ${id}: ${comments[id]}`);
    setComments({
      ...comments,
      [id]: '',
    });
  };

  return (
    <div>
      <Navbar />
      <div className='dash'>Public Problems</div>
      <ul>
        <div className='dashcont'>
          
        {publicProblems.map((problem) => (
          <li key={problem.id}>
            <a href={problem.leetCodeLink} target="_blank" rel="noopener noreferrer">
              {problem.name}
            </a>
            <div className='com'>
              <textarea
                value={comments[problem.id] || ''}
                onChange={(event) => handleCommentChange(problem.id, event)}
                placeholder="Add a comment"
              />
              <button className='subcom' onClick={() => handleCommentSubmit(problem.id)}>Submit</button>
            </div>
          </li>
          
        ))}
        </div>
      </ul>
    </div>
  );
};

export default PublicProblems;