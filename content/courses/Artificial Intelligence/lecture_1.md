---
title: Introduction to Artificial Intelligence
tag: AI
order: 1
---

## Lecture 1 — Introduction to Artificial Intelligence

<br>

The lecture’s stated goals are to understand what AI is and is not, understand definitions and goals of AI, look at its history, and understand the different approaches to AI. 

---

## 1. What is Artificial Intelligence?

The first important point is that **AI is surprisingly difficult to define precisely**.

The lecture deliberately asks whether a **calculator, ChatGPT, thermostat, and self-driving car** are AI. 

This is useful because simply saying *“AI is anything a computer can do that seems smart”* doesn't give us a stable definition.

For example:

* A calculator can perform arithmetic extremely well, but we normally don't consider ordinary arithmetic calculation to be intelligent behavior.
* A thermostat senses temperature and takes action, but it has very limited decision-making.
* A self-driving car has to perceive a complicated environment, make decisions, and act.
* A system such as ChatGPT performs tasks that we associate with language understanding and generation.

So the real question is:

> **What characteristics make a system intelligent?**

The lecture approaches this question using **four different definitions of AI**.

---

## 2. The Four Ways of Thinking About AI

The lecture presents a useful 2×2 framework:

|                       | **Thinking**      | **Acting**      |
| --------------------- | ----------------- | --------------- |
| **Human-oriented**    | Think like humans | Act like humans |
| **Rational-oriented** | Think rationally  | Act rationally  |

This gives us four approaches:

1. **Thinking humanly**
2. **Acting humanly**
3. **Thinking rationally**
4. **Acting rationally** 

This distinction is extremely important because **“intelligent” does not necessarily mean “human-like.”**

A machine might arrive at a good decision using a completely different process from a human.

---

### Concept: Thinking Humanly

#### What is it?

The idea is:

> **Can we build a machine whose thought process resembles the way humans think?**

The lecture describes this approach as requiring knowledge of brain function and aiming to replicate human thought processes. It connects this approach with **cognitive science**. 

**Cognitive science** is the study of how humans think, learn, remember, perceive, make decisions, and solve problems.

#### How does it work?

Imagine giving a person a puzzle.

There are actually two different things we could study:

* **The answer:** What solution did the person eventually produce?
* **The process:** How did the person reason their way to that solution?

Thinking-humanly AI is interested in the **process**.

For example, suppose a human sees:

> “If it is raining, take an umbrella.”

and then observes:

> “It is raining.”

We could study how the human recognizes the situation, recalls the rule, and reaches the conclusion.

A thinking-humanly AI system would try to model that kind of human reasoning process.

#### Why does it matter?

If our goal is to understand human intelligence, reproducing the *process* can be just as important as reproducing the final answer.

This connects AI with neuroscience and psychology. The lecture's historical foundations explicitly identify the study of the brain and human cognition as contributors to AI. 

#### Important distinction

**Thinking humanly ≠ producing human-like answers.**

A machine could give the same answer as a human while reaching it through a completely different process.

That distinction becomes important when we compare this approach with **acting humanly**.

#### In simple terms:

Thinking-humanly AI asks:

> **“Can the machine think the way a human thinks?”**

The focus is on the **internal reasoning process**, not merely the final result.

---

## 3. Acting Humanly

### Concept: Acting Humanly

#### What is it?

Instead of asking whether a machine thinks like a human, we can ask:

> **Does the machine behave like a human?**

This is about observable behavior.

The classic idea associated with this approach is the **Turing Test**. 

---

### The Turing Test

Imagine three participants:

* a human judge,
* a human,
* a computer.

The judge communicates with the other two without directly seeing them.

The goal is to determine which participant is the computer.

If the judge cannot reliably distinguish the computer from the human based on their interaction, the computer is considered to have passed the test.

So the important question is not:

> “Does the computer actually think like a human?”

Instead, it is:

> **“Can the computer behave convincingly enough like a human that we cannot distinguish it from one?”**

#### Why is this interesting?

It gives us an **observable test** of intelligent behavior.

We don't have direct access to another person's thoughts either. We infer intelligence from behavior.

For example, if someone:

* understands your question,
* responds appropriately,
* remembers context,
* reasons about information,

you infer that they are intelligent.

The Turing Test applies a similar idea to machines.

#### What capabilities would a machine need?

A machine attempting the classic Turing Test would need abilities related to:

* language,
* reasoning,
* knowledge,
* learning,
* communication.

#### Important distinction

**Acting humanly does not necessarily mean thinking humanly.**

A machine could potentially produce human-like behavior using a mechanism very different from the human brain.

That is one of the central distinctions in the four-way framework.

#### In simple terms:

Acting-humanly AI asks:

> **“Can the machine behave like a human?”**

The focus is on **what we can observe**, rather than whether the machine's internal thought process is genuinely human.

---

## 4. Thinking Rationally

### Concept: Thinking Rationally

#### What is it?

This approach asks:

> **Can a machine reason correctly according to formal logic?**

The lecture calls this the **“Laws of Thought” approach**. It is based on ideas such as Aristotle's syllogisms and symbolic logic. 

**Logic** is a formal system for determining what conclusions follow from given information.

For example:

1. All humans are mortal.
2. Socrates is a human.
3. Therefore, Socrates is mortal.

The important point is that the conclusion follows logically from the premises.

---

### Why logic is useful for AI

Suppose an AI system has these facts:

* Every bird has wings.
* A sparrow is a bird.

It can logically derive:

* A sparrow has wings.

The attraction of this approach is that reasoning can be made **precise and systematic**.

The computer isn't merely guessing.

It applies rules to premises to derive conclusions.

The lecture mentions deductive logic systems such as **Prolog** as examples. 

---

### The major problem with pure logical reasoning

The real world is messy.

Logic works beautifully when:

* the facts are known,
* the rules are clear,
* the information is consistent.

But real environments often contain:

* incomplete information,
* uncertainty,
* contradictory information,
* noisy observations.

For example:

> “Should I carry an umbrella?”

You might know that the weather forecast says there is a 60% chance of rain.

Formal logic doesn't naturally capture this kind of uncertainty by simply saying:

> Rain = true
> Rain = false

The real situation is uncertain.

This is why the lecture points out that real-world problems often lack complete or consistent information. 

#### In simple terms:

Thinking-rationally AI asks:

> **“Can the machine reason correctly using formal rules?”**

It is powerful when information and rules are clear, but real-world decision-making often involves uncertainty and incomplete information.

---

## 5. Acting Rationally — The Most Important Approach for This Course

### Concept: Acting Rationally

This is probably the **most important conceptual shift in Lecture 1**.

Instead of asking:

* Does the machine think like a human?
* Does it act like a human?
* Does it follow formal logic perfectly?

we ask:

> **What action should the machine take to achieve the best outcome?**

The lecture calls this the **rational-agent approach**. It says the aim is to maximize goal achievement based on available information and actions, rather than imitate humans. The lecture also identifies this as the dominant paradigm in modern AI and the approach adopted by Russell & Norvig. 

---

### What does “rational” mean?

This is a word that can easily be misunderstood.

**Rational does not mean perfect.**

A rational agent makes the **best decision it can given what it currently knows and the available resources**.

Imagine you are driving and suddenly see an obstacle.

You don't have perfect information about everything that will happen over the next 10 minutes.

You still have to make the best decision based on what you can currently observe.

That is the idea of rationality.

---

### The robot vacuum example

The lecture gives a very useful example.

Suppose:

* a robot vacuum is cleaning a room,
* its battery is at **5%**,
* the floor is still dirty,
* the charging station is nearby.

Possible actions include:

* continue cleaning,
* recharge,
* move,
* stop. 

A purely short-sighted strategy might say:

> “The room is dirty → keep cleaning.”

But a rational agent considers the **consequences**.

If the robot continues cleaning until its battery dies, it may never finish the room.

Going to recharge may temporarily stop cleaning, but could allow the robot to complete the larger goal later.

The lecture summarizes the components as:

* **Agent:** robot vacuum
* **Environment:** room
* **State:** battery 5%, floor dirty, charger nearby
* **Actions:** clean, recharge, stop, move
* **Goal:** clean the room successfully
* **Reward:** positive for cleaning the room, negative for the battery dying. 

This example is important because it introduces the basic structure behind much of AI.

---

### Why this approach is so useful

The rational-agent perspective gives us a common framework:

> **The agent observes → evaluates the situation → chooses an action → receives a result → continues.**

That basic pattern will appear repeatedly throughout the course.

It is especially important because the later lectures on search are essentially concerned with:

> **How can an agent choose a sequence of actions that gets it from its current situation toward a desired goal?**

You don't need to learn those search algorithms yet; the important Lecture 1 connection is simply that **AI can be viewed as intelligent decision-making by an agent.**

#### In simple terms:

Acting-rationally AI asks:

> **“Given what I know, what action is most likely to achieve my goal?”**

This does **not** require the machine to think exactly like a human. It requires the machine to make effective decisions.

---

## 6. The Four Approaches — The Big Distinction

It is worth putting all four together:

| Approach                | Main question                                                 |
| ----------------------- | ------------------------------------------------------------- |
| **Thinking humanly**    | Can the machine think like a human?                           |
| **Acting humanly**      | Can the machine behave like a human?                          |
| **Thinking rationally** | Can the machine reason correctly using logic?                 |
| **Acting rationally**   | Can the machine choose actions that achieve the best outcome? |

The lecture's progression is essentially moving from **imitating humans** toward **making rational decisions**.

That distinction will matter throughout the rest of the course.

---

## 7. Why Study AI?

The lecture starts from a simple observation:

> **AI is everywhere.**

It gives examples across many areas:

* **Healthcare:** disease diagnosis, outcome prediction, surgery assistance
* **Finance:** fraud detection, algorithmic trading, credit scoring
* **Transportation:** autonomous vehicles, route optimization, logistics
* **Agriculture:** crop prediction, autonomous equipment, pest control
* **Education:** personalized tutoring, grading, content generation
* **Science and research:** protein folding, drug discovery, climate modeling. 

The important idea isn't that AI is simply “popular.”

It is that AI provides methods for solving problems where a system must:

1. receive information,
2. interpret or reason about it,
3. choose among alternatives,
4. take action or produce an output,
5. sometimes learn from experience.

That is why AI appears across such different fields.

#### In simple terms:

AI is studied because many real-world problems require **decision-making, prediction, learning, reasoning, and action**.

---

## 8. A Brief History and the Foundations of AI

The lecture emphasizes that AI did not suddenly appear with modern computers.

It grew out of several different fields.

### Philosophy

Philosophy contributed questions about:

* reasoning,
* knowledge,
* intelligence,
* what it means to make a correct argument.

The lecture points to **Socrates** and **Aristotle**, particularly Aristotle's development of formal logic. 

This is important because AI later asks:

> Can reasoning be represented as a formal process that a machine can execute?

---

### Mathematics

The lecture mentions **George Boole** and formal Boolean reasoning.

Boolean logic is based on values such as:

* true / false,
* 1 / 0.

This became important in logical reasoning and eventually digital computing. 

---

### Economics

Economics contributed the idea of agents making decisions in order to maximize some notion of payoff or benefit.

That connects strongly to the **rational-agent** view of AI:

> An agent has goals and tries to choose actions that produce good outcomes. 

---

### Neuroscience

The study of how biological brains process information helped inspire ideas behind **artificial neural networks**.

The important connection is:

> Biological intelligence → study the brain → mathematical/computational models of information processing → artificial neural networks.

The lecture identifies neuroscience as one of AI's foundations. 

---

### Psychology

Psychology contributed knowledge about:

* how humans think,
* how humans learn,
* how humans solve problems.

This particularly influenced early approaches that tried to model human reasoning. 

#### In simple terms:

AI is an interdisciplinary subject. Its foundations come from **philosophy, mathematics, economics, neuroscience, psychology**, and eventually computer science.

---

## 9. The Beginning of AI as a Computer Science Field

The lecture identifies the **Dartmouth Conference of 1956** as a major starting point for AI as a computer-science field. 

Several important researchers are mentioned.

#### John McCarthy

McCarthy coined the term **Artificial Intelligence**.

He also developed **LISP**, a programming language that became important in early AI work, especially symbolic reasoning.

#### Marvin Minsky

The lecture connects Minsky with work on:

* neural networks,
* knowledge representation,
* the idea of **frames** for representing knowledge.

#### Claude Shannon

Shannon is famous for information theory and also worked on game-playing AI.

The lecture mentions his work on programs for games such as checkers and chess.

#### Allen Newell and Herbert Simon

They developed the **General Problem Solver**, an early attempt to create a general-purpose system capable of solving different kinds of problems.

The important historical idea is that researchers were trying to move beyond simple calculations toward machines that could perform activities associated with intelligence. 

#### In simple terms:

The 1956 Dartmouth meeting represents an important moment when researchers began treating **machine intelligence as a distinct research field**.

---

## 10. What Can AI Actually Do?

The lecture then asks us to think critically about AI's capabilities.

It gives examples such as:

* playing games,
* autonomous driving,
* proving mathematical theorems,
* writing humorous stories,
* providing specialized legal advice,
* translating speech,
* planning spacecraft operations. 

The point isn't that every one of these tasks is either simply “possible” or “impossible.”

Instead, AI capabilities are **uneven**.

AI can be extremely good at some narrowly defined tasks while still struggling with situations requiring broad, flexible understanding.

For example, the lecture specifically notes that AI can assist with mathematical proof discovery, but major breakthroughs may still require humans. 

It also highlights complex, chaotic driving environments as an area where AI driving systems can still struggle, particularly where behavior is unpredictable and informal rules matter. 

#### Important lesson

**Being very good at one task does not automatically mean having general intelligence.**

A system can be extraordinarily capable within a narrow domain without being able to flexibly transfer that ability to completely different domains.

---

## 11. Machine Learning — A Small but Important Introduction

Lecture 1 briefly introduces machine learning through an example comparing two explanations.

The simpler explanation says that computers can improve by looking at many examples rather than having every rule explicitly programmed.

The more technical explanation describes machine learning as AI systems learning patterns from data and improving their performance without being explicitly programmed with every rule. 

For this lecture, the key idea is simply:

#### Traditional programming

You might explicitly tell the computer:

> If X happens, do Y.
> If A happens, do B.
> If C happens, do D.

#### Machine learning

Instead, you give the system:

> lots of examples/data

and the system learns patterns that allow it to produce useful outputs.

The lecture also gives a baby-learning analogy.

A baby hears speech repeatedly, notices patterns, and gradually learns to produce sounds. The lecture describes this as a form of natural, unsupervised learning. 

#### In simple terms:

Machine learning is an important way of building AI systems where the system **learns patterns from experience/data rather than having every rule manually specified**.

---

## 12. Narrow AI, General AI, and Superintelligence

The lecture introduces three broad categories.

### Artificial Narrow Intelligence — ANI

Also called **weak AI**.

It refers to AI designed for **specific tasks**. 

Examples conceptually include a system designed specifically for:

* image classification,
* recommendation,
* translation,
* playing a particular game.

The important point is that its intelligence is **narrowly focused**.

---

### Artificial General Intelligence — AGI

Also called **strong AI** in the lecture.

The lecture defines AGI as a machine capable of performing **any intellectual task that a human can perform**. 

This is a much stronger claim than being good at one task.

Think of the difference like this:

> **ANI:** “I am very good at this particular job.”

versus

> **AGI:** “I can flexibly perform essentially any intellectual task a human can.”

---

### Artificial Superintelligence — ASI

The lecture uses ASI for a hypothetical point where computer capabilities surpass human capabilities. 

This is therefore beyond AGI.

A useful conceptual progression is:

**ANI → AGI → ASI**

where the scope of capability becomes increasingly broad.

#### Important distinction

Don't confuse:

* **AI** as the broad field,
* **ANI** as narrow/specific AI,
* **AGI** as human-level general intellectual capability,
* **ASI** as capability surpassing humans.

The lecture is introducing these as concepts; it does not claim that all three currently exist as deployed technologies.

#### In simple terms:

Most practical AI systems are **task-specific**. AGI and ASI describe much broader or hypothetical levels of machine intelligence.

---

## 13. Agents — The Core Building Block

Near the end of the lecture, we get one of the most important concepts for the rest of the course:

### What is an agent?

An **agent** is something that:

> **perceives its environment through sensors and acts on the environment through actuators.** 

Let's unpack that.

#### Sensor

A **sensor** is how the agent receives information.

Examples:

* human → eyes, ears
* robot → camera, sonar, laser
* microphone → sound
* temperature sensor → temperature

#### Actuator

An **actuator** is how the agent does something to the world.

Examples:

* human → hands, legs, mouth
* robot → motors, wheels, grippers
* software agent → outputs, commands, recommendations

So we can visualize the basic idea as:

**Environment → Sensors → Agent → Actuators → Environment**

The agent continuously interacts with its environment.

---

### Percept

A **percept** is the information the agent receives from the environment at a particular moment.

For example, a robot vacuum might perceive:

> “The floor in front of me is dirty.”

It then has to decide what to do.

---

### Agent function

The lecture says the agent's behavior can be described by a function that maps a **percept to an action**. 

Conceptually:

**Percept → Action**

For example:

> Percept: obstacle detected
> → Action: turn left

or:

> Percept: room dirty + battery low
> → Action: recharge

This idea is foundational because much of AI can be viewed as the problem of designing a good mapping from **what the agent observes** to **what it should do**.

#### In simple terms:

An agent is a system that **looks at the world, decides what to do, and acts**.

---

## 14. Rational Agents and Performance Measures

The lecture then combines the ideas of **agents** and **rationality**.

A rational agent chooses actions that maximize its success based on its current knowledge. 

But there is an important question:

> **How do we know whether an agent is successful?**

We need a way to measure performance.

That is the **performance measure**.

---

### Performance Measure

A performance measure defines:

> **What counts as a good outcome?**

For the robot vacuum:

* clean room → good
* battery dying before the room is cleaned → bad

For a self-driving car, we might care about things such as:

* safety,
* reaching the destination,
* following rules,
* efficiency.

The performance measure gives the agent something to optimize.

#### Important distinction

The **goal** and the **performance measure** are related but not identical.

A goal might be:

> “Clean the room.”

A performance measure might evaluate **how successfully and efficiently** the robot cleaned it.

This distinction becomes increasingly important when thinking about rational decision-making.

---

## 15. PEAS — Describing an AI Problem

The lecture ends with the **PEAS framework**.

PEAS stands for:

* **P — Performance measure**
* **E — Environment**
* **A — Actuators**
* **S — Sensors** 

This gives us a systematic way to describe an AI task.

---

### P — Performance Measure

**What counts as success?**

Example for a robot vacuum:

> Clean as much of the room as possible without wasting resources.

---

### E — Environment

**Where does the agent operate?**

For the vacuum:

> The room.

---

### A — Actuators

**How can the agent act?**

For the vacuum:

> Wheels, brushes, suction mechanism, etc.

---

### S — Sensors

**What information can the agent receive?**

For the vacuum:

> Camera, distance sensors, dirt sensors, battery sensor, etc.

---

### Why PEAS matters

Suppose someone tells you:

> “Build an AI system for driving.”

That's too vague.

PEAS forces you to ask:

* What does “good driving” mean?
* What environment is it driving in?
* What actions can it take?
* What information can it observe?

This turns a vague AI problem into something that can actually be modeled.

#### In simple terms:

**PEAS is a checklist for defining an AI agent's problem.**

Before designing the intelligence, you need to know:

> **What success means, where the agent operates, how it acts, and what it can perceive.**

---

## 16. How the Whole Lecture Fits Together

Now we can connect the pieces.

The lecture begins with a difficult question:

> **What is AI?**

There is no single simple definition because intelligence can be viewed in different ways.

That gives us the four approaches:

**Think humanly**
↓
**Act humanly**
↓
**Think rationally**
↓
**Act rationally**

The course ultimately emphasizes the **rational-agent perspective**.

From there, we need to understand what an agent actually is:

**Environment**
↓
**Sensors / percepts**
↓
**Agent**
↓
**Decision**
↓
**Actuators / action**
↓
**Environment**

Then we need a way to determine whether the agent is doing well:

**Performance measure**

And PEAS gives us a structured way to describe the whole problem:

> **Performance + Environment + Actuators + Sensors**

This is the conceptual foundation for the rest of the course.

---

## Connection to the Other Lectures

I'm deliberately **not explaining the later lectures here**, but there are a few connections worth knowing.

#### Lecture 1 → Uninformed Search

The idea of an **agent with a goal that must choose actions** becomes the basis for search problems. The Uninformed Search deck starts from the same agent concept and describes agents as perceiving an environment and acting through actuators. 

So when you later see things like:

> initial state → actions → new states → goal

you should recognize that this is a more formal version of the **rational-agent idea introduced here**.

#### Lecture 1 → Informed Search

The later Informed Search lecture introduces heuristics for guiding an agent toward a goal. It builds on the idea that an agent is trying to make good decisions rather than simply behaving randomly. 

#### Lecture 1 → Local Search

Local search is another way of thinking about decision-making and optimization. The later lecture explicitly contrasts ordinary path-based search with problems where we care primarily about finding a good final state. 

#### Lecture 1 → Adversarial Search

The final uploaded deck extends the agent idea to environments where other agents affect the outcome. It introduces non-deterministic environments and contingency plans. 

So the overall progression is roughly:

**What is intelligence?**
→ **What is an agent?**
→ **How does an agent choose actions?**
→ **How can it search for good actions?**
→ **How does it deal with uncertainty or other agents?**

That's the conceptual bridge connecting these lectures.

---

## Key Ideas to Remember

If you come back to Lecture 1 later, these are the ideas I would prioritize.

1. **AI is not simply “anything a computer does.”**
   The lecture presents multiple ways of defining intelligence.

2. **There are four major approaches to AI:**

   * thinking humanly,
   * acting humanly,
   * thinking rationally,
   * acting rationally.

3. **Thinking humanly** focuses on reproducing human thought processes.

4. **Acting humanly** focuses on producing human-like behavior, with the **Turing Test** as the classic example.

5. **Thinking rationally** focuses on formal logical reasoning.

6. **Acting rationally** focuses on choosing actions that produce the best expected outcome. This is the main perspective adopted in the course. 

7. **Rational does not mean perfect.**
   A rational agent makes the best decision possible given its information and circumstances.

8. An **agent** perceives its environment through **sensors** and acts through **actuators**. 

9. A rational agent needs a **performance measure** to determine what “success” means. 

10. **PEAS** describes an AI problem:

    * Performance measure
    * Environment
    * Actuators
    * Sensors. 

11. AI developed from several fields, including **philosophy, mathematics, economics, neuroscience, psychology, and computer science**. 

12. **Dartmouth 1956** is presented in the lecture as a major starting point for AI as a computer-science field. 

13. **ANI, AGI, and ASI** describe increasingly broad notions of machine intelligence.

---

## Big Picture

The deepest idea in Lecture 1 is not a particular definition of AI.

It is the shift toward thinking about AI as **intelligent agents making decisions**.

An intelligent system:

> **perceives → reasons/decides → acts → receives new information → acts again**

To judge whether its decisions are good, we define a **performance measure**.

Once you think of AI this way, many apparently different AI problems start looking similar.

A robot, a navigation system, a game-playing program, and a recommendation system may look completely different on the surface, but they can all be viewed as systems that:

> **observe a situation, choose among possible actions, and try to achieve some objective.**

That is the foundation on which the search material in the course builds.

**Lecture 1 in one sentence:**

> **AI is the study of building systems capable of intelligent behavior, and this course primarily views intelligence through the lens of rational agents that perceive their environments and choose actions to achieve desirable outcomes.** 
