import '../App.css';
import React from 'react';
import moment from 'moment';

class AssetCostAddModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isError: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
            event.preventDefault();
            var formData = new FormData(event.target);
            var error = false;
            await fetch('http://localhost:8080/api/egar/assetcost/save', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: formData.get('date'),
                    assetId: formData.get('assetId'),
                    cost: formData.get('cost')
                })
            })
            .then(function(response) {
                if(!response.ok) {
                    error = true;
                }
            })
            if(error) {
                this.setState({isError: true});
            }
            else {
                this.props.handleModal();
                this.props.forceUpdateTable();
            }
        
    }


    render(){
        return (
            <div className="modalDialog">
                 <div>
                     <a onClick={this.props.handleModal} title="Закрыть" className="close">X</a>
                     <form onSubmit={e => this.handleSubmit(e)}>
                         <label htmlFor="date">Введите дату: </label>
                         <input type="date" id="date" name="date"  max={moment(new Date()).format('YYYY-MM-DD')} required></input> <br></br>

                         <label htmlFor="date">Выберите ценную бумагу: </label>
                         <select id="assetId" name="assetId">
                            {this.props.assetList.map((item, i) => {
                                return (<option value={item.id}>{item.name}</option>);
                                })}
                         </select> <br></br>

                         <label htmlFor="cost">Введите стоимость: </label>
                         <input type="number" min="0" id="cost" name="cost" required></input> <br></br>
                         {this.state.isError && <p className="error">Запись ценной бумаги на эту дату уже существует</p>}
                         <button className="button">Добавить</button>
                     </form>
                </div>
            </div>
            )
    }
}

export default AssetCostAddModal;