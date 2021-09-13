<h1 align="center">Back-end da aplicação - Adoção de animais</h1>

<p align="center">Abaixo há mais informações sobre o desenvolvimento da aplicação, informações sobre o status do desenvolvimento, tecnologias utilizadas e endpoints disponíveis e as regras de cada endpoint.</p>

## Tecnologias utilizadas

* <img alt="Python" src="https://img.shields.io/badge/-Python-green"> - Linguagem de programação utilizada no desenvolvimento Back-end.
* <img alt="Python" src="https://img.shields.io/badge/-Django-green"> - Framework utilizado no desenvolvimento da REST API.
* <img alt="DRF" src="https://img.shields.io/badge/-DRF-red"> - Toolkit utilizado junto do Django para facilitar a criação da REST API.


## executar o back-end no seu computador

```bash
# Preparação inicial (Ambiente virtual e requiremetns)

# Migrando as informações do Django para o banco de dados

# Executando a aplicação em sí
```

## Endpoints

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">nome</th>
    <th class="tg-0pky">endpoint</th>
    <th class="tg-0pky">type</th>
    <th class="tg-0pky">descrição</th>
    <th class="tg-0pky">Status retorno</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">login</td>
    <td class="tg-0pky">/api/token</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">Login do usuário cadastrado na aplicação</td>
    <td class="tg-0pky">200,403</td>
  </tr>
  <tr>
    <td class="tg-0pky">novo usuário</td>
    <td class="tg-0pky">/api/user/register</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">Registra novo usuário no sistema</td>
    <td class="tg-0pky">A definir</td>
  </tr>
  <tr>
    <td class="tg-0pky">Atualiza usuário</td>
    <td class="tg-0pky">/api/user/update</td>
    <td class="tg-0pky">POST</td>
    <td class="tg-0pky">Atualiza os dados do usuário se o mesmo estiver logado</td>
    <td class="tg-0pky">A definir</td>
  </tr>
</tbody>
</table>