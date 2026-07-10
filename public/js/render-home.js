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
      <div class="hero">
        <h1>${siteData.title}</h1>
        <p>${siteData.description}</p>
        ${welcomeCourse ? `
          <a href="/episode.html?id=S-0" class="btn btn-primary">はじめての方へ</a>
        ` : ''}
      </div>

      <section>
        <h2 style="margin-bottom: var(--space-lg); color: var(--color-primary);">コース一覧</h2>
        <div class="course-list">
          ${regularCourses.map(course => `
            <a href="/course.html?id=${course.id}" class="course-card" style="text-decoration: none;">
              <h2>${course.title}</h2>
              <div class="subtitle">${course.subtitle}</div>
              <p>${course.description}</p>
              <small style="color: var(--color-text-lighter);">
                ${course.episodes.length} 個の講義
              </small>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }
};
