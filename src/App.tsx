import './App.css';
import CGPACalculator from './appComponents/cgpaCalc';
import DotPattern from './components/ui/dot-pattern';
import { Analytics } from '@vercel/analytics/react';

function App() {
	return (
		<div className="relative min-h-screen overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 py-8 md:p-8">
			<div className="mx-auto max-w-6xl">
				<CGPACalculator />
			</div>
			<DotPattern className="fixed inset-0 -z-10 opacity-30" />
			<Analytics />
		</div>
	);
}

export default App;
