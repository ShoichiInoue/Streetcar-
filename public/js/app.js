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
    const [siteData, coursesData, episodesData] = await Promise.all([
      DataLoader.getSite(),
      DataLoader.getCourses(),
      DataLoader.getEpisodes()
    ]);

    if (!siteData || !coursesData || !episodesData) {
      document.querySelector('main').innerHTML = '<p class="alert alert-error">データの読み込みに失敗しました</p>';
      return;
    }

    Navigation.renderNav(coursesData);

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
      <section class="welcome-content">
        <div class="hero">
          <p class="eyebrow">導線</p>
          <h1>${siteData.title}</h1>
          <p>このサイトへようこそ。まずは作品の入門として、ガイダンス動画から始めるのがおすすめです。</p>
        </div>

        ${welcomeEpisode ? `
          <div class="card card--feature">
            <div class="section-heading">
              <p class="eyebrow">はじめに</p>
              <h2>${welcomeEpisode.title}</h2>
              <p>${welcomeEpisode.description}</p>
            </div>
            <div class="video-container">
              ${welcomeEpisode.youtubeId ? `
                <iframe
                  src="https://www.youtube.com/embed/${welcomeEpisode.youtubeId}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                ></iframe>
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
          </div>
        ` : ''}

        <div class="hero-actions" style="justify-content:center; margin-top: var(--space-5);">
          <button class="btn btn-primary" id="continue-btn">コースを選ぶ</button>
        </div>
      </section>
    `;

    document.getElementById('continue-btn').addEventListener('click', () => {
      localStorage.setItem('streetcar_intro_seen_v1', 'true');
      window.location.href = decodeURIComponent(nextUrl);
    });
  },

  renderAbout(siteData) {
    const main = document.querySelector('main');
    if (!main) return;

    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">サイトについて</p>
        <h1>このサイトについて</h1>
        <p>${siteData.description}</p>
      </section>

      <div class="card card--feature">
        <div class="section-heading">
          <p class="eyebrow">情報</p>
          <h2>${siteData.title}</h2>
          <p>${siteData.subtitle}</p>
        </div>
        <ul class="episodes-list">
          <li class="episode-card">
            <div class="episode-card__meta">主催</div>
            <h3>${siteData.organization}</h3>
          </li>
          <li class="episode-card">
            <div class="episode-card__meta">技術</div>
            <h3>HTML, CSS, Vanilla JavaScript, JSON</h3>
          </li>
          <li class="episode-card">
            <div class="episode-card__meta">動画</div>
            <h3>YouTube 埋め込み</h3>
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
