const parseWhatsApp = (rawData) => {
  const lines = rawData.split(/\r?\n/);
  const entries = [];
  
  // Regex: matches [Date, Time] - Sender: Message OR [Date, Time] - System Message
  const msgRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4},\s\d{1,2}:\d{2}(?:\s?[APM]{2})?)\s-\s/;

  lines.forEach((line) => {
    if (!line.trim()) return;

    const match = line.match(msgRegex);

    if (match) {
      const timestamp = match[1];
      const remainder = line.substring(match[0].length);
      const colonIndex = remainder.indexOf(': ');

      if (colonIndex !== -1) {
        // User Message
        entries.push({
          timestamp,
          sender: remainder.substring(0, colonIndex),
          content: remainder.substring(colonIndex + 2),
          isSystem: false
        });
      } else {
        // System Message (e.g., "X created group")
        entries.push({
          timestamp,
          sender: 'System',
          content: remainder,
          isSystem: true
        });
      }
    } else if (entries.length > 0) {
      // Continuation of the previous multi-line message
      entries[entries.length - 1].content += '\n' + line;
    }
  });

  return entries;
};

module.exports = parseWhatsApp;