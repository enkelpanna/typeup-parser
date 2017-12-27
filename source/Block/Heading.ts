import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser } from "./Block"
import { parse as parseInline } from "../Inline/Inline"

export function parse(source: Source): SiteTree.Block.Block[] {
		let level = 0
		while (source.readIf("#"))
			level++
		let result: SiteTree.Block.Block[] = []
		if (level > 0) {
			let peeked: string | undefined
			while ((peeked = source.peek()) && peeked.match(/\s/))
				source.read()
			result = [new SiteTree.Block.Heading(level, parseInline(source.till("\n")), source.mark())]
			if (!source.readIf("\n"))
				source.raise("Expected newline as end of header.")
		}
		return result
	}
addParser(parse)
