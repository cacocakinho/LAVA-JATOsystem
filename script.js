// Array principal que vai guardar nossos objetos de carros
let atendimentos = JSON.parse(localStorage.getItem('brilho_rapido_dados')) || [];

// Função para renderizar a lista na tela
const atualizarInterface = () => {
    const lista = document.getElementById('listaCarros');
    const totalSpan = document.getElementById('total');
    
    lista.innerHTML = ''; // Limpa a lista antes de reconstruir
    
    atendimentos.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.cliente}</strong> - ${item.servico}
            <button class="btn-check" onclick="concluirServico(${index})">✅ Concluir</button>
        `;
        lista.appendChild(li);
    });

    totalSpan.innerText = atendimentos.length;
    
    // Salva no LocalStorage pra não perder nada
    localStorage.setItem('brilho_rapido_dados', JSON.stringify(atendimentos));
};

// Função para adicionar novo atendimento
const adicionarCarro = () => {
    const nomeInput = document.getElementById('cliente');
    const servicoInput = document.getElementById('servico');

    // Validação simples (não deixa vazio)
    if (nomeInput.value.trim() === '' || servicoInput.value === '') {
        alert("Opa! Preencha o nome e escolha um serviço, beleza?");
        return;
    }

    const novoAtendimento = {
        cliente: nomeInput.value,
        servico: servicoInput.value
    };

    atendimentos.push(novoAtendimento);
    
    // Limpa os campos depois de adicionar
    nomeInput.value = '';
    servicoInput.value = '';
    
    atualizarInterface();
};

// Função para remover quando o serviço estiver pronto
const concluirServico = (index) => {
    atendimentos.splice(index, 1);
    atualizarInterface();
};

// Inicia a tela com o que tiver no localStorage
atualizarInterface();
