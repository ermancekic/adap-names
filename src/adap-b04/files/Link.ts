import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        // Precondition: target must not be null/undefined
        IllegalArgumentException.assert(target !== null && target !== undefined, "target must not be null or undefined");
        
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        // Precondition: bn must not be null/undefined
        IllegalArgumentException.assert(bn !== null && bn !== undefined, "baseName must not be null or undefined");
        
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        // Precondition: targetNode must be set (not null)
        InvalidStateException.assert(target !== null && target !== undefined, "target node must be set");
        
        const result: Node = this.targetNode as Node;
        return result;
    }
}