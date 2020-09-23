import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import construccion from '../../image/undraw_under_construction_46pa.svg'
import './dashboard.css'

const Dashboard = (props) => {

  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser);
    } else {
      props.history.push("/")
    }
  }, [props.history]);

  const handleSignout = async (e) =>{
    e.preventDefault()
    try {
      await auth.signOut()
      props.history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="altodiv">
        <div className="d-flex justify-content-center">
          <button type="button" onClick={handleSignout} className="my-4 w-25 btn btn-outline-dark btn-block">Cerrar sesión</button>
        </div>
        <div className="d-flex justify-content-center">
          <img src={construccion} alt="" className="w-50" />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <h2 className="text-dark">En construcción</h2>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);