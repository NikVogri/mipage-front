import { NotebookBlock } from "models";

export const orderBlocks = (blocks: NotebookBlock[], order: string[]): NotebookBlock[] => {
	let orderedBlocks: NotebookBlock[] = [];
	const blockMap = new Map(blocks.map((b) => [b.id, b]));

	for (const blockId of order) {
		const block = blockMap.get(blockId);
		if (!block) continue;

		orderedBlocks.push({ ...block });
		blockMap.delete(blockId);
	}

	const leftoverBlocks = Array.from(blockMap.values());
	if (leftoverBlocks.length > 0) {
		orderedBlocks = orderedBlocks.concat(leftoverBlocks);
	}

	return orderedBlocks;
};
