/**
 * Intro Guard - 初回訪問時の導線制御
 * S-0動画へ自動転送し、二回目以降は通常動作
 */

const STORAGE_KEY = 'streetcar_intro_seen_v1';

export const IntroGuard = {
  hasSeenIntro() {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  markIntroSeen() {
    localStorage.setItem(STORAGE_KEY, 'true');
  },

  shouldSkipIntro() {
    const params = new URLSearchParams(window.location.search);
    return params.get('skipIntro') === '1';
  },

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  },

  isWelcomePage() {
    return this.getCurrentPage() === 'welcome.html';
  },

  guard() {
    // skipIntro パラメータがあれば何もしない
    if (this.shouldSkipIntro()) {
      return;
    }

    // 既に見た場合は何もしない
    if (this.hasSeenIntro()) {
      return;
    }

    // ようこそページなら何もしない（無限ループ防止）
    if (this.isWelcomePage()) {
      return;
    }

    // 初回訪問かつ welcome.html でなければ、welcome.html へ転送
    const currentUrl = window.location.pathname + window.location.search;
    const encodedNext = encodeURIComponent(currentUrl);
    window.location.href = `/welcome.html?next=${encodedNext}`;
  }
};

// ページ読み込み時に自動実行
document.addEventListener('DOMContentLoaded', () => {
  IntroGuard.guard();
});
