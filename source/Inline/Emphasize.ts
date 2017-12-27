import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser, parse as parseInline } from "./Inline"

export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	if (source.readIf("_")) {
		result = [new SiteTree.Inline.Emphasize(parseInline(source.till("_")), source.mark())]
		if (!source.readIf("_"))
			source.raise("Expected \"_\" as end of emphasize.")
	}
	return result
}
addParser(parse)
