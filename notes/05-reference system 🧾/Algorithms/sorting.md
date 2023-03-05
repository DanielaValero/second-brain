# CHAPTER 6   Sorting

Sorting algorithms are usually covered in great detail in algorithms books for several reasons.

*   They are interesting and demonstrate several useful techniques, such as recursion, divide and conquer, heaps, and trees.
*   Sorting algorithms are well-studied and are some of the few algorithms for which exact run times are known. It can be shown that the fastest possible algorithm that uses comparisons to sort N items must use O(N log N) time. Several sorting algorithms actually achieve that performance, so in some sense they are optimal.
*   Sorting algorithms are useful. Almost any data is more useful when it is sorted in various ways, so sorting algorithms play an important role in many applications.

This chapter describes several different sorting algorithms. Some, such as insertionsort, selectionsort, and bubblesort, are relatively simple but slow. Others, such as heapsort, quicksort, and mergesort, are more complicated but much faster. Still others, such as countingsort and pigeonhole sort, don't use comparisons to sort items, so they can break the O(N log N) barrier and perform amazingly fast under the right circumstances.

The following sections categorize the algorithms by their run-time performance.

### NOTE

Many programming libraries, such as C# and Python, include sorting tools, and they usually are quite fast. In practice, you may want to use those tools to save time writing and debugging the sorting code. It's still important to understand how sorting algorithms work, however, because sometimes you can do even better than the built-in tools. For example, a simple bubblesort algorithm may beat a more complicated library routine for very small lists, and countingsort often beats the tools if the data being sorted has the right characteristics.

## ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0012.png) Algorithms

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0013.png) algorithms are relatively slow but fairly simple. In fact, their simplicity sometimes lets them outperform faster but more complicated algorithms for very small arrays.

### Insertionsort in Arrays

[Chapter 3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c03.xhtml) described an insertionsort algorithm that sorts items in linked lists. [Chapter 5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c05.xhtml) described insertionsort algorithms that use stacks and queues. The basic idea is to take an item from the input list and insert it into the proper position in a sorted output list (which initially starts empty).

[Chapter 3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c03.xhtml) explained how to do this in linked lists, but you can use the same steps to sort an array. The following pseudocode shows the algorithm for use with arrays:

```
Insertionsort(Data: values[])
```

As the code loops through the items in the array, the index `i` separates the items that have been sorted from those that have not. The items with an index less than `i` have already been sorted, and those with an index greater than or equal to `i` have not yet been sorted.

As `i` goes from 0 to the last index in the array, the code moves the item at index `i` into the proper position in the sorted part of the array.

To find the item's position, the code looks through the already sorted items and finds the first item that is greater than the new value `values[i]`.

The code then moves `values[i]` into its new position. Unfortunately, this can be a time-consuming step. Suppose that the item's new index should be `j`. In that case, the code must move the items between indices `j` and `i`, one position to the right to make room for the item at position `j`.

[Figure 6.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0001) shows the algorithm's key steps. The image at the top shows the original unsorted array. In the middle image, the first four items (outlined in bold) have been sorted, and the algorithm is preparing to insert the next item (which has value 3) into the sorted part of the array. The algorithm searches through the sorted items until it determines that the value 3 should be inserted before the value 5. At the bottom of the figure, the algorithm has moved the values 5, 6, and 7 to the right to make room for value 3. The algorithm inserts value 3 and continues the `For` loop to insert the next item (which has value 2) into its correct position.

![Illustration of Insertionsort inserts items into the sorted part of the array.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f001.jpg)

[**Figure 6.1**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0001)**:** Insertionsort inserts items into the sorted part of the array.

This algorithm sorts the items in the original array, so it doesn't need any additional storage (aside from a few variables to control loops and move items).

If the array contains N items, the algorithm considers each of the N positions in the array. For each position `i`, it must search the previously sorted items in the array to find the `i`th item's new position. It must then move the items between that location and index `i` one position to the right. If the item `i` should be moved to position `j`, it takes `j` steps to find the new location `j` and then `i` – `j` more steps to move items over, resulting in a total of `i` steps. That means in total it takes `i` steps to move item `i` into its new position.

Adding up all the steps required to position the items, the total run time is as follows:

![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0001.png)

This means that the algorithm has run time ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0001.png) . This isn't a very fast run time, but it's fast enough for reasonably small arrays (fewer than 10,000 or so items). It's also a relatively simple algorithm, so it may sometimes be faster than more complicated algorithms for very small arrays. How small an array must be for this algorithm to outperform more complicated algorithms depends on your system. Typically, this algorithm is only faster for arrays holding fewer than 5 or 10 items.

### Selectionsort in Arrays

In addition to describing insertionsort for linked lists, [Chapter 3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c03.xhtml) also described selectionsort for linked lists. Similarly, [Chapter 5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c05.xhtml) described selectionsort algorithms that use stacks and queues.

The basic idea is to search the input list for the largest item it contains and then add it to the end of a growing sorted list. The following pseudocode shows the algorithm for use with arrays:

```
Selectionsort(Data: values[])
```

The code loops through the array to find the smallest item that has not yet been added to the sorted part of the array. It then swaps that smallest item with the item in position `i`.

[Figure 6.2](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0002) shows the algorithm's key steps. The image at the top shows the original unsorted array. In the middle image, the first three items (outlined in bold) have been sorted, and the algorithm is preparing to swap the next item into position. The algorithm searches the unsorted items to find the one with the smallest value (3 in this case). The algorithm then swaps the item that has the smallest value into the next unsorted position. The image at the bottom of the figure shows the array after the new item has been moved to the sorted part of the array. The algorithm now continues the `For` loop to add the next item (which has value 5) to the growing sorted portion of the array.

![Illustration of key steps of the algorithm.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f002.jpg)

[**Figure 6.2**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0002)**:** Selectionsort moves the smallest unsorted item to the end of the sorted part of the array.

Like insertionsort, this algorithm sorts the items in the original array, so it doesn't need any additional storage (aside from a few variables to control loops and move items).

If the array contains N items, the algorithm considers each of the N positions in the array. For each position `i`, it must search the N – `i` items that have not yet been sorted to find the item that belongs in position `i`. It then swaps the item into its final position in a small constant number of steps. Adding up the steps to move all of the items gives the following run time:

![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0002.png)

This means that the algorithm has run time ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0015.png) —the same run time as insertionsort.

Like insertionsort, selectionsort is fast enough for reasonably small arrays (fewer than 10,000 or so items). It's also a fairly simple algorithm, so it may sometimes be faster than more complicated algorithms for very small arrays (typically 5 to 10 items).

### Bubblesort

_Bubblesort_ uses the fairly obvious fact that if an array is not sorted, then it must contain two adjacent elements that are out of order. The algorithm repeatedly passes through the array, swapping items that are out of order, until it can't find any more swaps.

The following pseudocode shows the bubblesort algorithm:

```
Bubblesort(Data: values[])
```

The code uses a Boolean variable named `not_sorted` to keep track of whether it has found a swap in its most recent pass through the array. As long as `not_sorted` is true, the algorithm loops through the array, looking for adjacent pairs of items that are out of order and swaps them.

[Figure 6.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0003) shows an example. The array on the far left is mostly sorted. During the first pass through the array, the algorithm finds that the 6/3 pair is out of order (6 should come after 3), so it swaps 6 and 3 to get the second arrangement of values. During the second pass through the array, the algorithm finds that the 5/3 pair is out of order, so it swaps 5 and 3 to get the third arrangement of values. During the third pass through the array, the algorithm finds that the 4/3 pair is out of order, so it swaps 4 and 3, giving the arrangement on the far right in the figure. The algorithm performs one final pass, finds no pairs that are out of order, and ends.

![Illustration of bubblesort, items that are farther down than they should be slowly “bubble up” to their correct positions.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f003.jpg)

[**Figure 6.3**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0003)**:** In bubblesort, items that are farther down than they should be slowly “bubble up” to their correct positions.

The fact that item 3 seems to bubble up slowly to its correct position gives the bubblesort algorithm its name.

During each pass through the array, at least one item reaches its final position. In [Figure 6.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0003), item 6 reaches its final destination during the first pass, item 5 reaches its final destination during the second pass, and items 3 and 4 reach their final destinations during the third pass.

If the array holds N items and at least one item reaches its final position during each pass through the array, then the algorithm can perform, at most, N passes. (If the array is initially sorted in reverse order, the algorithm needs all N passes.) Each pass takes N steps, so the total run time is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0014.png).

Like insertionsort and selectionsort, bubblesort is fairly slow but may provide acceptable performance for small lists (fewer than 1,000 or so items). It is also sometimes faster than more complicated algorithms for very small lists (five or so items).

You can make several improvements to bubblesort. First, in [Figure 6.3](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0003), the item with value 3 started out below its final correct position. However, consider what happens if an item starts above its final position. In that case, the algorithm finds that the item is out of position and swaps it with the following item. It then considers the next position in the array and considers the item again. If the item is still out of position, the algorithm swaps it again. The algorithm continues swapping that item down through the list until it reaches its final position in a single pass through the array. You can use this fact to speed up the algorithm by alternating downward and upward passes through the array. Downward passes quickly move items that are too high in the array, and upward passes quickly move items that are too low in the array.

This upward and downward version of bubblesort is sometimes called _cocktail shaker sort_.

To make a second improvement, notice that some items may move through several swaps at once. For example, during a downward pass, a large item (call it K) may be swapped several times before it reaches a larger item, and it stops for that pass. You can save a little time if you don't put item K back in the array for every swap. Instead, you can store K in a temporary variable and move other items up in the array until you find the spot where K stops. You then put K in that position and continue the pass through the array.

To make a final improvement, consider the largest item (call it L) that is not in its final position. During a downward pass, the algorithm reaches that item (possibly making other swaps beforehand) and swaps it down through the list until it reaches its final position. During the next pass through the array, no item can swap past L because L is in its final position. That means the algorithm can end its pass through the array when it reaches item L.

More generally, the algorithm can end its pass through the array when it reaches the position of the last swap that it made during the previous pass. If you keep track of the last swaps made during downward and upward passes through the array, you can shorten each pass.

[Figure 6.4](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0004) shows these three improvements. During the first pass down through the array, the algorithm swaps item 7 with items 4, 5, 6, and 3. It holds the value 7 in a temporary variable, so it doesn't need to save it back into the array until it reaches its final position.

![Illustration of how improvements make bubblesort faster, the final items are shaded to indicate that they don’t need to be checked during later passes.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f004.jpg)

[**Figure 6.4**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0004)**:** Improvements make bubblesort faster, but it still has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0058.png) performance.

After placing 7 after 3, the algorithm continues moving through the array and doesn't find any other items to swap, so it knows that item 7 and those that follow are in their final positions and don't need to be examined again. If some item nearer to the top of the array were larger than 7, the first pass would have swapped it down past 7. In the middle image shown in [Figure 6.4](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0004), the final items are shaded to indicate that they don't need to be checked during later passes.

The algorithm knows that item 7 and the items after it are in their final positions, so it starts its second pass, moving upward through the array at the first item before item 7, which is item 3. It swaps that item with items 6, 5, and 4, this time holding item 3 in a temporary variable until it reaches its final position.

Now item 3 and those that come before it in the array are in their final positions, so they are shaded in the last image in [Figure 6.4](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0004).

The algorithm makes one final downward pass through the array, starting the pass at value 4 and ending at value 6. No swaps occur during this pass, so the algorithm ends.

These improvements make bubblesort faster in practice. (In one test sorting 10,000 items, bubblesort took 2.50 seconds without improvements and 0.69 seconds with improvements.) But it still has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0011.png) performance, so there's a limit to the size of the list you can sort with bubblesort.

## ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0063.png) Algorithms

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0019.png) algorithms are much faster than ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0052.png) algorithms, at least for larger arrays. For example, if N is 1,000, ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0021.png) is less than ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0022.png) , but ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0023.png) is roughly 100 times as big at ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0024.png) . That difference in speed makes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0057.png) algorithms more useful in everyday programming, at least for large arrays.

### Heapsort

_Heapsort_ uses a data structure called a _heap_, which also demonstrates a useful technique for storing a complete binary tree in an array.

#### _Storing Complete Binary Trees_

A _binary tree_ is a tree where every node is connected to, at most, two children. In a _complete tree_ (binary or otherwise), all of the tree's levels are completely filled, except possibly the last level, where all of the nodes are pushed to the left.

[Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005) shows a complete binary tree holding 12 nodes. The tree's first three levels are full. The fourth level contains five nodes pushed to the left side of the tree.

![Illustration of a complete binary tree that holds 12 nodes.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f005.jpg)

[**Figure 6.5**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0005)**:** In a complete binary tree, every level is full, except possibly the last.

One useful feature of complete binary trees is that you can easily store them in an array using a simple formula. Start by placing the root node at index 0. Then, for any node with index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0026.png) , place its children at indices ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0027.png) and ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0028.png).

If a node has index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0029.png) , then its parent has index ⌊![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0030.png) ⌋, where ⌊ ⌋ means to truncate the result to the next-smallest integer. In other words, round down. For example, ⌊![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0031.png) ⌋ is 2, and ⌊ ⌋ is also 2.

[Figure 6.6](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0006) shows the tree shown in [Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005) stored in an array, with the entries' indices shown on top.

![Illustration of how you can easily store a complete binary tree in an array.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f006.jpg)

[**Figure 6.6**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0006)**:** You can easily store a complete binary tree in an array.

For example, the value 6 is at index 4, so its children should be at indices ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0033.png) and ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0034.png) 10. Those items have values 5 and 12. If you look at the tree shown in [Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005), you'll see that those are the correct children.

If the index of either child is greater than the largest index in the array, then the node doesn't have that child in the tree. For example, the value 9 has index 5. Its right child has index ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0035.png) , which is beyond the end of the array. If you look at [Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005), you'll see that the item with value 9 has no right child.

For an example of calculating a node's parent, consider the item with value 12 stored at index 10. The index of the parent is ⌊(10 – 1)/2⌋ = ⌊4.5⌋ = 4 . The value at index 4 is 6. If you look at the tree shown in [Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005), you'll see that the node with value 12 does have as its parent the node with value 6.

#### _Defining Heaps_

A _heap_, shown in [Figure 6.7](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0007), is a complete binary tree where every node holds a value that is at least as large as the values in all of its children. [Figure 6.5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0005) is not a heap, however, because the root node has a value of 7 and its right child has a value of 10, which is greater.

![Illustration of a heap, where the value of every node is at least as large as the values of its children.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f007.jpg)

[**Figure 6.7**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0007)**:** In a heap, the value of every node is at least as large as the values of its children.

You can build a heap one node at a time. Start with a tree consisting of a single node. Because the single node has no children, it satisfies the heap property.

Now suppose you have built a heap, and you want to add a new node to it. Add the new node at the end of the tree. There is only one place where you can add this node to keep the tree a complete binary tree—to the right of the nodes already in the bottom level of the tree.

Now compare the new value to the value of its parent. If the new value is larger than the parent's, swap them. Because the tree was previously a heap, you know that the parent's value was already larger than its other child (if it has one). By swapping it with an even larger value, you know that the heap property is preserved at this point.

However, you have changed the value of the parent node, so that might break the heap property farther up in the tree. Move up the tree to the parent node and compare its value to the value of its parent, swapping their values if necessary.

Continue up the tree, swapping values if necessary, until you reach a node where the heap property is satisfied. At that point, the tree is again a heap.

[Figure 6.8](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0008) shows this process when you add the value 12 to the tree shown in [Figure 6.7](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0007). [Figure 6.9](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0009) shows the new heap.

![Illustration of adding a new value to a heap, placing the value at the end of the tree and move it up as needed to restore the heap property.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f008.jpg)

[**Figure 6.8**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0008)**:** To add a new value to a heap, place the value at the end of the tree and move it up as needed to restore the heap property.

![Illustration of moving the value up to a node that already satisfies the heap property, the tree is once again a heap.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f009.jpg)

[**Figure 6.9**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0009)**:** When the value moves up to a node that already satisfies the heap property, the tree is once again a heap.

Storing the heap in an array makes this process particularly easy because when you need to add a new item to the end of the tree, it's already in the proper position in the array. When you store a complete binary tree in an array, the next item belongs on the right, on the tree's bottom level. In the array, that's the position that comes after the last entry that is already in the tree. This means you don't need to do anything to place the next item in the tree. All you need to do is to swap it up through the tree to restore the heap property.

The following pseudocode shows the algorithm to turn an array into a heap:

```
MakeHeap(Data: values[])
```

You may recall from [Chapter 5](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c05.xhtml), “Stacks and Queues,” that a _priority queue_ is a queue that returns objects in the order of their priorities. Heaps are useful for creating priority queues because the largest item in the tree is always at the root node. If you use the items' priorities to build the heap, then the item with the highest priority is at the top. To remove an item from the priority queue, you simply use the item at the root.

Unfortunately, that breaks the heap, so it has no root and is therefore no longer a tree. Fortunately, there's an easy way to fix it: move the last item in the tree to the root.

Doing that breaks the tree's heap property, but you can fix that by using a method similar to the one you used to build the heap. If the new root value is smaller than one of its child values, swap it with the larger child. That fixes the heap property at this node, but it may have broken it at the child's level, so move down to that node and repeat the process. Continue swapping the node down into the tree until you find a spot where the heap property is already satisfied or you reach the bottom of the tree.

The following pseudocode shows the algorithm to remove an item from the heap and restore the heap property:

```
Data: RemoveTopItem (Data: values[], Integer: count)
```

This algorithm takes as a parameter the size of the tree, so it can find the location where the heap ends within the array.

The algorithm starts by saving the value at the root node so that it later can return the highest-priority value. It then moves the last item in the tree to the root node.

The algorithm sets the variable `index` to the index of the root node and then enters an infinite `While` loop.

Inside the loop, the algorithm calculates the indices of the children of the current node. If either of those indices is off the end of the tree, then it is set to the current node's index. In that case, when the node's values are compared later, the current node's value is compared to itself. Because any value is greater than or equal to itself, that comparison satisfies the heap property, so the missing node does not make the algorithm swap values.

After the algorithm calculates the child indices, it checks whether the heap property is satisfied at this point. If it is, then the algorithm breaks out of the `While` loop. (If both child nodes are missing or if one is missing and the other satisfies the heap property, then the `While` loop also ends.)

If the heap property is not satisfied, the algorithm sets `swap_child` to the index of the child that holds the larger value and swaps the parent node's value with that child node's value. It then updates the `index` variable to move down to the swapped child node and continues down the tree.

#### _Implementing Heapsort_

Now that you know how to build and maintain a heap, implementing the heapsort algorithm is easy. The algorithm builds a heap. It then repeatedly swaps the first and last items in the heap and rebuilds the heap excluding the last item. During each pass, one item is removed from the heap and added to the end of the array where the items are placed in sorted order.

The following pseudocode shows how the algorithm works:

```
Heapsort(Data: values)
```

This algorithm starts by turning the array of values into a heap. It then repeatedly removes the top item, which is the largest, and moves it to the end of the heap. It reduces the number of items in the heap by one and restores the heap property, leaving the newly positioned item beyond the end of the heap in its proper sorted order.

When it is finished, the algorithm has removed the items from the heap in largest-to-smallest order and placed them at the end of the ever-shrinking heap. That leaves the array holding the values in smallest-to-largest order.

The space required by heapsort is easy to calculate. The algorithm stores all the data inside the original array and uses only a fixed number of extra variables for counting and swapping values. If the array holds N values, the algorithm uses ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0072.png) space.

The run time required by the algorithm is slightly harder to calculate. To build the initial heap, the algorithm adds each item to a growing heap. Each time it adds an item, it places the item at the end of the tree and swaps the item upward until the tree is again a heap. Because the tree is a complete binary tree, it is up to ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0038.png) levels tall, so pushing the item up through the tree can take, at most, ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0039.png) steps. The algorithm performs this step of adding an item and restoring the heap property N times, so the total time to build the initial heap is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0005.png).

To finish sorting, the algorithm removes each item from the heap and then restores the heap property. It does that by swapping the last item in the heap with the root node and then swapping the new root down through the tree until the heap property is restored. The tree is up to ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0042.png) levels tall, so this can take up to ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0053.png) time. The algorithm repeats this step N times, so the total number of steps required is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0046.png).

Adding the time needed to build the initial heap and the time to finish sorting gives a total time of ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0044.png).

Heapsort is an elegant “sort-in-place” algorithm that takes no extra storage. It also demonstrates some useful techniques such as heaps and storing a complete binary tree in an array.

Even though heapsort's ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0007.png) run time is asymptotically the fastest possible for an algorithm that sorts by using comparisons, the quicksort algorithm described in the next section usually runs slightly faster.

### Quicksort

The _quicksort algorithm_ uses a divide-and-conquer strategy. It subdivides an array into two pieces and then calls itself recursively to sort the pieces. The following pseudocode shows the algorithm at a high level:

```
Quicksort(Data: values[], Integer: start, Integer: end)
```

For example, the top of [Figure 6.10](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0010) shows an array of values to sort. In this case, I picked the first value, 6, for `divider`.

![Illustration of shows an array of values to sort.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f010.jpg)

[**Figure 6.10**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0010)**:** When the value moves up to a node that already satisfies the heap property, the tree is once again a heap.

In the middle image, values less than `divider` have been moved to the beginning of the array, and values greater than or equal to `divider` have been moved to the end of the array. The divider item is shaded at index 6. Notice that one other item has value 6, and it comes after the `divider` in the array.

The algorithm then calls itself recursively to sort the two pieces of the array before and after the `divider` item. The result is shown at the bottom of [Figure 6.10](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0010).

Before moving into the implementation details, let's study the algorithm's run-time behavior.

#### _Analyzing Quicksort's Run Time_

First, consider the special case in which the dividing item divides the part of the array that is of interest into two exactly equal halves at every step. [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011) shows the situation.

![Illustration of the call tree that shows calls to quicksort when the values in the array are perfectly balanced, so the algorithm divides the items into equal halves at every step.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f011.jpg)

[**Figure 6.11**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0011)**:** If the divider item divides the array into equal halves, the algorithm progresses quickly.

Each of the “nodes” in the tree shown in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011) represents a call to the quicksort algorithm. The thick line in the middle of the node shows how the array was divided into two equal halves. The two arrows out of the node represent the quicksort algorithm calling itself twice to process the two halves.

The nodes at the bottom of the tree represent calls to sort a single item. Because a list holding a single item is already sorted, those calls simply return without doing anything.

After the calls work their way to the bottom of the tree, they begin returning to the methods that called them, so control moves back up the tree.

If the array originally holds N items and the items divide exactly evenly, as shown in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011), then the tree of quicksort calls is log N levels tall.

Each call to quicksort must examine all the items in the piece of the array it is sorting. For example, a call to quicksort represented by a group of four boxes in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011) would need to examine those four boxes to divide its values further.

All of the items in the original array are present at each level of the tree, so each level of the tree contains N items. If you add up the items that each call to quicksort must examine at any level of the tree, you get N items. That means the calls to quicksort on any level require N steps.

The tree is log N levels tall, and each level requires N steps, so the algorithm's total run time is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0059.png).

All of this analysis assumes that the quicksort algorithm divides its part of the array into two equal-sized pieces at every step. In practice, that would be extremely unlikely.

Most of the time, however, the dividing item will belong somewhere more or less in the middle of the items that it is dividing. It won't be in the exact middle, but it won't be near the edges either. For example, in [Figure 6.10](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0010), the dividing item 6 ended up close to but not exactly in the middle in the second image. If the dividing item is usually somewhere near the middle of the values that it is dividing, then in the expected case, the quicksort algorithm still has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0045.png) performance.

In the worst case, suppose the dividing item is less than any of the other items in the part of the array that it is dividing. That happens if the items are already sorted when the algorithm begins. (The worst case also occurs if all of the items in the array have the same value.) In that case, none of the items goes into the left piece of the array, and all of the other items (except the dividing item) go into the right piece of the array. The first recursive call returns immediately because it doesn't need to sort any items, but the second call must process almost all the items. If the first call to quicksort had to sort N items, this recursive call must sort ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0048.png) items.

If the dividing item is always less than the other items in the part of the array being sorted, then the algorithm is called to sort N items, then ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0049.png) items, then ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0050.png) items, and so on. In that case, the call tree shown in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011) is extremely tall and thin, with a height of N.

The calls to quicksort at level `i` in the tree must examine N – `i` items. Adding up the items that all of the calls must examine gives ![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0003.png) which is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0051.png) so the algorithm's worst-case behavior is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0062.png).

In addition to examining the algorithm's run-time performance, you should consider the space it needs. This depends partly on the method you use to divide parts of the array into halves, but it also depends on the algorithm's depth of recursion. If the sequence of recursive calls is too deep, the program will exhaust its stack space and crash.

For the tree shown in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011), the quicksort algorithm calls itself recursively to a depth of log N calls. In the expected case, that means the program's call stack will be ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0061.png) levels deep. That shouldn't be a problem for most computers. Even if the array holds 1 billion items, log N is only about 30, and the call stack should be able to handle 30 recursive method calls.

For the tall thin tree created in the worst case, however, the depth of recursion is N. Few programs will be able to build a call stack safely with 1 billion recursive calls.

You can help avoid the worst-case scenario to make the algorithm run in a reasonable amount of time and with a reasonable depth of recursion by picking the dividing item carefully. The following section describes some strategies for doing that. The sections after that one describe two methods for dividing a section of an array into two halves. The final quicksort section summarizes issues with using quicksort in practice.

#### _Picking a Dividing Item_

One method of picking the dividing item is simply to use the first item in the part of the array being sorted. This is quick, simple, and usually effective. Unfortunately, if the array happens to be initially sorted or sorted in reverse, the result is the worst case. If the items are randomly arranged, this worst-case behavior is extremely unlikely, but it seems reasonable that the array of items might be initially sorted or mostly sorted for some applications.

One solution is to randomize the array before calling quicksort. If the items are randomly arranged, it is extremely unlikely that this method will pick a bad dividing item every time and result in worst-case behavior. [Chapter 2](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c02.xhtml), “Numerical Algorithms,” explains how to randomize an array in ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0060.png) time so that this won't add to quicksort's expected ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0064.png) run time, at least in Big O notation. In practice, however, it could still take a fair amount of time to randomize a large array, so most programmers don't use this approach.

Another approach is to examine the first, last, and middle items in the part of the array being sorted and use the value that is between the other two for the dividing item. This doesn't guarantee that the dividing item isn't close to the largest or smallest in this part of the array, but it does make it less likely.

A final approach is to pick a random index from the part of the array being sorted and then use the value at that index as the dividing item. It would be extremely unlikely that every such random selection would produce a bad dividing value and result in worst-case behavior.

#### _Implementing Quicksort with Stacks_

After you have picked a dividing item, you must divide the items into two sections to be placed at the front and back of the array. One easy way to do this is to move items into one of two stacks, depending on whether the item you are considering is greater than or less than the dividing item. The following pseudocode shows the algorithm for this step:

```
Stack of Data: before = New Stack of Data
```

At this point, the algorithm is ready to recursively call itself to sort the two pieces of the array on either side of the dividing item.

#### _Implementing Quicksort in Place_

Using stacks to split the items in the array into two groups as described in the preceding section is easy, but it requires you to allocate extra space for the stacks. You can save some time if you allocate the stacks at the beginning of the algorithm and then let every call to the algorithm share the same stacks instead of creating their own, but this still requires the stacks to hold ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0083.png) memory.

With a little more work, you can split the items into two groups without using any extra storage. The following high-level pseudocode shows the basic approach:

```
<Swap the dividing item to the beginning of the array.>
```

This code uses the first item as the dividing item. It places that item in a temporary variable and removes it from the array, leaving a hole.

The algorithm then searches the array from the back to the front until it finds a value that is less than the dividing item. It removes that value from its current location and moves it into the hole. Removing the item from its original location creates a new hole.

Next, the algorithm searches from the point of the old hole (now filled with the newly moved item) toward the back of the array until it finds an item that is greater than the dividing item. It moves that item to the current hole, creating a new hole where the item was originally.

The code continues searching back and forth through this section of the array, moving items into the holes left by previously moved items, until the two regions that it is searching meet somewhere in the middle. The algorithm deposits the dividing item in the hole, which is now between the two pieces, and recursively calls itself to sort the two pieces.

This is a fairly confusing step, but the actual code isn't all that long. If you study it closely, you should be able to figure out how it works.

```
<Search the array from back to front to find
```

The following pseudocode shows the entire quicksort algorithm at a low level:

```
// Sort the indicated part of the array.
```

This algorithm starts by checking whether the section of the array contains one or fewer items. If it does, then it is sorted, so the algorithm simply returns.

If the section of the array contains at least two items, the algorithm saves the first item as the dividing item. You can use some other dividing item selection method if you like. Just swap the dividing item you pick to the beginning of the section so that the algorithm can find it in the following steps.

Next the algorithm uses variables `lo` and `hi` to hold the highest index in the lower part of the array and the lowest index in the upper part of the array. It uses those variables to keep track of which items it has placed in the two halves. Those variables also alternately track where the hole is left after each step.

The algorithm then enters an infinite `While` loop that continues until the lower and upper pieces of the array grow to meet each other.

Inside the outer `While` loop, the algorithm starts at index `hi` and searches the array backward until it finds an item that should be in the lower piece of the array. It moves that item into the hole left behind by the dividing item.

Next the algorithm starts at index `lo` and searches the array forward until it finds an item that should be in the upper piece of the array. It moves that item into the hole left behind by the previously moved item.

The algorithm continues searching backward and then forward through the array until the two pieces meet. At that point, it puts the dividing item between the two pieces and recursively calls itself to sort the pieces.

#### _Using Quicksort_

If you divide the items in place instead of by using stacks or queues, quicksort doesn't use any extra storage (beyond a few variables).

Like heapsort, quicksort has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0047.png) expected performance, although quicksort can have ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0002.png) performance in the worst case. Heapsort has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0065.png) performance in all cases, so it is in some sense safer and more elegant. However, in practice, quicksort is usually faster than heapsort, so it is the algorithm of choice for many programmers.

In addition to greater speed, quicksort has another advantage over heapsort: it is parallelizable. Suppose a computer has more than one processor, which is increasingly the case these days. Each time the algorithm splits a section of the array into two pieces, it can use different processors to sort the two pieces. Theoretically, a highly parallel computer could use ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0037.png) processors to sort the list in ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0041.png) time. In practice, most computers have a fairly limited number of processors (for example, two or four), so the run time would be divided by the number of processors plus some additional overhead to manage the different threads of execution. That won't change the Big O run time, but it should improve performance in practice.

Because it has ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0006.png) performance in the worst case, the implementation of quicksort provided by a library may be cryptographically insecure. If the algorithm uses a simple dividing item selection strategy, such as picking the first item, an attacker might be able to create an array holding items in an order that gives worst-case performance. The attacker might be able to launch a denial-of-service (DOS) attack by passing your program that array and ruining your performance. Most programmers don't worry about this possibility, but if this is a concern, you can use a randomized dividing item selection strategy.

### Mergesort

Like quicksort, _mergesort_ uses a divide-and-conquer strategy. Instead of picking a dividing item and splitting the items into two groups holding items that are larger and smaller than the dividing item, mergesort splits the items into two halves holding an equal number of items. It then recursively calls itself to sort the two halves. When the recursive calls to mergesort return, the algorithm merges the two sorted halves into a combined sorted list.

The following pseudocode shows the algorithm:

```
Mergesort(Data: values[], Data: scratch[], Integer: start, Integer: end)
```

In addition to the array and the start and end indices to sort, the algorithm also takes as a parameter a scratch array that it uses to merge the sorted halves.

This algorithm starts by checking whether the section of the array contains one or fewer items. If it does, then it is trivially sorted, so the algorithm returns.

If the section of the array contains at least two items, the algorithm calculates the index of the item in the middle of the section of the array and recursively calls itself to sort the two halves.

After the recursive calls return, the algorithm merges the two sorted halves. It loops through the halves, copying the smaller item from whichever half holds it into the scratch array. When one-half is empty, the algorithm copies the remaining items from the other half.

Finally, the algorithm copies the merged items from the scratch array back into the original `values` array.

### NOTE

It is possible to merge the sorted halves without using a scratch array, but it's more complicated and slower, so most programmers use a scratch array.

The “call tree,” shown in [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011), shows calls to quicksort when the values in the array are perfectly balanced, so the algorithm divides the items into equal halves at every step. The mergesort algorithm _does_ divide the items into exactly equal halves at every step, so [Figure 6.11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0011) applies even more to mergesort than it does to quicksort.

The same run-time analysis shown earlier for quicksort also works for mergesort, so this algorithm also has O(N log N) run time. Like heapsort, mergesort's run time does not depend on the initial arrangement of the items, so it always has O(N log N) run time and doesn't have a disastrous worst case like quicksort does.

Like quicksort, mergesort is parallelizable. When a call to mergesort calls itself recursively, it can make those calls on different processors. This requires some coordination, however, because the original call must wait until both recursive calls finish before it can merge their results. In contrast, quicksort can simply tell its recursive calls to sort a particular part of the array, and it doesn't need to wait until those calls return.

Mergesort is particularly useful when all the data to be sorted won't fit in memory at once. For example, suppose a program needs to sort 1 million customer records, each of which occupies 1 MB. Loading all that data into memory at once would require 1018 bytes of memory, or 1,000 TB, which is much more than most computers have.

Fortunately, the mergesort algorithm doesn't need to load that much memory all at once. The algorithm doesn't even need to look at any of the items in the array until after its recursive calls to itself have returned.

At that point, the algorithm walks through the two sorted halves in a linear fashion and merges them. Moving through the items linearly reduces the computer's need to page memory to and from disk. When quicksort moves items into the two halves of a section of an array, it jumps from one location in the array to another, increasing paging and greatly slowing down the algorithm.

Mergesort was even more useful in the days when large data sets were stored on tape drives, which work most efficiently if they keep moving forward with few rewinds. (Sorting data that cannot fit in memory is called _external sorting_.) Specialized versions of mergesort were even more efficient for tape drives. They're interesting but not commonly used anymore, so they aren't described here.

### NOTE

For some interesting background on external sorting on tape drives, see `[https://en.wikipedia.org/wiki/Merge_sort#Use_with_tape_drives](https://en.wikipedia.org/wiki/Merge_sort#Use_with_tape_drives)`. For more general information on tape drives, see `[https://en.wikipedia.org/wiki/Tape_drive](https://en.wikipedia.org/wiki/Tape_drive)`.

A more common approach to sorting enormous data sets is to sort only the items' keys. For example, a customer record might occupy 1 MB, but the customer's name might occupy only 100 bytes. A program can make a separate index that matches names to record numbers and then sort only the names. Then, even if you have 1 million customers, sorting their names requires only about 100 MB of memory, an amount that a computer could reasonably hold. ([Chapter 11](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c11.xhtml), “Balanced Trees,” describes B-trees and B+ trees, which are often used by database systems to store and sort record keys in this manner.)

# STABLE SORTING

A _stable sorting algorithm_ is one that maintains the original relative positioning of equivalent values. For example, suppose that a program is sorting `Car` objects by their `Cost` properties and that `Car` objects `A` and `B` have the same `Cost` values. If object `A` initially comes before object `B` in the array, then in a stable sorting algorithm, object `A` still comes before object `B` in the sorted array.

If the items you are sorting are value types such as integers, dates, or strings, then two entries with the same values are equivalent, so it doesn't matter if the sort is stable. For example, if the array contains two entries that have value 47, it doesn't matter which 47 comes first in the sorted array.

In contrast, you might care if `Car` objects are rearranged unnecessarily. For example, a stable sort lets you arrange the array multiple times to get a result that is sorted on multiple keys (such as `Maker` and `Cost` for the `Car` example).

Mergesort is easy to implement as a stable sort (the algorithm described earlier is stable). It is also easy to parallelize, so it may be useful on computers that have more than one CPU. See [Chapter 18](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c18.xhtml), “Distributed Algorithms,” for information on implementing mergesort on multiple CPUs.

Quicksort may often be faster, but mergesort still has some advantages.

## Sub ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0018.png) Algorithms

Earlier in this chapter, I said that the fastest possible algorithm that uses comparisons to sort N items must use at least ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0043.png) time. Heapsort and mergesort achieve that bound, and so does quicksort in the expected case, so you might think that's the end of the sorting story. The loophole is in the phrase “that uses comparisons.” If you use a technique other than comparisons to sort, you can beat the ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0068.png) bound.

The following sections describe some algorithms that sort in less than ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0075.png) time.

### Countingsort

_Countingsort_ is a specialized algorithm that works well if the values you are sorting are integers that lie in a relatively small range. For example, if you need to sort 1 million integers with values between 0 and 1,000, countingsort can provide amazingly fast performance.

The basic idea behind countingsort is to count the number of items in the array that have each value. Then it is relatively easy to copy each value, in order, the required number of times back into the array.

The following pseudocode shows the countingsort algorithm:

```
Countingsort(Integer: values[], Integer: max_value)
```

The `max_value` parameter gives the largest value in the array. (If you don't pass it in as a parameter, you can modify the algorithm to figure it out by looking through the array.)

Let M be the number of items in the counts array (so M = `max_value` + 1) and let N be the number of items in the `values` array. If your programming language doesn't automatically initialize the `counts` array so that it contains 0s, the algorithm spends M steps initializing the array. It then takes N steps to count the values in the `values` array.

The algorithm finishes by copying the values back into the original array. Each value is copied once, so that part takes N steps. If any of the entries in the `counts` array is still 0, the program also spends some time skipping over that entry. In the worst case, if all of the values are the same so that the `counts` array contains mostly 0s, it takes M steps to skip over the 0 entries.

That makes the total run time ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0067.png) . If M is relatively small compared to N, this is much smaller than the ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0066.png) performance given by heapsort and the other algorithms described previously.

In one test, quicksort took 4.29 seconds to sort 1 million items with values between 0 and 1,000, but it took countingsort only 0.03 seconds. Note that this is a bad case for quicksort because the values include many duplicates. With 1 million values between 0 and 1,000, roughly 1,000 items have each value, and quicksort doesn't handle lots of duplication well.

With similar values, heapsort took roughly 1.02 seconds. This is a big improvement on quicksort, but it is still much slower than countingsort.

### Pigeonhole Sort

Like countingsort, _pigeonhole sort_ works well when the range of possible values is limited. Countingsort counts the number of items with each given value. To do that, it uses the values as indices into the `counts` array. Unfortunately, that won't work if the items that you are sorting are not integers, so you can't use them as indices.

Pigeonhole sort works by placing the items in pigeonholes corresponding to their key values. The pigeonhole approach makes it easier to sort more complicated items than simple numeric values. For example, suppose that you want to sort a set of words by their lengths. Countingsort would give you an array holding the number of words with each length, but it's not immediately obvious how you would convert that into the ordered list of words.

In contrast, pigeonhole sort groups words with the same length in the same pigeonhole, so it is easier to put them in order.

The following pseudocode shows how pigeonhole sort works. The algorithm assumes that you have defined a `Cell` class with `Value` and `Next` properties that you can use to build a linked list of values in each pigeonhole.

```
PigeonholeSort(Integer: values[], Integer: max)
```

The `values` parameter gives the values to sort. The `max` parameter gives the maximum value that the `values` array could hold. Here I'm assuming the values are integers starting at zero. If they include values between lower and upper bounds, you'll have to adjust the code accordingly. If the values are non-numeric, for example if they are strings, then you'll need to use some sort of algorithm to map each value to its pigeonhole.

The algorithm first creates a pigeonhole array of pointers to `Cell` objects and initializes them to `null`. It then loops through the items and adds each to the top of its pigeonhole's linked list. The code then loops through the pigeonholes and copies the items in each linked list back into the `values` array.

To analyze the algorithm's run time, suppose that the `values` array contains N items that span a range of M possible values. The algorithm uses ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0069.png) steps to initialize its pigeonhole linked lists. It then loops through the values and adds them to their pigeonholes in ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0070.png) steps.

The algorithm finishes by looping through the pigeonholes again, this time moving the items back into the values array. It must spend ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0071.png) steps examining each linked list whether or not that list is empty. During this stage, it also must move every item back into the `values` array, and that takes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0054.png) steps, so the total steps to perform this final stage is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0073.png).

That means the total run time for the algorithm is ![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0004a.png) ![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0004b.png)

If the number of values N is roughly the same as the size of the range of values M, then this becomes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0088.png) and that is much faster than ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0055.png).

### Bucketsort

The countingsort and pigeonhole sort algorithms work well if the values include only a relatively small range. Bucketsort works even if the values span a large range.

The _bucketsort algorithm_, which is also called _binsort_, works by dividing items into buckets. It sorts the buckets either by recursively calling bucketsort or by using some other algorithm. It then concatenates the buckets' contents back into the original array in sorted order. The following pseudocode shows the algorithm at a high level:

```
Bucketsort(Data: values[])
```

If the values in an array holding N items are reasonably uniformly distributed, if you use M buckets, and if the buckets divide the range of values evenly, then you should expect roughly ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0084.png) items per bucket.

For example, consider the array shown at the top of [Figure 6.12](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0012), which contains 10 items with values between 0 and 99. In the distribution step, the algorithm moves the items into the buckets. In this example, each bucket represents 20 values: 0 to 19, 20 to 39, and so on. In the sorting step, the algorithm sorts each bucket. The gathering step concatenates the values in the buckets to build the sorted result.

![Illustration of Bucketsort that moves items into buckets, sorts the buckets, and then concatenates the buckets to get the sorted result.](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06f012.jpg)

[**Figure 6.12**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-fig-0012)**:** Bucketsort moves items into buckets, sorts the buckets, and then concatenates the buckets to get the sorted result.

The buckets can be stacks, linked lists, queues, arrays, or any other data structure that you find convenient.

If the original array contains N fairly evenly distributed items, then distributing them into the buckets requires N steps times whatever time it takes to place an item in a bucket. Normally this mapping can be done in constant time. For example, suppose the items are integers between 0 and 99, as in the example shown in [Figure 6.12](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-fig-0012). You would place an item with value `v` in bucket number ⌊![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0077.png) ⌋. You can calculate this number in constant time, so distributing the items takes ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0078.png) steps.

If you use M buckets, sorting each bucket requires an expected ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0079.png) steps, where F is the run-time function of the sorting algorithm that you use to sort the buckets. Multiplying this by the number of buckets M, the total time to sort all the buckets is ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0080.png).

After you have sorted the buckets, gathering their values back into the array requires N steps to move all of the values. It could require an additional ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0081.png) steps to skip empty buckets if many of the buckets are empty, but if ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0082.png) the whole operation requires ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0056.png) steps.

Adding the times needed for the three stages gives a total run time of ![equation](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-disp-0005.png)

If M is a fixed fraction of N, then ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0076.png) is a constant, so ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0085.png) is also a constant, and this simplifies to ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0086.png)

In practice, M must be a relatively large fraction of N for the algorithm to perform well. If you are sorting 10 million records and you use only 10 buckets, then you need to sort buckets containing an average of 1 million items each.

In contrast, if M equals N, then each bucket should hold only a few items and sorting them should take a small constant amount of time. In that case, the algorithm's ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0087.png) run time simplifies to ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0074.png) and the algorithm runs very quickly.

Unlike countingsort and pigeonhole sort, bucketsort's performance does not depend on the range of the values. Instead, it depends on the number of buckets that you use.

## Summary

The sorting algorithms described in this chapter demonstrate different techniques and have different characteristics. [Table 6.1](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#c06-tbl-0001) summarizes the algorithms.

[**Table 6.1**](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c06.xhtml#R_c06-tbl-0001)**:** Algorithm Characteristics

ALGORITHM

RUN TIME

TECHNIQUES

USEFUL FOR

Insertionsort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0020.png)

Insertion

Very small arrays

Selectionsort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0003.png)

Selection

Very small arrays

Bubblesort/Cocktail Shaker Sort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0016.png)

Two-way passes, restricting bounds of interest

Very small arrays, mostly sorted arrays

Heapsort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0040.png)

Heaps, storing complete trees in an array

Large arrays with unknown distribution

Quicksort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0025.png) expected, ![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0017.png) worst case

Divide-and-conquer, swapping items into position, randomization to avoid worst-case behavior

Large arrays without too many duplicates, parallel sorting

Mergesort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0004.png)

Divide-and-conquer, merging, external sorting

Large arrays with unknown distribution, huge amounts of data, parallel sorting

Countingsort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0010.png)

Counting

Large arrays of integers with a limited range of values

Pigeonhole sort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0009.png)

Pigeonholes

Large arrays of possibly noninteger values within a limited range

Bucketsort

![images](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781119575993/files/images/c06-i0008.png)

Buckets

Large arrays with reasonably uniform value distribution

These algorithms demonstrate an assortment of useful techniques and provide good performance for a wide variety of problems, but they're far from the end of the story. There are dozens of other sorting algorithms. Some are minor modifications of these algorithms, and others use radically different approaches. [Chapter 10](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/c10.xhtml) discusses trees, which are also extremely useful for sorting data. Search the Internet for other algorithms.

This chapter explained several ways to sort data, but it didn't explain why you should want to do that. Simply having data sorted often makes it more useful to a user. For example, viewing customer accounts sorted by balance makes it much easier to determine which accounts need special attention.

Another good reason to sort data is so that you can later find specific items within it. For example, if you sort customers by their names, it's easier to locate a specific customer. The next chapter explains methods that you can use to search a sorted set of data to find a specific value.

## Exercises

You can find the answers to these exercises in [Appendix B](https://learning.oreilly.com/library/view/essential-algorithms-2nd/9781119575993/b02.xhtml). Asterisks indicate particularly difficult problems.

1.  Write a program that implements insertionsort.
2.  The `For i` loop used by the insertionsort algorithm runs from 0 to the array's last index. What happens if it starts at 1 instead of 0? Does that change the algorithm's run time?
3.  Write a program that implements selectionsort.
4.  What change to selectionsort could you make that corresponds to the change described in Exercise 2? Would it change the algorithm's run time?
5.  Write a program that implements bubblesort.
6.  Add the first and third bubblesort improvements described in the section “Bubblesort” (downward and upward passes and keeping track of the last swap) to the program you built for Exercise 5.
7.  Write a program that uses an array-based heap to build a priority queue. So that you don't need to resize the array, allocate it at some fixed size, perhaps 100 items, and then keep track of the number of items that are used by the heap. (To make the queue useful, you can't just store priorities. Use two arrays—one to store string values and another to store the corresponding priorities. Order the items by their priorities.) (For more practice, use a class to store items with their priorities and wrap the priority queue in a second class.)
8.  What is the run time for adding items to and removing items from a heap-based priority queue?
9.  Write a program that implements heapsort.
10.  Can you generalize the technique used by heapsort for holding a complete binary tree so that you can store a complete tree of degree d? Given a node's index p, what are its children's indices? What is its parent's index?
11.  Write a program that implements quicksort with stacks. (You can use the stacks provided by your programming environment or build your own.)
12.  Write a program that implements quicksort with queues instead of stacks. (You can use the queues provided by your programming environment or build your own.) Is there any advantage or disadvantage to using queues instead of stacks?
13.  Write a program that implements quicksort with in-place partitioning. Why is this version faster than the version that uses stacks or queues?
14.  Quicksort can display worst-case behavior if the items are initially sorted, if the items are initially sorted in reverse order, or if the items contain many duplicates. You can avoid the first two problems if you choose random dividing items. How can you avoid the third problem?
15.  Write a program that implements countingsort.
16.  If an array's values range from 100,000 to 110,000, allocating a `counts` array with 110,001 entries with indices 0 through 110,000 would slow down countingsort considerably, particularly if the array holds a relatively small number of items. How could you modify countingsort to give good performance in this situation?
17.  Write a program that implements pigeonhole sort.
18.  If an array holds N items that span the range 0 to M – 1, what happens to bucketsort if you use M buckets?
19.  Write a program that implements bucketsort. Allow the user to specify the number of items, the maximum item value, and the number of buckets.
20.  Explain the space/time trade-off that you should consider when picking the number of buckets used by bucketsort.
21.  For the following data sets, which sorting algorithms would work well, and which would not?  
    1.  10 floating-point values  
    2.  1,000 integers  
    3.  1,000 names  
    4.  100,000 integers with values between 0 and 1,000  
    5.  100,000 integers with values between 0 and 1 billion  
    6.  100,000 names  
    7.  1 million floating-point values  
    8.  1 million names  
    9.  1 million integers with uniform distribution  
    10.  1 million integers with nonuniform distribution

*   [Support](https://www.oreilly.com/online-learning/support/)
*   [](https://learning.oreilly.com/accounts/logout/)