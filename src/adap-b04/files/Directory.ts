import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
        this.assertDirectoryClassInvariants();
    }

    public hasChildNode(cn: Node): boolean {
        this.assertDirectoryClassInvariants();
        // Precondition: cn must not be null/undefined
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "child node must not be null or undefined");
        
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.assertDirectoryClassInvariants();
        // Precondition: cn must not be null/undefined
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "child node must not be null or undefined");
        
        this.childNodes.add(cn);
        
        // Postcondition: cn is now in childNodes
        MethodFailedException.assert(this.childNodes.has(cn), "addChildNode did not add child correctly");
        
        this.assertDirectoryClassInvariants();
    }

    public removeChildNode(cn: Node): void {
        this.assertDirectoryClassInvariants();
        // Precondition: cn must not be null/undefined
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "child node must not be null or undefined");
        // Precondition: cn must be a child of this directory
        IllegalArgumentException.assert(this.childNodes.has(cn), "node must be a child of this directory");
        
        this.childNodes.delete(cn); // Yikes! Should have been called remove
        
        // Postcondition: cn is no longer in childNodes
        MethodFailedException.assert(!this.childNodes.has(cn), "removeChildNode did not remove child correctly");
        
        this.assertDirectoryClassInvariants();
    }

    protected assertDirectoryClassInvariants(): void {
        // Class invariant: childNodes must not be null/undefined
        InvalidStateException.assert(this.childNodes !== null && this.childNodes !== undefined, "childNodes must not be null or undefined");
    }

}