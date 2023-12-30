import ReactDOM from "react-dom/client";
import Root from "./Root";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Root />
	</>
);

// if (module.hot) {
// 	module.hot.accept("./components/Root", () => {
// 		const NextRoot = require("./components/Root").default;
// 		render(NextRoot);
// 	});
// }
