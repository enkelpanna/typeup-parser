import { Parser as Base } from "@enkelpanna/core"
import { Parser } from "./Parser"

export default function(): Base {
	return new Parser()
}
