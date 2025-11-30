import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // Precondition: delimiter must be a single character
        IllegalArgumentException.assert(delimiter.length === 1, "delimiter must be a single character");
        // Precondition: delimiter must not equal escape character
        IllegalArgumentException.assert(delimiter !== ESCAPE_CHARACTER, "delimiter must not equal escape character");
        
        this.delimiter = delimiter;
        
        // Postcondition: delimiter was set correctly
        MethodFailedException.assert(this.delimiter === delimiter, "delimiter was not set correctly");
    }

    public clone(): Name {
        this.assertClassInvariants();
        throw new Error("needs implementation in subclass");
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertClassInvariants();
        // Precondition: delimiter must be a single character
        IllegalArgumentException.assert(delimiter.length === 1, "delimiter must be a single character");
        
        const n = this.getNoComponents();
        if (n === 0) {
            return "";
        }
        const components: string[] = [];
        for (let i = 0; i < n; i++) {
            // Remove escape characters when converting to human-readable format
            let comp = this.getComponent(i);
            let unescaped = "";
            for (let j = 0; j < comp.length; j++) {
                if (comp[j] === ESCAPE_CHARACTER && j + 1 < comp.length) {
                    unescaped += comp[j + 1];
                    j++;
                } else {
                    unescaped += comp[j];
                }
            }
            components.push(unescaped);
        }
        
        const result = components.join(delimiter);
        // Postcondition: result is a string
        MethodFailedException.assert(typeof result === "string", "result must be a string");
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        this.assertClassInvariants();
        
        const n = this.getNoComponents();
        if (n === 0) {
            return "";
        }
        let result = "";
        for (let i = 0; i < n; i++) {
            if (i > 0) {
                result += DEFAULT_DELIMITER;
            }
            // Escape the component for the default delimiter
            result += this.escapeComponent(this.getComponent(i), DEFAULT_DELIMITER);
        }
        
        // Postcondition: result is a string
        MethodFailedException.assert(typeof result === "string", "result must be a string");
        return result;
    }

    public isEqual(other: Name): boolean {
        this.assertClassInvariants();
        // Precondition: other must not be null/undefined
        IllegalArgumentException.assert(other !== null && other !== undefined, "other must not be null or undefined");
        
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        this.assertClassInvariants();
        
        let hash = 0;
        const str = this.asDataString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    public isEmpty(): boolean {
        this.assertClassInvariants();
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        this.assertClassInvariants();
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.assertClassInvariants();
        // Precondition: other must not be null/undefined
        IllegalArgumentException.assert(other !== null && other !== undefined, "other must not be null or undefined");
        
        const originalLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
        
        for (let i = 0; i < otherLength; i++) {
            this.append(other.getComponent(i));
        }
        
        // Postcondition: the number of components increased by other's component count
        MethodFailedException.assert(
            this.getNoComponents() === originalLength + otherLength,
            "concat did not add the correct number of components"
        );
        
        this.assertClassInvariants();
    }

    protected escapeComponent(component: string, delimiter: string): string {
        let escaped = "";
        for (let i = 0; i < component.length; i++) {
            if (component[i] === ESCAPE_CHARACTER) {
                // Already escaped, keep as is
                escaped += component[i];
            } else if (component[i] === delimiter) {
                // Escape the delimiter
                escaped += ESCAPE_CHARACTER + delimiter;
            } else {
                escaped += component[i];
            }
        }
        return escaped;
    }

    protected assertClassInvariants(): void {
        // Class invariant: delimiter must be a single character
        InvalidStateException.assert(this.delimiter.length === 1, "delimiter must be a single character");
        // Class invariant: delimiter must not equal escape character
        InvalidStateException.assert(this.delimiter !== ESCAPE_CHARACTER, "delimiter must not equal escape character");
    }

}