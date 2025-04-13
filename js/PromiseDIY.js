class PromiseDIY {

    onResolve = null;
    onReject = null;
    onCatch = null;
    onFinally = null;

    constructor(_executor) {

        const _resolve = (_value) => {
            this.onResolve(_value);
            this.onFinally();
        };

        const _reject = (_value) => {
            this.onReject(_value);
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

        // implements the chaining
        return this; 
    }

    catch(_onCatch) {
        this.onCatch = _onCatch;

        // implements the chaining
        return this;
    }

    finally(_onFinally) {
        this.onFinally = _onFinally;

        // implements the chaining
        return this;
    }
}