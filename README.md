# Freela Calculator

Dashboard de projetos freelancer, contando com uma calculadora de horas trabalhadas dos projetos (Jobs) permitindo que o usuário que registrar consiga gerenciá-los. Um usuário poderá cadastrar, editar ou excluir jobs disponíveis em seu dashboard, assim como alterar dados cadastrais ou até mesmo inativar a conta de seu perfil.

## Diagrama de classe
![Diagrama de classe drawio (2)](https://user-images.githubusercontent.com/35710766/187093068-76653db6-dbc6-4e55-b4a3-46b162493df7.png)

## Requisitos funcionais
**Cadastro de usuários (perfil)**

- [ ] Criar um serviço que consome API de consulta de CEP para buscar o endereço

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

## Endpoints para importar

### Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Freela%20Calculator%20API&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2Febcf8e061184c1001ece1e5cd82504f2%2Fraw%2F6949b3430fe417e767bd736920b9873bd798a8c5%2FInsomnia_2022-08-28.json)

### Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/bda7ea4ecb7982e767bb?action=collection%2Fimport)


