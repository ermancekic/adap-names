import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
        this.assertFileClassInvariants();
    }

    public open(): void {
        this.assertFileClassInvariants();
        // Precondition: file must be closed to be opened
        IllegalArgumentException.assert(this.state === FileState.CLOSED, "file must be closed to be opened");
        
        this.state = FileState.OPEN;
        
        // Postcondition: file is now open
        MethodFailedException.assert(this.state === FileState.OPEN, "open did not set state correctly");
        
        this.assertFileClassInvariants();
    }

    public read(noBytes: number): Int8Array {
        this.assertFileClassInvariants();
        // Precondition: noBytes must be non-negative
        IllegalArgumentException.assert(noBytes >= 0, "noBytes must be non-negative");
        // Precondition: file must be open to read
        IllegalArgumentException.assert(this.state === FileState.OPEN, "file must be open to read");
        
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertFileClassInvariants();
        // Precondition: file must be open to be closed
        IllegalArgumentException.assert(this.state === FileState.OPEN, "file must be open to be closed");
        
        this.state = FileState.CLOSED;
        
        // Postcondition: file is now closed
        MethodFailedException.assert(this.state === FileState.CLOSED, "close did not set state correctly");
        
        this.assertFileClassInvariants();
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertFileClassInvariants(): void {
        // Class invariant: state must be a valid FileState
        InvalidStateException.assert(
            this.state === FileState.OPEN || this.state === FileState.CLOSED || this.state === FileState.DELETED,
            "state must be a valid FileState"
        );
    }

}