import React , {useState} from 'react';
import logo from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './style.css';



export default function NewIncident(){
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [value , setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

   async function handleNewIncidents(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data ,{
                headers: {
                    Authorization : ongId ,
                }
            });
            history.push('/Profile');
        }catch{
            alert('erro ao inserir incident');
        }
    }

    return(
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="be the hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso.</p>

                    <Link className="back-link" to="/Profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                    voltar
                    </Link>

                </section>
                <form onSubmit={handleNewIncidents}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        ></input>
                        
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        ></input>
                        
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}