import React, { Component } from 'react'
import api from '../../../utils/api.util'


export class DespesasGerais extends Component {
    state={
        load:false,
        name:"test",
        descricao:"",
        user:localStorage.getItem('user'),
        gasto_total:100,
        data:"",
        msg:"",
        msgClassName:"",
        parcelado:"nao",
        openParcelado:false,
        numeroParcelas:0
    }
    componentDidMount = async() =>{

       const date= new Date()
       let dia = date.getDate()
       if(`${dia}`.length<2){
           dia = `0${dia}`
       }

       let mes = date.getMonth() + 1
       if(`${mes}`.length<2){
           mes = `0${mes}`
       }
       const ano = date.getFullYear()

       this.setState({
           load:true,
           data:`${ano}-${mes}-${dia}`
       })
    }
    handleChange = async(e) =>{
        e.preventDefault()
        let {name,value} = e.target
        await this.setState({
            [name]:value
        })
    }
    handleSubmitDespesa = async () =>{
        if(!this.state.openParcelado){
        
        const payload ={
           user:this.state.user,
           name:this.state.name,
           gasto_total: this.state.gasto_total,
           data: this.state.data,
           descricao: this.state.descricao,
        }
        
        try {
            if(this.state.gasto_total===0){
                this.setState({
                    msg:"Insira um valor na venda",
                    msgClassName:"error-msg-despesas-gerais"
                })
                throw new Error()
            }
            await api.postDespesa(payload)
            await this.setState({
                name:"",
                gasto_total:0,
                descricao:"",
                msg:"Desepsa enviada com sucesso",
                msgClassName:"error-msg-despesas-gerais"
            })

        } catch (error) {
    
        }
    }else{
        try {
          
            if(this.state.numeroParcelas < 2 || this.state.numeroParcelas.includes(",") || this.state.numeroParcelas.includes(".")){
                return alert("Coloque um valor válido de parcelas")
            }else{
              
                
                let numeroDeVezes = parseInt(this.state.numeroParcelas)
                
               
                const numberValorDaParcela = Number((this.state.gasto_total/numeroDeVezes).toFixed(2))
                let valorDeTest=0
                const arrayData = this.state.data.split("-")
                let ano = Number(arrayData[0])
                let mes = Number(arrayData[1])
                let dia = arrayData[2]
                
                for(let i = 0; i<numeroDeVezes; i++){
                    valorDeTest += numberValorDaParcela
                    if(mes === 13){
                        mes = 1
                        ano += 1
                    }
                    let stringMes = mes
                    if(mes<10){
                        stringMes=`0${mes}`
                    }
                    const NovaData =`${ano}-${stringMes}-${dia}`
                    const payload ={
                        user:this.state.user,
                        name:this.state.name,
                        gasto_total: numberValorDaParcela,
                        data: NovaData,
                        descricao: this.state.descricao,

                    }
                    try {
                        await api.postDespesa(payload)
                    } catch (error) {
                        if(i===0){
                            alert("Erro ao enviar despesa")
                        }
                        if(i>1){
                            alert("Erro grave porfavor contate a asistência")
                        }
                    }
                    mes += 1
                    
                    
                }
                
            }
        } catch (error) {
            
        }
    }
        setTimeout(()=>{this.setState({msg:"",msgClassName:""})},3000)
        
    
    }
    onChangeParcelado = async (e) =>{
        await this.setState({
            parcelado:e.target.value
        })
        if(this.state.parcelado==="sim"){
            this.setState({
                openParcelado:true
            })
        }else{
            this.setState({
                openParcelado:false
            })
        }
    }
   render() {
       return (
           <div>
               {this.state.load?
               <>
               <div>
                   <div>
                       <div>
                           <h1>Despesa</h1>
                       </div>
                       <div>
                           <form>
                               <div>
                               <label forhtml="name">Nome:</label>
                               <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                               </div>
                               <div>
                               <label forhtml="data">Data:</label>
                               <input type="date" name="data" value={this.state.data} onChange={this.handleChange}/>
                               </div>
                               <div>
                               <label forhtml="gasto_total">Gasto total:</label>
                               <input type="number" min="0" name="gasto_total" value={this.state.gasto_total} onChange={this.handleChange}/>
                               </div>
                               <div>
                               <label forhtml="descricao">Descricao:</label>
                               <textarea  name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
                               </div>
                               <div>
                                    <div><label forhtml="parcelado"> parcelado</label></div>
                                    <div onChange={this.onChangeParcelado}>
                                        <input type="radio" name="parcelado" value="sim" checked={this.state.parcelado==="sim"} onChange={this.onChangeParcelado}/>Sim
                                        <input type="radio" name="parcelado" value="nao" checked={this.state.parcelado==="nao"} onChange={this.onChangeParcelado}/>Não
                                    </div>
                               </div>
                               {
                                   this.state.openParcelado && 
                                    <div>
                                        <label>Número de parcelas</label>
                                        <input type="number" name="numeroParcelas" value={this.state.numeroParcelas}  onChange={this.handleChange}/>
                                    </div>
                               }
                               
                               <div>
                                   <button type="button" onClick={this.handleSubmitDespesa}>Enviar</button>
                               </div>
                               <div>
                                   <h4>{this.state.msg}</h4>
                               </div>
                           </form>
                       </div>
                   
                   </div>
               </div>
               </>
               
               
               :
               <h1>Carregando ...</h1>
               }
               
           </div>
       )
   }
}

export default DespesasGerais
