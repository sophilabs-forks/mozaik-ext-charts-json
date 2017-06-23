import test           from 'ava'
import React          from 'react'
import { shallow }    from 'enzyme'
import BarChart from '../../src/components/JsonBarChart'
import {
    WidgetLoader,
    WidgetHeader,
} from 'mozaik/ui'


const sampleUrl  = 'http://json'
const samplePath = '$.path'

test('should return correct api request', t => {
    t.deepEqual(
        BarChart.getApiRequest({
            url:    sampleUrl,
            path:   samplePath,
        }),
        {
            id:     `charts.data.${sampleUrl}.${samplePath}`,
            params: {
                url:     sampleUrl,
                path:    samplePath,
            },
        }
    )
})
