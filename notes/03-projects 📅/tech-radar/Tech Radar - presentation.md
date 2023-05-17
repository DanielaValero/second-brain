#technicalDecisions #techRadar 


# Tech radar
The tech radar is an advisory tool that provides insight into the current de-facto standards in a problem space, as well as past practices, and experimental techniques we use within the company. It's a visual representation of our evolving technological landscape, showing what software or methodologies we use, experiment with, or retire.

It is informed with insights coming from both external elements, such as industry trends and technological landscape, and internal elements, such as what teams are doing and using, and what skills we have in the organisation.

In summary, it helps making a decision by providing context of:

-   What everyone else is doing
-   Who has which skills
-   What are the general trends in the industry

## Benefits

-  **Creating consistency and focus of efforts in the organisation**: By providing an overview of the technological landscape the tech radar helps to create discussions about where our effort should be directed and where it should be reduced.
-  **Fosters alignment and architecture mindset:** It creates general alignment and technological understanding and promotes a broader engagement to contribute to our evolving architecture and grow the architectural mindset of our engineers.
-  **Tool to evaluate and inform decisions:** The Tech Radar helps with evaluating new technologies in a coherent manner, without jumping into the latest trend. It also provides a structure for analysing new technologies and making experiments public to the company, which ultimately leads to better decisions.
-  **Structure for experimentation and innovation**: it provides a structure to evaluate new technologies in a coherent manner (without jumping in the latest trend), to be able to analyse it whilst making the experiment public to the company and ultimately make better decisions.
-  **Cross-team collaboration and knowledge sharing**: ti helps to bring transparency to what technologies are being used, and how collaboration can happen among teams using a similar tool that don't work closely. It also gives visibility about consistency in the organisation.



## Usages of tech radar

The tech radar is a complementary decision making tool to other decision making practices that exist in our company. In practical manner, some ways to use the tech radar more actively to inform decisions in following manners:

-  **Link it to technical decision documents:** When writing and technical decision document, providing the link to the tech radar entry, to complement it with the contextual information
-  **Link it to best practices or engineering principles**: When we are writing a best practice, or an engineering principle document, we could link it to the tech radar entry. For example: Adding a note if we start using a new technology or decide to adopt a practice that was previously experimental. Which can help to keep track of how our decisions impact the technology landscape and whether we need to update our radar accordingly.
-  **Informing individual career learning path, as well as profiles to hire:** By having visibility of the landscape of technologies and practices, engineers can use it as a guide to decide in which areas they could expand their knowledge, and the hiring team can create more informed profiles


## Frequency of updates

These are guild specific to decide, common practices on this regard are quarterly or half-yearly updates. The key is to pay attention of how the radar is being consumed/or not, by the guilds or arch forum.

## Structure: Quadrants

- **Programming Languages and Frameworks.** This was just languages but we rolled frameworks into here with the October 2012 Radar.  
	- Examples: io-ts, NestJS, Swift package manager.
- **Tools**. These can be components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistence.
	- Examples: AWS Control tower, XCode Cloud,
- **Platforms**. Things that we build software on top of such as mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds.
	- Examples: backstage, AWS Database Migration Service (DMS), Teleport
- **Techniques**. These include elements of a software development process, such as experience design; and ways of structuring software, such as microservices.
	- Examples: Path to production mapping, Team cognitive load, Design tokens, Component visual regression testing

We don't make a big deal out of the quadrants — they’re really just a way to break up the Radar into topic areas. We don't think it's important which quadrant a blip goes into, unlike the rings - which generate a lot of discussion.


## Structure: Rings

Each entry goes through the following 4 stages (usually). 

  
**Adopt:** We feel strongly that we should be adopting these items, and we we should use them when appropriate on our projects. They are mature and proven in the org or one of the guilds. Our engineers know how to use them and all the tooling is there.

**Trial:** Worth pursuing. It is important to understand how to build up this capability. We don’t have yet the knowledge or capability of using these technologies. We should try this technology on a project that can handle the risk.

**Assess:** They are worth exploring with the goal of understanding how they could affect our practice. They are to be considered, but not necessarily trial yet – unless you think they would be a particularly good fit for a specific project, for which you have a technical decision document (ADR, RFC). Technologies in this stage are interesting and worth keeping an eye on.

**Hold:** We can proceed using them but with caution. These technologies are to be retired/deprecated.

A recent alternative to these rings is the introduced in the [Build your own tech radar tool](https://www.thoughtworks.com/radar/byor) from thought works which are: “experiment”, “adopt”, “hold” and finally “retire”
  


## FAQ

## Must I use only what is in tech radar?

The tech radar is advisory in nature. If you have the need to use a technology or practice that is not in tech radar, you can use it. However, if you chose to use it, and skip tech radar, you would be missing an opportunity, as well as the benefits we have highlighted in this document. 

What is important here is to understand why we encourage you to do this, which we try to explain below:

The tech radar aims to provide an overview of what we use in the organisation, technical trends, and climate within the company. And also helps having transparency over what technologies are we experimenting with, bringing up possibilities of collaboration and knowledge sharing.

One of the primary goals of the tech radar, is to serve to make better decisions, independently of what, you want to make informed decisions, so that when you look at the past, you feel good with yourself about the decision you made, because you made the best decision you could, provided the knowledge and resources you had at the time.

So, If you find yourself in the need of making a technical decision for something that is not in tech radar, a way to go would be:

-   Write a technical decision document such an ADR or an RFC
-   Share it with the members of your guild _(you can also share a draft of a technical decision)_
-   Get feedback (making your decision more informed), and discuss about bringing it to tech radar under assess.

The benefits of contributing to tech radar in this particular case go to you as an engineer with knowledge, to your team with stronger decisions, and to your guild and our engineering domain with transparency, visibility and ultimately evolving our technological landscape.

---
