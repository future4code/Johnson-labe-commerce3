import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* background-color: gray; */

`;

const ListaProdutos = styled.p`
    list-style: none;
    /* background-color: gray; */
`;

const BotaoExcluir = styled.button`
    margin-left: 5px;
    font-size: 14px;
    &:hover {
    background-color: gray;
    color: white;
    }
`;

const Lixeira = styled.img`
    width: 20px;
    height: 20px;
`;

class Carrinho extends React.Component {
    render () {
        return (
            <Container>
                <ListaProdutos>
                    {this.props.quantidade}x {this.props.nomeProduto}: {this.props.valorProduto * this.props.quantidade} 
                    <BotaoExcluir onClick={this.props.excluir}>❌</BotaoExcluir>
                </ListaProdutos>
            </Container>
        )
    }
}

export default Carrinho