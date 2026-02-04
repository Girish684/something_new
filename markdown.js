function renderMarkdown(text) {
  let html = text;

  // Headings
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>");

  // Italic
  html = html.replace(/\*(.*?)\*/gim, "<i>$1</i>");

  // Links [[note]]
  html = html.replace(/\[\[(.*?)\]\]/gim, "<span class='backlink'>$1</span>");

  // Line breaks
  html = html.replace(/\n/g, "<br>");

  return html;
