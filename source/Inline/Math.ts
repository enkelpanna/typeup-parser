import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser } from "./Inline"

export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	let math: string | undefined
	if (source.readIf("$") && (math = source.till("$").readAll())) {
		result = [new SiteTree.Inline.Math(math, source.mark())]
		if (!source.readIf("$"))
			source.raise("Expected \"$\" as end of inline math.")
	}
	return result
}
addParser(parse)
