export interface NodeStyle {
    fontName: string;
    fontSize: number;
    weight: number;
    italic: boolean;
    underline: boolean;
    crossedOut: boolean;
    color: string;
    highlight: string;
}

export interface TextNode {
    content: string;
    style: NodeStyle;
}

export interface ElementRect {
    x: number;
    y: number;
    width: number;
    height: number;
    rowHeight: number;
}

export interface TextNodeElement {
    node: TextNode;
    rect: ElementRect;
    text: string;
    rowNum: number;
}