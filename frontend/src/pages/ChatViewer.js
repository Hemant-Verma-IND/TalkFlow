import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, Loader2, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import ChatBubble from '../components/ChatBubble';
import '../styles/ChatViewer.css';

const ChatViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);
  
  const [entries, setEntries] = useState([]);
  const [archiveName, setArchiveName] = useState('Secure Stream');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const[visibleDate, setVisibleDate] = useState(''); // Tracks date currently on screen

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Chat Entries
        const { data } = await api.get(`/archives/${id}`);
        setEntries(data);
        if (data.length > 0) {
          setVisibleDate(data[0].timestamp.split(',')[0]);
        }

        // 2. Fetch Archive Name for Branding
        const archiveRes = await api.get('/archives');
        const currentArchive = archiveRes.data.find(a => a._id === id);
        if (currentArchive) {
          setArchiveName(currentArchive.name);
        }
      } catch (err) {
        console.error("Error loading chat:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  // --- SEARCH LOGIC ---
  const filteredEntries = useMemo(() => {
    if (!search) return entries;
    const lowerSearch = search.toLowerCase();
    return entries.filter(e => 
      e.content.toLowerCase().includes(lowerSearch) ||
      e.sender.toLowerCase().includes(lowerSearch)
    );
  }, [search, entries]);

  // --- DATE CONVERSION LOGIC ---
  const waToHtmlDate = (waDate) => {
    if (!waDate) return '';
    const [m, d, y] = waDate.split('/');
    if (!y) return '';
    const fullYear = `20${y.padStart(2, '0')}`;
    return `${fullYear}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  };

  const htmlToWaDate = (htmlDate) => {
    if (!htmlDate) return '';
    const [y, m, d] = htmlDate.split('-');
    // parseInt removes leading zeros to match WhatsApp format (e.g., 02 -> 2)
    return `${parseInt(m, 10)}/${parseInt(d, 10)}/${y.slice(-2)}`;
  };

  // --- INTELLIGENT CALENDAR JUMP LOGIC ---
  const jumpToDate = (e) => {
    const selectedHtmlDate = e.target.value; 
    if (!selectedHtmlDate) return;

    // 1. Map unique dates currently visible in the filtered chat
    const availableWaDates = [];
    filteredEntries.forEach(entry => {
      const dateStr = entry.timestamp?.split(',')[0];
      if (dateStr && !availableWaDates.includes(dateStr)) {
        availableWaDates.push(dateStr);
      }
    });

    let targetWaDate = null;

    // 2. Find exact match OR the closest following date
    for (let waDate of availableWaDates) {
      const entryHtmlDate = waToHtmlDate(waDate); 
      if (entryHtmlDate >= selectedHtmlDate) {
        targetWaDate = waDate;
        break;
      }
    }

    // 3. Fallback to the very last date if they pick a date far in the future
    if (!targetWaDate && availableWaDates.length > 0) {
      targetWaDate = availableWaDates[availableWaDates.length - 1];
    }

    // 4. Smooth scroll to the target date
    if (targetWaDate) {
      const element = document.getElementById(`date-${targetWaDate}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setVisibleDate(targetWaDate);
      }
    }
  };

  // --- SCROLL SPY LOGIC ---
  const handleScroll = () => {
    const dividers = document.querySelectorAll('.day-divider');
    let currentVisible = visibleDate;

    dividers.forEach(div => {
      const rect = div.getBoundingClientRect();
      // Threshold: When the date divider hits the top ~150px of the viewing area
      if (rect.top <= 150) {
        currentVisible = div.getAttribute('data-date');
      }
    });

    if (currentVisible !== visibleDate) {
      setVisibleDate(currentVisible);
    }
  };

  // --- RENDER LOADER ---
  if (loading) {
    return (
      <div className="center-screen">
        <Loader2 className="spinner" size={40} />
        <p style={{ marginTop: '15px' }}>Decrypting Secure Stream...</p>
      </div>
    );
  }

  // --- RENDER MAIN UI ---
  return (
    <div className="view-wrapper">
      <header className="chat-header">
        
        {/* Header Left: Branding & Back Button */}
        <div className="header-meta">
          <ArrowLeft className="icon-btn" onClick={() => navigate('/')} />
          <div className="branding-badge">
            <ShieldCheck size={24} color="#3b82f6" />
          </div>
          <div className="header-titles">
            <h1>{archiveName.replace('.txt', '')}</h1>
            <span>TalkFlow Encrypted • {filteredEntries.length} entries</span>
          </div>
        </div>
        
        {/* Header Right: Search & Dynamic Calendar */}
        <div className="header-actions">
          
          <div className="search-input-group">
            <Search size={16} color="#8696a0" />
            <input 
              type="text" 
              placeholder="Search chat..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="calendar-action glass-card">
            <Calendar size={16} color="#00a884" />
            <span className="current-date-display">{visibleDate || 'Select Date'}</span>
            <input 
              type="date" 
              className="hidden-date-input"
              value={waToHtmlDate(visibleDate)} 
              onChange={jumpToDate} 
              title="Select a date to jump"
            />
          </div>

        </div>
      </header>

      {/* Chat Stream Area */}
      <main className="chat-body" ref={chatBodyRef} onScroll={handleScroll}>
        <div className="chat-container">
          {filteredEntries.map((entry, index) => {
            const date = entry.timestamp?.split(',')[0];
            const prevDate = index > 0 ? filteredEntries[index - 1].timestamp?.split(',')[0] : null;
            const isNewDay = date !== prevDate;

            return (
              <React.Fragment key={entry._id || index}>
                {isNewDay && (
                  <div className="day-divider" id={`date-${date}`} data-date={date}>
                    <span>{date}</span>
                  </div>
                )}
                <ChatBubble entry={entry} />
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ChatViewer;