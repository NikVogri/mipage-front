export interface User {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	createdAt?: Date;
	bio?: string;
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
	isPrivate: boolean;
}

export interface SidebarPage {
	id: string;
	title: string;
	type: PageType;
	updatedAt: string;
	notebooks?: SidebarNotebook[];
	isOwner: boolean;
}

export interface TodoItem {
	id: string;
	completed: false;
	title: string;
	description: string;
	todoId: string;
	createdAt: Date;
	completedAt?: Date;
	creator: Pick<User, "id" | "username" | "avatar">;
}

export interface Todo {
	title: string;
	color: string;
	pageId: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	items?: TodoItem[];
}

export enum NotebookBlockType {
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

export enum NotificationType {
	ADDED_TO_PAGE = "ADDED_TO_PAGE",
	REMOVED_FROM_PAGE = "REMOVED_FROM_PAGE",
}

export interface Notification {
	body: string;
	createdAt: Date;
	expiresAt: Date | null;
	id: string;
	title: string;
	type: NotificationType;
	userId: string;
	viewed: boolean;
	viewedAt: Date | null;
	additionalData?: Record<string, unknown>;
}

export interface PersonalInfoPayload {
	bio: string;
	username: string;
}

export interface TodoItemComment {
	body: string;
	id: string;
	createdAt: Date;
	todoItemId: string;
	author: Pick<User, "id" | "username" | "avatar">;
}

export type ColorTypes = "success" | "danger";

export type WYSIWYGBlockTypes = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "UL" | "OL";
export type WYSIWYGInlineStyles = "Bold" | "Italic" | "Underline" | "Monospace";

export interface CodeBlockContent {
	language: string;
	code: string;
}

export interface NotebookDeviderMenuItem {
	icon: JSX.Element;
	type: NotebookBlockType;
}
