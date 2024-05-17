import React from 'react';
import { useSelector } from 'react-redux';

const ProjectLoadingPage = () => {
    const myCurrentProject = useSelector(state => state.myCurrentProject.value);
    const isDark = useSelector(state => state.isDark.isDark)

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{backgroundColor: isDark ? 'grey' :'whitesmoke'}}>
            <div className="text-center mb-3">
                <h2 style={{color: isDark ? 'whitesmoke' : 'black'}}>Loading...</h2>
                <p style={{color: isDark ? 'whitesmoke' : 'black'}}>Please wait while <span style={{fontWeight: 'bold', color: '#564CAD'}}>{myCurrentProject.projectName}</span> is loading.</p>
            </div>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default ProjectLoadingPage;
