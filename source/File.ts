import { Error, IO } from "@cogneco/mend"
import { SiteTree } from "@enkelpanna/core"

import { Source } from "./Source"
import { CommentStripper } from "./CommentStripper"
import { parseAll as parseBlocks } from "./Block/Block"

// Used via dependency injection in Block
import "./Block/Heading"
import "./Block/Assignment"
import "./Block/UnorderedList"
import "./Block/OrderedList"
import "./Block/CodeBlock"
import "./Block/MathBlock"
import "./Block/Figure"
import "./Block/Video"

export function parse(reader: IO.Reader, handler: Error.Handler): SiteTree.Page {
	const source = new Source(new CommentStripper(reader), handler)
	return new SiteTree.Page({}, parseBlocks(source), {}, {}, source.mark())
}
