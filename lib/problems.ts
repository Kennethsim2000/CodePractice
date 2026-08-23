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
    // auto it = v.begin();
    // while (it != v.end()) {
    //     cout << *it << "\\n";
    //     // advance(it, 2) walks past v.end() if only 1 element remains — UB!
    //     // Guard with a distance check first:
    //     if (distance(it, v.end()) >= 2)
    //         advance(it, 2);
    //     else
    //         break;
    // }

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
    description: `Given a list of integers, print the 0-based index of the first negative number. Print -1 if none exists.

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
    // auto it = find_if(v.begin(), v.end(), [](int n) { return n < 0; });

    // TODO: if it == v.end(), print -1.
    // Otherwise print std::distance(v.begin(), it).

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
    // int total = accumulate(v.begin(), v.end(), 0);

    // TODO: print total, then total / v.size() (cast carefully to avoid unsigned issues).

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
    // sort(v.begin(), v.end());

    // Step 2: unique returns iterator to new end; erase the tail.
    // auto newEnd = unique(v.begin(), v.end());
    // v.erase(newEnd, v.end());

    // TODO: print (original - v.size()), then the deduplicated vector.

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
];

export function getProblem(id: number): Problem | undefined {
  return questions.find((q) => q.id === id);
}
