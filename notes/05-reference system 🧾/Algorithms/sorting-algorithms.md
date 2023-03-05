# Chapter 5. Sorting Without a Hat

In this chapter, you will learn:

*   How comparison-based sorting algorithms require two fundamental operations:
    
    *   `less(i,j)` determines whether `A[i]` < `A[j]`.
        
    *   `swap(i,j)` swaps the contents of `A[i]` and `A[j]`.
        
*   How to provide a comparator function when sorting; for example, you can sort integers or string values in descending order. The comparator function can also sort complex data structures with no default ordering; for example, it is not clear how to sort a collection of two-dimensional (x, y) points.
    
*   How to identify inefficient O(N2) sorting algorithms, such as Insertion Sort and Selection Sort, from the structure of their code.
    
*   _Recursion_, where a function can call itself. This fundamental computer science concept forms the basis of a _divide-and-conquer_ strategy for solving problems.
    
*   How Merge Sort and Quicksort can sort an array of N values in O(N `log` N) using divide and conquer. How Heap Sort also guarantees O(N `log` N).
    
*   How Tim Sort combines Insertion Sort and functionality from Merge Sort to implement Python’s default sorting algorithm in guaranteed O(N `log` N).
    

In this chapter, I present algorithms that rearrange the N values in an array so they are in ascending order. Organizing a collection of values in sorted order is an essential first step to improve the efficiency of many programs. Sorting is also necessary for many real-world applications, such as printing staff directories for a company with the names and phone numbers of employees, or displaying flight departure times on an airport display.

With an unordered array, searching for a value, in the _worst case_, is O(N). When the array is sorted, Binary Array Search, in the _worst case_, can locate a target value in O(`log` N) performance.

# Sorting by Swapping

Try sorting the values in the array, `A`, at the top of [Figure 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-to-sort). Use a pencil to copy the values from [Figure 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-to-sort) onto a piece of paper (or bring out a pen and just write on these pages!). I challenge you to sort these values in ascending order _by repeatedly swapping the location of two values in the array_. What is the fewest number of swaps that you need? Also, count the number of times you compare two values together. I have sorted these values with five swaps. Is it possible to use fewer?[1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914779104)

![Sort these values](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0501.png)

###### Figure 5-1. Sample array, `A`, to sort

While it’s important to count the number of swaps, you also need to count the _number of comparisons between two values_. To start, you can determine that 2 is the smallest value in `A`, with just seven comparisons, something I showed in [Chapter 1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch01.html#chap-1). The smallest value is found at `A[3]`, so it is swapped with `A[0]`. This moves the smallest value to the front of the array where it belongs. In [Figure 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-to-sort), I highlight values when they are swapped. I use bold borders to mark the values that are guaranteed to be in their final location; these will not be swapped again. All values outside of the bolded borders remain to be sorted.

I scan the remaining values to find the largest value, 24, (using six comparisons) and swap `A[5]` and `A[7]` to move the largest value to the end of the array. I then locate the smallest remaining value, 5, (using five comparisons) and swap `A[1]` and `A[6]` to move 5 into its proper place. It looks like 21 is in its right spot, which takes four comparisons to validate; no need for a swap here!

With three comparisons, I find that 15 is the smallest remaining value, and I choose to swap the second occurrence of 15, `A[4]`, with `A[2]`. With two comparisons, you can validate that 15 belongs in index position 3, which leaves just one more comparison to swap `A[4]` and `A[5]`, moving 19 into its proper spot. In the final step shown in [Figure 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-to-sort), the value 20 is in the right location, since it is larger than or equal to all values to its left _and_ is smaller than or equal to all values to its right. With five exchanges and 28 comparisons, I have sorted this array.

I didn’t follow a specific algorithm to sort this small group of values; sometimes I looked for the smallest value, while other times I looked for the largest. The number of comparisons is reduced after each swap, and there are far more comparisons than swaps. I now define a sorting algorithm that works on any array of N values and evaluate its runtime performance.

# Selection Sort

Selection Sort is named because it incrementally sorts an array from left to right, _repeatedly selecting the smallest value remaining_ and swapping it into its proper location. To sort N values, find the smallest value and swap it with `A[0]`. Now only N – 1 values remain to be sorted, since `A[0]` is in its final spot. Find the location of the smallest remaining value and swap it with `A[1]`, which leaves N – 2 values to sort. Repeat this process until all values are in place.

###### Tip

What happens when the smallest remaining value is already in its proper place, that is, when `i` is equal to `min_index` when the `for` loop over `j` completes? The code will attempt to swap `A[i]` with `A[min_index]`, and nothing in the array will change. You might think to add an `if` statement to only swap when `i` and `min_index` are different, but it will not noticeably improve performance.

In [Listing 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-selection-sort), there is an outer `for` loop over `i` that iterates through nearly every index position in the array, from 0 to N – 2. The inner `for` loop over `j` iterates through the remaining index positions in the array, from `i+1` up to N – 1 to find the smallest remaining value. At the end of the `for` loop over `i`, the value at index position `i` is swapped with the smallest value found at index position `min_index`.

##### Listing 5-1. Selection Sort

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO1-1)

Before each pass through the `i` `for` loop, you know `A[0 .. i-1]` is sorted.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO1-2)

`min_index` is the index location of the smallest value in `A[i .. N-1]`.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO1-3)

If any `A[j]` < `A[min_index]`, then update `min_index` to remember index location for this newly discovered smallest value.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO1-4)

Swap `A[i]` with `A[min_index]` to ensure that `A[0 .. i]` is sorted.

At a high level, Selection Sort starts with a problem of size N and reduces it one step at a time, first to a problem of size N – 1, then to a problem of size N – 2, until the whole array is sorted. As shown in [Figure 5-2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-selection-sort), _it takes_ N – 1 _swaps to sort an array_.

After these swaps have properly placed N – 1 values into their final location, the value at `A[N–1]` is the largest remaining unsorted value, which means it is already in its final location. Counting the number of comparisons is more complicated. In [Figure 5-2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-selection-sort), it was 28, which is the sum of the numbers from 1 through 7.

Mathematically, the sum of the numbers from 1 to K is equal to K × (K + 1)/2; [Figure 5-3](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-triangle-numbers) shows a visualization to provide the intuition behind this formula. Number 28 is called a _triangle number_, from the shape formed by the arrangement of cells.

If you make a second triangle equal in size to the first and rotate it 180 degrees, the two triangles combine to form a K by K + 1 rectangle. The count of the squares in each triangle is half the number of squares in the 7 x 8 rectangle. In this figure, K = 7. When sorting N values, K = N – 1 since that is the number of comparisons in the first step to find the smallest value: the total number of comparisons is (N – 1) × N/2 or ½ × N2 – ½ × N.

![Selection Sort on Array](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0502.png)

###### Figure 5-2. Sorting sample array using Selection Sort

![Selection Sort on Array](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0503.png)

###### Figure 5-3. Visualizing the formula for triangle numbers: sum of 1 through 7 is 28

# Anatomy of a Quadratic Sorting Algorithm

The analysis for Selection Sort shows that the number of comparisons is dominated by the N2 term, which means its performance will be O(N2) since that is the dominant operation. To explain why, look at how Selection Sort has N – 1 distinct steps when sorting N values. In the first step, it finds the smallest value in N – 1 comparisons, and only one value is moved into its proper location. In each of the subsequent N – 2 steps, the number of comparisons will (ever so slowly) decrease until there is no work done in the final step. Can something be done to reduce the number of comparisons?

Insertion Sort is a different sorting algorithm that also uses N – 1 distinct steps to sort an array from left to right. It starts by assuming that `A[0]` is in its proper location (hey, it could be the smallest value in the array, right?). In its first step, it checks if `A[1]` is smaller than `A[0]` and swaps these two values as needed to sort in ascending order. In the second step, it tries to _insert_ the `A[2]` value into its proper sorted location when just considering the first three values. There are three possibilities: either `A[2]` is in its proper spot, or it should be inserted between `A[0]` and `A[1]`, or it should be inserted before `A[0]`. However, since you cannot insert a value between two array positions, you must _repeatedly swap values_ to make room for the value to be inserted.

At the end of each step, as shown in [Figure 5-4](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-insertion-sort), Insertion Sort repeatedly swaps neighboring out-of-order values.

![Insertion Sort on Array](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0504.png)

###### Figure 5-4. Sorting sample array using Insertion Sort

All swapped values are highlighted, and bold borders identify the sorted values in the array. Unlike Selection Sort, values within the bold borders may continue to be swapped, as you can see in the figure. At times (like when the value 5 is inserted) there is a sequence of cascading swaps to move that value into its proper place because the value to insert is smaller than most of the already sorted values. At other times (like when 21 or 24 is inserted), no swaps are needed because the value to insert is larger than all of the already-sorted values. In this example, there are 20 comparisons and 14 swaps. For Insertion Sort, the number of comparisons will always be greater than or equal to the number of swaps. On this problem instance, Insertion Sort uses fewer comparisons than Selection Sort but more swaps. Its implementation, in [Listing 5-2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-insertion-sort), is surprisingly brief.

##### Listing 5-2. Insertion Sort

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO2-1)

Before each pass through the `i` `for` loop, you know `A[0 .. i-1]` is sorted.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO2-2)

Decrement `j` from index location `i` back to 0 but not including 0.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO2-3)

If `A[j-1]` ≤ `A[j]`, then `A[j]` has found its proper spot, so stop.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO2-4)

Otherwise, swap these out-of-order values.

Insertion Sort works the hardest when each value to be inserted is smaller than all already-sorted values. The _worst case_ for Insertion Sort occurs when the values are in descending order. In each successive step, the number of comparisons (and swaps) increases by one, summing in total to the triangle numbers mentioned earlier.

# Analyze Performance of Insertion Sort and Selection Sort

Selection Sort will always have ½ × N2 – ½ × N comparisons and N – 1 swaps when sorting N values. Counting the operations for Insertion Sort is more complicated because its performance depends on the order of the values themselves. On average, Insertion Sort should outperform Selection Sort. In the _worst case_ for Insertion Sort, the values appear in descending order, and the number of comparisons and swaps is ½ × N2 – ½ × N. No matter what you do, both Insertion Sort and Selection Sort require on the order of N2 comparisons, which leads to the runtime performance visualized in [Figure 5-5](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-timing-graph-is-ss). Another way to explain this poor behavior is to observe that the problem instance size 524,288 is 512 times as large as 1,024, yet the runtime performance for both Selection Sort and Insertion Sort takes about 275,000 times longer.[2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914421136) Sorting 524,288 values takes about two hours for Insertion Sort and nearly four hours for Selection Sort. To solve larger problems, you would need to measure the completion times in days or weeks. This is what a quadratic, or O(N2), algorithm will do to you, and it is simply unacceptable performance.

![Performance of Insertion and Selection Sort](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0505.png)

###### Figure 5-5. Timing results of Insertion Sort and Selection Sort

What if you wanted to sort an array in descending order? Or what if the values have a complex structure and there is no default _less-than_ operation defined? Each of the sorting algorithms in this chapter can be extended with a parameter for a comparator function to determine how values are to be ordered, as shown in [Listing 5-3](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-insertion-sort-comparator). For simplicity, the implementations of the remaining algorithms assume the values are sorted in ascending order.

##### Listing 5-3. Providing a comparator function to a sorting algorithm

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO3-1)

Determine sorting order using a provided comparator function, `less`. If `less(A[x],A[y])` is `True`, then `A[x]` should appear before `A[y]`.

Both Selection Sort and Insertion Sort use N – 1 steps to sort an array of N values, where each step reduces the problem size by just one. A different strategy, known as _divide and conquer_, breaks a problem up into two sub-problems to be solved.

# Recursion and Divide and Conquer

The concept of _recursion_ has existed in mathematics for centuries—it occurs when a function calls itself.

###### Tip

The _Fibonacci series_ starts with two integers, 0 and 1. The next integer in the series is the sum of the two prior numbers. The next few integers in the series are 1, 2, 3, 5, 8, 13, and so on. The recursive formula for the nth integer in the series is F(n) = F(n–1) + F(n–2). As you can see, F(n) is defined by calling itself twice.

The factorial of an integer, N, is the product of all positive integers less than or equal to N. It is written as “N!”; thus 5! = 5 × 4 × 3 × 2 × 1 = 120. Another way to represent this operation is to state that N! = N × (N – 1)! For example, 120 = 5 × 4!, where 4! = 24. A recursive implementation is shown in [Listing 5-4](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-factorial).

##### Listing 5-4. Recursive implementation of factorial

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO4-1)

Base case: return 1 for `fact(1)` or any `N` ≤ 1.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO4-2)

Recursive case: recursively compute `fact(N–1)` and multiply its result by `N`.

It may seem odd to see a function calling itself—how can you be sure that it will not do so forever? Each recursive function has a _base case_ that prevents this infinite behavior. `fact(1)` will return `1` and not call itself.[3](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914194976) In the _recursive case_, `fact(N)` calls itself with an argument of N – 1 and multiplies the returned computation by N to produce its final result.

[Figure 5-6](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-factorial) visualizes the execution of the statement `y = fact(3)` as time advances downward. Each box represents an invocation of `fact()` with the given argument (whether 3, 2, or 1). Invoking `fact(3)` recursively calls `fact(2)`. When that happens, the original `fact(3)` function will be “paused” (grayed out in the figure) until the value of `fact(2)` is known. When `fact(2)` is invoked, it also must recursively call `fact(1)`, so it is paused (and grayed out in the figure) until the value of `fact(1)` is known. Finally at this point, the base case stops the recursion, and `fact(1)` returns 1 as its value, shown inside a dashed circle; this resumes the paused execution of `fact(2)`, which returns 2 × 1 = 2 as its value. Finally, the original `fact(3)` resumes, returning 3 × 2 = 6, which sets the value of `y` to 6.

During recursion, any number of `fact(N)` invocations can be paused until the base case is reached.[4](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914185584) Then, the recursion “unwinds” one function call at a time until the original invocation is complete.

In reviewing this algorithm, it still solves a problem of size N by reducing it into a smaller problem of size N – 1. What if the problem of size N could be divided into two problems of, more or less, N/2? It might seem like this computation could go on forever, since each of these two sub-problems are further subdivided into four sub-problems of size N/4. Fortunately the base case will ensure that—at some point—the computations will complete.

Consider a familiar problem, trying to find the largest value in an unordered array of N values. In [Listing 5-5](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-recursive-max), `find_max(A)` invokes a recursive helper function,[5](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914180880) `rmax(0,len(A)–1)`, to properly set up the initial values for `lo` = 0 and `hi` = N – 1, where N is the length of `A`. The base case in `rmax()` stops the recursion once `lo = hi` because this represents looking for the largest value in a range containing just a single value. Once the largest values are determined for the left and right sub-problems, `rmax()` returns the larger of these two values as the largest value in `A[lo .. hi]`.

![Visualizing recursive `fact(3)`](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0506.png)

###### Figure 5-6. Visualizing the recursive invocation of `fact(3)`

##### Listing 5-5. Recursive algorithm to find largest value in unordered list

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-6)

Invoke the initial recursive call with proper arguments for `lo` and `hi`.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-1)

Base case: when `lo` == `hi`, the range `A[lo .. hi]` contains a single value; return it as the largest value.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-2)

Find midpoint index location in the range `A[lo .. hi]`. Use integer division `//` in case range has odd number of values.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-3)

`L` is the largest value in the range `A[lo .. mid]`.

[![5](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/5.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-4)

`R` is the largest value in the range `A[mid+1 .. hi]`.

[![6](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/6.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO5-5)

The largest value in `A[lo .. hi]` is the maximum of `L` and `R`.

The function `rmax(lo, hi)` solves this problem recursively by dividing a problem of size N into two problems of half the size. [Figure 5-7](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-example-recursive-max-one) visualizes the execution of `rmax(0,3)` on the given array, `A`, with four values. To solve this problem, it solves two sub-problems: `rmax(0,1)` finds the largest value in the left-hand side of `A`, and `rmax(2,3)` finds the largest value in the right-hand side of `A`. Since `rmax()` makes two recursive calls within its function, I introduce a new visualization to describe _where_, in `rmax()`, the execution is paused. I still use a gray background to show that `rmax()` is paused when it makes a recursive call: in addition, the lines highlighted with a black background will execute _once the recursive call returns_.

In [Figure 5-7](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-example-recursive-max-one), I only have space to show the three recursive calls that complete to determine that 21 is the largest value in the left-hand side of `A`. As you can see, the final two lines in the invocation box for `rmax(0,3)` are highlighted in black to remind you that the rest of the computation will resume with the recursive call to `rmax(2,3)`. A similar sequence of three additional recursive calls would complete the right-hand sub-problem, ultimately allowing the original recursive invocation `rmax(0,3)` to return `max(21,20)` as its answer.

[Figure 5-8](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-example-recursive-max-two) visualizes the full recursive behavior of `rmax(0,7)`. Similar to my explanation for `fact()`, this figure shows how the invocation of `rmax(0,3)` is paused while it recursively computes the first sub-problem, `rmax(0,1)`. The original problem is repeatedly subdivided until `rmax()` is invoked where its parameters `lo` and `hi` are equal; this will happen eight different times in the figure, since there are N = 8 values. Each of these eight cases represents a base case, which stops the recursion. As you can see in [Figure 5-8](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-example-recursive-max-two), the maximum value is 24, and I have highlighted the `rmax()` recursive calls that return this value.

![1st recursive step for rmax](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0507.png)

###### Figure 5-7. Recursive invocation when calling `rmax(0,3)` on `A = [15,21,20,2]`

![Complete recursive invocation of rmax](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0508.png)

###### Figure 5-8. Complete recursive invocation of `rmax(0,7)`

# Merge Sort

Inspired by these examples, we can now ask, “Is there a recursive divide-and-conquer approach to sort an array?” [Listing 5-6](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-intuition-sort) contains the gist of an idea: to sort an array, recursively sort its left half, and recursively sort its right half; then somehow _merge the partial results_ to ensure the whole array is sorted.

##### Listing 5-6. Idea for sorting recursively

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO6-1)

Recursive helper method to sort `A[lo .. hi]`.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO6-2)

Base case: a range with one or fewer values is already in sorted order.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO6-3)

Recursive case: sort the left half of `A` and the right half of `A`.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO6-4)

Merge both sorted halves of the array in place.

The structure of [Listing 5-6](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-intuition-sort) is identical to the `find_max(A)` function described in [Listing 5-5](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-recursive-max). Completing this implementation leads to Merge Sort, an in-place recursive sorting algorithm that requires extra storage but provides the breakthrough we were looking for, namely an O(N `log` N) sorting algorithm.

The key to Merge Sort is the `merge` function that merges _in place_ the sorted left half of an array with the sorted right half of an array. The mechanics of `merge()` might be familiar if you’ve ever had two sorted stacks of paper that you want to merge into one final sorted stack, as shown in [Figure 5-9](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-merge-example-one).

![Merge example](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0509.png)

###### Figure 5-9. Merging two stacks into one

To merge these two stacks into one stack, look at the topmost remaining value in each stack and choose the smallest one. In the first two steps, 2 is removed from the left stack, and then 5 is removed from the right. When faced with two values that are the same, arbitrarily take the value from the left stack, first removing 15 from the left stack, then removing 15 from the right stack. Repeat this process until one of the stacks is exhausted (which happens in the final eighth step). When only one stack remains, just take all those values as a group, since they are already sorted.

The merge process sketched in [Figure 5-9](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-merge-example-one) works because of the extra storage into which the values are placed. The most efficient way to implement Merge Sort is to initially allocate extra storage equal to the size of the original array being sorted, as shown in [Listing 5-7](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-merge-sort).

##### Listing 5-7. Recursive Merge Sort implementation

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-1)

Allocate auxiliary storage equal in size to original array.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-2)

Base case: with 1 or fewer values, there is nothing to sort.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-3)

Recursive case: sort left and right sub-arrays and then merge.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-4)

Copy sorted sub-arrays from `A` into `aux` to prepare for merge.

[![5](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/5.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-5)

Set `left` and `right` to be the starting index positions of the corresponding sub-arrays.

[![6](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/6.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-6)

When left sub-array is exhausted, take value from right sub-array.

[![7](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/7.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-7)

When right sub-array is exhausted, take value from left sub-array.

[![8](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/8.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-8)

When right value is smaller than left value, take value from right sub-array.

[![9](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/9.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-9)

When left value is smaller than or equal to right value, take value from left sub-array.

[![10](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/10.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO7-10)

Invoke the initial recursive call.

[Figure 5-10](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-merge-example-two) visualizes the dynamic behavior of `merge()`. The first step of `merge(lo,mid,hi)` is to copy the elements from `A[lo .. hi]` into `aux[lo .. hi]` since this is the sub-problem range being sorted.

The `for` loop over `i` will execute 8 times, because that is the total size of the two sub-problems being merged. Starting in the third row of [Figure 5-10](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-merge-example-two), the variables `left`, `right`, and `i` each keep track of specific locations:

*   `left` is the index position of the next value in the left sub-array to be merged.
    
*   `right` is the index position of the next value in the right sub-array to be merged.
    
*   `i` is the index position in `A` where successively larger values are copied until, by the last step, all values in `A[lo .. hi]` are in sorted order.
    

Within the `for` loop, up to two values in `aux` (highlighted in [Figure 5-10](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-merge-example-two)) are compared to find the lower value, which is then copied into `A[i]`. With each step, `i` is incremented, while `left` and `right` advance only when the value at `aux[left]` or `aux[right]` is found to be the next smallest one to be copied into `A`. The time to complete `merge()` is directly proportional to the combined size of the sub-problems (or `hi – lo + 1`).

Merge Sort is a great example of a divide-and-conquer algorithm that guarantees O(N `log` N) performance. If you have a problem that satisfies the following checklist, then an O(N `log` N) algorithm exists:

*   If you can subdivide a problem of size N into two independent sub-problems of size N/2; it is perfectly fine for one sub-problem to be slightly larger than the other.
    
*   If you have a base case that either does nothing (like with Merge Sort) or performs some operations in constant time.
    
*   If you have a processing step (either before the problem is subdivided or afterward as a post-processing step) that requires time directly proportional to the number of values in the sub-problem. For example, the `for` loop in `merge()` repeats a number of times equal to the size of the sub-problem being solved.
    

![Step by step merge](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0510.png)

###### Figure 5-10. Step-by-step merge of two sorted sub-arrays of size 4

# Quicksort

Another sorting algorithm that follows divide-and-conquer is Quicksort, one of the most heavily studied and efficient sorting algorithms ever designed.[6](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239913448288) It recursively sorts an array by selecting an element in `A` to use as a pivot value, `p`, and then _it inserts `p` into its proper location in the final sorted array_. To do this, it rearranges the contents of `A[lo .. hi]` such that there is a left sub-array with values that are ≤ `p`, and a right sub-array with values that are ≥ `p`. You can confirm in [Figure 5-11](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-quicksort-pivot) that the partitioned array has this property.

![Partitioning array using `15` as pivot](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0511.png)

###### Figure 5-11. Results of `partition(A,0,7,0)` using `A[0]` as pivot

This amazing feat may at first seem impossible—how do you know where `p` exists in the final sorted array without actually sorting the entire array? It turns out that partitioning doesn’t sort all elements in `A` but rearranges just a few based on `p`. In the challenge exercises found in [Chapter 1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch01.html#chap-1), you can find the implementation of `partition()`. After `partition()` completes in [Figure 5-11](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-quicksort-pivot), the left sub-array to be sorted contains two values, while the right sub-array contains five values. Each of these sub-arrays is recursively sorted using Quicksort, as shown in [Listing 5-8](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-quick-sort).

##### Listing 5-8. Recursive Quicksort implementation

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO8-1)

Base case: with 1 or fewer values, there is nothing to sort.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO8-2)

Choose `A[lo]` as the pivot value, `p`.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO8-3)

Return `location` in `A` such that:

*   `A[location] = p`
    
*   All values in left sub-array `A[lo .. location–1]` are all ≤ `p`
    
*   All values in right sub-array `A[location+1 .. hi]` are all ≥ `p`
    

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO8-4)

Recursive case: sort _in place_ left and right sub-arrays, since `p` is already in its proper sorted location, `A[location]`.

[![5](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/5.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO8-5)

Invoke the initial recursive call.

Quicksort presents an elegant recursive solution whose success depends on the partitioning function. For example, if `partition()` is invoked on a sub-array `A[lo .. hi]` containing N values and the smallest value in that sub-array is used as the pivot, then the resulting left sub-array is empty, whereas the right sub-array contains N – 1 values. Reducing a sub-problem by 1 is exactly how Insertion Sort and Selection Sort performed, leading to inefficient O(N2) sorting. The top of [Figure 5-12](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-quicksort-full) summarizes the key steps of Quicksort applied to the array from [Figure 5-11](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-quicksort-pivot). The bottom of [Figure 5-12](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-quicksort-full) shows the full recursive execution. On the right side of the figure, you can see `A`, the array being sorted, and how its values change in response to the recursive execution. For each partition of a range `A[lo .. hi]`, the selected pivot is always `A[lo]`, which is why each box reads `partition(lo,hi,lo)`. As time moves vertically down the figure, you can see how each `partition()` invocation leads to 1 or 2 recursive calls to `qsort()`. For example, `partition(0,7,0)` on `A` places 15 into its final index location (which is why it is grayed out on the right), leading to two subsequent recursive invocations: `qsort(0,1)` on the left sub-array and `qsort(3,7)` on the right sub-array. The invocation of `qsort(3,7)` does not start until `qsort(0,1)` has completed its work.

Each time `partition` is invoked, a different value is placed into its proper index location and grayed out. When `qsort(lo,hi)` is invoked on a range where `lo = hi`, that value is in its proper location, and it is also grayed out.

When a `partition(lo,hi,lo)` produces only a single recursive call to `qsort()`, it is because the pivot value is placed in either `A[lo]` or `A[hi]`, thus reducing the problem size by just 1. For example, given the implementation in [Listing 5-8](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-quick-sort), Quicksort will degrade its performance to O(N2) when called on an array of already-sorted values! To avoid this behavior, Quicksort is often modified to choose the pivot value randomly from within the range `A[lo .. hi]` by replacing `pivot_idx = lo` in [Listing 5-8](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-quick-sort) with `pivot_idx = random.randint(lo, hi)`. Decades of research have confirmed that there is always a theoretical possibility that in the _worst case_, Quicksort will have a runtime performance of O(N2). Despite this weakness, Quicksort is often the sorting algorithm of choice because, unlike Merge Sort, it does not require any extra storage. In reviewing the structure for Quicksort, you can see that it conforms to the checklist for O(N `log` N) algorithms.

![Quicksort on example](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0512.png)

###### Figure 5-12. Full recursive invocation of Quicksort

Another way to achieve O(N `log` N) is to have N steps where the runtime performance of each step is O(`log` N). Using the heap data structure introduced in the last chapter, I now present Heap Sort, whose runtime performance is O(N `log` N).

# Heap Sort

To see why a max binary heap can help sort an array, consider [Figure 5-13](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heap-consider-sort) that presents the array storage for the heap from [Figure 4-17](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch04.html#figure-heap-in-array). The largest value in `A` is found in `A[1]`. When this max value is dequeued, the underlying array storage is updated to reflect the modified max binary heap containing one less value. More importantly, the index position `A[18]` is not only unused, it is _exactly the index position that should contain the maximum value_ if the array were sorted. Simply place the dequeued value there. Perform another dequeue, and this value (the second-largest value in the heap) can be placed in index position `A[17]`, which is now unused.

![Consider heap as being helpful to sort](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0513.png)

###### Figure 5-13. Intuition behind how a max binary heap can be used for sorting

To make this promising approach work, I need to address the following issues:

*   The heap data structure ignores the value in index position 0 to simplify its computations using an array of size N + 1 to store N values.
    
*   The heap is initially empty, and new values are enqueued one at a time. When starting with N values to sort initially, there needs to be an efficient way to “bulk upload” all values.
    

Let’s fix how index positions are calculated. The original heap with 18 elements (as shown in [Figure 5-13](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heap-consider-sort)) was stored in an array with 19 elements. Any reference to `A[i]` uses 1-based indexing, meaning that `A[1]` stored the first value in the heap, and `A[N–1]` stored the last. In [Listing 5-9](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-heapsort), the `less(i,j)` and `swap(i,j)` functions all subtract 1 from `i` and `j` whenever accessing `A[i]` or `A[j]`. This allows 1-based indexing to work with 0-based array storage. The largest value in the heap is now in `A[0]`. When `swap(1, N)` appears in the `sort()` function, it actually swaps the values in `A[0]` and `A[N–1]`. With this small adjustment, the `sink()` method remains the same. Note that Heap Sort never uses `swim()`.

##### Listing 5-9. Heap Sort implementation

```
class
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-6)

To ensure that `i` // 2 computes the parent index location for `i`, both `less()` and `swap()` subtract 1 from `i` and `j`, as if they were using 1-based indexing.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-1)

Convert array to be sorted, `A`, into a max binary heap in bottom-up fashion, starting at `N`//2, the highest index position that has at least one child.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-2)

The `while` loop continues as long as there are values to sort.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-3)

Dequeue maximum value by swapping with last value in heap.

[![5](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/5.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-4)

Reduce size of heap by one for upcoming `sink()` to work.

[![6](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/6.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO9-5)

Sink the newly swapped value into its proper location, which reestablishes the heap-ordered property.

The most important step in Heap Sort is constructing the initial max binary heap from the original array to be sorted. The `for` loop in `HeapSort` completes this task, and the result is shown in [Figure 5-14](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heapify), which required only 23 total comparisons and 5 swaps. This `for` loop constructs a heap from the bottom to the top by starting at index position `N`//2, the highest index position _that has at least one child_. In reverse order, the `for` loop calls `sink()` on the kth index position to ultimately ensure that all values in the array satisfy the heap-ordered property. These index positions are drawn with a bold border in [Figure 5-14](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heapify).

Through a rather unexpected theoretical analysis, the total number of comparisons required to convert an arbitrary array into a max binary heap is no more than 2N in the _worst case_. The intuition behind this result can be seen in the running total of comparisons in [Figure 5-14](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heapify), which shows a steady, but slow, growth rate. I continue to alternatively shade the index positions within `A` by the computed level of the max binary heap to show how values are swapped between levels.

![Converting array into max binary heap](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0514.png)

###### Figure 5-14. Converting array into a max binary heap

The final row in [Figure 5-14](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heapify) represents a max binary heap—in fact, the exact same one depicted in [Figure 4-16](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch04.html#figure-delete-5), now offset by one index position to use all N index positions. The `sort()` function in [Listing 5-9](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-heapsort) now repeatedly swaps the largest value in the heap with the last value in the heap (using the trick hinted at in [Figure 5-13](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-heap-consider-sort)), which has the effect of placing that value in exactly its proper location in the final sorted array. `sort()` then reduces the size of the heap by one, and `sink()` properly re-establishes the heap-ordered property with runtime performance of O(`log` N), as described in [Chapter 4](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch04.html#chap-4).

# Performance Comparison of O(N log N) Algorithms

How does the runtime performance of these different sorting algorithms—all classified as O(N `log` N)—compare with each other? Let’s start with some empirical results, as shown in [Table 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#table-nlogn-sorting). Reading the numbers down in a column reports the timing results of an algorithm as the problem size doubles; you can see that each timing value is a bit more than twice as large as its previous value. This relative performance is the signature behavior of an O(N `log` N) algorithm.

Table 5-1. Runtime performance (in seconds) for different sorting algorithms

N

Merge Sort

Quicksort

Heap Sort

Tim Sort

Python Sort

1,024

`0.002`

`0.002`

`0.006`

`0.002`

`0.000`

2,048

`0.004`

`0.004`

`0.014`

`0.005`

`0.000`

4,096

`0.009`

`0.008`

`0.032`

`0.011`

`0.000`

8,192

`0.020`

`0.017`

`0.073`

`0.023`

`0.001`

16,384

`0.042`

`0.037`

`0.160`

`0.049`

`0.002`

32,768

`0.090`

`0.080`

`0.344`

`0.103`

`0.004`

65,536

`0.190`

`0.166`

`0.751`

`0.219`

`0.008`

131,072

`0.402`

`0.358`

`1.624`

`0.458`

`0.017`

262,144

`0.854`

`0.746`

`3.486`

`0.970`

`0.039`

524,288

`1.864`

`1.659`

`8.144`

`2.105`

`0.096`

1,048,576

`3.920`

`3.330`

`16.121`

`4.564`

`0.243`

Now in each row, the absolute runtime performance of each algorithm is different. In [Chapter 2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch02.html#chap-2), I discussed how different behaviors within a classification can vary by a multiplicative constant. This table provides evidence of this observation. Once the problem size is large enough, Quicksort is about 15% faster than Merge Sort, while Heap Sort is more than four times slower.

The last two columns in [Table 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#table-nlogn-sorting) report on the performance of a new sorting algorithm, Tim Sort, invented by Tim Peters for Python in 2002. This algorithm is quickly becoming the standard sorting algorithm used by major programming languages, such as Java, Python, and Swift. Column “Tim Sort” represents the runtime performance for a simplified Tim Sort implementation, which also exhibits O(N `log` N) behavior. The final column, labeled “Python Sort,” represents the runtime performance using the built-in `sort()` method in the `list` data type. Because it is implemented internally, it will naturally be the most efficient—as you can see, it is around 15 times faster than Quicksort. It is worthwhile to investigate Tim Sort because it mixes together two different sorting algorithms to achieve its outstanding performance.

# Tim Sort

Tim Sort combines Insertion Sort and the `merge()` helper function from Merge Sort in a novel way to provide a fast sorting algorithm that outperforms other sorting algorithms on real-world data. In particular, Tim Sort dynamically takes advantage of long sequences of partially sorted data to deliver truly outstanding results.

As shown in [Listing 5-10](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#listing-timsort), Tim Sort first partially sorts N/`size` sub-arrays of a computed `size`, based on `compute_min_run()`. `size` will typically be an integer between 32 and 64, which means we can treat this number as a constant that is independent of N. This stage ensures there are sequences of partially sorted data, which improves the behavior of `merge()`, the helper function from Merge Sort that merges two sorted sub-arrays into one.

##### Listing 5-10. Basic Tim Sort implementation

```
def
```

[![1](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/1.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-1)

Small arrays are sorted instead using Insertion Sort.

[![2](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/2.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-2)

Compute `size`—a value typically between 32 and 64—to use for the length of the sub-arrays to be sorted.

[![3](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/3.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-3)

Use Insertion Sort to sort each sub-array `A[lo .. lo+size–1]`, handling special case when final sub-array is smaller.

[![4](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/4.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-4)

`merge()` uses extra storage equal in size to the original array.

[![5](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/5.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-5)

Compute index positions for two sub-arrays to be merged, `A[lo .. mid]` and `A[mid+1 .. hi]`. Take special care with partial sub-arrays.

[![6](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/6.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-6)

Merge sub-arrays together to sort `A[lo .. hi]` using `aux` for auxiliary storage.

[![7](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/7.png)](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#co_sorting_without_a_hat_CO10-7)

Once all sub-arrays of length `size` are merged with another, prepare for next iteration through `while` loop to merge sub-arrays twice as large.

The auxiliary storage, `aux`, is allocated once and used by each invocation of `merge()`. The actual implementation of Tim Sort has more complicated logic that looks for ascending or strictly descending sub-arrays; it also has a more sophisticated merge function that can merge groups of values “all at once,” where the `merge()` function I’ve shown operates one value at a time. The simplified implementation whose behavior is shown in [Figure 5-15](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-timsort) contains the essential structure. Given the extensive study of sorting algorithms, it is rather amazing that a new sorting algorithm—discovered this century—has proven to be so effective when working with real-world data sets.

![Applying Tim Sort to array](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492091059/files/assets/lalg_0515.png)

###### Figure 5-15. Changes to array when applying Tim Sort with initial size of 4

[Figure 5-15](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-timsort) demonstrates how Tim Sort works, using a `min_run` of 4 just to make it easier to visualize. In the first step, four sub-arrays of size 4 are sorted using Insertion Sort; the final two values containing 2 and 8 are contained in a partial sub-array of length 2. These sorted sub-arrays are visualized using alternating bands of shaded and non-shaded regions. There will be N/`size` sorted sub-arrays (possibly one more, if the length of the original array is not divisible by `size`). I showed earlier that the runtime performance of sorting `size` values is directly proportional to `size` × (`size` – 1)/2—since this occurs N/`size` times, the total runtime performance is directly proportional to N × (`size` – 1)/2. Because `size` can be considered a constant, this initial phase is classified as O(N).

In the second phase, pairs of neighboring runs are merged together. The total accumulated time for the `merge()` invocations is proportional to N (as I explained earlier in Merge Sort). After the first pass through the `while` loop, the size of the sorted sub-arrays has doubled to 8, as you can see by the shaded regions in [Figure 5-15](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-timsort). In this example, there are three iterations, as `size` repeatedly doubles from 4 to 32 (which is greater than N). In general, starting with sorted sub-arrays of size `size`, the `while` loop iterates `k` times until `size` × `2``k` > N; rewrite this computation as 2`k` > N/`size`.

To find `k`, take the logarithm of both sides, which reveals that `k` > `log`(N/`size`). Because `log`(`a`/`b`) = `log`(`a`) – `log`(`b`), I can say that `k` > `log`(N) – `log`(`size`); since `size` is a constant, I only need to focus on the fact that `k` is equal to the smallest integer greater than or equal to `log`(N) minus a small constant value.

To summarize, the first phase of Tim Sort—which applies Insertion Sort—can be classified as O(N), and the second phase—which performs repeated `merge()` requests— is O(`k` × N), where `k` is no greater than `log`(N), resulting in a total overall performance of O(N `log` N).

# Summary

Sorting is a fundamental problem in computer science and has been extensively studied. An array containing primitive values can be sorted because these values can be compared with each other by default. More complex data types (such as strings or two-dimensional points) can be sorted using custom ordering functions to allow the same sorting algorithms to work.

In this chapter, you learned:

*   How some basic sorting algorithms have O(N2) performance, making them completely unsuitable for sorting large data sets.
    
*   The concept of recursion as a key strategy to solve problems by dividing them into smaller sub-problems.
    
*   That Merge Sort and Heap Sort, in different ways, achieve O(N `log` N) performance.
    
*   That Quicksort achieves O(N `log` N) performance without requiring additional storage, as Merge Sort does.
    
*   Tim Sort, the default sorting algorithm used by Python and an increasing number of other programming languages.
    

# Challenge Exercises

1.  Write a recursive method `count(A,t)` that returns the number of times that the value `t` appears within `A`. Your implementation must have a recursive structure, similar to `find_max(A)`.
    
2.  You are given an array containing a permutation of the N distinct integers from 0 to N – 1. Determine the fewest number of swaps needed to sort the values in ascending order. Write a function, `num_swaps(A)`, that takes such an array as input and returns an integer value. Note that you do not actually have to sort the array; just determine the number of swaps.
    
    Extend the problem to work with an array of N distinct values, using the symbol table from [Chapter 3](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch03.html#chap-3), and confirm that five swaps are needed for [Figure 5-1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#figure-to-sort).
    
3.  What is the total number of comparisons needed for the recursive `find_max(A)` to determine the largest value in an unordered array of N values? Is this total less than (or greater than) the total number of comparisons used by `largest(A)` presented in [Chapter 1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch01.html#chap-1)?
    
4.  In the `merge()` step in Merge Sort, it can happen that one side (left or right) is exhausted. Currently, the `merge()` function continues to iterate one step at a time. Replace this logic using Python’s ability to copy entire slices of an array, like was done in `aux[lo:hi+1] = A[lo:hi+1]`. Replace the logic in the first two cases of `merge()` using slice assignment. Conduct empirical trials to try to measure the performance improvement, if any.
    
5.  Complete a recursive implementation, `recursive_two(A)`, that returns the two largest values in `A`. Compare its runtime performance against the other approaches from [Chapter 1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch01.html#chap-1); also compare the number of times less-than is invoked.
    
6.  The Fibonacci series is defined using the recursive formula FN = FN – 1 + FN – 2, with base cases of F0 = 0 and F1 = 1. A related series, _Lucas Numbers_, is defined as LN = LN – 1 + LN – 2, with base cases of L0 = 2 and L1 = 1. Implement `fibonacci(n)` and `lucas(n)` using a standard recursive approach and measure the time it takes to compute both FN and LN up to N = 40; depending on the speed of your computer, you might have to increase or decrease N to allow the code to terminate. Now implement a new `fib_with_lucas(n)` method that takes advantage of the following two identities:
    
    *   `fib_with_lucas(n)`: If you set i = n//2 and j = n-i, then Fi + j = (Fi + Lj) × (Fj + Li)/2
        
    *   `lucas_with_fib(n)`: LN = FN – 1 + FN + 1  
        
    
    Compare timing results of `fibonacci()` with `fib_with_lucas()`.
    

##### Interactive Practice

Get more hands-on training and test your understanding of the concepts by working through our [playlist of interactive scenarios](https://learning.oreilly.com/playlists/a1276c1f-f54d-4a08-84be-34b492d9e5ff). Each step of the scenario must be completed correctly before you can move to the next step. If you get stuck, you can view the solution and learn how to complete the step.

The following scenarios cover material from this chapter:

*   [Sorting Algorithms: Insertion Sort](https://learning.oreilly.com/scenarios/sorting-algorithms-insertion/9781098114138/)
    
*   [Sorting Algorithms: Merge Sort](https://learning.oreilly.com/scenarios/sorting-algorithms-merge/9781098114145/)
    
*   [Sorting Algorithms: Quicksort Variations](https://learning.oreilly.com/scenarios/sorting-algorithms-quicksort/9781098114152/)
    

[1](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914779104-marker) No. See the challenge exercises at the end of the chapter.

[2](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914421136-marker) 275,000 is about 512 squared.

[3](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914194976-marker) To avoid crashing the Python interpreter because of infinite recursion, this code returns 1 when given any integer less than or equal to 1.

[4](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914185584-marker) In Python, the recursion limit is technically less than 1,000 to prevent crashing the Python interpreter.

[5](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239914180880-marker) `rmax` stands for _recursive max_.

[6](https://learning.oreilly.com/library/view/learning-algorithms/9781492091059/ch05.html#idm45239913448288-marker) Invented by Tony Hoare in 1959, Quicksort is well over 50 years old!

*   [Support](https://www.oreilly.com/online-learning/support/)