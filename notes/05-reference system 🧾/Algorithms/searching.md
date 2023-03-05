# CHAPTER 7  Searching

The preceding chapter explained how you can sort data. Algorithms such as quicksort and heapsort let you sort large amounts of data quickly. Algorithms such as countingsort and bucketsort let you sort data almost as quickly as a program can examine it, but only under certain special circumstances.

One of the advantages of sorted data is that it lets you find specific items relatively quickly. For example, you can locate a particular word in a dictionary containing tens of thousands of words in just a minute or two because all the words are arranged in sorted order. (Imagine trying to find a word if the dictionary wasn't sorted!)

This chapter explains algorithms that you can use to find a particular piece of data in a sorted array.

### NOTE

The algorithms described in this chapter work with simple arrays, not more specialized data structures. Specialized data structures such as trees also let you quickly find an item with a specific value. [Chapter 10](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c10.xhtml), “Trees,” discusses algorithms for working with trees.

Some programming libraries include searching tools that locate items in a sorted array. For example, the .NET Framework's `Array` class provides a `BinarySearch` method. These methods generally are fast, so in practice you may want to use those tools to save time writing and debugging the searching code.

It's still important to understand how searching algorithms work, however, because sometimes you can do even better than the tools. For example, interpolation search is much faster than binary search when it is applicable.

## Linear Search

As you may be able to guess from its name, a _linear search_ or _exhaustive search_ simply loops through the items in the array, looking for the target item. [Figure 7.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#c07-fig-0001) shows a linear search for the value 77.

![Illustration of a linear search examines every item in the array until it finds the target item.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07f001.jpg)

[**Figure 7.1**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#R_c07-fig-0001)**:** A linear search examines every item in the array until it finds the target item.

Unlike binary search and interpolation search, linear search works on linked lists, where you cannot easily jump from one part of the list to another, as you can in an array.

Linear search also works on unsorted lists. If the items are sorted, however, the algorithm can stop if it ever comes to an item with a value greater than the target value. That lets the algorithm stop early and save a little time if the target value isn't in the list.

The following pseudocode shows the linear search algorithm for an array:

```
// Find the target item's index in the sorted array.
```

This algorithm may need to loop through the entire array to conclude that an item isn't there, so its worst-case behavior is O(N).

Even in the average case, the algorithm's run time is O(N). If you add up the number of steps required to search for every item in the array, you get ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07-i0004.png) . If you divide that total by N to get the average search time for all the N items, you get ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07-i0005.png) , which is still O(N).

This algorithm is much slower than binary search or interpolation search, but it has the advantage that it works on linked lists and unsorted lists.

## Binary Search

A _binary search algorithm_ uses a divide-and-conquer strategy to narrow down quickly the part of the array that might contain the target value. The algorithm keeps track of the largest and smallest indices that the target item might have in the array. Initially, those bounds (call them `min` and `max`) are set to 0 and the largest index in the array.

The algorithm then calculates the index halfway between `min` and `max` (call it `mid`). If the target is less than the array's value at `mid`, the algorithm resets `max` to search the left half of the array and starts over. If the target is greater than the array's value at `mid`, the algorithm resets `min` to search the right half of the array and starts over. If the target equals the array's value at `mid`, the algorithm returns the index `mid`.

[Figure 7.2](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#c07-fig-0002) shows a binary search for the value 77.

![Illustration of binary search for the value 77](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07f002.jpg)

[**Figure 7.2**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#R_c07-fig-0002)**:** A binary search repeatedly divides the part of the array that might contain the target item into two halves and then searches the appropriate half.

The following pseudocode shows the algorithm:

```
// Find the target item's index in the sorted array.
```

At each step, this algorithm halves the number of items that might contain the target. If the array contains N items, then after O(log N) steps, the section of the array that might hold the target contains only one item, so the algorithm either finds the item or concludes that it isn't in the array. This means that the algorithm has O(log N) run time.

## Interpolation Search

At every step, binary search examines the item in the middle of the section of the array that it is considering. In contrast, _interpolation search_ uses the value of the target item to guess where in the array it might lie and achieve much faster search times.

For example, suppose that the array contains 1,000 items with values between 1 and 100. If the target value is 30, then it should lie about 30 percent of the way from the smallest to the largest value, so you can guess that the item may be somewhere near index 300. Depending on the distribution of the numbers in the array, this may not be exactly correct, but it should get you fairly close to the target item's position.

[Figure 7.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#c07-fig-0003) shows an interpolation search for the value 77.

![Illustration of interpolation search for the value 77.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07f003.jpg)

[**Figure 7.3**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#R_c07-fig-0003)**:** Interpolation search uses the target item's value to calculate where it should be in the remaining part of the array.

The following pseudocode shows the algorithm at a high level:

```
Integer: InterpolationSearch(Data values[], Data target)
```

This high-level description leaves a couple of problems unsolved. The `mid` calculation can result in an overflow or a value of `mid` that is not between `min` and `max`. Solving those problems is left as part of Exercise 6 in this chapter.

The trickiest part of this algorithm is the statement that calculates `mid`. The value is set to the current value of `min` plus the distance between `min` and `max` when scaled by the expected fraction of the distance between `values[min]` and `values[max]` where `target` should lie.

For example, if `values[min]` is 100, `values[max]` is 200, and `target` is 125, then you would use the following calculation to decide where to look for the target value:

```
(target - values[min]) / (values[max] - values[min]) =
```

That puts the new value for `mid` one-quarter of the way from `min` to `max`.

In the worst case, if the data is extremely unevenly distributed and you're looking for the worst possible target value, this algorithm has O(N) performance. If the distribution is reasonably uniform, the expected performance is O(log(log N)). (Proving that, however, is outside the scope of this book.)

## Majority Voting

Voting is basically a specialized kind of searching. The goal in the _majority voting problem_ is to determine a sequence's majority item—the item that appears more than half of the time. For example, suppose you poll 30 students and ask them whether they prefer chocolate, strawberry, or vanilla ice cream. The majority voting problem asks you to determine the majority opinion.

Note that there may not be a majority item. For example, suppose 14 students pick chocolate, 6 pick strawberry, and 10 pick vanilla. In that case, none of the choices receives more than half of the votes, so there is no majority.

One obvious majority voting algorithm is to loop through the list of items and keep a counter indicating the number of times each was chosen. If there are M possible values (chocolate, strawberry, and vanilla) and the list contains N items (30 students give 30 results in this example), then this algorithm takes O(N) time to scan the results and O(M) space to hold the counters.

Each of the O(N) steps will also require some time to find the appropriate counter. For example, if you use a hash table to store the counters, then finding them will be relatively quick. If you store the counters in an array or linked list, then finding the appropriate counter to increment will be slower.

This algorithm has the advantage of being very simple and intuitive. It can also find the mode of the votes, in case no item occurs more than half of the time. (The _mode_ is the outcome that occurred most often.) For example, if 14 students pick chocolate, 6 pick strawberry, and 10 pick vanilla, then this algorithm can fairly easily determine that chocolate was the mode even though it didn't receive a majority of the votes.

The Boyer-Moore majority vote algorithm is an interesting algorithm that can find the majority item in O(N) time using only O(1) space. To find the majority, the algorithm uses two variables: `Majority` to hold an outcome and `Count` to hold a counter. The following pseudocode shows how the algorithm works:

```
Outcome: BoyerMooreVote(List<Outcome> outcomes)
```

The algorithm initializes variable `counter` to 0 and then loops through the list of items. When it examines an item, if `counter` is currently 0, then the algorithm saves the current item in variable `majority` and sets `counter` to 1.

If `counter` is not 0 when it examines an item, the algorithm compares the new item to the one stored in `majority`. If the new item matches `majority`, then the algorithm increments `counter`, essentially casting another vote for this item.

If `counter` is not 0 and the new item is different from `majority`, then the algorithm decrements `count`, essentially removing a vote for `majority`.

After the algorithm finishes, the variable `majority` holds the result. If there is a majority item, then the result is correct. If there is no majority item, then the algorithm returns something, but the result is not guaranteed to be the mode.

To understand why the algorithm works, suppose that the majority item is m. During any step of the algorithm, define the value C to be the value in `counter` if `majority` currently holds m, and let C be the negative of the value in `counter` otherwise. Whenever the algorithm sees m, it increases C. When the algorithm sees some other item, it either increases or decreases C, depending on whether the new outcome matches the value currently stored in `majority`.

Because m is the majority item, the algorithm must increase C more than it decreases C, so when the algorithm finishes, C will be positive. That happens only when `majority` holds m, so m must hold that value when the algorithm finishes.

## Summary

[Table 7.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#c07-tbl-0001) shows the values of N, log N, and log(log N) for different values of N so that you can compare the speeds of linear search, binary search, and interpolation search.

[**Table 7.1**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#R_c07-tbl-0001)**:** Algorithm Characteristics

N

log2 N

log2(log2 N)

1,000

10.0

3.3

1,000,000

19.9

4.3

1,000,000,000

29.9

4.9

1,000,000,000,000

39.9

5.3

Linear search is useful only for relatively small arrays. [Table 7.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c07.xhtml#c07-tbl-0001) shows that binary search works well even for very large arrays. It can search an array containing 1 trillion items in only about 40 steps.

Interpolation search works well for arrays of any size that you can reasonably fit on a computer. It can search an array containing 1 trillion items in only about five steps. In fact, an array would need to hold more than ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c07-i0006.png) items before interpolation search would require an expected number of steps greater than nine.

However, the exact number of steps for interpolation search depends on the distribution of the values. Sometimes the algorithm gets lucky and finds the target in one or two steps. At other times, it might need four or five steps. On average, however, it is extremely fast.

The Boyer-Moore majority voting algorithm is a particularly odd algorithm because it produces the correct result only sometimes, and it doesn't tell you whether the result is correct.

## Exercises

You can find the answers to these exercises in [Appendix B](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/b02.xhtml). Asterisks indicate particularly difficult problems.

If you're not familiar with recursion, skip Exercises 2, 5, and 7 and come back to them after you read [Chapter 15](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c15.xhtml).

1.  Write a program that implements linear search.
2.  Write a program that implements linear search recursively. Does this version have any advantages or disadvantages compared to the nonrecursive version?
3.  Write a program that implements linear search with sorted linked lists.
4.  Write a program that implements binary search.
5.  Write a program that implements binary search recursively. Does this version have any advantages or disadvantages compared to the nonrecursive version?
6.  Write a program that implements interpolation search.
7.  Write a program that implements interpolation search recursively. Does this version have any advantages or disadvantages compared to the nonrecursive version?
8.  Which sorting algorithm described in [Chapter 6](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml), “Sorting,” uses a technique reminiscent of the technique used by interpolation search?
9.  If an array contains duplicates, the binary search and interpolation search algorithms described in this chapter don't guarantee that they return the first instance of the target item. How could you modify them to return the first occurrence of the target item? What is the run time for the modified version?
10.  In the Boyer-Moore majority voting algorithm, what happens if outcome M occurs exactly half of the time in the list of outcomes? Can you make two example lists, one that causes the algorithm to return M and one that returns some other value?
11.  The Boyer-Moore majority voting algorithm always returns an outcome, but if there is no majority, the result is not guaranteed to be the most common outcome in the list. How could you modify that algorithm to indicate whether the result is really a majority without changing the O(N) run time and O(1) memory characteristics?

*   [Support](https://www.oreilly.com/online-learning/support/)
*   [Sign Out](https://learning.oreilly.com/accounts/logout/)

©2022 O'Reilly Media, Inc. 

*   [Terms of Service](https://www.oreilly.com/terms/)
*   [Privacy Policy](https://learning.oreilly.com/privacy)