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
        // console.log(elements.map(({ text, rect }) => ({ text, rect })));

        for (const i of elements) {
            const el = this.createElement(i.rect, i.node.style);
            el.innerText = i.text;
            div.appendChild(el);
        }
    }

    parseElements(nodes: TextNode[], rowWidth: number) {
        const leading = 1.5;
        let x = 0;
        let y = 0;
        let width = 0;
        let nextWidth = 0;
        let height = 0;
        let charWidth = 0;

        const arr: TextNodeElement[] = [];

        const metrics = WriterMetrics.getInstance();

        let text = '';
        let fontSize = 16;

        const add = (node: TextNode) => {
            arr.push({
                text,
                node,
                rect: {
                    x,
                    y,
                    width,
                    height
                },
            });
        };

        for (const node of nodes) {
            width = 0;
            height = leading * fontSize;

            metrics.setStyle({
                weight: node.style.weight,
                fontName: node.style.fontName,
                fontSize: node.style.fontSize,
            });

            for (const c of node.content) {
                if (c === '\n') {
                    if (text) {
                        add(node);
                    }
                    x = 0;
                    y += height;
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
                    y += height;
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

        // console.log(arr);
        return arr;
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
            .03
        ];
        return `rgba(${c.join(', ')})`;
    }

    static numToPx(v: number) {
        return v + 'px';
    }
}