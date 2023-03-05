# CHAPTER 8   Hash Tables

The preceding chapter explained binary search, an ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0002.png) algorithm for locating an item in a sorted list. The algorithm repeatedly examines a test item in the middle of the part of the list where the target item must be. It compares the test item to the target item and then recursively examines the left or right half of the region, depending on whether the test item is greater than or less than the target item.

[Chapter 7](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml) also explained interpolation search, which uses a mathematical calculation to predict where the target item will be. That algorithm has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0003.png) time and is so much faster than binary search that it almost seems like magic.

The reason why interpolation search is so much faster than binary search is that it uses the data's special structure to find values by calculation instead of by making comparisons. The countingsort, pigeonhole sort, and bucketsort algorithms described in [Chapter 6](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml) do that too.

Hash tables also use the data's structure to locate values quickly. Instead of storing items in a sorted list, a hash table stores them in a way that lets you calculate an item's location in the table directly.

### NOTE

Python's version of a hash table is a dictionary.

In C#, you can use the `HashTable` class to store weakly typed objects with keys. The `Dictionary` class is a strongly typed hash table where the data types of the items and keys are defined. Because the objects in a `Dictionary` have a known data type, a `Dictionary` gives faster performance than a nonspecific `HashTable`.

Dictionaries in both C# and Python allow you to look up items by using a key. The prebuilt dictionary classes work well, so feel free to use them in your programs. This chapter explains some of the methods that those classes use and how you can implement hash tables in your code.

For a simple example of a hash table, suppose that you have a small company with 20 employees, and you want to be able to look up an employee's information by searching for that person's employee ID. One way you could store the information is to allocate an array of 100 items and then store an employee with employee ID N in position N mod 100 in the array. For example, an employee with ID 2190 would go in position 90, an employee with ID 2817 would go in position 17, and an employee with ID 3078 would go in position 78.

To find a particular employee, you would simply calculate the ID mod 100 and look at the corresponding array entry. This is an O(1) operation that's even faster than interpolation search.

In a real program, things aren't quite so simple. If you have enough employees, you will eventually get two with IDs that map to the same value. For example, if two employees have IDs 2817 and 1317, they both map to position 17 in the table.

Still, this idea of mapping values into a table is a pretty good start, and it is the basic concept behind hash tables. The rest of this chapter describes hash tables more precisely and explains ways that you can implement hash tables in a program.

## Hash Table Fundamentals

A _hash table_ maps data to locations in a data structure. Often it associates a key value such as an ID or name to a larger record such as an employee or customer record. Because hash tables associate a key to a value, they are sometimes called _associative arrays_ or, less formally, _dictionaries_.

The process of mapping a key value for use by the hash table is called _hashing_. Good hashing functions spread out key values so that they don't all go to the same position in the table. In particular, key values are often similar, so a good hashing function maps similar key values to dissimilar locations in the table.

For example, suppose that you want to store customer records in a hash table and look them up by name. If two customers have the last names Richards and Richardson, ideally the hashing function should map them to two different locations.

To achieve this, hashing functions often generate a value that looks something like gibberish, as if the key value had been chopped into hash.

If you put enough values in a hash table, eventually you'll find two keys that hash to the same value. That's called a _collision_. When that occurs, you need a _collision-resolution policy_ that determines what to do. Often the collision resolution policy maps the key to a series of new positions in the table until it finds an empty position.

A hash table's _fill percentage_, the percentage of the table that contains entries, influences the chance of collisions occurring. Adding a new key to a hash table is more likely to cause a collision if the table's data structure is 95 percent full than if it's only 10 percent full.

To summarize, a hash table needs the following:

*   A data structure to hold the data
*   A hashing function to map keys to locations in the data structure
*   A collision-resolution policy that specifies what to do when keys collide

To be useful, a hash table must be able to at least add new items and locate items that were previously stored. Another feature that is useful but not provided by some hash tables is the ability to remove a hashed key.

# RESIZING HASH TABLES

Eventually a hash table may become completely full, or at least so full that collisions are likely and performance suffers. In that case, you need a resize algorithm to determine when and how the hash table is resized to make it larger.

You can also have an algorithm for determining when and how to make the hash table smaller. For example, if a hash table can hold 1 million entries but currently holds only 10 entries, you might want to make it smaller to reclaim unused space.

One simple method of resizing a hash table is to create a new hash table of the desired size and then rehash all the items in the original data structure into the new table. Some types of hash tables, such as hash tables with chaining, offer other methods, but this one should work for almost any hash table.

Different kinds of hash tables use different methods to provide these features. The following sections describe some common methods of building hash tables.

## Chaining

A hash table with chaining uses a collection of entries called _buckets_ to hold key values. Each bucket is the top of a linked list holding the items that map to that bucket.

Typically the buckets are arranged in an array, so you can use a simple hashing function to determine a key's bucket. For example, if you have N buckets and the keys are numeric, you could map the key K to bucket number K mod N.

[Figure 8.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0001) shows a hash table with chaining.

![Illustration of hash table with chaining, each bucket is the top of a linked list.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f001.jpg)

[**Figure 8.1**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0001)**:** In a hash table with chaining, each bucket is the top of a linked list.

To add a key to the hash table, you map the key to a bucket using the hash function and then add a new cell to the bucket's linked list. Hashing the key to find its bucket takes O(1) steps. Adding the value to the top of the linked list takes O(1) steps, so this operation is very fast.

However, to be useful, a hash table cannot hold duplicate values. This means that before you can add a new item to a bucket, you should verify that it is not already present. If the hash table uses B buckets and holds a total of N items and the items are reasonably evenly distributed, each bucket's linked list holds roughly ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0004.png) items. If you need to verify that a key is not in the hash table, you need to examine the roughly ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0005.png) items in that key's bucket. All of this means that adding an item to the hash table takes a total of ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0006.png) steps.

### NOTE

You can make searching for items in the hash table a little faster if the linked lists hold keys in sorted order. Then, if a key isn't present, you only need to search until you find a value greater than the target key instead of searching all the way to the end of the list. The run time is still ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0039.png) , but in practice it will be a bit faster.

To find an item, you hash its key to see which bucket should hold it and then traverse that bucket's linked list until you find the item or come to the end of the list. If you get to the end of the list, you can conclude that the item isn't in the hash table. As is the case when adding an item to the hash table, this takes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0001.png) steps.

A hash table with chaining supports item removal quite well. To remove an item, hash its key as usual to find its bucket. Then remove the item from the bucket's linked list. Hashing the item takes O(1) steps and removing it takes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0007.png) steps, so the total time is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0008.png) .

A hash table with chaining can expand and shrink as needed, so you don't need to resize it if you don't want to. If the linked lists become too long, however, finding and removing items will take a long time. In that case, you may want to enlarge the table to make more buckets. When you rehash the table, you know that you will not be adding any duplicate items, so you don't need to search to the end of each bucket's linked list to look for duplicates. That allows you to rehash all of the items in O(N) time.

## Open Addressing

Chaining has some nice advantages, such as the fact that it can hold any number of values without changing the number of buckets, but it has some disadvantages as well. For example, if you put too many items in the buckets, then searching through the buckets can take a fair amount of time. You can reduce the search time by adding more buckets, but then you might have lots of empty buckets taking up space, and there's no way for the hash table to use those empty buckets.

Another strategy for building hash tables is called open addressing. In _open addressing_, the values are stored in an array, and some sort of calculation serves as the hashing function, mapping values into positions in the array. For example, if a hash table uses an array with M entries, a simple hashing function might map the key value K into array position K mod M.

Different variations of open addressing use different hashing functions and collision-resolution policies. In all cases, however, the collision-resolution policy produces a sequence of locations in the array for a value. If a value maps to a location that is already in use, the algorithm tries another location. If that location is also in use, the algorithm tries again. The algorithm continues trying new locations until it either finds an empty location or concludes that it cannot find one.

The sequence of locations that the algorithm tries for a value is called the value's _probe sequence_. The average length of probe sequences for values that may or may not be in the hash table gives a good estimate of the efficiency of the hash table. Ideally, the average probe sequence length should be only 1 or 2. If the table becomes too full, the average probe sequence may become very long.

Depending on the collision-resolution policy, a probe sequence might be unable to find an empty location for an item even if there are empty items in the hash table's array. If the probe sequence repeats itself before visiting every entry, some entries may remain unused.

To locate an item in the hash table, the algorithm follows the value's probe sequence until one of three things happens. First, if the probe sequence finds the item, the job is done. Second, if the probe sequence finds an empty entry in the array, the item is not present. (Otherwise, it would have been placed in the empty position.)

The third possibility is that the probe sequence could visit M entries, where M is the size of the array. In that case, the algorithm can conclude that the value is not present. The probe sequence might not visit every entry in the array, but after visiting M entries, you know that it has either visited every entry or that it is unlikely to find the target value. The probe sequence may even be following a loop, visiting the same positions repeatedly. In any case, the value must not be present because, if it were, it would have been added to the array using the same probe sequence.

At a reasonable fill percentage, open addressing is extremely fast. If the average probe sequence length is only 1 or 2, then adding and locating items has run time O(1).

Open addressing is fast, but it does have some disadvantages. The most obvious problem is that the hash table's performance degrades if its array becomes too full. In the worst case, if the array contains N items and is completely full, it takes O(N) time to conclude that an item is not present in the array. Even finding items that are present can be very slow.

If the array becomes too full, you can resize it to make it bigger and give the hash table a smaller fill percentage. To do that, create a new array and rehash the items into it. If the new array is reasonably large, it should take O(1) time to rehash each item, for a total run time of O(N).

The following section discusses another important problem with open addressing: removing items.

### Removing Items

Although open addressing lets you add and find items reasonably quickly, at least if the array isn't too full, it doesn't allow you to remove items the way chaining does. An item in the array might be part of another item's probe sequence. If you remove that item, then you will break the other item's probe sequence so you can no longer find the second value.

For example, suppose items A and B both map to the same index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0013.png) in the array. Item A is added first at index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0010.png) , so when you try to add item B, it goes to the second position in its probe sequence, ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0012.png) .

Now suppose you remove item A. If you then try to find item B, you initially look at index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0011.png) . Because that entry is now empty, you incorrectly conclude that item B isn't present.

One solution to this problem is to mark the item as deleted instead of resetting the array's entry to the empty value. For example, if the array holds 32-bit integers, you might use the value ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0014.png) to mean that an entry has no value and ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0040.png) to mean that the value has been deleted.

When you search for a value, you continue searching if you find the deleted value. When you insert a new value into the hash table, you can place it in a previously deleted entry if you find one in the probe sequence.

One drawback of this approach is that if you add and then remove many items, the table may become full of deleted entries. That will make searching for items slower. In the worst case, if the array is completely full of current and deleted items, you might have to search the entire array to find an item or to conclude that it isn't present.

If you delete many items, you can rehash the current values and reset the deleted array locations so that they hold the special empty value. If the array contains N items and has a reasonable fill percentage, this should take O(N) time.

### Linear Probing

In _linear probing_, the collision-resolution policy adds a constant number, called the _stride_ and usually set to 1, to each location to generate a probe sequence. Each time the algorithm adds 1, it takes the result modulus the size of the array, so the sequence wraps around to the beginning of the array if necessary.

For example, suppose the hash table's array contains 100 items and the hashing rule is as follows: N maps to location N mod 100. Then the probe sequence for the value 2,197 would visit locations 97, 98, 99, 0, 1, 2, and so forth.

[Figure 8.2](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0002) shows a linear probe sequence for inserting the value 71.

![Illustration of linear probing, the algorithm adds a constant amount to locations to produce a probe sequence.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f002.jpg)

[**Figure 8.2**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0002)**:** In linear probing, the algorithm adds a constant amount to locations to produce a probe sequence.

Here the table already contains several values when you want to add item 71. This table's array has 10 entries, so 71 maps to location 71 mod ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0016.png) . That location already contains the value 61, so the algorithm moves to the next location in the value's probe sequence: location 2. That location is also occupied, so the algorithm moves to the next location in the probe sequence: location 3. That location is empty, so the algorithm places 71 there.

This method has the advantages that it is very simple and that a probe sequence will eventually visit every location in the array. Therefore, the algorithm can insert an item if any space is left in the array.

However, it has a disadvantage called _primary clustering_, an effect in which items added to the table tend to cluster to form large blocks of contiguous array entries that are all full. This is a problem because it leads to long probe sequences. If you try to add a new item that hashes to any of the entries in a cluster, the item's probe sequence will not find an empty location for the item until it crosses the whole cluster.

The LinearProbing example program shown in [Figure 8.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0003) demonstrates primary clustering. This hash table's array has 101 entries and currently holds 50 values. If the items were evenly distributed within the array, the probe sequence for every item that is in the table would have a length of 1. The probe sequences for items that are not in the table would have lengths of 1 or 2, depending on whether the initial hashing mapped an item to an occupied location.

![Screenshot of Hash tables that use linear probing are subject to primary clustering.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f003.jpg)

[**Figure 8.3**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0003)**:** Hash tables that use linear probing are subject to primary clustering.

However, in [Figure 8.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0003) the program shows that the hash table's average probe sequence length is 2.42, which is a bit above what you would get with an even distribution. The situation is worse with higher load factors.

### NOTE

The program shown in [Figure 8.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0003) is a solution to Exercise 8.3. See [Appendix B](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/b02.xhtml) for more information.

To understand how clusters form, consider an empty hash table with N entries. If you add a random number to the table, there's a ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0020.png) chance that it will end up in any given position. Suppose it ends up in position K.

Now suppose that you add another random number to the table. There's a ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0017.png) chance that this item will also map to position K, and in that case, linear probing will put the item in position ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0019.png) . There's also a ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0018.png) chance that the item will map directly to position ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0021.png) . Between the two possibilities, there's a 2/N chance that the item will end up in position ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0022.png) and a small cluster will form.

Over time, more clusters will form. The larger a cluster is, the greater the probability that a new item will add to the end of the cluster. Eventually, clusters will expand until they merge and form bigger clusters. Soon the array is full of clusters and long probe sequences.

The following two sections describe ways you can reduce the primary clustering effect.

### Quadratic Probing

The reason linear probing produces clusters is that items that map to any location within a cluster end up at the end of the cluster, making it larger. One way to prevent that is _quadratic probing_. Instead of adding a constant stride to locations to create a probe sequence, the algorithm adds the square of the number of locations it has tried to create the probe sequence.

In other words, if ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0023.png) is the probe sequence created by linear probing, the sequence created by quadratic probing is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0024.png)  .

Now, if two items map to different positions in the same cluster, they don't follow the same probe sequences, so they don't necessarily end up adding to the cluster.

[Figure 8.4](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0004) shows an example. Initially, the table has a cluster containing five items. The value 71 has the probe sequence ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0025.png) , so it doesn't add to the cluster. The value 93 initially maps to the same cluster but has the probe sequence ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0026.png) , so it doesn't add to the cluster, either.

![Illustration of quadratic probing that reduces primary clustering.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f004.jpg)

[**Figure 8.4**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0004)**:** Quadratic probing reduces primary clustering.

The QuadraticProbing example program, shown in [Figure 8.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0005), uses quadratic probing to store random values in a hash table. If you compare this figure to [Figure 8.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0003), you'll see that quadratic probing gives a shorter average probe sequence length than linear probing. In this example, linear probing gave an average probe sequence length of 2.42 but quadratic probing gave an average probe sequence length of only 1.92.

![Screenshot of the average probe sequence length is shorter with quadratic probing than it is with linear probing.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f005.jpg)

[**Figure 8.5**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0005)**:** The average probe sequence length is shorter with quadratic probing than it is with linear probing.

### NOTE

The program shown in [Figure 8.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0005) is part of the solution to Exercise 8.4. See [Appendix B](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/b02.xhtml) for more information.

Quadratic probing reduces primary clustering, but it can suffer from secondary clustering. In _secondary clustering_, values that map to the same initial position in the array follow the same probe sequence, so they create a cluster. This cluster is spread out through the array, but it still results in longer probe sequences for the items that map to the same initial position.

Quadratic probing also has the drawback that it may fail to find an empty entry for a value even if a few empty positions are left in the table. Because of how a quadratic probe sequence jumps farther and farther through the array, it may jump over an empty position and not find it.

### Pseudorandom Probing

_Pseudorandom probing_ is similar to linear probing, except that the stride is given by a pseudorandom function of the initially mapped location. In other words, if a value initially maps to position K, its probe sequence is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0027.png)  , where p is determined by a pseudorandom function of K.

Like quadratic probing, pseudorandom probing prevents primary clustering. Also like quadratic probing, pseudorandom probing is subject to secondary clustering, because values that map to the same initial position follow the same probe sequences.

Pseudorandom probing may also skip over some unused entries and fail to insert an item even though the table isn't completely full.

The result is similar to that of quadratic probing; you're just using a different method for building the probe sequence.

### Double Hashing

The reason quadratic probing and pseudorandom probing suffer from secondary clustering is that values that map to the same initial location then follow the same probe sequence. You can reduce that effect if you make values that map to the same location follow different probe sequences.

Double hashing is similar to pseudorandom probing. However, instead of using a pseudorandom function of the initial location to create a stride value, it uses a second hashing function to map the original value to a stride.

For example, suppose the values A and B both initially map to position K. In pseudorandom probing, a pseudo-random function ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0028.png) generates a stride ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0029.png) . Then both values use the probe sequence ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0030.png) .

In contrast, double hashing uses a pseudorandom hash function ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0031.png) to map the original values A and B to two different stride values ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0032.png) and ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0033.png) . The two probe sequences start at the same value K, but after that they are different.

Double hashing eliminates primary and secondary clustering. However, like pseudorandom probing, double hashing may skip some unused entries and fail to insert an item even though the table isn't completely full.

### Ordered Hashing

In some applications, values are hashed once and then looked up many times. For example, a program that uses a dictionary, address book, or product lookup table might follow this approach. In that case, it is more important that the program be able to find values quickly than to insert them quickly.

A hash table with chaining can find items more quickly if its linked lists are sorted. When searching for an item, the algorithm can stop if it ever finds an item that is larger than the target item.

Similarly, you can arrange a hash table in an ordered manner. Suppose the probe sequence for value K visits array locations with values ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0034.png) , ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0035.png) , and so forth, where all of the ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0036.png) are less than K. In other words, all of the values along K's probe sequence are less than K.

Note that the values need not be in a strictly increasing order. For example, the probe sequence for the value 71 might encounter the values 61, 32, and then 71. That's okay as long as the probe sequence for 32 doesn't follow the same path so that it visits 61 before 32.

If you can arrange the array in this way, you can make searching for an item faster by stopping if you ever find a value greater than the target value.

The following pseudocode shows at a high level how you can find an item in an ordered hash table:

```
// Return the location of the key in the array or -1 if it is
```

The exact arrangements of the hash tables described so far depend on the order in which items are added to the table. For example, suppose a hash table's array has 10 entries and the hashing function maps the value K to K mod 10. If you add the values 11, 21, 31, 41 to the hash table, they are stored in that order in positions 1 through 4. However, if you add the same items in the order 41, 31, 21, 11, they are stored in the same positions, but in reverse order.

Suppose that you can add the values to the hash table in sorted order, smallest to largest. Then, when you add a value, if the table already holds any values in the new value's probe sequence, they must be smaller than the new value, because you're adding the values in sorted order. That means each probe sequence must be properly ordered so that you can search the table quickly.

Unfortunately, you often cannot add the items to a hash table in sorted order because you don't know that order when you start. For example, you may only add a few items at a time to the table over a long period. Fortunately, there is a way to create an ordered hash table no matter how you add the items.

To add an item, follow its probe sequence as usual. If you find an empty spot, insert the item and you're done. If you find a spot containing a value that is larger than the new value, replace it with the new value and then rehash the larger value.

As you rehash the larger value, you may encounter another, even larger value. If that happens, drop the item you're hashing in the new position and rehash the larger value. Continue the process until you find an empty spot for whatever item you're currently hashing.

The following pseudocode shows the process at a high level:

```
AddItem(Integer: array[], Integer: key)
```

The final step inside the `While` loop sets `probe` equal to the next location in the current key's probe sequence. For linear probing, pseudorandom probing, and double hashing, you can figure out the next item in the probe sequence even if you switched the `key` value you're hashing for a larger value. For example, with double hashing, you can apply the second hashing function to the new `key` value to find the new probe sequence's stride. You can then use the new stride to follow the new item's probe sequence from that point.

That doesn't work for quadratic probing, because you would need to know how far the algorithm had searched the new key's probe sequence to get to that point.

The reason this method works is that you only replace values with smaller values. If you replace a value in an ordered probe sequence with a smaller value, the probe sequence is still ordered.

The only value that might still be in question is the new larger value you're rehashing. When you rehash that value, it ends up in a position that makes its probe sequence ordered.

## Summary

Hash tables allow you to store and locate values very quickly. If a hash table has a reasonably low fill percentage, finding an item may require only a couple calculations.

It is important to maintain a reasonable fill percentage, however, because if a hash table becomes too full, its performance suffers. A lower fill percentage gives better performance but requires extra space that isn't used to hold data, so in some sense it is wasted. Too high a fill percentage can slow performance and increases the risk that the hash table will become full. This requires you to resize the hash table, which can take a considerable amount of time and memory.

This is a good example of a space/time trade-off that is common in algorithms. By using extra space, you can improve an algorithm's performance.

Ordered hashing provides another kind of trade-off. If you spend extra time up front building a hash table, later searching is much faster. When inserting a value, the program may find a value that is larger than the one it is inserting. In that case, it switches values and continues to rehash the larger one. One way to do that is recursion: making the insertion algorithm call itself. The next chapter discusses recursion in detail. It covers good and bad uses of recursion and explains how you can remove recursion from a program if deep call stacks or frequent recalculation of values cause problems.

## Exercises

You can find the answers to these exercises in [Appendix B](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/b02.xhtml). Asterisks indicate particularly difficult problems.

For the exercises that ask you to build a hash table, create an interface similar to [Figure 8.6](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#c08-fig-0006). The example shown in the figure sets each item's value to its key value with a `v` added in front so that you can tell it's a string. It displays an entry's value in the format `[key:value]`.

![Screenshot of the interface that lets you build and test hash tables.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08f006.jpg)

[**Figure 8.6**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c08.xhtml#R_c08-fig-0006)**:** This interface lets you build and test hash tables.

The Create button creates a new hash table. The Make Items button lets you add many random items to the hash table all at once. The Insert and Find buttons add or find a single item. After each change to the table or its data, display the number of keys per bucket for chaining algorithms or the fill percentage for open addressing algorithms. Also display the maximum and average probe length when you try to find all of the values between the minimum and maximum values used to fill the table.

1.  Write a program that implements a hash table with chaining.
2.  Modify the program you wrote for Exercise 1 to use sorted chains. Compare the average probe lengths of the two programs when the hash tables use 10 buckets and hold 100 items.
3.  Graph the average probe sequence length for the programs you built for Exercises 1 and 2 when the hash tables use 10 buckets and hold 50, 100, 150, 200, and 250 items. What can you deduce from the graph?
4.  Write a program that builds a hash table that uses open addressing with linear probing.
5.  Write a program that builds a hash table that uses open addressing with quadratic probing.
6.  Write a program that builds a hash table that uses open addressing with pseudorandom probing.
7.  Write a program that builds a hash table that uses open addressing with double hashing.
8.  Linear probing always finds an empty spot for a value if a spot is available, but quadratic probing, pseudorandom probing, and double hashing may all skip empty entries and conclude that the table is full when it is not. How can you pick the table size N to prevent quadratic probing, pseudorandom probing, and double hashing from concluding that the hash table is full even if it is not?
9.  Write a program that builds a hash table that uses open addressing with ordered quadratic hashing.
10.  Write a program that builds a hash table that uses open addressing with ordered double hashing.
11.  To see how the different open addressing algorithms compare, graph the average probe sequence length for the programs you built for Exercises 4, 5, 6, 7, 9, and 10. Use a table with 101 entries, and plot values when the table holds 50, 60, 70, 80, and 90 values. What can you deduce from the graph?
12.  Suppose a hash table uses buckets with sorted chaining. To insert a key, you need to search its bucket to verify that it is not present. If the table uses B buckets and contains N items, that takes roughly ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0037.png) steps on average. After you verify that the key is not present, you need to insert it in the correct position in its chain, which takes another ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0038.png) steps. Why is this faster than the ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0009.png) steps needed to insert an item if the chains are not sorted?
13.  Suppose you want to double the number of buckets used by a hash table that uses buckets with chaining. How would you split a bucket in two? What if the chains are sorted?
14.  Suppose that you're using a hash table with open addressing and you mark removed entries with a special value such as ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c08-i0015.png) . When you insert a new item, you can place it in a spot that has been marked as deleted if you find such a spot. Now suppose you add and remove many items so that the table is full of marked entries. Why does that slow down inserting new items?
15.  In open addressing with linear probing, what is the probability that two random values will land adjacent to each other and start a small cluster if the table is initially empty?
16.  When you insert an item in an ordered hash table that uses open addressing, you sometimes find a larger value along an item's probe sequence. In that case, you deposit the new item and rehash the larger value. How do you know that this process will eventually stop? What is the largest number of items that you might move during this process?
17.  In ordered hashing, what happens if the algorithm is unable to find an empty position to add a new item even if the table isn't full?

*   [Support](https://www.oreilly.com/online-learning/support/)