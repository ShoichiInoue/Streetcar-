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
          allowfullscreen
        ></iframe>
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
    const currentIndex = courseEpisodes.findIndex(e => e.id === episodeId);
    const prevEpisode = courseEpisodes[currentIndex - 1];
    const nextEpisode = courseEpisodes[currentIndex + 1];

    main.innerHTML = `
      <div class="episode-header">
        <div class="episode-breadcrumb">
          ${course ? `<a href="/course.html?id=${course.id}">${course.title}</a> / ` : ''}
          <span>${episodeId}</span>
        </div>
        <h1>${episode.title}</h1>
        <p>${episode.description}</p>
        <div class="episode-meta">
          <span>時間: ${episode.duration || '未定'}</span>
          <span>ID: ${episodeId}</span>
        </div>
      </div>

      <div class="episode-nav">
        ${prevEpisode ? `<a href="/episode.html?id=${prevEpisode.id}" class="btn btn-secondary">← 前の講義</a>` : '<span class="btn btn-secondary is-disabled">← 前の講義</span>'}
        ${nextEpisode ? `<a href="/episode.html?id=${nextEpisode.id}" class="btn btn-primary">次の講義 →</a>` : '<span class="btn btn-secondary is-disabled">次の講義 →</span>'}
      </div>

      <div class="episode-content">
        <div>
          ${this.embedYoutubeIframe(episode.youtubeId)}
          ${episode.transcript ? `
            <div class="episode-transcript">
              <h3>講義内容</h3>
              ${episode.transcript}
            </div>
          ` : '<p class="text-muted">テキストスクリプトは準備中です</p>'}
        </div>

        <aside class="related-episodes">
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
        </aside>
      </div>
    `;
  }
};
