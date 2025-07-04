import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import { getServers } from './services/api';
import './App.css';

const App = () => {
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState('');
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [chatBoxKey, setChatBoxKey] = useState(0); // for resetting ChatBox

    useEffect(() => {
        const fetchServers = async () => {
            const result = await getServers();
            setServers(result);
        };
        fetchServers();
    }, []);

    // New Chat handler to reset ChatBox
    const handleNewChat = () => {
        setChatBoxKey(prev => prev + 1); // force ChatBox remount
    };

    return (
        <div className="app-root">
            {/* Top-left controls: sidebar toggle only */}
            <div className="top-left-controls">
                <button
                    className="sidebar-toggle-btn"
                    onClick={() => setSidebarExpanded(exp => !exp)}
                    aria-label={sidebarExpanded ? 'Hide chat history' : 'Show chat history'}
                >
                    {sidebarExpanded ? '⟨' : '☰'}
                </button>
            </div>
            {/* Bottom-left controls: New Chat button */}
            <div className="bottom-left-controls">
                <button
                    className="sidebar-toggle-btn new-chat-inline-btn"
                    onClick={handleNewChat}
                    aria-label="New Chat"
                >
                    +
                </button>
            </div>
            <div className={`sidebar${sidebarExpanded ? ' expanded' : ' collapsed'}`}>
                {sidebarExpanded && (
                    <div style={{padding: '24px', color: '#888', fontWeight: 500}}>Chat History (placeholder)</div>
                )}
            </div>
            <div className="main-chat-section">
                <ChatBox
                    key={chatBoxKey}
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                    servers={servers}
                />
            </div>
        </div>
    );
};

export default App;