export type GenericListenerCb = (...args: any) => void;

export class GenericListener {
    private cbs: Set<GenericListenerCb>;
    private hasEntries: boolean;

    constructor() {
        this.cbs = new Set();
        this.hasEntries = false;
    }

    add(cb: GenericListenerCb) {
        this.hasEntries = true;
        this.cbs.add(cb);
    }

    remove(cb: GenericListenerCb) {
        this.cbs.delete(cb);
    }

    sign(cb: GenericListenerCb) {
        this.add(cb);
        const unSignCb = () => {
            this.remove(cb);
        };
        return unSignCb;
    }

    emit(...args: any) {
        if (!this.hasEntries) {
            return;
        }
        this.cbs.forEach(cb => {
            console.log('cb')
            cb(...args)
        });
    }

}