import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Archive, UploadCloud, LogOut, Trash2, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const[archives, setArchives] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => { fetchArchives(); },[]);

  const fetchArchives = async () => {
    const { data } = await api.get('/archives');
    setArchives(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/archives/upload', formData);
      setFile(null);
      fetchArchives();
    } catch (err) { alert("Upload failed"); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to permanently delete this secure archive?")) {
      await api.delete(`/archives/${id}`);
      fetchArchives();
    }
  };

  const startEdit = (archive, e) => {
    e.stopPropagation();
    setEditingId(archive._id);
    setEditName(archive.name);
  };

  const saveEdit = async (id, e) => {
    e.stopPropagation();
    if (!editName.trim()) return setEditingId(null);
    await api.put(`/archives/${id}`, { name: editName });
    setEditingId(null);
    fetchArchives();
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar glass-card">
        <div className="sidebar-header">
          <h2>TalkFlow</h2>
        </div>
        <nav className="archive-list">
          {archives.map(a => (
            <div key={a._id} className="archive-item" onClick={() => !editingId && navigate(`/archive/${a._id}`)}>
              <Archive size={16} className="archive-icon" />
              
              {editingId === a._id ? (
                <div className="edit-mode" onClick={e => e.stopPropagation()}>
                  <input 
                    autoFocus
                    value={editName} 
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(a._id, e)}
                  />
                  <Check size={16} className="action-icon text-green" onClick={(e) => saveEdit(a._id, e)} />
                  <X size={16} className="action-icon text-red" onClick={(e) => { e.stopPropagation(); setEditingId(null); }} />
                </div>
              ) : (
                <>
                  <span className="archive-name" title={a.name}>{a.name}</span>
                  <div className="archive-actions">
                    <Edit2 size={14} className="action-icon" onClick={(e) => startEdit(a, e)} />
                    <Trash2 size={14} className="action-icon text-red" onClick={(e) => handleDelete(a._id, e)} />
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
        <button className="logout-btn" onClick={logout}><LogOut size={16}/> Exit</button>
      </aside>

      <main className="content-area">
        <div className="welcome-hero">
          <h1>Welcome to your Secure Archive</h1>
          <p>Process your exported communication streams into encrypted visualizations.</p>
        </div>

        <div className="upload-box glass-card">
          <UploadCloud size={48} color="var(--accent)" />
          <h3>Upload New Export</h3>
          <p>Select your WhatsApp .txt file</p>
          <input type="file" id="file-upload" onChange={(e) => setFile(e.target.files[0])} hidden />
          <label htmlFor="file-upload" className="file-label">
            {file ? file.name : "Choose File"}
          </label>
          <button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? "Parsing & Encrypting..." : "Process Stream"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;