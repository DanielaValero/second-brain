


**Goal:**

Quality + Efficiency + Consistency

Our web experience should be nothing less than trying to adapt to the user’s needs

>  As our designs become more modular and pattern-driven, the value of *media* queries has decreased


**Problem:**

We need to provide **efficiently** visual **consistency**, while we build a product with high **quality** that is in the future **accessible** to every user.



**Long term solutions**

- Global pattern lib
  - too much work. We dont have to have a code global pattern library in order to let patterns arise
  - Does your pattern library say how and when a pattern is meant to be used? If the design of your image/caption pattern was shaped outside forces — by the kind of content inside it, by business requirements — are those considerations, those *tradeoffs* documented in your pattern library?


**Short term alternatives**
- Mindset of: Scale processes and delivery together with UX team
- Build patterns (maybe not even yet in a global pattern lib), focus the effort on discussing and documenting rising patterns in the context of *how* and *why* they were made. Reasoning is what enables a collection of patterns to mature into a fully-realized design system. We should keep defining how patterns look, how they’re built, and how to integrate them into our websites — but we don’t have to stop there. We can also better describe the compromises we make — the forces we resolve — when we design (and use) our patterns
- Define UX/UI guidines on how devs create/implement work (and not in mocks/design)
	- ie: Content page: when to use which vertical spacing. When which headline. And so on
- Get UI/UX giving feedback as soon as possible
	- ie: Involve UX  in the code reviews / release reviews



**Research**



**Limitations of current responsive design**

> Once the screen is this size *and* the element appears in a different, smaller container, use a narrower layout on this element.”
>
> But, well, that’s weird. Why can’t we apply styles based on the space available to the *module* we’re designing, rather than looking at the shape of the viewport?



**How applies to new obi:**

Desigerns design with responsive design in mind, viewport media queries and grids

Developers do components, and deliver fragments, that dont know what space available there is.

**Problem**: Building a UI in our scenario, based on the "old" mindset, risks our solution to have to catter for weird layout issues, UI not fititing grid etc.

**Solution**: Design components and patterns, and make them fill the space available, with container queries for example



### Mind switches in building UI in 2021

> The future of the web and design is just getting more complex and we need to adapt and challenge ourselves to be comfortable with what that means to craft these experiences.



![image of the new responsive](https://miro.medium.com/max/2000/1*UH74lSesLFbEyGP9Ec425A.png)

source https://uxdesign.cc/the-start-of-a-new-era-for-responsive-web-design-6658a6bbeb9b

**Switch to component's thinking**

> When we talk about components, I’m referring to elements on the page that could be comprised of a collection of other elements



> in the last few years, my design work has focused much more on [patterns](https://ethanmarcotte.com/wrote/pattern-patter/), and less on “pages.”  ... In other words, my design process involves looking at a responsive design as a network of *small layout systems*. Each of those components are basically little responsive designs themselves, with their own sets of breakpoints.
>
> Ethan Marcotte





> **A unified design language shouldn’t be just a set of static rules and individual atoms; it should be an evolving ecosystem.**



**Task:**

[] Introduce Component's thinking to designers. 

[] Forster mindset switch from pages to patterns

[] Define design tokens

[] Identify with designers UI patterns

[] Start moving rising patterns to a Figma pattern lib, so they can be reused in design

[] Shift less documentation: documenting throughout the creation process allows for smoother decision-making. Avoids confusion when teams scale



**How to decide that a UI pattern is robust enough to go to pattern Lib**

- **Uniqueness:** Is this design pattern necessary, or can we use an already-built pattern instead? What new thing does this pattern offer us?
- **Reusability:** Is this design pattern abstracted enough to be reused elsewhere in the application? (Whether it’s the code that’s abstracted, or the general concept of the component itself.)
- **Statefulness and Interactivity:** Have we covered all bases regarding state with this component? We use [this checklist](https://gist.github.com/alishalisha/7fe8b7e8af79c4487bb9f4d859abc69f).
- **Clarity (in language, motion, and code):** If code is presented, is it clear? Does it follow our code styleguide? (We use BEM, mixed with utility/helper classes.) If copy is present, is the language clear and friendly, or is there ambiguous terminology present? (Ideally, you’d have a UI copy styleguide to check against.) If animation is present, is the transition clear and does it make sense, or is it superfluous and confusing? Can you conduct user testing to find answers to these questions?
- **Responsiveness:** Depends on the product, but most products should be small screen friendly. Does your design pattern scale gracefully?
- **Accessibility:** If code is presented, does it follow [accessibility](http://bradfrost.com/blog/post/clarity-conf-baking-accessibility-in/) guidelines? If colors are used, does the pattern pass color contrast tests?

source: https://product.voxmedia.com/2016/4/20/11458814/how-designers-can-use-unit-testing-to-build-resilient-and-happy-design-systems





**Users have now prefference based media queries**

> Preference-based media queries would allow us to adapt our User Experience to be specific to a particular user’s experience.

```
@prefers-reduced-motion: Does not have annimations, or has reduced animations
@prefers-contrast
@prefers-reduced-transparency
@prefers-color-scheme: allows us to change our design to light or dark mode
@inverted-colors
```



**Task:**

[] Add to DoD of developers to use the prefference media queries

[] Document in styleguide alternatives found for the prefference media query

[] Identify with designers what can be prepared during design phase and what can be prepared during dev phase

[] Include in global Obi brand style guide alternatives for these queries





**Adopt container queries in the design system**

> container queries would allow us to set rules based on the parent container, rather than the overall page. his means that any component is more self-contained, aligned to modern design systems, and truly become plug-and-play modules that could be moved to any page or layout without having to reconsider everything based on its new environment.



> *Container* queries will allow developers to vary the layout within specific elements on a page (and their children) based on the dimensions of the parent elements themselves, allowing for much more modular approaches to layout.
>
> http://ricg.io/







**For HeyObi Web**

#### By using BEM together with utility classes, the HTML is easier to read and customize.

Use BEM for:

- DRY-ing the HTML from the CSS you don’t plan on customizing (e.g., behavioral CSS-like transitions, positioning, hover/focus effects),
- advanced animations/effects.

Use utility classes for:

- the “frequently-customized” properties, often used to create component variations (like padding, margin, text-alignment, etc.),
- elements that are hard to identify with a new, meaningful class name (e.g., you need a parent element with a `position: relative` → create `<div class="position-relative"><div class="my-component"></div></div>`).

source: https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/

https://codyhouse.co/ds/docs/framework/utilities







**Glossary**

- Pattern Lib
- UI Lib
- Design System
- Design Token
- Component
- Style guide
- Living style guide
- Pattern:  
  - On the web, we think of patterns as reusable interface components . The pattern’s value comes out of how reusable it is. a pattern never exists in isolation. It is always defined by, and shaped by, its environment. “**Patterns are not rules.** They represent our shared understanding of design solutions.”
- Design pattern:   [reusable](https://en.wikipedia.org/wiki/Reusability) solution to a commonly occurring problem within a given context in [software design](https://en.wikipedia.org/wiki/Software_design). Design patterns are formalized [best practices](https://en.wikipedia.org/wiki/Best_practice) that the programmer can use to solve common problems when designing an application or system.





**Resources**

https://uxdesign.cc/the-start-of-a-new-era-for-responsive-web-design-6658a6bbeb9b

https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/

https://ethanmarcotte.com/wrote/on-container-queries/

https://ethanmarcotte.com/wrote/pattern-patter/

https://airbnb.design/building-a-visual-language/

https://product.voxmedia.com/2016/4/20/11458814/how-designers-can-use-unit-testing-to-build-resilient-and-happy-design-systems