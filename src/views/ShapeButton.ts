import * as SVG from 'svg.js';
import { EventEmitter } from 'events';

export class SVGShapeButton extends EventEmitter {
    private group: SVG.G;
    private path: SVG.Path;
    private circle: SVG.Circle;
    public constructor(private svg: SVG.Doc | SVG.G, private pathString: string, private x: number, private y: number, private r: number, private color: string, private backgroundColor: string, private activeColor: string, private activeBackgroundColor: string, private thickness: number) {
        super();
        this.group = this.svg.group();
        this.circle = this.group.circle(this.r).center(x, y).attr({
            stroke: color,
            'stroke-width': thickness,
            fill: backgroundColor,
            cursor: 'pointer'
        });
        this.path = this.group.path(this.pathString).attr({
            stroke: color,
            'stroke-width': thickness,
            fill: 'none',
            cursor: 'pointer'
        }).style({
            'pointer-events': 'none'
        });
        this.group.mouseover(() => {
            this.emit('mouseover');
            this.circle.animate(100).attr({
                fill: activeBackgroundColor,
                stroke: activeColor
            });
            this.path.animate(100).attr({
                stroke: activeColor
            });
        });
        this.group.mouseout(() => {
            this.emit('mouseout');
            this.circle.animate(100).attr({
                fill: backgroundColor,
                stroke: color
            });
            this.path.animate(100).attr({
                stroke: color
            });
        });
        this.group.click(() => {
            this.emit('click');
            event.preventDefault();
        });
        this.group.mousedown(() => {
            this.emit('mousedown');
            event.preventDefault();
        });
        this.group.mouseup(() => {
            this.emit('mouseup');
            event.preventDefault();
        });
    }

    public remove(): void {
        this.group.remove();
    }
}

export function getArrowPath(x: number, y: number, width: number, arrowAngle: number, arrowLength: number): string {
    const theta = (180 + arrowAngle) * Math.PI / 180;
    return `M ${x-width/2} ${y}
        h ${width}
        l ${Math.cos(theta) * arrowLength} ${Math.sin(theta) * arrowLength}
        M ${x + width/2} ${y}
        l ${Math.cos(theta) * arrowLength} ${Math.sin(-theta) * arrowLength}`;
}
export function getXPath(x: number, y: number, len: number, angle: number): string {
    const theta = (angle) * Math.PI / 180;
    return `M ${x - len/2*Math.cos(theta)} ${y - len/2*Math.sin(theta)}
    L ${x + len/2*Math.cos(theta)} ${y + len/2*Math.sin(theta)}
    M ${x + len/2*Math.cos(theta)} ${y - len/2*Math.sin(theta)}
    L ${x - len/2*Math.cos(theta)} ${y + len/2*Math.sin(theta)}`;
}
export function getAPath(x: number, y: number, width: number, height: number): string {
    return `M ${x - width/2} ${y + height/2}
    L ${x} ${y - height/2}
    L ${x + width/2} ${y + height/2}
    M ${x - width/4} ${y}
    h ${width/2}
    `;
}
export function getFPath(x: number, y: number, width: number, height: number): string {
    return `M ${x + width/2} ${y - height/2}
    h ${-width}
    v ${height}
    M ${x+width/2} ${y}
    h ${-width}
    `;
}