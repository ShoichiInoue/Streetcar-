/**
 * Render Course - コースページの描画
 */

export const RenderCourse = {
  async render(courseId, coursesData, episodesData) {
    const main = document.querySelector('main');
    if (!main) return;

    const course = coursesData.find(c => c.id === courseId);
    if (!course) {
      main.innerHTML = '<p class="alert alert-error">コースが見つかりません</p>';
      return;
    }

    const courseEpisodes = episodesData.filter(e => e.courseId === courseId);

    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">コース</p>
        <h1>${course.title}</h1>
        <p>${course.description}</p>
        <div class="hero-actions">
          <span class="badge">${course.subtitle}</span>
        </div>
      </section>

      <section class="section-group">
        <div class="section-heading">
          <p class="eyebrow">講義</p>
          <h2>講義一覧</h2>
          <p>各講義を順に追うことで、作品の理解を少しずつ深められます。</p>
        </div>
        <div class="episodes-list">
          ${courseEpisodes.length > 0 ? courseEpisodes.map(ep => `
            <a href="/episode.html?id=${ep.id}" class="episode-card">
              <div class="episode-card__meta">${ep.id}</div>
              <h3>${ep.title}</h3>
              <p>${ep.description}</p>
            </a>
          `).join('') : '<div class="empty-state">このコースの講義はまだ公開されていません</div>'}
        </div>
      </section>
    `;
  }
};
