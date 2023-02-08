#functionalProgramming #fpTerm #monad

### Definition from Haskel

A maybe is a monad 
The **Maybe** type is defined as follows:

 ```
 data Maybe a = Just a | Nothing

```

Represent values that may or may not exist. It can be useful if you have a record field that is only filled in sometimes. Or if a function takes a value sometimes, but does not absolutely need it. (this is from [elm](https://package.elm-lang.org/packages/elm/core/latest/Maybe))

```

    { name : String
    , age : Maybe Int
    }

tom = { name = "Tom", age = Just 42 }
sue = { name = "Sue", age = Nothing }
```



**Maybe** satisfies the [type](https://wiki.haskell.org/Type "Type") equation ![F X = 1 + X](https://wiki.haskell.org/wikiupload/math/5/5/9/55963230f8d8d66975c7aacaf235088c.png), where the functor ![F](https://wiki.haskell.org/wikiupload/math/8/0/0/800618943025315f869e4e1f09471012.png) takes a set to a point plus that set.

[source](https://wiki.haskell.org/Maybe)


### Definition from flow
It's common for JavaScript code to introduce "optional" values so that you have the option of leaving out the value or passing `null` instead.

Using Flow you can use Maybe types for these values. Maybe types work with any other type by simply prefixing it with a question mark `?` such as `?number` as a sort of modifier.

Maybe types accept the provided type as well as `null` or `undefined`. 

[source](https://flow.org/en/docs/types/maybe/)


### Maybe type in Typescript

It is something or nothing.
In JS nothing can be: null or undefined. Due to [this]([there is a nice article by Sourav Debnath about the typeof null bug](https://dev.to/_ravo_lution/why-typeof-null-is-object-181)) is better to define the `Nothing` as undefined.

If an API returns null, then could use something like this:
```
function convertToMaybe(value) {
  return value ?? undefined;
}
```

Or in TS terms, could be:

```
type Maybe<T> = NonNullable<T> | undefined;
```


This is a Generic type of the name T.

Generics act as a placeholder for a future type not yet decided. Generics let us pass in a type, much like how we pass arguments to a function. We are then using the Generic `T` to pass into the `NonNullable` type, which basically ensures that `T` can't be `null` or `undefined`. We are then using the union type operator, `|`, to also allow `undefined` as an allowed value.