import Counter from "./components/Counter.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ToggleDarkMode from "./components/ToggleDarkMode.jsx";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Counter />,
		},
		{
			path: "/hello",
			element: <div>Hello</div>,
		},
	]);

	return (
		<section className='max-w-[1280px] mx-auto border dark:border-red-500 border-pink-600 pb-4'>
			<h1 className=' dark:text-white text-2xl font-semibold md:text-4xl py-8 '>
				Redux Toolkit with Persist
			</h1>

			<RouterProvider router={router} />
			<ToggleDarkMode />

			<p className='py-4 text-lg'>
				Edit:: <span className='text-red-500'>App.jsx</span>{" "}
			</p>
		</section>
	);
};

export default App;
