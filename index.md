# Projeto: Sistema de Gestão de Manutenção Veicular - "AutoTech Manager"

## 1. Descrição do Cenário

- **Contexto**: Uma oficina mecânica de médio porte chamada "AutoTech".
- **Problema**: Atualmente, o controle é feito em fichas de papel e planilhas desconexas. Isso gera erros no cálculo de peças, perda de histórico do veículo e dificuldade em saber qual mecânico realizou qual serviço.
- **Solução**: Um sistema desktop para centralizar o cadastro de veículos, mecânicos e registrar ordens de serviço (manutenções) detalhadas com peças e custos.

## 2. Modelagem de Requisitos

### Requisitos Funcionais (RF)

- **RF01 - Manter Veículos**: O sistema deve permitir cadastrar, alterar e consultar veículos (Placa, Modelo, Marca, Ano).
- **RF02 - Manter Mecânicos**: O sistema deve permitir o cadastro de profissionais (Nome, Especialidade, ID).
- **RF03 - Manter Peças**: Registrar peças disponíveis com seus respectivos valores unitários.
- **RF04 - Registrar Manutenção**: Criar uma nova ordem de manutenção vinculando um veículo e um mecânico.
- **RF05 - Adicionar Itens à Manutenção**: Permitir inserir múltiplas peças e serviços em uma manutenção existente.
- **RF06 - Calcular Custo Total**: O sistema deve somar automaticamente o valor das peças e da mão de obra.
- **RF07 - Consultar Histórico**: Buscar todas as manutenções realizadas em um veículo específico pela placa.
- **RF08 - Gerar Relatório de Serviço**: Exibir um resumo da manutenção com data, quilometragem, itens e valor final.

### Requisitos Não Funcionais (RNF)

- **RNF01 - Linguagem**: O núcleo do sistema deve ser estruturado em C++.
- **RNF02 - Usabilidade**: As telas devem ser intuitivas, com no máximo 3 cliques para iniciar uma manutenção.
- **RNF03 - Desempenho**: O registro de uma manutenção não deve levar mais que 2 segundos para ser processado em memória.
- **RNF04 - Confiabilidade**: O sistema não deve permitir salvar manutenções sem um mecânico responsável.
- **RNF05 - Portabilidade**: O código deve ser compilável em ambientes Windows e Linux (padrão ANSI C++).

### Regras de Negócio (RN)

- **RN01 - Validação de Placa**: Não é possível cadastrar dois veículos com a mesma placa.
- **RN02 - Quilometragem**: A quilometragem da nova manutenção não pode ser menor que a da manutenção anterior do mesmo veículo.
- **RN03 - Responsabilidade**: Todo serviço deve ter obrigatoriamente um mecânico associado.
