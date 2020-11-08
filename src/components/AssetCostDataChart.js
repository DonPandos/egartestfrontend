import React from 'react';
import { Chart, Bar, Line } from 'react-chartjs-2'

class AssetCostDataChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{date: '', cost: ''}]
        }
    }

    loadData = (event) => {
        fetch('http://localhost:8080/api/egar/assetcost/date-to-cost-chart-data', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assetId: event.target.value
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                var data = result.chartData;
                data.sort(function(a, b) {
                    return a.date - b.date;
                })
                this.setState({
                    data: data
                })
              
            }
        )
    }

    render() {
        var labels = [];
        var data = [];
        for(var key in this.state.data) {
            labels.push(new Date(this.state.data[key].date).toLocaleDateString());
            data.push(this.state.data[key].cost);
        }
        return (
        <div>
            <label htmlFor="date">Выберите ценную бумагу для отрисовки графика: </label>
            <select id="assetId" name="assetId" onChange={this.loadData}>
                <option selected disabled hidden style={{display: 'none'}} value=''></option>
                {this.props.assetList.map((item, i) => {
                    return (<option value={item.id}>{item.name}</option>);
                })}
            </select> <br></br>
            <Line data={{
                labels: labels,
                datasets: [{
                    label: 'График ',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data
                    }]
                }} 
            />
        </div>);
    }
}

export default AssetCostDataChart;