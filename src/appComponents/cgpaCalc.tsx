import { marksData } from '@/data/marksData/marksData';
import { subjectsData } from '@/data/subjectData/subjectData';
import { Branch } from '@/types';
import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import confetti from 'canvas-confetti';
import { FormEvent, useEffect, useState } from 'react';
import book from '/book.png';
import eqn from '/eqn.svg';

export default function CGPACalculator() {
	// State variables
	const [branch, setBranch] = useState<Branch>(Branch.CSE_IT);
	const [cgpa, setCGPA] = useState<number | null>(null);

	const initialData = subjectsData[branch].map((subject) => ({
		subjectName: subject.subjectName,
		paperCode: subject.paperId,
		subjectCode: subject.subjectCode,
		credits: subject.credits,
		marks: 0, // Default marks initialized to 0
	}));
	const [data, setData] = useState(initialData);

	useEffect(() => {
		if (cgpa) {
			launchConfetti();
		}
	}, [cgpa]);

	const handleInputChange = (index: number, field: string, value: number): void => {
		const newData = [...data];
		newData[index] = { ...newData[index], [field]: value };
		setData(newData);
	};
	const handleBranchChange = (e: FormEvent<HTMLSelectElement>) => {
		const selectedBranch = e.currentTarget.value as Branch;
		console.log('selectedBranch', selectedBranch);
		setBranch(selectedBranch);
		const newInitialData = subjectsData[selectedBranch].map((subject) => ({
			subjectName: subject.subjectName,
			paperCode: subject.paperId,
			subjectCode: subject.subjectCode,
			credits: subject.credits,
			marks: 0,
		}));
		setData(newInitialData);
	};

	const addNewRow = () => {
		setData([
			...data,
			{
				subjectName: 'Extra-Subject',
				paperCode: 'Random-paper-code',
				subjectCode: 'Random-subject-code',
				credits: 0,
				marks: 0,
			},
		]);
	};

	const deleteRow = () => {
		setData([...data.slice(0, data.length - 1)]);
	};

	const calculateCGPA = (e: FormEvent) => {
		e.preventDefault();
		let totalCredits = 0;
		let totalGradePoints = 0;

		data.forEach((row) => {
			const credits = row.credits;
			const marks = row.marks;
			totalCredits += credits;
			// Simple grade point calculation (adjust as needed)
			const gradePoint =
				marks >= 90
					? 10
					: marks >= 75
						? 9
						: marks >= 65
							? 8
							: marks >= 55
								? 7
								: marks >= 50
									? 6
									: marks >= 45
										? 5
										: 0;
			totalGradePoints += credits * gradePoint;
		});
		const calculatedCGPA = totalGradePoints / totalCredits;
		setCGPA(isNaN(calculatedCGPA) ? null : parseFloat(calculatedCGPA.toFixed(3)));
	};

	function launchConfetti() {
		confetti({
			// particleCount: 100,
			// spread: 70,
			// origin: { y: 0.6 },
			particleCount: 100,
			spread: 135,
			ticks: 400,
		});
	}

	return (
		<div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
			{/* Header Section */}
			<div className="border-b border-gray-200 pb-6">
				<div className="mb-2 flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
						<img src={book} height={28} width={28} alt="Book icon" className="brightness-0 invert" />
					</div>
					<h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
						IPU CGPA Calculator
					</h1>
				</div>
				<p className="ml-1 text-sm text-gray-500">* Only works for 5th sem CSE, IT and ECE</p>
			</div>

			{/* Branch Selector */}
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
				<label htmlFor="branch" className="text-sm font-semibold text-gray-700 sm:text-base">
					Select Branch:
				</label>
				<select
					id="branch"
					value={branch}
					onChange={handleBranchChange}
					className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:border-blue-400 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-auto"
				>
					<option value={Branch.CSE_IT}>CSE / IT</option>
					<option value={Branch.ECE}>ECE</option>
				</select>
			</div>
			<form onSubmit={calculateCGPA} className="mb-6">
				<div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
					<table className="w-full border-collapse bg-white">
						<thead>
							<tr className="bg-gradient-to-r from-gray-50 to-gray-100">
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">S.No</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Subject Name</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Paper Code</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Subject Code</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Credits</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Marks</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{data.map((row, index) => (
								<tr key={index} className="transition-colors hover:bg-blue-50/50">
									<td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-700">{index + 1}.</td>
									<td className="px-4 py-3 text-sm text-gray-900">{row.subjectName}</td>
									<td className="px-4 py-3 text-sm text-gray-600">{row.paperCode}</td>
									<td className="px-4 py-3 text-sm text-gray-600">{row.subjectCode}</td>
									<td className="whitespace-nowrap px-4 py-3">
										<input
											required
											type="number"
											value={row.credits}
											onChange={(e) =>
												handleInputChange(index, 'credits', parseInt(e.target.value))
											}
											min="1"
											max="5"
											className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
											placeholder="Credits"
										/>
									</td>
									<td className="whitespace-nowrap px-4 py-3">
										<input
											required
											type="number"
											onChange={(e) =>
												handleInputChange(index, 'marks', parseInt(e.target.value))
											}
											min="0"
											max="100"
											className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
											placeholder="Marks"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex gap-3">
						<button
							type="button"
							onClick={addNewRow}
							className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-95"
						>
							<AddIcon className="h-4 w-4" />
							Add Row
						</button>
						<button
							type="button"
							onClick={deleteRow}
							className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-red-400 hover:bg-red-50 hover:shadow-md active:scale-95"
						>
							<Delete className="h-4 w-4" />
							Delete Row
						</button>
					</div>
					<button
						type="submit"
						className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95"
					>
						Calculate CGPA
					</button>
				</div>
			</form>
			{cgpa !== null && (
				<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 shadow-lg">
					<div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"></div>
					<div className="relative">
						<p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">Your CGPA</p>
						<p className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text md:text-6xl">
							{cgpa}
						</p>
						<div className="mt-3 text-sm text-gray-600">
							Percentage: <span className="font-semibold text-gray-900">{(cgpa * 10).toFixed(2)}%</span>
						</div>
					</div>
				</div>
			)}
			{/* Info Sections */}
			<div className="mt-8 flex flex-col gap-6 border-t border-gray-200 pt-8">
				{/* How to Calculate */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						How to calculate CGPA for IPUniversity?
					</h2>
					<p className="mb-4 text-gray-700">The formula for calculation of CGPA is given below:</p>
					<div className="mb-4 flex justify-center rounded-lg bg-gray-50 p-4">
						<img src={eqn} alt="CGPA Formula" className="max-w-full" />
					</div>
					<div className="space-y-1 text-sm text-gray-600">
						<p>
							<strong>C<sub>ni</sub></strong> - number of credits of the ith course of the nth semester.
						</p>
						<p>
							<strong>G<sub>ni</sub></strong> - grade points of the ith course of the nth semester
						</p>
					</div>
				</div>

				{/* In Easier Words */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						In easier words:
					</h2>
					<ol className="ml-4 space-y-2 list-decimal text-gray-700">
						<li>We calculate the product of 'credits and grade point' for each subject and add them</li>
						<li>We then divide the result obtained above by the total number of credits</li>
						<li>Lastly, the final result is rounded off to 2 decimal places</li>
					</ol>
				</div>

				{/* Grading System */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						Grading System
					</h2>
					<p className="mb-4 text-gray-700 leading-relaxed">
						The marks that a student secures from the maximum 100 are to be converted into a grade as a letter.
						The grade points are the numerical equivalent of the letter grade assigned to a student based on the
						total marks obtained by the student. These grade points and letter grades are based on the points scale
						as given below:
					</p>
					<div className="my-6 flex justify-center overflow-x-auto">
						<table className="w-full max-w-2xl border-collapse rounded-lg border border-gray-300 shadow-md">
							<thead>
								<tr className="bg-gradient-to-r from-gray-100 to-gray-50">
									<th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Marks</th>
									<th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Grade</th>
									<th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Grade Point</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{marksData.map((row, index) => (
									<tr key={index} className="transition-colors hover:bg-gray-50">
										<td className="border border-gray-300 px-4 py-2.5 text-center text-sm text-gray-900">{row.marksRange}</td>
										<td className="border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-900">{row.grade}</td>
										<td className="border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-blue-600">{row.gradePoint}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<ul className="ml-4 space-y-1.5 list-disc text-sm text-gray-700">
						<li>
							Grade P, that is the grade point 4 is the course passing grade unless specified otherwise by the
							Syllabi and Scheme of Teaching and Examination for the respective programme.
						</li>
						<li>
							For grades below the passing grade (P) as defined in the Syllabi and Scheme of Teaching and
							Examination, the associated grade points are to be taken equal to zero.
						</li>
						<li>Both the acquired marks and grades are to be reflected on the term end marksheets.</li>
					</ul>
				</div>

				{/* CGPA Divisions */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						CGPA Divisions
					</h2>
					<p className="mb-4 text-gray-700 leading-relaxed">
						The successful candidates having an overall CGPA higher than or equal to the minimum CGPA that is
						specified in the Syllabi and Scheme of Teaching and Examination for the award of the degree, are to be
						awarded the degree and be placed in Divisions as below:
					</p>
					<ul className="ml-4 space-y-2 list-disc text-gray-700">
						<li><strong>First Division:</strong> CGPA of 6.50 or above</li>
						<li><strong>Second Division:</strong> CGPA of 5.00 - 6.49</li>
						<li><strong>Third Division:</strong> CGPA of 4.00 - 4.99</li>
						<li>
							<strong>Exemplary Performance:</strong> CGPA of 10. Exemplary Performance shall be awarded, if and
							only if, every course of the programme offered to the student is passed in the first chance of
							appearing in the paper that is offered to the student. A student with an academic break shall not
							be awarded the exemplary performance.
						</li>
						<li>
							The CGPA × 10 shall be deemed equivalent to percentage of marks obtained by the student for the
							purpose of equivalence to percentage of marks.
						</li>
					</ul>
				</div>

				{/* Note */}
				<div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
					<p className="mb-3 text-sm font-semibold text-amber-900">Note:</p>
					<p className="mb-4 text-sm text-amber-800">
						This IPU CGPA Calculator works on the algorithm provided by IPUniversity in the ordinance 11.
					</p>
					<ul className="ml-4 space-y-1 list-disc text-sm">
						<li>
							<a
								href="http://ipu.ac.in/norms/Ordinance/oridancemain.htm"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-blue-600 underline transition-colors hover:text-blue-700 visited:text-purple-600"
							>
								University School of Education, GGSIPU (University Ordinance)
							</a>
						</li>
						<li>
							<a
								href="http://ipu.ac.in/norms/Ordinance/ordinanc11020815.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-blue-600 underline transition-colors hover:text-blue-700 visited:text-purple-600"
							>
								Ordinance 11
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
