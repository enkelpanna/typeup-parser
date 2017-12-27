import { Error } from "@cogneco/mend"
import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser } from "./Block"
import { parse as parseInline } from "../Inline/Inline"

export function parse(source: Source): SiteTree.Block.Block[] {
	const content = parseInline(source.until("\n"))
	let result: SiteTree.Block.Block[]
	if (content && content.length > 0) {
		const next = parse(source)
		result = (next && next.length > 0 && next[0] instanceof SiteTree.Block.Paragraph) ?
		[new SiteTree.Block.Paragraph([...content, ...(next[0] as SiteTree.Block.Paragraph).content]), ...next.slice(1)] :
		[new SiteTree.Block.Paragraph(content), ...next]
	}
	return result
}
addParser(parse, -1)
