# Freela Calculator

Dashboard de projetos freelancer, contando com uma calculadora de horas trabalhadas dos projetos (Jobs) permitindo que o usuário que registrar consiga gerenciá-los. Um usuário poderá cadastrar, editar ou excluir jobs disponíveis em seu dashboard, assim como alterar dados cadastrais ou até mesmo inativar a conta de seu perfil.


## Diagrama de classe
![Diagrama de classe drawio (2)](https://user-images.githubusercontent.com/35710766/187093068-76653db6-dbc6-4e55-b4a3-46b162493df7.png)

## Requisitos funcionais
**Cadastro de usuários (perfil)**

- [x] Criar um serviço que consome API de consulta de CEP para buscar o endereço

- [x] Deve ser possível cadastrar usuário com o valor das horas calculado com base na proporção entre a estimativa de quanto deseja ganhar por mês, número de dias             trabalhados por semana, horas trabalhadas por dia menos as férias

- [x] Edição do perfil do usuário

- [x] Inativação do usuário

- [x] Autenticação do usuário

**Cadastro de jobs (projetos)**
- [x] Usuário deve estar autenticado para cadastrar um job

- [x] Cadastro do job

- [x] Edição do job

- [x] Exclusão do job

**Dashboard de jobs por usuário**

- [ ] Listagem de jobs por usuário com cálculo do valor líquido (valor das horas dedicadas proporcionais ao total de horas estimadas do job) e a contagem
      das horas restantes para vencimento do job (nº de horas dedicadas por dia - total de horas estimadas do job com status em progresso)
      
## Requisitos não funcionais
- [x] O token deve ter duração de 1 hora
- [x] Criação de middlewares de erros
- [x] Criação de middlewares para validação de DTOs
- [x] Criação de DTOs como modelo de saída em vez de utilizar entidades nos controllers
- [x] Persistência de dados com MongoDB


## Executando o projeto

1. Baixe o repositório
```sh
git clone https://github.com/VictorMello1993/FreelaCalculator.git
```

2. Abra a IDE e instale as dependências do projeto
```
#yarn
yarn add

#npm
npm install
```

3. Abra o servidor executando o seguinte comando:

```
#yarn
yarn dev

#npm
npm run dev
```

## Variáveis de ambiente

Criar as seguintes variáveis de ambiente na raíz do projeto:
```sh
PORT=porta_api
API_URL=url_api
SECRET_KEY=sua_chave_secreta
MONGO_DB_USER=seu_usuario
MONGO_DB_PASSWORD=sua_senha
MONGO_DB_DATABASE=nome_base_dados
MONGO_DB_PORT_LOCAL=porta_comunicacao_local_container_docker (ex: 27019)
MONGO_DB_URL=string_conexao_mongodb (ex: mongodb://localhost:<sua_porta_local>/?authMechanism=DEFAULT)
```

As variáveis do MongoDB são executadas em um container da imagem Docker do MongoDB. Para isso, com arquivo ``docker-compose`` disponível na raíz do projeto, basta executar o comando abaixo:
```sh
docker-compose up -d
```

Após isso, utilize um software cliente de banco de dados que permita a conexão com MongoDB e preencha as credenciais necessárias de acordo com as variáveis de ambiente citadas acima.

## Bibliotecas utilizadas
* <a href="https://nodejs.org/en/">Node.js</a>
* <a href="https://www.npmjs.com/package/ts-node-dev">ts-node-dev</a>
* <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>
* <a href="https://www.npmjs.com/package/express">Express</a>
* <a href="https://www.npmjs.com/package/bcryptjs">bcryptjs</a>
* <a href="https://www.npmjs.com/package/dotenv">dotenv</a>
* <a href="https://www.npmjs.com/package/uuid">uuid</a>
* <a href="https://www.npmjs.com/package/typescript">Typescript</a>
* <a href="https://www.npmjs.com/package/eslint">eslint</a>
* <a href="https://www.npmjs.com/package/prettier">Prettier</a>
* <a href="https://www.npmjs.com/package/inversify">Inversify</a>
* <a href="https://www.npmjs.com/package/class-validator">class-validator</a>
* <a href="https://www.npmjs.com/package/class-transformer">class-transformer</a>
* <a href="https://www.npmjs.com/package/reflect-metadata">reflect-metadata</a>
* <a href="https://www.npmjs.com/package/viacep">viacep</a>
* <a href="https://mongoosejs.com/">Mongoose</a>

## Endpoints para importar

### Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=freela-calculator-api&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2Ff46baf3530e5dedb37e2df4b637b1e4b%2Fraw%2F21f5fe1cc672bbce17e5eae1aa87d5470293bc17%2FInsomnia_2022-09-25.json)

### Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/897d8f47ac6dbb691fe9?action=collection%2Fimport)


