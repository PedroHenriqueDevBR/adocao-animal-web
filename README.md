<h1 align="center">:dog: Adoção de animais :cat:</h1>

<p align="center">
Este projeto está sendo desenvolvido para a disciplina de projeto integrador, ministrada por Ely da Silva Miranda no Instituto Federal do Piauí (Campus Central).
</p>

<p align="center">
<img alt="Developer" src="https://img.shields.io/badge/Developer-PedroHenriqueDevBR-green">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/pedrohenriquedevbr/carteira-de-vacinacao-animal">
<img alt="Front-emd" src="https://img.shields.io/badge/Frontend-Flutter-blue">
<img alt="Back-end" src="https://img.shields.io/badge/Backend-Django-green">
</p>

# :memo: Visão Geral

Aplicação desenvovida servir de apoio e facilidade na adoção de animais.


 * <strong><a href="#description">Descrição completa do sistema</a></strong>
 * <strong><a href="#tecnologias">Tecnologias utilizadas</a></strong>
 * <strong><a href="#modelagem">Modelagem da aplicação</a></strong>
    * <strong><a href="#modelagem-classes">Modelagem das classes</a></strong>
    * <strong><a href="#modelagem-mapa-aplicacao">Mapa da aplicação</a></strong>
 * <strong><a href="#requisitos">Pré-requisitos</a></strong>
 * <strong><a href="#instalacao">Instalação</a></strong>
 * <strong><a href="#funcionalidades">Funcionalidades</a></strong>
 * <strong><a href="#screenshots">Screenshots</a></strong>

<h1 id="description">:smile: Descrição</h1>

**Trata-se do desenvolvimento de uma aplicação para facilitar a comunicação entre quem possui um animal para adoção com quem deseja adotar.**

Essa aplicação possui o intuito de ser bem simples de ser utlizada pelas pessoas, para que o processo de adoção do animal seja o mais simples possível, mas temos algumas regras que devem ser seguidas para que alguém possa publicar um animal ou para que alguém possa adotar um animal.

**Regras para quem deseja publicar um animal para adoção:**
 * Primeiramente a pessoa deve estar logada, caso contrário deve-se criar um perfil;
 * A pessoa precisa fornecer os dados de contato;
Não pode ter dois ou mais bloqueios de publicações;
 * Tem a obrigação de escolher o melhor destino (solicitante da adoção) para o animal.

**Regras para quem deseja adotar um animal:**
 * Primeiramente a pessoa deve estar logada, caso contrário deve-se criar um perfil;
 * A pessoa precisa fornecer os dados de contato;
 * Precisa fazer o pedido de adoção ao dono do animal.

O sistema deve possuir um sistema de controle de publicações onde haverá os usuários moderadores e os administradores, cada um desses terão poderes diferentes dentro do sistema.

**Poderes do moderador:**
 * Pode modificar descrições de postagens de outras pessoas;
 * Pode bloquear uma postagem (Nesse caso o moderador deverá explicar o motivo e se for falsa comunicação o moderador perderá o poder);
 * O moderador pode desbloquear postagens de outras pessoas.

**Poderes do administrador:**
O administrador possui todos os poderes do moderador, o mais seguro é haver apenas um administrador, que será o responsável por todos os moderadores, o único poder que o administrador tem a mais do que o moderador é a capacidade de tirar o poder de moderador.

"*Os bloqueios são essenciais para o sistema para garantir que ninguém irá utilizar a plataforma para publicações fora de contexto, portanto, se dois bloqueios forem aplicados em um perfil o mesmo será bloqueado.*"


<br>

<h1 id="tecnologias">:rocket: Tecnologias utilizadas</h1>

<br>

* <img alt="Dart" src="https://img.shields.io/badge/-Dart-blue"> - Linguagem de programação utilizada no desenvolvimento Front-end.
* <img alt="Flutter" src="https://img.shields.io/badge/-Flutter-blue"> - Framework utilizado no desenvolvimento da aplicação mobile.
* <img alt="Python" src="https://img.shields.io/badge/-Python-green"> - Linguagem de programação utilizada no desenvolvimento Back-end.
* <img alt="Python" src="https://img.shields.io/badge/-Django-green"> - Framework utilizado no desenvolvimento da REST API.
* <img alt="DRF" src="https://img.shields.io/badge/-DRF-red"> - Toolkit utilizado junto do Django para facilitar a criação da REST API.

<h1 id="modelagem">:bulb: Modelagem da aplicação</h1>

Esta seção irá mostrar como a aplicação foi modelada para que pudesse atender todas as necessidades propostas da descrição do desafio.

A modelagem foi criada antes de iniciar o desenvolvimento da aplicação, com o objetivo de guiar o desenvolvimento e evitar erros que pudessem atrapalhar o andamento do desenvolvimento.

<h2 id="modelagem-classes">Modelagem do banco de dados</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais/main/docs/assets/database.png" />

<h2 id="modelagem-mapa-aplicacao">Pŕototipo da aplicação</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais/main/docs/assets/hight-quality-prototype-web.png" />

<h2 id="modelagem-mapa-aplicacao">Protótipo versão mobile</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais/main/docs/assets/hight-quality-prototype-mobile.png" />

### Descrição das páginas

* **Login** - A página de login é a primeira página apresentada na aplicação, a função dessa página é controlar o acesso ao resto da aplicação.

<h1 id="requisitos">:warning: Pré-requisitos</h1>

O desenvolvimento dessa aplicação utiliza como base as seguintes tecnologias e versões apresentadas abaixo. Caso ocorra algum erro na execução da aplicação ou mesmo nos comandos de configurações, verifique se a versão do Dart e do Flutter no seu computador estão devidamente atualizados.

1. Dart 2.12.0 ou superior
2. Flutter 2.2.0 ou superior
3. Python 3.6 ou superior
4. Django 3.2.6 ou superior
5. git version 2.17.1

<h1 id="instalacao">:information_source: Instalação</h1>

```bash
```

<h2 id="funcionalidades">:heavy_check_mark: Funcionalidades</h2>

- [ ] Registro de usuário;
- [ ] Adicionar o imagem ao perfil no usuário logado;
- [ ] Adicionar o contato ao perfil no usuário logado;
- [ ] Registrar animal para adoção;
- [ ] Adicionar imagem do animal;
- [ ] Adicionar vacina ao cartão de vacina do animal;
- [ ] Apresentar histórico de vacinação do animal;
- [ ] Apresentar todos os animais disponíveis para adoção;
- [ ] Apresentar todos os animais disponíveis para adoção da cidade do usuário;
- [ ] Apresentar os meus animais disponíveis para adoção ou adotados;
- [ ] Solicitar adoção de um animal;
- [ ] Apresentar todos os pedidos de adoção;
- [ ] Confirmar ou negar pedido de adoção;
- [ ] Buscar animal de acordo com o código;
- [ ] Apresentar todos os usuários cadastrados;
- [ ] Adicionar ou remover permissão de moderador de um usuário;
- [ ] O moderador bloqueia uma postagem e informar o motivo do bloqueio;
- [ ] O administrador bloqueia uma postagem ou um usuário;
