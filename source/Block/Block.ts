import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
// Used via dependency injection in Inline
import "../Inline/Text"
import "../Inline/Emphasize"
import "../Inline/Link"
import "../Inline/Code"
import "../Inline/Math"

let parsers: { parse: ((source: Source) => SiteTree.Block.Block[]), priority: number }[] = []
export function addParser(parser: (source: Source) => SiteTree.Block.Block[], priority?: number) {
	if (!priority)
		priority = 0
	parsers.push({ parse: parser, priority})
	parsers = parsers.sort((left, right) => right.priority - left.priority)
}
export function parse(source: Source): SiteTree.Block.Block[] {
	let result: SiteTree.Block.Block[]
	let i = 0
	do
		result = parsers[i++].parse(source)
	while (!result && i < parsers.length)
	return result
}
export function parseAll(source: Source): SiteTree.Block.Block[] {
	let result: SiteTree.Block.Block[] = []
	let r: SiteTree.Block.Block[]
	while ((r = parse(source)) && r.length > 0)
		result = result.concat(r)
	filters.forEach(filter => result = result.filter(filter))
	return result
}
const filters: ((block: SiteTree.Block.Block) => boolean)[] = []
export function addFilter(filter: (block: SiteTree.Block.Block) => boolean) {
	filters.push(filter)
}
