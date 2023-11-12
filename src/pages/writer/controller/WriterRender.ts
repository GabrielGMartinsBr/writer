import { random } from 'lodash';
import { WriteMetrics } from './WriterMetrics';
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

    constructor() {
        WriteMetrics.init();
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

        let text = '';
        let fontSize = 16;

        const add = (node: TextNode) => {
            arr.push({
                node,
                rect: {
                    x,
                    y,
                    width,
                    height
                },
                text
            });
            text = '';
        };

        for (const node of nodes) {
            width = 0;
            height = leading * fontSize;

            for (const c of node.content) {
                if (c === '\n') {
                    add(node);
                    x = 0;
                    y += height;
                    continue;
                }

                charWidth = WriteMetrics.measureText(c)
                nextWidth = width + charWidth;

                if (x + nextWidth < rowWidth) {
                    text += c;
                    width = nextWidth;
                } else {
                    add(node);
                    x = 0;
                    y += height;
                    width = 0;
                    text = c;
                }
            }
            if (text) {
                add(node);
                x += width;
                text = '';
            }
        }

        // console.log(arr);
        return arr;
    }

    render(div: HTMLDivElement) {
        this.clearContent(div);

        const elements = this.parseElements(this.nodes, 400);

        // console.log(elements);
        for (const i of elements) {
            const el = this.createElement(i.rect);
            el.innerText = i.text;
            div.appendChild(el);
        }


    }

    private createElement(rect: ElementRect) {
        const margin = 16;
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = margin + rect.x + 'px';
        el.style.top = margin + rect.y + 'px';
        el.style.width = rect.width + 'px';
        el.style.height = rect.height + 'px';
        el.style.backgroundColor = EUtils.randomColor();
        el.style.fontFamily = 'Inter';
        el.style.fontWeight = '400';
        el.style.fontSize = 16 + 'px';
        el.style.whiteSpace = 'nowrap';
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
            .5
        ];
        return `rgba(${c.join(', ')})`;
    }

    static numToPx(v: number) {
        return v + 'px';
    }
}