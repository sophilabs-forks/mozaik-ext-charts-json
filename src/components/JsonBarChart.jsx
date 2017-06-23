import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class JsonBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
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

    onApiData(data) {
        this.setState({ data: _.clone(data).reverse() });
    }

    render() {
        let { title, labelX, labelY } = this.props;
        let { data } = this.state;

        if (!data) {
            data = [];
        }

        if (data.length === 1) {
            data = data[0];
        }

        let items = _.map(data, (value, key) => {
            return {
                x: key,
                y: value,
                klass: value > 70 ? 'success' : (value > 40 ? 'warning' : 'failure')
            };
        });

        items = _.sortBy(items, _.property('x'));

        let barChartOptions = {
            mode:            'stacked',
            xLegend:         labelX || 'Label',
            xLegendPosition: 'right',
            yLegend:         labelY || 'Value',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        function (d) { return `result--${ d.klass }`; }
        };

        return (
            <div>
                {title && <div className="widget__header">
                            <span className="widget__header__subject">{ title }</span>
                            <i className="fa fa-bar-chart" />
                          </div>}
                <div className="widget__body">
                    <BarChart data={[{ data: items }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

JsonBarChart.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
    path: PropTypes.string,
    labelX: PropTypes.string,
    labelY: PropTypes.string
};

reactMixin(JsonBarChart.prototype, ListenerMixin);
reactMixin(JsonBarChart.prototype, Mozaik.Mixin.ApiConsumer);


export default JsonBarChart;
