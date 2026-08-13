import { Component, OnInit } from '@angular/core';
import { Api } from '../../service/api';

@Component({
  selector: 'app-produto',
  imports: [],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto implements OnInit{
  //atributos
  produtos: any[] = []; //lista com os produtos
  termoBusca: string = ""; // termo para fazer a busca SSR 
  produtoAtual = {nome: "", descricao: "", estoqueMinimo: null} // refere-se aos campos do formulário

  constructor(private api:Api){}

  //carregar a lista de produtos
  carregar(){
    this.api.getProdutos().subscribe(res => this.produtos = res); //preenchendo o vetor de produtos com a api
  }

  //busca produtos pelo termo
  buscar(){ //SSR => renderização ao lado do servidor
    this.api.buscarProdutos(this.termoBusca).subscribe(res => this.produtos = res);
  }

  //busca produtos pelo termo => CSR Cliente Side Render
  buscar2(){
    let produtosFiltrados: any[] = [];
    produtosFiltrados = this.produtos.filter((e)=>e.contains(this.termoBusca));
    this.produtos = produtosFiltrados;
  }

  //salvar produto na api
  salvar(){
    this.api.postProduto(this.produtoAtual).subscribe(
      ()=>{
        alert("Produto Cadastrado com Sucesso");
        this.produtoAtual = {nome:"", descricao:"",estoqueMinimo:null};
        this.carregar();
      }
    );
  }

  //excluir produto d API
  excluir(id:number){
    if(confirm("Tem Certeza?")){
      this.api.deleteProduto(id).subscribe(()=>this.carregar());
    }
  }

  //método ao iniciar
  ngOnInit(){
    this.carregar();
  }
}
