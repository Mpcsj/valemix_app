import React, { Component } from 'react'
import colors from '../styles/colors'
import { View, StyleSheet, Alert ,Text,TouchableOpacity} from 'react-native'
import {Container,Footer,Content} from 'native-base'
import LoadComponent from '../components/Loader'
import connections from '../util/connections'
import CompDropDownMenu from '../components/CompDropDownMenu'
class Tela1Executar extends Component {
    static navigationOptions = {
        title: 'Selecione os materiais'
    }
    state = {
        cimento: [],
        areia: [],
        brita: [],
        aditivo: [],
        is_loading: true
    }
    constructor() {
        super()
        this.load_materiais()
    }
    set_data_from_api(data){
        this.setState({is_loading:false})
        this.setState({cimento:data.cimento})
        this.setState({areia:data.areia})
        this.setState({aditivo:data.aditivo})
        this.setState({brita:data.brita})
    }
    load_materiais = () => {
        fetch(`${connections.url_server}APP/MATERIAL`,{
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log('dados: ',responseJson)
                this.set_data_from_api(responseJson)
            })
            .catch((error) => {
                Alert.alert('Oops','Erro ao obter dados da API: '+error)
                this.setState({is_loading:false})
            });
    }

    render() {
        return (
            <Container>
                <Content>
                <View style={styles.container}>
                    <LoadComponent loading={this.state.is_loading} />
                    <CompDropDownMenu title={'cimento'} data={this.state.cimento}/>
                    <CompDropDownMenu title={'areia1'} data={this.state.areia}/>
                    <CompDropDownMenu title={'areia2'} data={this.state.areia}/>
                    <CompDropDownMenu title={'brita1'} data={this.state.brita}/>
                    <CompDropDownMenu title={'brita2'} data={this.state.brita}/>
                    <CompDropDownMenu title={'aditivo'} data={this.state.aditivo}/>
                </View>
                </Content>
                <Footer style={styles.footer}>
                    <TouchableOpacity style={styles.btn_footer}>
                        <Text style={styles.btn_footer}>Executar</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
    },
    footer:{

    },
    btn_footer:{
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:colors.button_color,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    }
})

export default Tela1Executar