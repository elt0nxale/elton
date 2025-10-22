---
title: "The tale of the 32-bit"
date: "2025-08-26"
---

### A childhood confusion

Back in 2012 i played a lot of computer games. In particular, MapleStory was one of the GOATs (I’m sure you OGs would know). 
Back then, the game client available for install was 32-bit only. It seemed weird to me because i was running it on a 64-bit Windows 7 PC. 
In 2022, PlayPark/Nexon upgraded it to 64-bit, effectively marking the end of MapleStory on 32-bit operating systems. 
If you were as clueless as i was with these two special numbers (32 & 64), read along and things might seem to make sense.

### A Story

There was once a logistics warehouse that packs and sorts huge shipments of parcels for outbound delivery. It was a rudimentary warehouse with labour workers. Though limited in numbers, each worker was speedy in their movement, working all day long. To keep a record of where the parcels were stored, they used clipboards to write down numbers indicating which shelf it was placed.

### The 32-bit Warehouse

In the early 2000s, workers were equipped with clipboards that were 32 boxes wide. The biggest number they could write down was ~4 billion. This wasn’t a problem at that time. Well, who knew how big their warehouse business could grow? Every other process in the warehouse, from auditing to facility management, was built around the 32 boxes limitation, since that was the standard clipboard size. 

### The 64-bit Warehouse

Ten years later when the warehouse business and space grew so much bigger, came the constraint with numbers. The number of shelves grew so much that workers couldn't cope with recording the shelf locations as they exceeded the 32 boxes limitation. The owner had to act quick. He purchased brand new clipboards that were 64 boxes wide. The workers were delighted. Workers could write numbers up to 2⁶⁴ digits long compared to 2³² in the old warehouse. They would never have to worry about shelf numbers anymore (atleast for the next century).

### The Transition

Some workers were stuck in the past, too used to the 32-bit clipboards. Others who were excited for the change had already began using the 64-bit ones. Auditors who were in charge of making sure the shelf data was filed correctly were stumped. The logistics industry hadn’t adjusted to this process of auditing, so the warehouse printed two sets of instructions for the auditors: one to handle the 32-bit workers and one for the 64-bit.

Over time, almost all workers upgraded to 64-bit clipboards. The old 32-bit workers retired to enjoy their huge bonuses paid out as the warehouse grew. The industry aligned on auditing only 64-bit shelf data, so all numbers had to be written on the 64 box wide clipboard. Similarly, the warehouse would print only one set of instructions for the auditors to check on the 64-bit workers.

### Drawing Parallels

Now, the warehouse in the story is synonymous with a modern day PC. In the PC, each worker was a CPU core that could run on its own.
Also, each CPU core had its own clipboards, which are nothing but CPU registers. Initially 32 bits wide, they are fast, temporary storage locations for memory addresses up to 4 GB (4 billion bytes). This register bitness is limits how much RAM a CPU can directly access. During the transition phase, auditors struggled with different sets of instructions. Likewise operating systems underwent the same challenges in executing different sets of instructions.

### Linking Hardware, OS and Applications

Sidetracking from compatibility between 32 and 64-bit, how does the hardware, OS and software work together for MapleStory to run on a PC? 

The game client (.exe) contains instructions written for execution by the OS. During execution, the OS utilises memory from the Mmemory Management Unit (which comprises of registers) to store all sorts of variables and instructions. There is a lot of work that goes behind providing application's with the illusion of fuss-free access to physical memory (RAM), which we shall not discuss here. If you're interested, the chapter on memory virtualization in ["Operating Systems: Three Easy Pieces"](https://pages.cs.wisc.edu/~remzi/OSTEP/) makes this easy to understand.

### A Point To Note

When discussing differently bit OSes, it's important to note that compatibility goes “down” but not “up”

A 32-bit OS is an OS written to use only 32-bit instructions, which fit into the CPU’s instruction set using 32-bit registers and memory addressing.

A 64-bit app requires a 64-bit OS, which in turn relies on the CPU’s 64-bit registers for memory addressing. A 32-bit OS can’t execute the instructions that make use of 64-bit memory addressing. The hardware just doesn’t support it.

Conversely, you might be thinking, what if i run a 32-bit application on a 64-bit OS? While not directly interoperable, a small library called “shim”, is used to intercept application API calls and modify the requests to and/or responses from the OS.

If you tried to install a 32-bit OS on a 64-bit CPU and run 32-bit software, it’d run just fine! Although the registers (clipboards) can theoretically handle larger numbers, its still restricted by the instructions it received. You’ll still be stuck with the 4 GB ceiling.

The next time you run a .exe without hesitating to see if its 32 or 64-bit, remember how quickly technology has advanced since we were kids.
