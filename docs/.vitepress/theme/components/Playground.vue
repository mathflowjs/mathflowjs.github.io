<script setup>
import { computed, ref } from "vue";
import { useData } from "vitepress";
import { createContext, tokenize } from "@mathflowjs/mathflow";

// one <optgroup> per group, in this order. MathFlow rounds every step and drops
// terms after a space ("pi r^2" = pi), so check new examples give exact answers.
const examples = {
	Basics: {
		Arithmetic: "2 + 3 * 4\n(2 + 3) * 4\n10 / 4\n2^10",
		"Negative numbers": "-5 + 3\n-(2 + 3)\n2 * -3\n(-2)^2",
		Decimals: "0.1 + 0.2\n1.5 * 4\n22 / 7",
		"Implicit multiplication": "2(3 + 4)\n(1 + 2)(3 + 4)\n3sqrt(16)",
		Comments:
			"# a comment takes up a whole line\n2 + 2 # or the end of one",
	},
	Functions: {
		"Roots & powers": "sqrt(16)\ncbrt(27)\nroot(32, 5)\npow(2, 8)",
		Rounding: "floor(3.7)\nceil(3.2)\ntrunc(-3.7)\nabs(-5)",
		Logarithms: "log(100, 10)\nlog10(1000)\nlog2(8)\nln(e)\nexp(1)",
		Trigonometry: "sin(pi / 2)\ncos(pi)\nsin(pi / 6)\nasin(1)",
		"Multiple arguments":
			"add(1, 2, 3, 4)\nmul(2, 3, 4)\nmod(17, 5)\nhypot(3, 4)",
	},
	Variables: {
		Assignment:
			"# variables carry over to later lines\nx = 5\ny = x^2 + 1\n2x + 3(y - 1)",
		Reassignment: "n = 1\nn = n + 1\nn = n * 10",
		"Longer names":
			"speed1 = 30\nspeed2 = 50\naverage = (speed1 + speed2) / 2",
	},
	Programs: {
		"Pythagorean theorem":
			"# hypotenuse of a right triangle\na = 3\nb = 4\nc = sqrt(a^2 + b^2)",
		"Quadratic formula":
			"# roots of x^2 - 3x + 2 = 0\na = 1\nb = -3\nc = 2\nd = b^2 - 4 * a * c\nx1 = (-b + sqrt(d)) / (2a)\nx2 = (-b - sqrt(d)) / (2a)",
		"Compound interest":
			"# 1000 at 10% a year for 3 years\nprincipal = 1000\nrate = 0.1\nyears = 3\nprincipal * (1 + rate)^years",
		"Average score":
			"math = 82\nscience = 91\nart = 77\n(math + science + art) / 3",
		Temperature:
			"# Celsius to Fahrenheit\ncelsius = 100\nfahrenheit = celsius * 9 / 5 + 32",
		Projectile:
			"# ball thrown straight up at 20 m/s\nv = 20\ng = 9.81\nheight = v^2 / (2g)\ntime = v / g",
	},
};
const tabs = {
	results: "Results",
	raw: "Raw",
	tokens: "Tokens",
	latex: "LaTeX",
	html: "HTML",
};

const { isDark } = useData();
const code = ref(examples.Variables.Assignment);
const angles = ref("rad");
const decimals = ref(3);
const tab = ref("results");

// renderer CSS is static; inject it once so rendered expressions are styled
const { css } = createContext().renderAsHTML("0");

// re-run on every edit with a fresh context, so stale variables never leak between runs
const output = computed(() => {
	const start = performance.now();
	const ctx = createContext({
		preferences: { angles: angles.value, fractionDigits: decimals.value },
	});
	const lines = [];
	code.value.split("\n").forEach((source, i) => {
		try {
			// leading newlines keep error positions (line:col) in sync with the editor
			const { value, solution } = ctx.solve("\n".repeat(i) + source);
			if (!solution.length) return; // blank or comment-only line
			const { html } = ctx.renderAsHTML(source, { colorScheme: "none" });
			lines.push({ n: i + 1, html, value, solution });
		} catch (error) {
			lines.push({ n: i + 1, source, error });
		}
	});
	return { lines, time: performance.now() - start };
});

// whole-program views; these don't depend on preferences
const program = computed(() => {
	const ctx = createContext();
	try {
		return {
			tokens: tokenize(ctx, code.value).filter((t) => t.type !== "EOF"),
			latex: ctx.renderAsLaTeX(code.value, { mode: "align" }),
			html: ctx.renderAsHTML(code.value, {
				colorScheme: isDark.value ? "dark" : "light",
			}),
		};
	} catch (error) {
		return { error };
	}
});

// JSON.stringify, but NaN/Infinity stay as they are instead of becoming null
function toRaw(v) {
	const keep = (_, x) =>
		typeof x === "number" && !Number.isFinite(x) ? `\0${x}` : x;
	return JSON.stringify(v, keep, 2).replace(/"\\u0000([^"]*)"/g, "$1");
}

// one capture group, so split() yields [text, token, text, token, …]
const JSON_TOKEN =
	/("(?:\\.|[^"\\])*":?|-?\d+(?:\.\d+)?(?:e[+-]?\d+)?|-?Infinity|NaN|true|false|null)/i;

const jsonKind = (t) =>
	t.endsWith('":')
		? "key"
		: t[0] === '"'
			? "str"
			: /^(true|false|null)$/.test(t)
				? "lit"
				: "num";

// solve() output for every line as one document; failed lines keep their line number
const raw = computed(() =>
	toRaw(
		output.value.lines.map((l) => {
			if (!l.error) return { value: l.value, solution: l.solution };
			const { name, type, message, suggestion } = l.error;
			return { line: l.n, error: { name, type, message, suggestion } };
		})
	).split(JSON_TOKEN)
);

function selectAll(e) {
	e.target.select();
}
</script>

<template>
	<div class="playground">
		<component is="style">{{ css }}</component>

		<header class="bar">
			<div>
				<h1>Playground</h1>
				<p class="muted">Evaluate MathFlow code live, line by line.</p>
			</div>
			<div class="settings">
				<label>
					Angles
					<select v-model="angles">
						<option value="rad">Radians</option>
						<option value="deg">Degrees</option>
					</select>
				</label>
				<label>
					Decimals
					<select v-model.number="decimals">
						<option
							v-for="d in [2, 3, 4, 6, 10, 15]"
							:key="d"
							:value="d"
						>
							{{ d }}
						</option>
					</select>
				</label>
				<a
					href="https://github.com/mathflowjs/mathflow/issues"
					target="_blank"
					rel="noopener"
				>
					Report a bug &#x2197;&#xFE0E;
				</a>
			</div>
		</header>

		<div class="panels">
			<section class="editor">
				<div class="bar">
					<label>
						Examples
						<select v-model="code">
							<optgroup
								v-for="(items, group) in examples"
								:key="group"
								:label="group"
							>
								<option
									v-for="(src, name) in items"
									:key="name"
									:value="src"
								>
									{{ name }}
								</option>
							</optgroup>
							<!-- v-model picks the first match, so this only shows once the code is edited -->
							<option :value="code" disabled hidden>
								Custom
							</option>
						</select>
					</label>
					<button class="clear" @click="code = ''">Clear</button>
				</div>
				<textarea
					v-model="code"
					aria-label="MathFlow code"
					placeholder="2x + 3, with one expression per line"
					spellcheck="false"
				></textarea>
			</section>

			<section class="output">
				<div class="bar tabs" role="tablist">
					<button
						v-for="(title, id) in tabs"
						:key="id"
						role="tab"
						:aria-selected="tab === id"
						@click="tab = id"
					>
						{{ title }}
					</button>
				</div>

				<div class="view">
					<template v-if="tab === 'results'">
						<p v-if="!output.lines.length" class="muted">
							Nothing to evaluate yet.
						</p>
						<div v-for="l in output.lines" :key="l.n" class="row">
							<span class="n">{{ l.n }}</span>
							<div v-if="l.error" class="body">
								<code>{{ l.source }}</code>
								<p class="error">
									<strong>{{
										l.error.type ?? "Error"
									}}</strong>
									{{ l.error.message }}
									<template v-if="l.error.suggestion">
										Suggestion: {{ l.error.suggestion }}
									</template>
								</p>
							</div>
							<div v-else class="body">
								<div class="expr">
									<span v-html="l.html"></span>
									<span class="value">= {{ l.value }}</span>
								</div>
								<!-- the last solution entry is the value itself -->
								<details v-if="l.solution.length > 2">
									<summary>
										{{ l.solution.length - 1 }} steps
									</summary>
									<ol>
										<li
											v-for="(s, i) in l.solution.slice(
												0,
												-1
											)"
											:key="i"
										>
											{{ s }}
										</li>
									</ol>
								</details>
							</div>
						</div>
					</template>

					<template v-else-if="tab === 'raw'">
						<p class="muted">
							What <code>ctx.solve(line)</code> returns for each
							line, or the error it throws.
						</p>
						<pre class="json"><span
							v-for="(t, i) in raw"
							:key="i"
							:class="i % 2 ? jsonKind(t) : null"
						>{{ t }}</span></pre>
					</template>

					<p v-else-if="program.error" class="error">
						<strong>{{ program.error.type ?? "Error" }}</strong>
						{{ program.error.message }}
					</p>

					<table v-else-if="tab === 'tokens'">
						<thead>
							<tr>
								<th>Type</th>
								<th>Value</th>
								<th>Line:Col</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(t, i) in program.tokens" :key="i">
								<td>{{ t.type }}</td>
								<td>
									<code>{{
										t.type === "NEWLINE" ? "↵" : t.value
									}}</code>
									<span v-if="t.implicit" class="muted">
										implicit</span
									>
								</td>
								<td>{{ t.line }}:{{ t.column }}</td>
							</tr>
						</tbody>
					</table>

					<textarea
						v-else-if="tab === 'latex'"
						:value="program.latex"
						readonly
						@click="selectAll"
					></textarea>

					<template v-else>
						<div v-html="program.html.html"></div>
						<details>
							<summary>HTML source</summary>
							<textarea
								:value="program.html.html"
								readonly
								@click="selectAll"
							></textarea>
						</details>
						<details>
							<summary>CSS source</summary>
							<textarea
								:value="program.html.css"
								readonly
								@click="selectAll"
							></textarea>
						</details>
					</template>
				</div>
			</section>
		</div>

		<footer class="bar muted">
			{{ output.lines.length }} statement(s) ·
			{{ output.lines.filter((l) => l.error).length }} error(s) ·
			{{ output.time.toFixed(2) }} ms
		</footer>
	</div>
</template>

<style scoped>
.playground {
	max-width: 1200px;
	width: calc(100% - 48px);
	margin: 24px auto;
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	overflow: hidden;
	/* inherited by every scrolling panel; matches the site theme */
	scrollbar-color: var(--vp-c-divider) transparent;
}

header.bar {
	justify-content: space-between;
	align-items: center;
	gap: 12px 24px;
	padding: 12px 16px;
}

h1 {
	font-size: 18px;
	font-weight: 700;
	line-height: 1.4;
}

.muted {
	color: var(--vp-c-text-2);
	font-size: 13px;
}

.settings {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 16px;
}

.bar label {
	display: flex;
	align-items: center;
	gap: 6px;
	color: var(--vp-c-text-2);
}

.settings a {
	color: var(--vp-c-brand-1);
}

.settings a:hover {
	text-decoration: underline;
}

footer.bar {
	border-top: 1px solid var(--vp-c-divider);
	border-bottom: none;
}

.panels {
	display: grid;
	grid-template-columns: 1fr 1fr;
	/* fixed height so long output scrolls inside .view instead of growing the page */
	height: max(460px, calc(100vh - 260px));
}

@media (max-width: 768px) {
	.panels {
		grid-template-columns: 1fr;
		height: auto;
	}

	.view {
		max-height: 60vh;
	}
}

section {
	display: flex;
	flex-direction: column;
	min-width: 0;
	min-height: 0;
}

.editor {
	background: var(--vp-c-bg-soft);
	border-right: 1px solid var(--vp-c-divider);
}

.bar {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 10px 12px;
	background: var(--vp-c-bg-alt);
	border-bottom: 1px solid var(--vp-c-divider);
	font-size: 13px;
}

.bar button,
select {
	padding: 4px 10px;
	border: 1px solid var(--vp-c-divider);
	border-radius: 6px;
	background: var(--vp-c-bg);
	color: var(--vp-c-text-1);
}

/* VitePress resets selects to appearance: none, which hides the arrow */
select {
	appearance: auto;
}

.bar button:hover,
select:hover {
	border-color: var(--vp-c-brand-1);
}

.clear {
	margin-left: auto;
}

textarea {
	width: 100%;
	padding: 16px;
	background: transparent;
	font-family: var(--vp-font-family-mono);
	font-size: 15px;
	line-height: 1.7;
	resize: none;
}

.editor textarea {
	flex: 1;
	min-height: 300px;
}

.view textarea {
	min-height: 240px;
	border: 1px solid var(--vp-c-divider);
	border-radius: 8px;
	resize: vertical;
}

.tabs button {
	border-color: transparent;
	background: none;
	color: var(--vp-c-text-2);
	font-weight: 500;
}

.tabs button[aria-selected="true"] {
	color: var(--vp-c-brand-1);
	background: var(--vp-c-brand-soft);
}

.view {
	flex: 1;
	padding: 12px 16px;
	overflow: auto;
}

.row {
	display: flex;
	gap: 12px;
	padding: 10px 0;
	border-bottom: 1px solid var(--vp-c-divider);
	/* token colors for the "none" color scheme, following the site theme */
	--mf-number: var(--vp-c-text-1);
	--mf-identifier: var(--vp-c-brand-1);
	--mf-function: var(--vp-c-purple-1);
	--mf-operator: var(--vp-c-text-2);
	--mf-assignment: var(--vp-c-text-2);
	--mf-paren: var(--vp-c-text-3);
	--mf-comma: var(--vp-c-text-3);
}

.n {
	width: 2ch;
	text-align: right;
	color: var(--vp-c-text-3);
	font-family: var(--vp-font-family-mono);
	font-size: 13px;
	line-height: 28px;
}

.body {
	flex: 1;
	min-width: 0;
}

.expr {
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	justify-content: space-between;
	gap: 8px;
}

.expr :deep(.mf-expression) {
	padding: 0;
	border: none;
	background: none;
}

.value {
	font-family: var(--vp-font-family-mono);
	font-size: 18px;
	font-weight: 600;
	color: var(--vp-c-green-1);
}

details {
	margin-top: 6px;
	font-size: 13px;
}

summary {
	cursor: pointer;
	color: var(--vp-c-text-2);
}

ol {
	margin: 6px 0 0;
	padding-left: 24px;
	list-style: decimal;
	font-family: var(--vp-font-family-mono);
	color: var(--vp-c-text-2);
}

code {
	font-family: var(--vp-font-family-mono);
}

.error {
	margin-top: 4px;
	padding: 8px 12px;
	border-radius: 8px;
	background: var(--vp-c-danger-soft);
	color: var(--vp-c-danger-1);
	font-size: 14px;
}

pre {
	margin: 8px 0 0;
	padding: 12px 16px;
	border-radius: 8px;
	background: var(--vp-c-bg-soft);
	font-family: var(--vp-font-family-mono);
	font-size: 13px;
	white-space: pre-wrap;
	word-break: break-word;
}

.json .key {
	color: var(--vp-c-indigo-1);
}

.json .str {
	color: var(--vp-c-green-1);
}

.json .num {
	color: var(--vp-c-yellow-1);
}

.json .lit {
	color: var(--vp-c-text-3);
}

table {
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;
}

th,
td {
	padding: 6px 8px;
	text-align: left;
	border-bottom: 1px solid var(--vp-c-divider);
}
</style>
