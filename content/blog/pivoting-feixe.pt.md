O Feixe começou como uma ferramenta de inteligência de leads. Ele lia cada comentário, DM e resposta de story no Instagram, identificava quem estava perto de comprar e entregava uma fila de prioridade para o time responder as pessoas certas antes de fechar a janela de 24 horas da Meta.

Hoje o Feixe é outra coisa: um lugar para conversar com qualquer modelo aberto do Hugging Face, pagando em real.

Mesmo nome, mesmo domínio, produto completamente diferente. Este post é sobre por que eu pivotei e o que eu mais gosto no modelo novo.

![Painel de JoJo: o momento antes da decisão](/blog/jojo-1.jpg)

---

## O que o Feixe antigo acertou (e onde travou)

O problema era real. Pequenos negócios que vendem pelo Instagram se afogam em mensagens, e os leads quentes ficam enterrados embaixo de comentários de "preço?" e respostas com emoji. Ranquear isso com um LLM funcionava.

Mas o produto inteiro morava dentro da plataforma de outra empresa. Toda feature dependia da API da Meta: as permissões, a revisão do app, os limites de requisição, a janela de 24 horas. Construir em cima disso significa que parte do seu roadmap é escrita por uma empresa que nem sabe que você existe.

E eu percebi uma coisa enquanto construía. A parte que eu mais gostava não era o encanamento do Instagram. Era a camada de modelos: escolher modelos, comparar, rotear requisições, contar tokens e transformar isso num preço que as pessoas entendem.

Então fiquei com essa parte e joguei o resto fora.

## O que o Feixe é agora

**Qualquer modelo aberto do Hugging Face, num chat só.** O catálogo vem ao vivo do router do Hugging Face, ordenado pelo que está em alta no Hub. Se um modelo não está na lista, você cola o `org/modelo` e conversa com ele. Fine-tunes da comunidade são servidos sob demanda, então são milhares de modelos: de código, de roleplay, em português, fine-tunes sem censura, os experimentais que ninguém hospeda.

**Pague em real, por mensagem.** Sem cartão em dólar, sem fatura surpresa. Você recarrega com Pix ou cartão, e cada resposta mostra quanto custou. Os créditos não expiram.

**Ou um plano com modelos leves ilimitados.** Dois planos mensais com os modelos leves ilimitados dentro do uso justo, mais créditos para os mais pesados. Passou do limite? A mensagem usa créditos em vez de simplesmente falhar.

**Uma API, e o Claude Code em modelos abertos.** O Feixe expõe um endpoint compatível com a API da Anthropic e um CLI pequeno, então dá para apontar o Claude Code para um modelo aberto com um comando:

```bash
feixe /model <org/modelo>
```

**Teste grátis, sem cartão.** Entre com Google, GitHub ou X e mande as primeiras mensagens.

![Painel de JoJo: "Yes, yes, yes"](/blog/jojo-2.jpg)

---

## Os melhores pontos do modelo novo

### 1. Nenhuma plataforma é dona do meu roadmap

O Hugging Face é um roteador sobre vários provedores, não um porteiro. Se um provedor cai ou muda o preço, o catálogo escolhe o mais barato disponível para cada modelo. Não existe revisão de app entre mim e um deploy.

### 2. O catálogo cresce sem mim

Eu não adiciono modelos. A comunidade adiciona. Cada fine-tune novo publicado no Hub está, em princípio, a um colar de distância de funcionar no Feixe. O produto melhora enquanto eu durmo, que é o melhor tipo de feature para quem constrói sozinho.

### 3. Um preço que as pessoas entendem

Modelos abertos são baratos por token, mas "USD por milhão de tokens" não diz nada para a maioria das pessoas no Brasil. Transformar isso em "essa resposta custou R$0,02" e deixar pagar com Pix é o produto de verdade. O modelo é commodity; a experiência em volta dele, não.

### 4. Serve dev e não-dev

Quem só quer uma IA que não recusa tudo usa o chat. Um dev usa a API ou roda o Claude Code num modelo aberto barato. Mesma cobrança, mesmo catálogo, dois públicos.

### 5. Mais simples de construir e de explicar

O pitch antigo precisava de um parágrafo. O novo cabe numa linha: *escolha qualquer modelo aberto e converse com ele agora*. Pitch menor, onboarding menor, menos coisa para quebrar.

![Painel de JoJo: "To be continued"](/blog/jojo-3.jpg)

---

## O que é difícil

- **Precificar modelos sob demanda.** O router publica preço dos modelos do catálogo, mas não de todo fine-tune da comunidade. Para esses uso uma tarifa fixa conservadora e calibro com o custo real.
- **Nem todo modelo funciona.** Alguns repositórios simplesmente não podem ser servidos. Quando acontece, o chat avisa e sugere escolher outro, em vez de soltar um erro críptico.
- **Confiança.** "Sem censura" chama atenção, e também traz responsabilidade. Os termos deixam claro que o usuário responde pelo que faz com as respostas.

## Pivotar não é fracassar

O primeiro Feixe me ensinou a stack que acabei reaproveitando: auth, cobrança, streaming, roteamento de LLM, contabilidade de custo. Quase nada foi desperdiçado. A pivotagem foi basicamente apagar a parte que dependia de outra empresa.

Se quiser testar: [feixeapp.com](https://feixeapp.com).
