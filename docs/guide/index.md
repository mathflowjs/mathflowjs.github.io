# Introduction

Welcome to the official documentation for [MathFlow](https://github.com/mathflowjs/mathflow)!

## What is MathFlow?

**MathFlow** is a lightweight, expressive JavaScript library for mathematical expressions and calculations. It provides a simple, intuitive syntax for arithmetic, algebra, trigonometry, logarithms, and more.

## What MathFlow is not

::: warning

- MathFlow is not a general-purpose programming language. It is focused on mathematical computation and basic scripting.
  :::

## Main Objectives

MathFlow aims for _expressiveness_, _focus_, and _simplicity_, making it ideal for math-centric applications, calculators, and educational tools.

## How it Works

MathFlow exposes an [API](../api/index.md) for evaluating code, solving equations, rendering, and more. The typical evaluation process:

1. A global scope for variables is created.
2. Source code is split into statements, whitespace is trimmed, and composite terms like `2x` are expanded to `2*x`.
3. Variable declarations are executed and stored in the scope.
4. Each statement is tokenized, parsed into an AST, and interpreted.
5. The result of the last statement is returned, along with the final scope.
