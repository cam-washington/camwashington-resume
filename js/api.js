// api.js — lightweight example: fetch a random quote (no API key required)
const quoteContainer = document.createElement('div');
quoteContainer.className = 'container text-muted';
quoteContainer.style.marginTop = '0.25rem';
quoteContainer.innerHTML = '<small id="quote-text">Loading quote…</small>';
document.getElementById('hero').appendChild(quoteContainer);

async function fetchQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    document.getElementById('quote-text').textContent = `"${data.content}" — ${data.author}`;
  } catch (err) {
    document.getElementById('quote-text').textContent = 'Keep building — one line of code at a time.';
  }
}

fetchQuote();
