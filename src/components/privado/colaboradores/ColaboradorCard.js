import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'

export class ColaboradorCard extends Component {
    state = {
        nome: '',
        cargo: '',
        data_de_entrada: '',
        data_de_saida: '',
        img: '',
        ativo: false,
        salario: '',
        id: '',
        msgAtivo: '',
        msgAtualizar: '',
        msgColorAtualizar: '',
        editOn: true,
        openExcluir: false,
        file: ''
    }
    componentDidMount = () => {
        const { nome, cargo, data_de_saida, data_de_entrada, img, ativo, salario, _id } = this.props
        const splitData = data_de_entrada.split('T')[0].split('-')

        const dataFormatada = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
        let msgAtivo;
        if (ativo === true) {
            msgAtivo = 'Sim'
        } else {
            msgAtivo = 'Não'
        }

        this.setState({
            nome,
            cargo,
            data_de_saida,
            data_de_entrada: dataFormatada,
            img,
            ativo,
            salario,
            id: _id,
            load: true,
            msgAtivo
        })
    }
    onChange = async (e) => {
        e.preventDefault()

        const { name, value } = e.target
        await this.setState({
            [name]: value
        })
    }
    handleCheckBox = async () => {
        let msgAtivo;
        await this.setState({
            ativo: !this.state.ativo
        })
        if (this.state.ativo) {
            msgAtivo = 'Sim'
        } else {
            msgAtivo = 'Não'
        }
        await this.setState({
            msgAtivo
        })

    }
    handleAtualizarForm = async () => {

        const payload = {
            nome: this.state.nome,
            cargo: this.state.cargo,
            data_de_saida: this.state.data_de_saida,
            data_de_entrada: this.props.data_de_entrada,
            img: this.props.img,
            ativo: this.state.ativo,
            salario: this.state.salario
        }
        try {
            await apiUtil.putColaborador(this.state.id, payload)
            this.setState({
                msgAtualizar: 'Colaborador atualizado com sucesso',
                msgColorAtualizar: 'green',
                editOn: true
            })
        } catch (error) {
            await this.setState({
                msgAtualizar: 'Erro ao atualizar colaborador',
                msgColorAtualizar: 'red',
                editOn: true
            })
        }

    }
    handleEditar = async () => {
        this.setState({
            editOn: !this.state.editOn,
            msgAtualizar: ''
        })
    }
    handleOpenExcluir = () => {
        this.setState({
            openExcluir: !this.state.openExcluir
        })
    }
    confirmDelete = async () => {
        try {
            await apiUtil.deleteColaborador(this.state.id)
        } catch (error) {
            alert('erro ao excluir')
        }
    }
    onChangeFoto = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const imgUrl = URL.createObjectURL(file);
        await this.setState({
            img: imgUrl,
            file

        })

    }
    onClickAlterarImg = async () => {
        if (this.state.file) {
            try {
                const foto = await apiUtil.postImgColaborador(this.state.file, this.state.id)
                this.setState({
                    msgAtualizar: 'Imagem atualizada com sucesso',
                    msgColorAtualizar: 'green',
                    editOn: true
                })
            } catch (error) {
                await this.setState({
                    msgAtualizar: 'Erro ao atualizar imagem colaborador',
                    msgColorAtualizar: 'red',
                    editOn: true
                })
            }
        } else {
            alert('Insira uma foto')
        }
    }
    onClickImg = async () => {
        document.getElementById("input-colaborador-file-button").click()
    }
    render() {

        return (
            <div>
                {this.state.load ?
                    <div className="container-form-edit-card-colaborador">
                        <form className="form-edit-card-colaborador">

                            {this.state.openExcluir ?
                                <div className="container-form-confirm-delete-colaborador">
                                    <div>
                                        <h3>Tem certeza que deseja deletar o colaborador {this.state.nome}</h3>
                                        <div>
                                            <div>
                                                <button onClick={this.handleOpenExcluir}>Cancelar</button>
                                            </div>
                                            <div>
                                                <button onClick={this.confirmDelete}>Confirmar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <>


                                    <fieldset disabled={this.state.editOn}>
                                        <div className='container-card-merged-img-form'>
                                            <section className='section-container-colaborador-inputs'>
                                                <div>
                                                    <div>
                                                        <label>Nome:</label>
                                                        <input type="text" name='nome' value={this.state.nome} onChange={this.onChange} />
                                                    </div>

                                                </div>

                                                <div>
                                                    <label>Cargo:</label>
                                                    <input type="text" name='cargo' value={this.state.cargo} onChange={this.onChange} />
                                                </div>

                                                <div>
                                                    <label>Data de entrada:</label>
                                                    <input type="text" value={this.state.data_de_entrada} readOnly disabled={true} />
                                                </div>

                                                <div>
                                                    <label>Salário:</label>
                                                    <input type="number" name="salario" value={this.state.salario} onChange={this.onChange} />
                                                </div>

                                                <div>
                                                    <label>Ativo:</label>
                                                    <input className="card-colaborador-checkbox" type="checkbox" onChange={this.handleCheckBox} defaultChecked={this.state.ativo} />
                                                    <span>{this.state.msgAtivo}</span>
                                                </div>
                                            </section>
                                            <section className='container-image-form-colaborador'>
                                                <div>
                                                    <img src={this.state.img} alt={this.state.name} />
                                                </div>
                                            </section>
                                        </div>
                                    </fieldset>



                                    {this.state.editOn ?
                                        <div className='container-button-edit-form-colaborador'>
                                            <button type="button" id='button-edit-form-colaborador' onClick={this.handleEditar}>Editar</button>
                                        </div>
                                        :
                                        <>

                                            <div className="container-card-buttons-excluir-att">
                                                <div className="container-card-buttons-att">
                                                    <div>
                                                        <button type="button" onClick={this.handleAtualizarForm}>Atualizar</button>
                                                        <span style={{ color: this.state.msgColorAtualizar }}>{this.state.msgAtualizar}</span>
                                                    </div>
                                                    <div>
                                                        <button type="button" onClick={this.handleOpenExcluir}>Excluir</button>
                                                    </div>
                                                    <div>
                                                        <button type="button" onClick={this.handleEditar}>Editar</button>
                                                    </div>
                                                    <div>
                                                        <button type="button" onClick={this.onClickAlterarImg}>Alterar foto</button>
                                                    </div>
                                                    <div id="colaborador-file-button">

                                                        <button type="button" onClick={this.onClickImg}>Selecione a foto</button>
                                                        <input id="input-colaborador-file-button" type="file" name="arquivo" onChange={this.onChangeFoto} />
                                                    </div>
                                                </div>
                                            </div>

                                        </>

                                    }




                                </>
                            }
                        </form>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default ColaboradorCard
