import { SiteTree } from "@enkelpanna/core"
import { addParser, parse as parseBlock, parseAll as parseBlocks } from "./Block"
import { Source } from "../Source"

export function parse(source: Source): SiteTree.Block.Block[] {
	let peeked: string | undefined = ""
	let p: string | undefined
	while (p = source.peekIs(peeked + "\t"))
		peeked = p
	let result: SiteTree.Block.Block[] = []
	if (source.readIf(peeked + "1.")) {
		while ((peeked = source.peek()) && peeked.match(/\s/))
			source.read()
		const current = new SiteTree.Block.ListItem(parseBlocks(source.requirePrefix("\t")), source.mark())
		const next = parseBlock(source)
		let index = 0
		while (next && next.length > 0 && next[index] instanceof SiteTree.Block.EmptyLine)
			index++
		if (next && next.length > 0 && next[index] instanceof SiteTree.Block.OrderedList) {
			while (index-- > 0)
				next.shift()
			next[0] = new SiteTree.Block.OrderedList([current, ...(next[0] as SiteTree.Block.OrderedList).content])
			result = next
		} else {
			result = [new SiteTree.Block.OrderedList([current])]
			if (next && next.length > 0)
				result = result.concat(next)
		}
	}
	return result
}
addParser(parse)
