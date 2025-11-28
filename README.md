# 🚗 AutoTech Manager

> Sistema de Gestão de Manutenções Veiculares desenvolvido em C++ com modelagem UML completa.

## 📖 Sobre o Projeto

O **AutoTech Manager** é um software desktop projetado para modernizar o gerenciamento de oficinas mecânicas de pequeno e médio porte. O objetivo principal é substituir o uso de fichas de papel por um sistema digital robusto, capaz de centralizar cadastros e automatizar o cálculo de ordens de serviço.

Este projeto foi desenvolvido como parte da Avaliação da disciplina de **Modelagem de Software** do curso de Engenharia de Software.

### 🎯 Principais Funcionalidades

- **Gestão de Veículos:** Cadastro completo (Placa, Modelo, Marca, Ano) e histórico.
    
- **Gestão de Mecânicos:** Registro de profissionais e suas especialidades.
    
- **Ordens de Serviço (OS):** Criação e gerenciamento de manutenções.
    
- **Controle de Itens:** Adição dinâmica de peças e serviços em uma mesma OS.
    
- **Cálculo Automático:** O sistema soma valores de peças e mão de obra automaticamente.
    
- **Histórico:** Consulta rápida de manutenções anteriores por placa.
    

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C++ (Core da aplicação)
    
- **Modelagem:** UML (Casos de Uso, Classes, Sequência, Atividades, Estados)
    
- **Prototipação:** HTML5, CSS3 (TailwindCSS) e JavaScript
    
- **Ferramentas:** VS Code, Mermaid.js, Gamma App
    

## 🏗️ Estrutura do Projeto

O projeto foi dividido em duas grandes frentes: **Modelagem/Documentação** e **Implementação**.

### 1. Modelagem UML

A arquitetura do software foi planejada antes da codificação, utilizando diagramas UML para garantir a robustez do sistema.

- **Diagrama de Casos de Uso:** Mapeamento das interações entre Recepcionista, Mecânico e Gerente.
    
- **Diagrama de Classes:** Estrutura estática com uso de Herança (`Pessoa` -> `Mecanico`) e Composição (`Manutencao` -> `ItemServico`).
    
- **Diagramas Comportamentais:** Sequência, Atividades e Estados.
    

### 2. Código C++

A implementação reflete fielmente o diagrama de classes.

- Uso de **Classes Abstratas** e **Métodos Virtuais** para Polimorfismo.
    
- Uso de `std::vector` para gerenciamento dinâmico de listas.
    
- Separação clara de responsabilidades entre as classes `Veiculo`, `Mecanico` e `Manutencao`.
    

## 🚀 Como Executar

### 1. Executar o Backend (C++)

#### Pré-requisitos

-   Compilador C++ (G++, Clang ou MSVC).
-   Uma IDE C++ (Integrated Development Environment) de sua preferência, como:
    -   [Code::Blocks](https://www.codeblocks.org/downloads/binaries/) (recomendado para iniciantes)
    -   [Embarcadero C++Builder](https://www.embarcadero.com/products/cbuilder) (versão de teste disponível)
    -   [Visual Studio Code](https://code.visualstudio.com/) com extensões C/C++ (requer um compilador C++ como MinGW ou MSVC instalado separadamente)
    -   [Visual Studio](https://visualstudio.microsoft.com/vs/) (para Windows)

#### Passo a Passo

1.  **Clone o repositório:**

    git clone [https://github.com/lucas-sabino/AvaliaçãoParcial2](https://github.com/Lucas-Sabino01/AutoTech-Manager)    
    

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd AvaliaçãoParcial2
    ```

3.  **Abra o projeto na sua IDE:**

    *   **Code::Blocks:** Abra o Code::Blocks, vá em `File > Open...` e selecione o arquivo `.cbp` (se existir) ou a pasta raiz do projeto.
    *   **Embarcadero C++Builder:** Abra o C++Builder, vá em `File > Open Project...` e selecione o arquivo `.cbproj` (se existir) ou importe os arquivos `.cpp` e `.h` para um novo projeto.
    *   **Visual Studio Code:** Abra o VS Code, vá em `File > Open Folder...` e selecione a pasta `AvaliaçãoParcial2`.
    *   **Visual Studio:** Abra o Visual Studio, vá em `File > Open > Folder` e selecione a pasta `AvaliaçãoParcial2`, ou crie um novo projeto de console C++ e adicione os arquivos `.cpp` e `.h` existentes.

4.  **Compile e Execute:**

    *   Dentro da sua IDE, procure pelos botões ou opções de "Build" (Compilar) e "Run" (Executar). Geralmente, há um botão de "Play" (triângulo verde) que compila e executa o programa automaticamente.
    *   Certifique-se de que sua IDE está configurada com um compilador C++ funcional. Se estiver usando VS Code, pode ser necessário configurar um `tasks.json` para compilação.

### 2. Executar o Protótipo Visual (HTML/CSS/JS)

#### Pré-requisitos

-   Node.js e npm instalados.

#### Passo a Passo

1.  **Navegue até a pasta do protótipo:**

    ```bash
    cd AutoTech
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor backend (se houver um para o protótipo):**

    ```bash
    node server.js
    ```

4.  **Abra o arquivo `index.html` em seu navegador para visualizar a interface:**

    *   Navegue até a pasta `AutoTech` e clique duas vezes no arquivo `index.html`, ou arraste-o para a janela do seu navegador.

## 📸 Protótipo Visual

Além do código C++ (backend lógico), desenvolvi um protótipo de alta fidelidade da interface para validar a usabilidade.

## 👨‍💻 Autores

|<img src="https://ui-avatars.com/api/?name=Lucas+Sabino&background=0D8ABC&color=fff" width=115><br><br><sub>Lucas Sabino</sub>
|---|
|**Desenvolvimento C++ & Modelagem**|

Feito com 💙 e C++ por Lucas Sabino.
