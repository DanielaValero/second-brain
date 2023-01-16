



















When evaluating many operational architecture characteristics, an architect must consider dependent components outside the code base that will impact those characteristics. ->  _architecture quantum_.

> Architecture quantum
An independently deployable artifact with high functional cohesion and synchronous connascence


* Independently deployable: have all the parts embeded, including DB (bounded context from microservices)
* High functional cohesion: 
	* _Cohesion_ in component design refers to how well the contained code is unified in purpose
	* _High functional cohesion_ implies that an architecture quantum does something purposeful
	* Synchronous connascence
> _Synchronous connascence_ implies synchronous calls within an application context or between distributed services that form this architecture quantum. For example, if one service in a microservices architecture calls another one synchronously, each service cannot exhibit extreme differences in operational architecture characteristics. If the caller is much more scalable than the callee, timeouts and other reliability concerns will occur. Thus, synchronous calls create dynamic connascence for the length of the call—if one is waiting for the other, their operational architecture characteristics must be the same for the duration of the call.

### Terms

> Bounded context
> _bounded context_, where everything related to the domain is visible internally but opaque to other bounded contexts
> ...
> Yet creating common shared artifacts causes a host of problems, such as coupling, more difficult coordination, and increased complexity. The _bounded context_ concept recognizes that each entity works best within a localized context. Thus, instead of creating a unified `Customer` class across the entire organization, each problem domain can create its own and reconcile differences at integration points.
> 
> DDD
> https://learning.oreilly.com/library/view/fundamentals-of-software/9781492043447/ch07.html#sidebar-ddd

> Connascence
    Two components are connascent if a change in one would require the other to be modified in order to maintain the overall correctness of the system
>   
> 1996, Meilir Page-Jones. _What Every Programmer Should Know About Object Oriented Design_ (Dorset House)

Types of Connascence

_static_, discoverable via static code analysis, and _dynamic_, concerning runtime behavior.

For dynamic connascence, we define two types: _synchronous_ and _asynchronous_. Synchronous calls between two distributed services have the caller wait for the response from the callee. On the other hand, _asynchronous_ calls allow fire-and-forget semantics in event-driven architectures, allowing two different services to differ in operational architecture

Source: https://learning.oreilly.com/library/view/fundamentals-of-software/9781492043447/ch07.html#idm45838980141744
