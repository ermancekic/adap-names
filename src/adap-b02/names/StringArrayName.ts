import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if (delimiter === ESCAPE_CHARACTER) {
            throw new Error("Delimiter must not equal escape character");
        }

        if (source.length === 0) {
            throw new Error("Source array must not be empty");
        }

        this.components = [...source];

        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.asStringWithDelimiter(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++) {
            this.append(other.getComponent(i));
        }
    }

    private escapeComponent(component: string, delimiter: string): string {
            let escaped = "";
            for (let i = 0; i < component.length; i++) {
                if (component[i] === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER + ESCAPE_CHARACTER;
                } else if (component[i] === delimiter) {
                    escaped += ESCAPE_CHARACTER + delimiter;
                } else {
                    escaped += component[i];
                }
            }
            return escaped;
        }
    
    private asStringWithDelimiter(delimiter: string): string {
        if (this.components.length === 0) {
            return "";
        }
        return this.components
            .map((component, index) => (index === 0 ? "" : delimiter) + this.escapeComponent(component, delimiter))
            .join("");
    }
}