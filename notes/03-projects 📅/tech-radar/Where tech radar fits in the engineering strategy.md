#technicalDecisions #techRadar 


# Where tech radar fits?


When you go and seek advice, spend most time and effort speaking to people who will disagree with you; those who you know think along different lines and where you know you will have blind spots. Not only this, challenge yourself. Consider “what’s bad about this alternative? What are its shortcomings?” Spend the most time thinking about the alternatives which challenge your decision most directly and fundamentally.


To learn most effectively you need to feel safe, and when learning collectively everyone benefits from the broadest, most diverse range of inputs contributing to discussions. Remember, in this approach, we are explicitly not looking for consensus, but we are looking for a broad range of inputs and voices.



> Our adoption of the Advice Process opened up the space for anyone to make decisions, but it has also put conversations, the responsibility to seek out expertise, and think about impact at the core. The remainder of the elements of this approach, each of which supports the core element focus specifically on ensuring those conversations are as timely, focused and effective as possible. There are four of them:


### A thinking and recording tool: ADRs
The first supporting element is [Architectural Decision Records](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records) or ADRs. These are lightweight documents, frequently stored in source code repositories alongside the artefacts they describe.


### A time and place for conversations: The Architecture Advisory Forum

The second supporting element in this alternative approach exists to make all the conversations supporting this advice-seeking easier: a weekly, hour-long Architecture Advisory Forum (“AAF”).

Fundamentally, this is a regular and recurring place and time for conversations. Your ideal attendees are delegates from each team as well as your key representatives from your Advice Process checklist. However, the invite should remain completely open to encourage transparency and openness. The timeliness and quality of the conversations which take place is a key indicator of success, but equally important is the breadth and diversity of views shared, and the same goes for the contributors. If architecture is being “done” here, and lessons shared and learned, then you’re winning.


### A light to illuminate a unified goal: Team-sourced Architectural Principles

-> The principles, you’ll recall, give us an idea of the direction of travel which our ideal solution will ideally manifest,  Not all will be relevant, but some principles ought to help our decision-making. Recall that it’s an architectural principal’s primary goal to assist in the evaluation of multiple technical possibilities, and highlight the one which fits best.

Having architectural principles is not new, though sadly I rarely encounter serviceable ones. Always important, in a world of highly-autonomous-teams they become essential because they are the means by which an aligned delivery direction is achieved without the need for control.

So what makes a good architectural principle? Firstly, it must provide a criteria with which to evaluate our architectural decisions (which in practice means it must be specific, measurable, achievable, realistic and testable, aka “S.M.A.R.T”). Secondly, it must support the business’s strategic goals. Thirdly, it must articulate the consequences / implications it necessarily contains within it. Finally, taken together as a set, they should number neither too few to cover the key needs which architectural principles meet, nor too many that teams cannot remember them all.


Remember that this approach is aimed at supporting team autonomy, so one key role played by our principles is as a minimal viable set of understandings and agreements between everyone.



### A means to sense the current technical landscape and climate: Tech radar


>How do we also take note of our surrounding landscape and climate? Architectural decisions are also frequently based on what everyone else is doing, who has which skills, and what the general trends in the tech industry are. Enter the fourth and final supporting element: your own Technology Radar.


The radar in comparison is a lot more advisory in nature. It will give an idea of what, if anything, is the current de-facto standard in our problem space, what’s been done in the past, and what other teams might be experimenting with. Going a different way is a lot less likely to raise eyebrows, but it is again a definite reason to address the deviation in the ADR.


> Result will give a great overview of the landscape and prevailing climate, and brings many discussions about where effort should be directed, and where it should be reduced. And just as with the principles, give rise to a general aligning of team understanding.






Questions:
- Shouldn't we include UX/UI design things?
- Shouldn't we include human relate things like: managing team's cognitive load? etc?



> Result will give a great overview of the landscape and prevailing climate, and brings many discussions about where effort should be directed, and where it should be reduced. And just as with the principles, give rise to a general aligning of team understanding.


Goal:
- Have an overview of the landscape of technologies we use in the organisation and prevailing climate. The idea is to bring discussions about where our effort should be directed, and where should be reduced. With this we give rise to have a general alignment and understanding
- Create a broadest engagement with your evolving architecture as possible, as well as a growing architectural mindset across all team members.


Usages:
- Link an assess technology with an ADR and/ or a discussion in a guild or arch forum
- Entries in ADRs, or engineering principles can be linked to tech radar entries. Example: if we start using a new technology or decide to adopt a practice that was previously experimental, we would flag it here. This helps us keep track of how our decisions impact the technology landscape and whether we need to update our radar accordingly.

How often to update it?
- Cadence is specific to the guild. Can be: quarterly, half-yearly. The key is to pay attention of how the radar is being consumed/or not, by the guilds or arch forum.







What about the usage of your radar? As with the principles, there is also a place in our ADRs for “Relevant Radar Blips”. This is where we flag both adherence to the existing landscape as reflected in the current radar, but also, and more importantly, potential changes to the existing radar which this decision will introduce. Perhaps it’s the spiking of a new framework, or a move from “experiment” to “adopt” for a specific practice.

Again, this is great grist for the AAF discussion forum, and great content to capture in the ADR itself. You can even go so far as linking specific types of blip appearances and movements to the need to submit ADRs, though in my experience this happens anyway without anyone having to push it explicitly. Remember, your goals here are the broadest engagement with your evolving architecture as possible, as well as a growing architectural mindset across all team members.

How about keeping your radar up to date? I've seen quarterly cadences work, and half-yearly too. The key is to pay attention to how the radar is being consumed (or not) at the AAF and elsewhere. That should give you a good idea when it's worth investing in a refresh.




**Tech Radar**

It helps you bring transparency in the enterprise to what technologies are being used, and how collaboration can happen among teams using a similar tool that dont work closely. It also gives visibility about consistency in the organisation.

For example the status **assess** helps you to not jump on the latest new tech, to be able to analyse it, and make it public to the company to learn if other people are doing something and experimenting with it. Which will help making a better decision.