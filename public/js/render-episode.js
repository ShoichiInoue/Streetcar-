/**
 * Render Episode - 講義ページの描画
 */

export const RenderEpisode = {
  embedYoutubeIframe(youtubeId) {
    if (!youtubeId) {
      return `
        <div class="video-container">
          <div class="video-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <p>動画はまだ公開されていません</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/${youtubeId}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
  },

  async render(episodeId, coursesData, episodesData) {
    const main = document.querySelector('main');
    if (!main) return;

    const episode = episodesData.find(e => e.id === episodeId);
    if (!episode) {
      main.innerHTML = '<p class="alert alert-error">講義が見つかりません</p>';
      return;
    }

    const course = coursesData.find(c => c.id === episode.courseId);
    const courseEpisodes = episodesData.filter(e => e.courseId === episode.courseId);

    main.innerHTML = `
      <div class="episode-header">
        <div style="font-size: var(--font-size-sm); color: var(--color-text-lighter); margin-bottom: var(--space-md);">
          ${course ? `<a href="/course.html?id=${course.id}">${course.title}</a> > ` : ''}
          <span>${episodeId}</span>
        </div>
        <h1>${episode.title}</h1>
        <p style="color: var(--color-text-light); margin-top: var(--space-md);">${episode.description}</p>
        <div class="episode-meta">
          <span>時間: ${episode.duration || '未定'}</span>
          <span>ID: ${episodeId}</span>
        </div>
      </div>

      <div class="episode-content">
        <div>
          ${this.embedYoutubeIframe(episode.youtubeId)}
          ${episode.transcript ? `
            <div class="episode-transcript">
              <h3 style="margin-bottom: var(--space-md); color: var(--color-primary);">講義内容</h3>
              ${episode.transcript}
            </div>
          ` : '<p class="text-muted">テキストスクリプトは準備中です</p>'}
        </div>

        <div class="episode-sidebar">
          ${courseEpisodes.length > 1 ? `
            <div class="related-episodes">
              <h3>このコースの他の講義</h3>
              <ul>
                ${courseEpisodes
                  .filter(ep => ep.id !== episodeId)
                  .map(ep => `
                    <li>
                      <a href="/episode.html?id=${ep.id}">${ep.id}: ${ep.title}</a>
                    </li>
                  `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
};
