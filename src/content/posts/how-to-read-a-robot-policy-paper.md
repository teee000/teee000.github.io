---
title: 'How to read a robot policy paper'
date: '2026-11-05'
summary: 'An example reading note demonstrating expandable articles, figures, inline mathematics, and display equations.'
topics:
  - 'Paper notes'
  - 'Robot learning'
  - 'World models'
example: true
---
This example uses three questions to structure a reading note. Replace it with your own notes when you are ready to publish.

### 1. Start with the interface

A robot policy maps observations to actions. When actions are generated in chunks, the interface can be written as

$$
\mathbf{a}_{t:t+H} = \pi_{\theta}(\mathbf{o}_{\leq t}),
$$

where $\pi_{\theta}$ is the policy, $\mathbf{o}_{\leq t}$ contains the observations available at time $t$, and $H$ is the action horizon.

This small piece of notation already raises useful questions:

- Which observations does the policy actually use?
- Does it predict actions, future states, or both?
- How much of the generated chunk is executed before the policy runs again?

### 2. Connect the method to the claim

A method figure should make the main computational path easier to understand, not merely decorate the page.

![An example method overview from the LiLa-WAM project](./images/lila-wam-framework.png)

*Figure: An example method overview from the LiLa-WAM project. Replace this image and caption with those from the paper being discussed.*

For each important component, ask which claim it supports and which experiment would fail if that component were removed.

### 3. End with your own judgment

A useful note should outlive the first reading. Finish with three short paragraphs:

1. **Evidence:** Which results most strongly support the authors' claims?
2. **Limitations:** Which assumptions constrain the method's scope?
3. **Connections:** How does this work change your understanding of related papers?

> The goal is not to reproduce the abstract. It is to make the paper easier to reason about when you return to it later.
