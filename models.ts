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
	banner: string | null;
	createdAt: string;
	updatedAt: string;
	blocks: NotebookBlock[];
}

export type SidebarNotebook = Pick<Notebook, "id" | "title">;

export interface NotebookBlock {
	id: string;
	title: string;
	type: NotebookBlockType;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface PageOwner {
	id: string;
	avatar?: string | null;
	username: string;
	email: string;
}

export interface PageMember {
	id: string;
	avatar?: string | null;
	username: string;
	email: string;
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

export interface SidebarPage {
	id: string;
	title: string;
	type: PageType;
	updatedAt: string;
	notebooks?: SidebarNotebook[];
}

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

export enum NotebookBlockType {
	image = "image",
	richText = "richText",
	code = "code",
}

export interface SearchedUser {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	createdAt: Date;
	updatedAt: Date;
}
