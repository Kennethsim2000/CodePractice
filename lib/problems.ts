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
  {
    id: 1,
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Divide & Conquer"],
    description: `Given a sorted array of integers and a target value, print the index of the target, or -1 if it is not present.

Input format: first line is space-separated array values, second line is the target.

Example
-------
Input:
-1 0 3 5 9 12
9

Output:
4`,
    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums;
    int x;
    string line;
    getline(cin, line);
    stringstream ss(line);
    while (ss >> x) nums.push_back(x);

    int target;
    cin >> target;

    // Write your binary search here
    cout << -1 << endl;

    return 0;
}
`,
    testCases: [
      { input: "-1 0 3 5 9 12\n9", expectedOutput: "4" },
      { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1" },
      { input: "1 2 3 4 5\n1", expectedOutput: "0" },
    ],
  },
  {
    id: 2,
    title: "Sliding Window Minimum",
    difficulty: "Medium",
    tags: ["Deque", "Two Pointers"],
    description: `Given an array and a window size k, print the minimum value in each sliding window as it moves left to right.

Input format: first line is the array, second line is k.

Example
-------
Input:
4 2 12 1 5
3

Output:
2 1 1`,
    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums;
    string line;
    getline(cin, line);
    stringstream ss(line);
    int x;
    while (ss >> x) nums.push_back(x);

    int k;
    cin >> k;

    // Write your sliding window solution here

    return 0;
}
`,
    testCases: [
      { input: "4 2 12 1 5\n3", expectedOutput: "2 1 1" },
      { input: "1 2 3 4 5\n2", expectedOutput: "1 2 3 4" },
    ],
  },
  {
    id: 3,
    title: "Implement Trie",
    difficulty: "Medium",
    tags: ["Tree", "Design"],
    description: `Implement a Trie supporting insert, search, and startsWith.

Input format: first line is N (number of operations), then N lines each like:
INSERT word
SEARCH word
PREFIX word

Print "true" or "false" for each SEARCH/PREFIX op, one per line.

Example
-------
Input:
4
INSERT apple
SEARCH apple
SEARCH app
PREFIX app

Output:
true
false
true`,
    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string op, word;
        cin >> op >> word;
        // Handle INSERT / SEARCH / PREFIX
    }
    return 0;
}
`,
    testCases: [
      {
        input: "4\nINSERT apple\nSEARCH apple\nSEARCH app\nPREFIX app",
        expectedOutput: "true\nfalse\ntrue",
      },
    ],
  },
  {
    id: 4,
    title: "LRU Cache",
    difficulty: "Hard",
    tags: ["Hash Map", "Linked List"],
    description: `Implement an LRU cache with a given capacity.

Input format: first line is capacity, second line is N (number of ops), then N lines each like:
GET key
PUT key value

Print the result of each GET (or -1 if missing), one per line.

Example
-------
Input:
2
4
PUT 1 1
PUT 2 2
GET 1
PUT 3 3

Output:
1`,
    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int capacity, n;
    cin >> capacity >> n;
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        if (op == "GET") {
            int key; cin >> key;
            // handle get
        } else {
            int key, val; cin >> key >> val;
            // handle put
        }
    }
    return 0;
}
`,
    testCases: [
      {
        input: "2\n4\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3",
        expectedOutput: "1",
      },
    ],
  },
  {
    id: 5,
    title: "Buffer Pool Manager",
    difficulty: "Hard",
    tags: ["Systems", "Concurrency"],
    description: `Implement a simplified buffer pool with LRU eviction.

Input format: first line is pool size, second line is N (ops), then N lines like:
FETCH page_id
UNPIN page_id

Print the result of each FETCH (the page_id itself, since fetch always succeeds in this simplified model), one per line.

Example
-------
Input:
2
3
FETCH 1
FETCH 2
FETCH 1

Output:
1
2
1`,
    starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int poolSize, n;
    cin >> poolSize >> n;
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        int page;
        cin >> page;
        if (op == "FETCH") {
            // handle fetch, print page id
            cout << page << "\\n";
        } else {
            // handle unpin
        }
    }
    return 0;
}
`,
    testCases: [
      {
        input: "2\n3\nFETCH 1\nFETCH 2\nFETCH 1",
        expectedOutput: "1\n2\n1",
      },
    ],
  },
];

export function getProblem(id: number): Problem | undefined {
  return questions.find((q) => q.id === id);
}
