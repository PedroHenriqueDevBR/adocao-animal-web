<h1 align="center">:dog: Adoção de animais :cat:</h1>

<p align="center">
Este projeto está sendo desenvolvido para a disciplina de projeto integrador, ministrada por Ely da Silva Miranda no Instituto Federal do Piauí (Campus Central).
</p>

<p align="center">
<img alt="Developer" src="https://img.shields.io/badge/Developer-PedroHenriqueDevBR-green">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/pedrohenriquedevbr/carteira-de-vacinacao-animal">
<img alt="Front-emd" src="https://img.shields.io/badge/Frontend-Angular-blue">
<img alt="Back-end" src="https://img.shields.io/badge/Backend-Django-green">
</p>

# :memo: Visão Geral

Aplicação desenvovida para ser um facilitador na adoção de animais.


 * <strong><a href="#description">Descrição completa do sistema</a></strong>
 * <strong><a href="#tecnologias">Tecnologias utilizadas</a></strong>
 * <strong><a href="#modelagem">Modelagem da aplicação</a></strong>
    * <strong><a href="#modelagem-classes">Modelagem das classes</a></strong>
    * <strong><a href="#modelagem-mapa-aplicacao">Mapa da aplicação</a></strong>
 * <strong><a href="#requisitos">Pré-requisitos</a></strong>
 * <strong><a href="#instalacao">Instalação</a></strong>
 * <strong><a href="#funcionalidades">Funcionalidades</a></strong>
 * <strong><a href="#screenshots">Screenshots</a></strong>

<h1 id="description">:speech_balloon: Descrição</h1>

**Trata-se do desenvolvimento de uma aplicação para facilitar a comunicação entre quem possui um animal para adoção com quem deseja adotar.**

Essa aplicação possui o intuito de ser de simples de utilização pelas pessoas para que o processo de adoção de um animal seja o mais simples possível. Há algumas regras que devem ser seguidas para que alguém possa publicar um animal ou para que alguém possa adotar um animal.

**Regras para quem deseja publicar um animal para adoção:**
 * Primeiramente a pessoa deve estar logada, caso contrário deve-se criar um perfil;
 * A pessoa precisa fornecer os dados de contato;
Não pode ter dois ou mais bloqueios de publicações;
 * Tem a obrigação de escolher o melhor destino (solicitante da adoção) para o animal.

**Regras para quem deseja adotar um animal:**
 * Primeiramente a pessoa deve estar logada, caso contrário deve-se criar um perfil;
 * A pessoa precisa fornecer os dados de contato;
 * Precisa fazer o pedido de adoção ao dono do animal.

O sistema deve possuir alguma forma de controle de publicações onde haverá os usuários moderadores e os administradores, cada um desses terão poderes diferentes dentro do sistema.

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

* <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-blue"> - Linguagem de programação utilizada no desenvolvimento Front-end.
* <img alt="Angular" src="https://img.shields.io/badge/-Angular-blue"> - Framework utilizado no desenvolvimento da aplicação fton-end.
* <img alt="Python" src="https://img.shields.io/badge/-Python-green"> - Linguagem de programação utilizada no desenvolvimento Back-end.
* <img alt="Django" src="https://img.shields.io/badge/-Django-green"> - Framework utilizado no desenvolvimento da REST API.
* <img alt="DRF" src="https://img.shields.io/badge/-DRF-red"> - Toolkit utilizado junto do Django para facilitar a criação da REST API.

<h1 id="modelagem">:bulb: Modelagem da aplicação</h1>

Esta seção irá mostrar como a aplicação foi modelada para que pudesse atender todas as necessidades propostas da descrição do desafio.

A modelagem foi criada antes de iniciar o desenvolvimento da aplicação, com o objetivo de guiar o desenvolvimento e evitar erros que pudessem atrapalhar o andamento do desenvolvimento.

<h2 id="modelagem-classes">Modelagem do banco de dados</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais/main/docs/assets/database.png" />

<h2 id="modelagem-mapa-aplicacao">Pŕototipo da aplicação</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais/main/docs/assets/hight-quality-prototype-web.png" />

<h1 id="requisitos">:warning: Pré-requisitos</h1>

O desenvolvimento dessa aplicação utiliza como base as seguintes tecnologias e versões apresentadas abaixo.

1. Node: 14.17.6
2. Angular CLI: 12.2.5
3. Python 3.6 ou superior
4. Django 3.2.6 ou superior
5. git version 2.17.1

<h1 id="instalacao">:information_source: Instalação</h1>

```bash
# Baixe o repositório do projeto
git clone https://github.com/PedroHenriqueDevBR/aplicacao-para-adocao-de-animais.git
cd aplicacao-para-adocao-de-animais/

# ================== Django ===================== #
# Instale as dependencias do Django
cd backend/animal_adoption/

# Crie um ambiente virtual para instalar os pacotes do pip de forma isolada
pip3 install virtualenv
python3 -m virtualenv venv

# Ative o ambiente virtual
source venv/bin/activate

# Instale as dependências do projeto backend
pip install -r requirements.txt

# Aplique as migrações no banco de dados
python manage.py makemigrations
python manage.py migrate

# Rode o projeto localmente
python manage.py runserver

# =================== Angular ==================== #
# Instale as dependências do Angular
cd ../../frontend/animal-adoption-frontend/

# Instale as dependências do projeto frontend
npm install

# Rode a aplicação Angular (Frontend)
npm run start
```

<h2 id="funcionalidades">:heavy_check_mark: Funcionalidades</h2>

- [X] Sprint 01 (Contas e localizações)
   - [X] Registro de usuário;
   - [X] Login de usuário;
   - [X] Adicionar o imagem ao perfil no usuário logado;
   - [X] Remover imagem do perfil logado
   - [X] Atualizar dados do perfil logado;
   - [X] Criar estado;
   - [X] Editar estado;
   - [X] Remover estado;
   - [X] Criar cidade e vincular a um estado;
   - [X] Editar cidade;
   - [X] Remover cidade;
   - [X] Adicionar poder de moderador a um determinado perfil (admin only);
   - [X] Remover poder de moderador a um determinado perfil (admin only);
   - [X] Bloquear um determinado perfil (admin only).
- [X] Sprint 02 (Animal e metadados)
   - [X] Registrar animal;
   - [X] Editar dados do animal;
   - [X] remover animal;
   - [X] Adicionar imagem do animal;
   - [X] Adicionar vacina ao cartão de vacina do animal;
   - [X] Apresentar histórico de vacinação do animal;
   - [X] Apresentar todos os animais disponíveis para adoção da cidade do usuário logado;
   - [X] Apresentar os meus animais;
   - [X] Apresentar os animais da minha localdiade no mapa
   - [X] Selecionar um animal e mostrar a localização dele
   - [X] Filtrar animais
- [X] Sprint 03 (Adoção e controle de moderadores)
   - [X] Solicitar adoção de um animal;
   - [X] Apresentar todos os pedidos de adoção;
   - [X] Confirmar ou negar pedido de adoção;
   - [X] Buscar animal de acordo com o código;
- [ ] Sprint 04 (Patrocinadores)
   - [ ] registrar patrocinado
   - [ ] Listar patrocinadores na home page

