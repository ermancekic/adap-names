import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        // Precondition: source must not be null/undefined
        IllegalArgumentException.assert(source !== null && source !== undefined, "source must not be null or undefined");
        
        this.name = source;
        this.noComponents = this.splitComponents(this.name, this.delimiter).length;
        
        // Postcondition: name was set correctly
        MethodFailedException.assert(this.name === source, "name was not set correctly");
        
        this.assertClassInvariants();
    }

    public clone(): Name {
        this.assertClassInvariants();
        const result = new StringName(this.name, this.delimiter);
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.noComponents, "index must be less than number of components");
        
        const comps = this.splitComponents(this.name, this.delimiter);
        const result = comps[i];
        
        // Postcondition: result must be a string
        MethodFailedException.assert(typeof result === "string", "result must be a string");
        return result;
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.noComponents, "index must be less than number of components");
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        const comps = this.splitComponents(this.name, this.delimiter);
        comps[i] = c;
        this.name = this.joinComponents(comps, this.delimiter);
        this.noComponents = comps.length;
        
        // Postcondition: component at index i is c
        const newComps = this.splitComponents(this.name, this.delimiter);
        MethodFailedException.assert(newComps[i] === c, "component was not set correctly");
        
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index for insertion (0 <= i <= noComponents)
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i <= this.noComponents, "index must be less than or equal to number of components");
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        const originalNoComponents = this.noComponents;
        const comps = this.splitComponents(this.name, this.delimiter);
        comps.splice(i, 0, c);
        this.name = this.joinComponents(comps, this.delimiter);
        this.noComponents = comps.length;
        
        // Postcondition: noComponents increased by 1
        MethodFailedException.assert(this.noComponents === originalNoComponents + 1, "noComponents did not increase by 1");
        
        this.assertClassInvariants();
    }

    public append(c: string) {
        this.assertClassInvariants();
        // Precondition: c must not be null/undefined
        IllegalArgumentException.assert(c !== null && c !== undefined, "component must not be null or undefined");
        
        const originalNoComponents = this.noComponents;
        
        if (this.name.length === 0 && this.noComponents === 0) {
            this.name = c;
        } else {
            this.name = this.name + this.delimiter + c;
        }
        this.noComponents = this.splitComponents(this.name, this.delimiter).length;
        
        // Postcondition: noComponents increased by 1
        MethodFailedException.assert(this.noComponents === originalNoComponents + 1, "noComponents did not increase by 1");
        
        this.assertClassInvariants();
    }

    public remove(i: number) {
        this.assertClassInvariants();
        // Precondition: i must be a valid index
        IllegalArgumentException.assert(i >= 0, "index must be non-negative");
        IllegalArgumentException.assert(i < this.noComponents, "index must be less than number of components");
        // Precondition: cannot remove from a single-component name (would become empty)
        IllegalArgumentException.assert(this.noComponents > 1, "cannot remove from a single-component name");
        
        const originalNoComponents = this.noComponents;
        const comps = this.splitComponents(this.name, this.delimiter);
        comps.splice(i, 1);
        this.name = this.joinComponents(comps, this.delimiter);
        this.noComponents = comps.length;
        
        // Postcondition: noComponents decreased by 1
        MethodFailedException.assert(this.noComponents === originalNoComponents - 1, "noComponents did not decrease by 1");
        
        this.assertClassInvariants();
    }

    public concat(other: Name): void {
        this.assertClassInvariants();
        super.concat(other);
        this.assertClassInvariants();
    }

    private splitComponents(source: string, delimiter: string): string[] {
        if (source.length === 0) {
            return [];
        }
        
        const comps: string[] = [];
        let current = "";
        for (let i = 0; i < source.length; i++) {
            const ch = source[i];
            if (ch === ESCAPE_CHARACTER && i + 1 < source.length) {
                // Keep the escape sequence as-is in the component
                current += ch + source[i + 1];
                i++;
            } else if (ch === delimiter) {
                comps.push(current);
                current = "";
            } else {
                current += ch;
            }
        }
        comps.push(current);
        return comps;
    }

    private joinComponents(comps: string[], delimiter: string): string {
        return comps.join(delimiter);
    }

    protected assertClassInvariants(): void {
        super.assertClassInvariants();
        // Class invariant: name must not be null/undefined
        InvalidStateException.assert(this.name !== null && this.name !== undefined, "name must not be null or undefined");
        // Class invariant: noComponents must be non-negative
        InvalidStateException.assert(this.noComponents >= 0, "noComponents must be non-negative");
        // Class invariant: noComponents must match actual components
        InvalidStateException.assert(
            this.noComponents === this.splitComponents(this.name, this.delimiter).length,
            "noComponents must match actual number of components"
        );
    }

}