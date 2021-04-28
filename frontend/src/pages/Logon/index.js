import React,{useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

import heroesImg from '../../assets/logon.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
    const[id , setId] = useState('');
    const history = useHistory();
   

    async function hundleLogin(e){
        e.preventDefault();
            
        try{
            const response = await api.post('sessions',{ id });
    
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName:', response.data.ong.name);
            history.push('/Profile');
        }
        catch (err){
            alert('falha no login tente novamente');
        }

    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={logo} alt="be the hero"/>
            
            <form onSubmit={hundleLogin}> 
                <h1>Faça seu Logon</h1>
                <input 
                placeholder="sua ID" 
                value={id}
                onChange={e=> setId(e.target.value)}
                />
                <button className="button" type="submit" >Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroesImg} alt="heroes" />
    </div>
    );
}