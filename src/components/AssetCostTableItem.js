import '../App.css';
import React from 'react';
import moment from 'moment';
class AssetCostTableItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            assetCostId: props.id,
            date: props.date,
            assetId: props.assetId,
            cost: props.cost,
            isReady: false
        }
        this.updateItemInDb = this.updateItemInDb.bind(this);
    }

    componentDidMount() {
       this.setState({
           isReady: true
       })
    }
    
    
    updateItemInDb(e, field) {
        console.log('itemid: ' + e.target.value);
        // if(field == 'assetId') value = this.props.assetList.find(el => el.name === e.target.value).id;
        //
        fetch('http://localhost:8080/api/egar/assetcost/update', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assetCostId: this.state.assetCostId,
                [field]: e.target.value
            })
        });
    
    }


    render() {
        if(!this.state.isReady) return null;
        //console.log(this.props.assetList);
        return (
            <tr>
                <td><input type="date" defaultValue={moment(new Date(this.props.date)).format('YYYY-MM-DD')} onBlur={e => this.updateItemInDb(e, 'date')} max={moment(new Date()).format('YYYY-MM-DD')}></input></td>
                {/* <td><input type="text" defaultValue={this.props.assetList.find(el => el.id === this.state.assetId).name} onBlur={this.updateItemInDb}></input></td> */}
                <td>
                    <select defaultValue={this.state.assetId} onChange={e => this.updateItemInDb(e, 'assetId')}>
                        {this.props.assetList.map((item, i) => {
                            return (<option value={item.id}>{item.name}</option>);
                        })}
                    </select>
                </td>
                <td><input type="text" pattern="[0-9]*" defaultValue={this.props.cost} onBlur={e => this.updateItemInDb(e, 'cost')} onkeyup="if(this.value<0){this.value= this.value * -1}"></input></td>
            </tr>
        )
    }
}

export default AssetCostTableItem;