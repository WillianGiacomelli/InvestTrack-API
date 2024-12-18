
# InvestTrack API

Este projeto é uma API para gerenciar investimentos, transações e usuários. A API foi desenvolvida usando Node.js, Prisma ORM e MySQL.
A apresentação dos dados pode ser vista na camada de visualização que está no seguinte repositório:

```bash
https://github.com/WillianGiacomelli/InvestTrack-WebUI
```


## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Prisma**: ORM para interagir com o banco de dados.
- **MySQL**: Banco de dados relacional.
- **Express**: Framework para construir a API REST.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## Requisitos

- **Node.js** instalado. (Versão recomendada: 18.x ou superior)
- **MySQL** instalado e rodando.
- **Prisma** instalado globalmente (ou use o `npx`).

## Passos para Configuração e Execução

### 1. Clonar o Repositório

Clone o repositório em sua máquina local:

```bash
git clone https://github.com/WillianGiacomelli/InvestTrack-API
cd InvestTrack
```

### 2. Instalar Dependências

Instale as dependências do projeto:

```bash
npm install
```

Isso irá instalar todas as bibliotecas necessárias, incluindo o Prisma e o Express.

### 3. Configurar o Banco de Dados

#### Criar o Banco de Dados no MySQL


#### Configurar Variáveis de Ambiente

Edite o arquivo `.env-example` na raiz do projeto e configure suas variáveis de ambiente. Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/investtrack"
```

Substitua `usuario` e `senha` pelos valores corretos de acesso ao seu banco de dados MySQL.

### 4. Gerar o Prisma Client

Regenerar o Prisma Client para refletir as alterações no schema (modelos de dados):

```bash
npx prisma generate
```

### 5. Rodar as Migrations

Para aplicar as migrações e criar as tabelas no banco de dados, execute:

```bash
npx prisma migrate dev --name init
```

Isso irá aplicar todas as migrações e sincronizar o banco de dados com o seu esquema.

### 6. Rodar a API

Inicie o servidor da API:

```bash
npm start
```

Ou, se você estiver usando o `nodemon` para desenvolvimento, pode rodar:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### 7. Testar a API

Você pode testar a API com ferramentas como **Postman** ou **Insomnia**, fazendo chamadas HTTP aos endpoints disponíveis.

## Comandos Úteis

- **Gerar Prisma Client**: Regenera o Prisma Client após alterações no schema.

```bash
npx prisma generate
```

- **Rodar Migrations**: Aplica migrações no banco de dados.

```bash
npx prisma migrate dev --name <nome-da-migracao>
```

- **Acessar o Banco de Dados com Prisma Studio**: Interface gráfica para visualizar dados.

```bash
npx prisma studio
```

## Estrutura de Diretórios

A estrutura do projeto segue o padrão comum para uma API em Node.js com Prisma.

```
InvestTrack/
│
├── prisma/
│   ├── schema.prisma     # Esquema do Prisma (modelos de dados)
│   └── migrations/        # Migrações do Prisma
│
├── src/                   # Código fonte da aplicação
│   ├── controllers/       # Controladores da API
│   ├── services/          # Lógica de negócios
│   ├── routes/            # Definição das rotas
│   └── app.ts             # Arquivo principal da aplicação
│
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Este arquivo
```

## Contribuindo

1. Faça o **fork** do repositório.
2. Crie uma nova **branch** (`git checkout -b feature/alguma-coisa`).
3. Faça suas alterações e **commite** (`git commit -am 'Adicionando uma nova feature'`).
4. **Push** para sua branch (`git push origin feature/alguma-coisa`).
5. Abra um **pull request**.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
