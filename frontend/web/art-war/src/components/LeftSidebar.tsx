import React from 'react';

const LeftSidebar: React.FC = () => {
  return (
    <ol className="list-group list-group-numbered">
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Content for list item
        </div>
        <span className="badge bg-primary rounded-pill">14</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Content for list item
        </div>
        <span className="badge bg-primary rounded-pill">14</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Content for list item
        </div>
        <span className="badge bg-primary rounded-pill">14</span>
      </li>
    </ol>
  );
};

export default LeftSidebar;