import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser, parse as parseBlock } from "./Block"

export function parse(source: Source): SiteTree.Block.Block[] {
	let result: SiteTree.Block.Block[] = []
	if (source.readIf("$$")) {
		source.readIf("\n")
		const math = source.till("$$").readAll() || ""
		if (!source.readIf("$$"))
			source.raise("Expected \"$$\" as end of math block.")
		source.readIf("\n")
		const region = source.mark()
		result = parseBlock(source)
		if (result.length > 0 && result[0] instanceof SiteTree.Block.Paragraph)
			result[0] = new SiteTree.Block.MathBlock(math, (result[0] as SiteTree.Block.Paragraph).content, region)
		else
			result.unshift(new SiteTree.Block.MathBlock(math, [], region))
	}
	return result
}
addParser(parse)
