import React, {useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';

import './style.css';
import '../../global.css';

import logo from '../../assets/logo.svg';



export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

   async function handleRegister(e){
        e.preventDefault();
       const data ={
            name,
            email,
            whatsapp,
            city,
            uf,
        };

       try{
        const response = await api.post('ongs' , data) ;

        alert(`seu ID de acesso: ${response.data.id}` );
        history.push('/');
       }
       catch (err){
           alert('Erro no cadastro');
       }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="be the hero"/>
                    <h1>Cadastro</h1>
                    <p>faça seu cadastro, entre na plataforma e ajude pessoas a encontratem os casos de sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                    voltar
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                   
                    <input 
                    type="email" placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                   
                    <input 
                    placeholder="WhatsAPP"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                   
                    <input 
                    placeholder="cidade"style={{}}
                    value={city}
                    onChange={e => setCity(e.target.value)}/>
                   
                    <input 
                    placeholder="UF" style={{width:80}}
                    value={uf}
                    onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}