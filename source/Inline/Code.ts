import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser } from "./Inline"

export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	let code: string | undefined
	if (source.readIf("%") && (code = source.till("%").readAll())) {
		result = [new SiteTree.Inline.Code(code, source.mark())]
		if (!source.readIf("%"))
			source.raise("Expected \"%\" as end of inline code.")
	}
	return result
}
addParser(parse)
