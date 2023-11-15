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

const leading = 1.15;


export class WriterRender {

    nodes: TextNode[] = [
        {
            content: 'Gabriel G. Martins\n',
            style: defaultStyle
        },
        {
            content: 'lala 1...2...3...4...5',
            style: {
                ...defaultStyle,
                weight: 700,
                fontSize: 32,
                color: '#39c'
            }
        },
        {
            content: ' Role: ',
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
            content: 'aii bbb',
            style: defaultStyle
        },
        {
            content: 'Very long text trying to break the line'
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

    parseElements(nodes: TextNode[], containerWidth: number) {
        if (!nodes.length) {
            return [];
        }

        const metrics = WriterMetrics.getInstance();

        const breakWordRE = /^[ \t]$/;

        let x = 0;
        let height = 0;
        let charWidth = 0;
        let rowNum = 0;

        const elNodeArr: TextNodeElement[] = [];

        let word = '';
        let wordWidth = 0;

        let current = {
            text: '',
            x: 0,
            width: 0,
            height: 0
        };


        const pushCurrent = (node: TextNode) => {
            elNodeArr.push({
                text: current.text,
                node,
                rowNum,
                rect: {
                    x: current.x,
                    y: 0,
                    width: current.width,
                    height,
                    rowHeight: 0
                },
            });
        };

        const resetCurrent = () => {
            current = {
                text: '',
                x: 0,
                width: 0,
                height: 0
            };
        }

        for (const node of nodes) {
            metrics.setStyle({
                weight: node.style.weight,
                fontName: node.style.fontName,
                fontSize: node.style.fontSize,
            });

            height = node.style.fontSize;

            for (const c of node.content) {
                if (c === '\n') {
                    current.text += word;
                    current.width += wordWidth;
                    word = '';
                    wordWidth = 0;

                    pushCurrent(node);
                    resetCurrent();

                    rowNum++;
                    x = 0;
                    continue;
                }

                charWidth = metrics.measureChar(c)

                word += c;
                wordWidth += charWidth;



                if (x + current.width + wordWidth >= containerWidth) {
                    pushCurrent(node);
                    resetCurrent();

                    x = current.width;
                    rowNum++;
                }

                if (breakWordRE.test(c)) {
                    current.text += word;
                    current.width += wordWidth;

                    word = '';
                    wordWidth = 0;
                    continue;
                }
            }

            if (word) {
                current.text += word;
                current.width += wordWidth;
                word = '';
                wordWidth = 0;
            }
            if (current.text) {
                // Fix width due to varying spacing in specific letter combinations
                current.width = metrics.measureText(current.text);

                x += current.width;

                pushCurrent(node);
                resetCurrent();
                current.x = x;
            }
        }

        return elNodeArr;
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
            const lineHeight = height * leading;
            for (const n of arr) {
                let d = lineHeight - n.rect.height;
                d = d * TextVertAlign.TEXT_BOTTOM;
                n.rect.y = y + d;
                n.rect.rowHeight = lineHeight;
            }
            y += lineHeight;
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
        el.style.color = style.color;
        el.style.whiteSpace = 'pre';
        el.style.letterSpacing = '0';
        el.style.lineHeight = '1'

        el.style.userSelect = 'none'

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
            .06
        ];
        return `rgba(${c.join(', ')})`;
    }

    static numToPx(v: number) {
        return v + 'px';
    }
}