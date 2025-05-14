class PromiseDIY {

    onResolve = _ => {};
    onReject = _ => {};
    onCatch = _ => {};
    onFinally = _ => {};



    constructor(_executor) {

        const _resolve = (_value) => {
            this.onResolve(_value);
            this.onFinally();
        };

        const _reject = (_reason) => {
            this.onReject(_reason);
            this.onFinally();
        };

        try {
            _executor(_resolve, _reject);
        } 
        catch (_error) { 
            this.onCatch(_error);
            this.onFinally();
        }
    }

    then(_onResolve, _onReject) {
        this.onResolve = _onResolve;
        this.onReject = _onReject;

        // True chaining is not implemented that way
        return this; 
    }

    catch(_onCatch) {
        this.onCatch = _onCatch;

        // True chaining is not implemented that way
        return this;
    }

    finally(_onFinally) {
        this.onFinally = _onFinally;

        // True chaining is not implemented that way
        return this;
    }
}