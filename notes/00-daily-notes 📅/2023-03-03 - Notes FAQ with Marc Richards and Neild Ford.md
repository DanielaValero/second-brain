---
tags:
  - architecture
  - adr
  - architectureCharacteristics
  - technicalDecisions
  - technicalDocumentation
  - theArchitectRole
---


#architecture #adr #architectureCharacteristics #technicalDecisions #technicalDocumentation #theArchitectRole 


link: <https://www.developertoarchitect.com/foundations-friday-forum.html>

### Intro

Every first Monday of the month there is an Ask Me Anything about architecture call with Marc Richards and Neil Ford.

The session happens every first Monday of the month, from 17:00-18:00 CET, they are free and you can [register to attend here](https://www.developertoarchitect.com/foundations-friday-forum.html)

I have been learning from them the practice of Software Architecture for a while now, and I have found the sessions to be a fantastic place to learn how the sometimes theoretical knowledge I’ve learned from them, applies to real world situations.

The topics covered in each session vary, can be high level things, could be specific architecture things.

This time I took some notes on the questions that were asked, and the answers they gave. First for me, and to keep in my [second-brain](https://notes.danielavalero.com/), but also to be able to come back and process the information slower.

I am sharing below the notes I took here as an experiment to share with who might find this information interesting.

### Notes

Topics covered

**#ADRs** **#architectureCharacteristics** **#technicalDecisions** **#technicalDocumentation** **#theArchitectRole**

### **About technical decisions and how to ‘ensure’ they get followed**

When I write my architecture decision, I start thinking directly:

How will I govern this? What automated process will I put in place to observe and monitor 'violations'?

That enables me directly to make the technical decision directly actionable, I measure them, and I create feedback loops that inform me about it.

---

### **How do I make a decision that is hard, all the options don't make me happy?**

You choose the least worst. And paired with this comes to do a trade off analysis of the options, to find the least worst. Ideally you write an ADR that helps you refine your thinking process on it and get feedback.

Even when you are happy with a design, is is handy to get feedback, and one way to do it is write an ADR and get comments from your colleagues to validate your decision.

One thing I do often is to set the status for ADRs as: RFC with a particular date. This enables me to get opinions, which is important especially for architecture decisions.

  
They help to set standards across teams and divisions, and also give the justification for that new standard. Especially when you add consequences, it helps you thinking how it will disrupt processes, motivation, throughput.

  
When you highlight this, it helps you rethink if the ADR is the right direction, because you put it under the light of impact, benefits and trade offs. Because enforcing a standard, and adopting it is work.

---

**Tech Radar**

It helps you bring transparency in the enterprise to what technologies are being used, and how collaboration can happen among teams using a similar tool that dont work closely. It also gives visibility about consistency in the organisation.

For example the status assess helps you to not jump on the latest new tech, to be able to analyse it, and make it public to the company to learn if other people are doing something and experimenting with it. Which will help making a better decision.

---

### **About enterprise architecture as a practice in an organisation:**

The main goal of an enterprise architecture practice is to facilitate change. All sub goals of it are mainly directed to building consistency in the organisation

---

### **What architecture documentation standard do you use?**

I usually start with start with the characteristics, and then go with the standards.

Technical documentation is a moving target, architecture characteristics itself keep changing over time, and their definition too.

The best way to think about architecture documentation is as an evolutionary document that adapts to your context, team, people, knowledge, time.

  
**How do you assign a definition to an architecture characteristic?**  
I usually define it in terms of what I can measure.

ie: Reliability:

*   How many errors
    
*   Time where system is down/active
    

We can then have conversations to define our arch characteristics, how can we measure them, and base on that the definition for us.

This also helps you to write right away the fitness functions, which will be your feedback loop and will make your engineering practice more mature.

In perfect world you aim at immediate feedback, however that is not always happening. Fitness functions should be therefore simple and easy to maintain, so that you maintain them to shorten over time your feedback loops

---

### **What can architects do to inspire and be positive drivers, and how do you spin the game when the project is going badly?**

One of the expectation for this role is to lead, guide and inspire people through the implementation time.

Things going badly is common, because we are human, and maintaining a positive and realistic attitude helps to guide the team through bad paths. It's a balance between everything is all bad and everything is all good.

Being realistic is important, and being positive is not synonym of being up beat.

---

### **What's the difference between a software architect and a solution architect?**

The difference lies on how wide the role spans, and the scope of their responsibilities.

**Software architect:** focuses on one system

**Solution architect:** spans multiple teams, systems, divisions and departments

One disclaimer is that every organisation defines their own concept of these roles, so they are organisation specific.

Here a link to further explanation of this: [https://www.developertoarchitect.com/lessons/lesson151.html](https://www.developertoarchitect.com/lessons/lesson151.html)