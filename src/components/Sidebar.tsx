// Sidebar.tsx

import React from 'react';
import styled from 'styled-components';

interface SidebarProps {
    isOpen: boolean;
}

const SidebarWrapper = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-250px)'};
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <SidebarWrapper isOpen={isOpen}>
            <h2>Sidebar</h2>
            <ul>
                <li>Home</li>
                <li>Transactions</li>
            </ul>
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <button>Logout</button>
            </div>
        </SidebarWrapper>
    );
};

export default Sidebar;
