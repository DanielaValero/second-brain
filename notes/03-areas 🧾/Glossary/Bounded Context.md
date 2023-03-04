---
tags:
  - DDD
  - architecture
  - systemDesign
---
#DDD #architecture #systemDesign 


Bounded context is a term used in Domain-Driven Design (DDD) to refer to a specific and **isolated area within a system that has its own language, models, and rules** that are distinct from other areas of the system. In other words, a bounded context defines the **boundaries** around a particular problem domain, within which all relevant concepts, entities, and relationships can be effectively modelled and understood. By clearly defining and isolating the different bounded contexts within a system, DDD helps to prevent confusion, reduce complexity, and improve the maintainability and scalability of the system. (chatGPT)


### Quote from book

> _bounded context_, where everything related to the domain is visible internally but opaque to other bounded contexts
> ...
> Yet creating common shared artifacts causes a host of problems, such as coupling, more difficult coordination, and increased complexity. The _bounded context_ concept recognizes that each entity works best within a localized context. Thus, instead of creating a unified `Customer` class across the entire organization, each problem domain can create its own and reconcile differences at integration points.
> 
> DDD

[Source](https://learning.oreilly.com/library/view/fundamentals-of-software/9781492043447/ch07.html#sidebar-ddd)

