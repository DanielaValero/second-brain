---
tags:
  - softwareConcepts
  - basicConcepts
  - softwareDesign
---
#softwareConcepts #basicConcepts #softwareDesign 

### Coupling

According to the structured design movement, the strength of coupling depends on:

1.  The types of connections between modules.
2.  The complexity of the interfaces of the modules.
3.  The type of information going through the connection.

https://thevaluable.dev/cohesion-coupling-guide-examples/



I’ve a simple rule: if the implementation is trivial, using a library should be avoided.

The first solution can be a good one if we try to follow the guidelines we saw above:

1.  Couple our modules only using the minimum amount of interfaces needed.
2.  Passing only the minimum amount of parameters needed via the interface(s).
3.  Passing only data and avoiding altering the control flow of our modules.
4.  Not relying on another, more global module.



when to create an abstraction?
1.  If it never changes, there is no problem.
2.  If the logic change often enough that it gets annoying to maintain the same piece of code in two different places, or worst, if developers begin to forget to change one implementation and not the other, I would extract it to its own module.
3.  If more modules use exactly the same piece of code, and if this common code seems to [codify the same knowledge](https://thevaluable.dev/dry-principle-cost-benefit-example/), I would extract it in its own module.



**Coupling** is about connections _across the boundaries_ of different modules, while **cohesion** is about the connections between the _elements inside the boundary_ of a module.


A module is considered strongly cohesive when its elements should belong together; when they form a functional whole. To say it differently: the elements of a module should aim for the same goal; they should try to solve the same domain problem.


What are the benefits of a strongly cohesive module?

1.  If you need to change some logic, it’s easier to reason about a module when its elements have strong commonalities.
2.  Cohesive elements often change together. No need to think about changing multiple modules and their interfaces, when everything you need is in one module.
3.  When you have strong cohesion, you normally reduce the connections between other modules, because you have everything you need inside the module itself. In short, increasing cohesion reduces coupling.



Here’s the guideline I’m trying to follow when I’m building an application:

1.  Building cohesive modules is the priority. I aim for functional, sequential, or communicational cohesion. Cohesion should be about problem domains, not about technical concerns.
2.  If I can’t be as cohesive as I want to, I ask myself why. If no good reasons can be found, I try to aim for higher cohesion.
3.  I look at the connections between the different modules while building them if I can, or afterward. I ask myself: are there good reasons to couple these modules? How can I reduce the coupling?



Here are more questions we can ask ourselves while coding:

-   What would happen if we had to change this module? Would we need to change other modules at the same time? If yes, should we refactor these modules to make them more cohesive (and, therefore, less coupled)?
-   Should we reduce the scope of this module? Can we modify it easily, or does it take time, because it’s too big for our poor brains to reason about? Should we consider creating two (or more) modules instead?

