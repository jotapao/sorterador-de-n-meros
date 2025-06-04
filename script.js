document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os elementos do DOM
    const inputQuantidade = document.getElementById('quantidade');
    const inputInicioIntervalo = document.getElementById('inicio-intervalo');
    const inputFimIntervalo = document.getElementById('fim-intervalo');
    const checkboxNaoRepetir = document.getElementById('nao-repetir');
    const btnSortear = document.querySelector('.sort-button');

    const areaResultados = document.getElementById('resultados-area');
    const tituloResultados = document.getElementById('titulo-resultados');
    const numerosDisplay = document.getElementById('numeros-sorteados-display');
    const mensagemErro = document.getElementById('mensagem-erro');

    btnSortear.addEventListener('click', realizarSorteio);

    function realizarSorteio() {
        // 1. Limpar resultados e erros anteriores
        numerosDisplay.innerHTML = '';
        mensagemErro.textContent = '';
        mensagemErro.style.display = 'none';
        tituloResultados.style.display = 'none';

        // 2. Obter e validar os valores dos inputs
        const quantidade = parseInt(inputQuantidade.value);
        const inicio = parseInt(inputInicioIntervalo.value);
        const fim = parseInt(inputFimIntervalo.value);
        const naoRepetir = checkboxNaoRepetir.checked;

        if (isNaN(quantidade) || isNaN(inicio) || isNaN(fim)) {
            mostrarErro("Por favor, preencha todos os campos com números válidos.");
            return;
        }

        if (quantidade <= 0) {
            mostrarErro("A quantidade de números a sortear deve ser maior que zero.");
            return;
        }

        if (inicio > fim) {
            mostrarErro("O início do intervalo não pode ser maior que o fim.");
            return;
        }

        const numerosNoIntervalo = fim - inicio + 1;
        if (naoRepetir && quantidade > numerosNoIntervalo) {
            mostrarErro("A quantidade de números a sortear não pode ser maior que o número de itens únicos no intervalo selecionado.");
            return;
        }

        // 3. Gerar os números sorteados
        const numerosSorteados = [];
        if (naoRepetir) {
            const todosOsNumerosPossiveis = [];
            for (let i = inicio; i <= fim; i++) {
                todosOsNumerosPossiveis.push(i);
            }
            // Embaralhar e pegar a quantidade necessária
            for (let i = 0; i < quantidade; i++) {
                if (todosOsNumerosPossiveis.length === 0) break; // Segurança
                const indiceAleatorio = Math.floor(Math.random() * todosOsNumerosPossiveis.length);
                numerosSorteados.push(todosOsNumerosPossiveis.splice(indiceAleatorio, 1)[0]);
            }
        } else {
            for (let i = 0; i < quantidade; i++) {
                const numeroAleatorio = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
                numerosSorteados.push(numeroAleatorio);
            }
        }

        // 4. Exibir os números com animação
        if (numerosSorteados.length > 0) {
            tituloResultados.style.display = 'block';
            numerosSorteados.forEach((numero, index) => {
                setTimeout(() => {
                    const numeroDiv = document.createElement('div');
                    numeroDiv.classList.add('numero-sorteado-item');
                    numeroDiv.textContent = numero;
                    numerosDisplay.appendChild(numeroDiv);
                }, index * 300); // Atraso de 300ms entre cada número para efeito "um por um"
            });
        } else {
            mostrarErro("Não foi possível sortear números com os parâmetros fornecidos.");
        }
    }

    function mostrarErro(mensagem) {
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = 'inline-block'; // ou 'block' se preferir largura total
        tituloResultados.style.display = 'none'; // Esconde o título se houver erro
    }
});