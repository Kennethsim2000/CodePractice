export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  starterCode: string;
}

export const questions: Problem[] = [
  {
    id: 1,
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Divide & Conquer"],
    description: `Given a sorted array of integers \`nums\` and a target value \`target\`, write a function that returns the index of \`target\` in \`nums\`, or \`-1\` if it is not present.

Your algorithm must run in O(log n) time.

Example
-------
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4

Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1`,
    starterCode: `#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}
`,
  },
  {
    id: 2,
    title: "Sliding Window Minimum",
    difficulty: "Medium",
    tags: ["Deque", "Two Pointers"],
    description: `Given an array \`nums\` and a window size \`k\`, return an array of the minimum value in each sliding window as it moves from left to right across \`nums\`.

Example
-------
Input: nums = [4,2,12,1,5], k = 3
Output: [2,1,1]`,
    starterCode: `#include <vector>
using namespace std;

vector<int> slidingWindowMin(vector<int>& nums, int k) {
    // Write your solution here
    return {};
}
`,
  },
  {
    id: 3,
    title: "Implement Trie",
    difficulty: "Medium",
    tags: ["Tree", "Design"],
    description: `Implement a Trie (prefix tree) with the following operations:

- \`insert(word)\` — inserts a word into the trie
- \`search(word)\` — returns true if the word is in the trie
- \`startsWith(prefix)\` — returns true if any word in the trie starts with the given prefix`,
    starterCode: `#include <string>
using namespace std;

class Trie {
public:
    Trie() {
        
    }

    void insert(string word) {
        
    }

    bool search(string word) {
        return false;
    }

    bool startsWith(string prefix) {
        return false;
    }
};
`,
  },
  {
    id: 4,
    title: "LRU Cache",
    difficulty: "Hard",
    tags: ["Hash Map", "Linked List"],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` initializes the cache with positive size \`capacity\`
- \`int get(int key)\` returns the value of the key if it exists, otherwise -1
- \`void put(int key, int value)\` updates or inserts the value. If the number of keys exceeds capacity, evict the least recently used key.

Both \`get\` and \`put\` must run in O(1) average time.`,
    starterCode: `class LRUCache {
public:
    LRUCache(int capacity) {
        
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        
    }
};
`,
  },
  {
    id: 5,
    title: "Buffer Pool Manager",
    difficulty: "Hard",
    tags: ["Systems", "Concurrency"],
    description: `Implement a simplified Buffer Pool Manager used in database systems.

The pool holds a fixed number of pages in memory. When a page is requested that isn't in the pool, it must evict a page (using an LRU-style replacement policy) and load the new page in its place. Pages that are "pinned" cannot be evicted.

Implement:
- \`fetchPage(page_id)\` — returns the page, loading it if necessary
- \`unpinPage(page_id)\` — marks a page as eligible for eviction
- \`flushPage(page_id)\` — writes a page back to disk (simulated)`,
    starterCode: `#include <unordered_map>
using namespace std;

class BufferPoolManager {
public:
    BufferPoolManager(int poolSize) {
        
    }

    int fetchPage(int page_id) {
        return -1;
    }

    void unpinPage(int page_id) {
        
    }

    void flushPage(int page_id) {
        
    }
};
`,
  },
];

export function getProblem(id: number): Problem | undefined {
  return questions.find((q) => q.id === id);
}
