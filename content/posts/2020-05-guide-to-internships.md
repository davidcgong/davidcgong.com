<!-- ---
title: "Preparing for technical interviews (intro)"
date: 2020-05-09T19:30:08+10:00
template: "post"
draft: false
slug: "/posts/tech-interview-prep-intro"
category: "Interview Prep"
tags:
  - "Interview Prep"
  - "Engineering"
description: "An introduction to technical interviews for target companies, in addition to criteria that recruiters are looking for when selecting interviewees."
---
>Disclaimer: This post and other posts in the series is mostly targeted towards landing a job at companies that primarily test DS&A (data structures & algorithms) in their coding interviews to hire interns and new graduate software engineers.

In these series, I will mostly explain various data structures & algorithms that are covered in coding interviews - and how to apply it for some of these questions. For this post specifically, I'd like to introduce those new to the coding interview process about what it entails, and how to get your resume shortlisted by big tech companies.

<img src="https://miro.medium.com/max/3000/1*ambW6_d_zweYvV5DdyblxA.png" width="200" height="200">

>**It's not just FAANG!** There's also companies such as Microsoft, LinkedIn, Uber, Lyft, Airbnb, Citadel, Two Sigma, Bloomberg, Stripe, and many more that utilize similar coding interview processes.

For reasons on why it's a game changer to be at some of these companies, have a look at some statistics here:

<a href="https://www.levels.fyi/2019/" target="_blank">Top paying companies in 2019</a><br>
<a href="https://www.levels.fyi/internships/" target="_blank">Internships</a><br>
<a href="https://www.whereto.tech/companies/" target="_blank">New graduates</a><br>

Of course, there is much more to life than working for a big tech company. 

But the purpose of this post is to introduce those interested in working for these companies the process that these companies employ when hiring new graduates and interns. I'm obviously not qualified to help senior engineers, but do know that senior engineers typically do have to do DS&A questions as well, **in addition to doing system design rounds**.


## Introduction

As you probably know, technical interviews are somewhat notorious for determining potential hires for lots of the target companies. Often times, they require in-depth knowledge of data structures & algorithms, and how to apply them. You will encounter various scenarios in the workplace where you may need to utilize these fundamentals efficiently to build scalable code and processes.

Unfortunately, though universities often teach about the fundamentals and implementations of basic data structures & algorithms, they seldom teach these students how to apply these concepts to solve problems that are encountered in interviews.

I'll cover some popular problems in each of the subcategory in later posts for these series, but the main focus for the introduction is to talk briefly about two things.

1. How to polish your resume
2. Study methodologies for the coding interview


 <!-- If you're more concerned about learning how to get interviews over the soft introduction to a coding interview example, click <a href="">here</a>.

## Soft intro to a coding interview example (Easy)

As an example, let's start with probably one of the easier questions you might see.

### Two Sum
>Given an array of integers and a target sum, find two numbers within the array that add up to the target sum, and return the indices of these two integers.

For any interview question, even one on the easier side such as this, interviewers want to see two things.
1. You can optimize / communicate both the time complexity and space complexity as well as tradeoffs if there are any.
2. You know how to code without much syntax issues.

For someone that is completely new to the coding interview process, they may think, okay that doesn't sound so hard. Why not just look at each element in the array, and then check to see if any other elements in the array will end up resulting in the target sum if added. A naive implementation might look something like this:

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
  for (int i = 0; i < nums.size() - 1; i++) 
    for (int j = i+1; j < nums.size(); j++) 
      if (nums[i] + nums[j] == target) 
          return vector<int> {i, j};
  return vector<int> {}; // if we didn't return in the double loop, there is no match
}

```

Time complexity: $O(n^2)$
Space complexity : $O(1)$

Since this is a brute force solution, your interviewer may be waiting to see what else you can do to make this algorithm more "efficient".  -->
 -->
