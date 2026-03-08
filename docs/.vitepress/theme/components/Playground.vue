<script setup>
import InputPanel from "./InputPanel.vue";
import OutputPanel from "./OutputPanel.vue";
import { reactive } from "vue";
import {
	createContext,
	createSolutionStack,
	tokenize,
	renderTokensAsHTML,
	renderTokensAsLaTeX,
	evaluate,
	parse,
} from "@mathflowjs/mathflow";

const state = reactive({
	tokens: [],
	html: "",
	latex: "",
	executionTime: "-",
	variables: "",
	result: null,
	solution: null,
	error: null,
});

// create evaluation context
const ctx = createContext({
	preferences: {
		fractionDigits: 3,
		precision: 15,
		angles: "deg",
	},
});

// utility to solve a given math expression string
// - steps taken
//      - tokenize input string
//      - parse tokens into AST tree
//      - evaluate and solve each node in AST body
//      - render solution as HTML
function evaluateExpression(code = "") {
	resetAll();

	const startTime = Date.now();

	try {
		const tokens = tokenize(ctx, code);
		state.tokens = tokens;

		const htmlStr = renderTokensAsHTML(tokens, { colorScheme: "auto" });
		state.html = htmlStr;

		const latexStr = renderTokensAsLaTeX(tokens, { mode: "align" });
		state.latex = latexStr;

		const ast = parse(tokens);

		const result = ast.body.map((node) => {
			const solution = createSolutionStack();
			const value = evaluate(ctx, node, solution);
			return { value, solution };
		});
		state.result = result;

		let solution = "";
		for (const r of result) {
			const steps = r.solution.steps;
			steps.pop();
			if (steps.length < 2) continue;
			steps.push(r.value);
			solution += steps.join("\n") + "\n\n";
		}
		const renderedSolution = renderTokensAsHTML(tokenize(ctx, solution), {
			colorScheme: "auto",
		});
		state.solution = renderedSolution;
	} catch (error) {
		state.error = error;
		console.error(error);
	} finally {
		state.executionTime = Date.now() - startTime;
	}
}

function resetAll() {
	state.tokens = [];
	state.html = "";
	state.latex = "";
	state.executionTime = "-";
	state.variables = "";
	state.result = null;
	state.solution = null;
	state.error = null;
}
</script>

<template>
	<div class="container">
		<header class="header">
			<h1>MathFlow <-> Playground</h1>
			<p>
				Interactive development environment for testing mathematical
				expressions
			</p>
		</header>

		<main>
			<!-- Input Panel -->
			<InputPanel @reset="resetAll" @solve="evaluateExpression" />

			<!-- Output Panel -->
			<OutputPanel
				:result="state.result"
				:solution="state.solution"
				:time="state.executionTime"
				:tokens="state.tokens"
				:html="state.html"
				:latex="state.latex"
				:error="state.error"
			/>
		</main>
	</div>
</template>

<style scoped>
.container {
	max-width: 1200px;
	margin: 0 auto;
	overflow: hidden;
	padding-bottom: 2.5rem;
}

.header {
	text-align: center;
	padding: 20px 30px;
}

.header h1 {
	color: var(--vp-c-text-1);
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 8px;
}

.header p {
	color: var(--vp-c-text-2);
	font-size: 14px;
}

main {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0;
	min-height: 70vh;
	border: 1px solid var(--vp-c-divider);
	border-radius: 10px;
	overflow: hidden;
}

@media (max-width: 768px) {
	main {
		grid-template-columns: 1fr;
	}
}
</style>
