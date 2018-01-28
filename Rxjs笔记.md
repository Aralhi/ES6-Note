combineAll(project: function): Observable
当高阶 Observable 完成时，通过使用 combineLatest 将其打平。
combineLatest(other: ObservableInput, project: function): Observable
它将使用所有输入中的最新值计算公式，然后发出该公式的输出。
concat
通过顺序地发出多个 Observables 的值将它们连接起来，一个接一个的。
forkJoin
当所有 observables 完成时发出每个 observable 的最新值。
merge
将多个 observables 转换成单个 observable 。
如果产生值的顺序是首要考虑的，那么试试用 concat 来代替！
mergeAll
收集并订阅所有的 observables 。
pairwise(): Observable<Array>
将前一个值和当前值作为数组发出
race(): Observable
使用首先发出值的 observable 。其他的丢弃
startWith(an: Values): Observable
发出给定的第一个值。BehaviorSubject 也可以从初始值开始！
withLatestFrom(other: ObservableInput, project: Function): Observable
每当源 Observable 发出值，它会计算一个公式，此公式使用该值加上其他输入 Observable 的最新值，然后发出公式的输出结果。
zip(observables: *): Observable
一直等到所有 observables 都发出一个值，才将所有值作为数组发出

