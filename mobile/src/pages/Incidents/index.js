import React, {useEffect , useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation}  from '@react-navigation/native';

import api from '../../services/api';

import { View , FlatList, Image , Text , TouchableOpacity} from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incident(){
    const [incidents , setIncidents] = useState([ ]);
    const [total , setTotal] = useState([]);
    const [page , setPage] = useState (1);
    const [loading , setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationDetail (incidents) {
        navigation.navigate('Detail' , { incidents});
    }
    async function loadIncidents() {
        if (loading) {
            return ;
        }
        if (total > 0 && incidents.length === total) {
            return ;
        }
        setLoading(true);

        const response = await api.get('Incidents' , { params : { page }});

        setLoading(false);
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1 );
     
    }

useEffect (() => {
    loadIncidents(incidents);
} , [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source ={logoImg} />
                <Text style={ styles.headerText}>
                    total <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
                </View>
                    <Text style={styles.title}>Bem Vindo</Text>
                    <Text style={styles.description}> Escolha um dos casos a baixo e salve o dia </Text>

                <FlatList 
                    style={styles.incidentsList}
                    data={incidents}
                    keyExtractor = {incidents => String (incidents.id)}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({item: incidents }) => (
                        <View  style={styles.incidents}> 
                            <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incidents.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incidents.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{
                    Intl.NumberFormat('pt-BR', {
                    style : 'currency', currency : 'BRL'
                    }).format(incidents.value)}</Text>

                            <TouchableOpacity 
                                style={styles.detailsButton}
                                onPress={() => navigationDetail(incidents)}>
                                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                    <Feather name="arrow-right" size={16} color="#e02041"/>
                                </TouchableOpacity>
                        </View>
                    )}
                />
        </View>
    );
}