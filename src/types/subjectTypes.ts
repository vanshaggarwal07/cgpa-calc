export interface SubjectInterface {
	subjectName: string;
	subjectCode: string;
	paperId: string;
	credits: number;
	// marks: number;  TODO: do we need this?
}

export interface SubjectsData {
	CSE_IT: SubjectInterface[];
	ECE: SubjectInterface[];
	// Add other departments if needed
}
