import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class JsonBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = { builds: [] };
    }

    getApiRequest() {
        let { url, path } = this.props;

        return {
            id: `charts.jsonBarChart.${ url }.${ path }`,
            params: {
                url: url,
                path: path
            }
        };
    }

    onApiData(builds) {
        this.setState({ builds: _.clone(builds).reverse() });
    }

    render() {
        let { title } = this.props;
        let { data } = this.state;

        // converts to format required by BarChart component
        let items = data.map(item => {
            return {
                x:     item.label,
                y:     item.value,
                state: 'ok'
            };
        });

        let barChartOptions = {
            mode:            'stacked',
            xLegend:         'label',
            xLegendPosition: 'right',
            yLegend:         'value',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        function (d) { return `result--${ d.state }`; }
        };

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{title || 'Chart'}</span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

JsonBarChart.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
    path: PropTypes.string
};

reactMixin(JsonBarChart.prototype, ListenerMixin);
reactMixin(JsonBarChart.prototype, Mozaik.Mixin.ApiConsumer);


export default JsonBarChart;
