import React from 'react';

const LandingPage = ({ onShowLogin }) => {
  return (
    <div className="main-container">
      {/* Right Panel: Explanation */}
      <div className="right-panel">
        <h1>Welcome to Bug Detection System</h1>
        <p>
          The <strong>Bug Detection System</strong> is a powerful tool designed to help development teams report, track, and resolve bugs efficiently.
        </p>
        <ul>
          <li>📝 Report bugs with titles and descriptions</li>
          <li>🚦 Track statuses: Reported, In Progress, Closed</li>
          <li>🤝 Collaborate between developers and testers</li>
          <li>🔐 Built using Java, JDBC, and MySQL for secure data handling</li>
          <li>📈 Improve product reliability through systematic issue resolution</li>
        </ul>
        <p>
          Streamline your development workflow and deliver quality software faster with our integrated bug tracking solution.
        </p>
        <button onClick={onShowLogin}>Login</button>
      </div>
    </div>
  );
};

export default LandingPage;