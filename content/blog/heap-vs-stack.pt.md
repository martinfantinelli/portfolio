## **O que é "O Heap"?**

![Ilustração da Memória Heap](/blog/heap.jpg)

O Heap é comumente usado para alocar memória para objetos, arrays e outras estruturas de dados que requerem um tamanho flexível durante a execução do programa. É particularmente útil em cenários onde o tamanho dos dados não é conhecido previamente ou pode mudar durante o tempo de execução do programa. Exemplos incluem arrays de tamanho dinâmico, listas ligadas e instâncias de classes na programação orientada a objetos.


A memória heap refere-se a uma região da memória de um computador usada para alocação dinâmica de memória. Ao contrário da memória stack, que tem um tamanho fixo e segue uma ordem último a entrar, primeiro a sair (LIFO), a memória heap permite uma alocação e desalocação mais flexível de blocos de memória durante o tempo de execução. Essa flexibilidade é essencial para programas que precisam gerenciar grandes quantidades de dados ou estruturas de dados cujos tamanhos não são conhecidos antecipadamente.

## **E quanto ao "Stack"?**

![Ilustração da Memória Stack](/blog/stack.jpg)

Enquanto o Stack é um segmento de memória que armazena variáveis temporárias criadas por uma função. No stack, as variáveis são declaradas, armazenadas e inicializadas durante o tempo de execução.

Toda vez que uma função é chamada, a máquina aloca alguma memória stack para ela. Quando uma nova variável local é declarada, mais memória stack é alocada para essa função armazenar a variável. Tais alocações fazem o stack crescer para baixo. Após a função retornar, a memória stack desta função é desalocada, o que significa que todas as variáveis locais se tornam inválidas. A alocação e desalocação para memória stack é feita automaticamente. As variáveis alocadas no stack são chamadas de variáveis stack, ou variáveis automáticas.

Imagine que você está em uma festa com duas maneiras de pegar lanches:

O Stack é como uma torre organizada de pratos. Cada vez que você pega um prato (push), ele vai no topo, e quando terminar, você remove primeiro o prato do topo (pop). É rápido e organizado, mas há um porém—a torre só pode ficar tão alta. Se você empilhar muitos pratos, a coisa toda desaba (stack overflow!). É assim que seu programa lida com tarefas rápidas e pequenas (como contar até 10 ou chamar uma função). Rápido, mas sem espaço para bagunça.

O Heap, porém, é como o buffet de lanches da festa. Você pode pegar qualquer prato (memória) em qualquer tamanho—um biscoito pequeno ou uma pizza inteira—e mantê-lo pelo tempo que quiser. Mas aqui está a regra: você deve jogar fora seu próprio lixo. Se você deixar pratos espalhados (esquecendo de liberar memória), a mesa do buffet fica bagunçada, os lanches acabam (vazamentos de memória!), e eventualmente, a festa desaba (sem memória!). É onde dados grandes e flexíveis vivem (como carregar um nível gigante de jogo). Poderoso, mas você deve limpar.

Felizmente temos alguma ajuda "automágica" ao usar algumas linguagens (depende de qual você está usando):

Em C, você aloca memória manualmente (malloc) e deve liberá-la você mesmo (free). Esqueceu? Vazamentos de memória. Liberou cedo demais? Crash.

Java usa um coletor de lixo (GC) que libera automaticamente a memória heap não utilizada. Você apenas cria objetos (new), e o GC silenciosamente limpa quando eles não são mais necessários. Sem trabalho manual, mas você sacrifica um pouco de velocidade pela conveniência.

Rust não precisa de um coletor de lixo. Em vez disso, seu compilador aplica regras rígidas: a memória é liberada automaticamente quando uma variável sai de escopo, mas não compilará se você tentar usá-la incorretamente. É como uma geladeira que se tranca se você deixar sobras por muito tempo—seguro, rápido, mas você deve seguir suas regras.

A grande diferença?

- O stack é sua torre de pratos organizada e auto-limpante (pequena, rápida, mas frágil).

- O heap é o buffet selvagem (enorme e flexível, mas você gerencia a bagunça).

![Ilustração do Gerenciamento de Memória](/blog/heapstack.png)

Conhecer essas diferenças ajuda você a otimizar o uso de memória, debugar crashes (como erros de falta de memória), e escolher a abordagem certa—seja você espremendo performance de um motor de jogo, escalando um serviço web, ou construindo sistemas críticos de segurança. Essencialmente, a consciência de memória separa engenheiros que escrevem "código que funciona" daqueles que criam soluções eficientes e robustas.

# Referências

[Gerenciamento de memória em NodeJS](https://www.daily.co/blog/introduction-to-memory-management-in-node-js-applications/#)

[Gerenciamento de memória em C](https://medium.com/@lsltry404/memory-usage-in-c-programming-a-comprehensive-guide-b20038647992)

[Gerenciamento de memória em Rust](https://medium.com/@cicerohellmann/understanding-memory-management-in-rust-a-comparative-insight-with-c-and-java-kotlin-0b2102020ae7)

[Gerenciamento de memória em Java](https://medium.com/@3eid/deep-dive-into-java-memory-management-heap-stack-metaspace-and-garbage-collection-df6548fe6860)

# Obrigado pela leitura!

![Frieren](/blog/frieren.jpeg)

## Redes Sociais

- **LinkedIn**: [martin-fantinelli](https://www.linkedin.com/in/martin-fantinelli/)
- **X/Twitter**: [@martinfantineli](https://x.com/martinfantineli)
- **Instagram**: [@martinfantinelli](https://www.instagram.com/martinfantinelli)
