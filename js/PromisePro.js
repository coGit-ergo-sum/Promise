class PromisePro {
    
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolves = [];
        this.onRejects = [];

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }

    _resolve(value) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
            setTimeout(() => {
                this.onResolves.forEach(onResolve => onResolve(this.value));
            }, 0);
        }
    }

    _reject(reason) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.reason = reason;
            setTimeout(() => {
                this.onRejects.forEach(onReject => onReject(this.reason));
            }, 0);
        }
    }


    then(onResolve, onReject) {
        return new PromisePro((resolve, reject) => {

            const handleResolution = (value) => {
                try {
                    if (typeof onResolve === 'function') {

                        const result = onResolve(value);

                        if (result instanceof PromisePro) {
                            result.then(resolve, reject);
                        }
                        else if (result instanceof Promise) {
                            result.then(resolve, reject); // Adotta lo status
                        }  else {
                            resolve(result);
                        }

                    } else {
                        resolve(value);
                    }

                } catch (err) {
                    reject(err);
                }
            };

            const handleRejection = (reason) => {
                try {
                    if (typeof onReject === 'function') {

                        const result = onReject(reason);

                        if (result instanceof PromisePro) {
                            result.then(resolve, reject); // Adotta lo status
                        }
                        else if (result instanceof Promise) {
                            result.then(resolve, reject); // Adotta lo status
                        }                        
                        else {
                            resolve(result); // Un onReject di successo risolve la Promise successiva
                        }

                    } else {
                        reject(reason);
                    }
                } catch (err) {
                    reject(err);
                }
            };

            if (this.status === 'fulfilled') {
                setTimeout(() => handleResolution(this.value), 0);
            } else if (this.status === 'rejected') {
                setTimeout(() => handleRejection(this.reason), 0);
            } else {
                this.onResolves.push(handleResolution);
                this.onRejects.push(handleRejection);
            }
        });
    }
}