import React , {useState ,useEffect}from 'react';
import {Link , useHistory} from'react-router-dom';
import {FiPower , FiTrash2} from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

import './style.css';


export default function Profile(){

    const [incidents , setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(()=> {
        api.get('profile', {
            headers: {
                authorization : ongId,
            }
        }).then(response => {
            setIncidents(response.data);

        })
    },[ongId]);
    
    async function hundleDeleteIncident(id){
    
        try{
            await api.delete(`incidents/${id}`,{
                headers: { 
                    Authorization : ongId,
                    
            }
        });
         setIncidents(incidents.filter(incidents => incidents.id  !== id)); 
      
        } catch{
        alert('erro ao deletar caso');
    }
}
 
function hundleLogaut(){
        
        localStorage.clear();

        history.push('./');
    }
    

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="be the hero"></img>
                <span>Bem Vindo ,{ongName}</span>
                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                     <button onClick={hundleLogaut} type="button">
                        <FiPower size={30} color="#e02041"/>
                    </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
              {
                  incidents.map(incidents=> ( 
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                  <p>{incidents.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incidents.value)}</p>

                    <button onClick={ () => hundleDeleteIncident } type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>))
              }
            </ul>
        </div>
    );
}