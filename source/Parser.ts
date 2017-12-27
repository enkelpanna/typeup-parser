import { Error, IO } from "@cogneco/mend"
import { Parser as Base, Filesystem, SiteTree } from "@enkelpanna/core"
import { parse } from "./File"

export class Parser extends Base {
	readonly extensions: { [extension: string]: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "utf16le" | "utf8" | undefined } = { tup: "utf8" }
	constructor() {
		super()
	}
	async parse(file: Filesystem.File, handler: Error.Handler): Promise<SiteTree.Item | undefined> {
		return file.locator && file.locator.extension == "tup" && file instanceof Filesystem.TextFile ? parse(IO.StringReader.create(await file.content, file && file.locator ? file.locator.toString() : ""), handler) as SiteTree.Item : undefined
	}
}
