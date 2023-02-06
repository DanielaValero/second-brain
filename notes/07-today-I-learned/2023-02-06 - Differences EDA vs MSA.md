#architecture #eventDriven #microservice 


### Key differences

| Differentiators |     EDA      | MSA |
|----------|:-------------:|------:|
| Service granularity | Not constrained. Can be any size | Constrained to single responsibility principle |
| Data granularity | Not constrained. Can be 1 monolith database all the way to 1 DB per event processor   |  Constrained 1 BD per service |
| Bounded context (1) | Doesn't constrain the design | Constrains the service design |


EDA has no constrains on any of the main differentiators, we can define an EDA system with similar constrains as an MSA system has, where each event processor has its own data attached, and small enough to fulfil the single responsibility principle. However this is not a must

### Hybrids

We can also create hybrids of these two architectures, for example:
- An EDA where the event processors are as well micro services
- A MSA where there are event processors within the system


### Further differentiation
 A microservice can contain an event processor as part of its implementation, but an event processor is not necessarily a microservice. 
 
 An event processor is a component that is more focused on handling events.
 
 A microservice is a more general-purpose component that can contain multiple event processors, as well as other types of functionality.



### Related terms
* Bounded context [web link](../03-areas/Glossary/Bounded Context) or [obsidian link](obsidian://open?vault=learn-in-public&file=notes%2F03-areas%20%F0%9F%A7%BE%2FGlossary%2FBounded%20Context)
* Microservice [web link](../03-areas/Glossary/Microservice) - [obsidian link](obsidian://open?vault=learn-in-public&file=notes%2F03-areas%20%F0%9F%A7%BE%2FGlossary%2FMicroservice)
* Event processor [web link](../03-areas/Glossary/Event processor) - [obsidian link](obsidian://open?vault=learn-in-public&file=notes%2F03-areas%20%F0%9F%A7%BE%2FGlossary%2FEvent%20processor)

Learned from: [Lesson 131 - Microservices vs. Event-Driven Architecture  
(posted January 31, 2022)](https://www.developertoarchitect.com/lessons/lesson131.html)