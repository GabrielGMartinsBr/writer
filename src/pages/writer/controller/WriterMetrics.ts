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
    private ctxFontAttrs: FontAttrs;
    private ctxFont: string;

    private constructor() {
        this.ctx = this.createCanvasContext();
        this.ctxFontAttrs = { ...defaults };
        this.ctxFont = this.getDefaultCtxFont();
        this.ctxFontAttrs = { ...defaults };
        this.ctx.font = this.ctxFont;
    }

    setStyle(font: Partial<FontAttrs>) {
        const current = this.ctxFontAttrs;
        let { weight, fontName, fontSize } = font;

        weight ||= current.weight || defaults.weight;
        fontName ||= current.fontName || defaults.fontName;
        fontSize ||= current.fontSize || defaults.fontSize;

        this.ctxFontAttrs = { weight, fontName, fontSize };
        this.ctxFont = `${weight} ${fontSize}px ${fontName}`;

        this.ctx.font = this.ctxFont;
    }

    // TODO: Add cache for the result
    measureChar(char: string) {
        const values = this.ctx.measureText(char[0]);
        if (!values) {
            throw new Error('Failed to get metrics.');
        }
        return values.width;
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