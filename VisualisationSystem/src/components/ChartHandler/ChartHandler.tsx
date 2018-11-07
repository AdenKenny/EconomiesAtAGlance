import React, {Component} from 'react';
import Chart from '../Chart/Chart';

import App from '../../App';

import "./ChartHandler.css";

export default class ChartHandler extends Component<{graphedCountries, indicator}, {graphedCountries, indicator}> {

    constructor(props, state) {
        super(props, state);
        this.state = {
            graphedCountries: this.props.graphedCountries,
            indicator: this.props.indicator
        };
    }
    
    render() {
        if (this.state.graphedCountries.length === 0) {
            return (
                <div className="filler"/>
            );
        }
        const dataHandler = App.dataHandler;
        const fields = dataHandler.getFields(this.state.graphedCountries, this.props.indicator);
        const data = dataHandler.getData(this.state.graphedCountries, fields);
        const range = dataHandler.getRange(data);
        return (
            <Chart data={data} max={range.max}/>
            //data.length > 0 ? <Chart data={data} max={range.max}/> : <div className="filler"><button>dfasdfsadfasdfasdf</button></div>
        );
    }

}