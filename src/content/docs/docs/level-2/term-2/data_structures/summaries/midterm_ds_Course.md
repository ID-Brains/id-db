---
title: "Data Structures: A Rust Notes"
date: "2026-04-15"
type: "summary"
description: "Comprehensive notes and Rust implementations for Data Structures midterm, covering Queues, Stacks, Big-O, and Graph Algorithms."
subject: "data_structures"
level: "2"
term: 2
contributor: "k5602"
tags: ["Data-Structures", "Rust", "Graphs", "Big-O"]
language: "en"
---

# Data Structures: A Rust Notes
> Code and try always to get the idea
> This is my actual notes to revise DS with rust implmentation

> for exam night people: Don't get your hands dirty with rust as the most DS and Algos implmentation more hard bc of Rust memory Model

> thanks to jp2a people

> thanks to this amazing guy (https://www.youtube.com/playlist?list=PLrS21S1jm43igE57Ye_edwds_iL7ZOAG4)
---

## Mental Model: The Big Picture

Think of data structures as **containers with rules**. A suitcase and a backpack can both carry clothes, but which one you choose depends on *what you need to do* with those clothes. Do you need quick access to everything? Use a suitcase (array). Do you need to keep adding items one by one without worrying about size? Use a backpack (linked list). The **tension** between different needs is *why we have so many data structures* -- there is no one-size-fits-all "the perfect DS".

```
The Tradeoff Triangle:
        Speed (Time)
           /\
          /  \
         /    \
        /______\
  Elegance   Memory (Space)

and actually the js/python/java/c# people have the perfect DS in thier pov as  they have "GO JUST BUY MORE BLOODY DIABOLICAL HARDWARE PEOPLE"

Every data structure lives somewhere in this triangle "for us as systems programmers".
Your job is to pick the one closest to your need.
```

---

##  Introduction to Data Structures

### 1.1 What is a Data Structure?

A data structure is a **clever way to organize information** so that computation becomes efficient. The word "clever" is doing heavy lifting here -- it ranges from familiar techniques (simple lists) to mathematically deep structures like hash tables and self-balancing trees.

Think of it this way: **an algorithm is the recipe, and the data structure is the kitchen layout**. You could make a meal in any kitchen, but a well-organized kitchen (good data structure) makes the process dramatically faster.

**Classification:**

| Category | Description | Examples |
|---|---|---|
| **Primitive** | Built into the language, operated on by machine instructions | `i32`, `f64`, `char`, `bool` |
| **Non-Primitive** | Composed of primitive types, user-defined | Arrays, Lists, Trees, Graphs |

### 1.2 The Terminology Ladder

Here is one of the most important hierarchies in CS. Understand this, and half the Science makes sense:

```
Most Abstract         Most Concrete
    |                      |
ADT (Math model)           |
    |                      |
Algorithm (Pseudocode)     |
    |                      |
Data Structure (Design)    |
    |                      |
Implementation (Code)  ----+
```

- **ADT (Abstract Data Type):** A *mathematical description* of what operations are possible. Example: "Like the actual Methods allowed for a DS and why is there prohibited Methods -> summarized in one sentence 'what the hell is its shape in memory words'"
- **Algorithm:** A language-independent step-by-step process.
- **Data Structure:** A specific family of algorithms implementing an ADT. Example: "A stack can use an array or a linked list."
- **Implementation:** Actual code in a specific language.

**Mental Model:** Think of an ADT as a **job description** ("must be able to push and pop"), the data structure as the **candidate's approach** ("I'll use an array approach"), and the implementation as the **actual employee working**.

### 1.3 The Queue ADT

**Mental Model:** A queue is a line at a coffee shop. First person in line gets served first. **FIFO** (First In, First Out).

**Operations:** `create`, `destroy`, `enqueue`, `dequeue`, `is_empty`

#### Implementation 1: Circular Array

The array wraps around on itself to avoid shifting elements. Instead of moving everything forward when you dequeue, you just move the `front` pointer forward.

```rust
struct CircularArrayQueue<T> {
    buffer: Vec<Option<T>>,
    front: usize,
    back: usize,
    size: usize,
}

impl<T> CircularArrayQueue<T> {
    fn new(capacity: usize) -> Self {
        let mut buffer = Vec::with_capacity(capacity);
        for _ in 0..capacity {
            buffer.push(None);
        }
        CircularArrayQueue {
            buffer,
            front: 0,
            back: 0,
            size: 0,
        }
    }

    fn enqueue(&mut self, item: T) {
        if self.size == self.buffer.len() {
            panic!("Queue overflow! Cannot enqueue to a full queue.");
        }
        self.buffer[self.back] = Some(item);
        self.back = (self.back + 1) % self.buffer.len();
        self.size += 1;
    }

    fn dequeue(&mut self) -> T {
        if self.size == 0 {
            panic!("Queue underflow! Cannot dequeue from an empty queue.");
        }
        let item = self.buffer[self.front].take().unwrap();
        self.front = (self.front + 1) % self.buffer.len();
        self.size -= 1;
        item
    }

    fn is_empty(&self) -> bool {
        self.size == 0
    }
    // i cheated and copied this from my 2021 first touching rust what a wonderful days
}
```

#### Implementation 2: Linked List

Each node points to the next. No fixed size limit. No wrapping around.

```rust
struct Node<T> {
    data: T,
    next: Option<Box<Node<T>>>,
}

struct LinkedListQueue<T> {
    front: Option<Box<Node<T>>>,
    back: Option<*mut Node<T>>, // raw pointer for O(1) back access 'VIP'
}

impl<T> LinkedListQueue<T> {
    fn new() -> Self {
        LinkedListQueue {
            front: None,
            back: None,
        }
    }

    fn enqueue(&mut self, item: T) {
        let mut new_node = Box::new(Node { data: item, next: None });
        if self.front.is_none() {
            self.front = Some(new_node);
            self.back = Some(self.front.as_mut().unwrap() as *mut Node<T>);
        } else {
            unsafe {
                (*self.back.unwrap()).next = Some(new_node);
                self.back = Some((*self.back.unwrap()).next.as_mut().unwrap() as *mut Node<T>);
            }
        }
    }

    fn dequeue(&mut self) -> Option<T> {
        self.front.take().map(|node| {
            self.front = node.next;
            if self.front.is_none() {
                self.back = None;
            }
            node.data
        })
    }

    fn is_empty(&self) -> bool {
        self.front.is_none()
    }
}
```

#### Circular Array vs Linked List

| Aspect | Circular Array | Linked List |
|---|---|---|
| Memory | Fixed allocation (may waste space) | Exactly what's needed |
| Kth element access | O(1) -- just index | O(n) -- must traverse |
| Max size | Fixed at creation | Unbounded (until system memory) |
| Code complexity | Simpler | More complex (pointer management) |
| Wrapping issue | `front == back` ambiguity | No wrapping needed |

### 1.4 The Stack ADT

**Mental Model:** A stack of plates. You can only add or remove the top plate. **LIFO** (Last In, First Out).

**Operations:** `create`, `destroy`, `push`, `pop`, `top`, `is_empty`

```rust
struct Stack<T> {
    data: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { data: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.data.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.data.pop()
    }

    fn top(&self) -> Option<&T> {
        self.data.last()
    }

    fn is_empty(&self) -> bool {
        self.data.is_empty()
    }
}
```

**Where Stacks Live in the Wild:**
- The **function call stack** (every time a function is called, a new frame is pushed) "python/js people you will never know anything of this"
- **Removing recursion** (convert recursive calls to explicit stack operations)
- **Balancing parentheses** (push opening brackets, pop when you see closing ones)
- **Evaluating Reverse Polish Notation** (push operands, pop when you see an operator)

### 1.5 Correctness: Proof by Induction

Before worrying about speed, worry about correctness. so we can use **mathematical induction** to prove algorithms work "not my most preferable way but i had to":

1. **Base Case:** Prove it works for the smallest input (e.g., n=0 or n=1).
2. **Inductive Hypothesis:** Assume it works for some arbitrary k.
3. **Inductive Step:** Show that if it works for k, it must work for k+1.

```rust
// Recursive sum - provably correct by induction
fn sum(v: &[i32], n: usize) -> i32 {
    if n == 0 {
        return 0; // Base case
    }
    v[n - 1] + sum(v, n - 1) // Inductive step: assumes sum(v, n-1) is correct
}
```

**Proof sketch:** Base case `sum(v, 0) = 0` is correct. Assume `sum(v, k)` correctly returns `v[0] + ... + v[k-1]`. Then `sum(v, k+1) = v[k] + sum(v, k) = v[k] + v[0] + ... + v[k-1] = v[0] + ... + v[k]`. Correct.

### 1.6 Algorithm Analysis: The Basics

**Why analyze at all?** Because you want to choose the right algorithm *before* spending time implementing it.
**DATA WINS** you have data you have the wild card to slash and kill every dumb py/js web developer.

**Time complexity:** How long the program runs as a function of input size n.
**Space complexity:** How much memory it uses as a function of n.

**The key insight:** WE do not care about exact running time. We care about **how time grows** as n gets large. This is *asymptotic analysis*.

---

## 2.1 Big-O Analysis & Diabolical C++ Fundamentals

### 2.1 Big-O Notation: The Core Idea

**Mental Model:** Big-O is like saying "this restaurant serves food in *about* 30 minutes." You do not care if it is 28 or 33 minutes. You care about the *order of magnitude*. Big-O strips away constants and low-order terms to give you that order of magnitude.

**Formal Definition:** `T(n) = O(f(n))` if there exist positive constants `c` and `n0` such that `T(n) <= c * f(n)` for all `n >= n0`.

In plain English: "For large enough inputs"mostly more than 100K you micro optimization freak", T(n) never grows faster than f(n) times some constant."

### 2.2 The Asymptotic Simplification Process

```
Step 1: Eliminate low-order terms
  4n + 5          ->  4n
  0.5n*log(n) + 2n + 7  ->  0.5n*log(n)
  n^2 + 2^n + 3n  ->  2^n  (exponential dominates!)

Step 2: Eliminate coefficients
  4n        ->  n       =>  O(n)
  0.5n*log(n) -> n*log(n) => O(n log n)
  2^n       ->  2^n     =>  O(2^n)
```

**The hierarchy of growth rates** (from fastest to slowest):

```
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)
 |         |          |            |              |            |
constant  logarithmic linear    log-linear    quadratic    exponential
```

**Key insight:** The *slowest-growing* function represents the *fastest* algorithm.

### 2.3 Linear Search vs Binary Search

```rust
// Linear Search: O(n) -- check every element
fn linear_search(arr: &[i32], key: i32) -> bool {
    for &item in arr {
        if item == key {
            return true;
        }
    }
    false
    // Best case: O(1)  (first element)
    // Worst case: O(n)  (not in array)
}

// Binary Search: O(log n) -- halves the search space each step
fn binary_search(arr: &[i32], low: usize, high: usize, key: i32) -> bool {
    if low > high {
        return false; // Base case: not found
    }
    let mid = low + (high - low) / 2;
    if arr[mid] == key {
        return true; // Found it!
    } else if key < arr[mid] {
        binary_search(arr, low, mid.saturating_sub(1), key)
    } else {
        binary_search(arr, mid + 1, high, key)
    }
    // Best case: O(1)  (middle element)
    // Worst case: O(log n)
}
```

**Mental Model:** Linear search is like flipping through a book page by page. Binary search is like opening the book to the middle, deciding which half the answer is in, and repeating. For a 1,000,000-element array, linear search could take 1,000,000 steps. Binary search takes at most 20 steps. That is the power of logarithmic growth "thanks to david malon CS50 most forward example".

### 2.4 Solving Recurrence Relations

For recursive algorithms, we express runtime as a recurrence relation:

**Binary search:** `T(n) = T(n/2) + O(1)`, base case `T(1) = O(1)`

To solve it:
1. **Expand:** `T(n) = T(n/2) + 1 = T(n/4) + 1 + 1 = T(n/8) + 1 + 1 + 1 = ...`
2. **Find the pattern:** After k expansions: `T(n) = T(n/2^k) + k`
3. **Set k so we hit the base case:** `n/2^k = 1 => k = log2(n)`
4. **Result:** `T(n) = O(1) + log2(n) = O(log n)`

### 2.5 The Full Notation Family

| Symbol | Name | Meaning | English |
|---|---|---|---|
| `O(f(n))` | Big-O | Upper bound | "Grows no faster than f(n)" |
| `Omega(f(n))` | Big-Omega | Lower bound | "Grows at least as fast as f(n)" |
| `Theta(f(n))` | Big-Theta | Tight bound | "Grows exactly like f(n)" |
| `o(f(n))` | little-o | Strict upper bound | "Grows strictly slower than f(n)" |
| `omega(f(n))` | little-omega | Strict lower bound | "Grows strictly faster than f(n)" |

**Mental Model:**
- `O` is like saying "at most" (ceiling)
- `Omega` is like saying "at least" (floor)
- `Theta` is like saying "exactly" (both floor and ceiling match)
- `o` is like saying "strictly less than" (never reaches the ceiling)

### 2.6 Types of Analysis

There are two independent axes you can use:

| | Worst Case | Average Case | Best Case | Amortized |
|---|---|---|---|---|
| **Meaning** | Adversary picks input | Random inputs | Luckiest input | Average over many operations |
| **Example** | Quicksort O(n^2) | Quicksort O(n log n) | Quicksort O(n log n) | Dynamic array O(1) per push |

### 2.7 C++ Fundamentals (Mapped to Rust because i don't want to corrupt my mind)

#### Preprocessor / Compilation

```cpp
// C++: #include <iostream>  (preprocessor directive)
// Rust: use std::io;        (module system, not preprocessor)
```

Rust does not have a preprocessor. Instead, it uses a module system (`mod`, `use`) and macros (`#[derive(Debug)]`, `macro_rules!`). There is no risk of duplicate includes because Rust's module system handles visibility explicitly.

#### Templates (Generics)

```rust
// Rust generics are equivalent to C++ templates
// but they are monomorphized at compile time

fn square<T: std::ops::Mul<Output = T> + Copy>(x: T) -> T {
    x * x
}

fn main() {
    let int_result = square(3i32);       // T = i32
    let float_result = square(3.14f64);  // T = f64
    println!("3 squared = {}", int_result);    // 9
    println!("Pi squared = {:.4}", float_result); // 9.8696
}
```

#### Pointers and Memory

```rust
// C++ pointers -> Rust references,Box,Cows and RFC
fn pointer_demonstration() {
    let m = 5;
    let ptr: &i32 = &m;       // & is like getting address (& in C++)
    println!("Value: {}", *ptr); // * is like dereferencing (* in C++)
    // *ptr = 3;               // ERROR! Rust references are immutable by default

    // Mutable reference
    let mut n = 10;
    let ptr_mut: &mut i32 = &mut n;
    *ptr_mut = 20;
    println!("n = {}", n); // 20

    // Heap allocation (like C++ new)
    let heap_val = Box::new(42);
    println!("Heap value: {}", heap_val); // 42
    // No manual delete needed -- Rust drops it automatically when out of scope
}
```

**Key difference:** Rust's ownership system means there is no manual `delete`. When a `Box` goes out of scope, the memory is freed automatically. This eliminates entire classes of bugs (use-after-free, double-free, memory leaks) while maintaining C++-level performance.

#### Classes (Structs + Impl)

```rust
struct Complex<T> {
    re: T,
    im: T,
}

impl<T: num_traits::Float> Complex<T> {
    fn new(re: T, im: T) -> Self {
        Complex { re, im }
    }

    // Accessor (Rust: &self is implicitly const)
    fn real(&self) -> T { self.re }
    fn imag(&self) -> T { self.im }

    fn abs(&self) -> T {
        (self.re * self.re + self.im * self.im).sqrt()
    }

    fn exp(&self) -> Self {
        let exp_re = self.re.exp();
        Complex::new(exp_re * self.im.cos(), exp_re * self.im.sin())
    }

    // Mutator (Rust: &mut self is explicitly mutable)
    fn normalize(&mut self) {
        if self.re == T::zero() && self.im == T::zero() {
            return;
        }
        let absval = self.abs();
        self.re = self.re / absval;
        self.im = self.im / absval;
    }
}
```

**Key Rust concept:** Rust separates the idea of "accessor" and "mutator" at the language level. `&self` means "I promise not to modify anything" and `&mut self` means "I need to modify this." The compiler enforces this -- no `const` keyword needed because the type system itself guarantees it.

---

## Lecture 3: Mathematical Foundations & Graph Algorithms

### 3.1 Logarithms: Secondry school lookback

**Mental Model:** A logarithm answers the question "how many times do I need to halve something to reach 1?" This is why binary search is O(log n) -- each step halves the search space.

**Key properties:**

```
log(AB) = log(A) + log(B)        -- Product becomes sum
log(A/B) = log(A) - log(B)       -- Quotient becomes difference
log(A^B) = B * log(A)            -- Exponent comes down
log_b(x) = log_k(x) / log_k(b)  -- Change of base formula

This means: all logs are equivalent up to a constant factor.
So O(log n) is the same regardless of base.
```

**Interesting fact from the lecture:** `ln(n)` and `n^(1/3)` grow at similar rates until about n=93. After that, `ln(n)` grows slower. This is a good reminder that asymptotic analysis only becomes meaningful for *large* inputs.

### 3.2 Series and Sums

#### Arithmetic Series

The sum of the first n integers:

```
sum_{k=0}^{n} k = n(n+1)/2
```

**Mental Model:** Pair the first and last elements: (0,n), (1,n-1), (2,n-2), ... Each pair sums to n. There are n/2 pairs. So: n * n/2 = n^2/2. (This is Gauss's famous childhood trick.)

```rust
// Iterative (O(n))
fn arithmetic_sum_iterative(n: u64) -> u64 {
    (0..=n).sum()
}

// Formula (O(1))
fn arithmetic_sum_formula(n: u64) -> u64 {
    n * (n + 1) / 2
}
```

#### Geometric Series

```
sum_{k=0}^{n} r^k = (1 - r^(n+1)) / (1 - r)
```

**Mental Model (Telescoping):** Multiply by `(1-r)/(1-r)`. The middle terms all cancel out, leaving only the first and last. Like a telescope collapsing 'thanks mit pre-calc'.

#### General Polynomial Series

```
sum_{k=0}^{n} k^d ~ n^(d+1) / (d+1)
```

For `d=1`: sum ~ `n^2/2` (arithmetic series)
For `d=2`: sum ~ `n^3/3`
For `d=3`: sum ~ `n^4/4`

### 3.3 Recurrence Relations

Define `x_n` in terms of previous values, starting from a base case.

```
x_1 = 1                    (base case)
x_n = x_{n-1} + 2          (each step adds 2)
x_n = 2 * x_{n-1} + n      (each step doubles and adds n)
x_n = x_{n-1} + x_{n-2}    (Fibonacci!)
```

### 3.4 Combinations and Binomial Coefficients

```
C(n,k) = n! / (k!(n-k)!)   -- "n choose k"

Key identity: C(n,k) = C(n-1,k-1) + C(n-1,k)
(Pascal's Triangle identity)
```

**Used in:** Expanding polynomials: `(x+y)^n = sum_{k=0}^{n} C(n,k) * x^k * y^(n-k)`

```rust
fn binomial(n: u64, k: u64) -> u64 {
    if k > n { return 0; }
    if k == 0 || k == n { return 1; }
    binomial(n - 1, k - 1) + binomial(n - 1, k)
}

// Iterative (more efficient, avoids repeated computation):
fn binomial_dp(n: u64, k: u64) -> u64 {
    let k = k.min(n - k); // C(n,k) = C(n,n-k), use the smaller
    let mut result = 1u64;
    for i in 0..k {
        result = result * (n - i) / (i + 1);
    }
    result
}
```

### 3.5 Graphs: The Universal Data Structure

**Mental Model:** A graph is a web of connections. Cities connected by roads, people connected by friendships, webpages connected by links -- graphs model *relationships*.

**Definitions:**
- **Vertex (node):** An entity (city, person, webpage)
- **Edge:** A connection between two vertices (road, friendship, link)
- **Directed graph:** Edges have direction (one-way streets)
- **Undirected graph:** Edges are bidirectional (two-way streets)
- **Simple path:** A path that does not repeat vertices
- **Cycle:** A path that starts and ends at the same vertex
- **DAG (Directed Acyclic Graph):** A directed graph with no cycles

#### Graph Representations in Rust

```rust
use std::collections::{HashMap, HashSet, VecDeque, BinaryHeap};
use std::cmp::Ordering;

// Adjacency List representation
struct Graph {
    vertices: HashSet<usize>,
    edges: HashMap<usize, Vec<(usize, i64)>>, // vertex -> [(neighbor, weight)]
}

impl Graph {
    fn new() -> Self {
        Graph {
            vertices: HashSet::new(),
            edges: HashMap::new(),
        }
    }

    fn add_vertex(&mut self, v: usize) {
        self.vertices.insert(v);
        self.edges.entry(v).or_insert_with(Vec::new);
    }

    fn add_edge(&mut self, from: usize, to: usize, weight: i64) {
        self.vertices.insert(from);
        self.vertices.insert(to);
        self.edges.entry(from).or_default().push((to, weight));
    }

    fn neighbors(&self, v: usize) -> &[(usize, i64)] {
        self.edges.get(&v).map(|v| v.as_slice()).unwrap_or(&[])
    }
}
```

### 3.6 Graph Traversals: BFS and DFS

**Mental Model:**
- **BFS (Breadth-First Search):** Like ripples in a pond. Explore all neighbors at distance 1, then all at distance 2, etc. Uses a **queue**.
- **DFS (Depth-First Search):** Like exploring a maze by going as deep as possible before backtracking. Uses a **stack**.

```rust
impl Graph {
    // BFS - finds shortest path in unweighted graphs
    fn bfs(&self, start: usize, goal: usize) -> Option<Vec<usize>> {
        let mut queue = VecDeque::new();
        let mut visited = HashSet::new();
        let mut parent: HashMap<usize, usize> = HashMap::new();

        queue.push_back(start);
        visited.insert(start);

        while let Some(current) = queue.pop_front() {
            if current == goal {
                // Reconstruct path
                let mut path = vec![goal];
                let mut node = goal;
                while let Some(&p) = parent.get(&node) {
                    path.push(p);
                    node = p;
                }
                path.reverse();
                return Some(path);
            }
            for &(neighbor, _) in self.neighbors(current) {
                if !visited.contains(&neighbor) {
                    visited.insert(neighbor);
                    parent.insert(neighbor, current);
                    queue.push_back(neighbor);
                }
            }
        }
        None // No path found
    }

    // DFS - explores as deep as possible first
    fn dfs(&self, start: usize, goal: usize) -> Option<Vec<usize>> {
        let mut stack = vec![start];
        let mut visited = HashSet::new();
        let mut parent: HashMap<usize, usize> = HashMap::new();

        while let Some(current) = stack.pop() {
            if current == goal {
                let mut path = vec![goal];
                let mut node = goal;
                while let Some(&p) = parent.get(&node) {
                    path.push(p);
                    node = p;
                }
                path.reverse();
                return Some(path);
            }
            if !visited.contains(&current) {
                visited.insert(current);
                for &(neighbor, _) in self.neighbors(current) {
                    if !visited.contains(&neighbor) {
                        parent.insert(neighbor, current);
                        stack.push(neighbor);
                    }
                }
            }
        }
        None
    }
}
```

**BFS vs DFS comparison:**

| Aspect | BFS | DFS |
|---|---|---|
| Data structure | Queue | Stack |
| Shortest path (unweighted)? | Yes | No |
| Space complexity | O(k^d) -- exponential in depth | O(d) -- linear in depth |
| Good for | Finding shortest paths, level-order exploration | Detecting cycles, topological sort, maze solving |
| When space is tight? | Avoid if branching factor is high | Prefer -- uses less memory |

**Key insight from the lecture:** BFS can use enormous memory "so just buy memory". If the distance to the goal is 15 and each node has 10 neighbors, the queue could grow to 10^15 = 1,000,000,000,000,000 entries. DFS only needs to store the current path.

### 3.7 Topological Sort

**Mental Model:** Think of course prerequisites. You cannot take "Data Structures" before "Intro to Programming." A topological sort gives you a valid order to take all courses.

**Algorithm:**
1. Label each vertex with its in-degree (number of incoming edges).
2. While vertices remain: pick one with in-degree 0, output it, reduce in-degrees of its neighbors.
3. If you cannot find a vertex with in-degree 0 and there are still vertices left, the graph has a cycle.

```rust
fn topological_sort(vertices: usize, edges: &[(usize, usize)]) -> Option<Vec<usize>> {
    let mut in_degree = vec![0i32; vertices];
    let mut adj: Vec<Vec<usize>> = vec![vec![]; vertices];

    for &(u, v) in edges {
        adj[u].push(v);
        in_degree[v] += 1;
    }

    let mut queue: VecDeque<usize> = in_degree
        .iter()
        .enumerate()
        .filter(|&(_, &d)| d == 0)
        .map(|(i, _)| i)
        .collect();

    let mut result = Vec::new();

    while let Some(v) = queue.pop_front() {
        result.push(v);
        for &neighbor in &adj[v] {
            in_degree[neighbor] -= 1;
            if in_degree[neighbor] == 0 {
                queue.push_back(neighbor);
            }
        }
    }

    if result.len() == vertices { Some(result) } else { None }
}
```

### 3.8 Dijkstra's Algorithm: Shortest Paths in Weighted Graphs

**Mental Model:** Imagine you are a delivery driver. You start at the warehouse. At each intersection, you look at all possible next stops and choose the one that is *closest so far*. Once you commit to a stop, you never reconsider it (greedy!) "last semster shouldn't have this without taking it in ds".

**Key constraint:** Dijkstra only works with **non-negative** edge weights. If there are negative weights, use Bellman-Ford instead.

```rust
#[derive(Copy, Clone, Eq, PartialEq)]
struct State {
    cost: u64,
    vertex: usize,
}

// Reverse ordering for min-heap behavior
impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other.cost.cmp(&self.cost) // min-heap: lower cost = higher priority
    }
}
impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> { Some(self.cmp(other)) }
}

impl Graph {
    fn dijkstra(&self, start: usize) -> Vec<u64> {
        let mut dist: Vec<u64> = vec![u64::MAX; self.vertices.len()];
        let mut heap = BinaryHeap::new();

        dist[start] = 0;
        heap.push(State { cost: 0, vertex: start });

        while let Some(State { cost, vertex }) = heap.pop() {
            if cost > dist[vertex] {
                continue; // Skip stale entries
            }
            for &(neighbor, weight) in self.neighbors(vertex) {
                let new_cost = cost.saturating_add(weight as u64);
                if new_cost < dist[neighbor] {
                    dist[neighbor] = new_cost;
                    heap.push(State { cost: new_cost, vertex: neighbor });
                }
            }
        }
        dist
    }
}
```

**How Dijkstra works in English:**
1. Mark the start as "known" with cost 0.
2. For every unknown neighbor of known vertices, compute tentative cost.
3. Pick the unknown vertex with the lowest tentative cost. Mark it as "known."
4. Repeat until all vertices are known (or you found the goal).

**Why does it work?** Because when you mark a vertex as "known," you have guaranteed that no shorter path to it exists. Any other path would have to go through an unknown vertex, and all unknown vertices have cost >= the one you just picked.

### 3.9 Floyd-Warshall: All-Pairs Shortest Paths

**Mental Model:** Instead of running Dijkstra from every vertex, build a matrix where `matrix[i][j]` holds the shortest distance from i to j. Then iteratively improve it by considering intermediate vertices.

```rust
fn floyd_warshall(n: usize, mut dist: Vec<Vec<i64>>) -> Vec<Vec<i64>> {
    for k in 0..n {
        for i in 0..n {
            for j in 0..n {
                if dist[i][k] != i64::MAX && dist[k][j] != i64::MAX {
                    if dist[i][k] + dist[k][j] < dist[i][j] {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
    dist
}
```

**Runtime:** O(V^3) -- three nested loops. Simple but slow for large graphs.

**Dijkstra V = n times vs Floyd-Warshall:**
- Dijkstra n times: O(n * (E + V*log(V))) -- better for sparse graphs
- Floyd-Warshall: O(V^3) -- better for dense graphs, handles negative edges (if no negative cycles)

### 3.10 Minimum Spanning Trees

**Mental Model:** You are an internet service provider. You need to connect all houses with fiber optic cables, but laying cable is expensive. You want the *cheapest* set of cables that connects every house. That is a Minimum Spanning Tree (MST).

**Definition:** A spanning tree T of graph G = (V, E) is a subset of E such that:
- (V, T) is connected
- (V, T) has no cycles
- The total cost C(T) = sum of edge costs in T is minimized

#### Kruskal's Algorithm (Edge-based, Greedy)

**Idea:** Sort all edges by cost. Pick the cheapest edge that does not create a cycle. Repeat until all vertices are connected.

```rust
// Union-Find (Disjoint Set Union) for Kruskal's
struct UnionFind {
    parent: Vec<usize>,
    rank: Vec<usize>,
}

impl UnionFind {
    fn new(n: usize) -> Self {
        let mut parent = Vec::with_capacity(n);
        let mut rank = vec![0; n];
        for i in 0..n {
            parent.push(i);
        }
        UnionFind { parent, rank }
    }

    fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            self.parent[x] = self.find(self.parent[x]); // Path compression
        }
        self.parent[x]
    }

    fn union(&mut self, x: usize, y: usize) -> bool {
        let px = self.find(x);
        let py = self.find(y);
        if px == py { return false; } // Already connected
        // Union by rank
        if self.rank[px] < self.rank[py] {
            self.parent[px] = py;
        } else if self.rank[px] > self.rank[py] {
            self.parent[py] = px;
        } else {
            self.parent[py] = px;
            self.rank[px] += 1;
        }
        true
    }
}

fn kruskal(n: usize, edges: &mut [(usize, usize, i64)]) -> Vec<(usize, usize, i64)> {
    edges.sort_by_key(|&(_, _, w)| w);
    let mut uf = UnionFind::new(n);
    let mut mst = Vec::new();

    for &(u, v, w) in edges.iter() {
        if uf.union(u, v) {
            mst.push((u, v, w));
            if mst.len() == n - 1 { break; }
        }
    }
    mst
}
```

#### Prim's Algorithm (Node-based, Greedy)

**Idea:** Start from any vertex. Repeatedly add the cheapest edge connecting a known vertex to an unknown vertex.

```rust
fn prim(graph: &Graph, start: usize) -> Vec<(usize, usize, i64)> {
    let mut mst = Vec::new();
    let mut in_mst = HashSet::new();
    let mut heap = BinaryHeap::new(); // min-heap by weight

    in_mst.insert(start);
    for &(neighbor, weight) in graph.neighbors(start) {
        heap.push(State { cost: weight as u64, vertex: neighbor });
    }

    while let Some(State { cost: _, vertex: v }) = heap.pop() {
        if in_mst.contains(&v) { continue; }
        in_mst.insert(v);
        // In a real implementation, track which edge led to v
        mst.push((0, v, 0)); // simplified
        for &(neighbor, weight) in graph.neighbors(v) {
            if !in_mst.contains(&neighbor) {
                heap.push(State { cost: weight as u64, vertex: neighbor });
            }
        }
    }
    mst
}
```

**Kruskal vs Prim:**

| Aspect | Kruskal | Prim |
|---|---|---|
| Approach | Edge-based | Node-based |
| Best for | Sparse graphs | Dense graphs |
| Data structure | Union-Find | Priority Queue |
| Sort edges first? | Yes | No |
| Runtime | O(E log E) | O(E + V log V) |

---

## Math Content Summary

### Logarithms

| Property | Formula |
|---|---|
| Product rule | `log(AB) = log(A) + log(B)` |
| Quotient rule | `log(A/B) = log(A) - log(B)` |
| Power rule | `log(A^B) = B * log(A)` |
| Change of base | `log_b(x) = log(x) / log(b)` |
| Identity | `b^(log_b(x)) = x` |
| All logs are equivalent | `O(log_a(n)) = O(log_b(n))` for any a,b > 1 |

### Series

| Series | Formula | Approximation |
|---|---|---|
| Arithmetic (sum of k from 0 to n) | `n(n+1)/2` | `Theta(n^2)` |
| Geometric (sum of r^k from 0 to n) | `(1 - r^(n+1))/(1 - r)` | `= 1/(1-r)` when `|r| < 1` and n -> inf |
| Polynomial (sum of k^d from 0 to n) | `n^(d+1)/(d+1)` | `Theta(n^(d+1))` |
| Exponential (sum of 2^k from 0 to n) | `2^(n+1) - 1` | `Theta(2^n)` |

### Combinatorics

| Identity | Formula |
|---|---|
| Definition | `C(n,k) = n! / (k!(n-k)!)` |
| Pascal's identity | `C(n,k) = C(n-1,k-1) + C(n-1,k)` |
| Symmetry | `C(n,k) = C(n, n-k)` |
| Binomial theorem | `(x+y)^n = sum C(n,k) * x^k * y^(n-k)` |

### Asymptotic Notation

| Symbol | Condition | English |
|---|---|---|
| `g in O(f)` | Exists c, n0: g(n) <= c*f(n) for all n >= n0 | At most proportional |
| `g in Omega(f)` | Exists c, n0: g(n) >= c*f(n) for all n >= n0 | At least proportional |
| `g in Theta(f)` | g in O(f) AND g in Omega(f) | Exactly proportional |
| `g in o(f)` | limit g(n)/f(n) = 0 | Strictly slower |
| `g in omega(f)` | limit g(n)/f(n) = infinity | Strictly faster |

### Algorithm Complexities Covered

| Algorithm | Time Complexity | Space Complexity |
|---|---|---|
| Linear Search | O(n) | O(1) |
| Binary Search | O(log n) | O(log n) recursive / O(1) iterative |
| BFS (unweighted shortest path) | O(V + E) | O(V) |
| DFS | O(V + E) | O(V) |
| Topological Sort | O(V + E) | O(V) |
| Dijkstra (with heap) | O((V + E) log V) | O(V) |
| Floyd-Warshall | O(V^3) | O(V^2) |
| Kruskal's MST | O(E log E) | O(V) |
| Prim's MST (with heap) | O((V + E) log V) | O(V) |

---

## Tricks & Catches

### The "Robustness First" Rule

> "Your data structures should be robust! Make them robust before you even consider thinking about making them efficient! That is an order!" 'that's not true you have to overengineer and micro-optimize solutions'

The lecture highlights common bugs in the circular array queue that students miss:

1. **No overflow check on enqueue:** If the buffer is full and you enqueue without checking, `back` wraps around and *silently overwrites* data that has not been dequeued yet. This is one of the hardest bugs to track down because the program does not crash -- it just gives wrong answers 'we love C++'.

2. **No underflow check on dequeue:** If the queue is empty and you dequeue, you read garbage/stale memory from `Q[front]`. In C++, this is undefined behavior 'memory violation'.

3. **The `front == back` ambiguity:** When `front == back`, is the queue empty or full? You cannot tell without an extra variable (like `size` or a `full` flag). If you try to use just `front == back`, you end up wasting one slot (only N-1 usable slots in an N-sized array).

```rust
// The fix: track size separately
fn is_empty(&self) -> bool { self.size == 0 }
fn is_full(&self) -> bool { self.size == self.buffer.len() }
// Now front == back is unambiguous -- check size instead
```

### The `const` Keyword Pitfall (Mapped to Rust)

The lecture tells a real story of a student who wrote this in a `const` member function (accessor):

```cpp
// WRONG - tried to modify member variable in accessor
int Double_sentinel_list<Type>::count(Type const &obj) const {
    for (...) {
        if (...) {
            ++list_size;  // BUG! list_size is a member variable!
        }
    }
    return list_size;
}
```

The compiler caught it. What they wanted was a **local variable**:

```cpp
// CORRECT - use a local variable
int Double_sentinel_list<Type>::count(Type const &obj) const {
    int obj_count = 0;  // LOCAL variable, not member variable
    for (...) {
        if (...) {
            ++obj_count;
        }
    }
    return obj_count;
}
```

**Rust equivalent:** In Rust, `&self` methods cannot modify `self` at all. The compiler catches this at the type level. If you try to mutate a field inside `&self`, it simply will not compile. No need for a separate `const` keyword -- the type system IS the guarantee 'that's what mut for'.

### The Visibility Block Trap

In C++, visibility (`public`, `private`, `protected`) applies to everything below it until another visibility keyword appears. This is different from C#/Java where you put the modifier on each member individually.

```cpp
class Bad {
public:
    void a();
private:
    void b();
    void c();    // Still private!
    void d();    // Still private!
public:
    void e();    // Back to public
};
```

If you cut-paste code from one section to another, you might accidentally change the visibility of several members. Moving from `public` to `private` is caught by the compiler. Moving from `private` to `public` is **not caught** and can be dangerous.

**Rust does not have this problem** because visibility is per-item. Every function and field can have its own `pub` modifier.

### Big-O Catches

1. **O(1) does not mean "fast."** It means "constant time." If that constant is 10 billion operations, O(1) might still be slower than O(n) for all practical values of n.

2. **Drop constants, but know they matter in practice.** O(100n) and O(n/2) are both O(n), but the constant factor of 200x difference is huge in real code so this is not the most loved way to analyze 'perf is the best actually'.

3. **Best case is usually useless.** An algorithm with best case O(1) and worst case O(n^2) is usually O(n^2) in practice unless you can *guarantee* the best case will always happen 'and it will never happen , so that's why we microoptimize'.

4. **Amortized vs Worst Case are different.** A dynamic array (Vec in Rust) has O(1) *amortized* push, but occasionally an O(n) resize happens. If you need guaranteed O(1), you cannot use a dynamic array 'and i don't anyway'.

### Dijkstra Catches

1. **Negative weights break Dijkstra.** The greedy choice assumes that once you pick the cheapest unknown vertex, no shorter path exists. With negative edges, a "more expensive" vertex could lead to a negative edge that makes the total path cheaper. For negative weights, use Bellman-Ford (O(VE)).

2. **Dijkstra finds shortest paths from ONE source.** If you need shortest paths between all pairs, you need to run Dijkstra V times (total: O(VE log V)) or use Floyd-Warshall (O(V^3)). For dense graphs, Floyd-Warshall wins. For sparse graphs, repeated Dijkstra wins.

3. **BFS gives shortest paths only in unweighted graphs.** Many students confuse this. BFS explores by "hops," which is only the shortest path when all edges have equal weight.

### Union-Find Catches

1. **Path compression and union by rank are essential.** Without them, Union-Find degrades to O(n) per operation, making Kruskal's O(E * n) instead of O(E * alpha(n)), where alpha is the inverse Ackermann function (effectively O(1)).

2. **Always check if `find(u) == find(v)` before unioning.** If they are already in the same set, adding the edge would create a cycle.

### The Logarithm Identity Trap

All logs are the same up to a constant in Big-O, so `O(log_2(n)) = O(log_10(n)) = O(ln(n))`. But in actual computation, the constant matters. Also, `n^(1/3)` and `ln(n)` cross at around n=93 -- below that, `n^(1/3)` is actually *smaller*. Asymptotic analysis only wins for large n. Do not be fooled into thinking O(log n) is always "small" -- for small inputs, the overhead might dominate.

'removed the rest that unrelated to our course, but anyway enjoy the free rust course'
