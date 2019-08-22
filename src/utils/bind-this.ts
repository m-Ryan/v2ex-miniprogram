export function BindThis<T>(this: T) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        const willMount = constructor.prototype.componentWillMount;
        constructor.prototype.componentWillMount = function() {
            const self = this;
            Object.getOwnPropertyNames(constructor.prototype).forEach(key => {
                if (typeof constructor.prototype[key] === 'function') {
                    let fn = this[key];
                    this[key] = function() {
                        return fn.apply(self, arguments);
                    };
                }
            });
            return willMount && willMount.apply(this, arguments);
        };
        return constructor;
    };
}
