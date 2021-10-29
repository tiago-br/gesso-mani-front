import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../../utils/api.util'
import { VscGithubInverted } from 'react-icons/vsc'
import { SiLinkedin } from 'react-icons/si'
import { FaLock } from 'react-icons/fa'
import { CgLogIn } from 'react-icons/cg'
import { MdLogin } from 'react-icons/md'


const FormContainer = styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 3px solid black;
background-color: #2B2B2A;
width: 50vw;
height: 24rem;
margin-top: 0 !important;

@media (max-width: 960px) {
  width: 80vw;
  }
`
const ContainerGeral = styled.div`


height: 86vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;



`


const CardLogin = styled.div`

height: 3rem;
width: 100%;
background-color: #10100f;
display: flex;
justify-content: space-between;
align-items: center;
color: white;


`
const Login = styled.h1`
color: white;
font-size: 1.5rem;

width: 7rem;
text-align: center;
`
const SistemaLog = styled.h1`
color: white;
font-size:1.5rem;
text-align: center;
padding-right: 20px;
`

const UserName = styled.input`
margin-top: 3.5rem;
border-radius: 20px;
height: 2.5rem;
width: 85%;
padding-left: 15px;
font-size: 1.2rem;
border: 2px solid black;
::placeholder{
   color: #1D1D1C;
}
:focus{
    outline: none;
   
    border: 2px solid #656059;
}
`
const SenhaLogin = styled.input`
margin-top: 3rem;
border-radius: 20px;
height: 2.5rem;
width: 85%;
padding-left: 15px;
font-size: 1.2rem;
border: 2px solid black;
::placeholder{
   color: #1D1D1C;
}
:focus{
    outline: none;
   
    border: 2px solid #656059;
}
`

const Button = styled.button`
margin-top: 3rem;
width: 50%;
height: 3rem;
background-color: black;
color: white;
border: 3px solid #1D1D1C;
cursor: pointer;
font-weight: 700;
:hover{
    background-color: grey ;
    color: black;
    border: 3px solid black;
}



`

const ContainerFooter = styled.div`

background-color: #1D1D1C;
height: 6rem;
color: white;
display: flex;
align-items: center;



`

const ContainerDevs = styled.div`
display: flex;
height: 70%;
width: 45%;
justify-content: space-around;
@media (max-width: 960px) {
  width: 100vw;
  }
`

const Devs = styled.div`

display: flex;
justify-content: space-between;
flex-direction: column;

text-align: start;

a{
    display: flex;
    align-items: center;
    color:white;
    text-decoration:none;
    :hover{
        text-decoration: underline;
    }
    span{
        padding-left: 5px;
    }
}

`



class FormLogin extends Component {
    state = {
        username: '',
        password: '',
        msg: ''
    }
    
    handleChangeLogin = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        
        const payload = {
            username: this.state.username,
            password: this.state.password
        }



        try {
            
            await api.login(payload)
            window.location = "/sistema/vendas"
        }
        catch (error) {

            await this.setState({
                msg: 'Usuário ou senha inválido',
                
            })

            setTimeout(() => {
                this.setState({
                    msg: ""
                })
            },2000)
        }


    }

    render() {
        return (<>
            <ContainerGeral>
                <FormContainer>
                    <CardLogin>




                        <Login><FaLock/> Login</Login>
                        <SistemaLog> <i className='fab fa-firstdraft' /></SistemaLog>

                    </CardLogin>

                    <UserName placeholder='Usuário' type='text' name='username' value={this.state.username} onChange={this.handleChangeLogin}></UserName>

                    <SenhaLogin placeholder='Senha' type='password' name='password' value={this.state.password} onChange={this.handleChangeLogin}></SenhaLogin>
                    {this.state.msg && <div style={{fontSize:"1.3rem",color: 'red',paddingTop: '0.8rem'}}>{this.state.msg}</div>}
                    <Button placeholder='Usuario' type='button' onClick={this.handleSubmit}><MdLogin style={{fontSize:'1.2rem',verticalAlign:'middle',paddingRight:'1px', position:'relative',bottom:'2px'}}/>Entrar</Button>
                </FormContainer>
                
            </ContainerGeral>

            <ContainerFooter>

                <ContainerDevs>
                   
                        Developed by
                   

                    <Devs>
                        <h3>Gustavo Barbosa</h3>
                        <a href='https://www.linkedin.com/in/gustavo-sena-33331121b/'><SiLinkedin style={{color: '#0e76a8 '}} /> <span>Linkedin</span></a>
                        <a href='https://github.com/G-droidBr/Gesso-Mania---Back-End'><VscGithubInverted /><span>Github</span> </a>
                    </Devs>
                    <Devs>
                        <h3>Tiago Rebelato</h3>
                        <a href='https://www.linkedin.com/in/tiago-rebelato-076808209/'><SiLinkedin style={{color: '#0e76a8 '}}/><span></span> Linkedin</a>
                        <a href='https://github.com/tiago-br/gesso-mani-front'><VscGithubInverted /> <span></span>Github </a>
                    </Devs>
                </ContainerDevs>



            </ContainerFooter>
        </>
        )
    }
}

export default FormLogin
