// Dashboard.tsx

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const Dashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar isOpen={isOpen} />
            <div style={{ marginLeft: isOpen ? '250px' : '0', transition: 'margin-left 0.5s ease-in-out' }}>
                <h1>Main Content</h1>
            </div>
        </div>
    );
};

export default Dashboard;
