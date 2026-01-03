<script setup>
import { reactive } from "vue";

const emit = defineEmits(["solve", "reset"]);

const state = reactive({
	input: "",
});

function setExample(expr) {
	state.input = expr;
}

function clearInput() {
	state.input = "";
}
</script>

<template>
	<div class="input">
		<div class="panel-header">
			<span>Input</span>
			<span>{{ state.input.length }} chars</span>
		</div>

		<div class="input-section">
			<div class="input-group">
				<label for="expression">Mathematical Expression</label>
				<textarea
					v-model.trim="state.input"
					placeholder="Enter your mathematical expression...&#10;Example: 2sin(pi/4)"
					spellcheck="false"
				></textarea>
			</div>

			<div class="controls">
				<button
					class="btn btn-secondary"
					@click="
						() => {
							clearInput();
							emit('reset');
						}
					"
				>
					RESET
				</button>
				<div></div>
				<button
					class="btn btn-primary"
					@click="emit('solve', state.input)"
				>
					Evaluate
				</button>
			</div>

			<div class="examples">
				<h4>Quick Examples</h4>
				<div class="example-list">
					<button class="btn" @click="setExample('2 + 3 * 4')">
						2 + 3 * 4
					</button>
					<button class="btn" @click="setExample('sin(pi/2)')">
						sin(pi/2)
					</button>
					<button
						class="btn"
						@click="setExample(`x = 5\ny = x^2 + 1`)"
					>
						Variables
					</button>
					<button
						class="btn"
						@click="setExample('sqrt(16) + abs(-5)')"
					>
						Functions
					</button>
					<button
						class="btn"
						@click="setExample('log(100) + ln(2.718)')"
					>
						Logarithms
					</button>
					<button class="btn" @click="setExample('2x + 3(y - 1)')">
						Implicit &times;
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.input {
	background: var(--vp-c-bg-soft);
	border-right: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
	.input {
		border-right: none;
	}
}

.panel-header {
	padding: 16px 20px;
	background: var(--vp-c-bg-alt);
	border-bottom: 1px solid var(--vp-c-divider);
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.input-section {
	padding: 20px;
}

.input-group {
	margin-bottom: 20px;
}

.input-group label {
	display: block;
	margin-bottom: 8px;
	font-weight: 500;
	color: var(--vp-c-text-2);
	font-size: 14px;
}

textarea {
	resize: vertical;
	width: 100%;
	min-height: 200px;
	padding: 12px 16px;
	border: 1px solid var(--vp-c-border);
	border-radius: 8px;
	font-family: var(--vp-font-family-mono);
	font-size: 16px;
	background: var(--vp-c-bg);
	transition: border-color 0.2s ease;
}

textarea:focus {
	outline: none;
	border-color: var(--vp-c-brand-1);
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.controls {
	display: flex;
	gap: 12px;
	margin-top: 16px;
}

.controls div {
	flex-grow: 1;
}

.btn {
	padding: 6px 12px;
	border: none;
	border-radius: 6px;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	gap: 8px;
}

.btn-primary {
	background: var(--vp-c-brand-1);
	color: var(--vp-c-text-1);
}

.btn-primary:hover {
	transform: translateY(-1px);
}

.btn-secondary {
	background: transparent;
	color: var(--vp-c-text-2);
}

.btn-secondary:hover {
	color: var(--vp-c-text-1);
}

.examples {
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid var(--vp-c-divider);
}

.examples h4 {
	font-size: 12px;
	color: var(--vp-c-text-2);
	margin-bottom: 12px;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.example-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.example-list .btn {
	background: var(--vp-c-bg);
	color: var(--vp-c-text-1);
	border: 1px solid transparent;
}

.example-list .btn:hover {
	border: 1px solid var(--vp-c-brand-1);
	background: var(--vp-c-bg);
}
</style>
