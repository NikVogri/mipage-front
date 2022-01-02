export interface User {
	id: string;
	username: string;
	email?: string;
	avatar: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export enum PageType {
	notebook = "notebook",
	todo = "todo",
}

export interface Notebook {
	id: string;
	title: string;
}

export interface PageOwner {
	id: string;
	avatar?: string | null;
	username: string;
}

export interface PageMember {
	id: string;
	avatar?: string | null;
	username: string;
}

export interface Page {
	id: string;
	title: string;
	type: PageType;
	updatedAt: Date;
	notebooks: any[];
	owner: PageOwner;
	members: PageMember[];
}
