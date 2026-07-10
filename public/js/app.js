/**
 * App - メインアプリケーション
 */

import { DataLoader } from './data-loader.js';
import { Navigation } from './navigation.js';
import { RenderHome } from './render-home.js';
import { RenderCourse } from './render-course.js';
import { RenderEpisode } from './render-episode.js';

export const App = {
  async init() {
    // データ読み込み
    const [siteData, coursesData, episodesData] = await Promise.all([
      DataLoader.getSite(),
      DataLoader.getCourses(),
      DataLoader.getEpisodes()
    ]);

    if (!siteData || !coursesData || !episodesData) {
      document.querySelector('main').innerHTML = 
        '<p class="alert alert-error">データの読み込みに失敗しました</p>';
      return;
    }

    // ナビゲーション生成
    Navigation.renderNav(coursesData);

    // ページ判定と描画
    const currentPage = this.getCurrentPage();
    const params = new URLSearchParams(window.location.search);

    if (currentPage === 'index.html' || currentPage === '') {
      await RenderHome.render(siteData, coursesData);
    } else if (currentPage === 'course.html') {
      const courseId = params.get('id');
      if (courseId) {
        await RenderCourse.render(courseId, coursesData, episodesData);
      }
    } else if (currentPage === 'episode.html') {
      const episodeId = params.get('id');
      if (episodeId) {
        await RenderEpisode.render(episodeId, coursesData, episodesData);
      }
    } else if (currentPage === 'welcome.html') {
      // Welcome ページは別途処理
      this.renderWelcome(siteData, episodesData);
    } else if (currentPage === 'about.html') {
      this.renderAbout(siteData);
    }
  },

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  },

  renderWelcome(siteData, episodesData) {
    const main = document.querySelector('main');
    if (!main) return;

    const welcomeEpisode = episodesData.find(e => e.id === 'S-0');
    const nextUrl = new URLSearchParams(window.location.search).get('next') || '/';

    main.innerHTML = `
      <div class="welcome-content">
        <h1 style="text-align: center; margin-bottom: var(--space-lg);">
          ${siteData.title}
        </h1>
        
        <p style="text-align: center; font-size: var(--font-size-lg); margin-bottom: var(--space-2xl);">
          このサイトへようこそ！
        </p>

        ${welcomeEpisode ? `
          <div style="margin-bottom: var(--space-2xl);">
            <h2 style="margin-bottom: var(--space-md); color: var(--color-primary);">
              ${welcomeEpisode.title}
            </h2>
            <div class="video-container">
              ${welcomeEpisode.youtubeId ? `
                <iframe
                  src="https://www.youtube.com/embed/${welcomeEpisode.youtubeId}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              ` : `
                <div class="video-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <p>動画はまだ公開されていません</p>
                </div>
              `}
            </div>
            <p style="margin-top: var(--space-lg); color: var(--color-text-light);">
              ${welcomeEpisode.description}
            </p>
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: var(--space-2xl);">
          <button class="btn btn-primary" id="continue-btn">
            コースを選ぶ
          </button>
        </div>
      </div>
    `;

    document.getElementById('continue-btn').addEventListener('click', () => {
      // intro-seen フラグを設定
      localStorage.setItem('streetcar_intro_seen_v1', 'true');
      // 次のページへ遷移
      window.location.href = decodeURIComponent(nextUrl);
    });
  },

  renderAbout(siteData) {
    const main = document.querySelector('main');
    if (!main) return;

    main.innerHTML = `
      <h1 style="margin-bottom: var(--space-lg);">このサイトについて</h1>
      
      <div class="card" style="margin-bottom: var(--space-lg);">
        <h2 style="color: var(--color-primary); margin-bottom: var(--space-md);">
          ${siteData.title}
        </h2>
        <p style="margin-bottom: var(--space-md);">
          ${siteData.description}
        </p>
        <p style="color: var(--color-text-light);">
          ${siteData.subtitle}
        </p>
      </div>

      <div class="card">
        <h3 style="color: var(--color-primary); margin-bottom: var(--space-md);">
          サイト情報
        </h3>
        <ul style="color: var(--color-text-light);">
          <li style="margin-bottom: var(--space-sm);">
            <strong>主催:</strong> ${siteData.organization}
          </li>
          <li style="margin-bottom: var(--space-sm);">
            <strong>技術:</strong> HTML, CSS, Vanilla JavaScript, JSON
          </li>
          <li>
            <strong>動画:</strong> YouTube 埋め込み
          </li>
        </ul>
      </div>
    `;
  }
};

// ページ読み込み時にアプリ初期化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
