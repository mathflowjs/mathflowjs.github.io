<script setup>
import { reactive } from "vue";

const props = defineProps([
    "result",
    "solution",
    "time",
    "tokens",
    "html",
    "latex",
    "error",
]);

const tabs = [
    { id: "result", title: "Result" },
    { id: "tokens", title: "Tokens" },
    { id: "html", title: "HTML" },
    { id: "latex", title: "LaTeX" },
];

const state = reactive({
    active: "result",
});
</script>

<template>
    <div class="output">
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.id" :class="{ active: state.active === tab.id }"
                @click="state.active = tab.id">
                {{ tab.title }}
            </button>
        </div>

        <div class="tab-content">
            <!-- Result Tab -->
            <div v-show="state.active === 'result'">
                <div class="output-group">
                    <h3>Result</h3>
                    <div :class="[
                        'output-content',
                        props.error ? 'error' : 'result',
                    ]">
                        <div v-if="props.error">
                            {{ props.error?.toString() }}
                        </div>
                        <textarea v-else-if="props.result" rows="15"
                            style="width: 100%;background: transparent;">{{ JSON.stringify(props.result, null, 4) }}</textarea>
                        <span v-else>Ready to evaluate...</span>
                    </div>
                </div>

                <div class="output-group">
                    <h3>Solution</h3>
                    <div class="output-content" v-html="props.solution"></div>
                </div>

                <div class="output-group">
                    <h3>Execution Info</h3>
                    <div class="output-content">
                        <strong>Execution Time:</strong> {{ props.time }}ms
                    </div>
                </div>
            </div>

            <!-- Tokens Tab -->
            <div v-show="state.active === 'tokens'">
                <div class="output-group">
                    <h3>Token Stream</h3>
                    <div class="output-content token-list">
                        <div v-for="(t, i) in props.tokens" :key="i" class="token"
                            :title="`Type: ${t.type}, Line: ${t.line}, Column: ${t.column}`">
                            <span>{{ t.type }}({{ t.value }})</span>
                            <span>{{ t.line }}:{{ t.column }}</span>
                        </div>
                        <span v-if="!props.tokens.length">
                            No tokens to display
                        </span>
                    </div>
                </div>
            </div>

            <!-- HTML Tab -->
            <div v-show="state.active === 'html'">
                <div class="output-group">
                    <h3>HTML Render</h3>
                    <div v-html="props.html"></div>
                </div>
                <div class="output-group">
                    <h3>HTML Code</h3>
                    <div class="output-content">
                        <textarea readonly rows="15" style="width: 100%">{{
                            props.html
                        }}</textarea>
                    </div>
                </div>
            </div>

            <!-- LaTeX Tab -->
            <div v-show="state.active === 'latex'">
                <div class="output-group">
                    <h3>LaTeX Output</h3>
                    <div class="output-content">
                        <textarea readonly rows="15" style="width: 100%">{{
                            props.latex
                        }}</textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.output {
    background: var(--vp-c-bg);
    /* border: 1px solid var(--vp-c-divider); */
    /* border-left: 0; */
}

.tabs {
    display: flex;
    border-bottom: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-alt);
}

.tabs button {
    padding: 15px 20px;
    border: none;
    background: none;
    color: var(--vp-c-text-1);
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
}

.tabs button.active {
    color: var(--vp-c-brand-1);
    border-bottom-color: var(--vp-c-brand-1);
}

.tab-content {
    padding: 20px;
    overflow-y: auto;
}

.output-group {
    margin-bottom: 24px;
    /* max-height: 75vh; */
}

.output-group h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-text-2);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.output-content {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    padding: 16px;
    font-family: var(--vp-font-family-mono);
    font-size: 14px;
    line-height: 1.6;
    overflow-x: auto;
    min-height: 60px;
}

.output-content.result {
    background: var(--vp-c-success-soft);
    border-color: var(--vp-c-success-soft);
    color: var(--vp-c-green-1);
    font-size: 18px;
    font-weight: 600;
}

.output-content.error {
    background: var(--vp-c-danger-soft);
    border-color: var(--vp-c-danger-soft);
    color: var(--vp-c-danger);
}

.token-list {
    display: grid;
    gap: 1rem;
}

.token {
    display: block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
    clear: both;
}

.token>span:first-child {
    float: left;
}

.token>span:last-child {
    float: right;
}
</style>
