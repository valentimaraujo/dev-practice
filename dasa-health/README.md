### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), Acesso a um Banco de Dados[(Mysql/Postegres/Outros)](https://pt.wikipedia.org/wiki/Lista_de_bancos_de_dados). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/valentimaraujo/dasa-health.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd dasa-health

# Instale as dependências
$ npm install

# Copie o arquivo .env.example e cole com o nome .env
$ cp .env.exemple .env

# Configure o arquivo .env com os dados da sua conexão de bando de dados

# Criando as tabelas e usuário principal de acesso(e-mail: dasa-health@dasahealth.com senha: secret)
$ npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
# A documentação dos endpoits inciará em <http://localhost:3000/api-docs>

```
Para facilitar nos teste, existe um aquivo json chamado `dasa-health-insomnia-endpoints.json` na raíz do projeto que contem todos os endpoints de testes, ele é uma arquivo que pode ser importado e usado no programa [Insomnia](https://insomnia.rest/download/).
