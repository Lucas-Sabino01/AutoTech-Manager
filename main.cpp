#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

using namespace std;

class Veiculo {
private:
    string placa;
    string modelo;
    int ano;

public:
    Veiculo(string p, string m, int a) : placa(p), modelo(m), ano(a) {}

    string getPlaca() const { return placa; }
    string getDetalhes() const { return modelo + " (" + to_string(ano) + ")"; }
};

class Pessoa {
protected:
    string nome;
    string id;
public:
    Pessoa(string n, string i) : nome(n), id(i) {}
    virtual string getInfo() const = 0;
};

class Mecanico : public Pessoa {
private:
    string especialidade;
public:
    Mecanico(string n, string i, string esp) : Pessoa(n, i), especialidade(esp) {}

    string getInfo() const override {
        return "Mec. " + nome + " [" + especialidade + "]";
    }
};

class ItemServico {
protected:
    string descricao;
    double valor;
public:
    ItemServico(string desc, double v) : descricao(desc), valor(v) {}
    
    virtual double getValor() const { return valor; }
    virtual string getDescricao() const { return descricao; }
    virtual ~ItemServico() {}
};

class Peca : public ItemServico {
public:
    Peca(string desc, double v) : ItemServico(desc, v) {}
};

class Servico : public ItemServico {
public:
    Servico(string desc, double v) : ItemServico(desc, v) {}
};

class Manutencao {
private:
    static int contadorIds;
    int id;
    string data;
    Veiculo* veiculo;
    Mecanico* mecanico;
    vector<ItemServico*> itens;
    bool finalizada;

public:
    Manutencao(string d, Veiculo* v, Mecanico* m) 
        : data(d), veiculo(v), mecanico(m), finalizada(false) {
        id = ++contadorIds;
    }

    void adicionarItem(ItemServico* item) {
        if (!finalizada) {
            itens.push_back(item);
            cout << "Item adicionado: " << item->getDescricao() << endl;
        } else {
            cout << "Erro: Manutencao ja finalizada." << endl;
        }
    }

    double calcularTotal() const {
        double total = 0;
        for (auto item : itens) {
            total += item->getValor();
        }
        return total;
    }

    void finalizar() {
        finalizada = true;
        cout << "--- Ordem de Servico " << id << " Finalizada ---" << endl;
    }

    void exibirRelatorio() const {
        cout << "\n========================================" << endl;
        cout << "RELATORIO DE MANUTENCAO #" << id << endl;
        cout << "Data: " << data << endl;
        cout << "Veiculo: " << veiculo->getPlaca() << " - " << veiculo->getDetalhes() << endl;
        cout << "Responsavel: " << mecanico->getInfo() << endl;
        cout << "----------------------------------------" << endl;
        cout << "ITENS:" << endl;
        for (auto item : itens) {
            cout << "- " << left << setw(25) << item->getDescricao() 
                 << " R$ " << fixed << setprecision(2) << item->getValor() << endl;
        }
        cout << "----------------------------------------" << endl;
        cout << "TOTAL: R$ " << calcularTotal() << endl;
        cout << "========================================\n" << endl;
    }
};

int Manutencao::contadorIds = 0;

int main() {
    cout << "=== SISTEMA AUTOTECH - INICIANDO ===" << endl;

    Mecanico* m1 = new Mecanico("Carlos Silva", "001", "Motor");
    Veiculo* v1 = new Veiculo("ABC-1234", "Ford Ka", 2019);

    cout << "\n>>> Criando nova Ordem de Servico..." << endl;
    Manutencao os1("19/11/2025", v1, m1);

    os1.adicionarItem(new Peca("Oleo 5W30 (4L)", 120.00));
    os1.adicionarItem(new Peca("Filtro de Oleo", 35.00));
    os1.adicionarItem(new Servico("Mao de Obra Troca", 50.00));

    os1.finalizar();
    os1.exibirRelatorio();

    delete m1;
    delete v1;

    return 0;
}