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

  then(onFulfilled, onRejected) {
      return new PromisePro((resolve, reject) => {
          const handleResolution = (value) => {
              try {
                  if (typeof onFulfilled === 'function') {
                      const result = onFulfilled(value);
                      if (result instanceof PromisePro) {
                        result.then(resolve, reject); 
                      } else {
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
                  if (typeof onRejected === 'function') {
                      const result = onRejected(reason);
                      if (result instanceof PromisePro) {
                        result.then(resolve, reject); // Adotta lo status
                      } else {
                          resolve(result); // Un onRejected di successo risolve la Promise successiva
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