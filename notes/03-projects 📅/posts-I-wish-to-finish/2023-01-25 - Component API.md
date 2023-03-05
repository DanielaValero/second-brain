---
tags:
  - web
  - components
  - developIdea
---
#web #components #developIdea

**What is?**  
An API is an interface that allows an encapsulated software component to communicate with the outside world. 

Designing UI components can also be thought in the same manner, an UI component should be encapsulated, and its props are what allow it to communicate with the outside world.

Therefore, the props of the component are the API of the component.

As any API, if design principles were not thought through, evolved and agreed upon, they might end up being hard to use, hard to configure, and overtime become unmaintainable or unused.


**Ideas of design principles**

**1 Make impossible states impossible:**  
State pattern: An object should change its behavior when its internal state changes.  
An impossible state in a UI component happens when two or more properties collide or override each other, letting the component to "not know" what should do.

ie: 
```html
<alert warning> hola</alert>
<alert success> hola</alert>

Impossible state:
<alert warning success> hola</alert>

```

A fix for this could be use an Enum instead of a Boolean to set the behaviour of the component.
```html
<alert state="warning"> hola</alert>
```


* [Original principle from Elm](https://sporto.github.io/elm-patterns/basic/impossible-states.html)
* [Kent Dods article](https://kentcdodds.com/blog/make-impossible-states-impossible):  


**2. Use Types for the props, and inside the components:**  
Maybe avoid booleans, and try to use enums instead of strings for prop types so you can make it easy to pass the specific values allowed by your prop.


**3. Be consistent with names across all components**  
ie: use always the same prop name for props that do the same thing across components. ie: `variant`

**4. Minimize boolean usage**
> Boolean ambiguity can lead to loss of intent and loss of information in our code, resulting in ambiguous logic. To avoid this issue, we should prefer self-documenting alternatives whenever the intention is unclear.




[Inspiration guides](https://sporto.github.io/elm-patterns/basic/type-blindness.html)

[Inspiration article])(<https://hackernoon.com/principles-of-component-api-prop-design-bb20cd58da54)>