import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    protected assertClassInvariants(): void {
        // RootNode has special invariants - it is its own parent
        // Do not call super.assertClassInvariants() as it would fail
        
        const InvalidStateException = require("../common/InvalidStateException").InvalidStateException;
        // Invariant: RootNode is its own parent
        InvalidStateException.assert(this.parentNode === this, "RootNode must be its own parent");
        // Invariant: baseName must be empty string
        InvalidStateException.assert(this.baseName === "", "RootNode baseName must be empty string");
    }

    protected assertDirectoryClassInvariants(): void {
        // RootNode has special invariants
        const InvalidStateException = require("../common/InvalidStateException").InvalidStateException;
        // Invariant: childNodes must exist (inherited from Directory)
        InvalidStateException.assert(this.childNodes !== null && this.childNodes !== undefined, "childNodes must not be null or undefined");
    }

}