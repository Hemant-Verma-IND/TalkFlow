import React from 'react';
import '../styles/ChatBubble.css';

const ChatBubble = ({ entry }) => {
  if (entry.isSystem) {
    return (
      <div className="system-msg-row">
        <span>{entry.content}</span>
      </div>
    );
  }

  // Parses *text* into <b>text</b>
  const parseMarkdown = (text) => {
    const boldRegex = /\*(.*?)\*/g;
    const parts = text.split(boldRegex);
    return parts.map((part, i) => 
      i % 2 === 1 ? <b key={i}>{part}</b> : part
    );
  };

  return (
    <div className="bubble-row">
      <div className="bubble-content">
        <div className="sender-name">{entry.sender}</div>
        <div className="message-text">
          {entry.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {parseMarkdown(line)}
              <br />
            </React.Fragment>
          ))}
        </div>
        <div className="message-time">
          {entry.timestamp?.split(',')[1]}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;