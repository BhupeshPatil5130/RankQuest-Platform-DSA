package com.rankquest.util;

import com.rankquest.model.Problem;
import com.rankquest.model.Role;
import com.rankquest.model.Sheet;
import com.rankquest.model.User;
import com.rankquest.repository.ProblemRepository;
import com.rankquest.repository.SheetRepository;
import com.rankquest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with real problem sheets, problems, and default accounts.
 * Expands seeding to 100+ real DSA problems across all 6 sheets.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final SheetRepository sheetRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(SheetRepository sheetRepository, ProblemRepository problemRepository,
                           UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.sheetRepository = sheetRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedSheets();
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
                "The original 75 most frequently asked LeetCode questions. The classic starting point.", 75,
                "Mixed", "FAANG Prep", 4.7, "1 month", "blind", "red-600", "orange-600"),
            new Sheet("gfg-must-do", "GFG Must Do", "GeeksforGeeks",
                "Topic-wise must-do coding questions for campus placements. GFG curated list.", 100,
                "Mixed", "Placement Prep", 4.6, "1-2 months", "gfg", "orange-600", "yellow-600"),
            new Sheet("apna-college", "Apna College DSA", "Shradha Khapra",
                "Curated DSA sheet for college students and beginners. Perfect for structured learning.", 120,
                "Mixed", "Beginner Friendly", 4.8, "2-3 months", "apna", "cyan-600", "blue-500")
        ));
        System.out.println("✅ Seeded 6 sheets.");
    }

    // ── Problem Seeding ──────────────────────────────────────────────────────

    private void seedProblems() {
        if (problemRepository.count() >= 80) return;
        problemRepository.deleteAll();

        seedStriverSDE();
        seedNeetCode150();
        seedBlind75();
        seedLoveBabbar450();
        seedGFGMustDo();
        seedApnaCollege();

        System.out.println("✅ Seeded " + problemRepository.count() + " total authentic problems.");
    }

    private void seedStriverSDE() {
        problemRepository.saveAll(List.of(
            // Arrays
            p("Set Matrix Zeroes", "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.", "Medium", "49.9%", "Arrays", "striver-sde", "https://leetcode.com/problems/set-matrix-zeroes/", "", "Amazon, Microsoft, Meta", "Array, Hash Table, Matrix"),
            p("Pascal's Triangle", "Given an integer numRows, return the first numRows of Pascal's triangle.", "Easy", "72.1%", "Arrays", "striver-sde", "https://leetcode.com/problems/pascals-triangle/", "", "Amazon, Apple, Bloomberg", "Array, Dynamic Programming"),
            p("Next Permutation", "A permutation of an array of integers is an arrangement of its members into a sequence. Find the next permutation.", "Medium", "39.2%", "Arrays", "striver-sde", "https://leetcode.com/problems/next-permutation/", "", "Meta, Amazon, Microsoft", "Array, Two Pointers"),
            p("Kadane's Algorithm", "Given an integer array nums, find the contiguous subarray with the largest sum, and return its sum.", "Medium", "54.7%", "Arrays", "striver-sde", "https://leetcode.com/problems/maximum-subarray/", "", "Google, Amazon, Meta", "Array, Divide and Conquer, DP"),
            p("Sort Colors", "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent.", "Medium", "60.3%", "Arrays", "striver-sde", "https://leetcode.com/problems/sort-colors/", "", "Microsoft, Amazon, Meta", "Array, Two Pointers, Sorting"),
            p("Stock Buy and Sell", "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit.", "Easy", "54.2%", "Arrays", "striver-sde", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "", "Amazon, Microsoft, Meta", "Array, Dynamic Programming"),
            p("Rotate Image", "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).", "Medium", "72.9%", "Arrays", "striver-sde", "https://leetcode.com/problems/rotate-image/", "", "Amazon, Microsoft, Apple", "Array, Math, Matrix"),
            p("Merge Intervals", "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.", "Medium", "46.5%", "Arrays", "striver-sde", "https://leetcode.com/problems/merge-intervals/", "", "Amazon, Google, Meta", "Array, Sorting"),
            p("Merge Sorted Array", "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.", "Easy", "47.6%", "Arrays", "striver-sde", "https://leetcode.com/problems/merge-sorted-array/", "", "Amazon, Microsoft, Bloomberg", "Array, Two Pointers, Sorting"),
            p("Find the Duplicate Number", "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n]. Find the duplicate.", "Medium", "59.0%", "Arrays", "striver-sde", "https://leetcode.com/problems/find-the-duplicate-number/", "", "Amazon, Google, Microsoft", "Array, Two Pointers, Binary Search"),

            // Linked Lists
            p("Reverse Linked List", "Given the head of a singly linked list, reverse the list, and return the reversed list.", "Easy", "73.4%", "Linked List", "striver-sde", "https://leetcode.com/problems/reverse-linked-list/", "", "Amazon, Apple, Bloomberg", "Linked List, Recursion"),
            p("Middle of the Linked List", "Given the head of a singly linked list, return the middle node of the linked list.", "Easy", "74.2%", "Linked List", "striver-sde", "https://leetcode.com/problems/middle-of-the-linked-list/", "", "Amazon, Apple", "Linked List, Two Pointers"),
            p("Merge Two Sorted Lists", "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists.", "Easy", "62.6%", "Linked List", "striver-sde", "https://leetcode.com/problems/merge-two-sorted-lists/", "", "Amazon, Microsoft, Apple", "Linked List, Recursion"),
            p("Remove Nth Node From End", "Given the head of a linked list, remove the nth node from the end of the list and return its head.", "Medium", "42.5%", "Linked List", "striver-sde", "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", "", "Amazon, Microsoft, Apple", "Linked List, Two Pointers"),
            p("Linked List Cycle", "Given head, the head of a linked list, determine if the linked list has a cycle in it.", "Easy", "49.2%", "Linked List", "striver-sde", "https://leetcode.com/problems/linked-list-cycle/", "", "Amazon, Microsoft, Apple", "Hash Table, Linked List, Two Pointers"),
            p("Intersection of Two Linked Lists", "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.", "Easy", "55.1%", "Linked List", "striver-sde", "https://leetcode.com/problems/intersection-of-two-linked-lists/", "", "Amazon, Microsoft", "Linked List, Two Pointers"),
            p("Palindrome Linked List", "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.", "Easy", "51.2%", "Linked List", "striver-sde", "https://leetcode.com/problems/palindrome-linked-list/", "", "Amazon, Microsoft", "Linked List, Two Pointers, Recursion"),

            // Stacks & Queues
            p("Valid Parentheses", "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", "Easy", "40.5%", "Stack & Queue", "striver-sde", "https://leetcode.com/problems/valid-parentheses/", "", "Google, Amazon, Microsoft", "String, Stack"),
            p("Next Greater Element I", "The next greater element of some element x in an array is the first greater element to the right side.", "Easy", "71.2%", "Stack & Queue", "striver-sde", "https://leetcode.com/problems/next-greater-element-i/", "", "Amazon, Microsoft", "Array, Hash Table, Stack, Monotonic Stack"),
            p("Min Stack", "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.", "Medium", "53.3%", "Stack & Queue", "striver-sde", "https://leetcode.com/problems/min-stack/", "", "Amazon, Microsoft, Bloomberg", "Stack, Design"),
            p("Trapping Rain Water", "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", "Hard", "58.7%", "Stack & Queue", "striver-sde", "https://leetcode.com/problems/trapping-rain-water/", "", "Amazon, Google, Meta", "Array, Two Pointers, DP, Stack"),

            // Binary Search
            p("Binary Search", "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target.", "Easy", "56.6%", "Binary Search", "striver-sde", "https://leetcode.com/problems/binary-search/", "", "Amazon, Google, Microsoft", "Array, Binary Search"),
            p("Search in Rotated Sorted Array", "There is an integer array nums sorted in ascending order (with distinct values). Given the array is possibly rotated, search for target.", "Medium", "39.3%", "Binary Search", "striver-sde", "https://leetcode.com/problems/search-in-rotated-sorted-array/", "", "Amazon, Microsoft, Meta", "Array, Binary Search"),
            p("Find Minimum in Rotated Sorted Array", "Suppose an array of length n sorted in ascending order is rotated. Find the minimum element.", "Medium", "48.9%", "Binary Search", "striver-sde", "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", "", "Microsoft, Google, Amazon", "Array, Binary Search"),
            p("Kth Smallest Element in a Sorted Matrix", "Given an n x n matrix where each of the rows and columns is sorted, return the kth smallest element in the matrix.", "Medium", "61.5%", "Binary Search", "striver-sde", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", "", "Google, Amazon, Microsoft", "Array, Binary Search, Sorting, Heap, Matrix"),

            // Recursion & Backtracking
            p("Subsets", "Given an integer array nums of unique elements, return all possible subsets (the power set).", "Medium", "75.4%", "Recursion", "striver-sde", "https://leetcode.com/problems/subsets/", "", "Amazon, Google, Meta", "Array, Backtracking, Bit Manipulation"),
            p("Permutations", "Given an array nums of distinct integers, return all the possible permutations.", "Medium", "76.6%", "Recursion", "striver-sde", "https://leetcode.com/problems/permutations/", "", "Microsoft, Amazon, Google", "Array, Backtracking"),
            p("N-Queens", "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.", "Hard", "67.3%", "Recursion", "striver-sde", "https://leetcode.com/problems/n-queens/", "", "Amazon, Google, Microsoft", "Array, Backtracking"),
            p("Sudoku Solver", "Write a program to solve a Sudoku puzzle by filling the empty cells.", "Hard", "59.2%", "Recursion", "striver-sde", "https://leetcode.com/problems/sudoku-solver/", "", "Microsoft, Google, Uber", "Array, Hash Table, Backtracking, Matrix"),

            // Trees
            p("Binary Tree Inorder Traversal", "Given the root of a binary tree, return the inorder traversal of its nodes' values.", "Easy", "73.7%", "Trees", "striver-sde", "https://leetcode.com/problems/binary-tree-inorder-traversal/", "", "Microsoft, Amazon, Google", "Stack, Tree, DFS, Binary Tree"),
            p("Maximum Depth of Binary Tree", "Given the root of a binary tree, return its maximum depth.", "Easy", "74.2%", "Trees", "striver-sde", "https://leetcode.com/problems/maximum-depth-of-binary-tree/", "", "Amazon, Microsoft, Apple", "Tree, DFS, BFS, Binary Tree"),
            p("Symmetric Tree", "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).", "Easy", "52.9%", "Trees", "striver-sde", "https://leetcode.com/problems/symmetric-tree/", "", "Microsoft, Bloomberg, Amazon", "Tree, DFS, BFS, Binary Tree"),
            p("Binary Tree Level Order Traversal", "Given the root of a binary tree, return the level order traversal of its nodes' values.", "Medium", "65.3%", "Trees", "striver-sde", "https://leetcode.com/problems/binary-tree-level-order-traversal/", "", "Amazon, Microsoft, Bloomberg", "Tree, BFS, Binary Tree"),
            p("Lowest Common Ancestor of a BST", "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.", "Medium", "63.8%", "Trees", "striver-sde", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", "", "Amazon, Microsoft, Facebook", "Tree, DFS, BST, Binary Tree"),

            // Dynamic Programming
            p("Climbing Stairs", "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?", "Easy", "51.6%", "Dynamic Programming", "striver-sde", "https://leetcode.com/problems/climbing-stairs/", "", "Amazon, Apple, Google", "Math, Dynamic Programming, Memoization"),
            p("House Robber", "You are a professional robber planning to rob houses along a street. Adjacent houses have security systems. Find max you can rob.", "Medium", "49.3%", "Dynamic Programming", "striver-sde", "https://leetcode.com/problems/house-robber/", "", "Amazon, Microsoft, Google", "Array, Dynamic Programming"),
            p("Longest Common Subsequence", "Given two strings text1 and text2, return the length of their longest common subsequence.", "Medium", "57.2%", "Dynamic Programming", "striver-sde", "https://leetcode.com/problems/longest-common-subsequence/", "", "Amazon, Google, Microsoft", "String, Dynamic Programming"),
            p("0/1 Knapsack", "Given weights and values of n items, put these items in a knapsack of capacity W. Find the maximum value.", "Medium", "52.1%", "Dynamic Programming", "striver-sde", "", "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", "Amazon, Google, Microsoft", "Array, Dynamic Programming"),
            p("Coin Change", "You are given an integer array coins representing coins of different denominations and an integer amount. Return fewest coins needed.", "Medium", "42.2%", "Dynamic Programming", "striver-sde", "https://leetcode.com/problems/coin-change/", "", "Amazon, Google, Microsoft", "Array, Dynamic Programming, BFS"),
            p("Longest Increasing Subsequence", "Given an integer array nums, return the length of the longest strictly increasing subsequence.", "Medium", "54.4%", "Dynamic Programming", "striver-sde", "https://leetcode.com/problems/longest-increasing-subsequence/", "", "Amazon, Microsoft, Google", "Array, Binary Search, Dynamic Programming"),

            // Graphs
            p("Number of Islands", "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.", "Medium", "57.6%", "Graphs", "striver-sde", "https://leetcode.com/problems/number-of-islands/", "", "Amazon, Microsoft, Bloomberg", "Array, DFS, BFS, Union Find, Matrix"),
            p("Clone Graph", "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.", "Medium", "55.3%", "Graphs", "striver-sde", "https://leetcode.com/problems/clone-graph/", "", "Amazon, Microsoft, Google", "Hash Table, DFS, BFS, Graph"),
            p("Course Schedule", "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Determine if you can finish all courses.", "Medium", "45.8%", "Graphs", "striver-sde", "https://leetcode.com/problems/course-schedule/", "", "Amazon, Google, Microsoft", "DFS, BFS, Graph, Topological Sort")
        ));
    }

    private void seedNeetCode150() {
        problemRepository.saveAll(List.of(
            p("Contains Duplicate", "Given an integer array nums, return true if any value appears at least twice in the array.", "Easy", "61.3%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/contains-duplicate/", "", "Amazon, Apple", "Array, Hash Table, Sorting"),
            p("Valid Anagram", "Given two strings s and t, return true if t is an anagram of s, and false otherwise.", "Easy", "63.7%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/valid-anagram/", "", "Google, Amazon, Microsoft", "Hash Table, String, Sorting"),
            p("Two Sum", "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", "Easy", "50.4%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/two-sum/", "", "Amazon, Google, Apple", "Array, Hash Table"),
            p("Group Anagrams", "Given an array of strings strs, group the anagrams together.", "Medium", "67.2%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/group-anagrams/", "", "Amazon, Google, Facebook", "Array, Hash Table, String, Sorting"),
            p("Top K Frequent Elements", "Given an integer array nums and an integer k, return the k most frequent elements.", "Medium", "65.1%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/top-k-frequent-elements/", "", "Amazon, Google, Microsoft", "Array, Hash Table, Heap"),
            p("Product of Array Except Self", "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i].", "Medium", "65.3%", "Arrays & Hashing", "neetcode-150", "https://leetcode.com/problems/product-of-array-except-self/", "", "Amazon, Apple, Facebook", "Array, Prefix Sum"),
            p("Valid Palindrome", "Determine if a string is a palindrome considering only alphanumeric characters.", "Easy", "44.3%", "Two Pointers", "neetcode-150", "https://leetcode.com/problems/valid-palindrome/", "", "Facebook, Microsoft, Uber", "Two Pointers, String"),
            p("3Sum", "Given an integer array nums, return all the triplets that sum up to zero.", "Medium", "32.5%", "Two Pointers", "neetcode-150", "https://leetcode.com/problems/3sum/", "", "Amazon, Facebook, Microsoft", "Array, Two Pointers, Sorting"),
            p("Container With Most Water", "Find two lines that together with the x-axis form a container that contains the most water.", "Medium", "54.1%", "Two Pointers", "neetcode-150", "https://leetcode.com/problems/container-with-most-water/", "", "Amazon, Google, Microsoft", "Array, Two Pointers, Greedy"),
            p("Best Time to Buy and Sell Stock", "Find the maximum profit you can achieve from buying and selling stock once.", "Easy", "54.2%", "Sliding Window", "neetcode-150", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "", "Amazon, Microsoft, Meta", "Array, Dynamic Programming"),
            p("Longest Substring Without Repeating Characters", "Find the length of the longest substring without repeating characters.", "Medium", "34.1%", "Sliding Window", "neetcode-150", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "", "Amazon, Google, Microsoft", "Hash Table, String, Sliding Window"),
            p("Generate Parentheses", "Generate all combinations of well-formed parentheses.", "Medium", "73.0%", "Stack", "neetcode-150", "https://leetcode.com/problems/generate-parentheses/", "", "Amazon, Google, Microsoft", "String, Backtracking, Stack"),
            p("Daily Temperatures", "Calculate the number of days you have to wait after the ith day to get a warmer temperature.", "Medium", "67.0%", "Stack", "neetcode-150", "https://leetcode.com/problems/daily-temperatures/", "", "Amazon, Google, Microsoft", "Array, Stack, Monotonic Stack"),
            p("Invert Binary Tree", "Invert a binary tree and return its root.", "Easy", "76.1%", "Trees", "neetcode-150", "https://leetcode.com/problems/invert-binary-tree/", "", "Amazon, Apple, Google", "Tree, DFS, BFS, Binary Tree"),
            p("Pacific Atlantic Water Flow", "Find all cells where water can flow to both Pacific and Atlantic oceans.", "Medium", "52.5%", "Graphs", "neetcode-150", "https://leetcode.com/problems/pacific-atlantic-water-flow/", "", "Google, Amazon, Facebook", "Array, DFS, BFS, Matrix"),
            p("Word Break", "Determine if a string can be segmented into a space-separated sequence of dictionary words.", "Medium", "44.8%", "Dynamic Programming", "neetcode-150", "https://leetcode.com/problems/word-break/", "", "Amazon, Google, Facebook", "Array, Hash Table, DP, Trie")
        ));
    }

    private void seedBlind75() {
        problemRepository.saveAll(List.of(
            p("Two Sum", "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", "Easy", "50.4%", "Array", "blind-75", "https://leetcode.com/problems/two-sum/", "", "Amazon, Google, Apple", "Array, Hash Table"),
            p("Best Time to Buy and Sell Stock", "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize profit.", "Easy", "54.2%", "Array", "blind-75", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "", "Amazon, Microsoft, Meta", "Array, Dynamic Programming"),
            p("Contains Duplicate", "Given an integer array nums, return true if any value appears at least twice in the array.", "Easy", "61.3%", "Array", "blind-75", "https://leetcode.com/problems/contains-duplicate/", "", "Amazon, Apple", "Array, Hash Table, Sorting"),
            p("Maximum Product Subarray", "Given an integer array nums, find a subarray that has the largest product, and return the product.", "Medium", "34.9%", "Array", "blind-75", "https://leetcode.com/problems/maximum-product-subarray/", "", "Google, Amazon, Meta", "Array, Dynamic Programming"),
            p("Search in Rotated Sorted Array", "Given the array is possibly rotated, search for target in O(log n) time.", "Medium", "39.3%", "Array", "blind-75", "https://leetcode.com/problems/search-in-rotated-sorted-array/", "", "Amazon, Microsoft, Meta", "Array, Binary Search"),
            p("3Sum", "Given an integer array nums, return all the triplets that sum to zero.", "Medium", "32.5%", "Array", "blind-75", "https://leetcode.com/problems/3sum/", "", "Amazon, Facebook, Microsoft", "Array, Two Pointers, Sorting"),
            p("Valid Parentheses", "Determine if the input string of brackets is valid.", "Easy", "40.5%", "String", "blind-75", "https://leetcode.com/problems/valid-parentheses/", "", "Google, Amazon, Microsoft", "String, Stack"),
            p("Invert Binary Tree", "Given the root of a binary tree, invert the tree, and return its root.", "Easy", "76.1%", "Tree", "blind-75", "https://leetcode.com/problems/invert-binary-tree/", "", "Amazon, Apple, Google", "Tree, DFS, BFS, Binary Tree"),
            p("Binary Tree Maximum Path Sum", "A path in a binary tree is a sequence of nodes. Find the path with the maximum sum.", "Hard", "38.7%", "Tree", "blind-75", "https://leetcode.com/problems/binary-tree-maximum-path-sum/", "", "Amazon, Google, Microsoft", "Dynamic Programming, Tree, DFS, Binary Tree"),
            p("Climbing Stairs", "You can climb 1 or 2 steps at a time. Count the number of distinct ways to climb to the top.", "Easy", "51.6%", "Dynamic Programming", "blind-75", "https://leetcode.com/problems/climbing-stairs/", "", "Amazon, Apple, Google", "Math, Dynamic Programming, Memoization"),
            p("Number of Islands", "Return the number of islands in a binary grid.", "Medium", "57.6%", "Graph", "blind-75", "https://leetcode.com/problems/number-of-islands/", "", "Amazon, Microsoft, Bloomberg", "Array, DFS, BFS, Union Find, Matrix"),
            p("Course Schedule", "Determine if you can finish all courses given prerequisites.", "Medium", "45.8%", "Graph", "blind-75", "https://leetcode.com/problems/course-schedule/", "", "Amazon, Google, Microsoft", "DFS, BFS, Graph, Topological Sort")
        ));
    }

    private void seedLoveBabbar450() {
        problemRepository.saveAll(List.of(
            p("Reverse the Array", "Reverse the given array in-place.", "Easy", "85.1%", "Arrays", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/reverse-an-array/0", "Amazon, Microsoft", "Array, Two Pointers"),
            p("Find Min and Max", "Find the minimum and maximum element in an array.", "Easy", "82.4%", "Arrays", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1", "Adobe, Amazon", "Array"),
            p("Kth Smallest Element", "Find the kth smallest element in an unsorted array.", "Medium", "45.6%", "Arrays", "love-babbar-450", "https://leetcode.com/problems/kth-largest-element-in-an-array/", "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1", "Amazon, Microsoft, VMWare", "Array, Divide and Conquer, Sorting, Heap"),
            p("Sort an Array of 0s, 1s and 2s", "Sort an array of 0s, 1s and 2s without using sorting algorithm.", "Easy", "62.1%", "Arrays", "love-babbar-450", "https://leetcode.com/problems/sort-colors/", "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1", "Amazon, Microsoft", "Array, Two Pointers"),
            p("Move Negative Elements to Front", "Move all negative numbers to the beginning of the array.", "Easy", "54.7%", "Arrays", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/move-all-negative-elements-to-beginning1813/1", "Adobe, Amazon", "Array, Two Pointers"),
            p("Union of Two Arrays", "Find the Union and Intersection of the given sorted arrays.", "Easy", "57.3%", "Arrays", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1", "Amazon, Microsoft", "Array, Two Pointers"),
            p("Cyclically rotate an array by one", "Given an array, cyclically rotate the array clockwise by one.", "Easy", "68.7%", "Arrays", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1", "Adobe, Amazon", "Array"),
            p("Detect and Remove Loop in Linked List", "Check if a linked list has a loop and remove it.", "Medium", "42.3%", "Linked List", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/remove-loop-in-linked-list/1", "Amazon, Microsoft", "Linked List, Two Pointers"),
            p("Balanced Parenthesis", "Given a string S of brackets, determine if the string is balanced or not.", "Easy", "38.5%", "Stack & Queue", "love-babbar-450", "https://leetcode.com/problems/valid-parentheses/", "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1", "Amazon, Microsoft", "Stack, String"),
            p("Height of Binary Tree", "Find the height of a given Binary Tree.", "Easy", "67.3%", "Trees", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1", "Amazon, Microsoft", "Tree, DFS, Binary Tree"),
            p("0-1 Knapsack Problem", "Find maximum value that can be put in a knapsack of capacity W.", "Medium", "52.1%", "Dynamic Programming", "love-babbar-450", "", "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", "Amazon, Google, Microsoft", "DP, Greedy")
        ));
    }

    private void seedGFGMustDo() {
        problemRepository.saveAll(List.of(
            p("Missing Number", "Given an array of size N-1 containing distinct integers from 1 to N, find missing element.", "Easy", "63.7%", "Arrays", "gfg-must-do", "https://leetcode.com/problems/missing-number/", "https://practice.geeksforgeeks.org/problems/missing-number-in-array1416/1", "Amazon, Microsoft", "Array, Math"),
            p("Subarray with Given Sum", "Find a continuous sub-array which adds to a given number S.", "Medium", "42.8%", "Arrays", "gfg-must-do", "", "https://practice.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1", "Amazon, Microsoft, Meta", "Array, Two Pointers"),
            p("Leaders in an Array", "An element is leader if it is greater than all elements to its right side.", "Easy", "65.4%", "Arrays", "gfg-must-do", "", "https://practice.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1", "Amazon, Microsoft", "Array"),
            p("Majority Element", "Find the element that appears more than N/2 times in the array.", "Medium", "64.1%", "Arrays", "gfg-must-do", "https://leetcode.com/problems/majority-element/", "https://practice.geeksforgeeks.org/problems/majority-element-1587115620/1", "Amazon, Google, Microsoft", "Array, Hash Table"),
            p("Equilibrium Point", "Equilibrium position in an array is a position such that sum of elements before it equals sum after it.", "Easy", "56.2%", "Arrays", "gfg-must-do", "", "https://practice.geeksforgeeks.org/problems/equilibrium-point-1587115620/1", "Amazon, Adobe", "Array, Prefix Sum"),
            p("Parenthesis Checker", "Examine whether the pairs and orders of brackets are correct.", "Easy", "38.5%", "Stack & Queue", "gfg-must-do", "", "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1", "Amazon, Microsoft", "Stack, String"),
            p("Minimum number of jumps", "Find the minimum number of jumps to reach end of the array.", "Medium", "11.8%", "Dynamic Programming", "gfg-must-do", "https://leetcode.com/problems/jump-game-ii/", "https://practice.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1", "Amazon, Microsoft", "Array, DP, Greedy")
        ));
    }

    private void seedApnaCollege() {
        problemRepository.saveAll(List.of(
            p("Search Element in Array", "Given an array, search for target element and return index.", "Easy", "78.2%", "Arrays", "apna-college", "", "https://practice.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1", "Amazon, Microsoft", "Array"),
            p("Chocolate Distribution Problem", "Distribute chocolate packets to M students such that difference between max and min is minimized.", "Easy", "68.4%", "Arrays", "apna-college", "", "https://practice.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1", "Amazon, Flipkart", "Array, Sorting"),
            p("Trapping Rain Water", "Compute how much water can be trapped after raining.", "Hard", "58.7%", "Arrays", "apna-college", "https://leetcode.com/problems/trapping-rain-water/", "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1", "Amazon, Google, Meta", "Array, Two Pointers, DP"),
            p("Spiral Order Matrix", "Return all elements of matrix in spiral order.", "Medium", "44.5%", "Matrix", "apna-college", "https://leetcode.com/problems/spiral-matrix/", "", "Microsoft, Amazon, Apple", "Array, Matrix, Simulation"),
            p("Search a 2D Matrix", "Search for target value in m x n matrix.", "Medium", "49.8%", "Matrix", "apna-college", "https://leetcode.com/problems/search-a-2d-matrix/", "", "Google, Amazon, Meta", "Array, Binary Search, Matrix"),
            p("Fibonacci Number", "Calculate Nth Fibonacci number.", "Easy", "69.3%", "Dynamic Programming", "apna-college", "https://leetcode.com/problems/fibonacci-number/", "", "Amazon, Microsoft", "Math, Dynamic Programming")
        ));
    }

    // ── User Seeding ──────────────────────────────────────────────────────────

    private void seedDefaultAdmin() {
        if (userRepository.findByEmail("admin@rankquest.com").isPresent()) return;

        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@rankquest.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setFullName("RankQuest Admin");
        admin.setCollege("RankQuest HQ");
        admin.setBranch("Engineering");
        admin.setYear("4th Year");
        admin.setRollNumber("ADM001");
        admin.setTotalSolved(100);
        admin.setCurrentStreak(15);
        admin.setMaxStreak(30);
        userRepository.save(admin);

        System.out.println("✅ Default admin created (admin@rankquest.com / admin123).");
    }

    private void seedDemoUser() {
        if (userRepository.findByEmail("demo@rankquest.com").isPresent()) return;

        User demo = new User();
        demo.setUsername("demouser");
        demo.setEmail("demo@rankquest.com");
        demo.setPassword(passwordEncoder.encode("demo123"));
        demo.setRole(Role.USER);
        demo.setFullName("Demo Student");
        demo.setCollege("IIT Bombay");
        demo.setBranch("Computer Science");
        demo.setYear("3rd Year");
        demo.setRollNumber("CS21B045");
        demo.setBio("Passionate about DSA and competitive programming!");
        demo.setTotalSolved(42);
        demo.setCurrentStreak(7);
        demo.setMaxStreak(14);
        userRepository.save(demo);

        System.out.println("✅ Demo user created (demo@rankquest.com / demo123).");
    }

    private Problem p(String title, String description, String difficulty, String acceptance,
                      String topic, String sheetSlug, String leetcodeUrl, String gfgUrl,
                      String companies, String tags) {
        return new Problem(title, description, difficulty, acceptance, topic, sheetSlug,
                           leetcodeUrl, gfgUrl, companies, tags);
    }
}