import DefaultTheme from "vitepress/theme";

// @ts-ignore
import Playground from "./components/Playground.vue";

import "./assets/styles.css";

export default {
	extends: DefaultTheme,
	enhanceApp(ctx) {
		ctx.app.component("Playground", Playground);
	},
};
