import { random } from 'lodash';
import { WriterMetrics } from './WriterMetrics';
import { ElementRect, NodeStyle, TextNode, TextNodeElement } from './types';

const defaultStyle: NodeStyle = {
    fontName: 'Inter',
    fontSize: 14,
    weight: 400,
    italic: false,
    underline: false,
    crossedOut: false,
    color: '#333',
    highlight: '',

};

enum TextVertAlign {
    TOP = 0.0,
    TEXT_TOP = 0.25,
    CENTER = 0.5,
    TEXT_BOTTOM = 0.75,
    BOTTOM = 1.0,
}

const leading = 1.25;



export class WriterRender {

    nodes: TextNode[] = [
        {
            content: 'Gabriel G. Martins\n',
            style: defaultStyle
        },
        {
            content: 'lala ...1...2...3...4...5',
            style: {
                ...defaultStyle,
                weight: 400,
                fontSize: 32,
                color: '#555'
            }
        },
        {
            content: 'Role: ',
            style: {
                ...defaultStyle,
                weight: 700,
                color: '#555'
            }
        },
        {
            content: ' Developer',
            style: defaultStyle
        },
        {
            content: '\nVery long text trying to break the line'
                + ', let\'s see if it is possible? Test 123...5...6...7...Fim',
            style: defaultStyle
        }
    ];

    render(div: HTMLDivElement) {
        this.clearContent(div);

        const rule = this.createRuleElement(400);
        div.appendChild(rule);

        const elements = this.parseElements(this.nodes, 400);
        this.normalizeRowHeight(elements);

        for (const i of elements) {
            const el = this.createElement(i.rect, i.node.style);
            el.innerText = i.text;
            div.appendChild(el);
        }
    }

    parseElements(nodes: TextNode[], rowWidth: number) {
        const metrics = WriterMetrics.getInstance();

        let x = 0;
        let width = 0;
        let nextWidth = 0;
        let height = 0;
        let charWidth = 0;
        let rowNum = 0;

        const arr: TextNodeElement[] = [];

        let text = '';

        const add = (node: TextNode) => {
            arr.push({
                text,
                node,
                rowNum,
                rect: {
                    x,
                    y: 0,
                    width,
                    height,
                    rowHeight: 0
                },
            });
        };

        for (const node of nodes) {
            metrics.setStyle({
                weight: node.style.weight,
                fontName: node.style.fontName,
                fontSize: node.style.fontSize,
            });

            width = 0;
            height = leading * node.style.fontSize;

            for (const c of node.content) {
                if (c === '\n') {
                    if (text) {
                        add(node);
                    }
                    x = 0;
                    rowNum++;
                    text = '';
                    continue;
                }

                charWidth = metrics.measureChar(c)
                nextWidth = width + charWidth;

                if (x + nextWidth < rowWidth) {
                    text += c;
                    width = nextWidth;
                } else {
                    add(node);
                    x = 0;
                    rowNum++;
                    width = charWidth;
                    text = c;
                }
            }
            if (text) {
                // Fix width due to varying spacing in specific letter combinations
                width = metrics.measureText(text);
                add(node);
                x += width;
                text = '';
            }
        }

        return arr;
    }

    private normalizeRowHeight(nodes: TextNodeElement[]) {
        let rowNum = 0;
        let height = 0;
        let arr: TextNodeElement[] = [];
        let y = 0;
        for (let i = 0; i < nodes.length;) {
            rowNum = nodes[i].rowNum;
            height = 0;
            arr = [];
            while (nodes[i] && nodes[i].rowNum === rowNum) {
                arr.push(nodes[i]);
                if (nodes[i].rect.height > height) {
                    height = nodes[i].rect.height;
                }
                i++;
            }
            for (const n of arr) {
                let d = height - n.rect.height;
                d = d * TextVertAlign.TEXT_BOTTOM;
                n.rect.y = y + d;
                n.rect.rowHeight = height;
            }
            y += height;
        }
    }

    private createElement(rect: ElementRect, style: NodeStyle) {
        const margin = 16;
        const el = document.createElement('div');

        el.style.position = 'absolute';
        el.style.left = margin + rect.x + 'px';
        el.style.top = margin + rect.y + 'px';
        el.style.width = rect.width + 'px';
        el.style.height = rect.height + 'px';

        el.style.fontFamily = style.fontName;
        el.style.fontWeight = style.weight.toString();
        el.style.fontSize = style.fontSize + 'px';

        el.style.backgroundColor = EUtils.randomColor();
        el.style.whiteSpace = 'nowrap';
        el.style.letterSpacing = '0';
        el.style.lineHeight = leading.toString();

        return el;
    }

    private createRuleElement(width: number) {
        const margin = 16;
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = margin + 'px';
        el.style.top = 6 + 'px';
        el.style.width = width + 'px';
        el.style.backgroundColor = '#3333';
        el.style.height = 9 + 'px';
        return el;
    }

    private clearContent(div: HTMLDivElement) {
        let c = 0;
        while (div.firstChild) {
            div.firstChild.remove();
            c++;
            if (c > 999999) {
                throw new Error(
                    'Reached maximum number of iterations.'
                );
            }
        }

    }

}

class EUtils {

    static randomColor() {
        const c = [
            random(255, false),
            random(255, false),
            random(255, false),
            .1
        ];
        return `rgba(${c.join(', ')})`;
    }

    static numToPx(v: number) {
        return v + 'px';
    }
}

let average = a => a.reduce((p, c) => p + c, 0) / a.length