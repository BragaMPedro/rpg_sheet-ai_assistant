# Vozes da Minha Cabeça - Ficha de Personagem Interativa

Uma ficha de personagem digital, interativa e automatizada para o RPG de mesa "Vozes da Minha Cabeça 2ª Edição". O objetivo é simplificar a criação e o gerenciamento de personagens, permitindo que os jogadores se concentrem na história. A ficha se atualiza dinamicamente com base na classe e no nível do personagem, além de contar com uma assistente de IA integrada para tirar dúvidas sobre as regras.

## Tabela de Conteúdos
1. [Sobre o Projeto](#sobre-o-projeto)
	* [Funcionalidades](#funcionalidades)
	* [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Iniciando o Projeto](#iniciando-o-projeto)
	* [Pré-requisitos](#pré-requisitos)
	* [Instalação](#instalação)
3. [Uso](#uso)
4. [Contribuidores](#contribuidores)
5. [Contato](#contato)

---

## Sobre o Projeto

Este projeto é uma ferramenta criada para aprimorar a experiência de jogo do RPG "Vozes da Minha Cabeça". Ele oferece uma interface limpa e reativa que automatiza muitos dos cálculos e verificações manuais de uma ficha de papel tradicional.

### Funcionalidades

-   **Criação Dinâmica:** Crie e gerencie seu personagem de forma fluida e intuitiva.
-   **Cálculos Automáticos:** O número de perícias, bônus de proficiência e habilidades são atualizados automaticamente com base na classe e nível.
-   **Rastreador de Condições:** Controle facilmente os níveis de Sangramento, Exaustão, Desespero, etc., com descrições claras dos efeitos de cada nível.
-   **Gerenciamento de Equipamentos:** Mantenha um registro organizado de armas, equipamentos de perícia e itens diversos.
-   **Salvar e Carregar:** Guarde sua ficha diretamente no navegador usando a funcionalidade de *Local Storage*, permitindo continuar sua aventura a qualquer momento.
-   **Assistente com IA (Hema):** Integrada com a API do Google Gemini, a assistente Hema pode responder perguntas sobre as regras do jogo, habilidades de classe ou detalhes da sua ficha.
-   **Design Responsivo:** A ficha é totalmente funcional em desktops, tablets e dispositivos móveis.

### Tecnologias Utilizadas

-   **[React](https://react.dev/)**: Biblioteca principal para a construção da interface do usuário.
-   **[TypeScript](https://www.typescriptlang.org/)**: Para adicionar tipagem estática e robustez ao código.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS para estilização rápida e responsiva.
-   **[Google Gemini API](https://ai.google.dev/)**: Potencializa a assistente de regras Hema.

---

## Iniciando o Projeto

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

-   Um navegador de internet moderno (Chrome, Firefox, Edge, etc.).
-   Uma chave de API (API Key) do **[Google AI Studio](https://aistudio.google.com/app/apikey)** para que a assistente Hema funcione.
-   [Node.js](https://nodejs.org/)

### Instalação

1.  Clone ou baixe os arquivos deste repositório.

2. Instale as dependências:
    ```bash
   `npm install`
   ```
    
3.  **Configurando a API Key**:
    A aplicação está configurada para ler a chave da API do Google Gemini da variável de ambiente `process.env.API_KEY`. Para que a assistente de IA funcione, você deve garantir que esta variável seja injetada no ambiente de execução. Se você for hospedar esta aplicação, a plataforma de hospedagem (como Vercel, Netlify, etc.) deve ter a variável de ambiente `API_KEY` configurada. Para testes locais, ferramentas como o Vite podem gerenciar isso através de arquivos `.env`.

4. Run the app:
   ```bash
      `npm run dev`
   ```
   Isso iniciará um servidor local. Você poderá acessar a aplicação no endereço fornecido (geralmente `http://localhost:3000`).

---

## Uso

1.  Abra o arquivo `index.html` em seu navegador ou acesse o link da aplicação hospedada.
2.  **Informações Básicas**: Preencha o nome do seu personagem, nível e adicione uma URL para a imagem de retrato.
3.  **Classe e Atributos**: Selecione a Classe Sanguínea e distribua seus pontos de Atributo. A ficha irá se ajustar automaticamente.
4.  **Perícias e Equipamentos**: Adicione suas perícias e os equipamentos correspondentes.
5.  **Condições**: Use os botões `+` e `-` para controlar o nível das suas Condições. Um aviso será exibido se o personagem morrer.
6.  **Salvar/Carregar**: Use os botões "Salvar Ficha" e "Carregar Ficha" para guardar e recuperar seu progresso.
7.  **Assistente Hema**: Clique no ícone de cérebro no canto inferior direito para abrir a assistente e fazer perguntas sobre as regras do jogo ou sobre sua ficha atual.

---

## Contribuidores:
<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/pedrobragaresume/">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/111090976?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Pedro Braga</b></sub>
      </a>
      <br />
       <br />
      <a href="https://www.linkedin.com/in/pedrobragaresume/" title="LindedIn">
        <img src="https://img.shields.io/badge/-Pedro-blue?style=flat-square&logo=Linkedin&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## Contato
[Link para o repositório do GitHub](https://github.com/BragaMPedro/Dnd-check-logger)
Pedro Braga Magalhães - [pedrobmagalhaes95@gmai.com](mailto:pedrobmagalhaes95@gmail.com)



