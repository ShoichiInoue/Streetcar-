/**
 * Data Loader - JSON データを非同期で読み込む
 */

export const DataLoader = {
  cache: {},

  async load(filename) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }

    try {
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.status}`);
      }
      const data = await response.json();
      this.cache[filename] = data;
      return data;
    } catch (error) {
      console.error('DataLoader error:', error);
      return null;
    }
  },

  async getSite() {
    return this.load('site.json');
  },

  async getCourses() {
    return this.load('courses.json');
  },

  async getEpisodes() {
    return this.load('episodes.json');
  },

  async getReferences() {
    return this.load('references.json');
  },

  async getPeople() {
    return this.load('people.json');
  },

  getCourseById(courses, courseId) {
    return courses.find(c => c.id === courseId);
  },

  getEpisodesByCourse(episodes, courseId) {
    return episodes.filter(e => e.courseId === courseId);
  },

  getEpisodeById(episodes, episodeId) {
    return episodes.find(e => e.id === episodeId);
  }
};
