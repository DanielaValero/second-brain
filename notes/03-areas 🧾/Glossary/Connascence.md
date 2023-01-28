#softwareDesign 

## Connascence
> 
    Two components are connascent if a change in one would require the other to be modified in order to maintain the overall correctness of the system
>   
> 1996, Meilir Page-Jones. _What Every Programmer Should Know About Object Oriented Design_ (Dorset House)

### Types of Connascence

* **Static**, discoverable via static code analysis, 
* **Dynamic** concerning runtime behavior.
	* **Synchronous:**  calls between two distributed services have the caller wait for the response from the callee
	* **Asynchronous:**  calls allow fire-and-forget semantics in event-driven architectures, allowing two different services to differ in operational architecture

[Source](https://learning.oreilly.com/library/view/fundamentals-of-software/9781492043447/ch07.html#idm45838980141744)
