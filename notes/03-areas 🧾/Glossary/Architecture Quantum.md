
## Quantum in Physics
the minimum amount of any physical entity involved in an interaction.

> is the minimum amount of any physical particle ([physical property](https://en.wikipedia.org/wiki/Physical_property "Physical property")) that has entropy  - Wikipedia

> A quantum (plural: quanta) is the smallest discrete unit of a phenomenon*. For example, a quantum of light is a photon, and a quantum of electricity is an electron
> 
> Quantum theory describes the behavior of microscopic particles; Albert Einstein's theory of relativity describes the behavior of macroscopic things  
> [source](https://www.techtarget.com/whatis/definition/quantum)


## Architectural quantum

Is an independently deployable component with high functional cohesion, which includes all the structural elements required for the system to function properly. In a monolithic architecture, the quantum is the entire application; everything is highly coupled and therefore developers must deploy it en mass.

[Source](https://learning.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/ch04.html#idm45678212630456)


> _Synchronous connascence_ implies synchronous calls within an application context or between distributed services that form this architecture quantum. For example, if one service in a microservices architecture calls another one synchronously, each service cannot exhibit extreme differences in operational architecture characteristics. If the caller is much more scalable than the callee, timeouts and other reliability concerns will occur. Thus, synchronous calls create dynamic connascence for the length of the call—if one is waiting for the other, their operational architecture characteristics must be the same for the duration of the call.