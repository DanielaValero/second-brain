---
tags:
  - functionalDomainModelling
  - functionalProgramming
---
#functionalDomainModelling #functionalProgramming

### What is an impossible state?


Impossible states, or nonsense states, states of the system that most likely they are a by-product of how you store your state. The occur when a combination of values in your data model happen, when should not happen.  
When this happens it means that design our data mode is done in a way that allows for impossible combinations.

### Example 1: A survey app model:

```
{
  Questions: [a,b,c], -> this can be empty
  CurrentQuestion: 'a'
}
```

In this case the questions can be empty, and the current question too.  
Alternative model:

```
{
previousQuestions:[]
currentQuestion: 'a', 
remainingQuestions: []
}
```



### Example 2:
Possible states
```
{
loading: false,
hasError: false
}
```

```
{
loading: false,
hasError: true
}
```

```
{
 loading: true,
 hasError: false
}
```

Impossible state

```
{
loading: true,
hasError: true
}
```


### Suggestions to avoid impossible states

#### Use a union type or an enum

```
type RequestState = 'loading' | 'ok' | 'error'

enum RequestedState = {
loading = 'loading',
ok = 'ok',
error = 'error'
}
```


#### Refactor models having multiple Maybe types to use enums or unions

A Maybe is a type which value can be something or nothing. In TS: 
```ts
interface {
	name?: string;
}
/** The same expressed via Generic **/
type Maybe<T> = NonNullable<T> | undefined;

type name: Maybe<string>;
```


For example, in Elm:
```elm
type alias Model =  
    { country : Maybe Country  
    , city : Maybe City  
    }
```

In TypeScript:

```ts
country?: string
city?: string
```


Impossible state: a city selected without a country.

```elm
{ country = Nothing  
, city = Just "Paris"  
}
```


An impossible state in this example is a city being selected without a country. A way to solve this we could write a function to validate that cities must have countries selected, or we could use a Union type.

in Elm:
```elm
type alias Model =  
 { destination : Destination }
 
 type Destination =  
    NotChosen  
    | ToCountry Country  
    | ToCity Country City
```

In TypeScript:
```ts

type Country = String;
type City = {
  country: Country,
  city: string
};
type notChosen = 'notChosen';
type Destination = notChosen | toCountry | City
}
```

This model makes it impossible to store a city in the data model if there is no country.

[source example city](https://medium.com/elm-shorts/how-to-make-impossible-states-impossible-c12a07e907b5)


#### Final thoughts

> If it is possible to represent states that should be impossible, then rewrite them to make them impossible.  
   Richard Feldman

Avoiding impossible states help making APIs stronger and clearer.  
In order to achieve this, we need to have a clear data model, preferably that avoids impossible states


### Further knowledge on this

> "Making the Impossible States Impossible" is just one of the type of so-called business logic errors which is possible to prevent with the help of the type system. But there are others, for example, impossible transitions. When business rules require a specific transition from one state to another. That kind of requirements is not (easily) expressible with the help of the described technique. This task is typically solved with Finite State Machines. I tried to come up with a good example for a system which doesn't allow impossible states, but still can have bugs with the impossible transition and wasn't able to do it right away, so **take this paragraph with a grain of salt**, maybe it is not the whole truth.  
  "Making the Impossible States Impossible" doesn't prevent infinite loops and doesn't prove that all states are reachable. Keep in mind, that this technique will greatly decrease the number of bugs in your application, but this doesn't mean that you [formally proofed correctness of it](https://www.hillelwayne.com/post/theorem-prover-showdown/).  
[source](https://github.com/stereobooster/pragmatic-types/blob/master/posts/making-impossible-states-impossible.md)



### References

[Source: # "Making Impossible States Impossible" by Richard Feldman](https://www.youtube.com/watch?v=IcgmSRJHu_8&list=WL&index=3)  
[source: gist with explanations](https://github.com/stereobooster/pragmatic-types/blob/master/posts/making-impossible-states-impossible.md)  
[notes of the talk](https://cadelwatson.com/blog/untitled/)
