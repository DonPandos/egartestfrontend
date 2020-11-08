import '../App.css';
import React from 'react';
import AssetCostTableItem from './AssetCostTableItem'
import AssetCostAddModal from './AssetCostAddModal'
import AssetAddModal from './AssetAddModal';
import AssetCostDataChart from './AssetCostDataChart'

class AssetCostTable extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isDataFetched: false,
            showAssetCostAddModal: false,
            showAssetAddModal: false,
            reloadChartData: false,
            assetList: [{
                id: '',
                name: ''
            }],
            assetCostList: [{
                id: '',
                date: '',
                cost: '',
                assetId: ''  
            }]
        }
    }

    componentDidMount() {
        this.forceUpdateAssetListHandler();
        this.forceUpdateTableHandler();
    }

    handleAssetCostAddModal = () => {
        this.setState({
            showAssetCostAddModal: !this.state.showAssetCostAddModal,
            reloadChartData: true
        });
    }

    handleAssetAddModal = () => {
        this.setState({showAssetAddModal: !this.state.showAssetAddModal})
    }

    forceUpdateTableHandler = () => {
        fetch('http://localhost:8080/api/egar/assetcost/all', {header : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    assetCostList : result.assetCostList,
                    isDataFetched: true
                })
            }
        )
    }

    forceUpdateAssetListHandler = () => {
        fetch('http://localhost:8080/api/egar/asset/all', {header : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    assetList : result.assetList,
                })
            }
        )
    }

    render() {
        if(!this.state.isDataFetched) return null;
        return (
            <div>
                { this.state.showAssetCostAddModal && <AssetCostAddModal handleModal={this.handleAssetCostAddModal} assetList={this.state.assetList} forceUpdateTable={this.forceUpdateTableHandler}/> }
                { this.state.showAssetAddModal && <AssetAddModal handleModal={this.handleAssetAddModal} assetList={this.state.assetList} forceUpdateAssetList={this.forceUpdateAssetListHandler}/> }

                <table id="paperCostTable">
                    <tbody>
                        <tr>
                            <th>Дата</th>
                            <th>Компания</th>
                            <th>Стоимость</th>
                        </tr>
                        {this.state.assetCostList.map((item, i) => {
                         return (<AssetCostTableItem key={i} id={item.id} date={item.date} assetId={item.assetId} cost={item.cost} assetList={this.state.assetList}/>);
                        })}
                    </tbody>
                </table>
                <button onClick={this.handleAssetCostAddModal} className="button">Добавить запись в таблицу</button>
                <button onClick={this.handleAssetAddModal} className="button">Добавить ценную бумагу</button> <br></br>
                <AssetCostDataChart assetList={this.state.assetList}/>
            </div>
        );
    }
}

export default AssetCostTable;