import React, { useState } from 'react';
import Navbar from '../Navbar.jsx';
import { SiPrivateinternetaccess } from "react-icons/si";
const ProblemPage = ({ addToPublicProblems }) => {
  const [problems, setProblems] = useState([
    {
      id: 1,
      name: 'Reverse a Linked List',
      answer: 'To reverse a linked list, we need to reverse the links between nodes. This can be done iteratively or recursively.',
      leetCodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
      isPrivate: false,
    },
    {
      id: 2,
      name: 'Binary Search Tree Validation',
      answer: 'To validate a binary search tree, we need to ensure that for every node, its left child is less than the node, and its right child is greater than the node.',
      leetCodeLink: 'https://leetcode.com/problems/validate-binary-search-tree/',
      isPrivate: false,
    },
    {
      id: 3,
      name: 'The Eagle',
      answer: 'To validate a binary search tree, we need to ensure that for every node, its left child is less than the node, and its right child is greater than the node.',
      leetCodeLink: 'https://www.e-olymp.com/en/contests/241/problems/2221',
      isPrivate: false,
    },
    {
      id: 4,
      name: 'Number of odd digits',
      answer: 'To validate a binary search tree, we need to ensure that for every node, its left child is less than the node, and its right child is greater than the node.',
      leetCodeLink: 'https://www.e-olymp.com/en/contests/11553/problems/107580',
      isPrivate: false,
    },
    {
      id: 5,
      name: 'Nuclear Meltdown',
      answer: 'To validate a binary search tree, we need to ensure that for every node, its left child is less than the node, and its right child is greater than the node.',
      leetCodeLink: 'https://codedrills.io/problems/nuclear-meltdown',
      isPrivate: false,
    },
    {
      id: 6,
      name: 'Нова пошта',
      answer: 'To validate a binary search tree, we need to ensure that for every node, its left child is less than the node, and its right child is greater than the node.',
      leetCodeLink: 'https://www.e-olymp.com/en/contests/5171/problems/40815',
      isPrivate: false,
    },
    // ... (other problems)
  ]);

  const [newProblemLink, setNewProblemLink] = useState('');
  const [newProblemName, setNewProblemName] = useState('');
  const [newProblemAnswer, setNewProblemAnswer] = useState('');

  const handleMakePublic = (id) => {
    const updatedProblems = problems.map((problem) =>
      problem.id === id ? { ...problem, isPrivate: false } : problem
    );
    setProblems(updatedProblems);

    const selectedProblem = updatedProblems.find((problem) => problem.id === id);
    addToPublicProblems(selectedProblem);
  };

  const handleMakePrivate = (id) => {
    const updatedProblems = problems.map((problem) =>
      problem.id === id ? { ...problem, isPrivate: true } : problem
    );
    setProblems(updatedProblems);
  };

  const handleAddProblem = () => {
    const newProblem = {
      id: problems.length + 1,
      name: newProblemName,
      answer: newProblemAnswer,
      leetCodeLink: newProblemLink,
      isPrivate: false,
    };
    setProblems([...problems, newProblem]);
    setNewProblemLink('');
    setNewProblemName('');
    setNewProblemAnswer('');
  };

  return (
    <div>
      <Navbar />
      <div className='probhead'>
      <span className='mid'>Your Private Problems</span> <SiPrivateinternetaccess/>
      </div>
      <div className='procont'> 
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <div className='probname'>
            <a href={problem.leetCodeLink} target="_blank" rel="noopener noreferrer">
              {problem.name} 
            </a> </div>
            <span className='hint'>{'Hint - '}</span>
            {problem.answer}
            <button className='pubton' onClick={() => handleMakePublic(problem.id)}>Make Public</button>
          </li>
        ))}
      </ul>
      <div className='addn'>Add New Problem</div>
      <div className='new'>
  <input
    type="text"
    value={newProblemName}
    onChange={(e) => setNewProblemName(e.target.value)}
    placeholder="Problem Name"
    className="problem-name-input"
  /> </div>
  <div>
  <input
    type="text"
    value={newProblemLink}
    onChange={(e) => setNewProblemLink(e.target.value)}
    placeholder="Problem Link"
    className="problem-link-input"
  /> </div>
  <div>
  <textarea
    value={newProblemAnswer}
    onChange={(e) => setNewProblemAnswer(e.target.value)}
    placeholder="Hint"
  />
</div>

      <button className='addbut' onClick={handleAddProblem}>Add Problem</button>
    </div>
    </div>
  );
};

export default ProblemPage;

