import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        // Precondition: source must not be null/undefined
        IllegalArgumentException.assert(source !== null && source !== undefined, "source must not be null or undefined");
        // Precondition: source array must not be empty
        IllegalArgumentException.assert(source.length > 0, "source array must not be empty");
        
        this.components = [...source];
        
        // Postcondition: components were set correctly
        MethodFailedException.assert(this.components.length === source.length, "components were not set correctly");
        
        this.assertClassInvariants();
    }

    public clone(): Name {
        this.assertClassInvariants();
        const result = new StringArrayName([...this.components], this.delimiter);
        // Postcondition: clone is equal to original
        MethodFailedException.assert(result.isEqual(this), "clone must be equal to original");
        return result;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertClassInvariants();
        return super.asString(delimiter);
    }

    public asDataString(): string {
        this.assertClassInvariants();
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        this.assertClassInvariants();
        return super.isEqual(other);
    }

    public getHashCode(): number {
        this.assertClassInvariants();
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        this.assertClassInvariants();
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        this.assertClassInvariants();
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        this.assertClassInvariants();
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.components.length, "index must be less than number of components");
        
        const result = this.components[i];
        // Postcondition: result must be a string
        MethodFailedException.assert(typeof result === "string", "result must be a string");
        return result;
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.components.length, "index must be less than number of components");
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        this.components[i] = c;
        
        // Postcondition: component was set correctly
        MethodFailedException.assert(this.components[i] === c, "component was not set correctly");
        
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index for insertion (0 <= i <= length)
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i <= this.components.length, "index must be less than or equal to number of components");
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        const originalLength = this.components.length;
        this.components.splice(i, 0, c);
        
        // Postcondition: length increased by 1
        MethodFailedException.assert(this.components.length === originalLength + 1, "length did not increase by 1");
        // Postcondition: component at index i is c
        MethodFailedException.assert(this.components[i] === c, "component was not inserted correctly");
        
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        const originalLength = this.components.length;
        this.components.push(c);
        
        // Postcondition: length increased by 1
        MethodFailedException.assert(this.components.length === originalLength + 1, "length did not increase by 1");
        // Postcondition: last component is c
        MethodFailedException.assert(this.components[this.components.length - 1] === c, "component was not appended correctly");
        
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.components.length, "index must be less than number of components");
        // Precondition: cannot remove from a single-component name (would become empty)
        IllegalArgumentException.assert(this.components.length > 1, "cannot remove from a single-component name");
        
        const originalLength = this.components.length;
        this.components.splice(i, 1);
        
        // Postcondition: length decreased by 1
        MethodFailedException.assert(this.components.length === originalLength - 1, "length did not decrease by 1");
        
        this.assertClassInvariants();
    }

    public concat(other: Name): void {
        this.assertClassInvariants();
        super.concat(other);
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants();
        // Class invariant: components must not be null/undefined
        InvalidStateException.assert(this.components !== null && this.components !== undefined, "components must not be null or undefined");
        // Class invariant: components must have at least one element
        InvalidStateException.assert(this.components.length > 0, "components must have at least one element");
    }
}