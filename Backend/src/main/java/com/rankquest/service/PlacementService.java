package com.rankquest.service;

import com.rankquest.dto.PlacementTopicResponse;
import com.rankquest.dto.PlacementTopicResponse.PlacementProblemDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service serving all 15 separate Data Structure modules dynamically via REST API.
 * Each module contains 30 questions (10 Easy, 10 Medium, 10 Hard). Total 450 questions.
 * Stack, Queue, Binary Trees, and BST are 100% separate.
 */
@Service
public class PlacementService {

    public List<PlacementTopicResponse> getPlacementTopics() {
        List<PlacementTopicResponse> topics = new ArrayList<>();

        // 1. Arrays & 1D/2D Vectors
        topics.add(new PlacementTopicResponse(
            "arrays", "1. Arrays & 1D/2D Vectors", "📦",
            "Array traversals, element rotations, matrix manipulations, and Kadane's algorithm.",
            buildArrayEasy(), buildArrayMedium(), buildArrayHard()
        ));

        // 2. Hash Table & Hash Set
        topics.add(new PlacementTopicResponse(
            "hashing", "2. Hash Table & Hash Set", "🔑",
            "Hash maps, frequency tables, bucket hashing, and fast O(1) lookups.",
            buildHashEasy(), buildHashMedium(), buildHashHard()
        ));

        // 3. Strings & Character Array
        topics.add(new PlacementTopicResponse(
            "strings", "3. Strings & Character Array", "🔤",
            "String searching, anagrams, palindromes, and character frequency problems.",
            buildStringEasy(), buildStringMedium(), buildStringHard()
        ));

        // 4. Two Pointers Technique
        topics.add(new PlacementTopicResponse(
            "two-pointers", "4. Two Pointers Technique", "⚡",
            "Opposite direction and same-direction pointer movements for linear pair finding.",
            buildTwoPointerEasy(), buildTwoPointerMedium(), buildTwoPointerHard()
        ));

        // 5. Sliding Window Technique
        topics.add(new PlacementTopicResponse(
            "sliding-window", "5. Sliding Window Technique", "🪟",
            "Dynamic and fixed size windows over arrays or strings to track optimal subarrays.",
            buildSlidingWindowEasy(), buildSlidingWindowMedium(), buildSlidingWindowHard()
        ));

        // 6. Recursion
        topics.add(new PlacementTopicResponse(
            "recursion", "6. Recursion", "🔄",
            "Call stacks, base cases, Divide & Conquer, and recursive state accumulation.",
            buildRecursionEasy(), buildRecursionMedium(), buildRecursionHard()
        ));

        // 7. Backtracking
        topics.add(new PlacementTopicResponse(
            "backtracking", "7. Backtracking", "🔙",
            "N-Queens, Sudoku, Subsets, Permutations, and pruning decision trees.",
            buildBacktrackingEasy(), buildBacktrackingMedium(), buildBacktrackingHard()
        ));

        // 8. Linked List (Singly & Doubly)
        topics.add(new PlacementTopicResponse(
            "linked-list", "8. Linked List (Singly & Doubly)", "📜",
            "Pointer management, reversing, cycle detection, and merging linked nodes.",
            buildLinkedListEasy(), buildLinkedListMedium(), buildLinkedListHard()
        ));

        // 9. Stack & Monotonic Stack (Separate from Queue)
        topics.add(new PlacementTopicResponse(
            "stack", "9. Stack & Monotonic Stack", "🥞",
            "LIFO access, balanced parentheses, expression evaluation, and monotonic stack bounds.",
            buildStackEasy(), buildStackMedium(), buildStackHard()
        ));

        // 10. Queue & Deque (Separate from Stack)
        topics.add(new PlacementTopicResponse(
            "queue", "10. Queue & Deque", "🎟️",
            "FIFO data structures, circular queues, deques, and monotonic queue windows.",
            buildQueueEasy(), buildQueueMedium(), buildQueueHard()
        ));

        // 11. Binary Trees (Normal Trees, Separate from BST)
        topics.add(new PlacementTopicResponse(
            "binary-trees", "11. Binary Trees (Normal Trees)", "🌲",
            "Hierarchical tree nodes, Preorder/Inorder/Postorder traversals, level-order BFS, and tree height.",
            buildTreeEasy(), buildTreeMedium(), buildTreeHard()
        ));

        // 12. Binary Search Trees (BST, Separate from Normal Trees)
        topics.add(new PlacementTopicResponse(
            "binary-search-trees", "12. Binary Search Trees (BST)", "🪵",
            "Ordered tree structures, BST validation, insertion, deletion, and K-th smallest elements.",
            buildBstEasy(), buildBstMedium(), buildBstHard()
        ));

        // 13. Heap / Priority Queue
        topics.add(new PlacementTopicResponse(
            "heap", "13. Heap / Priority Queue", "⛰️",
            "Min heaps, max heaps, top K elements, median tracking, and priority scheduling.",
            buildHeapEasy(), buildHeapMedium(), buildHeapHard()
        ));

        // 14. Graphs & Disjoint Set (DSU)
        topics.add(new PlacementTopicResponse(
            "graphs", "14. Graphs & Disjoint Set (DSU)", "🌐",
            "Adjacency lists, BFS, DFS, Dijkstra, Union-Find, and topological sorting.",
            buildGraphEasy(), buildGraphMedium(), buildGraphHard()
        ));

        // 15. Dynamic Programming
        topics.add(new PlacementTopicResponse(
            "dynamic-programming", "15. Dynamic Programming", "🧠",
            "1D, 2D grid DP, knapsack memoization vs tabulation, and optimal substructure.",
            buildDpEasy(), buildDpMedium(), buildDpHard()
        ));

        return topics;
    }

    // ─── 1. ARRAYS ─────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildArrayEasy() {
        return List.of(
            new PlacementProblemDto(1001L, "Best Time to Buy and Sell Stock", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1", "https://youtube.com/watch?v=1pkOgXD63yU", List.of("Amazon", "Microsoft"), List.of("Array"), "54.2%"),
            new PlacementProblemDto(1002L, "Remove Duplicates from Sorted Array", "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", "https://practice.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1", "https://youtube.com/watch?v=DEJAZBq0FDA", List.of("Microsoft", "Google"), List.of("Array"), "51.4%"),
            new PlacementProblemDto(1003L, "Move Zeroes", "https://leetcode.com/problems/move-zeroes/", "https://practice.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0702/1", "https://youtube.com/watch?v=aayNRwUN3Do", List.of("Meta", "Amazon"), List.of("Array"), "61.3%"),
            new PlacementProblemDto(1004L, "Majority Element (Boyer-Moore)", "https://leetcode.com/problems/majority-element/", "https://practice.geeksforgeeks.org/problems/majority-element-1587115620/1", "https://youtube.com/watch?v=gY-I8uK65h8", List.of("Amazon"), List.of("Array"), "63.0%"),
            new PlacementProblemDto(1005L, "Pascal's Triangle", "https://leetcode.com/problems/pascals-triangle/", "https://practice.geeksforgeeks.org/problems/pascal-triangle0652/1", "https://youtube.com/watch?v=6JYIGjeeYuU", List.of("Bloomberg"), List.of("Array"), "71.1%"),
            new PlacementProblemDto(1006L, "Missing Number", "https://leetcode.com/problems/missing-number/", "https://practice.geeksforgeeks.org/problems/missing-number-in-array1404/1", "https://youtube.com/watch?v=WnPLSRLSANE", List.of("Microsoft"), List.of("Array"), "63.5%"),
            new PlacementProblemDto(1007L, "Check if Array Is Sorted and Rotated", "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", "https://practice.geeksforgeeks.org/problems/check-if-array-is-sorted-and-rotated-1587115620/1", "https://youtube.com/watch?v=Z7_nMTHf3eE", List.of("Google"), List.of("Array"), "51.8%"),
            new PlacementProblemDto(1008L, "Find Highest Altitude", "https://leetcode.com/problems/find-the-highest-altitude/", "https://practice.geeksforgeeks.org/problems/highest-altitude/1", "https://youtube.com/watch?v=o0dYvA5f9-Q", List.of("Apple"), List.of("Prefix Sum"), "80.2%"),
            new PlacementProblemDto(1009L, "Build Array from Permutation", "https://leetcode.com/problems/build-array-from-permutation/", "https://practice.geeksforgeeks.org/problems/array-permutation/1", "https://youtube.com/watch?v=mD3ZkQp6X_o", List.of("Amazon"), List.of("Array"), "89.4%"),
            new PlacementProblemDto(1010L, "Concatenation of Array", "https://leetcode.com/problems/concatenation-of-array/", "https://practice.geeksforgeeks.org/problems/concatenation-of-array/1", "https://youtube.com/watch?v=68a1XA_65vE", List.of("Google"), List.of("Array"), "89.8%")
        );
    }

    private List<PlacementProblemDto> buildArrayMedium() {
        return List.of(
            new PlacementProblemDto(1011L, "Product of Array Except Self", "https://leetcode.com/problems/product-of-array-except-self/", "https://practice.geeksforgeeks.org/problems/product-array-puzzle4515/1", "https://youtube.com/watch?v=bNvIQI2wAjk", List.of("Amazon", "Apple"), List.of("Prefix Sum"), "64.4%"),
            new PlacementProblemDto(1012L, "Sort Colors", "https://leetcode.com/problems/sort-colors/", "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1", "https://youtube.com/watch?v=tp8JIuCXBaU", List.of("Microsoft"), List.of("Array"), "60.4%"),
            new PlacementProblemDto(1013L, "Rotate Image", "https://leetcode.com/problems/rotate-image/", "https://practice.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1", "https://youtube.com/watch?v=fMSJSS7eO1w", List.of("Amazon"), List.of("Matrix"), "72.9%"),
            new PlacementProblemDto(1014L, "Merge Intervals", "https://leetcode.com/problems/merge-intervals/", "https://practice.geeksforgeeks.org/problems/overlapping-intervals--170647/1", "https://youtube.com/watch?v=44H3cEC2fFM", List.of("Google"), List.of("Intervals"), "46.1%"),
            new PlacementProblemDto(1015L, "Set Matrix Zeroes", "https://leetcode.com/problems/set-matrix-zeroes/", "https://practice.geeksforgeeks.org/problems/set-matrix-zeroes/1", "https://youtube.com/watch?v=M65xEncJgMc", List.of("Microsoft"), List.of("Matrix"), "52.6%"),
            new PlacementProblemDto(1016L, "Spiral Matrix", "https://leetcode.com/problems/spiral-matrix/", "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1", "https://youtube.com/watch?v=BJnMZNwUk1M", List.of("Amazon"), List.of("Matrix"), "47.1%"),
            new PlacementProblemDto(1017L, "Next Permutation", "https://leetcode.com/problems/next-permutation/", "https://practice.geeksforgeeks.org/problems/next-permutation5226/1", "https://youtube.com/watch?v=JDOXKqF60RQ", List.of("Meta"), List.of("Array"), "37.4%"),
            new PlacementProblemDto(1018L, "Maximum Subarray", "https://leetcode.com/problems/maximum-subarray/", "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1", "https://youtube.com/watch?v=5WZl3MMT0Eg", List.of("Amazon"), List.of("Array"), "49.7%"),
            new PlacementProblemDto(1019L, "Game of Life", "https://leetcode.com/problems/game-of-life/", "https://practice.geeksforgeeks.org/problems/game-of-life/1", "https://youtube.com/watch?v=fei4bJQdBUQ", List.of("Google"), List.of("Matrix"), "67.2%"),
            new PlacementProblemDto(1020L, "Insert Interval", "https://leetcode.com/problems/insert-interval/", "https://practice.geeksforgeeks.org/problems/insert-interval/1", "https://youtube.com/watch?v=A8NUOmlwOlM", List.of("Google"), List.of("Intervals"), "39.2%")
        );
    }

    private List<PlacementProblemDto> buildArrayHard() {
        return List.of(
            new PlacementProblemDto(1021L, "First Missing Positive", "https://leetcode.com/problems/first-missing-positive/", "https://practice.geeksforgeeks.org/problems/smallest-positive-missing-number-1587115621/1", "https://youtube.com/watch?v=8g78yfzMlao", List.of("Amazon", "Google"), List.of("Cyclic Sort"), "37.2%"),
            new PlacementProblemDto(1022L, "Max Chunks To Make Sorted II", "https://leetcode.com/problems/max-chunks-to-make-sorted-ii/", "https://practice.geeksforgeeks.org/problems/max-chunks-to-make-sorted/1", "https://youtube.com/watch?v=NnJp27sI148", List.of("Google"), List.of("Prefix Max"), "53.0%"),
            new PlacementProblemDto(1023L, "Subarray with Odd Sum", "https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/", "https://practice.geeksforgeeks.org/problems/subarrays-with-odd-sum/1", "https://youtube.com/watch?v=7u1hW2pA1-Q", List.of("Amazon"), List.of("Prefix Sum"), "45.1%"),
            new PlacementProblemDto(1024L, "Maximum Sum of 3 Non-Overlapping Subarrays", "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/", "https://practice.geeksforgeeks.org/problems/max-sum-subarrays/1", "https://youtube.com/watch?v=1eXvBLk_u0g", List.of("Google"), List.of("Prefix Sum"), "49.0%"),
            new PlacementProblemDto(1025L, "Grid Illumination", "https://leetcode.com/problems/grid-illumination/", "https://practice.geeksforgeeks.org/problems/grid-illumination/1", "https://youtube.com/watch?v=D-y-dOaF4Yk", List.of("Google"), List.of("Matrix"), "36.8%"),
            new PlacementProblemDto(1026L, "Minimum Swaps to Make Sequences Increasing", "https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/", "https://practice.geeksforgeeks.org/problems/minimum-swaps/1", "https://youtube.com/watch?v=W_akoYuwp1E", List.of("Amazon"), List.of("Array"), "39.8%"),
            new PlacementProblemDto(1027L, "Contiguous Array", "https://leetcode.com/problems/contiguous-array/", "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-and-1/1", "https://youtube.com/watch?v=agB1LyD7t2w", List.of("Amazon"), List.of("Prefix Sum"), "47.1%"),
            new PlacementProblemDto(1028L, "Count Subarrays with Fixed Bounds", "https://leetcode.com/problems/count-subarrays-with-fixed-bounds/", "https://practice.geeksforgeeks.org/problems/fixed-bounds/1", "https://youtube.com/watch?v=z6LwCwqf42U", List.of("Meta"), List.of("Array"), "64.8%"),
            new PlacementProblemDto(1029L, "Maximum Subarray Sum with One Deletion", "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/", "https://practice.geeksforgeeks.org/problems/max-sum-deletion/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Kadane"), "41.2%"),
            new PlacementProblemDto(1030L, "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", "https://practice.geeksforgeeks.org/problems/shortest-subarray-with-sum-at-least-k/1", "https://youtube.com/watch?v=K03X458wA8c", List.of("Google"), List.of("Prefix Sum"), "30.1%")
        );
    }

    // ─── 2. HASH TABLE ─────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildHashEasy() {
        return List.of(
            new PlacementProblemDto(2001L, "Two Sum", "https://leetcode.com/problems/two-sum/", "https://practice.geeksforgeeks.org/problems/key-pair5616/1", "https://youtube.com/watch?v=KLlXCFG5TnA", List.of("Amazon"), List.of("Hash Map"), "49.1%"),
            new PlacementProblemDto(2002L, "Contains Duplicate", "https://leetcode.com/problems/contains-duplicate/", "https://practice.geeksforgeeks.org/problems/contains-duplicate/1", "https://youtube.com/watch?v=3OamzN90kPg", List.of("Apple"), List.of("Hash Set"), "61.0%"),
            new PlacementProblemDto(2003L, "Valid Anagram", "https://leetcode.com/problems/valid-anagram/", "https://practice.geeksforgeeks.org/problems/check-if-two-strings-are-k-anagrams-or-not/1", "https://youtube.com/watch?v=9UtInBqnCgA", List.of("Google"), List.of("Hash Map"), "63.5%"),
            new PlacementProblemDto(2004L, "Isomorphic Strings", "https://leetcode.com/problems/isomorphic-strings/", "https://practice.geeksforgeeks.org/problems/isomorphic-strings-1587115620/1", "https://youtube.com/watch?v=7yF-U1hLEqU", List.of("Amazon"), List.of("Hash Map"), "43.2%"),
            new PlacementProblemDto(2005L, "Word Pattern", "https://leetcode.com/problems/word-pattern/", "https://practice.geeksforgeeks.org/problems/word-pattern/1", "https://youtube.com/watch?v=W_akoYuwp1E", List.of("Uber"), List.of("Hash Map"), "41.7%"),
            new PlacementProblemDto(2006L, "Happy Number", "https://leetcode.com/problems/happy-number/", "https://practice.geeksforgeeks.org/problems/happy-number/1", "https://youtube.com/watch?v=ljz85cGIaiU", List.of("Google"), List.of("Hash Set"), "54.9%"),
            new PlacementProblemDto(2007L, "Intersection of Two Arrays", "https://leetcode.com/problems/intersection-of-two-arrays/", "https://practice.geeksforgeeks.org/problems/intersection-of-two-arrays2404/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Meta"), List.of("Hash Set"), "71.2%"),
            new PlacementProblemDto(2008L, "First Unique Character in a String", "https://leetcode.com/problems/first-unique-character-in-a-string/", "https://practice.geeksforgeeks.org/problems/non-repeating-character-1587115620/1", "https://youtube.com/watch?v=5co5Gvp_-30", List.of("Amazon"), List.of("Hash Map"), "59.8%"),
            new PlacementProblemDto(2009L, "Find Words That Can Be Formed", "https://leetcode.com/problems/find-words-that-can-be-formed-by-characters/", "https://practice.geeksforgeeks.org/problems/words-formed/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Hash Map"), "68.9%"),
            new PlacementProblemDto(2010L, "Design HashSet", "https://leetcode.com/problems/design-hashset/", "https://practice.geeksforgeeks.org/problems/design-hashset/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Hash Set"), "67.1%")
        );
    }

    private List<PlacementProblemDto> buildHashMedium() {
        return List.of(
            new PlacementProblemDto(2011L, "Group Anagrams", "https://leetcode.com/problems/group-anagrams/", "https://practice.geeksforgeeks.org/problems/print-anagrams-together/1", "https://youtube.com/watch?v=vzdNOK2oB2E", List.of("Amazon", "Meta"), List.of("Hash Map"), "67.0%"),
            new PlacementProblemDto(2012L, "Top K Frequent Elements", "https://leetcode.com/problems/top-k-frequent-elements/", "https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1", "https://youtube.com/watch?v=YPTqKIgVk-k", List.of("Amazon"), List.of("Hash Map"), "63.8%"),
            new PlacementProblemDto(2013L, "Longest Consecutive Sequence", "https://leetcode.com/problems/longest-consecutive-sequence/", "https://practice.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1", "https://youtube.com/watch?v=P6RZZMu_maU", List.of("Google"), List.of("Hash Set"), "47.5%"),
            new PlacementProblemDto(2014L, "Subarray Sum Equals K", "https://leetcode.com/problems/subarray-sum-equals-k/", "https://practice.geeksforgeeks.org/problems/subarrays-with-sum-k/1", "https://youtube.com/watch?v=fFVZt-6sgyo", List.of("Meta"), List.of("Prefix Sum"), "43.6%"),
            new PlacementProblemDto(2015L, "Continuous Subarray Sum", "https://leetcode.com/problems/continuous-subarray-sum/", "https://practice.geeksforgeeks.org/problems/continuous-subarray-sum/1", "https://youtube.com/watch?v=OKcrA1urvgk", List.of("Meta"), List.of("Hash Map"), "28.9%"),
            new PlacementProblemDto(2016L, "Design Underground System", "https://leetcode.com/problems/design-underground-system/", "https://practice.geeksforgeeks.org/problems/underground-system/1", "https://youtube.com/watch?v=AXW25UIdE7s", List.of("Bloomberg"), List.of("Design"), "74.2%"),
            new PlacementProblemDto(2017L, "Insert Delete GetRandom O(1)", "https://leetcode.com/problems/insert-delete-getrandom-o1/", "https://practice.geeksforgeeks.org/problems/insert-delete-getrandom/1", "https://youtube.com/watch?v=j4KwhBziOpg", List.of("Amazon"), List.of("Hash Map"), "53.8%"),
            new PlacementProblemDto(2018L, "Encode and Decode TinyURL", "https://leetcode.com/problems/encode-and-decode-tinyurl/", "https://practice.geeksforgeeks.org/problems/encode-decode-tinyurl/1", "https://youtube.com/watch?v=VyBOaboQLGc", List.of("Amazon"), List.of("Hash Map"), "85.6%"),
            new PlacementProblemDto(2019L, "Find Players With Zero or One Losses", "https://leetcode.com/problems/find-players-with-zero-or-one-losses/", "https://practice.geeksforgeeks.org/problems/zero-one-losses/1", "https://youtube.com/watch?v=1uW4wE0Yq3o", List.of("Google"), List.of("Hash Map"), "71.5%"),
            new PlacementProblemDto(2020L, "Brick Wall", "https://leetcode.com/problems/brick-wall/", "https://practice.geeksforgeeks.org/problems/brick-wall/1", "https://youtube.com/watch?v=KkambSy3gmg", List.of("Google"), List.of("Hash Map"), "53.1%")
        );
    }

    private List<PlacementProblemDto> buildHashHard() {
        return List.of(
            new PlacementProblemDto(2021L, "Insert Delete GetRandom O(1) - Duplicates", "https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/", "https://practice.geeksforgeeks.org/problems/insert-delete-getrandom/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Hash Map"), "35.4%"),
            new PlacementProblemDto(2022L, "Naming a Company", "https://leetcode.com/problems/naming-a-company/", "https://practice.geeksforgeeks.org/problems/naming-a-company/1", "https://youtube.com/watch?v=DoD_e762yI4", List.of("Google"), List.of("Hash Set"), "46.7%"),
            new PlacementProblemDto(2023L, "Max Points on a Line", "https://leetcode.com/problems/max-points-on-a-line/", "https://practice.geeksforgeeks.org/problems/max-points-on-a-line/1", "https://youtube.com/watch?v=7FmJ78fWkgI", List.of("Google"), List.of("Math"), "24.8%"),
            new PlacementProblemDto(2024L, "All O one Data Structure", "https://leetcode.com/problems/all-oone-data-structure/", "https://practice.geeksforgeeks.org/problems/all-oone-data-structure/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Google"), List.of("Design"), "37.8%"),
            new PlacementProblemDto(2025L, "Substring with Concatenation of All Words", "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", "https://practice.geeksforgeeks.org/problems/substring-concatenation/1", "https://youtube.com/watch?v=Lk3n0lPjMv0", List.of("Amazon"), List.of("Hash Map"), "31.2%"),
            new PlacementProblemDto(2026L, "Grid Illumination", "https://leetcode.com/problems/grid-illumination/", "https://practice.geeksforgeeks.org/problems/grid-illumination/1", "https://youtube.com/watch?v=D-y-dOaF4Yk", List.of("Google"), List.of("Hash Map"), "36.8%"),
            new PlacementProblemDto(2027L, "Maximum Frequency Stack", "https://leetcode.com/problems/maximum-frequency-stack/", "https://practice.geeksforgeeks.org/problems/max-frequency-stack/1", "https://youtube.com/watch?v=Z6LwCwqf42U", List.of("Amazon"), List.of("Hash Map"), "66.4%"),
            new PlacementProblemDto(2028L, "Number of Distinct Islands", "https://leetcode.com/problems/number-of-distinct-islands/", "https://practice.geeksforgeeks.org/problems/number-of-distinct-islands/1", "https://youtube.com/watch?v=7zmgQsQA2hU", List.of("Amazon"), List.of("Hash Set"), "60.1%"),
            new PlacementProblemDto(2029L, "Group Shifted Strings", "https://leetcode.com/problems/group-shifted-strings/", "https://practice.geeksforgeeks.org/problems/group-shifted-strings/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Meta"), List.of("Hash Map"), "64.5%"),
            new PlacementProblemDto(2030L, "Line Reflection", "https://leetcode.com/problems/line-reflection/", "https://practice.geeksforgeeks.org/problems/line-reflection/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Hash Set"), "34.8%")
        );
    }

    // ─── 3. STRINGS ────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildStringEasy() {
        return List.of(
            new PlacementProblemDto(3001L, "Longest Common Prefix", "https://leetcode.com/problems/longest-common-prefix/", "https://practice.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1", "https://youtube.com/watch?v=0sWShKIJoo4", List.of("Amazon"), List.of("String"), "41.2%"),
            new PlacementProblemDto(3002L, "Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", "https://practice.geeksforgeeks.org/problems/string-palindrome2108/1", "https://youtube.com/watch?v=jJXJ16kP2s4", List.of("Meta"), List.of("String"), "44.3%"),
            new PlacementProblemDto(3003L, "Reverse String", "https://leetcode.com/problems/reverse-string/", "https://practice.geeksforgeeks.org/problems/reverse-a-string/1", "https://youtube.com/watch?v=_d0T_2Lk2qA", List.of("Amazon"), List.of("String"), "77.2%"),
            new PlacementProblemDto(3004L, "Length of Last Word", "https://leetcode.com/problems/length-of-last-word/", "https://practice.geeksforgeeks.org/problems/length-of-last-word/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("String"), "48.1%"),
            new PlacementProblemDto(3005L, "Implement strStr()", "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", "https://practice.geeksforgeeks.org/problems/implement-strstr/1", "https://youtube.com/watch?v=JoF0Z7nVSbA", List.of("Apple"), List.of("String"), "40.2%"),
            new PlacementProblemDto(3006L, "Roman to Integer", "https://leetcode.com/problems/roman-to-integer/", "https://practice.geeksforgeeks.org/problems/roman-number-to-integer3201/1", "https://youtube.com/watch?v=39256v6yYf4", List.of("Amazon"), List.of("Math"), "60.4%"),
            new PlacementProblemDto(3007L, "Excel Sheet Column Title", "https://leetcode.com/problems/excel-sheet-column-title/", "https://practice.geeksforgeeks.org/problems/excel-sheet/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Microsoft"), List.of("String"), "37.5%"),
            new PlacementProblemDto(3008L, "Add Binary", "https://leetcode.com/problems/add-binary/", "https://practice.geeksforgeeks.org/problems/add-binary/1", "https://youtube.com/watch?v=keuWJ47xG8g", List.of("Meta"), List.of("String"), "52.8%"),
            new PlacementProblemDto(3009L, "Valid Palindrome II", "https://leetcode.com/problems/valid-palindrome-ii/", "https://practice.geeksforgeeks.org/problems/valid-palindrome-2/1", "https://youtube.com/watch?v=Jrxokl4yVpU", List.of("Meta"), List.of("String"), "39.8%"),
            new PlacementProblemDto(3010L, "Ransom Note", "https://leetcode.com/problems/ransom-note/", "https://practice.geeksforgeeks.org/problems/ransom-note/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Amazon"), List.of("Hash Map"), "59.8%")
        );
    }

    private List<PlacementProblemDto> buildStringMedium() {
        return List.of(
            new PlacementProblemDto(3011L, "Longest Palindromic Substring", "https://leetcode.com/problems/longest-palindromic-substring/", "https://practice.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1", "https://youtube.com/watch?v=XYQecubCj00", List.of("Amazon", "Meta"), List.of("String"), "32.7%"),
            new PlacementProblemDto(3012L, "String to Integer (atoi)", "https://leetcode.com/problems/string-to-integer-atoi/", "https://practice.geeksforgeeks.org/problems/implement-atoi/1", "https://youtube.com/watch?v=qR19hB3F_K8", List.of("Amazon"), List.of("String"), "16.8%"),
            new PlacementProblemDto(3013L, "Zigzag Conversion", "https://leetcode.com/problems/zigzag-conversion/", "https://practice.geeksforgeeks.org/problems/zigzag-conversion/1", "https://youtube.com/watch?v=Q2Tw63DAwS8", List.of("Paypal"), List.of("String"), "46.2%"),
            new PlacementProblemDto(3014L, "Reverse Words in a String", "https://leetcode.com/problems/reverse-words-in-a-string/", "https://practice.geeksforgeeks.org/problems/reverse-words-in-a-given-string3547/1", "https://youtube.com/watch?v=vhnRAaJeScA", List.of("Amazon"), List.of("String"), "40.5%"),
            new PlacementProblemDto(3015L, "Multiply Strings", "https://leetcode.com/problems/multiply-strings/", "https://practice.geeksforgeeks.org/problems/multiply-two-strings/1", "https://youtube.com/watch?v=1vZc9k5R1zE", List.of("Meta"), List.of("Math"), "39.1%"),
            new PlacementProblemDto(3016L, "Group Shifted Strings", "https://leetcode.com/problems/group-shifted-strings/", "https://practice.geeksforgeeks.org/problems/group-shifted-strings/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Meta"), List.of("Hash Map"), "64.5%"),
            new PlacementProblemDto(3017L, "Compare Version Numbers", "https://leetcode.com/problems/compare-version-numbers/", "https://practice.geeksforgeeks.org/problems/compare-version-numbers/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Apple"), List.of("String"), "36.8%"),
            new PlacementProblemDto(3018L, "Count and Say", "https://leetcode.com/problems/count-and-say/", "https://practice.geeksforgeeks.org/problems/count-and-say/1", "https://youtube.com/watch?v=1YUqtoT9YoE", List.of("Meta"), List.of("String"), "53.2%"),
            new PlacementProblemDto(3019L, "Minimum Time Difference", "https://leetcode.com/problems/minimum-time-difference/", "https://practice.geeksforgeeks.org/problems/min-time-diff/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Math"), "56.4%"),
            new PlacementProblemDto(3020L, "Palindromic Substrings (Count All)", "https://leetcode.com/problems/palindromic-substrings/", "https://practice.geeksforgeeks.org/problems/count-palindrome-sub-strings-of-a-string0652/1", "https://youtube.com/watch?v=4RACzI5-du8", List.of("Meta"), List.of("String"), "68.2%")
        );
    }

    private List<PlacementProblemDto> buildStringHard() {
        return List.of(
            new PlacementProblemDto(3021L, "Text Justification", "https://leetcode.com/problems/text-justification/", "https://practice.geeksforgeeks.org/problems/text-justification/1", "https://youtube.com/watch?v=G7LDMKW6608", List.of("Google", "Meta"), List.of("String"), "40.8%"),
            new PlacementProblemDto(3022L, "Distinct Subsequences", "https://leetcode.com/problems/distinct-subsequences/", "https://practice.geeksforgeeks.org/problems/number-of-distinct-subsequences0941/1", "https://youtube.com/watch?v=mPqqXh8XvWY", List.of("Google"), List.of("String DP"), "45.1%"),
            new PlacementProblemDto(3023L, "Shortest Palindrome (KMP Algorithm)", "https://leetcode.com/problems/shortest-palindrome/", "https://practice.geeksforgeeks.org/problems/shortest-palindrome/1", "https://youtube.com/watch?v=c4akcq0ce1U", List.of("Google"), List.of("KMP"), "32.8%"),
            new PlacementProblemDto(3024L, "Minimum Window Subsequence", "https://leetcode.com/problems/minimum-window-subsequence/", "https://practice.geeksforgeeks.org/problems/min-window-subsequence/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("String DP"), "43.2%"),
            new PlacementProblemDto(3025L, "Wildcard Matching", "https://leetcode.com/problems/wildcard-matching/", "https://practice.geeksforgeeks.org/problems/wildcard-pattern-matching/1", "https://youtube.com/watch?v=3ZDZ-N0EPV0", List.of("Google"), List.of("2D DP"), "27.5%"),
            new PlacementProblemDto(3026L, "Regular Expression Matching", "https://leetcode.com/problems/regular-expression-matching/", "https://practice.geeksforgeeks.org/problems/regular-expression-matching/1", "https://youtube.com/watch?v=HAA8mg6txX0", List.of("Google"), List.of("2D DP"), "28.1%"),
            new PlacementProblemDto(3027L, "Integer to English Words", "https://leetcode.com/problems/integer-to-english-words/", "https://practice.geeksforgeeks.org/problems/convert-number-to-words/1", "https://youtube.com/watch?v=qwt_m656SL8", List.of("Meta"), List.of("String"), "30.4%"),
            new PlacementProblemDto(3028L, "Orderly Queue", "https://leetcode.com/problems/orderly-queue/", "https://practice.geeksforgeeks.org/problems/orderly-queue/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("String"), "64.8%"),
            new PlacementProblemDto(3029L, "Word Break II (Generate All Sentences)", "https://leetcode.com/problems/word-break-ii/", "https://practice.geeksforgeeks.org/problems/word-break-part-23241/1", "https://youtube.com/watch?v=9g0n6P97o8Q", List.of("Amazon"), List.of("Backtracking"), "47.2%"),
            new PlacementProblemDto(3030L, "Stream of Characters (Aho-Corasick / Trie)", "https://leetcode.com/problems/stream-of-characters/", "https://practice.geeksforgeeks.org/problems/stream-characters/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("Trie"), "51.4%")
        );
    }

    // ─── 4. TWO POINTERS ───────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildTwoPointerEasy() {
        return List.of(
            new PlacementProblemDto(4001L, "Two Sum II - Input Array Is Sorted", "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", "https://practice.geeksforgeeks.org/problems/pair-with-given-sum-in-a-sorted-array4940/1", "https://youtube.com/watch?v=cQ1Oz4ckceM", List.of("Amazon"), List.of("Two Pointers"), "60.1%"),
            new PlacementProblemDto(4002L, "Squares of a Sorted Array", "https://leetcode.com/problems/squares-of-a-sorted-array/", "https://practice.geeksforgeeks.org/problems/sort-an-array-of-elements/1", "https://youtube.com/watch?v=FPCZsG_AkUg", List.of("Meta"), List.of("Two Pointers"), "72.3%"),
            new PlacementProblemDto(4003L, "Merge Sorted Array", "https://leetcode.com/problems/merge-sorted-array/", "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1", "https://youtube.com/watch?v=P1Ic85RarKY", List.of("Amazon"), List.of("Two Pointers"), "47.8%"),
            new PlacementProblemDto(4004L, "Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", "https://practice.geeksforgeeks.org/problems/string-palindrome2108/1", "https://youtube.com/watch?v=jJXJ16kP2s4", List.of("Meta"), List.of("Two Pointers"), "44.3%"),
            new PlacementProblemDto(4005L, "Is Subsequence", "https://leetcode.com/problems/is-subsequence/", "https://practice.geeksforgeeks.org/problems/check-for-subsequence4930/1", "https://youtube.com/watch?v=99rvwl65hTU", List.of("Amazon"), List.of("Two Pointers"), "47.8%"),
            new PlacementProblemDto(4006L, "Reverse Vowels of a String", "https://leetcode.com/problems/reverse-vowels-of-a-string/", "https://practice.geeksforgeeks.org/problems/reversing-the-vowels5323/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Apple"), List.of("Two Pointers"), "51.4%"),
            new PlacementProblemDto(4007L, "Remove Element", "https://leetcode.com/problems/remove-element/", "https://practice.geeksforgeeks.org/problems/remove-element/1", "https://youtube.com/watch?v=PlnLUc1z5h0", List.of("Microsoft"), List.of("Two Pointers"), "54.8%"),
            new PlacementProblemDto(4008L, "Backspace String Compare", "https://leetcode.com/problems/backspace-string-compare/", "https://practice.geeksforgeeks.org/problems/backspace-string-compare/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Two Pointers"), "48.2%"),
            new PlacementProblemDto(4009L, "Sort Array By Parity", "https://leetcode.com/problems/sort-array-by-parity/", "https://practice.geeksforgeeks.org/problems/sort-array-by-parity/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Two Pointers"), "76.1%"),
            new PlacementProblemDto(4010L, "Flipping an Image", "https://leetcode.com/problems/flipping-an-image/", "https://practice.geeksforgeeks.org/problems/flipping-an-image/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Two Pointers"), "81.2%")
        );
    }

    private List<PlacementProblemDto> buildTwoPointerMedium() {
        return List.of(
            new PlacementProblemDto(4011L, "3Sum", "https://leetcode.com/problems/3sum/", "https://practice.geeksforgeeks.org/problems/find-triplets-with-zero-sum/1", "https://youtube.com/watch?v=jzZsG8n2B9A", List.of("Amazon", "Meta"), List.of("Two Pointers"), "32.5%"),
            new PlacementProblemDto(4012L, "Container With Most Water", "https://leetcode.com/problems/container-with-most-water/", "https://practice.geeksforgeeks.org/problems/container-with-most-water-1587115620/1", "https://youtube.com/watch?v=UuiTKBwPgAo", List.of("Amazon", "Google"), List.of("Two Pointers"), "54.1%"),
            new PlacementProblemDto(4013L, "4Sum", "https://leetcode.com/problems/4sum/", "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1", "https://youtube.com/watch?v=eD95WRBhKZk", List.of("Amazon"), List.of("Two Pointers"), "36.2%"),
            new PlacementProblemDto(4014L, "3Sum Closest", "https://leetcode.com/problems/3sum-closest/", "https://practice.geeksforgeeks.org/problems/3-sum-closest/1", "https://youtube.com/watch?v=qBr2HQ4LYAc", List.of("Amazon"), List.of("Two Pointers"), "45.8%"),
            new PlacementProblemDto(4015L, "Sort Colors", "https://leetcode.com/problems/sort-colors/", "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1", "https://youtube.com/watch?v=tp8JIuCXBaU", List.of("Microsoft"), List.of("Two Pointers"), "60.4%"),
            new PlacementProblemDto(4016L, "Subarray Product Less Than K", "https://leetcode.com/problems/subarray-product-less-than-k/", "https://practice.geeksforgeeks.org/problems/count-the-subarrays-having-product-less-than-k1708/1", "https://youtube.com/watch?v=Cg6_nF75iR8", List.of("Amazon"), List.of("Two Pointers"), "46.2%"),
            new PlacementProblemDto(4017L, "Partition Labels", "https://leetcode.com/problems/partition-labels/", "https://practice.geeksforgeeks.org/problems/partition-labels/1", "https://youtube.com/watch?v=B7m8UmZE-vw", List.of("Amazon"), List.of("Two Pointers"), "79.8%"),
            new PlacementProblemDto(4018L, "Boats to Save People", "https://leetcode.com/problems/boats-to-save-people/", "https://practice.geeksforgeeks.org/problems/boats-to-save-people/1", "https://youtube.com/watch?v=v-6M4h21568", List.of("Google"), List.of("Two Pointers"), "53.9%"),
            new PlacementProblemDto(4019L, "Push Dominoes", "https://leetcode.com/problems/push-dominoes/", "https://practice.geeksforgeeks.org/problems/push-dominoes/1", "https://youtube.com/watch?v=evUfsG_tJtE", List.of("Meta"), List.of("Two Pointers"), "56.4%"),
            new PlacementProblemDto(4020L, "String Compression", "https://leetcode.com/problems/string-compression/", "https://practice.geeksforgeeks.org/problems/string-compression/1", "https://youtube.com/watch?v=cFabMOnJaq0", List.of("Microsoft"), List.of("Two Pointers"), "52.1%")
        );
    }

    private List<PlacementProblemDto> buildTwoPointerHard() {
        return List.of(
            new PlacementProblemDto(4021L, "Trapping Rain Water", "https://leetcode.com/problems/trapping-rain-water/", "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1", "https://youtube.com/watch?v=ZI2z5pq0TqA", List.of("Amazon", "Google"), List.of("Two Pointers"), "58.7%"),
            new PlacementProblemDto(4022L, "Minimum Window Substring", "https://leetcode.com/problems/minimum-window-substring/", "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1", "https://youtube.com/watch?v=jSto0O4AJbM", List.of("Meta"), List.of("Two Pointers"), "41.2%"),
            new PlacementProblemDto(4023L, "Subarrays with K Different Integers", "https://leetcode.com/problems/subarrays-with-k-different-integers/", "https://practice.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1", "https://youtube.com/watch?v=etI6HqWVa8U", List.of("Amazon"), List.of("Two Pointers"), "56.8%"),
            new PlacementProblemDto(4024L, "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", "https://practice.geeksforgeeks.org/problems/shortest-subarray-with-sum-at-least-k/1", "https://youtube.com/watch?v=K03X458wA8c", List.of("Google"), List.of("Two Pointers"), "30.1%"),
            new PlacementProblemDto(4025L, "Max Chunks To Make Sorted II", "https://leetcode.com/problems/max-chunks-to-make-sorted-ii/", "https://practice.geeksforgeeks.org/problems/max-chunks-to-make-sorted/1", "https://youtube.com/watch?v=NnJp27sI148", List.of("Google"), List.of("Two Pointers"), "53.0%"),
            new PlacementProblemDto(4026L, "Find the Duplicate Number (Floyd Cycle)", "https://leetcode.com/problems/find-the-duplicate-number/", "https://practice.geeksforgeeks.org/problems/duplicate-number/1", "https://youtube.com/watch?v=wjYnzkAhcNk", List.of("Amazon"), List.of("Floyd Pointers"), "59.2%"),
            new PlacementProblemDto(4027L, "Number of Subarrays with Bounded Maximum", "https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/", "https://practice.geeksforgeeks.org/problems/subarrays-bounded-maximum/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Two Pointers"), "52.8%"),
            new PlacementProblemDto(4028L, "Smallest Range Covering Elements from K Lists", "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", "https://practice.geeksforgeeks.org/problems/smallest-range-in-k-lists/1", "https://youtube.com/watch?v=0I6lA01xN8g", List.of("Amazon"), List.of("Two Pointers"), "61.4%"),
            new PlacementProblemDto(4029L, "Heaters (Radius Search)", "https://leetcode.com/problems/heaters/", "https://practice.geeksforgeeks.org/problems/heaters/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Two Pointers"), "36.8%"),
            new PlacementProblemDto(4030L, "Count Subarrays With Median K", "https://leetcode.com/problems/count-subarrays-with-median-k/", "https://practice.geeksforgeeks.org/problems/median-k/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Two Pointers"), "44.1%")
        );
    }

    // ─── 5. SLIDING WINDOW ─────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildSlidingWindowEasy() {
        return List.of(
            new PlacementProblemDto(5001L, "Maximum Average Subarray I", "https://leetcode.com/problems/maximum-average-subarray-i/", "https://practice.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1", "https://youtube.com/watch?v=56XsB4LliL8", List.of("Google"), List.of("Sliding Window"), "43.7%"),
            new PlacementProblemDto(5002L, "Contains Duplicate II (Window Hash)", "https://leetcode.com/problems/contains-duplicate-ii/", "https://practice.geeksforgeeks.org/problems/contains-duplicate-2/1", "https://youtube.com/watch?v=ypn0aZ0NrL4", List.of("Airbnb"), List.of("Sliding Window"), "42.8%"),
            new PlacementProblemDto(5003L, "Defuse the Bomb", "https://leetcode.com/problems/defuse-the-bomb/", "https://practice.geeksforgeeks.org/problems/defuse-bomb/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Sliding Window"), "65.1%"),
            new PlacementProblemDto(5004L, "Minimum Recolors to Get K Consecutive Black Blocks", "https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/", "https://practice.geeksforgeeks.org/problems/recolors/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Sliding Window"), "58.9%"),
            new PlacementProblemDto(5005L, "K Radius Subarray Averages", "https://leetcode.com/problems/k-radius-subarray-averages/", "https://practice.geeksforgeeks.org/problems/k-radius/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Sliding Window"), "66.4%"),
            new PlacementProblemDto(5006L, "Substrings of Size Three with Distinct Characters", "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/", "https://practice.geeksforgeeks.org/problems/substrings-size-three/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Sliding Window"), "71.2%"),
            new PlacementProblemDto(5007L, "Maximum Number of Vowels in a Substring of Given Length", "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/", "https://practice.geeksforgeeks.org/problems/max-vowels/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Sliding Window"), "58.1%"),
            new PlacementProblemDto(5008L, "Number of Sub-arrays of Size K and Average >= Threshold", "https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/", "https://practice.geeksforgeeks.org/problems/subarrays-threshold/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Sliding Window"), "67.8%"),
            new PlacementProblemDto(5009L, "Find All Anagrams in a String", "https://leetcode.com/problems/find-all-anagrams-in-a-string/", "https://practice.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1", "https://youtube.com/watch?v=G8vO80G7xU0", List.of("Amazon"), List.of("Sliding Window"), "50.4%"),
            new PlacementProblemDto(5010L, "Diet Plan Performance", "https://leetcode.com/problems/diet-plan-performance/", "https://practice.geeksforgeeks.org/problems/diet-plan/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Amazon"), List.of("Sliding Window"), "55.8%")
        );
    }

    private List<PlacementProblemDto> buildSlidingWindowMedium() {
        return List.of(
            new PlacementProblemDto(5011L, "Longest Substring Without Repeating Characters", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1", "https://youtube.com/watch?v=wiGpQwVHdE0", List.of("Amazon", "Google"), List.of("Sliding Window"), "34.1%"),
            new PlacementProblemDto(5012L, "Longest Repeating Character Replacement", "https://leetcode.com/problems/longest-repeating-character-replacement/", "https://practice.geeksforgeeks.org/problems/longest-repeating-character-replacement/1", "https://youtube.com/watch?v=gqXU1UyA8pk", List.of("Amazon"), List.of("Sliding Window"), "52.8%"),
            new PlacementProblemDto(5013L, "Permutation in String", "https://leetcode.com/problems/permutation-in-string/", "https://practice.geeksforgeeks.org/problems/permutation-in-string/1", "https://youtube.com/watch?v=UbyhDeMBMDg", List.of("Microsoft"), List.of("Sliding Window"), "44.6%"),
            new PlacementProblemDto(5014L, "Max Consecutive Ones III", "https://leetcode.com/problems/max-consecutive-ones-iii/", "https://practice.geeksforgeeks.org/problems/maximize-number-of-1s2152/1", "https://youtube.com/watch?v=3E4JBHSLpYk", List.of("Meta"), List.of("Sliding Window"), "63.2%"),
            new PlacementProblemDto(5015L, "Minimum Size Subarray Sum", "https://leetcode.com/problems/minimum-size-subarray-sum/", "https://practice.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1", "https://youtube.com/watch?v=aYqYMIJLN5Y", List.of("Amazon"), List.of("Sliding Window"), "46.1%"),
            new PlacementProblemDto(5016L, "Fruit Into Baskets", "https://leetcode.com/problems/fruit-into-baskets/", "https://practice.geeksforgeeks.org/problems/fruit-into-baskets-1663137462/1", "https://youtube.com/watch?v=yYtaV0G3HBQ", List.of("Google"), List.of("Sliding Window"), "43.9%"),
            new PlacementProblemDto(5017L, "Frequency of the Most Frequent Element", "https://leetcode.com/problems/frequency-of-the-most-frequent-element/", "https://practice.geeksforgeeks.org/problems/most-frequent-element/1", "https://youtube.com/watch?v=vgBrQ0nM5vE", List.of("Meta"), List.of("Sliding Window"), "40.8%"),
            new PlacementProblemDto(5018L, "Grumpy Bookstore Owner", "https://leetcode.com/problems/grumpy-bookstore-owner/", "https://practice.geeksforgeeks.org/problems/bookstore-owner/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Sliding Window"), "57.4%"),
            new PlacementProblemDto(5019L, "Maximum Points You Can Obtain from Cards", "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", "https://practice.geeksforgeeks.org/problems/max-points-cards/1", "https://youtube.com/watch?v=TsA4vBtWnVo", List.of("Google"), List.of("Sliding Window"), "52.9%"),
            new PlacementProblemDto(5020L, "Get Equal Substrings Within Budget", "https://leetcode.com/problems/get-equal-substrings-within-budget/", "https://practice.geeksforgeeks.org/problems/equal-substrings/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Sliding Window"), "49.1%")
        );
    }

    private List<PlacementProblemDto> buildSlidingWindowHard() {
        return List.of(
            new PlacementProblemDto(5021L, "Minimum Window Substring", "https://leetcode.com/problems/minimum-window-substring/", "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1", "https://youtube.com/watch?v=jSto0O4AJbM", List.of("Meta", "Google"), List.of("Sliding Window"), "41.2%"),
            new PlacementProblemDto(5022L, "Sliding Window Maximum", "https://leetcode.com/problems/sliding-window-maximum/", "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1", "https://youtube.com/watch?v=DfljaUwZsOk", List.of("Amazon", "Google"), List.of("Sliding Window"), "46.5%"),
            new PlacementProblemDto(5023L, "Subarrays with K Different Integers", "https://leetcode.com/problems/subarrays-with-k-different-integers/", "https://practice.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1", "https://youtube.com/watch?v=etI6HqWVa8U", List.of("Amazon"), List.of("Sliding Window"), "56.8%"),
            new PlacementProblemDto(5024L, "Longest Substring with At Most K Distinct Characters", "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/", "https://practice.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1", "https://youtube.com/watch?v=MK-NZ4hN7SM", List.of("Google"), List.of("Sliding Window"), "47.2%"),
            new PlacementProblemDto(5025L, "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", "https://practice.geeksforgeeks.org/problems/shortest-subarray-with-sum-at-least-k/1", "https://youtube.com/watch?v=K03X458wA8c", List.of("Google"), List.of("Sliding Window"), "30.1%"),
            new PlacementProblemDto(5026L, "Minimum Window Subsequence", "https://leetcode.com/problems/minimum-window-subsequence/", "https://practice.geeksforgeeks.org/problems/min-window-subsequence/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Sliding Window"), "43.2%"),
            new PlacementProblemDto(5027L, "Maximum Number of Robots Within Budget", "https://leetcode.com/problems/maximum-number-of-robots-within-budget/", "https://practice.geeksforgeeks.org/problems/robots-budget/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Sliding Window"), "34.8%"),
            new PlacementProblemDto(5028L, "Longest Continuous Subarray With Absolute Diff <= Limit", "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", "https://practice.geeksforgeeks.org/problems/diff-limit-subarray/1", "https://youtube.com/watch?v=Lk3n0lPjMv0", List.of("Google"), List.of("Sliding Window"), "50.1%"),
            new PlacementProblemDto(5029L, "Subarray Sums Divisible by K", "https://leetcode.com/problems/subarray-sums-divisible-by-k/", "https://practice.geeksforgeeks.org/problems/subarrays-with-sum-divisible-by-k/1", "https://youtube.com/watch?v=77naw9h2Dng", List.of("Amazon"), List.of("Sliding Window"), "53.8%"),
            new PlacementProblemDto(5030L, "Replace the Substring for Balanced String", "https://leetcode.com/problems/replace-the-substring-for-balanced-string/", "https://practice.geeksforgeeks.org/problems/balanced-string-replace/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Sliding Window"), "37.2%")
        );
    }

    // ─── 6. RECURSION ──────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildRecursionEasy() {
        return List.of(
            new PlacementProblemDto(6001L, "Fibonacci Number", "https://leetcode.com/problems/fibonacci-number/", "https://practice.geeksforgeeks.org/problems/nth-fibonacci-number1335/1", "https://youtube.com/watch?v=VypR2BvM5x0", List.of("Amazon"), List.of("Recursion"), "70.2%"),
            new PlacementProblemDto(6002L, "Power of Two", "https://leetcode.com/problems/power-of-two/", "https://practice.geeksforgeeks.org/problems/power-of-2-1587115620/1", "https://youtube.com/watch?v=4cqHwXb9tFA", List.of("Amazon"), List.of("Recursion"), "45.9%"),
            new PlacementProblemDto(6003L, "Power of Three", "https://leetcode.com/problems/power-of-three/", "https://practice.geeksforgeeks.org/problems/power-of-3/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Recursion"), "44.8%"),
            new PlacementProblemDto(6004L, "Power of Four", "https://leetcode.com/problems/power-of-four/", "https://practice.geeksforgeeks.org/problems/power-of-4/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Recursion"), "46.1%"),
            new PlacementProblemDto(6005L, "Reverse String (Recursive)", "https://leetcode.com/problems/reverse-string/", "https://practice.geeksforgeeks.org/problems/reverse-a-string/1", "https://youtube.com/watch?v=_d0T_2Lk2qA", List.of("Apple"), List.of("Recursion"), "77.2%"),
            new PlacementProblemDto(6006L, "Check Array Is Sorted (Recursive)", "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", "https://practice.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Microsoft"), List.of("Recursion"), "51.8%"),
            new PlacementProblemDto(6007L, "Factorial Trailing Zeroes", "https://leetcode.com/problems/factorial-trailing-zeroes/", "https://practice.geeksforgeeks.org/problems/trailing-zeroes-in-factorial5134/1", "https://youtube.com/watch?v=fx8rUY_iIms", List.of("Bloomberg"), List.of("Math"), "42.5%"),
            new PlacementProblemDto(6008L, "Sum of Natural Numbers (Recursive)", "https://leetcode.com/problems/sum-of-natural-numbers/", "https://practice.geeksforgeeks.org/problems/sum-of-first-n-terms5842/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Recursion"), "82.4%"),
            new PlacementProblemDto(6009L, "Print 1 to N Without Loop", "https://leetcode.com/problems/print-1-to-n/", "https://practice.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Recursion"), "78.9%"),
            new PlacementProblemDto(6010L, "Print N to 1 Without Loop", "https://leetcode.com/problems/print-n-to-1/", "https://practice.geeksforgeeks.org/problems/print-n-to-1-without-loop/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Amazon"), List.of("Recursion"), "77.1%")
        );
    }

    private List<PlacementProblemDto> buildRecursionMedium() {
        return List.of(
            new PlacementProblemDto(6011L, "Pow(x, n) - Binary Exponentiation", "https://leetcode.com/problems/powx-n/", "https://practice.geeksforgeeks.org/problems/power-of-numbers-1587115620/1", "https://youtube.com/watch?v=g9YQyYi4IQQ", List.of("Google", "Meta"), List.of("Recursion"), "33.8%"),
            new PlacementProblemDto(6012L, "K-th Symbol in Grammar", "https://leetcode.com/problems/k-th-symbol-in-grammar/", "https://practice.geeksforgeeks.org/problems/k-th-symbol-in-grammar/1", "https://youtube.com/watch?v=5P84A0Y6_Z8", List.of("Google"), List.of("Recursion"), "52.1%"),
            new PlacementProblemDto(6013L, "Tower of Hanoi", "https://leetcode.com/problems/tower-of-hanoi/", "https://practice.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1", "https://youtube.com/watch?v=q6RicK1FCUs", List.of("Amazon"), List.of("Recursion"), "68.4%"),
            new PlacementProblemDto(6014L, "Count Good Numbers", "https://leetcode.com/problems/count-good-numbers/", "https://practice.geeksforgeeks.org/problems/count-good-numbers/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Recursion"), "44.9%"),
            new PlacementProblemDto(6015L, "Sort a Stack Using Recursion", "https://leetcode.com/problems/sort-a-stack/", "https://practice.geeksforgeeks.org/problems/sort-a-stack/1", "https://youtube.com/watch?v=dREG3V8hbpc", List.of("Amazon"), List.of("Recursion"), "74.8%"),
            new PlacementProblemDto(6016L, "Reverse a Stack Using Recursion", "https://leetcode.com/problems/reverse-a-stack/", "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1", "https://youtube.com/watch?v=8YXQ68oHjAs", List.of("Amazon"), List.of("Recursion"), "79.1%"),
            new PlacementProblemDto(6017L, "Generate Parentheses", "https://leetcode.com/problems/generate-parentheses/", "https://practice.geeksforgeeks.org/problems/generate-all-possible-parentheses/1", "https://youtube.com/watch?v=s9fokUqJ76A", List.of("Meta"), List.of("Recursion"), "73.2%"),
            new PlacementProblemDto(6018L, "Better String (Distinct Subsequences)", "https://leetcode.com/problems/better-string/", "https://practice.geeksforgeeks.org/problems/better-string/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Amazon"), List.of("Recursion"), "58.2%"),
            new PlacementProblemDto(6019L, "Perfect Sum Problem", "https://leetcode.com/problems/perfect-sum/", "https://practice.geeksforgeeks.org/problems/perfect-sum-problem5633/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Recursion"), "34.5%"),
            new PlacementProblemDto(6020L, "Combination Sum III", "https://leetcode.com/problems/combination-sum-iii/", "https://practice.geeksforgeeks.org/problems/combination-sum-iii/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Recursion"), "68.2%")
        );
    }

    private List<PlacementProblemDto> buildRecursionHard() {
        return List.of(
            new PlacementProblemDto(6021L, "Josephus Problem", "https://leetcode.com/problems/find-the-winner-of-the-circular-game/", "https://practice.geeksforgeeks.org/problems/josephus-problem/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Recursion"), "79.2%"),
            new PlacementProblemDto(6022L, "Parsing A Boolean Expression", "https://leetcode.com/problems/parsing-a-boolean-expression/", "https://practice.geeksforgeeks.org/problems/parsing-a-boolean-expression/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Recursion"), "58.9%"),
            new PlacementProblemDto(6023L, "Basic Calculator (Recursive Parser)", "https://leetcode.com/problems/basic-calculator/", "https://practice.geeksforgeeks.org/problems/basic-calculator/1", "https://youtube.com/watch?v=0811TZLAHJw", List.of("Google"), List.of("Recursion"), "42.5%"),
            new PlacementProblemDto(6024L, "Expression Add Operators", "https://leetcode.com/problems/expression-add-operators/", "https://practice.geeksforgeeks.org/problems/expression-add-operators/1", "https://youtube.com/watch?v=v0e8p9yV9iM", List.of("Google", "Meta"), List.of("Recursion"), "39.4%"),
            new PlacementProblemDto(6025L, "Word Break II", "https://leetcode.com/problems/word-break-ii/", "https://practice.geeksforgeeks.org/problems/word-break-part-23241/1", "https://youtube.com/watch?v=9g0n6P97o8Q", List.of("Amazon"), List.of("Recursion"), "47.2%"),
            new PlacementProblemDto(6026L, "Number of Atoms (Recursive Chemical Parser)", "https://leetcode.com/problems/number-of-atoms/", "https://practice.geeksforgeeks.org/problems/number-of-atoms/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Recursion"), "53.9%"),
            new PlacementProblemDto(6027L, "Mini Parser (Nested String JSON)", "https://leetcode.com/problems/mini-parser/", "https://practice.geeksforgeeks.org/problems/mini-parser/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("Recursion"), "36.8%"),
            new PlacementProblemDto(6028L, "Ternary Expression Parser", "https://leetcode.com/problems/ternary-expression-parser/", "https://practice.geeksforgeeks.org/problems/ternary-parser/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Recursion"), "59.2%"),
            new PlacementProblemDto(6029L, "Find Kth Bit in Nth Binary String", "https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/", "https://practice.geeksforgeeks.org/problems/kth-bit/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Recursion"), "58.4%"),
            new PlacementProblemDto(6030L, "Special Binary String", "https://leetcode.com/problems/special-binary-string/", "https://practice.geeksforgeeks.org/problems/special-binary-string/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Recursion"), "56.2%")
        );
    }

    // ─── 7. BACKTRACKING ───────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildBacktrackingEasy() {
        return List.of(
            new PlacementProblemDto(7001L, "Binary Watch", "https://leetcode.com/problems/binary-watch/", "https://practice.geeksforgeeks.org/problems/binary-watch/1", "https://youtube.com/watch?v=xV6S8Wp7QoE", List.of("Google"), List.of("Backtracking"), "52.4%"),
            new PlacementProblemDto(7002L, "Sum of All Subset XOR Totals", "https://leetcode.com/problems/sum-of-all-subset-xor-totals/", "https://practice.geeksforgeeks.org/problems/subset-xor/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Backtracking"), "81.2%"),
            new PlacementProblemDto(7003L, "Letter Case Permutation", "https://leetcode.com/problems/letter-case-permutation/", "https://practice.geeksforgeeks.org/problems/letter-case-permutation/1", "https://youtube.com/watch?v=41OihB35Zmk", List.of("Amazon"), List.of("Backtracking"), "73.5%"),
            new PlacementProblemDto(7004L, "Fair Distribution of Cookies (Easy)", "https://leetcode.com/problems/fair-distribution-of-cookies/", "https://practice.geeksforgeeks.org/problems/cookies-distribution/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("Backtracking"), "63.8%"),
            new PlacementProblemDto(7005L, "Iterator for Combination", "https://leetcode.com/problems/iterator-for-combination/", "https://practice.geeksforgeeks.org/problems/combination-iterator/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Backtracking"), "72.4%"),
            new PlacementProblemDto(7006L, "Combinations (N Choose K)", "https://leetcode.com/problems/combinations/", "https://practice.geeksforgeeks.org/problems/combinations/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Backtracking"), "67.9%"),
            new PlacementProblemDto(7007L, "Generate Binary Strings Without Consecutive 1s", "https://leetcode.com/problems/generate-binary-strings/", "https://practice.geeksforgeeks.org/problems/generate-binary-strings/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Backtracking"), "79.1%"),
            new PlacementProblemDto(7008L, "Target Sum (Subset Sign Variations)", "https://leetcode.com/problems/target-sum/", "https://practice.geeksforgeeks.org/problems/target-sum/1", "https://youtube.com/watch?v=g0npyaQtAQM", List.of("Amazon"), List.of("Backtracking"), "46.2%"),
            new PlacementProblemDto(7009L, "Maximum Length of a Concatenated String with Unique Characters", "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/", "https://practice.geeksforgeeks.org/problems/concat-string/1", "https://youtube.com/watch?v=d4EDLuQ4188", List.of("Amazon"), List.of("Backtracking"), "52.8%"),
            new PlacementProblemDto(7010L, "Count Numbers with Unique Digits", "https://leetcode.com/problems/count-numbers-with-unique-digits/", "https://practice.geeksforgeeks.org/problems/unique-digits/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Backtracking"), "51.4%")
        );
    }

    private List<PlacementProblemDto> buildBacktrackingMedium() {
        return List.of(
            new PlacementProblemDto(7011L, "Subsets (Power Set)", "https://leetcode.com/problems/subsets/", "https://practice.geeksforgeeks.org/problems/subsets-1615024039/1", "https://youtube.com/watch?v=REOH22Xwdkk", List.of("Amazon", "Meta"), List.of("Backtracking"), "75.9%"),
            new PlacementProblemDto(7012L, "Permutations", "https://leetcode.com/problems/permutations/", "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1", "https://youtube.com/watch?v=s7AvT7cGdSo", List.of("Amazon", "Google"), List.of("Backtracking"), "76.8%"),
            new PlacementProblemDto(7013L, "Combination Sum", "https://leetcode.com/problems/combination-sum/", "https://practice.geeksforgeeks.org/problems/combination-sum-1587115620/1", "https://youtube.com/watch?v=GBKI9VSKdGg", List.of("Amazon"), List.of("Backtracking"), "69.8%"),
            new PlacementProblemDto(7014L, "Word Search", "https://leetcode.com/problems/word-search/", "https://practice.geeksforgeeks.org/problems/word-search/1", "https://youtube.com/watch?v=pfiQ_PS1g8E", List.of("Amazon", "Google"), List.of("Backtracking"), "40.6%"),
            new PlacementProblemDto(7015L, "Subsets II (With Duplicates)", "https://leetcode.com/problems/subsets-ii/", "https://practice.geeksforgeeks.org/problems/subsets-ii/1", "https://youtube.com/watch?v=Vn2v6ajA7U0", List.of("Amazon"), List.of("Backtracking"), "56.4%"),
            new PlacementProblemDto(7016L, "Combination Sum II", "https://leetcode.com/problems/combination-sum-ii/", "https://practice.geeksforgeeks.org/problems/combination-sum-ii/1", "https://youtube.com/watch?v=rSA3t6BDDwg", List.of("Amazon"), List.of("Backtracking"), "53.8%"),
            new PlacementProblemDto(7017L, "Permutations II (With Duplicates)", "https://leetcode.com/problems/permutations-ii/", "https://practice.geeksforgeeks.org/problems/unique-permutations/1", "https://youtube.com/watch?v=qhBVWf0YafA", List.of("Google"), List.of("Backtracking"), "57.8%"),
            new PlacementProblemDto(7018L, "Palindrome Partitioning", "https://leetcode.com/problems/palindrome-partitioning/", "https://practice.geeksforgeeks.org/problems/find-all-possible-palindromic-partitions-of-a-string/1", "https://youtube.com/watch?v=3rfujswcTXg", List.of("Meta"), List.of("Backtracking"), "65.9%"),
            new PlacementProblemDto(7019L, "Letter Combinations of a Phone Number", "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", "https://practice.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1", "https://youtube.com/watch?v=0snEunUacQU", List.of("Amazon"), List.of("Backtracking"), "58.2%"),
            new PlacementProblemDto(7020L, "Restore IP Addresses", "https://leetcode.com/problems/restore-ip-addresses/", "https://practice.geeksforgeeks.org/problems/generate-ip-addresses/1", "https://youtube.com/watch?v=61tN4YEdiTM", List.of("Amazon"), List.of("Backtracking"), "48.9%")
        );
    }

    private List<PlacementProblemDto> buildBacktrackingHard() {
        return List.of(
            new PlacementProblemDto(7021L, "N-Queens", "https://leetcode.com/problems/n-queens/", "https://practice.geeksforgeeks.org/problems/n-queen-problem0315/1", "https://youtube.com/watch?v=Ph95IHmJl5A", List.of("Amazon", "Google"), List.of("Backtracking"), "65.8%"),
            new PlacementProblemDto(7022L, "Sudoku Solver", "https://leetcode.com/problems/sudoku-solver/", "https://practice.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1", "https://youtube.com/watch?v=uyetMAvp5gE", List.of("Google"), List.of("Backtracking"), "59.1%"),
            new PlacementProblemDto(7023L, "N-Queens II (Count Configurations)", "https://leetcode.com/problems/n-queens-ii/", "https://practice.geeksforgeeks.org/problems/n-queens-2/1", "https://youtube.com/watch?v=nalYyLZgvCY", List.of("Google"), List.of("Backtracking"), "72.4%"),
            new PlacementProblemDto(7024L, "Word Search II (Trie + Backtracking Grid)", "https://leetcode.com/problems/word-search-ii/", "https://practice.geeksforgeeks.org/problems/word-boggle4143/1", "https://youtube.com/watch?v=asbcE9mZJqU", List.of("Amazon", "Google"), List.of("Trie Backtracking"), "36.5%"),
            new PlacementProblemDto(7025L, "Rat in a Maze", "https://leetcode.com/problems/rat-in-a-maze/", "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem-1/1", "https://youtube.com/watch?v=bLGZhJlt4y0", List.of("Amazon"), List.of("Backtracking"), "68.2%"),
            new PlacementProblemDto(7026L, "Knight Tour Problem", "https://leetcode.com/problems/check-knight-tour-configuration/", "https://practice.geeksforgeeks.org/problems/knight-tour/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Backtracking"), "56.4%"),
            new PlacementProblemDto(7027L, "Unique Paths III (Visiting Every Cell)", "https://leetcode.com/problems/unique-paths-iii/", "https://practice.geeksforgeeks.org/problems/unique-paths-3/1", "https://youtube.com/watch?v=XHA1bTcKwXA", List.of("Google"), List.of("Backtracking"), "81.5%"),
            new PlacementProblemDto(7028L, "Matchsticks to Square", "https://leetcode.com/problems/matchsticks-to-square/", "https://practice.geeksforgeeks.org/problems/matchsticks/1", "https://youtube.com/watch?v=hUe0cUKV-YY", List.of("Google"), List.of("Backtracking"), "40.2%"),
            new PlacementProblemDto(7029L, "Partition to K Equal Sum Subsets", "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", "https://practice.geeksforgeeks.org/problems/partition-array-to-k-subsets/1", "https://youtube.com/watch?v=mBk4I0X46oI", List.of("Amazon"), List.of("Backtracking"), "37.8%"),
            new PlacementProblemDto(7030L, "Verbal Arithmetic Puzzle (Cryptarithmetic)", "https://leetcode.com/problems/verbal-arithmetic-puzzle/", "https://practice.geeksforgeeks.org/problems/cryptarithmetic/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Backtracking"), "38.9%")
        );
    }

    // ─── 8. LINKED LIST ────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildLinkedListEasy() {
        return List.of(
            new PlacementProblemDto(8001L, "Reverse Linked List", "https://leetcode.com/problems/reverse-linked-list/", "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1", "https://youtube.com/watch?v=G0_I-ZF0S38", List.of("Amazon", "Google"), List.of("Linked List"), "72.1%"),
            new PlacementProblemDto(8002L, "Merge Two Sorted Lists", "https://leetcode.com/problems/merge-two-sorted-lists/", "https://practice.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1", "https://youtube.com/watch?v=XIdigk956u0", List.of("Amazon", "Apple"), List.of("Linked List"), "62.8%"),
            new PlacementProblemDto(8003L, "Linked List Cycle", "https://leetcode.com/problems/linked-list-cycle/", "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1", "https://youtube.com/watch?v=gBTe7lFR3vc", List.of("Amazon"), List.of("Linked List"), "45.5%"),
            new PlacementProblemDto(8004L, "Middle of the Linked List", "https://leetcode.com/problems/middle-of-the-linked-list/", "https://practice.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1", "https://youtube.com/watch?v=A2_ldqM4QCA", List.of("Amazon"), List.of("Linked List"), "75.4%"),
            new PlacementProblemDto(8005L, "Delete Node in a Linked List", "https://leetcode.com/problems/delete-node-in-a-linked-list/", "https://practice.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1", "https://youtube.com/watch?v=icnp4FJdZ_c", List.of("Apple"), List.of("Linked List"), "77.8%"),
            new PlacementProblemDto(8006L, "Palindrome Linked List", "https://leetcode.com/problems/palindrome-linked-list/", "https://practice.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1", "https://youtube.com/watch?v=yOzXms1J6Nk", List.of("Amazon"), List.of("Linked List"), "50.2%"),
            new PlacementProblemDto(8007L, "Intersection of Two Linked Lists", "https://leetcode.com/problems/intersection-of-two-linked-lists/", "https://practice.geeksforgeeks.org/problems/intersection-point-in-y-shaped-linked-lists/1", "https://youtube.com/watch?v=D0X0BONOQhI", List.of("Amazon"), List.of("Linked List"), "55.4%"),
            new PlacementProblemDto(8008L, "Remove Linked List Elements", "https://leetcode.com/problems/remove-linked-list-elements/", "https://practice.geeksforgeeks.org/problems/remove-every-kth-node/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Microsoft"), List.of("Linked List"), "46.9%"),
            new PlacementProblemDto(8009L, "Remove Duplicates from Sorted List", "https://leetcode.com/problems/remove-duplicates-from-sorted-list/", "https://practice.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1", "https://youtube.com/watch?v=dhLtPnu4f1U", List.of("Amazon"), List.of("Linked List"), "51.2%"),
            new PlacementProblemDto(8010L, "Convert Binary Number in a Linked List to Integer", "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/", "https://practice.geeksforgeeks.org/problems/decimal-equivalent-of-binary-linked-list/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Linked List"), "82.5%")
        );
    }

    private List<PlacementProblemDto> buildLinkedListMedium() {
        return List.of(
            new PlacementProblemDto(8011L, "Reorder List", "https://leetcode.com/problems/reorder-list/", "https://practice.geeksforgeeks.org/problems/reorder-list/1", "https://youtube.com/watch?v=S5bfdUtrKLM", List.of("Amazon", "Meta"), List.of("Linked List"), "55.6%"),
            new PlacementProblemDto(8012L, "Remove Nth Node From End of List", "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", "https://practice.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1", "https://youtube.com/watch?v=XVuQxVrfJ24", List.of("Amazon"), List.of("Linked List"), "40.5%"),
            new PlacementProblemDto(8013L, "Add Two Numbers", "https://leetcode.com/problems/add-two-numbers/", "https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1", "https://youtube.com/watch?v=wgFPrzTjm7s", List.of("Amazon", "Google"), List.of("Linked List"), "40.1%"),
            new PlacementProblemDto(8014L, "Copy List with Random Pointer", "https://leetcode.com/problems/copy-list-with-random-pointer/", "https://practice.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1", "https://youtube.com/watch?v=5Y2EiZST97Y", List.of("Amazon"), List.of("Linked List"), "53.2%"),
            new PlacementProblemDto(8015L, "Linked List Cycle II (Find Start)", "https://leetcode.com/problems/linked-list-cycle-ii/", "https://practice.geeksforgeeks.org/problems/find-first-node-of-loop-in-linked-list/1", "https://youtube.com/watch?v=2Kd0KKmmHFc", List.of("Amazon"), List.of("Linked List"), "49.2%"),
            new PlacementProblemDto(8016L, "Sort List (Merge Sort on Nodes)", "https://leetcode.com/problems/sort-list/", "https://practice.geeksforgeeks.org/problems/sort-a-linked-list/1", "https://youtube.com/watch?v=TGveA1oFhrc", List.of("Google"), List.of("Linked List"), "55.9%"),
            new PlacementProblemDto(8017L, "Rotate List", "https://leetcode.com/problems/rotate-list/", "https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1", "https://youtube.com/watch?v=9VPm6nEbVPA", List.of("Amazon"), List.of("Linked List"), "36.8%"),
            new PlacementProblemDto(8018L, "Partition List", "https://leetcode.com/problems/partition-list/", "https://practice.geeksforgeeks.org/problems/partition-a-linked-list-around-given-value/1", "https://youtube.com/watch?v=r3Z5AuhLuhw", List.of("Microsoft"), List.of("Linked List"), "54.1%"),
            new PlacementProblemDto(8019L, "Reverse Linked List II (Range [m, n])", "https://leetcode.com/problems/reverse-linked-list-ii/", "https://practice.geeksforgeeks.org/problems/reverse-a-sublist-of-a-linked-list/1", "https://youtube.com/watch?v=RF_M9tX4Eag", List.of("Amazon"), List.of("Linked List"), "45.8%"),
            new PlacementProblemDto(8020L, "Swap Nodes in Pairs", "https://leetcode.com/problems/swap-nodes-in-pairs/", "https://practice.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1", "https://youtube.com/watch?v=o811TZLAHJw", List.of("Amazon"), List.of("Linked List"), "62.4%")
        );
    }

    private List<PlacementProblemDto> buildLinkedListHard() {
        return List.of(
            new PlacementProblemDto(8021L, "Merge k Sorted Lists", "https://leetcode.com/problems/merge-k-sorted-lists/", "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1", "https://youtube.com/watch?v=q5a5OiGbT6Q", List.of("Amazon", "Google", "Meta"), List.of("Linked List", "Heap"), "50.1%"),
            new PlacementProblemDto(8022L, "LRU Cache", "https://leetcode.com/problems/lru-cache/", "https://practice.geeksforgeeks.org/problems/lru-cache/1", "https://youtube.com/watch?v=7ABFKPK2hD4", List.of("Amazon", "Google", "Meta"), List.of("Doubly Linked List"), "41.6%"),
            new PlacementProblemDto(8023L, "LFU Cache", "https://leetcode.com/problems/lfu-cache/", "https://practice.geeksforgeeks.org/problems/lfu-cache/1", "https://youtube.com/watch?v=0PSB9y8ehbk", List.of("Amazon", "Google"), List.of("Doubly Linked List"), "43.2%"),
            new PlacementProblemDto(8024L, "Reverse Nodes in k-Group", "https://leetcode.com/problems/reverse-nodes-in-k-group/", "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1", "https://youtube.com/watch?v=1UOPsfP85V4", List.of("Amazon", "Google"), List.of("Linked List"), "55.8%"),
            new PlacementProblemDto(8025L, "Flatten a Multilevel Doubly Linked List", "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1", "https://youtube.com/watch?v=K372g14Y2wQ", List.of("Amazon"), List.of("Doubly Linked List"), "59.8%"),
            new PlacementProblemDto(8026L, "Design Phone Directory (Linked List + Bitset)", "https://leetcode.com/problems/design-phone-directory/", "https://practice.geeksforgeeks.org/problems/phone-directory/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Linked List"), "51.4%"),
            new PlacementProblemDto(8027L, "Design SkipList", "https://leetcode.com/problems/design-skiplist/", "https://practice.geeksforgeeks.org/problems/skiplist/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("SkipList"), "60.2%"),
            new PlacementProblemDto(8028L, "Linked List in Binary Tree", "https://leetcode.com/problems/linked-list-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/linked-list-in-binary-tree/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Linked List"), "44.8%"),
            new PlacementProblemDto(8029L, "Split Linked List in Parts", "https://leetcode.com/problems/split-linked-list-in-parts/", "https://practice.geeksforgeeks.org/problems/split-linked-list/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Linked List"), "60.4%"),
            new PlacementProblemDto(8030L, "Odd Even Linked List", "https://leetcode.com/problems/odd-even-linked-list/", "https://practice.geeksforgeeks.org/problems/rearrange-a-linked-list/1", "https://youtube.com/watch?v=YE9GGih6GsU", List.of("Amazon"), List.of("Linked List"), "61.2%")
        );
    }

    // ─── 9. STACK ──────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildStackEasy() {
        return List.of(
            new PlacementProblemDto(9001L, "Valid Parentheses", "https://leetcode.com/problems/valid-parentheses/", "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1", "https://youtube.com/watch?v=WTzjTskDF3k", List.of("Amazon", "Google", "Meta"), List.of("Stack"), "40.2%"),
            new PlacementProblemDto(9002L, "Min Stack", "https://leetcode.com/problems/min-stack/", "https://practice.geeksforgeeks.org/problems/get-minimum-element-from-stack/1", "https://youtube.com/watch?v=qkLl7nAwDPo", List.of("Amazon", "Microsoft"), List.of("Stack"), "53.1%"),
            new PlacementProblemDto(9003L, "Baseball Game", "https://leetcode.com/problems/baseball-game/", "https://practice.geeksforgeeks.org/problems/baseball-game/1", "https://youtube.com/watch?v=Id_tqGevv48", List.of("Amazon"), List.of("Stack"), "74.9%"),
            new PlacementProblemDto(9004L, "Remove Outermost Parentheses", "https://leetcode.com/problems/remove-outermost-parentheses/", "https://practice.geeksforgeeks.org/problems/remove-outermost-parentheses/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Stack"), "80.5%"),
            new PlacementProblemDto(9005L, "Backspace String Compare", "https://leetcode.com/problems/backspace-string-compare/", "https://practice.geeksforgeeks.org/problems/backspace-string-compare/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Stack"), "48.2%"),
            new PlacementProblemDto(9006L, "Remove All Adjacent Duplicates In String", "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", "https://practice.geeksforgeeks.org/problems/remove-all-adjacent-duplicates-in-string/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Amazon"), List.of("Stack"), "70.1%"),
            new PlacementProblemDto(9007L, "Make The String Great", "https://leetcode.com/problems/make-the-string-great/", "https://practice.geeksforgeeks.org/problems/make-the-string-great/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Stack"), "64.8%"),
            new PlacementProblemDto(9008L, "Crawler Log Folder", "https://leetcode.com/problems/crawler-log-folder/", "https://practice.geeksforgeeks.org/problems/crawler-log-folder/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Stack"), "65.9%"),
            new PlacementProblemDto(9009L, "Implement Stack using Queues", "https://leetcode.com/problems/implement-stack-using-queues/", "https://practice.geeksforgeeks.org/problems/stack-using-two-queues/1", "https://youtube.com/watch?v=rW4vhMGp8_Y", List.of("Amazon"), List.of("Stack"), "61.2%"),
            new PlacementProblemDto(9010L, "Final Prices With a Special Discount", "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/", "https://practice.geeksforgeeks.org/problems/final-prices/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Monotonic Stack"), "77.2%")
        );
    }

    private List<PlacementProblemDto> buildStackMedium() {
        return List.of(
            new PlacementProblemDto(9011L, "Evaluate Reverse Polish Notation", "https://leetcode.com/problems/evaluate-reverse-polish-notation/", "https://practice.geeksforgeeks.org/problems/evaluation-of-postfix-expression1735/1", "https://youtube.com/watch?v=iu0082c4Hzk", List.of("Amazon", "Google"), List.of("Stack"), "46.8%"),
            new PlacementProblemDto(9012L, "Daily Temperatures", "https://leetcode.com/problems/daily-temperatures/", "https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1", "https://youtube.com/watch?v=cTBiBSNj1Vs", List.of("Meta", "Amazon"), List.of("Monotonic Stack"), "66.1%"),
            new PlacementProblemDto(9013L, "Online Stock Span", "https://leetcode.com/problems/online-stock-span/", "https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1", "https://youtube.com/watch?v=slYh0ZNEqSW", List.of("Amazon"), List.of("Monotonic Stack"), "65.2%"),
            new PlacementProblemDto(9014L, "Car Fleet", "https://leetcode.com/problems/car-fleet/", "https://practice.geeksforgeeks.org/problems/car-fleet/1", "https://youtube.com/watch?v=Pr6T-3yB9RM", List.of("Google"), List.of("Stack"), "50.4%"),
            new PlacementProblemDto(9015L, "Next Greater Element II", "https://leetcode.com/problems/next-greater-element-ii/", "https://practice.geeksforgeeks.org/problems/next-greater-element-2/1", "https://youtube.com/watch?v=68a1XA_65vE", List.of("Amazon"), List.of("Monotonic Stack"), "63.2%"),
            new PlacementProblemDto(9016L, "Decode String", "https://leetcode.com/problems/decode-string/", "https://practice.geeksforgeeks.org/problems/decode-the-string2444/1", "https://youtube.com/watch?v=qB070id1xuE", List.of("Google", "Amazon"), List.of("Stack"), "58.1%"),
            new PlacementProblemDto(9017L, "Asteroid Collision", "https://leetcode.com/problems/asteroid-collision/", "https://practice.geeksforgeeks.org/problems/asteroid-collision/1", "https://youtube.com/watch?v=LN7CRjxdH_8", List.of("Amazon"), List.of("Stack"), "44.8%"),
            new PlacementProblemDto(9018L, "Remove K Digits", "https://leetcode.com/problems/remove-k-digits/", "https://practice.geeksforgeeks.org/problems/remove-k-digits/1", "https://youtube.com/watch?v=cFabMOnJaq0", List.of("Amazon", "Google"), List.of("Monotonic Stack"), "30.8%"),
            new PlacementProblemDto(9019L, "132 Pattern", "https://leetcode.com/problems/132-pattern/", "https://practice.geeksforgeeks.org/problems/132-pattern/1", "https://youtube.com/watch?v=q5a5OiGbT6Q", List.of("Amazon"), List.of("Monotonic Stack"), "33.1%"),
            new PlacementProblemDto(9020L, "Simplify Path", "https://leetcode.com/problems/simplify-path/", "https://practice.geeksforgeeks.org/problems/simplify-path/1", "https://youtube.com/watch?v=qYlHrAKJ0A0", List.of("Meta"), List.of("Stack"), "40.6%")
        );
    }

    private List<PlacementProblemDto> buildStackHard() {
        return List.of(
            new PlacementProblemDto(9021L, "Largest Rectangle in Histogram", "https://leetcode.com/problems/largest-rectangle-in-histogram/", "https://practice.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1", "https://youtube.com/watch?v=zx5SwJIo67s", List.of("Amazon", "Google", "Meta"), List.of("Monotonic Stack"), "43.1%"),
            new PlacementProblemDto(9022L, "Maximal Rectangle", "https://leetcode.com/problems/maximal-rectangle/", "https://practice.geeksforgeeks.org/problems/max-rectangle/1", "https://youtube.com/watch?v=dAVF2NpC3j4", List.of("Amazon", "Google"), List.of("Monotonic Stack"), "45.8%"),
            new PlacementProblemDto(9023L, "Basic Calculator", "https://leetcode.com/problems/basic-calculator/", "https://practice.geeksforgeeks.org/problems/basic-calculator/1", "https://youtube.com/watch?v=0811TZLAHJw", List.of("Google", "Meta"), List.of("Stack"), "42.5%"),
            new PlacementProblemDto(9024L, "Maximum Frequency Stack", "https://leetcode.com/problems/maximum-frequency-stack/", "https://practice.geeksforgeeks.org/problems/max-frequency-stack/1", "https://youtube.com/watch?v=Z6LwCwqf42U", List.of("Amazon"), List.of("Stack", "Hash Map"), "66.4%"),
            new PlacementProblemDto(9025L, "Sum of Subarray Minimums", "https://leetcode.com/problems/sum-of-subarray-minimums/", "https://practice.geeksforgeeks.org/problems/sum-of-subarray-minimums/1", "https://youtube.com/watch?v=v0e8p9yV9iM", List.of("Amazon"), List.of("Monotonic Stack"), "36.2%"),
            new PlacementProblemDto(9026L, "Sum of Subarray Ranges", "https://leetcode.com/problems/sum-of-subarray-ranges/", "https://practice.geeksforgeeks.org/problems/sum-of-subarray-ranges/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Monotonic Stack"), "61.4%"),
            new PlacementProblemDto(9027L, "Number of Atoms", "https://leetcode.com/problems/number-of-atoms/", "https://practice.geeksforgeeks.org/problems/number-of-atoms/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Stack"), "53.9%"),
            new PlacementProblemDto(9028L, "Parsing A Boolean Expression", "https://leetcode.com/problems/parsing-a-boolean-expression/", "https://practice.geeksforgeeks.org/problems/parsing-a-boolean-expression/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Stack"), "58.9%"),
            new PlacementProblemDto(9029L, "Check If Word Is Valid After Substitutions", "https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/", "https://practice.geeksforgeeks.org/problems/valid-word-substitutions/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("Stack"), "59.1%"),
            new PlacementProblemDto(9030L, "Tag Validator", "https://leetcode.com/problems/tag-validator/", "https://practice.geeksforgeeks.org/problems/tag-validator/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Stack"), "37.8%")
        );
    }

    // ─── 10. QUEUE ─────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildQueueEasy() {
        return List.of(
            new PlacementProblemDto(10001L, "Implement Queue using Stacks", "https://leetcode.com/problems/implement-queue-using-stacks/", "https://practice.geeksforgeeks.org/problems/queue-using-two-stacks/1", "https://youtube.com/watch?v=nN4K85OvhT8", List.of("Amazon", "Microsoft"), List.of("Queue"), "63.8%"),
            new PlacementProblemDto(10002L, "Number of Recent Calls", "https://leetcode.com/problems/number-of-recent-calls/", "https://practice.geeksforgeeks.org/problems/recent-calls/1", "https://youtube.com/watch?v=yEa0g3D8n-Q", List.of("Amazon"), List.of("Queue"), "74.2%"),
            new PlacementProblemDto(10003L, "First Unique Character in Stream", "https://leetcode.com/problems/first-unique-character-in-a-string/", "https://practice.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1", "https://youtube.com/watch?v=5co5Gvp_-30", List.of("Amazon"), List.of("Queue"), "59.8%"),
            new PlacementProblemDto(10004L, "Time Needed to Buy Tickets", "https://leetcode.com/problems/time-needed-to-buy-tickets/", "https://practice.geeksforgeeks.org/problems/buy-tickets/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Queue"), "65.2%"),
            new PlacementProblemDto(10005L, "Design Circular Queue", "https://leetcode.com/problems/design-circular-queue/", "https://practice.geeksforgeeks.org/problems/circular-queue/1", "https://youtube.com/watch?v=aBbAscile48", List.of("Amazon"), List.of("Queue"), "51.8%"),
            new PlacementProblemDto(10006L, "Design Circular Deque", "https://leetcode.com/problems/design-circular-deque/", "https://practice.geeksforgeeks.org/problems/circular-deque/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Amazon"), List.of("Deque"), "56.9%"),
            new PlacementProblemDto(10007L, "Implement Stack using Queues", "https://leetcode.com/problems/implement-stack-using-queues/", "https://practice.geeksforgeeks.org/problems/stack-using-two-queues/1", "https://youtube.com/watch?v=rW4vhMGp8_Y", List.of("Amazon"), List.of("Queue"), "61.2%"),
            new PlacementProblemDto(10008L, "Dota2 Senate", "https://leetcode.com/problems/dota2-senate/", "https://practice.geeksforgeeks.org/problems/dota2-senate/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Queue"), "47.8%"),
            new PlacementProblemDto(10009L, "Reveal Cards In Increasing Order", "https://leetcode.com/problems/reveal-cards-in-increasing-order/", "https://practice.geeksforgeeks.org/problems/reveal-cards/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Queue"), "78.2%"),
            new PlacementProblemDto(10010L, "Winner of Circular Game", "https://leetcode.com/problems/find-the-winner-of-the-circular-game/", "https://practice.geeksforgeeks.org/problems/josephus-problem/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Queue"), "79.2%")
        );
    }

    private List<PlacementProblemDto> buildQueueMedium() {
        return List.of(
            new PlacementProblemDto(10011L, "Design Front Middle Back Queue", "https://leetcode.com/problems/design-front-middle-back-queue/", "https://practice.geeksforgeeks.org/problems/front-middle-back-queue/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Deque"), "56.1%"),
            new PlacementProblemDto(10012L, "Task Scheduler", "https://leetcode.com/problems/task-scheduler/", "https://practice.geeksforgeeks.org/problems/task-scheduler/1", "https://youtube.com/watch?v=s8p8ukTyA2I", List.of("Meta", "Amazon"), List.of("Queue"), "57.4%"),
            new PlacementProblemDto(10013L, "Design Hit Counter", "https://leetcode.com/problems/design-hit-counter/", "https://practice.geeksforgeeks.org/problems/hit-counter/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Queue"), "68.2%"),
            new PlacementProblemDto(10014L, "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", "https://practice.geeksforgeeks.org/problems/shortest-subarray-with-sum-at-least-k/1", "https://youtube.com/watch?v=K03X458wA8c", List.of("Google"), List.of("Monotonic Queue"), "30.1%"),
            new PlacementProblemDto(10015L, "Sliding Window Maximum", "https://leetcode.com/problems/sliding-window-maximum/", "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1", "https://youtube.com/watch?v=DfljaUwZsOk", List.of("Amazon", "Google"), List.of("Deque"), "46.5%"),
            new PlacementProblemDto(10016L, "Constrained Subsequence Sum", "https://leetcode.com/problems/constrained-subsequence-sum/", "https://practice.geeksforgeeks.org/problems/constrained-sum/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("Monotonic Deque"), "56.9%"),
            new PlacementProblemDto(10017L, "Maximum Number of Robots Within Budget", "https://leetcode.com/problems/maximum-number-of-robots-within-budget/", "https://practice.geeksforgeeks.org/problems/robots-budget/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("Monotonic Deque"), "34.8%"),
            new PlacementProblemDto(10018L, "Longest Subarray With Absolute Diff <= Limit", "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", "https://practice.geeksforgeeks.org/problems/diff-limit-subarray/1", "https://youtube.com/watch?v=Lk3n0lPjMv0", List.of("Google"), List.of("Monotonic Deque"), "50.1%"),
            new PlacementProblemDto(10019L, "Jump Game VI", "https://leetcode.com/problems/jump-game-vi/", "https://practice.geeksforgeeks.org/problems/jump-game-6/1", "https://youtube.com/watch?v=r3Z5AuhLuhw", List.of("Amazon"), List.of("Deque"), "45.2%"),
            new PlacementProblemDto(10020L, "Delivering Boxes from Storage to Ports", "https://leetcode.com/problems/delivering-boxes-from-storage-to-ports/", "https://practice.geeksforgeeks.org/problems/delivering-boxes/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Amazon"), List.of("Monotonic Deque"), "40.8%")
        );
    }

    private List<PlacementProblemDto> buildQueueHard() {
        return List.of(
            new PlacementProblemDto(10021L, "Sliding Window Maximum (Hard)", "https://leetcode.com/problems/sliding-window-maximum/", "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1", "https://youtube.com/watch?v=DfljaUwZsOk", List.of("Amazon", "Google"), List.of("Monotonic Deque"), "46.5%"),
            new PlacementProblemDto(10022L, "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", "https://practice.geeksforgeeks.org/problems/shortest-subarray-with-sum-at-least-k/1", "https://youtube.com/watch?v=K03X458wA8c", List.of("Google"), List.of("Monotonic Deque"), "30.1%"),
            new PlacementProblemDto(10023L, "Maximum Number of Tasks You Can Assign", "https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign/", "https://practice.geeksforgeeks.org/problems/task-assigning/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Deque"), "40.2%"),
            new PlacementProblemDto(10024L, "Stamping The Sequence", "https://leetcode.com/problems/stamping-the-sequence/", "https://practice.geeksforgeeks.org/problems/stamping-sequence/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Queue"), "60.1%"),
            new PlacementProblemDto(10025L, "Shortest Path to Get All Keys", "https://leetcode.com/problems/shortest-path-to-get-all-keys/", "https://practice.geeksforgeeks.org/problems/get-all-keys/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("BFS Queue"), "47.8%"),
            new PlacementProblemDto(10026L, "Minimum Cost Valid Path in Grid", "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/", "https://practice.geeksforgeeks.org/problems/valid-path-grid/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("0-1 BFS Deque"), "61.5%"),
            new PlacementProblemDto(10027L, "Trapping Rain Water II", "https://leetcode.com/problems/trapping-rain-water-ii/", "https://practice.geeksforgeeks.org/problems/trapping-rain-water-ii/1", "https://youtube.com/watch?v=Qv15V8fqVf4", List.of("Google"), List.of("Priority Queue"), "48.9%"),
            new PlacementProblemDto(10028L, "Minimum Moves Target Rotations", "https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/", "https://practice.geeksforgeeks.org/problems/target-rotations/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("BFS Queue"), "49.8%"),
            new PlacementProblemDto(10029L, "Bus Routes", "https://leetcode.com/problems/bus-routes/", "https://practice.geeksforgeeks.org/problems/bus-routes/1", "https://youtube.com/watch?v=Lk3n0lPjMv0", List.of("Uber"), List.of("BFS Queue"), "45.6%"),
            new PlacementProblemDto(10030L, "Sliding Puzzle", "https://leetcode.com/problems/sliding-puzzle/", "https://practice.geeksforgeeks.org/problems/sliding-puzzle/1", "https://youtube.com/watch?v=r3Z5AuhLuhw", List.of("Google"), List.of("BFS Queue"), "64.1%")
        );
    }

    // ─── 11. BINARY TREES ──────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildTreeEasy() {
        return List.of(
            new PlacementProblemDto(11001L, "Invert Binary Tree", "https://leetcode.com/problems/invert-binary-tree/", "https://practice.geeksforgeeks.org/problems/mirror-tree/1", "https://youtube.com/watch?v=OnSn2XEQ4MY", List.of("Google", "Amazon"), List.of("Binary Tree"), "75.2%"),
            new PlacementProblemDto(11002L, "Maximum Depth of Binary Tree", "https://leetcode.com/problems/maximum-depth-of-binary-tree/", "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1", "https://youtube.com/watch?v=hTM3phVI6YQ", List.of("Amazon", "Apple"), List.of("Binary Tree"), "74.1%"),
            new PlacementProblemDto(11003L, "Same Tree", "https://leetcode.com/problems/same-tree/", "https://practice.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1", "https://youtube.com/watch?v=vRbbcKXCxPo", List.of("Amazon"), List.of("Binary Tree"), "59.2%"),
            new PlacementProblemDto(11004L, "Diameter of Binary Tree", "https://leetcode.com/problems/diameter-of-binary-tree/", "https://practice.geeksforgeeks.org/problems/diameter-of-binary-tree/1", "https://youtube.com/watch?v=bkxqA8Rfv04", List.of("Meta"), List.of("Binary Tree"), "57.8%"),
            new PlacementProblemDto(11005L, "Balanced Binary Tree", "https://leetcode.com/problems/balanced-binary-tree/", "https://practice.geeksforgeeks.org/problems/check-for-balanced-tree/1", "https://youtube.com/watch?v=QfJsau0ItOY", List.of("Amazon"), List.of("Binary Tree"), "50.1%"),
            new PlacementProblemDto(11006L, "Subtree of Another Tree", "https://leetcode.com/problems/subtree-of-another-tree/", "https://practice.geeksforgeeks.org/problems/check-if-subtree/1", "https://youtube.com/watch?v=E36O5SWp-LE", List.of("Amazon"), List.of("Binary Tree"), "46.8%"),
            new PlacementProblemDto(11007L, "Symmetric Tree", "https://leetcode.com/problems/symmetric-tree/", "https://practice.geeksforgeeks.org/problems/symmetric-tree/1", "https://youtube.com/watch?v=K7LyJTWgask", List.of("Microsoft"), List.of("Binary Tree"), "55.3%"),
            new PlacementProblemDto(11008L, "Path Sum", "https://leetcode.com/problems/path-sum/", "https://practice.geeksforgeeks.org/problems/root-to-leaf-path-sum/1", "https://youtube.com/watch?v=LSKQyOz_P8s", List.of("Amazon"), List.of("Binary Tree"), "49.1%"),
            new PlacementProblemDto(11009L, "Binary Tree Inorder Traversal", "https://leetcode.com/problems/binary-tree-inorder-traversal/", "https://practice.geeksforgeeks.org/problems/inorder-traversal/1", "https://youtube.com/watch?v=g_S5W03Hwaw", List.of("Amazon"), List.of("Binary Tree"), "74.8%"),
            new PlacementProblemDto(11010L, "Binary Tree Preorder Traversal", "https://leetcode.com/problems/binary-tree-preorder-traversal/", "https://practice.geeksforgeeks.org/problems/preorder-traversal/1", "https://youtube.com/watch?v=rl_-Ja_m-dQ", List.of("Amazon"), List.of("Binary Tree"), "67.5%")
        );
    }

    private List<PlacementProblemDto> buildTreeMedium() {
        return List.of(
            new PlacementProblemDto(11011L, "Binary Tree Level Order Traversal", "https://leetcode.com/problems/binary-tree-level-order-traversal/", "https://practice.geeksforgeeks.org/problems/level-order-traversal/1", "https://youtube.com/watch?v=6ZnyEApgFYg", List.of("Amazon", "Meta"), List.of("Binary Tree"), "65.2%"),
            new PlacementProblemDto(11012L, "Lowest Common Ancestor of Binary Tree", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1", "https://youtube.com/watch?v=WO1tfq2LYUQ", List.of("Amazon", "Meta"), List.of("Binary Tree"), "60.1%"),
            new PlacementProblemDto(11013L, "Binary Tree Right Side View", "https://leetcode.com/problems/binary-tree-right-side-view/", "https://practice.geeksforgeeks.org/problems/right-view-of-binary-tree/1", "https://youtube.com/watch?v=d4zLyf32e3I", List.of("Meta"), List.of("Binary Tree"), "62.0%"),
            new PlacementProblemDto(11014L, "Count Good Nodes in Binary Tree", "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/count-good-nodes/1", "https://youtube.com/watch?v=7cp5imvDzl4", List.of("Microsoft"), List.of("Binary Tree"), "73.4%"),
            new PlacementProblemDto(11015L, "Binary Tree Zigzag Level Order Traversal", "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", "https://practice.geeksforgeeks.org/problems/zigzag-tree-traversal/1", "https://youtube.com/watch?v=v-_gZ5Z5nDA", List.of("Amazon"), List.of("Binary Tree"), "57.1%"),
            new PlacementProblemDto(11016L, "Construct Tree from Preorder & Inorder", "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", "https://practice.geeksforgeeks.org/problems/construct-tree-1/1", "https://youtube.com/watch?v=ihj4IQGZ2zc", List.of("Amazon"), List.of("Binary Tree"), "61.9%"),
            new PlacementProblemDto(11017L, "Flatten Binary Tree to Linked List", "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", "https://practice.geeksforgeeks.org/problems/flatten-binary-tree-to-linked-list/1", "https://youtube.com/watch?v=rKnD7rLT0VQ", List.of("Amazon"), List.of("Binary Tree"), "62.5%"),
            new PlacementProblemDto(11018L, "Path Sum II (All Leaf Paths)", "https://leetcode.com/problems/path-sum-ii/", "https://practice.geeksforgeeks.org/problems/root-to-leaf-paths/1", "https://youtube.com/watch?v=3B5gnrwRmWw", List.of("Amazon"), List.of("Binary Tree"), "57.2%"),
            new PlacementProblemDto(11019L, "Populating Next Right Pointers", "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", "https://practice.geeksforgeeks.org/problems/connect-nodes-at-same-level/1", "https://youtube.com/watch?v=U4hFQCa1Cq0", List.of("Microsoft"), List.of("Binary Tree"), "61.4%"),
            new PlacementProblemDto(11020L, "All Nodes Distance K in Binary Tree", "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/nodes-at-given-distance-in-binary-tree/1", "https://youtube.com/watch?v=i9ORlGJhnmU", List.of("Amazon", "Meta"), List.of("Binary Tree"), "62.9%")
        );
    }

    private List<PlacementProblemDto> buildTreeHard() {
        return List.of(
            new PlacementProblemDto(11021L, "Binary Tree Maximum Path Sum", "https://leetcode.com/problems/binary-tree-maximum-path-sum/", "https://practice.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1", "https://youtube.com/watch?v=TO5zsK6gKS8", List.of("Meta", "Amazon"), List.of("Binary Tree"), "39.2%"),
            new PlacementProblemDto(11022L, "Serialize and Deserialize Binary Tree", "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", "https://practice.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1", "https://youtube.com/watch?v=u4JAi2JJhTY", List.of("Amazon", "Google"), List.of("Binary Tree"), "55.6%"),
            new PlacementProblemDto(11023L, "Vertical Order Traversal", "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", "https://practice.geeksforgeeks.org/problems/vertical-traversal-of-binary-tree/1", "https://youtube.com/watch?v=q_a6lpb7UUk", List.of("Amazon"), List.of("Binary Tree"), "46.8%"),
            new PlacementProblemDto(11024L, "Binary Tree Cameras", "https://leetcode.com/problems/binary-tree-cameras/", "https://practice.geeksforgeeks.org/problems/binary-tree-cameras/1", "https://youtube.com/watch?v=2Gh5WPjAgVU", List.of("Google"), List.of("Binary Tree"), "46.2%"),
            new PlacementProblemDto(11025L, "Count Complete Tree Nodes", "https://leetcode.com/problems/count-complete-tree-nodes/", "https://practice.geeksforgeeks.org/problems/count-number-of-nodes-in-a-binary-tree/1", "https://youtube.com/watch?v=CvrPf1-flAA", List.of("Google"), List.of("Binary Tree"), "60.8%"),
            new PlacementProblemDto(11026L, "Construct Tree from Inorder & Postorder", "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", "https://practice.geeksforgeeks.org/problems/tree-from-postorder-and-inorder/1", "https://youtube.com/watch?v=LgLRTaEM5d8", List.of("Amazon"), List.of("Binary Tree"), "60.2%"),
            new PlacementProblemDto(11027L, "Sum of Distances in Tree", "https://leetcode.com/problems/sum-of-distances-in-tree/", "https://practice.geeksforgeeks.org/problems/distances-in-tree/1", "https://youtube.com/watch?v=gm4Ye0fESpE", List.of("Google"), List.of("Tree DP"), "58.4%"),
            new PlacementProblemDto(11028L, "Find Duplicate Subtrees", "https://leetcode.com/problems/find-duplicate-subtrees/", "https://practice.geeksforgeeks.org/problems/duplicate-subtrees/1", "https://youtube.com/watch?v=kn0Z5_qPPzY", List.of("Google"), List.of("Binary Tree"), "58.9%"),
            new PlacementProblemDto(11029L, "House Robber III (Tree DP)", "https://leetcode.com/problems/house-robber-iii/", "https://practice.geeksforgeeks.org/problems/house-robber-3/1", "https://youtube.com/watch?v=nHR89hZWN7c", List.of("Google"), List.of("Tree DP"), "53.8%"),
            new PlacementProblemDto(11030L, "K-th Ancestor of a Tree Node", "https://leetcode.com/problems/k-th-ancestor-of-a-tree-node/", "https://practice.geeksforgeeks.org/problems/k-th-ancestor-in-a-tree/1", "https://youtube.com/watch?v=oib-XsjFa-M", List.of("Google"), List.of("Binary Lifting"), "34.2%")
        );
    }

    // ─── 12. BST ───────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildBstEasy() {
        return List.of(
            new PlacementProblemDto(12001L, "Lowest Common Ancestor of a BST", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1", "https://youtube.com/watch?v=gs2LMfuOR9k", List.of("Amazon", "Meta"), List.of("BST"), "62.4%"),
            new PlacementProblemDto(12002L, "Search in a Binary Search Tree", "https://leetcode.com/problems/search-in-a-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/search-a-node-in-bst/1", "https://youtube.com/watch?v=KcNt6v_56cc", List.of("Amazon"), List.of("BST"), "78.2%"),
            new PlacementProblemDto(12003L, "Convert Sorted Array to BST", "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/array-to-bst4443/1", "https://youtube.com/watch?v=0KBhb-v_A-s", List.of("Amazon"), List.of("BST"), "70.8%"),
            new PlacementProblemDto(12004L, "Minimum Absolute Difference in BST", "https://leetcode.com/problems/minimum-absolute-difference-in-bst/", "https://practice.geeksforgeeks.org/problems/min-diff-bst/1", "https://youtube.com/watch?v=jsoj8L3q3c4", List.of("Google"), List.of("BST"), "58.2%"),
            new PlacementProblemDto(12005L, "Range Sum of BST", "https://leetcode.com/problems/range-sum-of-bst/", "https://practice.geeksforgeeks.org/problems/range-sum-of-bst/1", "https://youtube.com/watch?v=uD05d3x2_f0", List.of("Meta"), List.of("BST"), "86.1%"),
            new PlacementProblemDto(12006L, "Find Mode in BST", "https://leetcode.com/problems/find-mode-in-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/find-mode-in-bst/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("BST"), "50.8%"),
            new PlacementProblemDto(12007L, "Minimum Distance Between BST Nodes", "https://leetcode.com/problems/minimum-distance-between-bst-nodes/", "https://practice.geeksforgeeks.org/problems/min-distance-bst/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Amazon"), List.of("BST"), "59.8%"),
            new PlacementProblemDto(12008L, "Insert into a Binary Search Tree", "https://leetcode.com/problems/insert-into-a-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/insert-a-node-in-a-bst/1", "https://youtube.com/watch?v=FiFiNvM2954", List.of("Amazon"), List.of("BST"), "74.2%"),
            new PlacementProblemDto(12009L, "Two Sum IV - Input is a BST", "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", "https://practice.geeksforgeeks.org/problems/find-a-pair-with-given-target-in-bst/1", "https://youtube.com/watch?v=ssL3sHwPeb4", List.of("Meta"), List.of("BST"), "61.2%"),
            new PlacementProblemDto(12010L, "Increasing Order Search Tree", "https://leetcode.com/problems/increasing-order-search-tree/", "https://practice.geeksforgeeks.org/problems/increasing-order-bst/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("BST"), "78.5%")
        );
    }

    private List<PlacementProblemDto> buildBstMedium() {
        return List.of(
            new PlacementProblemDto(12011L, "Validate Binary Search Tree", "https://leetcode.com/problems/validate-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/check-for-bst/1", "https://youtube.com/watch?v=s6ATEkipzow", List.of("Amazon", "Google"), List.of("BST"), "32.1%"),
            new PlacementProblemDto(12012L, "Kth Smallest Element in a BST", "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", "https://practice.geeksforgeeks.org/problems/k-th-smallest-element-in-bst/1", "https://youtube.com/watch?v=5LUXSvszSNU", List.of("Amazon", "Meta"), List.of("BST"), "70.4%"),
            new PlacementProblemDto(12013L, "Delete Node in a BST", "https://leetcode.com/problems/delete-node-in-a-bst/", "https://practice.geeksforgeeks.org/problems/delete-a-node-from-bst/1", "https://youtube.com/watch?v=iva5g7zE1zE", List.of("Amazon"), List.of("BST"), "50.9%"),
            new PlacementProblemDto(12014L, "BST Iterator", "https://leetcode.com/problems/binary-search-tree-iterator/", "https://practice.geeksforgeeks.org/problems/bst-iterator/1", "https://youtube.com/watch?v=D2jMcmxU4yM", List.of("Meta"), List.of("BST"), "70.5%"),
            new PlacementProblemDto(12015L, "Construct BST from Preorder Traversal", "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", "https://practice.geeksforgeeks.org/problems/preorder-to-postorder4423/1", "https://youtube.com/watch?v=UmJT3j26t1I", List.of("Amazon"), List.of("BST"), "81.4%"),
            new PlacementProblemDto(12016L, "Convert Sorted List to BST", "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/sorted-list-to-bst/1", "https://youtube.com/watch?v=5B8k2-m62r0", List.of("Amazon"), List.of("BST"), "60.1%"),
            new PlacementProblemDto(12017L, "Trim a Binary Search Tree", "https://leetcode.com/problems/trim-a-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/trim-a-bst/1", "https://youtube.com/watch?v=jwt5mTjajOo", List.of("Google"), List.of("BST"), "66.4%"),
            new PlacementProblemDto(12018L, "All Elements in Two BSTs", "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/", "https://practice.geeksforgeeks.org/problems/merge-two-bsts/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("BST"), "79.8%"),
            new PlacementProblemDto(12019L, "Balance a Binary Search Tree", "https://leetcode.com/problems/balance-a-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/normal-bst-to-balanced-bst/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("BST"), "80.5%"),
            new PlacementProblemDto(12020L, "Unique Binary Search Trees", "https://leetcode.com/problems/unique-binary-search-trees/", "https://practice.geeksforgeeks.org/problems/unique-bsts-1587115621/1", "https://youtube.com/watch?v=OIc0mVSpd0Y", List.of("Amazon"), List.of("BST"), "60.2%")
        );
    }

    private List<PlacementProblemDto> buildBstHard() {
        return List.of(
            new PlacementProblemDto(12021L, "Recover Binary Search Tree", "https://leetcode.com/problems/recover-binary-search-tree/", "https://practice.geeksforgeeks.org/problems/fixed-two-nodes-of-a-bst/1", "https://youtube.com/watch?v=ZWGW7FminDM", List.of("Amazon", "Google"), List.of("BST"), "52.1%"),
            new PlacementProblemDto(12022L, "Maximum Sum BST in Binary Tree", "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/", "https://practice.geeksforgeeks.org/problems/largest-bst/1", "https://youtube.com/watch?v=X0oXMdtUDj4", List.of("Amazon"), List.of("BST"), "40.8%"),
            new PlacementProblemDto(12023L, "Count of Range Sum", "https://leetcode.com/problems/count-of-range-sum/", "https://practice.geeksforgeeks.org/problems/count-of-range-sum/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("BST"), "35.9%"),
            new PlacementProblemDto(12024L, "Data Stream as Disjoint Intervals", "https://leetcode.com/problems/data-stream-as-disjoint-intervals/", "https://practice.geeksforgeeks.org/problems/data-stream-intervals/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("BST"), "58.4%"),
            new PlacementProblemDto(12025L, "My Calendar III", "https://leetcode.com/problems/my-calendar-iii/", "https://practice.geeksforgeeks.org/problems/my-calendar-iii/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("BST"), "71.2%"),
            new PlacementProblemDto(12026L, "Contains Duplicate III", "https://leetcode.com/problems/contains-duplicate-iii/", "https://practice.geeksforgeeks.org/problems/contains-duplicate-3/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("BST"), "22.4%"),
            new PlacementProblemDto(12027L, "Count Smaller Numbers After Self", "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", "https://practice.geeksforgeeks.org/problems/count-smaller-elements2214/1", "https://youtube.com/watch?v=_sA1xI4XK0c", List.of("Google"), List.of("BST"), "42.8%"),
            new PlacementProblemDto(12028L, "Unique Binary Search Trees II", "https://leetcode.com/problems/unique-binary-search-trees-ii/", "https://practice.geeksforgeeks.org/problems/unique-bsts-ii/1", "https://youtube.com/watch?v=m907FIyX6-8", List.of("Google"), List.of("BST"), "56.9%"),
            new PlacementProblemDto(12029L, "K-th Smallest Element in BST (Morris)", "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", "https://practice.geeksforgeeks.org/problems/k-th-smallest-element-in-bst/1", "https://youtube.com/watch?v=5LUXSvszSNU", List.of("Amazon"), List.of("BST"), "70.4%"),
            new PlacementProblemDto(12030L, "Inorder Successor in BST II", "https://leetcode.com/problems/inorder-successor-in-bst-ii/", "https://practice.geeksforgeeks.org/problems/inorder-successor-in-bst/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Google"), List.of("BST"), "61.4%")
        );
    }

    // ─── 13. HEAP ──────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildHeapEasy() {
        return List.of(
            new PlacementProblemDto(13001L, "Kth Largest Element in a Stream", "https://leetcode.com/problems/kth-largest-element-in-a-stream/", "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-a-stream2220/1", "https://youtube.com/watch?v=hOjcdrqMoQ8", List.of("Amazon"), List.of("Heap"), "56.2%"),
            new PlacementProblemDto(13002L, "Last Stone Weight", "https://leetcode.com/problems/last-stone-weight/", "https://practice.geeksforgeeks.org/problems/last-stone-weight/1", "https://youtube.com/watch?v=B-QCq79-Vfw", List.of("Amazon"), List.of("Heap"), "65.1%"),
            new PlacementProblemDto(13003L, "Relative Ranks", "https://leetcode.com/problems/relative-ranks/", "https://practice.geeksforgeeks.org/problems/relative-ranks/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Google"), List.of("Heap"), "63.2%"),
            new PlacementProblemDto(13004L, "Maximum Product of Two Elements in an Array", "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/", "https://practice.geeksforgeeks.org/problems/max-product/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Amazon"), List.of("Heap"), "80.4%"),
            new PlacementProblemDto(13005L, "Take Gifts From the Richest Pile", "https://leetcode.com/problems/take-gifts-from-the-richest-pile/", "https://practice.geeksforgeeks.org/problems/richest-pile/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Amazon"), List.of("Heap"), "67.9%"),
            new PlacementProblemDto(13006L, "Minimum Amount of Time to Fill Cups", "https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups/", "https://practice.geeksforgeeks.org/problems/fill-cups/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Heap"), "56.8%"),
            new PlacementProblemDto(13007L, "Delete Greatest Value in Each Row", "https://leetcode.com/problems/delete-greatest-value-in-each-row/", "https://practice.geeksforgeeks.org/problems/delete-greatest/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("Heap"), "80.1%"),
            new PlacementProblemDto(13008L, "Make Array Zero by Subtracting Equal Amounts", "https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/", "https://practice.geeksforgeeks.org/problems/subtracting-equal/1", "https://youtube.com/watch?v=3-n52pX3wQk", List.of("Amazon"), List.of("Heap"), "72.4%"),
            new PlacementProblemDto(13009L, "Sort Array by Increasing Frequency", "https://leetcode.com/problems/sort-array-by-increasing-frequency/", "https://practice.geeksforgeeks.org/problems/sort-by-frequency/1", "https://youtube.com/watch?v=wX-y0w4m3vQ", List.of("Amazon"), List.of("Heap"), "71.8%"),
            new PlacementProblemDto(13010L, "The K Weakest Rows in a Matrix", "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/", "https://practice.geeksforgeeks.org/problems/weakest-rows/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Heap"), "73.2%")
        );
    }

    private List<PlacementProblemDto> buildHeapMedium() {
        return List.of(
            new PlacementProblemDto(13011L, "Kth Largest Element in an Array", "https://leetcode.com/problems/kth-largest-element-in-an-array/", "https://practice.geeksforgeeks.org/problems/k-largest-elements4211/1", "https://youtube.com/watch?v=XEmy13g1Qxc", List.of("Amazon", "Meta"), List.of("Heap"), "66.1%"),
            new PlacementProblemDto(13012L, "Task Scheduler", "https://leetcode.com/problems/task-scheduler/", "https://practice.geeksforgeeks.org/problems/task-scheduler/1", "https://youtube.com/watch?v=s8p8ukTyA2I", List.of("Meta", "Amazon"), List.of("Heap"), "57.4%"),
            new PlacementProblemDto(13013L, "Top K Frequent Words", "https://leetcode.com/problems/top-k-frequent-words/", "https://practice.geeksforgeeks.org/problems/top-k-frequent-words/1", "https://youtube.com/watch?v=YPTqKIgVk-k", List.of("Amazon"), List.of("Heap"), "57.2%"),
            new PlacementProblemDto(13014L, "K Closest Points to Origin", "https://leetcode.com/problems/k-closest-points-to-origin/", "https://practice.geeksforgeeks.org/problems/k-closest-points/1", "https://youtube.com/watch?v=rI2EBUEMfTk", List.of("Amazon"), List.of("Heap"), "65.8%"),
            new PlacementProblemDto(13015L, "Reorganize String", "https://leetcode.com/problems/reorganize-string/", "https://practice.geeksforgeeks.org/problems/reorganize-string/1", "https://youtube.com/watch?v=2g_b1aYTH8w", List.of("Amazon"), List.of("Heap"), "54.1%"),
            new PlacementProblemDto(13016L, "Sort Characters By Frequency", "https://leetcode.com/problems/sort-characters-by-frequency/", "https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/1", "https://youtube.com/watch?v=trwUQ3M05Vw", List.of("Amazon"), List.of("Heap"), "70.2%"),
            new PlacementProblemDto(13017L, "Design Twitter", "https://leetcode.com/problems/design-twitter/", "https://practice.geeksforgeeks.org/problems/design-twitter/1", "https://youtube.com/watch?v=pNichitDD2E", List.of("Twitter"), List.of("Heap"), "38.2%"),
            new PlacementProblemDto(13018L, "Single-Threaded CPU", "https://leetcode.com/problems/single-threaded-cpu/", "https://practice.geeksforgeeks.org/problems/cpu-task-scheduling/1", "https://youtube.com/watch?v=RR1n-d4vpqw", List.of("Google"), List.of("Heap"), "44.1%"),
            new PlacementProblemDto(13019L, "Maximum Subarray Sum After K Negations", "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/", "https://practice.geeksforgeeks.org/problems/maximize-sum-after-k-negations/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Amazon"), List.of("Heap"), "51.4%"),
            new PlacementProblemDto(13020L, "Seat Reservation Manager", "https://leetcode.com/problems/seat-reservation-manager/", "https://practice.geeksforgeeks.org/problems/seat-reservation/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("Heap"), "68.9%")
        );
    }

    private List<PlacementProblemDto> buildHeapHard() {
        return List.of(
            new PlacementProblemDto(13021L, "Find Median from Data Stream", "https://leetcode.com/problems/find-median-from-data-stream/", "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", "https://youtube.com/watch?v=itmhHWaHupI", List.of("Amazon", "Google", "Meta"), List.of("Two Heaps"), "51.4%"),
            new PlacementProblemDto(13022L, "Merge k Sorted Lists (Heap)", "https://leetcode.com/problems/merge-k-sorted-lists/", "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1", "https://youtube.com/watch?v=q5a5OiGbT6Q", List.of("Amazon", "Google"), List.of("Min Heap"), "50.1%"),
            new PlacementProblemDto(13023L, "Smallest Range Covering Elements from K Lists", "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", "https://practice.geeksforgeeks.org/problems/smallest-range-in-k-lists/1", "https://youtube.com/watch?v=0I6lA01xN8g", List.of("Amazon"), List.of("Min Heap"), "61.4%"),
            new PlacementProblemDto(13024L, "IPO (Maximizing Capital with Heap)", "https://leetcode.com/problems/ipo/", "https://practice.geeksforgeeks.org/problems/ipo-capital/1", "https://youtube.com/watch?v=1IUzNJ6ScxI", List.of("Google"), List.of("Max Heap"), "49.8%"),
            new PlacementProblemDto(13025L, "Trapping Rain Water II (Min Heap BFS)", "https://leetcode.com/problems/trapping-rain-water-ii/", "https://practice.geeksforgeeks.org/problems/trapping-rain-water-ii/1", "https://youtube.com/watch?v=Qv15V8fqVf4", List.of("Google"), List.of("Min Heap"), "48.9%"),
            new PlacementProblemDto(13026L, "Swim in Rising Water (Dijkstra Min Heap)", "https://leetcode.com/problems/swim-in-rising-water/", "https://practice.geeksforgeeks.org/problems/swim-in-water/1", "https://youtube.com/watch?v=v0e8p9yV9iM", List.of("Google"), List.of("Min Heap"), "60.4%"),
            new PlacementProblemDto(13027L, "Minimum Cost to Hire K Workers", "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", "https://practice.geeksforgeeks.org/problems/hire-k-workers/1", "https://youtube.com/watch?v=o811TZLAHJw", List.of("Google"), List.of("Max Heap"), "54.8%"),
            new PlacementProblemDto(13028L, "Maximum Performance of a Team", "https://leetcode.com/problems/maximum-performance-of-a-team/", "https://practice.geeksforgeeks.org/problems/max-performance/1", "https://youtube.com/watch?v=Y7UToiCZnCg", List.of("Google"), List.of("Min Heap"), "48.2%"),
            new PlacementProblemDto(13029L, "Kth Smallest Element in a Sorted Matrix", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", "https://practice.geeksforgeeks.org/problems/kth-element-in-matrix/1", "https://youtube.com/watch?v=0d656D157l0", List.of("Amazon"), List.of("Min Heap"), "62.1%"),
            new PlacementProblemDto(13030L, "Find the Kth Smallest Sum of a Matrix With Sorted Rows", "https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/", "https://practice.geeksforgeeks.org/problems/kth-smallest-sum-matrix/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Min Heap"), "62.8%")
        );
    }

    // ─── 14. GRAPHS ────────────────────────────────────────────────────────────
    private List<PlacementProblemDto> buildGraphEasy() {
        return List.of(
            new PlacementProblemDto(14001L, "Find Centre of Star Graph", "https://leetcode.com/problems/find-center-of-star-graph/", "https://practice.geeksforgeeks.org/problems/star-graph/1", "https://youtube.com/watch?v=gT9Svh76Afg", List.of("Amazon"), List.of("Graph"), "83.9%"),
            new PlacementProblemDto(14002L, "Find the Town Judge", "https://leetcode.com/problems/find-the-town-judge/", "https://practice.geeksforgeeks.org/problems/town-judge/1", "https://youtube.com/watch?v=ZUP_t8i8M6E", List.of("Amazon"), List.of("Graph"), "49.8%"),
            new PlacementProblemDto(14003L, "Flood Fill", "https://leetcode.com/problems/flood-fill/", "https://practice.geeksforgeeks.org/problems/flood-fill-algorithm1856/1", "https://youtube.com/watch?v=C-2_uSRli8o", List.of("Amazon"), List.of("DFS"), "62.4%"),
            new PlacementProblemDto(14004L, "Island Perimeter", "https://leetcode.com/problems/island-perimeter/", "https://practice.geeksforgeeks.org/problems/island-perimeter/1", "https://youtube.com/watch?v=fC5LuocQ4R0", List.of("Google"), List.of("DFS"), "70.1%"),
            new PlacementProblemDto(14005L, "Verifying an Alien Dictionary", "https://leetcode.com/problems/verifying-an-alien-dictionary/", "https://practice.geeksforgeeks.org/problems/alien-dictionary/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Meta"), List.of("Graph"), "54.2%"),
            new PlacementProblemDto(14006L, "Keys and Rooms", "https://leetcode.com/problems/keys-and-rooms/", "https://practice.geeksforgeeks.org/problems/keys-and-rooms/1", "https://youtube.com/watch?v=R1vXb2sV1w8", List.of("Amazon"), List.of("BFS"), "72.4%"),
            new PlacementProblemDto(14007L, "Maximum Star Sum of a Graph", "https://leetcode.com/problems/maximum-star-sum-of-a-graph/", "https://practice.geeksforgeeks.org/problems/star-sum/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Google"), List.of("Graph"), "41.2%"),
            new PlacementProblemDto(14008L, "Minimum Number of Vertices to Reach All Nodes", "https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/", "https://practice.geeksforgeeks.org/problems/vertices-reach-nodes/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Graph"), "80.4%"),
            new PlacementProblemDto(14009L, "Find Path if Exists in Graph", "https://leetcode.com/problems/find-if-path-exists-in-graph/", "https://practice.geeksforgeeks.org/problems/path-exists-in-graph/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Amazon"), List.of("DSU"), "52.8%"),
            new PlacementProblemDto(14010L, "Number of Provinces (Disjoint Set Easy)", "https://leetcode.com/problems/number-of-provinces/", "https://practice.geeksforgeeks.org/problems/number-of-provinces/1", "https://youtube.com/watch?v=ACzkVtewUYA", List.of("Amazon"), List.of("DSU"), "64.8%")
        );
    }

    private List<PlacementProblemDto> buildGraphMedium() {
        return List.of(
            new PlacementProblemDto(14011L, "Number of Islands", "https://leetcode.com/problems/number-of-islands/", "https://practice.geeksforgeeks.org/problems/find-the-number-of-islands/1", "https://youtube.com/watch?v=pV2kpPD66nE", List.of("Amazon", "Google"), List.of("DFS BFS"), "57.9%"),
            new PlacementProblemDto(14012L, "Course Schedule (Topological Sort)", "https://leetcode.com/problems/course-schedule/", "https://practice.geeksforgeeks.org/problems/course-schedule/1", "https://youtube.com/watch?v=EgI5nU9etnU", List.of("Amazon", "Meta"), List.of("Graph"), "46.2%"),
            new PlacementProblemDto(14013L, "Course Schedule II", "https://leetcode.com/problems/course-schedule-ii/", "https://practice.geeksforgeeks.org/problems/course-schedule-ii/1", "https://youtube.com/watch?v=Akt3glAwyfY", List.of("Amazon"), List.of("Topological"), "49.1%"),
            new PlacementProblemDto(14014L, "Rotting Oranges (Multi-Source BFS)", "https://leetcode.com/problems/rotting-oranges/", "https://practice.geeksforgeeks.org/problems/rotten-oranges1428/1", "https://youtube.com/watch?v=y704fEOx0s0", List.of("Amazon"), List.of("BFS"), "53.2%"),
            new PlacementProblemDto(14015L, "Clone Graph", "https://leetcode.com/problems/clone-graph/", "https://practice.geeksforgeeks.org/problems/clone-graph/1", "https://youtube.com/watch?v=mQeF6bN8hMk", List.of("Meta"), List.of("Graph"), "54.8%"),
            new PlacementProblemDto(14016L, "Pacific Atlantic Water Flow", "https://leetcode.com/problems/pacific-atlantic-water-flow/", "https://practice.geeksforgeeks.org/problems/water-flow/1", "https://youtube.com/watch?v=s-nq6Hrm4cM", List.of("Google"), List.of("DFS"), "54.1%"),
            new PlacementProblemDto(14017L, "Surrounded Regions", "https://leetcode.com/problems/surrounded-regions/", "https://practice.geeksforgeeks.org/problems/replace-os-with-xs0052/1", "https://youtube.com/watch?v=0ZJGJ1e4yCA", List.of("Amazon"), List.of("DFS"), "38.2%"),
            new PlacementProblemDto(14018L, "Graph Valid Tree (DSU)", "https://leetcode.com/problems/graph-valid-tree/", "https://practice.geeksforgeeks.org/problems/graph-tree-validation/1", "https://youtube.com/watch?v=bXsUuownnoQ", List.of("Google"), List.of("DSU"), "47.2%"),
            new PlacementProblemDto(14019L, "Cheapest Flights Within K Stops (Bellman-Ford)", "https://leetcode.com/problems/cheapest-flights-within-k-stops/", "https://practice.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1", "https://youtube.com/watch?v=5eIK3zUdYmE", List.of("Amazon"), List.of("Dijkstra"), "37.5%"),
            new PlacementProblemDto(14020L, "Network Delay Time (Dijkstra Shortest Path)", "https://leetcode.com/problems/network-delay-time/", "https://practice.geeksforgeeks.org/problems/network-delay-time/1", "https://youtube.com/watch?v=EaphyqKU4P8", List.of("Google"), List.of("Dijkstra"), "53.2%")
        );
    }

    private List<PlacementProblemDto> buildGraphHard() {
        return List.of(
            new PlacementProblemDto(14021L, "Word Ladder (BFS Shortest Transformation)", "https://leetcode.com/problems/word-ladder/", "https://practice.geeksforgeeks.org/problems/word-ladder/1", "https://youtube.com/watch?v=h9iTnkgv05E", List.of("Amazon", "Google"), List.of("BFS"), "37.8%"),
            new PlacementProblemDto(14022L, "Alien Dictionary (Topological Sort)", "https://leetcode.com/problems/alien-dictionary/", "https://practice.geeksforgeeks.org/problems/alien-dictionary/1", "https://youtube.com/watch?v=6kTZYvNNyps", List.of("Google", "Amazon"), List.of("Topological Sort"), "35.8%"),
            new PlacementProblemDto(14023L, "Reconstruct Itinerary (Eulerian Path)", "https://leetcode.com/problems/reconstruct-itinerary/", "https://practice.geeksforgeeks.org/problems/reconstruct-itinerary/1", "https://youtube.com/watch?v=WYqsg5dzia4", List.of("Google"), List.of("DFS"), "42.1%"),
            new PlacementProblemDto(14024L, "Critical Connections in a Network (Tarjan's Bridges)", "https://leetcode.com/problems/critical-connections-in-a-network/", "https://practice.geeksforgeeks.org/problems/critical-connections/1", "https://youtube.com/watch?v=ryFklKmW6dE", List.of("Amazon"), List.of("Bridges"), "55.2%"),
            new PlacementProblemDto(14025L, "Making A Large Island (DSU)", "https://leetcode.com/problems/making-a-large-island/", "https://practice.geeksforgeeks.org/problems/making-a-large-island/1", "https://youtube.com/watch?v=_42600fzmgU", List.of("Google"), List.of("DSU"), "45.8%"),
            new PlacementProblemDto(14026L, "Minimum Cost to Make Valid Path in Grid (0-1 BFS)", "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/", "https://practice.geeksforgeeks.org/problems/valid-path-grid/1", "https://youtube.com/watch?v=Vl3xZ-b0k50", List.of("Google"), List.of("0-1 BFS"), "61.5%"),
            new PlacementProblemDto(14027L, "Bus Routes (Multi-Source BFS)", "https://leetcode.com/problems/bus-routes/", "https://practice.geeksforgeeks.org/problems/bus-routes/1", "https://youtube.com/watch?v=Lk3n0lPjMv0", List.of("Uber"), List.of("BFS"), "45.6%"),
            new PlacementProblemDto(14028L, "Remove Max Number of Edges to Keep Graph Fully Traversable", "https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/", "https://practice.geeksforgeeks.org/problems/remove-max-edges/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("DSU"), "68.2%"),
            new PlacementProblemDto(14029L, "Longest Increasing Path in a Matrix (Memoized DFS)", "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", "https://practice.geeksforgeeks.org/problems/longest-increasing-path-in-a-matrix/1", "https://youtube.com/watch?v=wCc_nd-GiEc", List.of("Google"), List.of("DFS DP"), "52.8%"),
            new PlacementProblemDto(14030L, "Evaluate Division (Weighted Graph Path)", "https://leetcode.com/problems/evaluate-division/", "https://practice.geeksforgeeks.org/problems/evaluate-division/1", "https://youtube.com/watch?v=Uei1jewlKEs", List.of("Amazon"), List.of("Graph DFS"), "61.2%")
        );
    }

    // ─── 15. DYNAMIC PROGRAMMING ──────────────────────────────────────────────
    private List<PlacementProblemDto> buildDpEasy() {
        return List.of(
            new PlacementProblemDto(15001L, "Climbing Stairs", "https://leetcode.com/problems/climbing-stairs/", "https://practice.geeksforgeeks.org/problems/reach-the-nth-point5433/1", "https://youtube.com/watch?v=Y0lT9Fck7qI", List.of("Amazon", "Google"), List.of("1D DP"), "52.1%"),
            new PlacementProblemDto(15002L, "Min Cost Climbing Stairs", "https://leetcode.com/problems/min-cost-climbing-stairs/", "https://practice.geeksforgeeks.org/problems/min-cost-climbing-stairs/1", "https://youtube.com/watch?v=ktmzAZWkEZ0", List.of("Amazon"), List.of("1D DP"), "64.8%"),
            new PlacementProblemDto(15003L, "N-th Tribonacci Number", "https://leetcode.com/problems/n-th-tribonacci-number/", "https://practice.geeksforgeeks.org/problems/tribonacci-number/1", "https://youtube.com/watch?v=3lpqnCv871A", List.of("Apple"), List.of("1D DP"), "63.2%"),
            new PlacementProblemDto(15004L, "House Robber (1D DP)", "https://leetcode.com/problems/house-robber/", "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1", "https://youtube.com/watch?v=73r3KWiEvyk", List.of("Amazon"), List.of("1D DP"), "49.8%"),
            new PlacementProblemDto(15005L, "Pascals Triangle II", "https://leetcode.com/problems/pascals-triangle-ii/", "https://practice.geeksforgeeks.org/problems/pascal-triangle-row/1", "https://youtube.com/watch?v=k_94H_7M6D4", List.of("Amazon"), List.of("Math DP"), "61.8%"),
            new PlacementProblemDto(15006L, "Divisor Game", "https://leetcode.com/problems/divisor-game/", "https://practice.geeksforgeeks.org/problems/divisor-game/1", "https://youtube.com/watch?v=2n-i5b5h8a0", List.of("Google"), List.of("Game DP"), "70.2%"),
            new PlacementProblemDto(15007L, "Counting Bits", "https://leetcode.com/problems/counting-bits/", "https://practice.geeksforgeeks.org/problems/counting-bits/1", "https://youtube.com/watch?v=RyBM56RIWrM", List.of("Amazon"), List.of("Bit DP"), "77.1%"),
            new PlacementProblemDto(15008L, "Fibonacci Number (Tabulation)", "https://leetcode.com/problems/fibonacci-number/", "https://practice.geeksforgeeks.org/problems/nth-fibonacci-number1335/1", "https://youtube.com/watch?v=VypR2BvM5x0", List.of("Amazon"), List.of("1D DP"), "70.2%"),
            new PlacementProblemDto(15009L, "Get Maximum in Generated Array", "https://leetcode.com/problems/get-maximum-in-generated-array/", "https://practice.geeksforgeeks.org/problems/generated-array/1", "https://youtube.com/watch?v=uCsD3ZGzMgE", List.of("Google"), List.of("1D DP"), "50.4%"),
            new PlacementProblemDto(15010L, "Is Subsequence (DP Match)", "https://leetcode.com/problems/is-subsequence/", "https://practice.geeksforgeeks.org/problems/check-for-subsequence4930/1", "https://youtube.com/watch?v=99rvwl65hTU", List.of("Amazon"), List.of("DP"), "47.8%")
        );
    }

    private List<PlacementProblemDto> buildDpMedium() {
        return List.of(
            new PlacementProblemDto(15011L, "Coin Change", "https://leetcode.com/problems/coin-change/", "https://practice.geeksforgeeks.org/problems/coin-change2511/1", "https://youtube.com/watch?v=H9bfqozjoqs", List.of("Amazon", "Google"), List.of("Knapsack DP"), "42.1%"),
            new PlacementProblemDto(15012L, "Longest Increasing Subsequence", "https://leetcode.com/problems/longest-increasing-subsequence/", "https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1", "https://youtube.com/watch?v=cjWnW0hdF1Y", List.of("Amazon", "Google"), List.of("LIS DP"), "53.9%"),
            new PlacementProblemDto(15013L, "Longest Common Subsequence (LCS)", "https://leetcode.com/problems/longest-common-subsequence/", "https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1", "https://youtube.com/watch?v=Ua0GhsJSlWM", List.of("Amazon", "Google"), List.of("2D DP"), "58.9%"),
            new PlacementProblemDto(15014L, "Word Break", "https://leetcode.com/problems/word-break/", "https://practice.geeksforgeeks.org/problems/word-break1352/1", "https://youtube.com/watch?v=Sx9NNgInc3A", List.of("Amazon", "Meta"), List.of("DP"), "46.2%"),
            new PlacementProblemDto(15015L, "House Robber II (Circular)", "https://leetcode.com/problems/house-robber-ii/", "https://practice.geeksforgeeks.org/problems/house-robber-ii/1", "https://youtube.com/watch?v=rWAJCfYYOpM", List.of("Amazon"), List.of("1D DP"), "41.8%"),
            new PlacementProblemDto(15016L, "Partition Equal Subset Sum", "https://leetcode.com/problems/partition-equal-subset-sum/", "https://practice.geeksforgeeks.org/problems/subset-sum-problem2014/1", "https://youtube.com/watch?v=IsvocB5BJVw", List.of("Amazon"), List.of("Knapsack DP"), "46.8%"),
            new PlacementProblemDto(15017L, "Unique Paths (Grid DP)", "https://leetcode.com/problems/unique-paths/", "https://practice.geeksforgeeks.org/problems/number-of-paths0926/1", "https://youtube.com/watch?v=rBAxUTqvlQA", List.of("Amazon", "Google"), List.of("Grid DP"), "63.2%"),
            new PlacementProblemDto(15018L, "Target Sum", "https://leetcode.com/problems/target-sum/", "https://practice.geeksforgeeks.org/problems/target-sum/1", "https://youtube.com/watch?v=g0npyaQtAQM", List.of("Amazon"), List.of("DP"), "46.2%"),
            new PlacementProblemDto(15019L, "Maximum Product Subarray", "https://leetcode.com/problems/maximum-product-subarray/", "https://practice.geeksforgeeks.org/problems/maximum-product-subarray3604/1", "https://youtube.com/watch?v=lXVy6YWFcRM", List.of("Amazon", "Microsoft"), List.of("1D DP"), "34.9%"),
            new PlacementProblemDto(15020L, "Decode Ways", "https://leetcode.com/problems/decode-ways/", "https://practice.geeksforgeeks.org/problems/total-decoding-messages1235/1", "https://youtube.com/watch?v=cQX3yCJ066U", List.of("Amazon", "Meta"), List.of("1D DP"), "33.8%")
        );
    }

    private List<PlacementProblemDto> buildDpHard() {
        return List.of(
            new PlacementProblemDto(15021L, "Edit Distance", "https://leetcode.com/problems/edit-distance/", "https://practice.geeksforgeeks.org/problems/edit-distance3702/1", "https://youtube.com/watch?v=XYi2-LPrwm4", List.of("Google", "Amazon"), List.of("2D DP"), "55.2%"),
            new PlacementProblemDto(15022L, "Burst Balloons (Interval DP)", "https://leetcode.com/problems/burst-balloons/", "https://practice.geeksforgeeks.org/problems/burst-balloons/1", "https://youtube.com/watch?v=VFskby7lUbw", List.of("Google"), List.of("Interval DP"), "57.8%"),
            new PlacementProblemDto(15023L, "Regular Expression Matching", "https://leetcode.com/problems/regular-expression-matching/", "https://practice.geeksforgeeks.org/problems/regular-expression-matching/1", "https://youtube.com/watch?v=HAA8mg6txX0", List.of("Google", "Meta"), List.of("2D DP"), "28.1%"),
            new PlacementProblemDto(15024L, "Distinct Subsequences", "https://leetcode.com/problems/distinct-subsequences/", "https://practice.geeksforgeeks.org/problems/number-of-distinct-subsequences0941/1", "https://youtube.com/watch?v=mPqqXh8XvWY", List.of("Google"), List.of("String DP"), "45.1%"),
            new PlacementProblemDto(15025L, "Wildcard Matching", "https://leetcode.com/problems/wildcard-matching/", "https://practice.geeksforgeeks.org/problems/wildcard-pattern-matching/1", "https://youtube.com/watch?v=3ZDZ-N0EPV0", List.of("Google"), List.of("2D DP"), "27.5%"),
            new PlacementProblemDto(15026L, "Minimum Insertion Steps to Make a String Palindrome", "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", "https://practice.geeksforgeeks.org/problems/form-a-palindrome1455/1", "https://youtube.com/watch?v=xPBLEj41rFU", List.of("Amazon"), List.of("LCS DP"), "68.2%"),
            new PlacementProblemDto(15027L, "Interleaving String", "https://leetcode.com/problems/interleaving-string/", "https://practice.geeksforgeeks.org/problems/interleaved-strings/1", "https://youtube.com/watch?v=3Rw3p9LrgvE", List.of("Google"), List.of("2D DP"), "38.9%"),
            new PlacementProblemDto(15028L, "Frog Jump (Stone Crossing DP)", "https://leetcode.com/problems/frog-jump/", "https://practice.geeksforgeeks.org/problems/frog-jump/1", "https://youtube.com/watch?v=oT_64C3sF-4", List.of("Google"), List.of("DP"), "44.2%"),
            new PlacementProblemDto(15029L, "Maximum Sum of 3 Non-Overlapping Subarrays", "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/", "https://practice.geeksforgeeks.org/problems/max-sum-subarrays/1", "https://youtube.com/watch?v=1eXvBLk_u0g", List.of("Google"), List.of("DP"), "49.0%"),
            new PlacementProblemDto(15030L, "Super Egg Drop (Egg Dropping Puzzle)", "https://leetcode.com/problems/super-egg-drop/", "https://practice.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1", "https://youtube.com/watch?v=S49zeUjeUL0", List.of("Google"), List.of("Binary Search DP"), "27.8%")
        );
    }
}
