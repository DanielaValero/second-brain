#functionalDomainModelling #functionalProgramming #functionalProgramming 

### What is an impossible state?
Impossible states, or nonsense states - states of the system, which doesn't make any sense, most likely they are a by-product of how you store your state.

An impossible state happens when a combination of data happens that should not happen. It happens when we design our data model in a way that allows for impossible combinations to happen. 


Practical implications:
-   Use the type system to describe what is possible or not. If something is not possible, it should not compile.
-   Another way to look at it is: use types as if they were tests that you won't need to write. Think about `nullable`, for example... if it's not marked with `?` you _know_ it's not `null`

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

Solution: Use an union type (or enum)

```
type RequestState = 'loading' | 'ok' | 'error'
```



### Suggestions to avoid impossible states

#### Use a union type (in FP languages) or an enum in TS

```
type RequestState = 'loading' | 'ok' | 'error'
```

#### Avoid multiple a Maybe types or in TS types that can be undefined or something

For example:

elm

```elm
type alias Model =  
    { country : Maybe Country  
    , city : Maybe City  
    }
```

ts

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


A way to solve this we could write a function to validate that cities must have countries selected, or we could use a Union type.

elm
```elm
type alias Model =  
 { destination : Destination }
 
 type Destination =  
    NotChosen  
    | ToCountry Country  
    | ToCity Country City
```

ts
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



### Further suggestions from the talk of Richard Feldman

> If it is possible to represent states that should be impossible, then rewrite them to make them impossible.

- A clear data model leads to a clear API.
- Expose functions to access data: to revise implementation not to break user's builds


### Further knowledge on this
> "Making the Impossible States Impossible" is just one of the type of so-called business logic errors which is possible to prevent with the help of the type system. But there are others, for example, impossible transitions. When business rules require a specific transition from one state to another. That kind of requirements is not (easily) expressable with the help of the described technique. This task is typically solved with Finite State Machines. I tried to come up with a good example for a system which doesn't allow impossible states, but still can have bugs with the impossible transition and wasn't able to do it right away, so **take this paragraph with a grain of salt**, maybe it is not the whole truth.
  "Making the Impossible States Impossible" doesn't prevent infinite loops and doesn't prove that all states are reachable. Keep in mind, that this technique will greatly decrease the number of bugs in your application, but this doesn't mean that you [formally proofed correctness of it](https://www.hillelwayne.com/post/theorem-prover-showdown/).
[source](https://github.com/stereobooster/pragmatic-types/blob/master/posts/making-impossible-states-impossible.md)



### References

[Source: # "Making Impossible States Impossible" by Richard Feldman](https://www.youtube.com/watch?v=IcgmSRJHu_8&list=WL&index=3)
[source: gist with explanations](https://github.com/stereobooster/pragmatic-types/blob/master/posts/making-impossible-states-impossible.md)
[notes of the talk](https://cadelwatson.com/blog/untitled/)
