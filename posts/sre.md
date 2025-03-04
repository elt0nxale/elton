---
title: "A thing or two about Site Reliability Engineering (SRE)"
date: "2025-02-22"
---

### Intro
If you're here you must be trying to wrap your head around SRE, or perhaps just checking out what i think SRE is, so welcome! I've recently read _Site Reliability Engineering: How Google Runs Production Systems_, and _Becoming SRE_ by David Blank-Edelman, and here i am trying to highlight what stuck with me along with my own thoughts.


### Definition
Here's one by David Blank-Edelman that i think makes a lot of sense

> Site reliability engineering is an engineering discipline devoted to helping organizations sustainably achieve the appropriate level of reliability in their systems, services, and products.

As vague as the above definition may sound, it amplifies the goal of SRE - not to the point that it oversimplifies what is - but instead precisely scopes the idea for the reader to know okay, in general this is what they do.
The author mentions that there are 3 keywords that contribute the most to defining SRE. Just as i did when i first read his [book](https://www.oreilly.com/library/view/becoming-sre/9781492090540/), take a moment to think about what are your own top 3 keywords from this definition
_(the 3 i picked out were slightly different than his, and so would probably be yours as you are reading this now. But that's okay, more on that later)_

.



.



.



.

#### Reliability
Here's the first word, arguably on everyone's list. What does it mean for a system to be reliable. Who defines reliability? How do we measure reliability? This will be further explored in the sections below, but it's suffice to know that SRE's ultimate end goal is to keep systems, products, applications reliable. 

#### Appropriate
As many authors have written, chasing 100% reliability is a near impossible dream - one that may take so much incremental effort that investing further manhours yield less than significant results.
Hence appropriateness is taken into consideration, and is often defined by the number of trailing 9s in these metrics. For e.g, a 99.99999% uptime permits 5 minutes of downtime a year ([see Five-by-five mnemonic](https://en.wikipedia.org/wiki/High_availability#Five-by-five_mnemonic)).

For a crucial service like Google's authentication service, 5 minutes of downtime can mean **headlines**. Naturally, what supersedes the 99.99999% uptime benchmark are even more granular (and harder to read) benchmarks such as 99.9999999999% ("twelve nines") - roughly equating to 31.56 microseconds of downtime a year.

#### Sustainable
This last one comes in later into the picture after we are done establishing what it means to achieve *appropriate reliability*. With systems being built and maintained by people, the practice of achieving *appropriate reliability* has to be done in a sustainable fashion, where the practice should not only be replicatable but in addition, _healthy_, to avoid burn out (systems are like humans sometimes). 

#### Other words (Discipline, Engineering, Helping)
David mentions why some might have chose these words - groups that felt that they hadn’t yet reached the level of credibility with others they desired wanted to talk about the word discipline. Those who desired this credibility from partner development teams often wanted to dig into engineering.

Personally, the word _discipline_ came up as one of the top 3 for me and here's why - my opinion is that SRE can be viewed as more of a practice that engineers could diligently follow more so than a specific role or function. There are many software engineers in this world who don't have the luxury of being in an organization large enough to hire specific people for this job, 
and so unassumingly take on the role of trying to improve the reliability of their systems as part of their job scope. SRE describes a discipline that engineers follow, and doesn't always come as apparently as in their titles.

_Helping_ was also something that i picked up but was not really touched on in the book. Here's my take - reliability is a shared goal amongst an entire organization instead of one that solely relies on SREs. In fact, reliability should also be an adjacent goal for software engineers working on core features. More commonly, CTOs who helm the technical throne and are 
responsible for driving the culture across engineering teams are also accountable for reliability. Reliability is a whole-of-org goal that should be worked towards together, albeit with varying proportions of responsibility.

Interestingly, David uses this interactive approach of having the audience pick out their 3 words to derive some insight into the background of the people he is talking to (which of course opens up room for the conversation to steer in a particular direction), in addition to being a mere gimmick for engaging the crowd. It's surpising that i'm also learning a thing or two about communication from this book.



### Expanding on reliability
Fundamentally, reliability can only make sense when it's measured from the customer's perspective. The term "customer" may not necessarily refer to actual everyday consumers like me and a quarter of the world's population whom makes use of Apple's icloud. It could also refer internal consumers of a enterprise product like an api testing platform, or an firmwide load balancer service used by engineers from within. Regardless, a reliable product is something that provides a consistent and predictable experience when **used** or **observed**.  


### SRE vs DevOps
A good way to describe this is that Site Reliability Engineering is to reliability as DevOps is to delivery

**there may still be cases where a team comprises of SREs designated to _cover DevOps related work_, and this is purely an organizational arrangement.*

DevOps concerns itself with what it takes to bring a working piece of code into production quickly and easily, and that often involves building a ci/cd pipeline involving _continuous integration_, egetting code from different branches tested and merged into a master version, and _continuous deployment_, getting the latest master version to take effect on a particular development environment.


### Relationships 
#### 1. To people
A thing to note about both Site Reliability Engineering and people is that SRE's work spans across multiple segments of the software development lifecycle. From planning, to development, to testing and deployment, *and back to planning*, talking to people to understand the systems they have built or they have used requires **collaboration**, and a lot of it. 

Thus, a part of the job favours building relationships with people to make work easier, and this is often more important to an SRE than any other function of the team. 

#### 2. To failure
Despite how success is so important in this role, failure is a term that is often valued and revisited a lot, be it during postmortems-of-the-month, writing an incident report, organizing knowledge transfer sessions to better understand what can be done better. The job of an SRE isn't to just understand how a _system is supposed to work_, but more so how a _system really works in different environments_.
A system should fail when it ought to, and give **clear enough signals** on why it failed. Trying to wrestle with catching all cases in exception handling rather than let it bubble through may bring more obscurity and headaches than it should. 

An SRE should be concerned about systems, zooming out to the macro perspective and sometimes digging deep into the micro level. In incident reviews, it is often convenient in the midst of never-ending priorities to attribute failure to a case of human error. It is important to be wary that human errors are more so than not an indirect effect of poorly designed systems.

Take an addition of wrong ip address to an ACL during a system configuration event for example - rather than prematurely concluding on the root cause analysis at *"'XXX' on duty was too careless last night for inputting the wrong ip address into our system"*, perhaps it would be more useful for the team to dive into the crevices of these underlying errors to assess the system in question.
> _Does the ACL ip address input allow for autocomplete based on a set list of ip addresses? Does the UI of the ACL configuration service prompt for confirmations? Are we understaffed such that our oncalls are becoming too frequent, forcing our team members to work overtime?_

*Systems*, more often than not, refer to machines running 1s and 0s in the technical sense. But in this case, systems in the behavioural sense can also refer to how you manage people, how you organize your on call dutie, etc. I'd view such failures as socio-technical in nature, and improvements to the *system* can span across both the technical domain - *improving the user-experience by allowing dropdowns / autocomplete*, as well as the organizational domain - *adjusting on call schedules to ensure people get enough rest*.


### Wrapping up
Writing this post took up waaaaaaay more time than i thought. What scares me more is to think about what went in to get the two books _(that i drew a lot of the inspiration from)_ published for people like me to enjoy. Would really recommend taking a full read of them if you have the time, there's so much more than what i've barely touched on here.

