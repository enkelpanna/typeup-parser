import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser, parse as parseInline } from "./Inline"

export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	let value = source.read()
	if (value == "\\")
		value = source.read()
	if (value) {
		let region = source.mark()
		result = parseInline(source)
		if (result.length > 0 && result[0] instanceof Text) {
			value += (result[0] as SiteTree.Inline.Text).value
			region = region.merge(result[0].region)
			result[0] = new SiteTree.Inline.Text(value, region)
		} else
			result = [new SiteTree.Inline.Text(value, region) as SiteTree.Inline.Inline, ...result]
	}
	return result
}
addParser(parse, -1)
