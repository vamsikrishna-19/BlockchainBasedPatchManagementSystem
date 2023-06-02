import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AdminCard = () => {
    const Navigate = useNavigate();
    return (
        <div className='container my-5 '>
            <nav className='bg-dark p-1'>
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin");
                        }}>Admin Request Form
                        </button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin/DeployPatches");
                        }}>Deploy
                            Patches</button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin/TrackingPatches");
                        }}>Tracking
                            Patches</button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin/getsDownloadHistory");
                        }}>Get download History
                        </button>
                    </li>
                </ul>
            </nav>

            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default AdminCard
