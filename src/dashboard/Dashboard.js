import React from 'react';
import construccion from '../image/undraw_under_construction_46pa.svg'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div className="altodiv">
        <div className="d-flex justify-content-center">
          <img src={construccion} alt="" className="w-50"/>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <h2 className="text-dark">En construcción</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;