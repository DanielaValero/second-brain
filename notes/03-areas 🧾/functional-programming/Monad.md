---
tags:
  - functionalProgramming
  - fpTerm
  - monad
---
#functionalProgramming #fpTerm #monad


# Monad

Source: [https://github.com/getify/Functional-Light-JS/blob/master/manuscript/apB.md/#appendix-b-the-humble-monad](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/apB.md/#appendix-b-the-humble-monad)

"A monad is a data structure. It's a type. It's a set of behaviors that are specifically designed to make working with a value predictable."

* functors: a value along with a map-like utility to perform an operation on all its constitute data members.

A monad is a functor that includes some additional behavior.

Actually, a monad isn't a single data type, it's really more like a related collection of data types. It's kind of an interface that's implemented differently depending on the needs of different values. Each implementation is a different type of monad.

What is a monad, anyway? A monad is a value type, an interface, an object data structure with encapsulated behaviors.

But none of those definitions are particularly useful. Here's an attempt at something better: a monad is how you organize behavior around a value in a more declarative way.


