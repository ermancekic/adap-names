import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        // Precondition: bn must not be null/undefined
        IllegalArgumentException.assert(bn !== null && bn !== undefined, "baseName must not be null or undefined");
        // Precondition: pn must not be null/undefined
        IllegalArgumentException.assert(pn !== null && pn !== undefined, "parentNode must not be null or undefined");
        
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
        
        this.assertClassInvariants();
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.assertClassInvariants();
        // Precondition: to must not be null/undefined
        IllegalArgumentException.assert(to !== null && to !== undefined, "target directory must not be null or undefined");
        
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
        
        // Postcondition: parentNode is now to
        MethodFailedException.assert(this.parentNode === to, "move did not set parentNode correctly");
        
        this.assertClassInvariants();
    }

    public getFullName(): Name {
        this.assertClassInvariants();
        
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        this.assertClassInvariants();
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertClassInvariants();
        // Precondition: bn must not be null/undefined
        IllegalArgumentException.assert(bn !== null && bn !== undefined, "baseName must not be null or undefined");
        
        this.doSetBaseName(bn);
        
        // Postcondition: baseName was set correctly
        MethodFailedException.assert(this.doGetBaseName() === bn, "rename did not set baseName correctly");
        
        this.assertClassInvariants();
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        this.assertClassInvariants();
        return this.parentNode;
    }

    protected assertClassInvariants(): void {
        // Class invariant: baseName must not be null/undefined
        InvalidStateException.assert(this.baseName !== null && this.baseName !== undefined, "baseName must not be null or undefined");
        // Class invariant: parentNode must not be null/undefined
        InvalidStateException.assert(this.parentNode !== null && this.parentNode !== undefined, "parentNode must not be null or undefined");
    }

}
