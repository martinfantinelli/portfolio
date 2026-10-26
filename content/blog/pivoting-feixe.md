Feixe started as a lead intelligence tool. It read every Instagram comment, DM and story reply, figured out who was close to buying, and handed teams a priority queue so they could answer the right people before Meta's 24-hour messaging window closed.

Today Feixe is something else: a place to chat with any open model on Hugging Face, paying in reais.

Same name, same domain, completely different product. This post is about why I pivoted and what I like about the new model.

![JoJo panel: the moment before a decision](/blog/jojo-1.jpg)

---

## What the old Feixe got right (and where it got stuck)

The problem was real. Small businesses that sell through Instagram drown in messages, and the hot leads get buried under "price?" comments and emoji replies. Ranking them with an LLM worked.

But the whole product lived inside someone else's platform. Every feature depended on the Meta API: its permissions, its app review, its rate limits, its 24-hour window. Building on top of that means your roadmap is partly written by a company that doesn't know you exist.

And I noticed something while building it. The part I enjoyed most wasn't the Instagram plumbing. It was the model layer: choosing models, comparing them, routing requests, counting tokens and turning that into a price people could understand.

So I kept that part and threw away the rest.

## What Feixe is now

**Any open model on Hugging Face, in one chat.** The catalog comes live from the Hugging Face router, ordered by what's trending on the Hub. If a model isn't in the list, you paste its `org/model` id and talk to it. Community fine-tunes are served on demand, so that's thousands of models: coding models, roleplay models, Portuguese models, uncensored fine-tunes, the weird experimental ones nobody hosts.

**Pay in reais, per message.** No dollar card, no surprise invoice. You top up with Pix or card, and every reply shows how much it cost. Credits don't expire.

**Or a plan with unlimited light models.** Two monthly plans with the light models unlimited under fair use, plus credits for the heavier ones. Passed the fair-use cap? The message falls back to credits instead of just failing.

**An API, and Claude Code on open models.** Feixe exposes an Anthropic-compatible endpoint and a small CLI, so you can point Claude Code at an open model with one command:

```bash
feixe /model <org/model>
```

**Free to try, no card.** Sign in with Google, GitHub or X and send your first messages.

![JoJo panel: "Yes, yes, yes"](/blog/jojo-2.jpg)

---

## The best parts of the new model

### 1. No platform owns my roadmap

Hugging Face is a router over many providers, not a gatekeeper. If one provider goes down or changes prices, the catalog picks the cheapest live one for each model. There's no app review standing between me and a deploy.

### 2. The catalog grows without me

I don't add models. The community does. Every new fine-tune published on the Hub is, in principle, one paste away from being usable on Feixe. The product gets better while I sleep, which is the best kind of feature for a solo builder.

### 3. A price people actually understand

Open models are cheap per token, but "USD per million tokens" means nothing to most people in Brazil. Turning that into "this answer cost R$0,02" and letting people pay with Pix is the real product. The model is the commodity; the experience around it is not.

### 4. It serves devs and non-devs

Someone who just wants an AI that doesn't refuse everything uses the chat. A developer uses the API or runs Claude Code against a cheap open model. Same billing, same catalog, two audiences.

### 5. Simpler to build and to explain

The old pitch needed a paragraph. The new one fits in a line: *choose any open model and talk to it now*. Shorter pitch, shorter onboarding, fewer things to break.

![JoJo panel: "To be continued"](/blog/jojo-3.jpg)

---

## What's hard

- **Pricing on-demand models.** The router publishes prices for catalog models, but not for every community fine-tune. For those I use a conservative flat rate and calibrate it against real billing.
- **Not every model works.** Some repos simply aren't servable. When that happens the chat says so and suggests picking another, instead of throwing a cryptic error.
- **Trust.** "Uncensored" attracts attention, and it also comes with responsibility. The terms are clear that the user is responsible for what they do with the output.

## Pivots aren't failures

The first Feixe taught me the stack I ended up reusing: auth, billing, streaming, LLM routing, cost accounting. Almost nothing was wasted. The pivot was mostly deleting the part that depended on someone else.

If you want to try it: [feixeapp.com](https://feixeapp.com).
