---
title: "Bloom Filters"
date: "2025-03-15"
---

### What’s a Bloom Filter
Few days ago i encountered this term that sounded like pretty much like an in-game item, but was actually a very important and efficient data structure used in many services in today’s world.

It’s a probabilistic data structure which aims to determine if a particular entry exists in a set. The false negative rate - chances of wrongly saying that an entry has appeared before - is 0. The false positive rate - chances that an entry has been seen before - however, is going to be a non-zero. 

This means that there’s a very small chance that the bloom filter calls out an entry for appearing before, but hasn’t actually appeared. However if it says this entry doesn’t exist, that is going to be true all the time.

### Flipping bits from a series of hash functions

The bloom filter is originally a bit array of size m, with all bits set to 0 and varying hash functions of size k. To *add* an element, feed it to each of the *k* hash functions to get *k* array positions. Set the bits at all these positions to 1.

For e.g., hash1(”hello”) = 101 and hash2(”hello”) = 100. The bit array of size m=6 would now be flipped to [1,0,1,0,0,0]. 

To *test* for “hello”, feed it to each of the *k* hash functions to get *k* array positions. If *any* of the bits at these positions is 0, the element is definitely not in the set; If it were, all the bits would have been flipped to 1 as it was inserted. But if all are 1, there is also the possibility that the bits have by chance been flipped during the insertion of other elements.

Say we have only seen “hello” and we now want to check if “world” exists in the bloom filter. Suppose hash1(”world”) = 001 and hash2(”world) = 100, we would then check for the bit array of [1,0,1,0,0,0] - which happens to be true because of the previous occurence of “hello”. 

In reality, the larger we set the bit array size “m” to be, and the greater the no. of hash functions “k” we use, the probability of a false positive is going to be much lower, albeit with the space and time tradeoff. 

Typically, *k* is a small constant which depends on the desired false error rate *ε*, while *m* is proportional to *k* and the number of elements to be added.

In order for the bit array to be utilised efficiently, the *k* hash functions should be chosen to achieve independent and uniform distribution. At the same time, this requirement can be prohibitive for a large *k.*

### Bloom Filters are only additive

Are we going to be removing elements? This is impossible to perform because removing all the bits which the k functions for a particular element maps to would inevitably impact one or more other bits that have been flipped for other elements in the set, which would introduce false negatives. 

There are few approaches to combat false positives as the bloom filter grows:

1. Discarding the current filter and create a new empty one
2. Using a counting bloom filter to allow for approximate deletions, where each bit’s value represents a count instead of binary values
3. Using negative bloom filters to track elements that have been removed. False positives in the second filter then effectively become false negatives in the combined filter

The first option presents a simple solution but essentially trades off false positives with **false negatives**, since the elements that were previously seen are no longer tracked. This is useful when false negatives are permissible, or there are secondary checks to prevent false negatives

for the time that the bloom filter is growing.

The second option also introduces the potential for false negatives, where bits of seen elements may happen to coincide with those of deleted elements

The last option introduces more work in the combined filter, and requires another solution when the the negative bloom filter gets too large.  

### Advantages over other data structures?

Bloom filters excel in space complexity despite the risk of false positives. Most other data structures used to implement Sets, e.g *self-balancing binary search trees (RB Trees, 2,4 Trees, AVL Trees) and hash maps,* require storing atleast the value of the entry itself.

The unique property of the Bloom filter is that the time needed to *add* or *test* if an element is in the set is constant at O(k), where *k* is the no. of hash functions needed. This is independent of the no. of items already in the set. In fact, the *k* lookups are independent and can be parallelized from the hardware implementation perspective, offering more potential for optimization.

However, when there’s a need to retrieve the value of the entry, other workarounds need to be explored. The use case of this probabilistic data structure is thus very much implied in its name - “Filter”, where it serves as a layer infront of a cache or key-value store solely to tell if an element exists in the set.

For e.g., Bigtable, HBase, Cassandra and PostgreSQL use bloom filters to reduce disk lookups for non-existent keys, enhacing query performance.

### Other Applications of a Bloom Filter

Akamai Technologies’ Web / CDN filter -  uses it as an additional layer to determine if a web object should be cached when it has been accessed atleast once before. They found that almost 3/4 of URLs accessed from a typical web cache are “one-hit-wonders” - tapped once and never again, which would be a waste of resources storing. The bloom filter prevents this by determining if this URL has been tapped before in a memory efficient way, effectively reducing the disk write workload by eliminating these “one-hit-wonders” and improving cache-hit rates.

Google chrome previously used bloom filters to lookup malicious urls. If bloom filter says “probably yes”, then only the server / cache is directly queried for a verification of this malicious url. As the bloom filter became too large as malicious urls grew, a more complicated solution was needed.

Password managers also use bloom filters to detect if a user generated password is weak by checking against a finite set of known/ vulnerable passwords. In the case of a false positive, where a strong password is misidentified, the user can just generate a new password nonetheless.

### Round Up

Hope you found this information interesting, and as a non-CS major i would have to conveniently point you to this [wiki](https://en.wikipedia.org/wiki/Bloom_filter#Examples) to read more on the mathematical relationships between k and false positive rates (i honestly didn’t lol) as well as to reference the information sources.