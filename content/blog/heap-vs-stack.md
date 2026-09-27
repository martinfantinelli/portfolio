## **What is "The Heap"?**

![Heap Memory Illustration](/blog/heap.jpg)

The Heap is commonly used for allocating memory for objects, arrays, and other data structures that require a flexible size during program execution. It is particularly useful in scenarios where the size of the data is not known beforehand or may change during the program's runtime. Examples include dynamically sized arrays, linked lists, and instances of classes in object-oriented programming.


Heap memory refers to a region of a computer's memory used for dynamic memory allocation. Unlike stack memory, which has a fixed size and follows a last-in, first-out (LIFO) order, heap memory allows for more flexible allocation and deallocation of memory blocks during runtime. This flexibility is essential for programs that need to manage large amounts of data or data structures whose sizes are not known in advance.

## **So what about "The Stack"?**

![Stack Memory Illustration](/blog/stack.jpg)

While the Stack is a segment of memory that stores temporary variables created by a function. In stack, variables are declared, stored and initialized during runtime.

Every time a function is called, the machine allocates some stack memory for it. When a new local variables is declared, more stack memory is allocated for that function to store the variable. Such allocations make the stack grow downwards. After the function returns, the stack memory of this function is deallocated, which means all local variables become invalid. The allocation and deallocation for stack memory is automatically done. The variables allocated on the stack are called stack variables, or automatic variables.

Imagine you’re at a party with two ways to grab snacks:

The Stack is like a neat tower of plates. Each time you take a plate (push), it goes on top, and when you’re done, you remove the top plate first (pop). It’s quick and organized, but there’s a catch—the tower can only get so tall. If you pile too many plates, the whole thing crashes (stack overflow!). This is how your program handles quick, small tasks (like counting to 10 or calling a function). Fast, but no room for mess.

The Heap, though, is like the party’s snack buffet. You can grab any dish (memory) in any size—a tiny cookie or a whole pizza—and keep it as long as you want. But here’s the rule: you must throw away your own trash. If you leave plates lying around (forgetting to free memory), the buffet table gets cluttered, snacks run out (memory leaks!), and eventually, the party crashes (out of memory!). This is where big, flexible data lives (like loading a giant game level). Powerful, but you must clean up.

Fortunately we have some "automagic" help when using some language(it depends on which one you are using)
In C, you manually allocate memory (malloc) and must free it yourself (free). Forget? Memory leaks. Free too soon? Crash.
Java uses a garbage collector (GC) that automatically frees unused heap memory. You just create objects (new), and the GC silently cleans up when they’re no longer needed. No manual work, but you sacrifice a tiny bit of speed for convenience.
Rust doesn’t need a garbage collector. Instead, its compiler enforces strict rules: memory is freed automatically when a variable goes out of scope, but it won’t compile if you try to misuse it. It’s like a fridge that locks itself if you leave leftovers too long—safe, fast, but you must follow its rules.

The big difference?

\-The stack is your tidy, auto-cleaning plate tower (small, fast, but fragile).

\-The heap is the wild buffet (huge and flexible, but you manage the mess).

![Memory management Illustration](/blog/heapstack.png)

Knowing these differences helps you optimize memory usage, debug crashes (like out-of-memory errors), and choose the right approach—whether you're squeezing performance from a game engine, scaling a web service, or building safety-critical systems. Essentially, memory awareness separates engineers who write "working code" from those who craft efficient, robust solutions.

# References

[Memory management in NodeJS](https://www.daily.co/blog/introduction-to-memory-management-in-node-js-applications/#)

[Memory management in C](https://medium.com/@lsltry404/memory-usage-in-c-programming-a-comprehensive-guide-b20038647992)

[Memory management in Rust](https://medium.com/@cicerohellmann/understanding-memory-management-in-rust-a-comparative-insight-with-c-and-java-kotlin-0b2102020ae7)

[Memory management in Java](https://medium.com/@3eid/deep-dive-into-java-memory-management-heap-stack-metaspace-and-garbage-collection-df6548fe6860)


# Thank you for reading!

![Frieren](/blog/frieren.jpeg)

## Redes Sociais

- **LinkedIn**: [martin-fantinelli](https://www.linkedin.com/in/martin-fantinelli/)
- **X/Twitter**: [@martinfantineli](https://x.com/martinfantineli)
- **Instagram**: [@martinfantinelli](https://www.instagram.com/martinfantinelli)
