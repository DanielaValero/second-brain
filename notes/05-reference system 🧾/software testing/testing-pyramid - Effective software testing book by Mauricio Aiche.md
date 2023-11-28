## 1.4 The testing pyramid, and where we should focus

Whenever we talk about pragmatic testing, one of the first decisions we need to make is the level at which to test the code. By a test _level_, I mean the _unit_, _integration_, or _system_ level. Let’s quickly look at each of them.

### 1.4.1 Unit testing

In some situations, the tester’s goal is to test a single feature of the software, purposefully ignoring the other units of the system. This is basically what we saw in the planning poker example. The goal was to test the `identifyExtremes()` method and nothing else. Of course, we cared about how this method would interact with the rest of the system, and that is why we tested its contracts. However, we did not test it together with the other pieces of the system.

When we test units in isolation, we are doing _unit testing_. This test level offers the following advantages:

- _Unit tests are fast_. A unit test usually takes just a couple of milliseconds to execute. Fast tests allow us to test huge portions of the system in a small amount of time. Fast, automated test suites give us constant feedback. This fast safety net makes us feel more comfortable and confident in performing evolutionary changes to the software system we are working on.
    
- _Unit tests are easy to control_. A unit test tests the software by giving certain parameters to a method and then comparing the return value of this method to the expected result. These input values and the expected result value are easy to adapt or modify in the test. Again, look at the `identifyExtremes()` example and how easy it was to provide different inputs and assert its output.
    
- _Unit tests are easy to write_. They do not require a complicated setup or additional work. A single unit is also often cohesive and small, making the tester’s job easier. Tests become much more complicated when we have databases, frontends, and web services all together.
    

As for disadvantages, the following should be considered:

- _Unit tests lack reality_. A software system is rarely composed of a single class. The large number of classes in a system and their interaction can cause the system to behave differently in its real application than in the unit tests. Therefore, unit tests do not perfectly represent the real execution of a software system.
    
- _Some types of bugs are not caught_. Some types of bugs cannot be caught at the unit test level; they only happen in the integration of the different components (which are not exercised in a pure unit test). Think of a web application that has a complex UI: you may have tested the backend and the frontend thoroughly, but a bug may only reveal itself when the backend and frontend are put together. Or imagine multithreaded code: everything may work at the unit level, but bugs may appear once threads are running together.
    

Interestingly, one of the hardest challenges in unit testing is to define what constitutes a unit. A unit can be one method or multiple classes. Here is a definition for unit testing that I like, given by Roy Osherove (2009): “A unit test is an automated piece of code that invokes a unit of work in the system. And a unit of work can span a single method, a whole class or multiple classes working together to achieve one single logical purpose that can be verified.”

For me, unit testing means testing a (small) set of classes that have no dependency on external systems (such as databases or web services) or anything else I do not fully control. When I unit-test a set of classes together, the number of classes tends to be small. This is primarily because testing many classes together may be too difficult, not because this isn’t a unit test.

But what if a class I want to test depends on another class that talks to, for example, a database (figure 1.5)? This is where unit testing becomes more complicated. Here is a short answer: if I want to test a class, and this class depends on another class that depends on a database, I will simulate the database class. In other words, I will create a stub that acts like the original class but is much simpler and easier to use during testing. We will dive into this specific problem in chapter 6, where we discuss mocks.

![](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781633439931/files/OEBPS/Images/01-05.png)

Figure 1.5 Unit testing. Our goal is to test one unit of the system that is as isolated as possible from the rest of the system.

### 1.4.2 Integration testing

Unit tests focus on the smallest parts of the system. However, testing components in isolation sometimes is not enough. This is especially true when the code under test goes beyond the system’s borders and uses other (often external) components. Integration testing is the test level we use to test the integration between our code and external parties.

Let’s consider a real-world example. Software systems commonly rely on database systems. To communicate with the database, developers often create a class whose only responsibility is to interact with this external component (think of Data Access Object [DAO] classes). These DAOs may contain complicated SQL code. Thus, a tester feels the need to test the SQL queries. The tester does not want to test the entire system, only the integration between the DAO class and the database. The tester also does not want to test the DAO class in complete isolation. After all, the best way to know whether a SQL query works is to submit it to the database and see what the database returns.

This is an example of an integration test. Integration testing aims to test multiple components of a system together, focusing on the interactions between them instead of testing the system as a whole (see figure 1.6). Are they communicating correctly? What happens if component A sends message X to component B? Do they still present correct behavior?

![](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781633439931/files/OEBPS/Images/01-06.png)

Figure 1.6 Integration testing. Our goal is to test whether our component integrates well with an external component.

Integration testing focuses on two parts: our component and the external component. Writing such a test is less complicated than writing a test that goes through the entire system and includes components we do not care about.

Compared to unit testing, integration tests are more difficult to write. In the example, setting up a database for the test requires effort. Tests that involve databases generally need to use an isolated instance of the database just for testing purposes, update the database schema, put the database into a state expected by the test by adding or removing rows, and clean everything afterward. The same effort is involved in other types of integration tests: web services, file reads and writes, and so on. We will discuss writing integration tests effectively in chapter 9.

### 1.4.3 System testing

To get a more realistic view of the software and thus perform more realistic tests, we should run the entire software system with all its databases, frontend apps, and other components. When we test the system in its entirety, instead of testing small parts of the system in isolation, we are doing system testing (see figure 1.7). We do not care how the system works from the inside; we do not care if it was developed in Java or Ruby, or whether it uses a relational database. We only care that, given input X, the system will provide output Y.

![](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781633439931/files/OEBPS/Images/01-07.png)

Figure 1.7 System testing. Our goal is to test the entire system and its components.

The obvious advantage of system testing is _how realistic the tests are_. Our final customers will not run the `identifyExtremes()` method in isolation. Rather, they will visit a web page, submit a form, and see the results. System tests exercise the system in that precise manner. The more realistic the tests are (that is, when the tests perform actions similar to the final user), the more confident we can be about the whole system.

System testing does, however, have its downsides:

- System tests are often _slow_ compared to unit tests. Imagine everything a system test has to do, including starting and running the entire system with all its components. The test also has to interact with the real application, and actions may take a few seconds. Imagine a test that starts a container with a web application and another container with a database. It then submits an HTTP request to a web service exposed by this web app. This web service retrieves data from the database and writes a JSON response to the test. This obviously takes more time than running a simple unit test, which has virtually no dependencies.
    
- System tests are also _harder to write_. Some of the components (such as databases) may require a complex setup before they can be used in a testing scenario. Think of connecting, authenticating, and making sure the database has all the data required by that test case. Additional code is required just to automate the tests.
    
- System tests are more _prone to flakiness_. A _flaky_ test presents erratic behavior: if you run it, it may pass or fail for the same configuration. Flaky tests are an important problem for software development teams, and we discuss this issue in chapter 10. Imagine a system test that exercises a web app. After the tester clicks a button, the HTTP POST request to the web app takes half a second longer than usual (due to small variations we often do not control in real-life scenarios). The test does not expect this and thus fails. The test is executed again, the web app takes the usual time to respond, and the test passes. Many uncertainties in a system test can lead to unexpected behavior.
    

### 1.4.4 When to use each test level

With a clear understanding of the different test levels and their benefits, we have to decide whether to invest more in unit testing or system testing and determine which components should be tested via unit testing and which components should be tested via system testing. A wrong decision may have a considerable impact on the system’s quality: a wrong level may cost too many resources and may not find sufficient bugs. As you may have guessed, the best answer here is, “It depends.”

Some developers—including me—favor unit testing over other test levels. This does not mean such developers do not do integration or system testing; but whenever possible, they push testing toward the unit test level. A pyramid is often used to illustrate this idea, as shown in figure 1.8. The size of the slice in the pyramid represents the relative number of tests to carry out at each test level.

![](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781633439931/files/OEBPS/Images/01-08.png)

Figure 1.8 My version of the testing pyramid. The closer a test is to the top, the more real and complex the test becomes. At the right part you see what I test at each test level.

Unit testing is at the bottom of the pyramid and has the largest area. This means developers who follow this scheme favor unit testing (that is, write more unit tests). Climbing up in the diagram, the next level is integration testing. The area is smaller, indicating that, in practice, these developers write fewer integration tests than unit tests. Given the extra effort that integration tests require, the developers write tests only for the integrations they need. The diagram shows that these developers favor system tests less than integration tests and have even fewer manual tests.

### 1.4.5 Why do I favor unit tests?

As I said, I tend to favor unit testing. I appreciate the advantages that unit tests give me. They are easy to write, they are fast, I can write them intertwined with production code, and so on. I also believe that unit testing fits very well with the way software developers work. When developers implement a new feature, they write separate units that will eventually work together to deliver larger functionality. While developing each unit, it is easy to ensure that it works as expected. Testing small units rigorously and effectively is much easier than testing a larger piece of functionality.

Because I am also aware of the disadvantages of unit testing, I think carefully about how the unit under development will be used by the other units of the system. Enforcing clear contracts and systematically testing them gives me more certainty that things will work out when they are put together.

Finally, given the intensity with which I test my code using (simple and cheap) unit tests, I can use integration and system tests for the parts that really matter. I do not have to retest all the functionalities again at these levels. I use integration or system testing to test specific parts of the code that I believe may cause problems during integration.

### 1.4.6 What do I test at the different levels?

I use unit tests for units that are concerned with an algorithm or a single piece of business logic of the software system. Most enterprise/business systems are used to transform data. Such business logic is often expressed by using entity classes (for example, an `Invoice` class and an `Order` class) to exchange messages. Business logic often does not depend on external services, so it can easily be tested and fully controlled through unit tests. Unit tests give us full control over the input data as well as full observability in terms of asserting that the behavior is as expected.

NOTE If a piece of code deals with specific business logic but cannot be tested via unit tests (for example, the business logic can only be tested with the full system running), previous design or architectural decisions are probably preventing you from writing unit tests. How you design your classes has a significant impact on how easy it is to write unit tests for your code. We discuss design for testability in chapter 7.

I use integration tests whenever the component under test interacts with an external component (such as a database or web service). A DAO, whose sole responsibility is to communicate with a database, is better tested at the integration level: you want to ensure that communication with the database works, the SQL query returns what you want it to, and transactions are committed to the database. Again, note that integration tests are more expensive and harder to set up than unit tests, and I use them only because they are the only way to test a particular part of the system. Chapter 7 discusses how having a clear separation between business rules and infrastructure code will help you test business rules with unit tests and integration code with integration tests.

As we know already, system tests are very costly (they are difficult to write and slow to run) and, thus, at the top of the pyramid. It is impossible to retest the entire system at the system level. Therefore, I have to prioritize what to test at this level, and I perform a simple risk analysis to decide. What are the critical parts of the software system under test? In other words, what parts of the system would be significantly affected by a bug? These are the areas where I do some system testing.

Remember the _pesticide paradox_: a single technique usually is not enough to identify all the bugs. Let me give you a real-world example from one of my previous projects. In developing an e-learning platform, one of our most important functionalities was payment. The worst type of bug would prevent users from buying our product. Therefore, we were rigorous in testing all the code related to payment. We used unit tests for business rules related to what the user bought being converted into the right product, access and permissions, and so on. Integration with the two payment gateways we supported was tested via integration testing: the integration tests made real HTTP calls to a sandbox web service provided by the payment gateways, and we tested different types of users buying products with various credit cards. Finally, our system tests represented the entire user journey in buying our product. These tests started a Firefox browser, clicked HTML elements, submitted forms, and checked that the right product was available after confirming payment.

Figure 1.8 also includes manual testing. I’ve said that every test should be automated, but I see some value in manual testing when these tests focus on exploration and validation. As a developer, it is nice to use and explore the software system you are building from time to time, both for real and via a test script. Open the browser or the app, and play with it—you may gain better insight into what else to test.

### 1.4.7 What if you disagree with the testing pyramid?

Many people disagree about the idea of a testing pyramid and whether we should favor unit testing. These developers argue for the _testing trophy_: a thinner bottom level with unit tests, a bigger middle slice with integration tests, and a thinner top with system tests. Clearly, these developers see the most value in writing integration tests.

While I disagree, I see their point. In many software systems, most of the complexity is in integrating components. Think of a highly distributed microservices architecture: in such a scenario, the developer may feel more comfortable if the automated tests make actual calls to other microservices instead of relying on stubs or mocks that simulate them. Why write unit tests for something you have to test anyway via integration tests?

In this particular case, as someone who favors unit testing, I would prefer to tackle the microservices testing problem by first writing lots and lots of unit tests in each microservice to ensure that they all behaved correctly, investing heavily in contract design to ensure that the microservices had clear pre- and post-conditions. Then, I would use many integration tests to ensure that communication worked as expected and that the normal variations in the distributed system did not break the system—yes, lots of them, because their benefits would outweigh their costs in this scenario. I might even invest in some smart (maybe AI-driven) tests to explore corner cases I could not see.

Another common case I see in favor of integration testing rather than unit testing involves database-centric information systems: that is, systems where the main responsibility is to store, retrieve, and display information. In such systems, the complexity relies on ensuring that the flow of information successfully travels through the UI to the database and back. Such applications often are not composed of complex algorithms or business rules. In that case, integration tests to ensure that SQL queries (which are often complex) work as expected and system tests to ensure that the overall application behaves as expected may be the way to go. As I said before and will say many times in this book, context is king.

I’ve written most of this section in the first person because it reflects my point of view and is based on my experience as a developer. Favoring one approach over another is largely a matter of personal taste, experience, and context. You should do the type of testing you believe will benefit your software. I am not aware of any scientific evidence that argues in favor of or against the testing pyramid. And in 2020, Trautsch and colleagues analyzed the fault detection capability of 30,000 tests (some unit tests, some integration tests) and could not find any evidence that certain defect types are more effectively detected by either test level. All the approaches have pros and cons, and you will have to find what works best for you and your development team.

I suggest that you read the opinions of others, both in favor of unit testing and in favor of integration testing:

- In _Software Engineering at Google_ (Winters, Manshreck, and Wright, 2020), the authors mention that Google often opts for unit tests, as they tend to be cheaper and execute more quickly. Integration and system tests also happen, but to a lesser extent. According to the authors, around 80% of their tests are unit tests.
    
- Ham Vocke (2018) defends the testing pyramid in Martin Fowler’s wiki.
    
- Fowler himself (2021) discusses the different test shapes (testing pyramid and testing trophy).
    
- André Schaffer (2018) discusses how Spotify prefers integration testing over unit testing.
    
- Julia Zarechneva and Picnic, a scale-up Dutch company (2021), reason about the testing pyramid.
    

Test sizes rather than their scope

Google also has an interesting definition of test _sizes_, which engineers consider when designing test cases. A _small test_ is a test that can be executed in a single process. Such tests do not have access to main sources of test slowness or determinism. In other words, they are fast and not flaky. A _medium test_ can span multiple processes, use threads, and make external calls (like network calls) to localhost. Medium tests tend to be slower and flakier than small ones. Finally, _large tests_ remove the localhost restriction and can thus require and make calls to multiple machines. Google reserves large tests for full end-to-end tests.

The idea of classifying tests not in terms of their boundaries (unit, integration, system) but in terms of how fast they run is also popular among many developers. Again, what matters is that for each part of the system, your goal is to maximize the effectiveness of the test. You want your test to be as cheap as possible to write and as fast as possible to run and to give you as much feedback as possible about the system’s quality.

Most of the code examples in the remainder of this book are about methods, classes, and unit testing, but the techniques can easily be generalized to coarse-grained components. For example, whenever I show a method, you can think of it as a web service. The reasoning will be the same, but you will probably have more test cases to consider, as your component will do more things.