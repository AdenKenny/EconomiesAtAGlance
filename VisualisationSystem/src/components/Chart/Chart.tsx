import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from '../Axes/Axes';
import Bars from '../Bars/Bars';
import './Chart.css';

class Chart extends Component<{data, title, max}> {
    
    private xScale;
    private yScale;

    constructor(props) {
        super(props);
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    render() {

        let buffer = 0;
        if (this.props.data.length < 5) {
            buffer = 85 * (5 - this.props.data.length);
        }

        const margins = { top: 100, right: 2 + buffer, bottom: 160, left: 148 + buffer };
        const svgDimensions = {
            width: window.screen.width * 0.6,
            height: window.screen.height * 0.5
        };

        const xScale = this.xScale
            .padding(0.1)
            .domain(this.props.data.map(d => d.name))
            .range([margins.left, svgDimensions.width - margins.right]);

        const yScale = this.yScale
            .domain([0, this.props.max * 1.2])
            .range([svgDimensions.height - margins.bottom, margins.top]);

        return (
            <div className = "graphPane">
                <svg width={svgDimensions.width} height={svgDimensions.height} className = "chartSVG">
                    <g className="titleBox">
                        <text className="title" x={(svgDimensions.width + margins.left) / 4} y={50}>{this.props.title}</text>
                    </g>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <Bars
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={this.props.data}
                        maxValue={this.props.max}
                        svgDimensions={svgDimensions}
                    />
                    {/*<g>
                        <text className="Label" x={svgDimensions.width / 2} y={svgDimensions.height - 30}>Indicator</text>
                    </g>
                    <g>
                        <text className="Label y" y={120} x={-(svgDimensions.height + margins.top - margins.bottom) / 2}>Country</text>
                    </g>*/}
                </svg>
            </div>
        );
    }
}

export default Chart;