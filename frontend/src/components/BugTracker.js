import React, { useState, useEffect } from 'react';
import './BugTracker.css';

const BugTracker = () => {
  const [bugId, setBugId] = useState(1);
  const [bugs, setBugs] = useState([]);
  const [javaErrorInput, setJavaErrorInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'reported'
  });
  const [referenceData, setReferenceData] = useState({
    title: '—',
    description: '—',
    assignedTo: '—',
    status: '—'
  });

  const statusLabels = {
    reported: "Reported",
    inprocess: "In Process",
    closed: "Closed"
  };

  const javaErrorDetails = {
    "nullpointerexception": "Occurs when calling a method on a null object reference.",
    "arrayindexoutofboundsexception": "Happens when accessing an array index outside its defined bounds.",
    "classnotfoundexception": "Thrown when an application tries to load a class but the class cannot be found.",
    "illegalargumentexception": "Thrown when a method receives an argument that is inappropriate or incorrect.",
    "numberformatexception": "Thrown when attempting to convert a string to a numeric type, but the string doesn't have appropriate format.",
    "indexoutofboundsexception": "Thrown when an index of some sort is out of range.",
    "stringindexoutofboundsexception": "Thrown when String methods are passed an index that is negative or greater than the size of the string.",
    "arithmeticexception": "Thrown when an exceptional arithmetic condition has occurred (like division by zero).",
    "securityexception": "Thrown by the security manager to indicate a security violation.",
    "unsupportedoperationexception": "Thrown to indicate that the requested operation is not supported."
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJavaErrorInput = (e) => {
    const input = e.target.value;
    setJavaErrorInput(input);
  };

  const getJavaErrorDetails = () => {
    const input = javaErrorInput.trim().toLowerCase();
    return javaErrorDetails[input] || "Error details will appear here...";
  };

  const addBug = () => {
    if (!formData.title || !formData.description || !formData.assignedTo) {
      alert("Please fill in all fields.");
      return;
    }

    const newBug = {
      id: bugId,
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      status: formData.status,
      createdAt: new Date().toISOString()
    };

    // Update Reference Box
    setReferenceData({
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      status: statusLabels[formData.status]
    });

    // Add to bug list
    setBugs(prev => [newBug, ...prev]);
    setBugId(prev => prev + 1);

    // Reset form
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      status: 'reported'
    });
  };

  const updateBugStatus = (bugId, newStatus) => {
    setBugs(prev => prev.map(bug => 
      bug.id === bugId ? { ...bug, status: newStatus } : bug
    ));
  };

  const deleteBug = (bugId) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setBugs(prev => prev.filter(bug => bug.id !== bugId));
    }
  };

  return (
    <div className="container">
      <h1>🐞 BUG FINDER</h1>

      {/* Reference Box */}
      <div className="reference-box">
        <h3>📌 Bug Reference Preview</h3>
        <p><strong>Title:</strong> <span>{referenceData.title}</span></p>
        <p><strong>Description:</strong> <span>{referenceData.description}</span></p>
        <p><strong>Assigned To:</strong> <span>{referenceData.assignedTo}</span></p>
        <p><strong>Status:</strong> <span>{referenceData.status}</span></p>
      </div>

      {/* Java Error Input Reference Box */}
      <div className="reference-box">
        <h3>💡 Java Error Lookup</h3>
        <input 
          type="text" 
          className="java-error-input"
          placeholder="Enter Java error (e.g., NullPointerException)" 
          value={javaErrorInput}
          onChange={handleJavaErrorInput}
        />
        <p className="java-error-output">{getJavaErrorDetails()}</p>
      </div>

      {/* Bug Submission Form */}
      <div className="bug-form">
        <input 
          type="text" 
          name="title"
          placeholder="Bug Title" 
          value={formData.title}
          onChange={handleInputChange}
          required 
        />
        <textarea 
          name="description"
          placeholder="Bug Description" 
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          name="assignedTo"
          placeholder="Assigned To" 
          value={formData.assignedTo}
          onChange={handleInputChange}
          required 
        />
        <select 
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="reported">Reported</option>
          <option value="inprocess">In Process</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={addBug}>Submit Bug</button>
      </div>

      {/* Bug List */}
      <h2>📝 Assigned Bugs</h2>
      <div className="bug-list">
        {bugs.length === 0 ? (
          <div className="no-bugs">
            <p>No bugs submitted yet. Add your first bug above!</p>
          </div>
        ) : (
          bugs.map(bug => (
            <div key={bug.id} className="bug-card">
              <div className="bug-header">
                <span className="bug-id">#{bug.id}</span>
                <div className="bug-actions">
                  <select 
                    className="status-select"
                    value={bug.status}
                    onChange={(e) => updateBugStatus(bug.id, e.target.value)}
                  >
                    <option value="reported">Reported</option>
                    <option value="inprocess">In Process</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteBug(bug.id)}
                    title="Delete Bug"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <h3>{bug.title}</h3>
              <p><strong>Description:</strong> {bug.description}</p>
              <p><strong>Assigned To:</strong> {bug.assignedTo}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${bug.status}`}>
                {statusLabels[bug.status]}
              </span></p>
              <p className="created-at">
                <strong>Created:</strong> {new Date(bug.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BugTracker;