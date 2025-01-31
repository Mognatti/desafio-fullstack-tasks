# TaskManager

Olá, seja bem vindo ao meu gerenciador de tarefas diárias! A aplicação não foi para deploy, mas você pode ver um vídeo de como ela ficou em vídeo [clicando aqui!](https://drive.google.com/file/d/1VgaD4EcgxwAYuVUcB3IRZjfmgVisVwar/view?usp=drive_link)

## Requisitos de Back-end

| Funcionalidade        | Descrição                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Criar Tarefas**     | Permitir a criação de tarefas com título (obrigatório), descrição (opcional), status (pendente ou concluída) e data de criação automática. |
| **Atualizar Tarefas** | Editar título, descrição e status de uma tarefa existente.                                                                                 |
| **Excluir Tarefas**   | Remover tarefas do sistema.                                                                                                                |
| **Listar Tarefas**    | Retornar todas as tarefas em ordem decrescente de criação.                                                                                 |

- A API foi feita utilizando o princípio de separação de responsabilidades, criando-se diferentes scripts para cada contexto da aplicação: **route**, **controller** e **service**.

- Primeiramente eu criei um banco de dados PostgreSQL na minha máquina;

- Depois disso, conectei o banco de dados ao meu código backend utilizando o Prisma. Dessa forma todos os dados alterados pela aplicação através de sua API, alteram os dados no banco de dados.
- Todas as funcionalidades foram implementadas através da API da aplicação, que entrega os resultados da requisição em endpoints semânticos, que facilitam a manutenção e a previsibilidade do código.

## Realizações Extras - Backend

| Funcionalidade                           | Descrição                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Autenticação do Usuário**              | Implementação do processo de login com validação de email e senha no banco de dados. A senha é salva de forma criptografada para maior segurança. Um token é gerado após o login e armazenado no `localStorage` para ser enviado nas requisições subsequentes para autenticação. |
| **Cadastro de Usuário**                  | Funcionalidade de cadastro de usuário com validação dos dados e armazenamento do token de autenticação após o registro.                                                                                                                                                          |
| **Usuário Padrão**                       | Caso o usuário não queria se cadastrar, ele pode usar um usuário genérico e isso é demonstrado na tela. os dados são: login:**user@email.com** e senha: **1234**                                                                                                                 |
| **Armazenamento de Tarefas por Usuário** | Cada usuário tem acesso somente a sua própria lista de tarefas e pode editá-la como quiser. Caso tente editar uma tarefa de outro usuário, ele não irá conseguir, pois é feito uma verificação de autorização.                                                                   |

## Funcionalidades do Front-End

| Funcionalidade          | Descrição                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Listagem de Tarefas** | Exibir todas as tarefas com título, descrição, status e data de criação.       |
| **Adicionar Tarefa**    | Um formulário para adicionar novas tarefas (apenas título obrigatório).        |
| **Editar Tarefa**       | Permitir a edição do título, descrição e status de uma tarefa.                 |
| **Excluir Tarefa**      | Um botão para excluir tarefas.                                                 |
| **Filtro por Status**   | Filtros para mostrar apenas tarefas pendentes, concluídas ou todas. (opcional) |

## Realizações Extras

| Funcionalidade                 | Descrição                                                                                                                                                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lidando com a autenticação** | Devido a nova funcionalidade de login e registro de usuário, além da possibilidade de logout, foi criada uma tela de autenticação na aplicação e toda a lógica que a acompanha. Foi criado um componente para lidar com rotas públicas e privadas, protegendo aquelas que demandam um usuário logado! |
| **Styled Components**          | Para estilizar a aplicação eu optei pelo styled components e criei um estilo global, além de um tema para a mesma. Isso faz com que eu possa modificar todos os estlios da aplicação de um só lugar                                                                                                   |
| **Filtros por status**         | O requisito opcional de filtar as tarefas por status foi cumprido e está funcionando normalmente na aplicação!                                                                                                                                                                                        |

## Débitos Técnicos

| Problema                              | Descrição                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bug no Login**                      | O login apresenta um comportamento inesperado ao tentar fazer login com credenciais inválidas e depois recarregar a página. Esse erro é conhecido, mas devido à restrição de tempo, não foi possível resolvê-lo. É uma situação específica, mas é importante solucionar                                                                    |
| **Falta de Atrito**                   | No momento de excluir uma tarefa não há confirmação de ação, o que pode causar uma experiência de usuário não ideal. Uma confirmação de deleção seria o ideal, mas, novamente, a falta de tempo resultou na omissão dessa melhoria.                                                                                                        |
| **Padronização das Respostas da API** | A API não segue um formato padronizado em todas as respostas, embora tenha tentado manter. Idealmente, todas as respostas da API deveriam retornar um objeto com campos como `status`, `message`, `data`, etc., para melhorar a previsibilidade e manutenção. Isso foi deixado de lado devido ao curto prazo, acabei priorizando a entrega |
| **Organização do Código**             | O código do front-end pode ser melhor organizado em termos de separação de responsabilidades e adoção de princípios como DRY (Don't Repeat Yourself). Com mais tempo, seria possível melhorar a organização e estruturação dos componentes.                                                                                                |

# Documentação da API

_É possível que falte alguns detalhes na documentação, mas o código está diponível para análise_

Esta API fornece um conjunto de endpoints para gerenciar usuários, tarefas e autenticação. Ela é construída utilizando Express.js e usa um banco de dados PostgreSQL para armazenamento de dados.

## Endpoints

| **Endpoint**                         | **Descrição**                                           | **Corpo da Requisição**                                            | **Resposta**                                                         |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **POST /api/auth**                   | Autentica um usuário com e-mail e senha.                | - `email`: string<br>- `password`: string                          | - `token`: string (JWT token)<br>- `user`: objeto (dados do usuário) |
| **POST /api/auth/register**          | Registra um novo usuário.                               | - `name`: string<br>- `email`: string<br>- `password`: string      | - `token`: string (JWT token)<br>- `user`: objeto (dados do usuário) |
| **POST /api/user**                   | Cria um novo usuário.                                   | - `email`: string<br>- `name`: string<br>- `password`: string      | - `user`: objeto (dados do usuário)                                  |
| **GET /api/user**                    | Recupera uma lista de todos os usuários.                | Nenhum                                                             | - `users`: array (lista de objetos de usuário)                       |
| **GET /api/user/:id**                | Recupera um usuário único pelo ID.                      | Nenhum                                                             | - `user`: objeto (dados do usuário)                                  |
| **PUT /api/user/:id**                | Atualiza os dados de um usuário.                        | - `email`: string<br>- `name`: string<br>- `password`: string      | - `user`: objeto (dados atualizados do usuário)                      |
| **DELETE /api/user/:id**             | Deleta um usuário.                                      | Nenhum                                                             | - `message`: string (mensagem de sucesso)                            |
| **POST /api/task**                   | Cria uma nova tarefa.                                   | - `title`: string<br>- `description`: string<br>- `userId`: number | - `task`: objeto (dados da tarefa)                                   |
| **GET /api/task**                    | Recupera uma lista de todas as tarefas.                 | Nenhum                                                             | - `tasks`: array (lista de objetos de tarefa)                        |
| **GET /api/task/:userId**            | Recupera uma lista de tarefas de um usuário específico. | Nenhum                                                             | - `tasks`: array (lista de objetos de tarefa)                        |
| **PUT /api/task/:id**                | Atualiza os dados de uma tarefa.                        | - `title`: string<br>- `description`: string<br>- `status`: string | - `task`: objeto (dados atualizados da tarefa)                       |
| **DELETE /api/task/:userId/:taskId** | Deleta uma tarefa.                                      | Nenhum                                                             | - `message`: string (mensagem de sucesso)                            |

## Modelos

| **Modelo** | **Propriedades**                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **User**   | - `id`: number<br>- `email`: string<br>- `name`: string<br>- `password`: string                                                            |
| **Task**   | - `id`: number<br>- `title`: string<br>- `description`: string<br>- `userId`: number<br>- `status`: string (enum: "pendente", "concluida") |

## Tratamento de Erros

| **Erro**       | **Descrição**                                 |
| -------------- | --------------------------------------------- |
| **message**    | Mensagem descritiva sobre o erro.             |
| **statusCode** | Código de status HTTP correspondente ao erro. |

## Segurança

| **Segurança**             | **Descrição**                            |
| ------------------------- | ---------------------------------------- |
| **Criptografia de Senha** | As senhas são hashadas usando bcrypt-ts. |

## Notas

| **Nota**           | **Descrição**                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Banco de Dados** | Esta API usa um banco de dados PostgreSQL para armazenamento de dados e se conecta com o mesmo através do Prisma |
| **Tecnologia**     | A API é construída utilizando Express.js e TypeScript.                                                           |

_A aplicação utiliza variáveis de ambiente para funcionar de mandeira adequada, por isso, foi postado um .env.exmple para demonstar as possíveis configurações_

# Comandos Importantes do Prisma

| Comando                                           | Descrição                                               |
| ------------------------------------------------- | ------------------------------------------------------- |
| `npm i -D prisma @prisma/client`                  | Instala o Prisma no ambiente.                           |
| `npx prisma generate`                             | Gera o cliente do Prisma, criando os arquivos iniciais. |
| `npx prisma db pull`                              | Puxa os dados atuais do banco de dados conectado.       |
| `npx prisma migrate dev --name ${nome_do_commit}` | Faz o push dos dados do Prisma para o banco de dados.   |
