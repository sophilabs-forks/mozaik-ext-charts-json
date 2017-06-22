import React, { Component, PropTypes } from 'react'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'
import {
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 20, bottom: 60, left: 70 }


export default class BarChart extends Component {

    static propTypes = {
        url: PropTypes.string,
        title: PropTypes.string,
        path: PropTypes.string,
        data: PropTypes.array
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ url, path }) {
        return {
            id: `charts.data.${url}.${path}`,
            params: { url, path }
        }
    }

    render() {
        const {
           title,
           data
        } = this.props

        const { theme } = this.context

        let body = <WidgetLoader />
        if (data) {
            body =(
                <Chart margin={margin} data={data} theme={theme.charts}>
                    <Scale id="value" type="linear" dataKey="value" axis="y"/>
                    <Scale id="label" type="band" dataKey="label" axis="x" padding={0.3}/>
                    <Grid yScale="value"/>
                    <Axis
                        scaleId="value"
                        position="left"
                        tickSize={0}
                        tickPadding={7}
                        legend="value"
                        legendPosition="center"
                        legendOffset={-40}
                    />
                    <Axis
                        scaleId="label"
                        position="bottom"
                        tickSize={0}
                        tickPadding={7}
                        legend="label"
                        legendPosition="center"
                        legendOffset={40}
                    />
                    <Bars xScale="label" x="label" yScale="value" y="value" color="#fff"/>
                </Chart>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title}
                    icon="chart"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
