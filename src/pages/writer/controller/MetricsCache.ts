type CharCacheMap = Map<string, number>;

export class MetricsCache {
    private caches: Map<string, CharCacheMap> = new Map();

    getCache(font: string, char: string) {
        const map = this.caches.get(font);
        if (!map) {
            return null;
        }
        return map.get(char);
    }

    setCache(font: string, char: string, value: number) {
        let map = this.caches.get(font);
        if (!map) {
            map = new Map();
            this.caches.set(font, map);
        }
        map.set(char, value);
    }
}