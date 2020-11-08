import React from 'react'

class AssetAddModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isError: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
            var formData = new FormData(event.target);
            var error = false;
            await fetch('http://localhost:8080/api/egar/asset/save', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assetName: formData.get('assetName')
                    
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
                this.props.forceUpdateAssetList();
            }
    }

    render() {
        return (
        <div className="modalDialog">
            <div>
                <a onClick={this.props.handleModal} title="Закрыть" className="close">X</a>
                <form onSubmit={e => this.handleSubmit(e)}>
                         <label htmlFor="assetName">Введите название: </label>
                         <input type="text" pattern="[a-zA-Zа-яА-Я0-9 ]*" id="assetName" name="assetName" required></input> <br></br>
                         {this.state.isError && <p className="error">Ценная бумага с таким названием уже существует</p>}
                    <button className="button">Добавить</button>
                </form>
            </div>
         </div>);
    }
}

export default AssetAddModal;