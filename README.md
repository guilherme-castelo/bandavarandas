# Banda Varandas Portfolio

Projeto com arquitetura monolítica simples utilizando Node.js, Express e JSON Server.
Todo o conteúdo do site é carregado dinamicamente a partir do arquivo `db.json`.

## Estrutura do Projeto

-   **`public/`**: Contém os arquivos estáticos (HTML, CSS, JS, Imagens).
-   **`server/`**: Contém o servidor Express (`app.js`).
-   **`db.json`**: Banco de dados centralizado com textos, links e informações do site.
-   **`package.json`**: Dependências e scripts do projeto.

## Como Rodar

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Iniciar o servidor**:
    ```bash
    npm start
    ```

3.  **Acessar o projeto**:
    Abra o navegador em `http://localhost:3000`.

## Como Editar o Conteúdo

Para alterar textos, adicionar fotos na galeria ou novos membros na equipe, basta editar o arquivo `db.json`. O site atualizará automaticamente (pode ser necessário reiniciar o servidor se o `json-server` não estiver em modo *watch* ou dar um refresh na página).

## Desenvolvimento

Para rodar em modo de desenvolvimento (com reinicialização automática):
```bash
npm run dev
```
(Requer `nodemon` instalado globalmente ou como devDependency).
