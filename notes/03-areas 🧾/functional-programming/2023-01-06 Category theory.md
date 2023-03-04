---
tags:
  - functionalProgramming
---
#functionalProgramming 

Category theory is a branch of mathematics initially concerned with finding similar constructs within different areas of mathematics. It is a unifying theory. It later was applied to FP.


### Parts


In category theory, _objects_ can be anything: sets, numbers, matrices, just to name a few. In addition to having objects, a category also needs something called morphisms. A _morphism_ can be defined only in the context of two objects from the category. Let us suppose that _A_ and _B_ are objects from a category _C_. Then a morphism is an arrow from _A_ to _B_.

We write it like this:

-   _A_ → _B_
    

But what does an arrow mean, exactly? Well, it connects object _A_ to object _B_. Where the arrow starts and where the arrow ends is the information that defines the morphism.



> In category theory, _objects_ can be anything: sets, numbers, matrices, etc


> A morphism from object _A_ to object _B_ is an arrow from _A_ to _B_. You could also think of it as a pair of objects in a particular order.

> First, morphisms compose. What does this mean? We will give the actual definition of two morphisms composing, but the general idea is that when you compose two morphisms, you call one morphism and then apply the second morphism to the result of calling the first morphism. Example:
> 
_f_: _A_ → _B_ is a morphism, and _g_: _B_ → _C_ is a morphism. Since we are in a category, there must exist a morphism _h_ from _A_ to _C_ satisfying:
> If _f_ is a morphism from _A_ to _B_, and _g_ is a morphism from _B_ to _C_, then there must exist a morphism _h_ from _A_ to _C_ where for all _x_ in _A_, _h_(_x_) = _g_(_f_(_x_)). In this case, we denote _h_ with the expression _g_ o _f_ and call it _f composed with g_.

-   _h_(_x_) = _g_(_f_(_x_))


> A set is just a collection of objects. The objects can be numbers, people, or even other sets. We are about to consider the category whose objects are _all_ sets.


> The identity function on a set A is the function that maps every element to itself. The category theory version of this is that the identity morphism on _A_, denoted _idA_, when it composes with another function, leaves that function unchanged.
> -   _idB_ o _g_ = _g_


> Category theorists tend to think not in terms of points, but rather in terms of composition of functions. The earlier expression is how you express the identity function in category theory in terms of composition.... Instead of saying identity morphism takes every point in the object to itself (because we don’t think about the points), you say that when you compose the identity morphism with another morphism, you get the original morphism back.


> A semigroup is a non-empty set with an associative binary operation on it.
> 
> A _semigroup_ has two main parts, a set of elements, (could be any non-empty set) and a binary operation on the set. A binary operation, like multiplication for whole numbers, takes two things and returns a third thing. There is one condition that must hold. The binary operation must be associative. We will denote the binary operation with an asterisk (*).

> In a semigroup, we often call the binary operation multiplication, even if it is not necessarily the usual multiplication of numbers.


Functor
Is a function that when gets a type applied, produces another type:
`List[String]` is not a functor. It is a type. `List` by itself is a functor. When you apply it to a type, like `String`, for example, you get a type. This is why, in Scala, a functor is also called a type constructor.
(given two categories: _C1_ and _C2_.)
Then a functor _F_ from _C1_ to _C2_ is a function from the first category to the second category, which satisfies the following properties.

1.  _F_ takes objects in _C1_ to objects in _C2_. (Just like `List` takes `String` to `List[String]`.)
    
2.  _F_ takes morphisms in _C1_ to morphisms in _C2_. (What `List` does to a morphism is trickier. It involves the `map` function and we will address this next.)
    
3.  _F_(_f_ o _g_) = _F_(_f_) o _F_(_g_) whenever the morphism domains and codomains of _f_ and _g_ line up.


This condition basically means that the two categories _C1_ and _C2_ have similar structure with respect to morphisms. The idea to keep in mind when considering functors is that they measure how similar two categories are.

Functors turn up in FP anywhere there are types that implement the `map` function. Think `functor` = mappable trait (or interface).


 In category theory, the `map` function is what you get when you apply a functor to a morphism.
We know that there are three properties a functor from category _C_ to category _D_ must satisfy:

-   A functor `F` takes objects in _C_ to objects in _D_. In the case of the category Scal, this means `F` takes Scala types to Scala types.
    
-   `F` takes morphisms in _C_ to morphisms in _D_.
    
-   A composition property, seen here:
    
    _F_(_f_ o _g_) = _F_(_f_) o _F_(_g_)$ where _f_ and _g_ are morphisms.

-   They always have a map function.
    
-   They can always be composed.


## Monoids

As I mentioned earlier in the chapter, a semigroup is a set with an associative operation on it. If a semigroup has an identify element, which means an element _e_ in the semigroup with the property that: _e_ * _x_ = _x_ * _e_ = _x_ for all elements _x_ in the semigroup, the semigroup is called a _monoid_.


### Categories

#### Set
The objects are all sets. What are the morphisms? Simply all functions from _A_ to _B_. Every function from _A_ to _B_ is a morphism. So the category Set is the category whose objects are sets and morphisms are functions from _A_ to _B_, for all pairs of sets, _A_ and _B_. _A_ is called the domain of the morphism and _B_ is called the codomain of the morphism

## Sources
[Learning Functional programming](https://learning.oreilly.com/library/view/learning-functional-programming/9781098111748/ch03.html) by Jack Widman in aug. 2022
