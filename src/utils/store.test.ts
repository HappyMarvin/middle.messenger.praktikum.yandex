import { Store } from "./store";
import { expect } from "chai";

describe('Store', () => {
    let store: Store | null;

    beforeEach(() => {
        store = new Store();
    });

    it('should be empty on startup', () => {
        expect(store!.getState()).to.be.empty;
    });

    it('should set value to store', () => {
        store!.set('isOpenPopups', true);

        expect(store!.getState().isOpenPopups).to.eq(true);
    });
})