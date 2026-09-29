export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  starterCode: string;
  answer: string;
  testCases: TestCase[];
}

export const questions: Problem[] = [
  // ── Iterators & Ranges ─────────────────────────────────────────────────────
  {
    id: 6,
    title: "Print Every Other Element",
    difficulty: "Easy",
    tags: ["Iterators", "advance"],
    description: `Given a list of integers, print every other element starting from the first (indices 0, 2, 4, …), one per line.

Input format: a single line of space-separated integers.

Example
-------
Input:
1 2 3 4 5 6

Output:
1
3
5

Hint
----
Use an iterator starting at v.begin().
std::advance(it, 2) moves an iterator forward by 2 positions, but it does NOT
stop at v.end() — calling it when fewer than 2 elements remain is undefined behavior.
Guard with: if (distance(it, v.end()) >= 2) advance(it, 2); else break;
Check it != v.end() before dereferencing.`,

    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    // Use an iterator and std::advance to step through every 2 elements.

    return 0;
}
`,

    answer: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    auto it = v.begin();

    while (it != v.end()) {
        cout << *it << "\\n";

        if (distance(it, v.end()) >= 2)
            advance(it, 2);
        else
            break;
    }

    return 0;
}
`,

    testCases: [
      { input: "1 2 3 4 5 6", expectedOutput: "1\n3\n5" },
      { input: "10 20 30", expectedOutput: "10\n30" },
      { input: "7", expectedOutput: "7" },
      { input: "1 2", expectedOutput: "1" },
      { input: "4 8 15 16 23 42", expectedOutput: "4\n15\n23" },
    ],
  },

  {
    id: 7,
    title: "Index of First Negative",
    difficulty: "Easy",
    tags: ["Iterators", "distance", "find_if"],
    description: `Given a list of integers, print the index of the first negative number. Print -1 if none exists.

Input format: a single line of space-separated integers.

Example
-------
Input:
3 5 -2 8 -4

Output:
2

Hint
----
std::find_if(first, last, pred) returns an iterator to the first element where pred returns true.
std::distance(v.begin(), it) converts that iterator back to an index.
If find_if reaches the end, it returns v.end().`,

    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    // find_if takes a predicate (lambda or function).

    // TODO: check if the iterator returned is the end, else call std::distance to obtain the index

    return 0;
}
`,

    answer: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    auto it = find_if(v.begin(), v.end(), [](int n) {
        return n < 0;
    });

    if (it == v.end()) {
        cout << -1 << "\\n";
    } else {
        cout << distance(v.begin(), it) << "\\n";
    }

    return 0;
}
`,

    testCases: [
      { input: "3 5 -2 8 -4", expectedOutput: "2" },
      { input: "1 2 3 4 5", expectedOutput: "-1" },
      { input: "-7 0 1", expectedOutput: "0" },
      { input: "0 0 0 -1", expectedOutput: "3" },
      { input: "-1", expectedOutput: "0" },
    ],
  },

  // ── Algorithms ─────────────────────────────────────────────────────────────

  {
    id: 8,
    title: "Sum and Mean",
    difficulty: "Easy",
    tags: ["Algorithms", "accumulate"],
    description: `Given a list of integers, print their sum on the first line and their mean (rounded down to the nearest integer) on the second line.

Input format: a single line of space-separated integers.

Example
-------
Input:
1 2 3 4 5

Output:
15
3

Hint
----
std::accumulate(first, last, init) sums a range starting from init.
Integer division in C++ truncates toward zero, which equals floor for positive numbers.`,

    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    // std::accumulate lives in <numeric> (included via bits/stdc++.h).

    // TODO: print total, then total / v.size() (cast carefully to avoid unsigned issues).

    return 0;
}
`,

    answer: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    int total = accumulate(v.begin(), v.end(), 0);

    cout << total << "\\n";
    cout << total / static_cast<int>(v.size()) << "\\n";

    return 0;
}
`,

    testCases: [
      { input: "1 2 3 4 5", expectedOutput: "15\n3" },
      { input: "10 20 30", expectedOutput: "60\n20" },
      { input: "7", expectedOutput: "7\n7" },
      { input: "1 1 1 1", expectedOutput: "4\n1" },
      { input: "0 0 10", expectedOutput: "10\n3" },
    ],
  },

  {
    id: 9,
    title: "Count and Remove Duplicates",
    difficulty: "Easy",
    tags: ["Algorithms", "sort", "unique", "count"],
    description: `Given a list of integers, print:
1. The number of duplicate values (total elements minus unique elements).
2. The deduplicated list in sorted order, space-separated.

Input format: a single line of space-separated integers.

Example
-------
Input:
4 1 2 1 3 2 4

Output:
3
1 2 3 4

Hint
----
std::sort then std::unique is the classic combo.
std::unique shuffles duplicates to the end and returns an iterator to the new logical end.
Erase from that iterator to v.end() to actually remove them.
The number of duplicates = original size minus size after unique.`,

    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    int original = v.size();

    // Step 1: sort so duplicates are adjacent (required before unique).

    // Step 2: unique returns iterator to new end; erase the tail.

    // TODO: print (original - v.size()), then the deduplicated vector.

    return 0;
}
`,

    answer: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;
    while (cin >> x) v.push_back(x);

    int original = v.size();

    sort(v.begin(), v.end());

    auto newEnd = unique(v.begin(), v.end());
    v.erase(newEnd, v.end());

    cout << original - static_cast<int>(v.size()) << "\\n";

    for (int i = 0; i < v.size(); ++i) {
        if (i > 0)
            cout << " ";

        cout << v[i];
    }

    cout << "\\n";

    return 0;
}
`,

    testCases: [
      { input: "4 1 2 1 3 2 4", expectedOutput: "3\n1 2 3 4" },
      { input: "1 2 3", expectedOutput: "0\n1 2 3" },
      { input: "5 5 5 5", expectedOutput: "3\n5" },
      { input: "3 1 2 1 3", expectedOutput: "2\n1 2 3" },
    ],
  },

  {
    id: 10,
    title: "Find First Element Greater Than or Equal",
    difficulty: "Easy",
    tags: ["Algorithms", "Binary Search"],
    description: `Given a sorted list of integers, find the first element that is greater than or equal to a given target.

If no such element exists, print -1.

Input format:
The first line contains space-separated integers in sorted order.
The second line contains the target integer.

Example
-------
Input:
1 2 3 4 5
3

Output:
3

Example
-------
Input:
1 2 3 4 5
6

Output:
-1

Hint
----
You need to find the first position where the value is greater than or equal to the target.

The STL provides an algorithm that can find this position efficiently in a sorted range.

The algorithm returns an iterator, so check whether the iterator reached v.end() before dereferencing it.`,

    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;

    string line;
    getline(cin, line);

    stringstream ss(line);
    while (ss >> x) {
        v.push_back(x);
    }

    int target;
    cin >> target;

    // TODO:
    // Find the first element that is greater than or equal to target.
    // The STL provides an algorithm that returns an iterator
    // pointing to the desired position.
    //
    // Remember to check whether the iterator == v.end()
    // before dereferencing it.

    return 0;
}
`,

    answer: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    int x;

    string line;
    getline(cin, line);

    stringstream ss(line);
    while (ss >> x) {
        v.push_back(x);
    }

    int target;
    cin >> target;

    auto it = lower_bound(v.begin(), v.end(), target);

    if (it == v.end()) {
        cout << -1 << "\\n";
    } else {
        cout << *it << "\\n";
    }

    return 0;
}
`,

    testCases: [
      {
        input: "1 2 3 4 5\n3",
        expectedOutput: "3",
      },
      {
        input: "1 2 3 4 5\n6",
        expectedOutput: "-1",
      },
      {
        input: "1 3 5 7 9\n4",
        expectedOutput: "5",
      },
      {
        input: "2 2 2 4 5\n2",
        expectedOutput: "2",
      },
      {
        input: "10 20 30 40\n1",
        expectedOutput: "10",
      },
    ],
  },
  {
    id: 11,
    title: "Implement a Dynamic Vector",
    difficulty: "Medium",
    tags: ["C++", "Memory Management", "Placement New", "RAII"],
    description: `Implement a simplified dynamic vector that stores elements in a manually managed
contiguous memory buffer.

Unlike using new T[], you should allocate raw memory using ::operator new()
and construct individual objects using placement new.

Your vector must support:

1. A default constructor.
2. A destructor that destroys all constructed elements and releases the raw memory.
3. size() returning the number of stored elements.
4. capacity() returning the allocated capacity.
5. operator[] for accessing elements.
6. push_back() for appending elements.
7. Automatic resizing when the vector becomes full.

When the vector is full, double its capacity. If the current capacity is
zero, grow it to 1.

Important:
-----
::operator new() only allocates raw memory. It does NOT construct objects.

For example:

T* data = static_cast<T*>(::operator new(sizeof(T) * capacity));

You must then explicitly construct objects using placement new:

new (data + index) T(value);

Similarly, because these objects were manually constructed, you must
explicitly call their destructors before releasing the memory.

You do NOT need to implement copy or move constructors/assignments in this
question.`,

    starterCode: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector() {
        // TODO: initialize an empty vector
    }

    ~vector() {
        // TODO:
        // 1. Destroy every constructed element.
        // 2. Release the raw memory using ::operator delete().
    }

    size_t size() const {
        // TODO
    }

    size_t capacity() const {
        // TODO
    }

    T& operator[](size_t index) {
        // TODO
    }

    void resize(size_t newCapacity) {
        // TODO:
        //
        // 1. Allocate a new raw memory block.
        // 2. Move-construct all existing elements into the new block.
        // 3. Destroy the old elements.
        // 4. Release the old memory.
        // 5. Update data_ and capacity_.
    }

    void push_back(const T& value) {
        // TODO:
        //
        // If the vector is full:
        //   - capacity 0 -> grow to 1
        //   - otherwise -> double the capacity
        //
        // Then construct the new element at data_ + len_.
    }
};

int main() {
    vector<int> v;

    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.push_back(40);
    v.push_back(50);

    cout << "size: " << v.size() << "\\n";
    cout << "capacity: " << v.capacity() << "\\n";

    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i] << " ";
    }

    cout << "\\n";

    return 0;
}
`,

    answer: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector()
        : data_(nullptr), len_(0), capacity_(0) {}

    ~vector() {
        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);
    }

    size_t size() const {
        return len_;
    }

    size_t capacity() const {
        return capacity_;
    }

    T& operator[](size_t index) {
        return data_[index];
    }

    void resize(size_t newCapacity) {
        T* newData =
            static_cast<T*>(::operator new(sizeof(T) * newCapacity));

        size_t constructed = 0;

        try {
            for (; constructed < len_; ++constructed) {
                new (newData + constructed)
                    T(std::move(data_[constructed]));
            }
        } catch (...) {
            for (size_t i = 0; i < constructed; ++i) {
                newData[i].~T();
            }

            ::operator delete(newData);
            throw;
        }

        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);

        data_ = newData;
        capacity_ = newCapacity;
    }

    void push_back(const T& value) {
        if (len_ == capacity_) {
            size_t newCapacity =
                capacity_ == 0 ? 1 : capacity_ * 2;

            resize(newCapacity);
        }

        new (data_ + len_) T(value);
        ++len_;
    }
};

int main() {
    vector<int> v;

    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.push_back(40);
    v.push_back(50);

    cout << "size: " << v.size() << "\\n";
    cout << "capacity: " << v.capacity() << "\\n";

    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i] << " ";
    }

    cout << "\\n";

    return 0;
}
`,

    testCases: [
      {
        input: "",
        expectedOutput: "size: 5\ncapacity: 8\n10 20 30 40 50",
      },
    ],
  },
  {
    id: 12,
    title: "Implement Vector Copy Semantics",
    difficulty: "Medium",
    tags: ["C++", "Copy Constructor", "Copy Assignment", "Rule of 3"],
    description: `Extend a manually managed vector by implementing its copy constructor
and copy assignment operator.

The vector owns dynamically allocated memory, so the default copy operations
would perform a shallow copy of data_.

This is incorrect because two vectors would then point to the same memory.

Implement:

1. Copy constructor
2. Copy assignment operator

Both operations must perform a deep copy.

Copy constructor:
-----------------
Create a new memory buffer and copy-construct every element from the source.

Copy assignment:
----------------
1. Check for self-assignment.
2. Allocate the new buffer first.
3. Copy-construct every element.
4. Destroy the old elements.
5. Release the old buffer.
6. Replace the old buffer with the new one.

Allocating the new buffer before destroying the old one gives the operation
stronger exception safety: if copying an element throws, the original vector
should remain unchanged.

You may assume the vector already supports size(), capacity(), push_back(),
resize(), and destruction.`,

    starterCode: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector() {
        // TODO
    }

    ~vector() {
        // TODO
    }

    void push_back(const T& value) {
        // TODO
    }

    // TODO: Implement the copy constructor.
    vector(const vector& other) {
    }

    // TODO: Implement copy assignment.
    vector& operator=(const vector& other) {
        return *this;
    }

    size_t size() const {
        return len_;
    }

    T& operator[](size_t index) {
        return data_[index];
    }
};

int main() {
    vector<int> original;

    original.push_back(10);
    original.push_back(20);
    original.push_back(30);

    vector<int> copied(original);

    vector<int> assigned;
    assigned.push_back(100);
    assigned = original;

    original[0] = 999;

    cout << "Original: ";
    for (size_t i = 0; i < original.size(); ++i)
        cout << original[i] << " ";

    cout << "\\nCopied: ";
    for (size_t i = 0; i < copied.size(); ++i)
        cout << copied[i] << " ";

    cout << "\\nAssigned: ";
    for (size_t i = 0; i < assigned.size(); ++i)
        cout << assigned[i] << " ";

    cout << "\\n";

    return 0;
}
`,

    answer: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector()
        : data_(nullptr), len_(0), capacity_(0) {}

    ~vector() {
        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);
    }

    void push_back(const T& value) {
        if (len_ == capacity_) {
            size_t newCapacity =
                capacity_ == 0 ? 1 : capacity_ * 2;

            T* newData =
                static_cast<T*>(::operator new(sizeof(T) * newCapacity));

            for (size_t i = 0; i < len_; ++i) {
                new (newData + i) T(std::move(data_[i]));
                data_[i].~T();
            }

            ::operator delete(data_);

            data_ = newData;
            capacity_ = newCapacity;
        }

        new (data_ + len_) T(value);
        ++len_;
    }

    vector(const vector& other)
        : data_(nullptr),
          len_(0),
          capacity_(other.capacity_) {

        data_ = static_cast<T*>(
            ::operator new(sizeof(T) * capacity_));

        try {
            for (; len_ < other.len_; ++len_) {
                new (data_ + len_) T(other.data_[len_]);
            }
        } catch (...) {
            for (size_t i = 0; i < len_; ++i) {
                data_[i].~T();
            }

            ::operator delete(data_);
            throw;
        }
    }

    vector& operator=(const vector& other) {
        if (this == &other) {
            return *this;
        }

        T* newData = static_cast<T*>(
            ::operator new(sizeof(T) * other.capacity_));

        size_t constructed = 0;

        try {
            for (; constructed < other.len_; ++constructed) {
                new (newData + constructed)
                    T(other.data_[constructed]);
            }
        } catch (...) {
            for (size_t i = 0; i < constructed; ++i) {
                newData[i].~T();
            }

            ::operator delete(newData);
            throw;
        }

        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);

        data_ = newData;
        len_ = other.len_;
        capacity_ = other.capacity_;

        return *this;
    }

    size_t size() const {
        return len_;
    }

    T& operator[](size_t index) {
        return data_[index];
    }
};

int main() {
    vector<int> original;

    original.push_back(10);
    original.push_back(20);
    original.push_back(30);

    vector<int> copied(original);

    vector<int> assigned;
    assigned.push_back(100);
    assigned = original;

    original[0] = 999;

    cout << "Original: ";
    for (size_t i = 0; i < original.size(); ++i)
        cout << original[i] << " ";

    cout << "\\nCopied: ";
    for (size_t i = 0; i < copied.size(); ++i)
        cout << copied[i] << " ";

    cout << "\\nAssigned: ";
    for (size_t i = 0; i < assigned.size(); ++i)
        cout << assigned[i] << " ";

    cout << "\\n";

    return 0;
}
`,

    testCases: [
      {
        input: "",
        expectedOutput:
          "Original: 999 20 30 \nCopied: 10 20 30 \nAssigned: 10 20 30",
      },
    ],
  },
  {
    id: 13,
    title: "Implement Vector Move Semantics",
    difficulty: "Medium",
    tags: [
      "C++",
      "Move Semantics",
      "Move Constructor",
      "Move Assignment",
      "Rule of 5",
    ],
    description: `Implement move semantics for a manually managed vector.

A vector owns a dynamically allocated buffer. Copying a large vector requires
allocating a new buffer and copying every element.

Moving allows us to transfer ownership of the existing buffer instead.

Implement:

1. Move constructor
2. Move assignment operator

Move constructor:
-----------------
Transfer data_, len_, and capacity_ from the source vector.

Then reset the source vector to an empty state:

data_ = nullptr
len_ = 0
capacity_ = 0

Move assignment:
----------------
1. Protect against self-move-assignment.
2. Destroy the current elements.
3. Release the current buffer.
4. Take ownership of the source buffer.
5. Reset the source vector.

Both operations should be noexcept.

After a vector has been moved from, it must remain valid and destructible.
Its size should be zero.`,

    starterCode: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector() {
        // TODO
    }

    ~vector() {
        // TODO
    }

    void push_back(const T& value) {
        // TODO
    }

    // TODO: Implement move constructor.
    vector(vector&& other) noexcept {
    }

    // TODO: Implement move assignment.
    vector& operator=(vector&& other) noexcept {
        return *this;
    }

    size_t size() const {
        return len_;
    }

    T& operator[](size_t index) {
        return data_[index];
    }
};

int main() {
    vector<int> original;

    original.push_back(10);
    original.push_back(20);
    original.push_back(30);

    vector<int> moved(std::move(original));

    cout << "Moved vector: ";
    for (size_t i = 0; i < moved.size(); ++i)
        cout << moved[i] << " ";

    cout << "\\nOriginal size after move: "
         << original.size() << "\\n";

    vector<int> assigned;
    assigned.push_back(100);

    assigned = std::move(moved);

    cout << "Move-assigned vector: ";
    for (size_t i = 0; i < assigned.size(); ++i)
        cout << assigned[i] << " ";

    cout << "\\nMoved size after move assignment: "
         << moved.size() << "\\n";

    return 0;
}
`,

    answer: `#include <iostream>
#include <new>
#include <utility>
using namespace std;

template <typename T>
class vector {
    T* data_;
    size_t len_;
    size_t capacity_;

public:
    vector()
        : data_(nullptr), len_(0), capacity_(0) {}

    ~vector() {
        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);
    }

    void push_back(const T& value) {
        if (len_ == capacity_) {
            size_t newCapacity =
                capacity_ == 0 ? 1 : capacity_ * 2;

            T* newData =
                static_cast<T*>(::operator new(sizeof(T) * newCapacity));

            for (size_t i = 0; i < len_; ++i) {
                new (newData + i) T(std::move(data_[i]));
                data_[i].~T();
            }

            ::operator delete(data_);

            data_ = newData;
            capacity_ = newCapacity;
        }

        new (data_ + len_) T(value);
        ++len_;
    }

    vector(vector&& other) noexcept
        : data_(other.data_),
          len_(other.len_),
          capacity_(other.capacity_) {

        other.data_ = nullptr;
        other.len_ = 0;
        other.capacity_ = 0;
    }

    vector& operator=(vector&& other) noexcept {
        if (this == &other) {
            return *this;
        }

        for (size_t i = 0; i < len_; ++i) {
            data_[i].~T();
        }

        ::operator delete(data_);

        data_ = other.data_;
        len_ = other.len_;
        capacity_ = other.capacity_;

        other.data_ = nullptr;
        other.len_ = 0;
        other.capacity_ = 0;

        return *this;
    }

    size_t size() const {
        return len_;
    }

    T& operator[](size_t index) {
        return data_[index];
    }
};

int main() {
    vector<int> original;

    original.push_back(10);
    original.push_back(20);
    original.push_back(30);

    vector<int> moved(std::move(original));

    cout << "Moved vector: ";
    for (size_t i = 0; i < moved.size(); ++i)
        cout << moved[i] << " ";

    cout << "\\nOriginal size after move: "
         << original.size() << "\\n";

    vector<int> assigned;
    assigned.push_back(100);

    assigned = std::move(moved);

    cout << "Move-assigned vector: ";
    for (size_t i = 0; i < assigned.size(); ++i)
        cout << assigned[i] << " ";

    cout << "\\nMoved size after move assignment: "
         << moved.size() << "\\n";

    return 0;
}
`,

    testCases: [
      {
        input: "",
        expectedOutput:
          "Moved vector: 10 20 30 \nOriginal size after move: 0\nMove-assigned vector: 10 20 30 \nMoved size after move assignment: 0",
      },
    ],
  },
];

export function getProblem(id: number): Problem | undefined {
  return questions.find((q) => q.id === id);
}
