import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        
        if (source.length === 0) {
            throw new Error("Source string must not be empty");
        }

        this.name = source;
        this.noComponents = this.splitComponents(this.name, this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (i < 0 || i >= comps.length) {
            throw new Error("Index out of bounds");
        }
        return comps[i];
    }

    public setComponent(i: number, c: string): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (i < 0 || i >= comps.length) {
            throw new Error("Index out of bounds");
        }
        comps[i] = c;
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public insert(i: number, c: string): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (i < 0 || i > comps.length) {
            throw new Error("Index out of bounds");
        }
        comps.splice(i, 0, c);
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

    public remove(i: number): void {
        const comps = this.splitComponents(this.name, this.delimiter);
        if (i < 0 || i >= comps.length) {
            throw new Error("Index out of bounds");
        }
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
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

}