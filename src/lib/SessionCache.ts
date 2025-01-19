interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export default class SessionCache {
  private static CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  static set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };
    sessionStorage.setItem(key, JSON.stringify(entry));
  }

  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    if (now - entry.timestamp > this.CACHE_DURATION) {
      sessionStorage.removeItem(key);
      return null;
    }

    return entry.data;
  }

  static clear(key: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
  }
}