package com.rankquest.util;

import com.rankquest.model.Pattern;
import com.rankquest.model.Problem;
import com.rankquest.model.Role;
import com.rankquest.model.Sheet;
import com.rankquest.model.User;
import com.rankquest.repository.PatternRepository;
import com.rankquest.repository.ProblemRepository;
import com.rankquest.repository.SheetRepository;
import com.rankquest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with real problem sheets, beginner-to-advanced patterns,
 * 150+ pattern questions with LeetCode/GFG links, and default user accounts.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final SheetRepository sheetRepository;
    private final PatternRepository patternRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(SheetRepository sheetRepository, PatternRepository patternRepository,
                           ProblemRepository problemRepository, UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.sheetRepository = sheetRepository;
        this.patternRepository = patternRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedSheets();
        seedPatterns();
        seedProblems();
        seedDefaultAdmin();
        seedDemoUser();
    }

    // ── Sheet Seeding ─────────────────────────────────────────────────────────

    private void seedSheets() {
        if (sheetRepository.count() >= 6) return;
        sheetRepository.deleteAll();

        sheetRepository.saveAll(List.of(
            new Sheet("striver-sde", "Striver SDE Sheet", "Raj Vikramaditya",
                "Top 190 problems to crack SDE interviews. Carefully curated from FAANG interviews.", 190,
                "Mixed", "Interview Prep", 4.9, "2-3 months", "striver", "blue-600", "indigo-600"),
            new Sheet("love-babbar-450", "Love Babbar 450", "Love Babbar",
                "Comprehensive 450 DSA problems for product-based companies. Most popular sheet for placements.", 450,
                "Mixed", "Complete DSA", 4.8, "4-6 months", "babbar", "purple-600", "pink-600"),
            new Sheet("neetcode-150", "NeetCode 150", "NeetCode",
                "Top 150 LeetCode problems grouped by patterns. Best for systematic interview preparation.", 150,
                "Mixed", "Pattern Based", 4.9, "1-2 months", "neetcode", "emerald-600", "teal-600"),
            new Sheet("blind-75", "Blind 75", "Blind",
                "The classic 75 LeetCode problems that cover all core patterns. Essential for quick revision.", 75,
                "Mixed", "Quick Revision", 4.9, "3-4 weeks", "blind", "red-600", "orange-600"),
            new Sheet("gfg-must-do", "GFG Must Do DSA", "GeeksforGeeks",
                "Topic-wise must-do coding questions for product based company interviews.", 200,
                "Mixed", "Topic Wise", 4.7, "2-3 months", "gfg", "orange-600", "yellow-600"),
            new Sheet("apna-college", "Apna College DSA Sheet", "Shradha Khapra",
                "Beginner-friendly 375 DSA problem sheet covering all basic to advanced concepts.", 375,
                "Mixed", "Beginner Friendly", 4.8, "3-4 months", "apna", "cyan-600", "blue-600")
        ));
        System.out.println("✅ Seeded 6 problem sheets.");
    }

    // ── Pattern Roadmap Seeding (Beginner to Advanced Sequence) ───────────────

    private void seedPatterns() {
        if (patternRepository.count() >= 15) return;
        patternRepository.deleteAll();

        patternRepository.saveAll(List.of(
            new Pattern("two-pointers", 1, "Two Pointers", "Beginner Foundations", "Easy",
                "Use two pointers traversing from ends or moving at different speeds to search pairs or process arrays in O(N) time.",
                "1. Sort array if needed\n2. Set left=0, right=n-1\n3. Adjust pointers based on comparison with target sum",
                10, "Target", "blue-500", "cyan-500"),

            new Pattern("sliding-window", 2, "Sliding Window", "Beginner Foundations", "Easy-Medium",
                "Maintain a contiguous window of elements over an array or string to find subarrays satisfying specific conditions.",
                "1. Expand window with right pointer\n2. Shrink window with left pointer when condition is violated\n3. Track max/min length",
                10, "Zap", "emerald-500", "teal-500"),

            new Pattern("fast-slow-pointers", 3, "Fast & Slow Pointers", "Beginner Foundations", "Easy",
                "Use two pointers moving at different speeds (slow=1 step, fast=2 steps) to detect cycles or find midpoints in linked lists.",
                "1. Initialize slow = head, fast = head\n2. Loop while fast != null && fast.next != null\n3. Move slow by 1, fast by 2. If slow == fast, cycle exists!",
                10, "Activity", "indigo-500", "purple-500"),

            new Pattern("merge-intervals", 4, "Merge Intervals", "Intermediate Techniques", "Medium",
                "Sort intervals by start time and merge or check for overlaps between consecutive intervals.",
                "1. Sort intervals by start time\n2. Compare current.start with prev.end\n3. If overlapping, merge by max(prev.end, current.end)",
                10, "Layers", "orange-500", "amber-500"),

            new Pattern("cyclic-sort", 5, "Cyclic Sort", "Intermediate Techniques", "Medium",
                "Iterate through an array containing numbers from 1 to N and place each number at its correct index (i.e., val - 1).",
                "1. While i < n: check if arr[i] != arr[arr[i]-1]\n2. Swap arr[i] with arr[arr[i]-1]\n3. Else increment i",
                10, "RotateCcw", "pink-500", "rose-500"),

            new Pattern("linked-list-reversal", 6, "In-place LinkedList Reversal", "Intermediate Techniques", "Medium",
                "Reverse links between linked list nodes without allocating additional memory using prev, curr, and next pointers.",
                "1. prev = null, curr = head\n2. While curr != null: next = curr.next; curr.next = prev; prev = curr; curr = next\n3. Return prev",
                10, "GitCompare", "violet-500", "purple-600"),

            new Pattern("tree-bfs", 7, "Tree Breadth-First Search", "Intermediate Techniques", "Medium",
                "Traverse a tree level-by-level using a Queue data structure.",
                "1. Push root to Queue\n2. While queue is not empty: levelSize = queue.size()\n3. Poll levelSize nodes and add children to queue",
                10, "Share2", "cyan-500", "blue-600"),

            new Pattern("tree-dfs", 8, "Tree Depth-First Search", "Intermediate Techniques", "Medium",
                "Traverse deeply down tree branches before backtracking using Preorder, Inorder, or Postorder recursion.",
                "1. Base case: root == null return\n2. Process current node / recurse left / recurse right\n3. Pass accumulated state down or return computed values up",
                10, "GitFork", "green-500", "emerald-600"),

            new Pattern("two-heaps", 9, "Two Heaps Pattern", "Advanced Algorithmic Mastery", "Hard",
                "Maintain a Max-Heap for the smaller half and a Min-Heap for the larger half to continuously compute running medians.",
                "1. Max-Heap (left) stores smaller half\n2. Min-Heap (right) stores larger half\n3. Keep heaps balanced: size difference <= 1",
                10, "Scale", "yellow-500", "amber-600"),

            new Pattern("subsets-backtracking", 10, "Subsets & Backtracking", "Advanced Algorithmic Mastery", "Medium-Hard",
                "Build combinatorial decisions step-by-step and undo decisions (backtrack) to explore all permutations and combinations.",
                "1. void backtrack(list, temp, nums, start)\n2. Add temp to result\n3. Loop i from start to n: temp.add(nums[i]); recurse(i+1); temp.removeLast()",
                10, "Box", "fuchsia-500", "pink-600"),

            new Pattern("modified-binary-search", 11, "Modified Binary Search", "Intermediate Techniques", "Medium",
                "Apply binary search on rotated, peak, or implicit search spaces by identifying which half is sorted.",
                "1. low = 0, high = n-1\n2. mid = low + (high - low)/2\n3. Check if left half is sorted: if nums[low] <= nums[mid]...",
                10, "Search", "sky-500", "indigo-500"),

            new Pattern("top-k-elements", 12, "Top K Elements (Heap)", "Advanced Algorithmic Mastery", "Medium-Hard",
                "Use a Min-Heap of size K to find the largest K elements in O(N log K) time.",
                "1. Keep Min-Heap of size K\n2. For each element: push to heap\n3. If heap.size() > K: heap.poll()\n4. Remaining K elements in heap are top K largest",
                10, "Award", "amber-500", "orange-600"),

            new Pattern("k-way-merge", 13, "K-way Merge", "Advanced Algorithmic Mastery", "Hard",
                "Merge K sorted arrays or lists efficiently using a Min-Heap containing one head element from each array.",
                "1. Push head element of all K sorted lists to Min-Heap\n2. Poll min element, add to result\n3. If polled element has next node, push next node to Min-Heap",
                10, "GitMerge", "rose-500", "red-600"),

            new Pattern("01-knapsack", 14, "0/1 Knapsack (DP)", "Advanced Algorithmic Mastery", "Medium-Hard",
                "Solve subset selection and optimization problems by deciding to include or exclude items with memoization/tabulation.",
                "1. dp[i][w] = max profit with first i items and weight w\n2. Include: val[i] + dp[i-1][w - wt[i]]\n3. Exclude: dp[i-1][w]",
                10, "Briefcase", "purple-500", "indigo-600"),

            new Pattern("topological-sort", 15, "Topological Sort (Graph)", "Advanced Algorithmic Mastery", "Hard",
                "Order vertices in a Directed Acyclic Graph (DAG) using Kahn's Algorithm (in-degree BFS) or DFS post-order.",
                "1. Calculate in-degree for all vertices\n2. Add all vertices with in-degree 0 to Queue\n3. Poll vertex, reduce in-degree of neighbors. If neighbor in-degree == 0, push to Queue",
                10, "Network", "red-500", "rose-700")
        ));
        System.out.println("✅ Seeded 15 sequential DSA patterns.");
    }

    // ── Problem Seeding ───────────────────────────────────────────────────────

    private void seedProblems() {
        if (problemRepository.count() >= 150) return;
        problemRepository.deleteAll();

        // ── 1. Two Pointers Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Valid Palindrome", "Determine if a string is a palindrome considering only alphanumeric characters.", "Easy", "44.3%", "Two Pointers", "neetcode-150", "two-pointers", "https://leetcode.com/problems/valid-palindrome/", "https://practice.geeksforgeeks.org/problems/string-palindrome2108/1", "Facebook,Microsoft,Uber", "Two Pointers,String"),
            new Problem("Two Sum II - Input Array Is Sorted", "Find two numbers in a sorted array that add up to a target sum.", "Medium", "60.1%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", "https://practice.geeksforgeeks.org/problems/pair-with-given-sum-in-a-sorted-array4940/1", "Amazon,Google,Apple", "Array,Two Pointers,Binary Search"),
            new Problem("3Sum", "Find all unique triplets in the array which gives the sum of zero.", "Medium", "32.5%", "Two Pointers", "neetcode-150", "two-pointers", "https://leetcode.com/problems/3sum/", "https://practice.geeksforgeeks.org/problems/find-triplets-with-zero-sum/1", "Amazon,Meta,Microsoft", "Array,Two Pointers,Sorting"),
            new Problem("Container With Most Water", "Find two lines that together with the x-axis form a container containing the most water.", "Medium", "54.1%", "Two Pointers", "blind-75", "two-pointers", "https://leetcode.com/problems/container-with-most-water/", "https://practice.geeksforgeeks.org/problems/container-with-most-water-1587115620/1", "Amazon,Google,Meta", "Array,Two Pointers,Greedy"),
            new Problem("Remove Duplicates from Sorted Array", "Remove duplicates in-place such that each unique element appears only once.", "Easy", "51.4%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", "https://practice.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1", "Microsoft,Amazon,Google", "Array,Two Pointers"),
            new Problem("Move Zeroes", "Move all 0's to the end of array while maintaining relative order of non-zero elements.", "Easy", "61.3%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/move-zeroes/", "https://practice.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0702/1", "Meta,Apple,Amazon", "Array,Two Pointers"),
            new Problem("Sort Colors (Dutch National Flag)", "Sort array with 0s, 1s, and 2s in-place in linear time.", "Medium", "60.3%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/sort-colors/", "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1", "Microsoft,Amazon,Meta", "Array,Two Pointers,Sorting"),
            new Problem("Trapping Rain Water", "Compute how much water can be trapped after raining on elevation map.", "Hard", "58.7%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/trapping-rain-water/", "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1", "Amazon,Google,Meta", "Array,Two Pointers,Stack"),
            new Problem("4Sum", "Return all unique quadruplets that sum up to target.", "Medium", "36.2%", "Two Pointers", "striver-sde", "two-pointers", "https://leetcode.com/problems/4sum/", "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1", "Amazon,Meta,Google", "Array,Two Pointers,Sorting"),
            new Problem("Boats to Save People", "Return minimum number of boats to carry every given person under weight limit.", "Medium", "55.8%", "Two Pointers", "neetcode-150", "two-pointers", "https://leetcode.com/problems/boats-to-save-people/", "https://practice.geeksforgeeks.org/problems/boats-to-save-people/1", "Google,Uber", "Array,Two Pointers,Greedy")
        ));

        // ── 2. Sliding Window Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Maximum Average Subarray I", "Find a contiguous subarray of length k that has the maximum average value.", "Easy", "43.7%", "Sliding Window", "neetcode-150", "sliding-window", "https://leetcode.com/problems/maximum-average-subarray-i/", "https://practice.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1", "Google,Amazon", "Array,Sliding Window"),
            new Problem("Longest Substring Without Repeating Characters", "Find the length of the longest substring without repeating characters.", "Medium", "34.1%", "Sliding Window", "blind-75", "sliding-window", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1", "Amazon,Google,Microsoft", "Hash Table,String,Sliding Window"),
            new Problem("Minimum Size Subarray Sum", "Return minimal length of subarray whose sum is greater than or equal to target.", "Medium", "46.1%", "Sliding Window", "neetcode-150", "sliding-window", "https://leetcode.com/problems/minimum-size-subarray-sum/", "https://practice.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5633/1", "Meta,Amazon,Google", "Array,Binary Search,Sliding Window"),
            new Problem("Max Consecutive Ones III", "Given binary array, find max consecutive 1s if you can flip at most k 0s.", "Medium", "63.2%", "Sliding Window", "striver-sde", "sliding-window", "https://leetcode.com/problems/max-consecutive-ones-iii/", "https://practice.geeksforgeeks.org/problems/maximize-number-of-1s2152/1", "Meta,Google,Amazon", "Array,Sliding Window"),
            new Problem("Longest Repeating Character Replacement", "Find length of longest substring containing same letter after k replacements.", "Medium", "52.8%", "Sliding Window", "blind-75", "sliding-window", "https://leetcode.com/problems/longest-repeating-character-replacement/", "https://practice.geeksforgeeks.org/problems/longest-repeating-character-replacement/1", "Amazon,Google", "Hash Table,String,Sliding Window"),
            new Problem("Permutation in String", "Return true if s2 contains a permutation of s1.", "Medium", "44.6%", "Sliding Window", "neetcode-150", "sliding-window", "https://leetcode.com/problems/permutation-in-string/", "https://practice.geeksforgeeks.org/problems/permutation-in-string/1", "Microsoft,Amazon", "Hash Table,Two Pointers,Sliding Window"),
            new Problem("Find All Anagrams in a String", "Find all start indices of p's anagrams in s.", "Medium", "50.1%", "Sliding Window", "striver-sde", "sliding-window", "https://leetcode.com/problems/find-all-anagrams-in-a-string/", "https://practice.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1", "Amazon,Meta", "Hash Table,String,Sliding Window"),
            new Problem("Sliding Window Maximum", "Return max sliding window for array of size k.", "Hard", "46.5%", "Sliding Window", "striver-sde", "sliding-window", "https://leetcode.com/problems/sliding-window-maximum/", "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1", "Amazon,Google,Meta", "Array,Queue,Sliding Window,Monotonic Queue"),
            new Problem("Minimum Window Substring", "Find minimum window in s containing all characters of t.", "Hard", "41.2%", "Sliding Window", "blind-75", "sliding-window", "https://leetcode.com/problems/minimum-window-substring/", "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1", "Meta,Amazon,Google", "Hash Table,String,Sliding Window"),
            new Problem("Subarrays with K Different Integers", "Return number of good subarrays with exactly K different integers.", "Hard", "56.8%", "Sliding Window", "neetcode-150", "sliding-window", "https://leetcode.com/problems/subarrays-with-k-different-integers/", "https://practice.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1", "Amazon,Google", "Array,Hash Table,Sliding Window")
        ));

        // ── 3. Fast & Slow Pointers (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Linked List Cycle", "Determine if linked list contains cycle.", "Easy", "49.2%", "Fast & Slow Pointers", "blind-75", "fast-slow-pointers", "https://leetcode.com/problems/linked-list-cycle/", "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1", "Amazon,Microsoft,Apple", "Linked List,Two Pointers"),
            new Problem("Middle of the Linked List", "Return middle node of linked list.", "Easy", "74.2%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/middle-of-the-linked-list/", "https://practice.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1", "Amazon,Apple", "Linked List,Two Pointers"),
            new Problem("Linked List Cycle II", "Return node where cycle begins.", "Medium", "50.1%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/linked-list-cycle-ii/", "https://practice.geeksforgeeks.org/problems/find-first-node-of-loop-in-a-linked-list/1", "Amazon,Microsoft", "Linked List,Two Pointers"),
            new Problem("Happy Number", "Determine if a number n is happy by summing square of digits.", "Easy", "55.4%", "Fast & Slow Pointers", "neetcode-150", "fast-slow-pointers", "https://leetcode.com/problems/happy-number/", "https://practice.geeksforgeeks.org/problems/happy-number/1", "Google,Amazon", "Hash Table,Math,Two Pointers"),
            new Problem("Palindrome Linked List", "Check if singly linked list is palindrome.", "Easy", "51.2%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/palindrome-linked-list/", "https://practice.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1", "Amazon,Microsoft", "Linked List,Two Pointers,Recursion"),
            new Problem("Reorder List", "Reorder list L0→L1→...→Ln to L0→Ln→L1→Ln-1...", "Medium", "54.8%", "Fast & Slow Pointers", "blind-75", "fast-slow-pointers", "https://leetcode.com/problems/reorder-list/", "https://practice.geeksforgeeks.org/problems/reorder-list/1", "Amazon,Meta", "Linked List,Two Pointers"),
            new Problem("Find the Duplicate Number", "Find single duplicate number in array of n+1 integers.", "Medium", "59.0%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/find-the-duplicate-number/", "https://practice.geeksforgeeks.org/problems/find-duplicates-in-an-array/1", "Amazon,Google,Microsoft", "Array,Two Pointers,Binary Search"),
            new Problem("Circular Array Loop", "Determine if array contains loop moving forward or backward.", "Medium", "33.6%", "Fast & Slow Pointers", "neetcode-150", "fast-slow-pointers", "https://leetcode.com/problems/circular-array-loop/", "https://practice.geeksforgeeks.org/problems/circular-array-loop/1", "Google", "Array,Hash Table,Two Pointers"),
            new Problem("Remove Nth Node From End of List", "Remove nth node from end of linked list.", "Medium", "42.5%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", "https://practice.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1", "Amazon,Microsoft,Apple", "Linked List,Two Pointers"),
            new Problem("Intersection of Two Linked Lists", "Find node where two linked lists intersect.", "Easy", "55.1%", "Fast & Slow Pointers", "striver-sde", "fast-slow-pointers", "https://leetcode.com/problems/intersection-of-two-linked-lists/", "https://practice.geeksforgeeks.org/problems/intersection-point-in-y-shaped-linked-lists/1", "Amazon,Microsoft", "Linked List,Two Pointers")
        ));

        // ── 4. Merge Intervals Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Merge Intervals", "Merge all overlapping intervals.", "Medium", "46.5%", "Merge Intervals", "blind-75", "merge-intervals", "https://leetcode.com/problems/merge-intervals/", "https://practice.geeksforgeeks.org/problems/overlapping-intervals--170643/1", "Amazon,Google,Meta", "Array,Sorting"),
            new Problem("Insert Interval", "Insert new interval into sorted non-overlapping list and merge if needed.", "Medium", "39.8%", "Merge Intervals", "blind-75", "merge-intervals", "https://leetcode.com/problems/insert-interval/", "https://practice.geeksforgeeks.org/problems/insert-interval/1", "Google,Amazon,Meta", "Array"),
            new Problem("Non-overlapping Intervals", "Find min number of intervals to remove to make remaining non-overlapping.", "Medium", "52.1%", "Merge Intervals", "blind-75", "merge-intervals", "https://leetcode.com/problems/non-overlapping-intervals/", "https://practice.geeksforgeeks.org/problems/non-overlapping-intervals/1", "Amazon,Meta", "Array,Greedy,Sorting"),
            new Problem("Meeting Rooms", "Determine if a person can attend all meetings.", "Easy", "57.2%", "Merge Intervals", "neetcode-150", "merge-intervals", "https://leetcode.com/problems/meeting-rooms/", "https://practice.geeksforgeeks.org/problems/meeting-rooms/1", "Amazon,Meta,Google", "Array,Sorting"),
            new Problem("Meeting Rooms II", "Find minimum conference rooms required.", "Medium", "50.9%", "Merge Intervals", "neetcode-150", "merge-intervals", "https://leetcode.com/problems/meeting-rooms-ii/", "https://practice.geeksforgeeks.org/problems/attend-all-meetings/1", "Amazon,Google,Meta", "Array,Heap,Sorting"),
            new Problem("Interval List Intersections", "Find intersection of two lists of closed intervals.", "Medium", "71.4%", "Merge Intervals", "striver-sde", "merge-intervals", "https://leetcode.com/problems/interval-list-intersections/", "https://practice.geeksforgeeks.org/problems/interval-list-intersections/1", "Meta,Uber", "Array,Two Pointers"),
            new Problem("Minimum Number of Arrows to Burst Balloons", "Find min arrows needed to burst all balloons.", "Medium", "57.8%", "Merge Intervals", "neetcode-150", "merge-intervals", "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", "https://practice.geeksforgeeks.org/problems/minimum-number-of-arrows-to-burst-balloons/1", "Google,Amazon", "Array,Greedy,Sorting"),
            new Problem("Summary Ranges", "Return smallest sorted list of ranges covering all numbers.", "Easy", "49.1%", "Merge Intervals", "striver-sde", "merge-intervals", "https://leetcode.com/problems/summary-ranges/", "https://practice.geeksforgeeks.org/problems/summary-ranges/1", "Google", "Array"),
            new Problem("Employee Free Time", "Find common free time for all employees.", "Hard", "72.3%", "Merge Intervals", "neetcode-150", "merge-intervals", "https://leetcode.com/problems/employee-free-time/", "https://practice.geeksforgeeks.org/problems/employee-free-time/1", "Google,Amazon", "Array,Heap,Sorting"),
            new Problem("Car Pooling", "Return true if it is possible to pick up and drop off all passengers.", "Medium", "56.4%", "Merge Intervals", "striver-sde", "merge-intervals", "https://leetcode.com/problems/car-pooling/", "https://practice.geeksforgeeks.org/problems/car-pooling/1", "Amazon,Uber", "Array,Sorting,Heap")
        ));

        // ── 5. Cyclic Sort Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Missing Number", "Find missing number in array containing n distinct numbers in range [0, n].", "Easy", "63.7%", "Cyclic Sort", "blind-75", "cyclic-sort", "https://leetcode.com/problems/missing-number/", "https://practice.geeksforgeeks.org/problems/missing-number-in-array1416/1", "Amazon,Microsoft", "Array,Math,Bit Manipulation"),
            new Problem("Find All Numbers Disappeared in an Array", "Find all elements in [1, n] that do not appear in array.", "Easy", "60.2%", "Cyclic Sort", "neetcode-150", "cyclic-sort", "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/", "https://practice.geeksforgeeks.org/problems/find-all-numbers-disappeared-in-an-array/1", "Google,Amazon", "Array,Hash Table"),
            new Problem("Find the Duplicate Number", "Find duplicate number in array of n+1 integers.", "Medium", "59.0%", "Cyclic Sort", "striver-sde", "cyclic-sort", "https://leetcode.com/problems/find-the-duplicate-number/", "https://practice.geeksforgeeks.org/problems/find-duplicates-in-an-array/1", "Amazon,Google", "Array,Two Pointers"),
            new Problem("Find All Duplicates in an Array", "Find all elements that appear twice in integer array.", "Medium", "74.1%", "Cyclic Sort", "striver-sde", "cyclic-sort", "https://leetcode.com/problems/find-all-duplicates-in-an-array/", "https://practice.geeksforgeeks.org/problems/find-all-duplicates-in-an-array/1", "Amazon,Google", "Array,Hash Table"),
            new Problem("Set Mismatch", "Find number that occurs twice and number that is missing.", "Easy", "44.2%", "Cyclic Sort", "apna-college", "cyclic-sort", "https://leetcode.com/problems/set-mismatch/", "https://practice.geeksforgeeks.org/problems/set-mismatch/1", "Amazon", "Array,Hash Table"),
            new Problem("First Missing Positive", "Find smallest missing positive integer in O(n) time and O(1) space.", "Hard", "37.5%", "Cyclic Sort", "striver-sde", "cyclic-sort", "https://leetcode.com/problems/first-missing-positive/", "https://practice.geeksforgeeks.org/problems/smallest-positive-missing-number-1587115621/1", "Amazon,Google,Meta", "Array,Hash Table"),
            new Problem("Find the Corrupt Pair", "Find duplicated and missing numbers in array of size N.", "Easy", "62.4%", "Cyclic Sort", "apna-college", "cyclic-sort", "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1", "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1", "Amazon,Microsoft", "Array,Math"),
            new Problem("Find Smallest Missing Positive", "Return smallest missing positive integer.", "Hard", "37.5%", "Cyclic Sort", "gfg-must-do", "cyclic-sort", "https://leetcode.com/problems/first-missing-positive/", "https://practice.geeksforgeeks.org/problems/smallest-positive-missing-number-1587115621/1", "Google,Microsoft", "Array"),
            new Problem("Couples Holding Hands", "Find min swaps to seat every couple next to each other.", "Hard", "56.9%", "Cyclic Sort", "neetcode-150", "cyclic-sort", "https://leetcode.com/problems/couples-holding-hands/", "https://practice.geeksforgeeks.org/problems/couples-holding-hands/1", "Google", "Array,Greedy,Graph"),
            new Problem("Kth Missing Positive Number", "Find kth positive integer missing from sorted array.", "Easy", "59.8%", "Cyclic Sort", "striver-sde", "cyclic-sort", "https://leetcode.com/problems/kth-missing-positive-number/", "https://practice.geeksforgeeks.org/problems/kth-missing-positive-number/1", "Facebook,Amazon", "Array,Binary Search")
        ));

        // ── 6. In-place Reversal of LinkedList (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Reverse Linked List", "Reverse a singly linked list in-place.", "Easy", "73.4%", "LinkedList Reversal", "blind-75", "linked-list-reversal", "https://leetcode.com/problems/reverse-linked-list/", "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1", "Amazon,Apple,Google", "Linked List,Recursion"),
            new Problem("Reverse Linked List II", "Reverse position left to right in-place.", "Medium", "46.1%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/reverse-linked-list-ii/", "https://practice.geeksforgeeks.org/problems/reverse-a-sublist-of-a-linked-list/1", "Amazon,Microsoft", "Linked List"),
            new Problem("Reverse Nodes in k-Group", "Reverse nodes of linked list k at a time.", "Hard", "57.3%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/reverse-nodes-in-k-group/", "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1", "Amazon,Microsoft,Google", "Linked List,Recursion"),
            new Problem("Swap Nodes in Pairs", "Swap every two adjacent nodes.", "Medium", "63.2%", "LinkedList Reversal", "neetcode-150", "linked-list-reversal", "https://leetcode.com/problems/swap-nodes-in-pairs/", "https://practice.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1", "Amazon,Microsoft", "Linked List,Recursion"),
            new Problem("Rotate List", "Rotate linked list to right by k places.", "Medium", "36.8%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/rotate-list/", "https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1", "Amazon,Microsoft", "Linked List,Two Pointers"),
            new Problem("Reverse Alternate K Nodes", "Reverse alternate k nodes in a linked list.", "Medium", "58.4%", "LinkedList Reversal", "gfg-must-do", "linked-list-reversal", "https://practice.geeksforgeeks.org/problems/reverse-alternate-k-nodes/1", "https://practice.geeksforgeeks.org/problems/reverse-alternate-k-nodes/1", "Amazon", "Linked List"),
            new Problem("Odd Even Linked List", "Group all odd nodes together followed by even nodes.", "Medium", "61.3%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/odd-even-linked-list/", "https://practice.geeksforgeeks.org/problems/rearrange-a-linked-list/1", "Amazon,Microsoft", "Linked List"),
            new Problem("Double a Number Represented as a Linked List", "Double the value of non-negative number in linked list.", "Medium", "53.2%", "LinkedList Reversal", "neetcode-150", "linked-list-reversal", "https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/", "https://practice.geeksforgeeks.org/problems/double-a-number/1", "Google", "Linked List,Math"),
            new Problem("Split Linked List in Parts", "Split linked list into k consecutive parts.", "Medium", "61.9%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/split-linked-list-in-parts/", "https://practice.geeksforgeeks.org/problems/split-linked-list/1", "Amazon", "Linked List"),
            new Problem("Add Two Numbers", "Add two numbers represented by linked lists.", "Medium", "41.2%", "LinkedList Reversal", "striver-sde", "linked-list-reversal", "https://leetcode.com/problems/add-two-numbers/", "https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1", "Amazon,Google,Microsoft", "Linked List,Math")
        ));

        // ── 7. Tree BFS Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Binary Tree Level Order Traversal", "Return level order traversal of binary tree.", "Medium", "65.3%", "Tree BFS", "blind-75", "tree-bfs", "https://leetcode.com/problems/binary-tree-level-order-traversal/", "https://practice.geeksforgeeks.org/problems/level-order-traversal/1", "Amazon,Microsoft,Bloomberg", "Tree,BFS,Binary Tree"),
            new Problem("Binary Tree Zigzag Level Order Traversal", "Return zigzag level order traversal.", "Medium", "57.8%", "Tree BFS", "striver-sde", "tree-bfs", "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", "https://practice.geeksforgeeks.org/problems/zigzag-tree-traversal/1", "Amazon,Microsoft", "Tree,BFS,Binary Tree"),
            new Problem("Binary Tree Level Order Traversal II", "Return bottom-up level order traversal.", "Medium", "62.1%", "Tree BFS", "neetcode-150", "tree-bfs", "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/", "https://practice.geeksforgeeks.org/problems/bottom-up-level-order-traversal/1", "Amazon", "Tree,BFS,Binary Tree"),
            new Problem("Average of Levels in Binary Tree", "Return array of averages of values at each level.", "Easy", "71.4%", "Tree BFS", "apna-college", "tree-bfs", "https://leetcode.com/problems/average-of-levels-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/average-of-levels/1", "Facebook", "Tree,BFS,Binary Tree"),
            new Problem("Minimum Depth of Binary Tree", "Find minimum depth of binary tree.", "Easy", "45.8%", "Tree BFS", "neetcode-150", "tree-bfs", "https://leetcode.com/problems/minimum-depth-of-binary-tree/", "https://practice.geeksforgeeks.org/problems/minimum-depth-of-a-binary-tree/1", "Amazon,Facebook", "Tree,DFS,BFS,Binary Tree"),
            new Problem("Populating Next Right Pointers in Each Node", "Populate each next pointer to point to its next right node.", "Medium", "61.3%", "Tree BFS", "striver-sde", "tree-bfs", "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", "https://practice.geeksforgeeks.org/problems/connect-nodes-at-same-level/1", "Amazon,Microsoft", "Tree,BFS,Binary Tree"),
            new Problem("Binary Tree Right Side View", "Return values of nodes visible from right side.", "Medium", "62.4%", "Tree BFS", "blind-75", "tree-bfs", "https://leetcode.com/problems/binary-tree-right-side-view/", "https://practice.geeksforgeeks.org/problems/right-view-of-binary-tree/1", "Amazon,Meta", "Tree,DFS,BFS,Binary Tree"),
            new Problem("Find Largest Value in Each Tree Row", "Find largest value in each row of binary tree.", "Medium", "65.1%", "Tree BFS", "neetcode-150", "tree-bfs", "https://leetcode.com/problems/find-largest-value-in-each-tree-row/", "https://practice.geeksforgeeks.org/problems/largest-value-in-each-level/1", "Meta", "Tree,DFS,BFS,Binary Tree"),
            new Problem("Connect All Level Order Siblings", "Connect all nodes in level order.", "Medium", "59.2%", "Tree BFS", "gfg-must-do", "tree-bfs", "https://practice.geeksforgeeks.org/problems/connect-nodes-at-same-level/1", "https://practice.geeksforgeeks.org/problems/connect-nodes-at-same-level/1", "Amazon", "Tree,BFS"),
            new Problem("Cousins in Binary Tree", "Determine if two nodes are cousins in binary tree.", "Easy", "55.8%", "Tree BFS", "striver-sde", "tree-bfs", "https://leetcode.com/problems/cousins-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/check-if-two-nodes-are-cousins/1", "Amazon", "Tree,BFS,Binary Tree")
        ));

        // ── 8. Tree DFS Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Maximum Depth of Binary Tree", "Find maximum depth of binary tree.", "Easy", "74.2%", "Tree DFS", "blind-75", "tree-dfs", "https://leetcode.com/problems/maximum-depth-of-binary-tree/", "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1", "Amazon,Microsoft,Apple", "Tree,DFS,Binary Tree"),
            new Problem("Path Sum", "Determine if tree has root-to-leaf path summing to targetSum.", "Easy", "48.9%", "Tree DFS", "striver-sde", "tree-dfs", "https://leetcode.com/problems/path-sum/", "https://practice.geeksforgeeks.org/problems/root-to-leaf-path-sum/1", "Amazon,Microsoft", "Tree,DFS,Binary Tree"),
            new Problem("Path Sum II", "Find all root-to-leaf paths summing to targetSum.", "Medium", "57.6%", "Tree DFS", "neetcode-150", "tree-dfs", "https://leetcode.com/problems/path-sum-ii/", "https://practice.geeksforgeeks.org/problems/root-to-leaf-paths-sum/1", "Amazon,Microsoft", "Tree,DFS,Backtracking"),
            new Problem("Path Sum III", "Find number of paths summing to targetSum in binary tree.", "Medium", "47.1%", "Tree DFS", "striver-sde", "tree-dfs", "https://leetcode.com/problems/path-sum-iii/", "https://practice.geeksforgeeks.org/problems/count-paths-for-a-sum/1", "Amazon,Meta", "Tree,DFS,Binary Tree"),
            new Problem("Binary Tree Maximum Path Sum", "Find path with maximum sum in binary tree.", "Hard", "38.7%", "Tree DFS", "blind-75", "tree-dfs", "https://leetcode.com/problems/binary-tree-maximum-path-sum/", "https://practice.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1", "Amazon,Google,Microsoft", "Tree,DFS,DP"),
            new Problem("Diameter of Binary Tree", "Compute length of diameter of binary tree.", "Easy", "57.9%", "Tree DFS", "blind-75", "tree-dfs", "https://leetcode.com/problems/diameter-of-binary-tree/", "https://practice.geeksforgeeks.org/problems/diameter-of-binary-tree/1", "Amazon,Meta", "Tree,DFS,Binary Tree"),
            new Problem("Lowest Common Ancestor of a Binary Tree", "Find lowest common ancestor of two nodes.", "Medium", "60.4%", "Tree DFS", "striver-sde", "tree-dfs", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1", "Amazon,Meta,Microsoft", "Tree,DFS,Binary Tree"),
            new Problem("Sum Root to Leaf Numbers", "Return total sum of all root-to-leaf numbers.", "Medium", "61.8%", "Tree DFS", "neetcode-150", "tree-dfs", "https://leetcode.com/problems/sum-root-to-leaf-numbers/", "https://practice.geeksforgeeks.org/problems/sum-of-leaf-nodes/1", "Meta,Amazon", "Tree,DFS,Binary Tree"),
            new Problem("Validate Binary Search Tree", "Determine if binary tree is valid BST.", "Medium", "32.4%", "Tree DFS", "blind-75", "tree-dfs", "https://leetcode.com/problems/validate-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/check-for-bst/1", "Amazon,Microsoft", "Tree,DFS,BST"),
            new Problem("Flatten Binary Tree to Linked List", "Flatten binary tree to a singly linked list in-place.", "Medium", "63.5%", "Tree DFS", "striver-sde", "tree-dfs", "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", "https://practice.geeksforgeeks.org/problems/flatten-binary-tree-to-linked-list/1", "Amazon,Microsoft", "Tree,DFS,Binary Tree")
        ));

        // ── 9. Two Heaps Pattern (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Find Median from Data Stream", "Find median of streaming numbers dynamically.", "Hard", "51.4%", "Two Heaps", "blind-75", "two-heaps", "https://leetcode.com/problems/find-median-from-data-stream/", "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", "Amazon,Google,Meta", "Two Heaps,Design"),
            new Problem("Sliding Window Median", "Return median array for each sliding window of size k.", "Hard", "41.2%", "Two Heaps", "neetcode-150", "two-heaps", "https://leetcode.com/problems/sliding-window-median/", "https://practice.geeksforgeeks.org/problems/sliding-window-median/1", "Google,Meta", "Two Heaps,Sliding Window"),
            new Problem("IPO / Maximize Capital", "Find maximum capital after finishing at most k distinct projects.", "Hard", "49.6%", "Two Heaps", "neetcode-150", "two-heaps", "https://leetcode.com/problems/ipo/", "https://practice.geeksforgeeks.org/problems/maximize-capital/1", "Google,Amazon", "Two Heaps,Greedy"),
            new Problem("Find Median in a Stream", "Calculate median as numbers are added to stream.", "Hard", "51.4%", "Two Heaps", "gfg-must-do", "two-heaps", "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", "Amazon,Microsoft", "Two Heaps"),
            new Problem("Schedule Tasks", "Find optimal task scheduling order.", "Medium", "55.8%", "Two Heaps", "apna-college", "two-heaps", "https://leetcode.com/problems/task-scheduler/", "https://practice.geeksforgeeks.org/problems/task-scheduler/1", "Meta,Amazon", "Two Heaps,Greedy"),
            new Problem("Minimum Cost to Hire K Workers", "Find min cost to hire K workers matching wage ratios.", "Hard", "54.7%", "Two Heaps", "neetcode-150", "two-heaps", "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", "https://practice.geeksforgeeks.org/problems/hire-k-workers/1", "Google", "Two Heaps,Greedy"),
            new Problem("Kth Smallest Element in Sorted Matrix", "Find kth smallest element in matrix with sorted rows/cols.", "Medium", "61.5%", "Two Heaps", "striver-sde", "two-heaps", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", "https://practice.geeksforgeeks.org/problems/kth-element-in-matrix/1", "Google,Amazon", "Two Heaps,Binary Search"),
            new Problem("Smallest Range Covering Elements from K Lists", "Find smallest range containing at least one number from each of k lists.", "Hard", "62.1%", "Two Heaps", "neetcode-150", "two-heaps", "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", "https://practice.geeksforgeeks.org/problems/smallest-range-in-k-lists/1", "Google", "Two Heaps,Sliding Window"),
            new Problem("Find K Pairs with Smallest Sums", "Find k pairs (u, v) with smallest sums.", "Medium", "38.9%", "Two Heaps", "striver-sde", "two-heaps", "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", "https://practice.geeksforgeeks.org/problems/k-pairs-with-smallest-sums/1", "Amazon,Google", "Two Heaps"),
            new Problem("Task Scheduler", "Return min CPU intervals needed to finish all tasks with cooldown.", "Medium", "58.1%", "Two Heaps", "striver-sde", "two-heaps", "https://leetcode.com/problems/task-scheduler/", "https://practice.geeksforgeeks.org/problems/task-scheduler/1", "Meta,Amazon", "Two Heaps,Greedy")
        ));

        // ── 10. Subsets & Backtracking (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Subsets", "Return all possible subsets (the power set).", "Medium", "75.4%", "Backtracking", "blind-75", "subsets-backtracking", "https://leetcode.com/problems/subsets/", "https://practice.geeksforgeeks.org/problems/subsets-1615584881/1", "Amazon,Google,Meta", "Backtracking,Bit Manipulation"),
            new Problem("Subsets II", "Return all possible subsets including duplicates without duplicate subsets.", "Medium", "56.7%", "Backtracking", "striver-sde", "subsets-backtracking", "https://leetcode.com/problems/subsets-ii/", "https://practice.geeksforgeeks.org/problems/subsets-1615584881/1", "Amazon,Meta", "Backtracking"),
            new Problem("Permutations", "Return all possible permutations of distinct integers.", "Medium", "76.6%", "Backtracking", "blind-75", "subsets-backtracking", "https://leetcode.com/problems/permutations/", "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1", "Microsoft,Amazon,Google", "Backtracking"),
            new Problem("Permutations II", "Return all unique permutations containing duplicates.", "Medium", "57.9%", "Backtracking", "striver-sde", "subsets-backtracking", "https://leetcode.com/problems/permutations-ii/", "https://practice.geeksforgeeks.org/problems/all-unique-permutations-of-an-array/1", "Amazon,LinkedIn", "Backtracking"),
            new Problem("Combination Sum", "Find all unique combinations of candidates that sum to target.", "Medium", "69.8%", "Backtracking", "blind-75", "subsets-backtracking", "https://leetcode.com/problems/combination-sum/", "https://practice.geeksforgeeks.org/problems/combination-sum-1587115620/1", "Amazon,Google", "Backtracking"),
            new Problem("Combination Sum II", "Find all unique combinations where each candidate is used once.", "Medium", "53.6%", "Backtracking", "striver-sde", "subsets-backtracking", "https://leetcode.com/problems/combination-sum-ii/", "https://practice.geeksforgeeks.org/problems/combination-sum-ii-1664263832/1", "Amazon,Microsoft", "Backtracking"),
            new Problem("Letter Combinations of a Phone Number", "Return all possible letter combinations that number buttons could represent.", "Medium", "58.4%", "Backtracking", "blind-75", "subsets-backtracking", "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", "https://practice.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1", "Amazon,Google,Meta", "Backtracking,String"),
            new Problem("Generate Parentheses", "Generate all combinations of well-formed parentheses.", "Medium", "73.0%", "Backtracking", "neetcode-150", "subsets-backtracking", "https://leetcode.com/problems/generate-parentheses/", "https://practice.geeksforgeeks.org/problems/generate-all-balanced-parentheses/1", "Amazon,Google,Microsoft", "Backtracking,String"),
            new Problem("Word Search", "Determine if word exists in grid of characters.", "Medium", "40.9%", "Backtracking", "blind-75", "subsets-backtracking", "https://leetcode.com/problems/word-search/", "https://practice.geeksforgeeks.org/problems/word-search/1", "Amazon,Microsoft", "Backtracking,Matrix"),
            new Problem("N-Queens", "Place n queens on n x n chessboard so no two attack each other.", "Hard", "67.3%", "Backtracking", "striver-sde", "subsets-backtracking", "https://leetcode.com/problems/n-queens/", "https://practice.geeksforgeeks.org/problems/n-queen-problem0315/1", "Amazon,Google,Microsoft", "Backtracking")
        ));

        // ── 11. Modified Binary Search (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Binary Search", "Search target in sorted array in O(log n) time.", "Easy", "56.6%", "Binary Search", "blind-75", "modified-binary-search", "https://leetcode.com/problems/binary-search/", "https://practice.geeksforgeeks.org/problems/binary-search-1587115620/1", "Amazon,Google", "Binary Search"),
            new Problem("Search in Rotated Sorted Array", "Search target in rotated sorted array.", "Medium", "39.3%", "Binary Search", "blind-75", "modified-binary-search", "https://leetcode.com/problems/search-in-rotated-sorted-array/", "https://practice.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1", "Amazon,Microsoft,Meta", "Binary Search"),
            new Problem("Find Minimum in Rotated Sorted Array", "Find min element in rotated sorted array.", "Medium", "48.9%", "Binary Search", "blind-75", "modified-binary-search", "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", "https://practice.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3626/1", "Amazon,Google,Microsoft", "Binary Search"),
            new Problem("Search a 2D Matrix", "Search for value in m x n matrix with sorted rows.", "Medium", "49.8%", "Binary Search", "striver-sde", "modified-binary-search", "https://leetcode.com/problems/search-a-2d-matrix/", "https://practice.geeksforgeeks.org/problems/search-in-a-matrix-1587115621/1", "Google,Amazon", "Binary Search,Matrix"),
            new Problem("Find Peak Element", "Find a peak element in array and return its index.", "Medium", "45.8%", "Binary Search", "neetcode-150", "modified-binary-search", "https://leetcode.com/problems/find-peak-element/", "https://practice.geeksforgeeks.org/problems/find-the-highest-number2251/1", "Amazon,Google", "Binary Search"),
            new Problem("First and Last Position of Element", "Find starting and ending position of given target value.", "Medium", "42.4%", "Binary Search", "striver-sde", "modified-binary-search", "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", "https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1", "Amazon,Google", "Binary Search"),
            new Problem("Single Element in a Sorted Array", "Find single element in array where every other element appears twice.", "Medium", "58.9%", "Binary Search", "striver-sde", "modified-binary-search", "https://leetcode.com/problems/single-element-in-a-sorted-array/", "https://practice.geeksforgeeks.org/problems/find-the-element-that-appears-once-in-sorted-array0624/1", "Amazon,Google", "Binary Search"),
            new Problem("Kth Missing Positive Number", "Find kth missing positive integer.", "Easy", "59.8%", "Binary Search", "striver-sde", "modified-binary-search", "https://leetcode.com/problems/kth-missing-positive-number/", "https://practice.geeksforgeeks.org/problems/kth-missing-positive-number/1", "Meta,Amazon", "Binary Search"),
            new Problem("Capacity To Ship Packages Within D Days", "Return least weight capacity of ship to deliver within D days.", "Medium", "68.4%", "Binary Search", "striver-sde", "modified-binary-search", "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", "https://practice.geeksforgeeks.org/problems/capacity-to-ship-packages-within-d-days/1", "Google,Amazon", "Binary Search"),
            new Problem("Koko Eating Bananas", "Find min integer speed K to eat all bananas within H hours.", "Medium", "54.1%", "Binary Search", "neetcode-150", "modified-binary-search", "https://leetcode.com/problems/koko-eating-bananas/", "https://practice.geeksforgeeks.org/problems/koko-eating-bananas/1", "Google,Amazon", "Binary Search")
        ));

        // ── 12. Top K Elements (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Kth Largest Element in an Array", "Find kth largest element in unsorted array.", "Medium", "66.4%", "Heap", "blind-75", "top-k-elements", "https://leetcode.com/problems/kth-largest-element-in-an-array/", "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-an-array/1", "Amazon,Meta,Google", "Heap,Quickselect"),
            new Problem("Top K Frequent Elements", "Find top k most frequent elements in array.", "Medium", "65.1%", "Heap", "blind-75", "top-k-elements", "https://leetcode.com/problems/top-k-frequent-elements/", "https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1", "Amazon,Google", "Heap,Hash Table"),
            new Problem("K Closest Points to Origin", "Find k closest points to origin (0, 0).", "Medium", "65.8%", "Heap", "neetcode-150", "top-k-elements", "https://leetcode.com/problems/k-closest-points-to-origin/", "https://practice.geeksforgeeks.org/problems/k-closest-points-to-origin/1", "Amazon,Meta", "Heap,Geometry"),
            new Problem("Sort Characters By Frequency", "Sort string in decreasing order based on frequency of characters.", "Medium", "70.2%", "Heap", "striver-sde", "top-k-elements", "https://leetcode.com/problems/sort-characters-by-frequency/", "https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/1", "Amazon,Google", "Heap,Hash Table"),
            new Problem("Kth Largest Element in a Stream", "Design class to find kth largest element in stream.", "Easy", "56.4%", "Heap", "neetcode-150", "top-k-elements", "https://leetcode.com/problems/kth-largest-element-in-a-stream/", "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-a-stream/1", "Amazon", "Heap,Design"),
            new Problem("Reorganize String", "Rearrange string so adjacent characters are not same.", "Medium", "54.1%", "Heap", "striver-sde", "top-k-elements", "https://leetcode.com/problems/reorganize-string/", "https://practice.geeksforgeeks.org/problems/reorganize-string/1", "Amazon,Google", "Heap,Greedy"),
            new Problem("Frequency Sort", "Sort array elements by frequency.", "Medium", "68.1%", "Heap", "gfg-must-do", "top-k-elements", "https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/1", "https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/1", "Amazon", "Heap"),
            new Problem("Maximum Frequency Stack", "Design stack-like data structure that pops most frequent element.", "Hard", "66.4%", "Heap", "neetcode-150", "top-k-elements", "https://leetcode.com/problems/maximum-frequency-stack/", "https://practice.geeksforgeeks.org/problems/maximum-frequency-stack/1", "Amazon,Google", "Heap,Hash Table,Design"),
            new Problem("Sort Array by Increasing Frequency", "Sort array based on frequency of values.", "Easy", "77.2%", "Heap", "apna-college", "top-k-elements", "https://leetcode.com/problems/sort-array-by-increasing-frequency/", "https://practice.geeksforgeeks.org/problems/sort-array-by-increasing-frequency/1", "Amazon", "Heap,Sorting"),
            new Problem("Find K Closest Elements", "Find k closest integers to x in sorted array.", "Medium", "46.8%", "Heap", "striver-sde", "top-k-elements", "https://leetcode.com/problems/find-k-closest-elements/", "https://practice.geeksforgeeks.org/problems/find-k-closest-elements/1", "Google,Amazon", "Heap,Two Pointers")
        ));

        // ── 13. K-way Merge (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Merge k Sorted Lists", "Merge k sorted linked lists into one sorted list.", "Hard", "51.2%", "K-way Merge", "blind-75", "k-way-merge", "https://leetcode.com/problems/merge-k-sorted-lists/", "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1", "Amazon,Google,Microsoft", "Heap,Linked List,Divide and Conquer"),
            new Problem("Kth Smallest Element in a Sorted Matrix", "Find kth smallest element in n x n matrix.", "Medium", "61.5%", "K-way Merge", "striver-sde", "k-way-merge", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", "https://practice.geeksforgeeks.org/problems/kth-element-in-matrix/1", "Google,Amazon", "Heap,Binary Search"),
            new Problem("Smallest Range Covering Elements from K Lists", "Find smallest range covering at least one element from each of k lists.", "Hard", "62.1%", "K-way Merge", "neetcode-150", "k-way-merge", "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", "https://practice.geeksforgeeks.org/problems/smallest-range-in-k-lists/1", "Google", "Heap,Sliding Window"),
            new Problem("Find K Pairs with Smallest Sums", "Find k pairs (u, v) with smallest sums.", "Medium", "38.9%", "K-way Merge", "striver-sde", "k-way-merge", "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", "https://practice.geeksforgeeks.org/problems/k-pairs-with-smallest-sums/1", "Amazon,Google", "Heap"),
            new Problem("Merge Sorted Array", "Merge nums2 into nums1 as one sorted array.", "Easy", "47.6%", "K-way Merge", "striver-sde", "k-way-merge", "https://leetcode.com/problems/merge-sorted-array/", "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1", "Amazon,Microsoft", "Two Pointers,Sorting"),
            new Problem("Sort an Array (Merge Sort)", "Sort array using Merge Sort algorithm.", "Medium", "58.9%", "K-way Merge", "apna-college", "k-way-merge", "https://leetcode.com/problems/sort-an-array/", "https://practice.geeksforgeeks.org/problems/merge-sort/1", "Amazon,Google", "Divide and Conquer,Sorting"),
            new Problem("Kth Smallest Number in M Sorted Lists", "Find kth smallest number across M sorted lists.", "Medium", "59.4%", "K-way Merge", "gfg-must-do", "k-way-merge", "https://practice.geeksforgeeks.org/problems/kth-smallest-element-in-m-sorted-lists/1", "https://practice.geeksforgeeks.org/problems/kth-smallest-element-in-m-sorted-lists/1", "Google", "Heap"),
            new Problem("Merge K Sorted Arrays", "Merge K sorted arrays of size N into one sorted array.", "Medium", "67.2%", "K-way Merge", "gfg-must-do", "k-way-merge", "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1", "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1", "Amazon,Microsoft", "Heap"),
            new Problem("Median of Two Sorted Arrays", "Return median of two sorted arrays in O(log (m+n)) time.", "Hard", "38.2%", "K-way Merge", "striver-sde", "k-way-merge", "https://leetcode.com/problems/median-of-two-sorted-arrays/", "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1", "Google,Amazon", "Binary Search,Divide and Conquer"),
            new Problem("Super Ugly Number", "Find nth super ugly number given prime factors.", "Medium", "45.8%", "K-way Merge", "neetcode-150", "k-way-merge", "https://leetcode.com/problems/super-ugly-number/", "https://practice.geeksforgeeks.org/problems/super-ugly-number/1", "Google", "Heap,Math")
        ));

        // ── 14. 0/1 Knapsack (DP) (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("0/1 Knapsack Problem", "Maximize value in knapsack of capacity W.", "Medium", "52.1%", "Dynamic Programming", "striver-sde", "01-knapsack", "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", "Amazon,Google,Microsoft", "DP"),
            new Problem("Partition Equal Subset Sum", "Determine if array can be partitioned into two subsets with equal sum.", "Medium", "46.8%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/partition-equal-subset-sum/", "https://practice.geeksforgeeks.org/problems/subset-sum-problem2014/1", "Amazon,Microsoft", "DP"),
            new Problem("Target Sum", "Find number of ways to assign + and - to reach target sum.", "Medium", "47.2%", "Dynamic Programming", "neetcode-150", "01-knapsack", "https://leetcode.com/problems/target-sum/", "https://practice.geeksforgeeks.org/problems/target-sum/1", "Amazon,Google", "DP,Backtracking"),
            new Problem("Coin Change", "Find fewest coins needed to make up given amount.", "Medium", "42.2%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/coin-change/", "https://practice.geeksforgeeks.org/problems/coin-change2514/1", "Amazon,Google,Microsoft", "DP,BFS"),
            new Problem("Coin Change II", "Find number of combinations that make up given amount.", "Medium", "62.4%", "Dynamic Programming", "striver-sde", "01-knapsack", "https://leetcode.com/problems/coin-change-ii/", "https://practice.geeksforgeeks.org/problems/coin-change2514/1", "Amazon,Google", "DP"),
            new Problem("House Robber", "Determine max amount of money you can rob without alerting police.", "Medium", "49.3%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/house-robber/", "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1", "Amazon,Microsoft,Google", "DP"),
            new Problem("Longest Common Subsequence", "Find length of longest common subsequence between two strings.", "Medium", "57.2%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/longest-common-subsequence/", "https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1", "Amazon,Google,Microsoft", "DP,String"),
            new Problem("Longest Increasing Subsequence", "Return length of longest strictly increasing subsequence.", "Medium", "54.4%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/longest-increasing-subsequence/", "https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1", "Amazon,Microsoft,Google", "DP,Binary Search"),
            new Problem("Word Break", "Determine if string can be segmented into dictionary words.", "Medium", "44.8%", "Dynamic Programming", "blind-75", "01-knapsack", "https://leetcode.com/problems/word-break/", "https://practice.geeksforgeeks.org/problems/word-break1352/1", "Amazon,Google,Meta", "DP,Hash Table,Trie"),
            new Problem("Edit Distance", "Find minimum operations to convert word1 to word2.", "Hard", "55.6%", "Dynamic Programming", "striver-sde", "01-knapsack", "https://leetcode.com/problems/edit-distance/", "https://practice.geeksforgeeks.org/problems/edit-distance3702/1", "Amazon,Google,Microsoft", "DP,String")
        ));

        // ── 15. Topological Sort (10 Problems)
        problemRepository.saveAll(List.of(
            new Problem("Course Schedule", "Determine if you can finish all courses given prerequisite graph.", "Medium", "45.8%", "Topological Sort", "blind-75", "topological-sort", "https://leetcode.com/problems/course-schedule/", "https://practice.geeksforgeeks.org/problems/prerequisite-tasks/1", "Amazon,Google,Microsoft", "Graph,Topological Sort,DFS,BFS"),
            new Problem("Course Schedule II", "Return ordering of courses to finish all courses.", "Medium", "49.2%", "Topological Sort", "striver-sde", "topological-sort", "https://leetcode.com/problems/course-schedule-ii/", "https://practice.geeksforgeeks.org/problems/course-schedule/1", "Amazon,Google,Meta", "Graph,Topological Sort,BFS"),
            new Problem("Alien Dictionary", "Derive order of letters in alien language from sorted words list.", "Hard", "35.4%", "Topological Sort", "blind-75", "topological-sort", "https://leetcode.com/problems/alien-dictionary/", "https://practice.geeksforgeeks.org/problems/alien-dictionary/1", "Google,Amazon,Meta", "Graph,Topological Sort,BFS"),
            new Problem("Minimum Height Trees", "Find roots of trees that minimize height.", "Medium", "39.1%", "Topological Sort", "neetcode-150", "topological-sort", "https://leetcode.com/problems/minimum-height-trees/", "https://practice.geeksforgeeks.org/problems/minimum-height-trees/1", "Google,Amazon", "Graph,Topological Sort,BFS"),
            new Problem("Sequence Reconstruction", "Check if original sequence can be uniquely reconstructed from sub-sequences.", "Medium", "48.2%", "Topological Sort", "striver-sde", "topological-sort", "https://leetcode.com/problems/sequence-reconstruction/", "https://practice.geeksforgeeks.org/problems/sequence-reconstruction/1", "Google", "Graph,Topological Sort"),
            new Problem("Find Eventual Safe States", "Return array of safe nodes in directed graph.", "Medium", "61.3%", "Topological Sort", "striver-sde", "topological-sort", "https://leetcode.com/problems/find-eventual-safe-states/", "https://practice.geeksforgeeks.org/problems/eventual-safe-states/1", "Google,Amazon", "Graph,Topological Sort,DFS"),
            new Problem("Course Schedule IV", "Determine if course u is a prerequisite of course v.", "Medium", "50.1%", "Topological Sort", "neetcode-150", "topological-sort", "https://leetcode.com/problems/course-schedule-iv/", "https://practice.geeksforgeeks.org/problems/course-schedule-iv/1", "Google", "Graph,Topological Sort"),
            new Problem("All Ancestors of a Node in a DAG", "Find all ancestors for each node in DAG.", "Medium", "54.8%", "Topological Sort", "striver-sde", "topological-sort", "https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/", "https://practice.geeksforgeeks.org/problems/ancestors-in-dag/1", "Google", "Graph,Topological Sort,DFS"),
            new Problem("Parallel Courses", "Return minimum semesters needed to complete all courses.", "Medium", "62.4%", "Topological Sort", "neetcode-150", "topological-sort", "https://leetcode.com/problems/parallel-courses/", "https://practice.geeksforgeeks.org/problems/parallel-courses/1", "Google", "Graph,Topological Sort"),
            new Problem("Sort Items by Groups Respecting Dependencies", "Return valid sorting of items adhering to group and item dependencies.", "Hard", "60.1%", "Topological Sort", "striver-sde", "topological-sort", "https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/", "https://practice.geeksforgeeks.org/problems/sort-items-dependencies/1", "Google", "Graph,Topological Sort")
        ));

        System.out.println("✅ Seeded 150 pattern problems across 15 patterns.");
    }

    // ── Default User Accounts ────────────────────────────────────────────────

    private void seedDefaultAdmin() {
        if (userRepository.existsByEmail("admin@rankquest.com")) return;

        User admin = new User();
        admin.setEmail("admin@rankquest.com");
        admin.setUsername("rankquest_admin");
        admin.setFullName("RankQuest Admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setCollege("IIT Bombay");
        admin.setBranch("Computer Science and Engineering");
        admin.setYear("2025");
        admin.setBio("Platform administrator & competitive programming coach.");
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);
        System.out.println("✅ Default admin created (admin@rankquest.com / admin123).");
    }

    private void seedDemoUser() {
        if (userRepository.existsByEmail("demo@rankquest.com")) return;

        User demo = new User();
        demo.setEmail("demo@rankquest.com");
        demo.setUsername("demo_coder");
        demo.setFullName("Demo Coder");
        demo.setPassword(passwordEncoder.encode("demo123"));
        demo.setCollege("BITS Pilani");
        demo.setBranch("Information Technology");
        demo.setYear("2026");
        demo.setBio("DSA enthusiast grinding patterns daily!");
        demo.setRole(Role.USER);

        userRepository.save(demo);
        System.out.println("✅ Demo user created (demo@rankquest.com / demo123).");
    }
}