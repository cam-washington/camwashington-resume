// portfolio-filter.js
const filters = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    // active styling
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // filtering
    const filter = btn.dataset.filter;
    projects.forEach(p => {
      const tags = (p.dataset.tags || '').split(' ');
      if (filter === 'all' || tags.includes(filter)) {
        p.style.display = '';
        p.setAttribute('aria-hidden','false');
      } else {
        p.style.display = 'none';
        p.setAttribute('aria-hidden','true');
      }
    });
  });
});
