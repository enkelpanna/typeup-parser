import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser, parse as parseInline } from "./Inline"

export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	if (source.readIf("[")) {
		let target = ""
		while (!source.isEmpty && !source.peekIs([" ", "]"]))
			target += source.read()
		result = [new SiteTree.Inline.Link(target, source.readIf(" ") ? parseInline(source.till("]")) : [new SiteTree.Inline.Text(target, source.mark()) as SiteTree.Inline.Inline], source.mark())]
		if (!source.readIf("]"))
			source.raise("Expected \"]\" as end of link.")
	}
	return result
}
addParser(parse)
