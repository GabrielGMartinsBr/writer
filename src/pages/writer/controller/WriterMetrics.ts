export class WriteMetrics {
    private static initialized = false;
    private static ctx: CanvasRenderingContext2D | null = null;

    static init() {
        if (this.initialized) {
            return;
        }
        this.createCanvasContext();
        this.initialized = true;
    }

    static measureText(text: string) {
        if (!this.initialized) {
            throw new Error('Context not initialized.');
        }
        const values = this.ctx?.measureText(text);
        if (!values) {
            throw new Error('Failed to get metrics.');
        }
        return values.width;
    }

    private static createCanvasContext() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to create canvas context.');
        }
        this.ctx = ctx;
        this.ctx.font = '400 16px Inter'
    }

}
