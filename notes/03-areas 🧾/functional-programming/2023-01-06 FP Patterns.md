
> A [software pattern](https://oreil.ly/TILR8) is a reusable solution to a commonly occurring problem within a given context in software design. Software patterns mean that we do not have to start from scratch every time we write code. A software pattern is a template for solving a type of problem.

> Functional programs use code constructs that are **immutable**, obey **referential transparency**, use **higher order functions**, and make liberal use of functional patterns.

category theory based  
Functor, Monoid, and Monad patterns


### Patterns
#### Option pattern
_The `Option` class comes in two flavors: `Some` and `None`._

The Option pattern is perfect for problems that involve a `null` value. The idea is to have an object represent the case that nulls are used for but to do it with a type. The `Option` trait addresses this problem exactly. `Option` comes in two flavors. `Some()`, a wrapper around a value, such as `Some(user)`, and `None`, which represents the case where there is no answer, the case often expressed by `null`. But `None` has a type and so the compiler can check that the code is correct.





## Sources
[Learning Functional programming](https://learning.oreilly.com/library/view/learning-functional-programming/9781098111748/ch03.html) by Jack Widman in aug. 2022
