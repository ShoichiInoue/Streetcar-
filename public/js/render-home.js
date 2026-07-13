/**
 * Render Home - ホームページの描画
 */

export const RenderHome = {
  async render(siteData, coursesData) {
    const main = document.querySelector('main');
    if (!main) return;

    const welcomeCourse = coursesData.find(c => c.id === 'S');
    const regularCourses = coursesData.filter(c => c.id !== 'S');

    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">第47回定期演奏会</p>
        <h1>${siteData.title}</h1>
        <p>${siteData.description}</p>
        <div class="hero-actions">
          ${welcomeCourse ? `<a href="/episode.html?id=S-0" class="btn btn-primary">はじめての方へ</a>` : ''}
          <a href="/about.html" class="btn btn-secondary">このサイトについて</a>
        </div>
      </section>

      <section class="section-group">
        <div class="section-heading">
          <p class="eyebrow">入口</p>
          <h2>コースから読む</h2>
          <p>演奏に参加する方も、観客の方も、気になる題材から自然に入れる構成です。</p>
        </div>
        <div class="course-list">
          ${regularCourses.map(course => `
            <a href="/course.html?id=${course.id}" class="course-card course-card--${course.id}">
              <div class="course-card__top">
                <span class="course-chip">${course.id}</span>
                <span class="course-chip course-chip--muted">${course.subtitle}</span>
              </div>
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <div class="course-card__meta">${course.episodes.length} 個の講義</div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }
};
