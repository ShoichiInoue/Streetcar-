/**
 * Navigation - ナビゲーション生成とアクティブ状態管理
 */

export const Navigation = {
  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  },

  renderNav(courses) {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    nav.innerHTML = `
      <li><a href="/" class="nav-link">ホーム</a></li>
      ${courses.map(course => `
        <li><a href="/course.html?id=${course.id}" class="nav-link">${course.title}</a></li>
      `).join('')}
      <li><a href="/about.html" class="nav-link">このサイトについて</a></li>
    `;

    this.updateActiveLink();
  },

  updateActiveLink() {
    const currentPage = this.getCurrentPage();
    const currentParam = new URLSearchParams(window.location.search);
    
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      let isActive = false;

      if (currentPage === 'index.html' && href === '/') {
        isActive = true;
      } else if (href.includes(currentPage)) {
        // パラメータもチェック
        if (currentParam.get('id') && href.includes(currentParam.get('id'))) {
          isActive = true;
        } else if (!currentParam.get('id')) {
          isActive = true;
        }
      }

      link.classList.toggle('active', isActive);
    });
  }
};
