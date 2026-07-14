---
title: "AI and cognitive load"
date: "2026-07-14"
---

### Good times (?)

> "Code is read more often than it is written". 

This line immediately comes to mind when someone talks about the book Clean Code. Indeed, as Guido Van Rossum has popularized, developers have long spent more time reading and digesting each line of code rather than writing new ones. This was the norm for decades, until now. In 2022, when i was in my second year of university, chatgpt was released. Though it didn't change the fundamental use of VSC as a code editor, it augmented the way i looked for answers. Of course, i could google "how do i check for duplicate installations of python on my mac", and scan through 3 or 4 Stack Overflow threads before i find a crowd upvoted answer and tried my hand at it. But what it augmented was the effort it took to find a relevant answer. (With relevancy being closely tied to attention mechanisms. Correctness, on the other hand, is a different story). 

In 2023, copilot landed (gotcha). That changed the way we were learning in class, completing assignments, and even forcing the school to modify the way they conducted lab tests. Those times were much simpler, tab to auto-complete, and then taking anywhere between 5-60 seconds reading what was generated, depending on how long copilot took to generate that block. Pair programming with copilot required involvement, learning new functions, structure and syntax along the way. Looking back, i think involvement was very much underrated - something about a sense of ownership and accomplishment about piecing together something that seemed elegant, yet made sense.

### Code is more of a liability than before

The advances in AI in the past year (i.e. RAG, agentic AI, MCPs, harness engineering, Fable 5) were incredible. Pairing with AI (much less a person) has become a thing of the past. The ecosystem has become so powerful that code is more often written that it is read, not by humans atleast. Sometimes it scares me and i start to question when i'll become obsolete. Fundamentally, code has become a commodity. Marginally, the cost of output is so low since models can get it perfect in one try. I think this brings a whole new set of problems that make software engineering much more important. Software engineering is about delivering functionality with less complexity. That's why so many principles / tools revolve around keeping things simple (think D-R-Y, SOLID, component-driven UI, type safety etc.). With claude handling all that, the things that i now wrestle with are - maintaining a clear mental model of the codebase, and offloading the memory of knowledge specific to the problem at hand to the ecosystem. 

I've attempted to keep up with the commits Claude makes to be more in touch with the repository in a few sessions, even assigning shortcuts to toggle line changes and installing extensions to organize them for digesting, but i found the bottleneck to be my brain. Digesting them takes up so much mental effort that i often get drained quicker than i'd imagined. The frustration it borught reminded me of this from the article - [cognitive load](https://github.com/zakirullin/cognitive-load)

![alt text](cognitive_load_illustration.png)

### Bottleneck Shifts

This [talk](https://www.youtube.com/watch?v=ByOF8qByGHU) by Farhan Thawar (Shopify's Head of Engineering) was useful in helping me realize that this was simply an effect of removing a bottleneck in the process of optimizing a system. Say you're at Yochi[^yochi], and you want to enjoy your order without having to stand in line for 30 minutes. People spend the most time picking their toppings because they can't decide what to pick literally until they see what's available and what looks good. So the shop decides to place this big display of all the toppings, along with their price outside the store so people queuing can already shortlist or discuss what they want. Now, you (and everyone else before you) waste no time with decorating it with your favourite toppings. But you're still standing in line after that's done, and the reason is that it takes time for the staff to weigh your order before you know how much to pay. Simply put, the bottleneck of getting Yochi simply shifted downstream because the previous station became more efficient. 

Similarly, the pace at which claude code on xhigh effort + ultracode is blazing through puts an immense strain on my cognitive ability to 
1) understand how the codebase is evolving 
2) learn from the mistakes that it had validated 
3) figure out what i was trying to do in the first place

*The list could go on but we shall not embarass ourselves much more*

An experienced franchisee would notice the new bottleneck and install automated weighing stations and payment terminals (with the vigilance of staff of course...). But now, you struggle to find a seat in the shop packed with customers. This goes on until everything else that stands between you and a satisifed craving is made more efficient. I'd expect the same to play out as we learn to adapt to using AI.


### How I Cope

Like what people have described, my job as a software engineer has shifted from being a driving the SDLC loop to ensuring that the loop goes on in the right direction. The following (in respective order) are what i find useful in aiding me cognitively  
1) Define a glossary. Keywords are best at encapsulating what problems you are trying to solve. Having them at the top of each .md makes it easier for anyone to nail down the context
2) Persist lessons in programmatic memory. This can be as simple as a `CLAUDE.md` collecting debunked findings, `SKILLS.md` capturing procedural memory, or more complex "semantic memory"[^semantic_memory] layers. While semantic memory can be another pain to manage, tools[^tools] like [Mem0](https://github.com/mem0ai/mem0) and [Mnemon](https://github.com/mnemon-dev/mnemon) saves you much of the trouble. 
3) Go slow. Having to keep up with the pace of machines is impossible. I find it helpful to pause, scroll back to read, and take a break to stretch when i find myself reading the same sentence thrice. 

[^yochi]: for the less informed, it's an australian froyo franchise that somehow has a long queue everytime you walk past it at Orchard
[^semantic_memory]: deals with storing and retrieving facts, meanings, and concepts rather than exact keyword matches 
[^tools]: Mem0 is cloud-first API that specializes in remembering info about users while Mnemon is an LLM-supervised, local binary for graph-based agent memory powered by SQLite.        

