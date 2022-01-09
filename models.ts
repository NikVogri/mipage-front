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

export type SidebarPage = Pick<Page, "id" | "title" | "type" | "updatedAt">;

export interface TodoItem {
	id: string;
	completed: false;
	title: string;
	todoId: string;
	createdAt: Date;
	completedAt?: Date;
}

export interface Todo {
	title: string;
	color: string;
	pageId: string;
	id: string;
	allCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	items?: TodoItem[];
}
