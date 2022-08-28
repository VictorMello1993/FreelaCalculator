# Freela Calculator


## Diagrama de classe
![Diagrama de classe](https://user-images.githubusercontent.com/35710766/185277364-12128f49-76cf-4b1d-bb06-61c5106f2b13.jpg)


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



