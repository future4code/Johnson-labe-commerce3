import React from "react";

import Filtros from "./components/Filtros.js";
import Produtos from "./components/Produtos.js";
import Carrinho from "./components/Carrinho.js";
import styled from "styled-components";
import camisa1 from  "./Img/camisa1.jpeg"
import camisa2 from "./Img/camisa2.jpeg"
import camisa3 from "./Img/camisa3.jpeg"
import camisa4 from "./Img/camisa4.jpg"
import camisa5 from "./Img/camisa5.jpg"
import camisa6 from "./Img/camisa6.jpg"
import camisa7 from "./Img/camisa7.jpg"
import camisa8 from "./Img/camisa8.jpg"

import imgCabecalho from "./Img/astro1.jpeg"

const Container = styled.div`
  background-color: white;
  background-position: 50% 0;
  display: flex;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: black;
  font-size: 18px;
`;
const Select = styled.select`
  height: 70%;
  margin-top: 2vh;
  margin-right: 2vh;
  font-size: 18px;

`;
const ContainerProdutos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 2fr);
  grid-column-gap: 1vw;
  grid-row-gap: 1vh;
  justify-items: center;
  align-items: center;
  background-color: white;
  color: black;

`;
const Produto = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Cabecalho = styled.header`
  display: flex;
  flex-direction: column;
  /* width: 30vw;
  height: 18vw; */
`;

const ImagemCabecalho = styled.img`
  width: 100%;
  height: 100%;
`;

const Botao = styled.button`
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: black;
    border-radius: 10px;
    background-color: white;
    &:hover {
    background-color: gray;
    color: white;
    cursor: pointer;

  }
`;

const CarrinhoCompras = styled.div`
  margin: 1vw;
  margin-top: 3.4vw;
  padding-left: 2vw;
  display: flex;
  flex-direction: column;
  height: 97vh;
  width: 25vw;
  background-color: white;

`;

const Rodape = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
    position: absolute;
    margin-bottom: -1100px;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    display: flex;
    padding: 0px;
`;

const TextoRodape = styled.h4`
  margin-left: 20px;
`;

const produtos = [
  {
    id: 1,
    name: "Camiseta Interestelar",
    value: 15.0,
    imageUrl: camisa1,
  },

  {
    id: 2,
    name: "Camiseta Astro planetas",
    value: 18.0,
    imageUrl: camisa2,
  },

  {
    id: 3,
    name: "Camiseta Astro balões",
    value: 20.0,
    imageUrl: camisa3,
  },

  {
    id: 4,
    name: "Tenis4",
    value: 250.0,
    imageUrl: camisa4,
  },

  {
    id: 5,
    name: "Tenis5",
    value: 300.0,
    imageUrl: camisa5,
  },

  {
    id: 6,
    name: "Tenis6",
    value: 50.0,
    imageUrl: camisa6,
  },

  {
    id: 7,
    name: "Tenis7",
    value: 20.0,
    imageUrl: camisa7,
  },

  {
    id: 8,
    name: "Tenis8",
    value: 68.0,
    imageUrl: camisa8,
  },
];

class App extends React.Component {
  state = {
    produtos: produtos,
    ordenacao: "crescente",
    valorMaximo: Infinity,
    valorMinimo: 0,
    buscarProduto: "",
    carrinho: [],
    adicionado: false,
  };

  alteraOrdenacao = (event) => {
    this.setState({ ordenacao: event.target.value });
  };

  onChangeValorMinimo = (event) => {
    this.setState({ valorMinimo: Number(event.target.value) });
  };

  onChangeValorMaximo = (event) => {
    this.setState({ valorMaximo: Number(event.target.value) });
  };

  onChangeBusca = (event) => {
    this.setState({ buscarProduto: event.target.value });
  };

  filtraProdutos = () => {
    let produtosFiltrados = this.state.produtos;
    if (this.state.valorMinimo) {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.value >= this.state.valorMinimo;
      });
    }
    if (this.state.valorMaximo) {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.value <= this.state.valorMaximo;
      });
    }
    if (this.state.buscarProduto !== "") {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        return produto.name.includes(this.state.buscarProduto);
      });
    }
    return produtosFiltrados;
  };

  adicionarProduto = (id) => {
    let novoCarrinho = this.state.carrinho;
    // produtoExiste recebe o index de cada produto do carrinho
    const produtoExiste = novoCarrinho.findIndex(
      (produto) => produto.id === id
    );

    // metodo findIndex retorna -1 caso não encontre produto no array novoCarrinho
    if (produtoExiste === -1) {
      const produto = this.state.produtos.find((item) => item.id === id);

      const produtoAdicionado = {
        id: produto.id,
        nome: produto.name,
        valor: produto.value,
        quantidade: 1,
      };
      novoCarrinho.push(produtoAdicionado);
    } else {
      const qtde = novoCarrinho[produtoExiste].quantidade;
      novoCarrinho[produtoExiste] = {
        ...novoCarrinho[produtoExiste],
        quantidade: qtde + 1,
      };
    }

    this.setState({ carrinho: novoCarrinho });
  };

  excluirProduto = (id) => {
    const excluirDoCarrinho = this.state.carrinho.filter((produto) => {
      return produto.id !== id;
    });

    this.setState({ carrinho: excluirDoCarrinho });
  };

  render() {
    const listaOrdenada = this.filtraProdutos().sort((a, b) => {
      if (this.state.ordenacao === "crescente") {
        return a.value - b.value;
      } else if (this.state.ordenacao === "decrescente") {
        return b.value - a.value;
      }
    });

    const listaProdutos = listaOrdenada.map((produto) => {
      return (
        <Produto>
          <Produtos
            key={produto.id}
            imagemProduto={produto.imageUrl}
            nomeProduto={produto.name}
            valorProduto={produto.value}
          />
          <Botao
            onClick={() => {
              this.adicionarProduto(produto.id);
            }}
          >
            Adicionar ao carrinho
          </Botao>
        </Produto>
      );
    });

    const listaCarrinho = this.state.carrinho.map((produtoNoCarrinho) => {
      return (
        <Carrinho
          nomeProduto={produtoNoCarrinho.nome}
          valorProduto={produtoNoCarrinho.valor}
          quantidade={produtoNoCarrinho.quantidade}
          excluir={() => this.excluirProduto(produtoNoCarrinho.id)}
        />
      );
    });

    return (
      <Container>
        <Filtros
          filtrarMin={this.onChangeValorMinimo}
          filtrarMax={this.onChangeValorMaximo}
          buscarProduto={this.onChangeBusca}
        />
        <div>
          <Header>
          <Cabecalho>
          <ImagemCabecalho src={imgCabecalho} alt={"Cabeçalho"}/>
        </Cabecalho>
            {/* <p>Quantidade de Produtos : {listaProdutos.length}</p> */}
            <Select
              value={this.state.ordenacao}
              onChange={this.alteraOrdenacao}
            >
              <option value="crescente"> Preço: Crescente </option>
              <option value="decrescente"> Preço: Decrescente </option>
            </Select>
          </Header>
          <ContainerProdutos> {listaProdutos} </ContainerProdutos>
        </div>
        <CarrinhoCompras>
          <h2>Carrinho</h2>
          {listaCarrinho}
          <p>
            Total:{" "}
            {this.state.carrinho.reduce(
              (acumulador, objeto) =>
                acumulador + objeto.quantidade * objeto.valor,
              0
            )}
          </p>
        </CarrinhoCompras>

        <Rodape>
          <TextoRodape>Eu sou o footer</TextoRodape>
        </Rodape>
      </Container>
    );
  }
}

export default App;