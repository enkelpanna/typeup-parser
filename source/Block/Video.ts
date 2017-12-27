import { SiteTree } from "@enkelpanna/core"
import { Source } from "../Source"
import { addParser, parse as parseBlock } from "./Block"

export function parse(source: Source): SiteTree.Block.Block[] {
	let result: SiteTree.Block.Block[] = []
	if (source.readIf("!video ")) {
		const image = source.till([" ", "\n"]).readAll()
		if (image) {
			let r: string | undefined
			const classes = source.readIf(" ") && (r = source.till("\n").readAll()) ? r.split(" ") : []
			if (!source.readIf("\n"))
				source.raise("Expected newline as end of video.")
			const region = source.mark()
			result = parseBlock(source)
			if (result.length > 0 && result[0] instanceof SiteTree.Block.Paragraph)
				result[0] = new SiteTree.Block.Video(image, classes, (result[0] as SiteTree.Block.Paragraph).content, region)
			else
				result.unshift(new SiteTree.Block.Video(image, classes, [], region))
		}
	}
	return result
}
addParser(parse)
