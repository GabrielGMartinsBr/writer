const defaults = {
    fontName: 'Inter',
    fontSize: 16,
    weight: 400
};

export type FontAttrs = typeof defaults;

export class WriterMetrics {
    private static instance: WriterMetrics | null = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new WriterMetrics();
        }
        return this.instance;
    }

    private ctx: CanvasRenderingContext2D;
    private ctxFont: string;

    private constructor() {
        this.ctx = this.createCanvasContext();
        this.ctxFont = this.getDefaultCtxFont();
        this.ctx.font = this.ctxFont;
    }

    setStyle(style: FontAttrs) {
        const fontName = style.fontName || defaults.fontName;
        const fontSize = style.fontSize || defaults.fontSize;
        const weight = style.weight || defaults.weight;
        this.ctxFont = `${weight} ${fontSize}px ${fontName}`;
        this.ctx.font = this.ctxFont;
    }

    measureText(text: string) {
        const values = this.ctx.measureText(text);
        if (!values) {
            throw new Error('Failed to get metrics.');
        }
        return values.width;
    }

    private createCanvasContext() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to create canvas context.');
        }
        return ctx;
    }

    private getDefaultCtxFont() {
        const { weight, fontSize, fontName } = defaults;
        return `${weight} ${fontSize}px ${fontName}`;
    }

}