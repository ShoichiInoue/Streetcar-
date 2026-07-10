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
      <div class="hero" style="margin-bottom: var(--space-2xl);">
        <h1>${course.title}</h1>
        <div class="subtitle" style="color: rgba(255,255,255,0.9); margin-bottom: var(--space-md);">
          ${course.subtitle}
        </div>
        <p>${course.description}</p>
      </div>

      <section>
        <h2 style="margin-bottom: var(--space-lg); color: var(--color-primary);">講義一覧</h2>
        <div class="episodes-list">
          ${courseEpisodes.length > 0 ? courseEpisodes.map(ep => `
            <a href="/episode.html?id=${ep.id}" class="episode-item" style="text-decoration: none; display: block;">
              <div class="episode-number">${ep.id}</div>
              <div class="episode-title">${ep.title}</div>
              <div class="episode-description">${ep.description}</div>
            </a>
          `).join('') : '<p class="text-muted">このコースの講義はまだ公開されていません</p>'}
        </div>
      </section>
    `;
  }
};
