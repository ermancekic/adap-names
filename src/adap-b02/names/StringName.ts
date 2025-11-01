import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (delimiter === ESCAPE_CHARACTER) {
            throw new Error("Delimiter must not equal escape character");
        }

        if (source.length === 0) {
            throw new Error("Source string must not be empty");
        }

        this.name = source;

        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }

        // compute number of components by parsing with escape-awareness
        this.noComponents = this.splitComponents(this.name, this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (comps.length === 0) {
            return "";
        }
        return comps.join(delimiter);
    }

    public asDataString(): string {
        return this.asStringWithDelimiter(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (x < 0 || x >= comps.length) {
            throw new Error("Index out of bounds");
        }
        return comps[x];
    }

    public setComponent(n: number, c: string): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (n < 0 || n >= comps.length) {
            throw new Error("Index out of bounds");
        }
        comps[n] = c;
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public insert(n: number, c: string): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (n < 0 || n > comps.length) {
            throw new Error("Index out of bounds");
        }
        comps.splice(n, 0, c);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public append(c: string): void {
        if (this.name.length === 0) {
            this.name = c;
        } else {
            this.name = this.name + this.delimiter + c;
        }
        this.noComponents = this.splitComponents(this.name, this.delimiter).length;
    }

    public remove(n: number): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (n < 0 || n >= comps.length) {
            throw new Error("Index out of bounds");
        }
        comps.splice(n, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public concat(other: Name): void {
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++) {
            this.append(other.getComponent(i));
        }
    }

    private splitComponents(source: string, delimiter: string): string[] {
        const comps: string[] = [];
        let current = "";
        for (let i = 0; i < source.length; i++) {
            const ch = source[i];
            if (ch === ESCAPE_CHARACTER) {
                if (i + 1 < source.length) {
                    current += source[i + 1];
                    i++;
                } else {
                    current += ch;
                }
            } else if (ch === delimiter) {
                comps.push(current);
                current = "";
            } else {
                current += ch;
            }
        }

        comps.push(current);

        if (comps.length === 1 && comps[0] === "") {
            return [];
        }
        return comps;
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
        const comps = this.splitComponents(this.name, this.delimiter);
        if (comps.length === 0) {
            return "";
        }
        return comps.map((component, index) => (index === 0 ? "" : delimiter) + this.escapeComponent(component, delimiter)).join("");
    }

}