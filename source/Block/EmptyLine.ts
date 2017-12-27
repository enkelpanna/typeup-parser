import { Error } from "@cogneco/mend"
import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addFilter, addParser, parse as parseBlock } from "./Block"

export function parse(source: Source): SiteTree.Block.Block[] {
	let result: SiteTree.Block.Block[]
	if (source.peek() == "\n") {
		source.read()
		result = [new SiteTree.Block.EmptyLine(source.mark())]
		const next = parseBlock(source)
		if (next && next.length > 0)
			result = result.concat(next)
	}
	return result
}
addParser(parse)
addFilter(block => block && !(block instanceof SiteTree.Block.EmptyLine))
