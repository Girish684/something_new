function drawGraph(notes) {
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 400;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  notes.forEach((note, i) => {
    const x = 100 + (i * 100);
    const y = 200;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#4caf50";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(note.title, x - 20, y - 30);

    const links = note.content.match(/\[\[(.*?)\]\]/g) || [];
    links.forEach(link => {
      const target = notes.find(n => n.title === link.replace("[[", "").replace("]]", ""));
      if (target) {
        const j = notes.indexOf(target);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(100 + (j * 100), y);
        ctx.strokeStyle = "#888";
        ctx.stroke();
      }
    });
  });
}
