import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"

let parsers: { parse: ((source: Source) => SiteTree.Inline.Inline[]), priority: number }[] = []
export function addParser(parser: (source: Source) => SiteTree.Inline.Inline[], priority?: number) {
	if (!priority)
		priority = 0
	parsers.push({ parse: parser, priority})
	parsers = parsers.sort((left, right) => right.priority - left.priority)
}
export function parse(source: Source): SiteTree.Inline.Inline[] {
	let result: SiteTree.Inline.Inline[] = []
	let peeked: string | undefined
	while ((peeked = source.peek()) && peeked.length > 0 && parsers.some(p => {
			const r = p.parse(source)
			if (r)
				result = result.concat(r)
			return !!r
		}))
		;
	return result
}
