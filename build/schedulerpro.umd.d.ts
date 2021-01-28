/*!
 *
 * Bryntum Scheduler Pro 4.0.8 (TRIAL VERSION)
 *
 * Copyright(c) 2021 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
declare module "bryntum-schedulerpro/schedulerpro.umd.js" {

    export type AnyConstructor<A = object> = new (...input : any[]) => A

    export abstract class Base {        
        config: object;
        isDestroyed: boolean;
        isDestroying: boolean;        
        constructor(args?: object);
        static initClass(): void;
        static isOfTypeName(type: string): boolean;
        static mixin(mixins: Function): Function;
        callback(fn: string|Function, thisObject: object, args: object[]): void;
        construct(args?: object): void;
        destroy(): void;
        detachListeners(name: string): void;
        doDestroy(): void;
        resolveCallback(handler: string|Function, thisObj: object, enforceCallability?: boolean): object;
        setConfig(config: object): void;
    }

    // Singleton
    export class GlobalEvents {        
        static addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        static hasListener(eventName: string): boolean;
        static on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        static relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        static removeAllListeners(): void;
        static removeListener(config: object, thisObj: object): void;
        static resumeEvents(): void;
        static suspendEvents(queue?: boolean): void;
        static trigger(eventName: string, param?: object): boolean;
        static un(config: object, thisObj?: object): void;
    }

    type AjaxStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class AjaxStore extends Store {        
        allCount: number;
        isCommitting: boolean;
        isLoading: boolean;
        isPaged: boolean;
        lastPage: number;        
        constructor(config?: Partial<AjaxStoreConfig>);
        commit(): Promise<any>;
        encodeFilterParams(filters: CollectionFilter[]): void;
        encodeSorterParams(sorters: object[]): void;
        load(params: object): Promise<any>;
        loadChildren(parentRecord: Model): Promise<any>;
        loadPage(page: number, params: object): Promise<any>;
        nextPage(): Promise<any>;
        previousPage(): Promise<any>;
    }

    export class Duration {        
        magnitude: number;
        milliseconds: number;
        unit: string;        
        isEqual(value: Duration): boolean;
    }

    type ModelConfig = {        
        parentId: string|number;
        parentIndex: number;
    }

    export class Model implements TreeNode, ModelStm {        
        static autoExposeFields: boolean;
        static childrenField: string;
        static convertEmptyParentToLeaf: boolean|object;
        static defaults: object;
        static idField: string;
        allChildren: Model[];
        childLevel: number;
        children: Model[];
        descendantCount: number;
        fieldMap: object;
        fieldNames: string[];
        fields: DataField[];
        firstChild: Model;
        firstStore: Store;
        hasGeneratedId: boolean;
        id: string|number;
        internalId: number;
        isBatchUpdating: boolean;
        isCommitting: boolean;
        isLeaf: boolean;
        isLoaded: boolean;
        isModified: boolean;
        isParent: boolean;
        isPhantom: boolean;
        isValid: boolean;
        json: string;
        lastChild: Model;
        modificationData: object;
        modifications: object;
        parent: Model;
        parentId: number|string;
        parentIndex: number;
        previousSiblingsTotalCount: number;
        stm: StateTrackingManager;
        visibleDescendantCount: number;        
        constructor(data?: object, store?: Store, meta?: object);
        static addField(fieldDef: string|object): void;
        static asId(model: Model|string|number): string|number;
        static getFieldDefinition(fieldName: string): DataField;
        static processField(fieldName: string, value: any): any;
        static removeField(fieldName: string): void;
        ancestorsExpanded(store: Store): boolean;
        appendChild(childRecord: Model|Model[], silent?: boolean): Model|Model[];
        beginBatch(): void;
        bubble(fn: Function, skipSelf?: boolean): void;
        bubbleWhile(fn: Function, skipSelf?: boolean): boolean;
        cancelBatch(): void;
        clearChanges(): void;
        contains(childOrId: Model|string|number): boolean;
        copy(newId?: number|string|object, deep?: boolean): Model;
        endBatch(silent?: boolean): void;
        equals(other: Model): boolean;
        generateId(): void;
        get(fieldName: string): any;
        getData(fieldName: string): any;
        getDataSource(fieldName: string): string;
        getDescendantCount(onlyVisible?: boolean, store?: Store): number;
        insertChild(childRecord: Model|Model[], before?: Model, silent?: boolean): Model|Model[];
        isExpanded(store: Store): boolean;
        isFieldModified(fieldName: string): boolean;
        remove(silent?: boolean): void;
        removeChild(childRecords: Model|Model[], isMove?: boolean, silent?: boolean): void;
        revertChanges(): void;
        set(field: string|object, value: any, silent?: boolean): void;
        toJSON(): object;
        toString(): string;
        traverse(fn: Function): void;
        traverseBefore(fn: Function, skipSelf?: boolean): void;
        traverseWhile(fn: Function, skipSelf?: boolean): boolean;
    }

    type StoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        data: object[];
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fields: object[];
        filters: object|object[];
        groupers: object[];
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
    }

    export class Store extends Base implements Events, StoreFilter, StoreCRUD, StoreSum, StoreSearch, StoreSort, StoreGroup, StoreChained, StoreState, StoreTree, StoreStm, StoreSync {        
        static stores: Store[];
        allCount: number;
        allRecords: Model[];
        autoCommit: boolean;
        changes: object;
        count: number;
        data: object[];
        filters: Collection;
        first: Model;
        formattedJSON: string;
        groupers: object[];
        isChained: boolean;
        isFiltered: boolean;
        isGrouped: boolean;
        isSorted: boolean;
        isTree: boolean;
        json: string;
        last: Model;
        leaves: Model[];
        modelClass: { new(data: object): Model };
        originalCount: number;
        records: Model[];
        rootNode: Model;
        sorters: object[];        
        constructor(config?: Partial<StoreConfig>);
        static getStore(id: string|number|object[]): Store;
        add(records: Model|Model[]|object|object[], silent?: boolean): Model[];
        addFilter(newFilters: object|Function, silent?: boolean): CollectionFilter;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addSorter(field: string|any[]|object|Function, ascending?: boolean): void;
        applyChangesFromStore(otherStore: Store): void;
        average(field: string, records: Model[]): number;
        beginBatch(): void;
        chain(chainedFilterFn: Function, chainedFields: string[], config: object): Store;
        clearFilters(): void;
        clearGroupers(): void;
        clearSorters(): void;
        commit(silent?: boolean): object;
        createRecord(data: object, skipExpose?: boolean): void;
        createSorterFn(sorters: object[]): Function;
        endBatch(): void;
        fillFromMaster(): void;
        filter(newFilters: object|object[]|Function): void;
        filterBy(fn: Function): void;
        find(fn: Function, searchAllRecords?: boolean): Model;
        findByField(field: string, value: any): any;
        findRecord(fieldName: string, value: any, searchAllRecords?: boolean): Model;
        forEach(fn: Function, thisObj?: object): void;
        getAt(index: number): Model;
        getById(id: Model|string|number): Model;
        getByInternalId(internalId: number): Model;
        getChildren(parent: Model): Model[];
        getCount(countProcessed?: boolean): number;
        getDistinctValues(field: string): any[];
        getGroupRecords(groupValue: any): Model[];
        getGroupTitles(): string[];
        getNext(recordOrId: Model|string|number, wrap?: boolean, skipSpecialRows?: boolean): Model;
        getPrev(recordOrId: Model|string|number, wrap?: boolean, skipSpecialRows?: boolean): Model;
        getRange(start?: number, end?: number): Model[];
        getValueCount(field: string, value: any): number;
        group(field: string|object, ascending?: boolean, add?: boolean, performSort?: boolean, silent?: boolean): void;
        groupSum(groupValue: any, field: string): number;
        hasListener(eventName: string): boolean;
        includes(recordOrId: Model|string|number): boolean;
        indexOf(recordOrId: Model|string|number, visibleRecords?: boolean): number;
        insert(index: number, records: Model|Model[]|object|object[], silent?: boolean): Model[];
        isAvailable(recordOrId: Model|string|number): boolean;
        isRecordInGroup(record: Model, groupValue: any): boolean;
        loadChildren(parentRecord: Model): Promise<any>;
        makeChained(chainedFilterFn: Function, chainedFields: string[], config: object): Store;
        map(fn: Function): any[];
        max(field: string, records: Model[]): number|Date;
        min(field: string, records: Model[]): number|Date;
        move(records: Model|Model[], beforeRecord: Model): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        onDataChange(event: object): void;
        query(fn: Function, searchAllRecords?: boolean): Model[];
        reduce(fn: Function, initialValue: any): any;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        remove(records: string|string[]|number|number[]|Model|Model[], silent?: boolean): Model[];
        removeAll(silent?: boolean): boolean;
        removeAllListeners(): void;
        removeFilter(idOrInstance: string|CollectionFilter, silent?: boolean): CollectionFilter;
        removeListener(config: object, thisObj: object): void;
        removeSorter(field: string|Function): void;
        resumeAutoCommit(): void;
        resumeEvents(): void;
        search(find: string, fields: object[]): object[];
        some(fn: Function, searchAllRecords?: boolean): boolean;
        sort(field: string|any[]|object|Function, ascending?: boolean, add?: boolean, silent?: boolean): void;
        sum(field: string, records: Model[]): number;
        suspendAutoCommit(): void;
        suspendEvents(queue?: boolean): void;
        toJSON(): object[];
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean): Promise<any>;
        traverse(fn: Function, topNode?: Model, skipTopNode?: boolean): void;
        traverseWhile(fn: Function, topNode?: Model, skipTopNode?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type BooleanDataFieldConfig = {        
        compare: Function;
        dataSource: string;
        defaultValue: any;
        name: string;
        nullText: string;
        nullValue: boolean;
        nullable: boolean;
        persist: boolean;
        readOnly: boolean;
    }

    export class BooleanDataField extends DataField {        
        constructor(config?: Partial<BooleanDataFieldConfig>);
    }

    type DataFieldConfig = {        
        compare: Function;
        dataSource: string;
        defaultValue: any;
        name: string;
        nullText: string;
        nullValue: any;
        nullable: boolean;
        persist: boolean;
        readOnly: boolean;
    }

    export class DataField extends Base {        
        constructor(config?: Partial<DataFieldConfig>);
        convert(value: any): any;
        isEqual(first: any, second: any): boolean;
        print(value: any): string;
        printValue(value: any): string;
        serialize(value: any, record: Model): any;
    }

    type DateDataFieldConfig = {        
        compare: Function;
        dataSource: string;
        dateFormat: string;
        defaultValue: any;
        format: string;
        name: string;
        nullText: string;
        nullValue: any;
        nullable: boolean;
        persist: boolean;
        readOnly: boolean;
    }

    export class DateDataField extends DataField {        
        constructor(config?: Partial<DateDataFieldConfig>);
    }

    type IntegerDataFieldConfig = {        
        compare: Function;
        dataSource: string;
        defaultValue: any;
        name: string;
        nullText: string;
        nullValue: number;
        nullable: boolean;
        persist: boolean;
        readOnly: boolean;
        rounding: string;
    }

    export class IntegerDataField extends DataField {        
        constructor(config?: Partial<IntegerDataFieldConfig>);
    }

    type NumberDataFieldConfig = {        
        compare: Function;
        dataSource: string;
        defaultValue: any;
        name: string;
        nullText: string;
        nullValue: number;
        nullable: boolean;
        persist: boolean;
        precision: number;
        readOnly: boolean;
    }

    export class NumberDataField extends DataField {        
        constructor(config?: Partial<NumberDataFieldConfig>);
    }

    type StringDataFieldConfig = {        
        compare: Function;
        dataSource: string;
        defaultValue: any;
        name: string;
        nullText: string;
        nullValue: string;
        nullable: boolean;
        persist: boolean;
        readOnly: boolean;
    }

    export class StringDataField extends DataField {        
        constructor(config?: Partial<StringDataFieldConfig>);
    }

    type StoreCRUDConfig = {        
        autoCommit: boolean;
    }

    export class StoreCRUD {        
        autoCommit: boolean;
        changes: object;        
        constructor(config?: Partial<StoreCRUDConfig>);
        add(records: Model|Model[]|object|object[], silent?: boolean): Model[];
        applyChangesFromStore(otherStore: Store): void;
        commit(silent?: boolean): object;
        insert(index: number, records: Model|Model[]|object|object[], silent?: boolean): Model[];
        move(records: Model|Model[], beforeRecord: Model): void;
        remove(records: string|string[]|number|number[]|Model|Model[], silent?: boolean): Model[];
        removeAll(silent?: boolean): boolean;
        resumeAutoCommit(): void;
        suspendAutoCommit(): void;
    }

    type StoreChainedConfig = {        
        chainedFields: string[];
        chainedFilterFn: Function;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        keepUncommittedChanges: boolean;
        masterStore: Store;
    }

    export class StoreChained {        
        isChained: boolean;        
        constructor(config?: Partial<StoreChainedConfig>);
        fillFromMaster(): void;
    }

    type StoreFilterConfig = {        
        filters: object|object[];
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
    }

    export class StoreFilter {        
        filters: Collection;
        isFiltered: boolean;        
        constructor(config?: Partial<StoreFilterConfig>);
        addFilter(newFilters: object|Function, silent?: boolean): CollectionFilter;
        clearFilters(): void;
        filter(newFilters: object|object[]|Function): void;
        filterBy(fn: Function): void;
        removeFilter(idOrInstance: string|CollectionFilter, silent?: boolean): CollectionFilter;
    }

    type StoreGroupConfig = {        
        groupers: object[];
    }

    export class StoreGroup {        
        groupers: object[];
        isGrouped: boolean;        
        constructor(config?: Partial<StoreGroupConfig>);
        clearGroupers(): void;
        getGroupRecords(groupValue: any): Model[];
        getGroupTitles(): string[];
        group(field: string|object, ascending?: boolean, add?: boolean, performSort?: boolean, silent?: boolean): void;
        isRecordInGroup(record: Model, groupValue: any): boolean;
    }

    export class StoreSearch {        
        find(fn: Function, searchAllRecords?: boolean): Model;
        findByField(field: string, value: any): any;
        findRecord(fieldName: string, value: any, searchAllRecords?: boolean): Model;
        query(fn: Function, searchAllRecords?: boolean): Model[];
        search(find: string, fields: object[]): object[];
        some(fn: Function, searchAllRecords?: boolean): boolean;
    }

    type StoreSortConfig = {        
        sorters: object[]|string[];
        useLocaleSort: boolean|string|object;
    }

    export class StoreSort {        
        isSorted: boolean;
        sorters: object[];        
        constructor(config?: Partial<StoreSortConfig>);
        addSorter(field: string|any[]|object|Function, ascending?: boolean): void;
        clearSorters(): void;
        createSorterFn(sorters: object[]): Function;
        removeSorter(field: string|Function): void;
        sort(field: string|any[]|object|Function, ascending?: boolean, add?: boolean, silent?: boolean): void;
    }

    export class StoreState {
    }

    export class StoreSum {        
        average(field: string, records: Model[]): number;
        groupSum(groupValue: any, field: string): number;
        max(field: string, records: Model[]): number|Date;
        min(field: string, records: Model[]): number|Date;
        sum(field: string, records: Model[]): number;
    }

    type StoreSyncConfig = {        
        syncDataOnLoad: boolean|object;
    }

    export class StoreSync {        
        constructor(config?: Partial<StoreSyncConfig>);
    }

    type StoreTreeConfig = {        
        transformFlatData: boolean;
    }

    export class StoreTree {        
        isTree: boolean;
        leaves: Model[];        
        constructor(config?: Partial<StoreTreeConfig>);
        getChildren(parent: Model): Model[];
        loadChildren(parentRecord: Model): Promise<any>;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean): Promise<any>;
    }

    type TreeNodeConfig = {        
        parentId: string|number;
        parentIndex: number;
    }

    export class TreeNode {        
        static convertEmptyParentToLeaf: boolean|object;
        allChildren: Model[];
        childLevel: number;
        children: Model[];
        descendantCount: number;
        firstChild: Model;
        isLeaf: boolean;
        isLoaded: boolean;
        isParent: boolean;
        lastChild: Model;
        parent: Model;
        parentId: number|string;
        parentIndex: number;
        previousSiblingsTotalCount: number;
        visibleDescendantCount: number;        
        constructor(config?: Partial<TreeNodeConfig>);
        ancestorsExpanded(store: Store): boolean;
        appendChild(childRecord: Model|Model[], silent?: boolean): Model|Model[];
        bubble(fn: Function, skipSelf?: boolean): void;
        bubbleWhile(fn: Function, skipSelf?: boolean): boolean;
        contains(childOrId: Model|string|number): boolean;
        getDescendantCount(onlyVisible?: boolean, store?: Store): number;
        insertChild(childRecord: Model|Model[], before?: Model, silent?: boolean): Model|Model[];
        isExpanded(store: Store): boolean;
        removeChild(childRecords: Model|Model[], isMove?: boolean, silent?: boolean): void;
        traverse(fn: Function): void;
        traverseBefore(fn: Function, skipSelf?: boolean): void;
        traverseWhile(fn: Function, skipSelf?: boolean): boolean;
    }

    type StateTrackingManagerConfig = {        
        autoRecord: boolean;
        autoRecordTransactionStopTimeout: number;
        disabled: boolean;
        getTransactionTitle: Function;
        listeners: object;
    }

    export class StateTrackingManager extends Base implements Events {        
        autoRecord: boolean;
        canRedo: boolean;
        canUndo: boolean;
        disabled: boolean;
        isReady: boolean;
        isRecording: boolean;
        isRestoring: boolean;
        length: number;
        position: number;
        queue: string[];
        state: StateBase;
        stores: Store[];
        transaction: Transaction;        
        constructor(config?: Partial<StateTrackingManagerConfig>);
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStore(store: Store): void;
        disable(): void;
        enable(): void;
        forEachStore(fn: Function): void;
        hasListener(eventName: string): boolean;
        hasStore(store: Store): boolean;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        redo(steps?: number): void;
        redoAll(): void;
        rejectTransaction(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        removeStore(store: Store): void;
        resetQueue(): void;
        resetRedoQueue(): void;
        resetUndoQueue(): void;
        resumeEvents(): void;
        startTransaction(title?: string): void;
        stopTransaction(title?: string): void;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        undo(steps?: number): void;
        undoAll(): void;
    }

    type TransactionConfig = {        
        title: string;
    }

    export class Transaction {        
        length: number;
        queue: ActionBase[];        
        constructor(config?: Partial<TransactionConfig>);
        addAction(action: ActionBase|object): void;
        redo(): void;
        undo(): void;
    }

    export abstract class ActionBase {        
        type: string;        
        redo(): void;
        undo(): void;
    }

    type AddActionConfig = {        
        modelList: Model[];
        silent: boolean;
        store: Store;
    }

    export class AddAction extends ActionBase {        
        constructor(config?: Partial<AddActionConfig>);
    }

    type InsertActionConfig = {        
        context: Map<any,any>;
        insertIndex: number;
        modelList: Model[];
        silent: boolean;
        store: Store;
    }

    export class InsertAction extends ActionBase {        
        constructor(config?: Partial<InsertActionConfig>);
    }

    type InsertChildActionConfig = {        
        childModels: Model[];
        context: object;
        insertIndex: number;
        parentModel: Model;
    }

    export class InsertChildAction extends ActionBase {        
        constructor(config?: Partial<InsertChildActionConfig>);
    }

    type RemoveActionConfig = {        
        context: object;
        modelList: Model[];
        silent: boolean;
        store: Store;
    }

    export class RemoveAction extends ActionBase {        
        constructor(config?: Partial<RemoveActionConfig>);
    }

    type RemoveAllActionConfig = {        
        allRecords: Model[];
        silent: boolean;
        store: Store;
    }

    export class RemoveAllAction extends ActionBase {        
        constructor(config?: Partial<RemoveAllActionConfig>);
    }

    type RemoveChildActionConfig = {        
        childModels: Model[];
        context: object;
        parentModel: Model;
    }

    export class RemoveChildAction extends ActionBase {        
        constructor(config?: Partial<RemoveChildActionConfig>);
    }

    type UpdateActionConfig = {        
        model: Model;
        newData: object;
        oldData: object;
    }

    export class UpdateAction extends ActionBase {        
        constructor(config?: Partial<UpdateActionConfig>);
    }

    export class ModelStm {        
        stm: StateTrackingManager;
    }

    type StoreStmConfig = {        
        stm: StateTrackingManager;
    }

    export class StoreStm {        
        constructor(config?: Partial<StoreStmConfig>);
    }

    export abstract class StateBase {
    }

    export class AjaxHelper {        
        static fetch(url: string, options: object): Promise<any>;
        static get(url: string, options?: object): Promise<any>;
        static mockUrl(url: string, response: object|Function): void;
        static post(url: string, payload: string|object|FormData, options: object): Promise<any>;
    }

    export class AsyncHelper {        
        static animationFrame(): Promise<any>;
        static sleep(millis: number): Promise<any>;
        static yield(): Promise<any>;
    }

    export class CSSHelper {        
        static findRule(selector: string|Function): CSSRule;
        static insertRule(cssText: string): CSSRule;
    }

    export class DateHelper {        
        static defaultFormat: string;
        static defaultParseFormat: string;
        static weekStartDay: number;        
        static add(date: Date|string, amount: number, unit?: string): Date;
        static as(toUnit: string, amount: number|string, fromUnit?: string): number;
        static asMilliseconds(amount: number|string, unit: string): number;
        static asMonths(time: Date): number;
        static betweenLesser(date: Date, start: Date, end: Date): boolean;
        static betweenLesserEqual(date: Date, start: Date, end: Date): boolean;
        static ceil(time: Date, increment: string|number, base?: Date): void;
        static clearTime(date: Date, clone?: boolean): Date;
        static clone(date: Date): Date;
        static compare(first: Date, second: Date, unit: string): number;
        static compareUnits(unit1: string, unit2: string): void;
        static constrain(date: Date, min?: Date, max?: Date): Date;
        static copyTimeValues(targetDate: Date, sourceDate: Date): Date;
        static create(definition: object): Date;
        static daysInMonth(date: Date): number;
        static diff(start: Date, end: Date, unit?: string, fractional?: boolean): number;
        static endOf(date: Date): void;
        static floor(time: Date, increment: string|number, base?: Date): void;
        static format(date: Date, format: string): string;
        static formatCount(count: number, unit: string): string;
        static formatDelta(delta: number, options?: object): void;
        static get(date: Date, unit: string): void;
        static getDelta(delta: number, options?: object): object;
        static getDurationInUnit(start: Date, end: Date, unit: string): number;
        static getEndOfPreviousDay(date: Date, noNeedToClearTime: boolean): Date;
        static getFirstDateOfMonth(date: Date): Date;
        static getLastDateOfMonth(date: Date): Date;
        static getLocalizedNameOfUnit(unit: string, plural: boolean): string;
        static getNext(date: Date, unit: string, increment?: number, weekStartDay?: number): Date;
        static getShortNameOfUnit(unit: string): string;
        static getStartOfNextDay(date: Date, clone: boolean, noNeedToClearTime: boolean): Date;
        static getTime(hours: number|Date, minutes?: number, seconds?: number, ms?: number): Date;
        static getTimeOfDay(date: Date): number;
        static getUnitToBaseUnitRatio(baseUnit: string, unit: string, acceptEstimate?: boolean): number;
        static getWeekNumber(date: Date, weekStartDay: number): number[];
        static intersectSpans(date1Start: Date, date1End: Date, date2Start: Date, date2End: Date): boolean;
        static is24HourFormat(format: string): boolean;
        static isAfter(first: Date, second: Date): boolean;
        static isBefore(first: Date, second: Date): boolean;
        static isDate(value: any): boolean;
        static isEqual(first: Date, second: Date, unit: string): boolean;
        static isStartOf(date: Date, unit: string): boolean;
        static isValidDate(date: Date): boolean;
        static max(first: Date, second: Date): Date;
        static min(first: Date, second: Date): Date;
        static normalizeUnit(unit: string): string;
        static parse(dateString: string, format: string): Date;
        static parseDuration(value: string, allowDecimals?: boolean, defaultUnit?: string): object;
        static parseTimeUnit(unitName: any): void;
        static round(time: Date, increment: string|number, base?: Date): void;
        static set(date: Date, unit: string|object, amount: number): Date;
        static startOf(date: Date, unit?: string, clone?: boolean): Date;
        static timeSpanContains(spanStart: Date, spanEnd: Date, otherSpanStart: Date, otherSpanEnd: Date): boolean;
    }

    export class DomHelper {        
        static activeElement: HTMLElement;
        static scrollBarWidth: number;
        static themeInfo: object;        
        static addClasses(element: HTMLElement, classes: string[]): void;
        static addLeft(element: HTMLElement, x: number): void;
        static addTemporaryClass(element: HTMLElement, cls: string, duration: number, delayable: Delayable): void;
        static addTop(element: HTMLElement, y: number): void;
        static addTranslateX(element: HTMLElement, x: number): void;
        static addTranslateY(element: HTMLElement, y: number): void;
        static alignTo(element: HTMLElement, target: HTMLElement|Rectangle, alignSpec: object, round?: boolean): void;
        static append(parentElement: HTMLElement, elementOrConfig: HTMLElement|object|string): HTMLElement;
        static applyStyle(element: HTMLElement, style: string|object, overwrite?: boolean): void;
        static children(element: HTMLElement, selector: string): HTMLElement[];
        static createElement(config: object, options: boolean|object): HTMLElement|HTMLElement[]|object;
        static down(element: HTMLElement, selector: string): HTMLElement;
        static elementFromPoint(x: number, y: number): HTMLElement;
        static focusWithoutScrolling(element: HTMLElement): void;
        static forEachChild(element: HTMLElement, fn: Function): void;
        static forEachSelector(element: HTMLElement, selector: string, fn: Function): void;
        static getChild(element: HTMLElement, selector: string): HTMLElement;
        static getEdgeSize(element: HTMLElement, edgeStyle: string, edges?: string): object;
        static getEventElement(event: Event|Element, elementName?: string): Element;
        static getId(element: HTMLElement): void;
        static getOffsetX(element: HTMLElement, container: HTMLElement): number;
        static getOffsetXY(element: HTMLElement, container: HTMLElement): number[];
        static getOffsetY(element: HTMLElement, container: HTMLElement): number;
        static getPageX(element: HTMLElement): number;
        static getPageY(element: HTMLElement): number;
        static getParents(element: HTMLElement): HTMLElement[];
        static getStyleValue(element: HTMLElement, propName: string|string[], inline?: boolean): string|object;
        static getTranslateX(element: HTMLElement): number;
        static getTranslateXY(element: HTMLElement): number[];
        static getTranslateY(element: HTMLElement): number;
        static hasChild(element: HTMLElement, selector: string): boolean;
        static highlight(element: HTMLElement|Rectangle): void;
        static insertBefore(into: HTMLElement, element: HTMLElement, beforeElement: HTMLElement): HTMLElement;
        static insertFirst(into: HTMLElement, element: HTMLElement): HTMLElement;
        static isCustomElement(element: HTMLElement): boolean;
        static isDescendant(parentElement: HTMLElement, childElement: HTMLElement): boolean;
        static isElement(value: any): boolean;
        static isFocusable(element: HTMLElement): void;
        static isInView(element: HTMLElement, whole: boolean): void;
        static isNode(value: any): boolean;
        static isVisible(element: HTMLElement): boolean;
        static makeValidId(id: string): string;
        static measureSize(size: string, sourceElement: HTMLElement): number;
        static measureText(text: string, sourceElement: HTMLElement): number;
        static parseStyle(style: string): object;
        static removeClasses(element: HTMLElement, classes: string[]): void;
        static removeEachSelector(element: HTMLElement, selector: string): void;
        static resetScrollBarWidth(): void;
        static setLeft(element: HTMLElement, x: number|string): void;
        static setLength(element: string|HTMLElement, style?: string, value?: number|string): string;
        static setTheme(newThemeName: string): Promise<any>;
        static setTop(element: HTMLElement, y: number|string): void;
        static setTranslateX(element: HTMLElement, x: number): void;
        static setTranslateXY(element: HTMLElement, x?: number, y?: number): void;
        static setTranslateY(element: HTMLElement, y: number): void;
        static sync(sourceElement: string|HTMLElement, targetElement: HTMLElement): HTMLElement;
        static syncClassList(element: HTMLElement, newClasses: string[]|string|object): void;
        static toggleClasses(element: HTMLElement, classes: string[], force?: boolean): void;
        static up(element: HTMLElement, selector: string): HTMLElement;
    }

    export class DomSync {        
        static addChild(parentElement: HTMLElement, childElement: HTMLElement, syncId: string|number): void;
        static getChild(element: HTMLElement, path: string): void;
        static removeChild(parentElement: HTMLElement, childElement: HTMLElement): void;
        static sync(options: object): HTMLElement;
    }

    type DragHelperConfig = {        
        cloneTarget: boolean;
        constrain: boolean;
        containers: HTMLElement[];
        dragThreshold: number;
        dragWithin: HTMLElement;
        dropTargetSelector: string;
        hideOriginalElement: boolean;
        ignoreSelector: string;
        invalidCls: string;
        isElementDraggable: Function;
        listeners: object;
        lockX: boolean;
        lockY: boolean;
        maxX: number;
        maxY: number;
        minX: number;
        minY: number;
        mode: string;
        outerElement: HTMLElement;
        targetSelector: string;
        touchStartDelay: number;
    }

    export class DragHelper extends Base implements Events {        
        constructor(config: Partial<DragHelperConfig>);
        abort(): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        createProxy(): void;
        hasListener(eventName: string): boolean;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resumeEvents(): void;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    export class EventHelper {        
        static dblClickTime: number;
        static longPressTime: number;        
        static addListener(element: HTMLElement, eventName: string|object, handler?: Function, options?: object): Function;
        static getClientPoint(event: Event): Point;
        static getDistanceBetween(event1: Event, event2: Event): number;
        static getPagePoint(event: Event): Point;
        static getXY(event: Event): number[];
        static on(options: object): Function;
    }

    export class ObjectHelper {        
        static allKeys(object: object): string[];
        static assertBoolean(value: object, name: string): void;
        static assertNumber(value: object, name: string): void;
        static assertType(value: object, type: string, name: string): void;
        static assign(dest: object, sources: object): object;
        static assignIf(dest: object, sources: object): object;
        static cleanupProperties(object: object, keepNull?: boolean): object;
        static clone(value: any, handler?: Function): any;
        static copyProperties(dest: object, source: object, props: string[]): void;
        static copyPropertiesIf(dest: object, source: object, props: string[]): void;
        static createTruthyKeys(source: string|string[]): void;
        static getMapPath(map: Map<any,any>, path: string|number|string[]|number[], defaultValue?: object): void;
        static getPath(object: object, path: string): any;
        static getPropertyDescriptor(object: object, propertyName: string): object;
        static getTruthyKeys(source: object): string[];
        static getTruthyValues(source: object): string[];
        static isDeeplyEqual(a: object, b: object, options?: object): boolean;
        static isEmpty(object: object): boolean;
        static isEqual(a: any, b: any): any;
        static isLessThan(a: any, b: any): boolean;
        static isMoreThan(a: any, b: any): boolean;
        static isObject(value: object): boolean;
        static isPartial(a: any, b: any): boolean;
        static keys(object: object, ignore?: object): string[];
        static merge(dest: object, sources: object): object;
        static pathExists(object: object, path: string): boolean;
        static removeAllProperties(object: object): object;
        static round(number: number, digits: number): number;
        static roundTo(number: number, step?: number): number;
        static setPath(object: object, path: string, value: any): object;
        static toFixed(number: number, digits: number): string;
        static transformArrayToNamedObject(arrayOfItems: object[], prop?: string): object;
        static transformNamedObjectToArray(namedItems: object, prop?: string): object[];
        static typeOf(value: any): string;
    }

    export class StringHelper {        
        static capitalize(string: string): string;
        static capitalizeFirstLetter(string: string): string;
        static createId(inString: string): string;
        static decodeHtml(text: string): string;
        static encodeHtml(html: string): string;
        static hyphenate(string: string): string;
        static isHtml(text: string): boolean;
        static joinPaths(paths: any[], pathSeparator?: string): string;
        static lowercaseFirstLetter(string: string): string;
        static safeJsonParse(string: string): object;
        static safeJsonStringify(object: object, replacer?: Function|string[]|number[], space?: string|number): object;
        static split(str: string, delimiter: string|RegExp): string[];
        static uncapitalize(string: string): string;
        static xss(): void;
    }

    export class WidgetHelper {        
        static append(widget: object|object[], config?: HTMLElement|string|object): Widget[];
        static attachTooltip(element: HTMLElement, configOrText: string|object): object;
        static createWidget(config: object): object;
        static destroyTooltipAttached(element: HTMLElement): void;
        static fromElement(element: HTMLElement|Event, type?: string|Function, limit?: HTMLElement|number): any;
        static getById(Id: string): Widget;
        static hasTooltipAttached(element: HTMLElement): boolean;
        static mask(element: HTMLElement, msg?: string): void;
        static openPopup(element: HTMLElement, config: object): any|object;
        static showContextMenu(element: HTMLElement|number[], config: object): any|object;
        static toast(msg: string): void;
        static unmask(element: HTMLElement): void;
    }

    export class XMLHelper {        
        static convertFromObject(obj: object, options?: object): string;
    }

    export class DomClassList {        
        value: string;
        values: string[];        
        constructor(classes: string);
        add(classes: string): void;
        assign(classList: object): void;
        clone(): DomClassList;
        contains(className: string): boolean;
        isEqual(other: DomClassList|string): boolean;
        remove(classes: string): void;
        split(): string[];
        trim(): string;
    }

    export class Fullscreen {        
        static enabled: boolean;
        static isFullscreen: boolean;        
        static exit(): void;
        static onFullscreenChange(fn: Function): void;
        static request(element: HTMLElement): void;
        static unFullscreenChange(fn: Function): void;
    }

    type NumberFormatConfig = {        
        fraction: number|number[];
        integer: number;
        significant: number|number[];
        template: string;
    }

    export class NumberFormat {        
        constructor(config?: Partial<NumberFormatConfig>);
        as(change: string|object, cacheAs?: string): NumberFormat;
        format(value: number): string;
        parse(value: string, strict?: boolean): number;
        parseStrict(value: string): number;
        round(value: number|string): number;
        truncate(value: number|string): number;
    }

    export class Point extends Rectangle {        
        constrain(into: Rectangle): void;
    }

    export class RandomGenerator {        
        fromArray(array: any[]): any;
        nextRandom(max: number): number;
        reset(): void;
    }

    export class Rectangle {        
        bottom: number;
        center: Point;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;        
        static client(element: HTMLElement, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static content(The: HTMLElement, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static from(element: HTMLElement, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static fromScreen(element: HTMLElement, relativeTo?: HTMLElement): Rectangle;
        static inner(The: HTMLElement, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static union(rectangles: Rectangle[]): Rectangle;
        adjust(x: number, y: number, width: number, height: number): void;
        alignTo(spec: object): Rectangle;
        clone(): void;
        constrainTo(constrainTo: Rectangle, strict: boolean): void;
        contains(The: Rectangle): boolean;
        getAlignmentPoint(alignmentPoint: string, margins: number[]): void;
        getDelta(other: Rectangle|Point): void;
        highlight(): void;
        inflate(amount: number): Rectangle;
        intersect(other: Rectangle, useBoolean?: boolean, allowZeroDimensions?: boolean): Rectangle|boolean;
        moveTo(x: number, y: number): void;
        roundPx(devicePixelRatio?: number): void;
        translate(x: number, y: number): void;
    }

    type ScrollerConfig = {        
        element: HTMLElement;
        listeners: object;
        overflowX: string|boolean;
        overflowY: string|boolean;
        translate: boolean;
        widget: HTMLElement;
    }

    export class Scroller extends Base implements Events, Delayable {        
        clientHeight: number;
        clientWidth: number;
        id: string;
        maxX: number;
        maxY: number;
        overflowX: boolean|string;
        overflowY: boolean|string;
        scrollHeight: number;
        scrollWidth: number;
        viewport: Rectangle;
        x: number;
        y: number;        
        constructor(config?: Partial<ScrollerConfig>);
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addPartner(otherScroller: Scroller, axes?: string|object): void;
        hasListener(eventName: string): boolean;
        hasScrollbar(axis?: any): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        removePartner(otherScroller: Scroller): void;
        resumeEvents(): void;
        scrollBy(xDelta?: number, yDelta?: number, options?: object|boolean): Promise<any>;
        scrollIntoView(element: HTMLElement|Rectangle, options?: object): Promise<any>;
        scrollTo(toX?: number, toY?: number, options?: object|boolean): Promise<any>;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    export class LocaleHelper {        
        static mergeLocales(locales: object): object;
        static publishLocale(localeName: string, config: object): void;
        static trimLocale(locale: object, trimLocale: object): void;
    }

    // Singleton
    export class LocaleManager {        
        static locale: string|object;
        static locales: object;
        static throwOnMissingLocale: boolean;        
        static applyLocale(name: string): boolean|Promise<any>;
        static extendLocale(name: string, config: object): void;
        static registerLocale(name: string, config: object): void;
    }

    type LocalizableConfig = {        
        localeClass: Base;
        localizableProperties: string[];
    }

    export class Localizable {        
        localeManager: LocaleManager;        
        constructor(config?: Partial<LocalizableConfig>);
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        updateLocalization(): void;
    }

    export class Delayable {
    }

    type EventsConfig = {        
        listeners: object;
    }

    export class Events {        
        constructor(config?: Partial<EventsConfig>);
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        hasListener(eventName: string): boolean;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resumeEvents(): void;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type InstancePluginConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class InstancePlugin extends Base implements Localizable, Events {        
        client: Widget;
        disabled: boolean;
        localeManager: LocaleManager;        
        constructor(config?: Partial<InstancePluginConfig>);
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        doDisable(): void;
        hasListener(eventName: string): boolean;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resumeEvents(): void;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        updateLocalization(): void;
    }

    export class Override {        
        static apply(override: object): void;
    }

    type PluggableConfig = {        
        plugins: Function[];
    }

    export class Pluggable {        
        plugins: object;        
        constructor(config?: Partial<PluggableConfig>);
        addPlugins(plugins: Function[]): void;
        getPlugin(pluginClassOrName: string|Function): object;
        hasPlugin(pluginClassOrName: string|Function): boolean;
    }

    export class State {        
        state: object;
    }

    export class DomClassListOverride {
    }

    export class Bag {        
        count: number;
        values: object[];        
        add(toAdd: object|object[]): void;
        changeId(item: string|number|object, newId: string|number): void;
        find(fn: Function): object;
        forEach(fn: Function, thisObj?: object): void;
        get(id: any): object;
        includes(item: object|string|number): boolean;
        map(fn: Function, thisObj?: object): object[];
        remove(toRemove: object|object[]): void;
        sort(fn: Function): void;
    }

    type ClickRepeaterConfig = {        
        accelerateDuration: number;
        delay: number;
        delegate: string;
        element: HTMLElement;
        endRate: number;
        startRate: number;
    }

    export class ClickRepeater {        
        constructor(config?: Partial<ClickRepeaterConfig>);
    }

    type CollectionConfig = {        
        autoFilter: boolean;
        extraKeys: string[]|object[];
        idProperty: string;
        sorters: object[];
    }

    export class Collection {        
        allValues: object[];
        count: number;
        filterFunction: Function;
        filters: Collection;
        generation: number;
        idProperty: string;
        isFiltered: boolean;
        isSorted: boolean;
        sortFunction: Function;
        sorters: Collection;
        totalCount: number;
        values: object[];        
        constructor(config?: Partial<CollectionConfig>);
        add(items: object): void;
        addFilter(filter: object): CollectionFilter;
        addSorter(sorter: object): CollectionSorter;
        changeId(item: string|number|object, newId: string|number): void;
        clear(): void;
        find(fn: Function, ignoreFilters?: boolean): object;
        findIndex(propertyName: string, value: any, ignoreFilters?: boolean): number;
        findItem(propertyName: string, value: any, ignoreFilters?: boolean): object|Set<any>;
        forEach(fn: Function, ignoreFilters?: boolean): void;
        get(id: any, ignoreFilters?: boolean): object;
        getBy(propertyName: string, value: any, ignoreFilters?: boolean): object;
        includes(item: object|string|number, ignoreFilters?: boolean): boolean;
        indexOf(item: object|string|number, ignoreFilters?: boolean): number;
        map(fn: Function, ignoreFilters?: boolean): object[];
        move(items: object|object[], beforeItem?: object): number;
        remove(items: object): void;
        splice(index?: number, toRemove?: object[]|number, toAdd?: object[]|object): void;
    }

    type CollectionFilterConfig = {        
        caseSensitive: boolean;
        convert: Function;
        filterBy: Function;
        id: string;
        operator: string;
        property: string;
        value: any;
    }

    export class CollectionFilter {        
        filterBy: Function;
        operator: string;
        property: string;
        value: any;        
        constructor(config?: Partial<CollectionFilterConfig>);
    }

    type CollectionSorterConfig = {        
        convert: Function;
        direction: string;
        id: string;
        property: string;
        sortFn: Function;
        useLocaleSort: boolean|string|object;
    }

    export class CollectionSorter {        
        constructor(config?: Partial<CollectionSorterConfig>);
    }

    type MonthConfig = {        
        date: Date|string;
        hideNonWorkingDays: boolean;
        nonWorkingDays: object;
        sixWeeks: boolean;
        weekStartDay: number;
    }

    export class Month {        
        canonicalDayNumbers: number[];
        dayColumnIndex: number[];
        dayCount: number;
        endDate: Date;
        startDate: Date;
        visibleDayColumnIndex: number[];
        weekCount: number;
        weekLength: number;        
        constructor(config?: Partial<MonthConfig>);
        eachDay(fn: Function): void;
        eachWeek(fn: Function): void;
        getWeekNumber(date: Date): number[];
        getWeekStart(week: number|number[]): void;
    }

    type ButtonConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        badge: string;
        centered: boolean;
        cls: string|object;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        href: string;
        html: string;
        htmlCls: string|object;
        icon: string;
        iconAlign: string;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        menu: object|object[]|Widget;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        pressed: boolean;
        pressedIcon: string;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        target: string;
        text: string;
        textAlign: string;
        title: string;
        toggleGroup: string;
        toggleable: boolean;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Button extends Widget implements Badge {        
        badge: string;
        icon: string;
        iconAlign: string;
        menu: Widget;
        pressed: boolean;
        pressedIcon: string;
        text: string;        
        constructor(config?: Partial<ButtonConfig>);
        eachWidget(fn: Function, deep?: boolean): boolean;
        toggle(pressed: boolean): void;
    }

    type ButtonGroupConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object[]|Button[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        toggleGroup: boolean;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ButtonGroup extends Container {        
        constructor(config?: Partial<ButtonGroupConfig>);
    }

    type CalendarPanelConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        bbar: object[]|object;
        cellRenderer: Function;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        date: Date|string;
        dayNameFormat: string;
        defaultBindProperty: string;
        defaults: object;
        disableWeekends: boolean;
        disabled: boolean;
        disabledDates: Function|Date[];
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        header: object|string;
        headerRenderer: Function;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minColumnWidth: number;
        minHeight: string|number;
        minRowHeight: number;
        minWidth: string|number;
        monitorResize: boolean;
        month: Month|object;
        namedItems: object;
        nonWorkingDays: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showWeekColumn: boolean;
        showWeekNumber: boolean;
        sixWeeks: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tip: object;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weekRenderer: Function;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class CalendarPanel extends Panel {        
        date: Date;
        endDate: Date;
        startDate: Date;        
        constructor(config?: Partial<CalendarPanelConfig>);
        refresh(): void;
        updateDate(): void;
        updateWeekStartDay(): void;
    }

    type CheckboxConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        checked: boolean;
        clearable: boolean|object;
        cls: string|object;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        text: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Checkbox extends Field {        
        checked: boolean;
        name: string;
        value: string;        
        constructor(config?: Partial<CheckboxConfig>);
        check(): void;
        toggle(): void;
        uncheck(): void;
    }

    type ChipViewConfig = {        
        activateOnMouseover: boolean;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        closable: boolean;
        closeHandler: string|Function;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        iconTpl: Function;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemTpl: Function;
        items: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        selected: Collection|object;
        showAnimation: boolean|object;
        store: object|Store;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ChipView extends List {        
        constructor(config?: Partial<ChipViewConfig>);
    }

    type ComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Combo extends PickerField {        
        static queryLast: string;
        isEmpty: boolean;
        record: Model[];
        records: Model[];
        store: Store|object;
        value: object;
        valueCollection: Collection;        
        constructor(config?: Partial<ComboConfig>);
    }

    type ContainerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Container extends Widget {        
        isSettingValues: boolean;
        isValid: boolean;
        items: Widget[]|object;
        layoutStyle: object;
        record: Model;
        values: object;
        widgetMap: any;        
        constructor(config?: Partial<ContainerConfig>);
        add(toAdd: Widget): Widget|Widget[];
        getWidgetById(id: string): Widget;
        insert(toAdd: Widget, The: number|Widget): Widget;
        processWidgetConfig(): void;
        remove(toRemove: Widget): Widget|Widget[];
        removeAll(): Widget[];
    }

    type DateFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        format: string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keepTime: boolean|Date|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string|Date;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string|Date;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerFormat: string;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: string|number|object;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string|Date;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DateField extends PickerField {        
        format: string;
        max: string|Date;
        min: string|Date;
        step: string|number|object;
        value: string|Date;        
        constructor(config?: Partial<DateFieldConfig>);
    }

    type DatePickerConfig = {        
        activeDate: Date;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        bbar: object[]|object;
        cellRenderer: Function;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        date: Date|string;
        dayNameFormat: string;
        defaultBindProperty: string;
        defaults: object;
        disableWeekends: boolean;
        disabled: boolean;
        disabledDates: Function|Date[];
        draggable: boolean|object;
        editMonth: boolean;
        editOnHover: boolean;
        flex: number|string;
        floating: boolean;
        focusDisabledDates: boolean;
        footer: object|string;
        header: object|string;
        headerRenderer: Function;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxDate: Date;
        maxHeight: string|number;
        maxWidth: string|number;
        minColumnWidth: number;
        minDate: Date;
        minHeight: string|number;
        minRowHeight: number;
        minWidth: string|number;
        monitorResize: boolean;
        month: Month|object;
        multiSelect: boolean;
        namedItems: object;
        nonWorkingDays: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showWeekColumn: boolean;
        showWeekNumber: boolean;
        sixWeeks: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tip: object;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weekRenderer: Function;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DatePicker extends CalendarPanel {        
        constructor(config?: Partial<DatePickerConfig>);
    }

    type DateTimeFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        dateField: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        timeField: object;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DateTimeField extends Field {        
        constructor(config?: Partial<DateTimeFieldConfig>);
    }

    type DisplayFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DisplayField extends Field {        
        constructor(config?: Partial<DisplayFieldConfig>);
    }

    type DurationFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowNegative: boolean;
        allowedUnits: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        decimalPrecision: number;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        magnitude: number;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: number;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        unit: string;
        useAbbreviation: boolean;
        value: object|string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DurationField extends TextField {        
        magnitude: number;
        milliseconds: number;
        unit: string;
        value: string|number|object|Duration;        
        constructor(config?: Partial<DurationFieldConfig>);
    }

    type EditorConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        blurAction: string;
        cancelKey: string;
        centered: boolean;
        cls: string|object;
        completeKey: string;
        completeOnChange: boolean;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        inputField: object|string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        invalidAction: string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Editor extends Container {        
        constructor(config?: Partial<EditorConfig>);
        cancelEdit(): void;
        completeEdit(): void;
        startEdit(editObject: object): void;
    }

    type FieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export abstract class Field extends Widget implements Badge {        
        static errorTip: Tooltip;
        badge: string;
        isEmpty: boolean;
        isEmptyInput: boolean;
        isValid: boolean;
        label: string;
        triggers: object;
        value: any;        
        constructor(config?: Partial<FieldConfig>);
        clear(): void;
        clearError(error?: string, silent?: boolean): void;
        getErrors(): string[];
        select(start?: number, end?: number): void;
        setError(error: string, silent?: boolean): void;
    }

    type FileFieldConfig = {        
        accept: string;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        multiple: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class FileField extends Field {        
        files: FileList;        
        constructor(config?: Partial<FileFieldConfig>);
        clear(): void;
    }

    type FilePickerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        buttonConfig: object;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        fileFieldConfig: object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class FilePicker extends Container {        
        files: FileList;        
        constructor(config?: Partial<FilePickerConfig>);
        clear(): void;
    }

    type FilterFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        field: string;
        filterFunction: Function;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class FilterField extends TextField {        
        constructor(config?: Partial<FilterFieldConfig>);
    }

    type ListConfig = {        
        activateOnMouseover: boolean;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemTpl: Function;
        items: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        selected: Collection|object;
        showAnimation: boolean|object;
        store: object|Store;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class List extends Widget {        
        items: object[];
        store: Store;        
        constructor(config?: Partial<ListConfig>);
    }

    type MaskConfig = {        
        icon: string;
        mode: string;
        owner: object|Widget;
        showDelay: number;
        target: string|HTMLElement;
        text: string;
    }

    export class Mask {        
        maxProgress: number;
        progress: number;        
        constructor(config?: Partial<MaskConfig>);
        static mask(text: string|object, target: HTMLElement): Mask;
        static unmask(element: HTMLElement): Promise<any>;
        close(): Promise<any>;
        hide(): Promise<any>;
        show(): void;
    }

    type MenuConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnHover: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Menu extends Popup {        
        currentSubMenu: Menu;
        isSubMenu: boolean;
        parentMenu: Menu;
        selectedElement: HTMLElement;        
        constructor(config?: Partial<MenuConfig>);
    }

    type MenuItemConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        checked: boolean;
        closeParent: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        href: string;
        html: string;
        htmlCls: string|object;
        icon: string;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        menu: object|object[];
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        target: string;
        text: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class MenuItem extends Widget {        
        checked: boolean;
        menu: Widget;        
        constructor(config?: Partial<MenuItemConfig>);
        doAction(): void;
    }

    // Singleton
    export class MessageDialog extends Popup {        
        static cancelButton: number;
        static noButton: number;
        static yesButton: number;        
        static confirm(options: object): Promise<any>;
    }

    type NumberFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        changeOnSpin: boolean|number;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        decimalPrecision: number;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        format: string|object|NumberFormat;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputType: string;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        largeStep: number;
        leadingZeroes: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: number;
        maxHeight: string|number;
        maxWidth: string|number;
        min: number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: number;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class NumberField extends Field {        
        step: number;        
        constructor(config?: Partial<NumberFieldConfig>);
        changeValue(): void;
    }

    type PagingToolbarConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: AjaxStore;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        widgetCls: string;
        width: string|number;
        x: number;
        y: number;
    }

    export class PagingToolbar extends Toolbar {        
        constructor(config?: Partial<PagingToolbarConfig>);
    }

    type PanelConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Panel extends Container {        
        bbar: Toolbar;
        tbar: Toolbar;
        tools: object;        
        constructor(config?: Partial<PanelConfig>);
    }

    type PickerFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export abstract class PickerField extends TextField {        
        picker: Widget;        
        constructor(config?: Partial<PickerFieldConfig>);
        eachWidget(fn: Function, deep?: boolean): boolean;
        hidePicker(): void;
        showPicker(): void;
        togglePicker(): void;
    }

    type PopupConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Popup extends Panel {        
        constructor(config?: Partial<PopupConfig>);
        close(): void;
    }

    type SlideToggleConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        checked: boolean;
        clearable: boolean|object;
        cls: string|object;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        text: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SlideToggle extends Checkbox {        
        constructor(config?: Partial<SlideToggleConfig>);
    }

    type SliderConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: number;
        maxHeight: string|number;
        maxWidth: string|number;
        min: number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showTooltip: boolean;
        showValue: boolean;
        step: number;
        style: string;
        tag: string;
        text: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        value: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Slider extends Widget {        
        max: number;
        min: number;
        step: number;
        text: string;
        value: number;        
        constructor(config?: Partial<SliderConfig>);
    }

    type SplitterConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        orientation: string;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Splitter extends Widget {        
        currentOrientation: string;
        orientation: string;        
        constructor(config?: Partial<SplitterConfig>);
    }

    type TabPanelConfig = {        
        activeTab: number;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        animateTabChange: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tabMaxWidth: number;
        tabMinWidth: number;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TabPanel extends Container {        
        activeIndex: number;
        activeItem: Widget;
        activeTab: number;        
        constructor(config?: Partial<TabPanelConfig>);
    }

    type TextAreaFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inline: boolean;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        resize: string;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TextAreaField extends Field {        
        constructor(config?: Partial<TextAreaFieldConfig>);
    }

    type TextFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TextField extends Field {        
        constructor(config?: Partial<TextFieldConfig>);
    }

    type TimeFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        format: string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string|Date;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string|Date;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: string;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string|Date;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TimeField extends PickerField {        
        format: string;
        max: string|Date;
        min: string|Date;
        step: string|number|object;        
        constructor(config?: Partial<TimeFieldConfig>);
        focusPicker(): void;
        showPicker(): void;
    }

    type ToastConfig = {        
        color: string;
        showProgress: boolean;
        timeout: number;
    }

    export class Toast {        
        constructor(config?: Partial<ToastConfig>);
        static hideAll(): void;
        static show(msgOrConfig: string|object): Toast;
        hide(): void;
    }

    type ToolConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Tool extends Widget {        
        constructor(config?: Partial<ToolConfig>);
    }

    type ToolbarConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        widgetCls: string;
        width: string|number;
        x: number;
        y: number;
    }

    export class Toolbar extends Container {        
        constructor(config?: Partial<ToolbarConfig>);
    }

    type TooltipConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOver: boolean;
        anchor: boolean;
        anchorToTarget: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        dismissDelay: number;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        forSelector: string;
        getHtml: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideDelay: number;
        hideOnDelegateChange: boolean;
        hideWhenEmpty: boolean;
        hoverDelay: number;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadingMsg: string;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        mouseOffsetX: number;
        mouseOffsetY: number;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        showOnHover: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Tooltip extends Popup {        
        static currentOverElement: HTMLElement;
        activeTarget: HTMLElement;
        html: string;
        triggeredByEvent: Event;        
        constructor(config?: Partial<TooltipConfig>);
        showAsyncMessage(message: string): void;
    }

    type WidgetConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Widget extends Base implements Events, Localizable {        
        static $name: string;
        alignSelf: string;
        anchorSize: number[];
        content: string;
        contentElement: HTMLElement;
        dataset: object;
        disabled: boolean;
        element: HTMLElement;
        flex: number|string;
        focusElement: HTMLElement;
        height: number|string;
        hidden: boolean;
        html: string;
        id: string;
        isVisible: boolean;
        localeManager: LocaleManager;
        margin: number|string;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        nextSibling: Widget;
        overflowElement: HTMLElement;
        owner: Widget;
        previousSibling: Widget;
        readOnly: boolean;
        scrollable: Scroller;
        style: string|object|CSSStyleDeclaration;
        tooltip: string|object;
        width: number|string;
        x: number;
        y: number;        
        constructor(config?: Partial<WidgetConfig>);
        static attachTooltip(element: HTMLElement, configOrText: object|string): HTMLElement;
        static fromElement(element: HTMLElement|Event, type?: string|Function, limit?: HTMLElement|number): Widget;
        static initClass(): void;
        static optionalL(text: string, templateData?: object): string;
        static query(selector: string|Function, deep?: boolean): Widget;
        static queryAll(selector: string|Function, deep?: boolean): Widget[];
        L(text: string, templateData?: object): string;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        alignTo(spec?: object): void;
        closest(selector: string|Function, deep?: boolean, limit?: number|string|Widget): void;
        disable(): void;
        eachAncestor(fn: Function): boolean;
        eachWidget(fn: Function, deep?: boolean): boolean;
        enable(): void;
        focus(): void;
        hasListener(eventName: string): boolean;
        hide(animate?: boolean): Promise<any>;
        mask(msg: string|object): Mask;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        owns(target: HTMLElement|Event|Widget): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resumeEvents(): void;
        revertFocus(force: boolean): void;
        setXY(x?: number, y?: number): void;
        show(): Promise<any>;
        showBy(spec: object|HTMLElement): Promise<any>;
        showByPoint(x: number|number[], y?: number, options?: object): Promise<any>;
        suspendEvents(queue?: boolean): void;
        toFront(): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        unmask(): void;
        up(selector: string|Function, deep?: boolean, limit?: number|string|Widget): void;
        updateLocalization(): void;
    }

    type HistogramConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        getBarText: Function;
        getBarTip: Function;
        getRectClass: Function;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        omitZeroHeightBars: number;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        series: object[];
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        topValue: number;
        values: number[];
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Histogram extends Widget {        
        constructor(config?: Partial<HistogramConfig>);
    }

    type ScaleConfig = {        
        adopt: HTMLElement|string;
        align: string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        horizontal: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Scale extends Widget {        
        constructor(config?: Partial<ScaleConfig>);
    }

    type CardConfig = {        
        activeIndex: number;
        activeItem: Widget;
        animateCardChange: boolean;
    }

    export class Card {        
        constructor(config?: Partial<CardConfig>);
    }

    export class Fit {
    }

    type LayoutConfig = {        
        containerCls: string;
        itemCls: string;
    }

    export class Layout {        
        constructor(config?: Partial<LayoutConfig>);
    }

    type BadgeConfig = {        
        badge: string;
    }

    export class Badge {        
        badge: string;        
        constructor(config?: Partial<BadgeConfig>);
    }

    type ActionColumnConfig = {        
        actions: object[];
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        disableIfGridReadOnly: boolean;
        draggable: boolean;
        editTargetSelector: string;
        editor: boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class ActionColumn extends Column {        
        constructor(config?: Partial<ActionColumnConfig>);
    }

    type AggregateColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        function: Function|string;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class AggregateColumn extends Column {        
        constructor(config?: Partial<AggregateColumnConfig>);
    }

    type CheckColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        checkCls: string;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showCheckAll: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        widgets: object[];
        width: number|string;
    }

    export class CheckColumn extends WidgetColumn {        
        constructor(config?: Partial<CheckColumnConfig>);
    }

    type ColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class Column extends Model implements Events, Localizable {        
        contentElement: HTMLElement;
        defaults: object;
        element: HTMLElement;
        flex: string;
        hidden: boolean;
        icon: string;
        localeManager: LocaleManager;
        subGrid: SubGrid;
        text: string;
        textElement: HTMLElement;
        textWrapper: HTMLElement;
        width: number|string;        
        constructor(config?: Partial<ColumnConfig>);
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        getRawValue(record: Model): any;
        hasListener(eventName: string): boolean;
        hide(): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        refreshCell(record: Model): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resizeToFitContent(widthMin: number|number[], widthMax: number): void;
        resumeEvents(): void;
        show(): void;
        suspendEvents(queue?: boolean): void;
        toggle(force: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        updateLocalization(): void;
    }

    type DateColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        format: string;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        step: string|number|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class DateColumn extends Column {        
        format: string;        
        constructor(config?: Partial<DateColumnConfig>);
    }

    type NumberColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        format: string|object|NumberFormat;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        largeStep: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        max: number;
        min: number;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        step: number;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        unit: string;
        width: number|string;
    }

    export class NumberColumn extends Column {        
        constructor(config?: Partial<NumberColumnConfig>);
    }

    type PercentColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: object|string;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        lowThreshold: number;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        showValue: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class PercentColumn extends Column {        
        constructor(config?: Partial<PercentColumnConfig>);
    }

    type RatingColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editable: boolean;
        editor: string|object|boolean;
        emptyIcon: string;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filledIcon: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        format: string|object|NumberFormat;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        largeStep: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        max: number;
        min: number;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        step: number;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        unit: string;
        width: number|string;
    }

    export class RatingColumn extends NumberColumn {        
        constructor(config?: Partial<RatingColumnConfig>);
    }

    type RowNumberColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class RowNumberColumn extends Column {        
        constructor(config?: Partial<RowNumberColumnConfig>);
        resizeToFitContent(): void;
    }

    type TemplateColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        template: Function;
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class TemplateColumn extends Column {        
        constructor(config?: Partial<TemplateColumnConfig>);
    }

    type TimeColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        format: string;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class TimeColumn extends Column {        
        format: string;        
        constructor(config?: Partial<TimeColumnConfig>);
    }

    type TreeColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        collapseIconCls: string;
        collapsedFolderIconCls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        expandIconCls: string;
        expandedFolderIconCls: string;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        indentSize: number;
        instantUpdate: boolean;
        invalidAction: string;
        leafIconCls: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class TreeColumn extends Column {        
        constructor(config?: Partial<TreeColumnConfig>);
    }

    type WidgetColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        widgets: object[];
        width: number|string;
    }

    export class WidgetColumn extends Column {        
        constructor(config?: Partial<WidgetColumnConfig>);
        onAfterWidgetSetValue(widget: Widget, event: object): void;
        onBeforeWidgetSetValue(widget: Widget, event: object): void;
    }

    export class GridTag {
    }

    type ColumnStoreConfig = {        
        allowNoId: boolean;
        autoAddField: boolean;
        autoCommit: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        data: object[];
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fields: object[];
        filters: object|object[];
        groupers: object[];
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
    }

    export class ColumnStore extends Store {        
        bottomColumns: Column[];
        topColumns: Column[];
        visibleColumns: Column[];        
        constructor(config?: Partial<ColumnStoreConfig>);
        static registerColumnType(columnClass: Function, simpleRenderer?: boolean): void;
        get(field: string): Column;
        indexOf(recordOrId: Model|string): number;
    }

    type GridRowModelConfig = {        
        cls: string;
        expanded: boolean;
        href: string;
        iconCls: string;
        parentId: string|number;
        parentIndex: number;
        rowHeight: number;
        target: string;
    }

    export class GridRowModel extends Model {        
        cls: string;
        expanded: boolean;
        href: string;
        iconCls: string;
        rowHeight: number;
        target: string;        
        constructor(config?: Partial<GridRowModelConfig>);
    }

    type CellEditConfig = {        
        addNewAtEnd: boolean|object;
        autoEdit: boolean;
        autoSelect: boolean;
        blurAction: string;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        triggerEvent: string;
    }

    export class CellEdit extends InstancePlugin {        
        activeRecord: Model;
        isEditing: boolean;        
        constructor(config?: Partial<CellEditConfig>);
        cancelEditing(silent?: boolean): void;
        confirm(options: object): void;
        finishEditing(): void;
        startEditing(cellContext: object): boolean;
    }

    type CellMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class CellMenu extends ContextMenuBase {        
        constructor(config?: Partial<CellMenuConfig>);
    }

    type CellTooltipConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        tooltipRenderer: Function;
    }

    export class CellTooltip extends InstancePlugin {        
        constructor(config?: Partial<CellTooltipConfig>);
    }

    type ColumnAutoWidthConfig = {        
        default: number|number[];
        delay: number;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnAutoWidth extends InstancePlugin implements Delayable {        
        constructor(config?: Partial<ColumnAutoWidthConfig>);
    }

    type ColumnDragToolbarConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnDragToolbar extends InstancePlugin {        
        constructor(config?: Partial<ColumnDragToolbarConfig>);
    }

    type ColumnPickerConfig = {        
        disabled: boolean;
        groupByRegion: boolean;
        groupByTag: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnPicker extends InstancePlugin {        
        constructor(config?: Partial<ColumnPickerConfig>);
    }

    type ColumnReorderConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnReorder extends InstancePlugin {        
        constructor(config?: Partial<ColumnReorderConfig>);
    }

    type ColumnResizeConfig = {        
        disabled: boolean;
        listeners: object;
        liveResize: string|boolean;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnResize extends InstancePlugin {        
        constructor(config?: Partial<ColumnResizeConfig>);
    }

    type ContextMenuConfig = {        
        cellItems: object[];
        disabled: boolean;
        headerItems: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        processCellItems: Function;
        processHeaderItems: Function;
        triggerEvent: string;
    }

    export class ContextMenu extends InstancePlugin {        
        constructor(config?: Partial<ContextMenuConfig>);
    }

    type FilterConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        prioritizeColumns: boolean;
    }

    export class Filter extends InstancePlugin {        
        constructor(config?: Partial<FilterConfig>);
        closeFilterEditor(): void;
        showFilterEditor(column: Column|string, value?: any): void;
    }

    type FilterBarConfig = {        
        disabled: boolean;
        keyStrokeFilterDelay: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        prioritizeColumns: boolean;
    }

    export class FilterBar extends InstancePlugin {        
        constructor(config?: Partial<FilterBarConfig>);
        hideFilterBar(): void;
        showFilterBar(): void;
        toggleFilterBar(): void;
    }

    export class GridFeatureManager {        
        static getInstanceDefaultFeatures(instance: object): object;
        static getInstanceFeatures(instance: object): object;
        static getTypeNameDefaultFeatures(forType?: string): object;
        static getTypeNameFeatures(forType?: string): object;
        static isDefaultFeatureForInstance(featureClass: InstancePlugin, forType?: string): boolean;
        static isDefaultFeatureForTypeName(featureClass: InstancePlugin, forType?: string): boolean;
        static registerFeature(featureClass: InstancePlugin, onByDefault?: boolean, forType?: string|string[]): void;
    }

    type GroupConfig = {        
        disabled: boolean;
        field: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        renderer: Function;
    }

    export class Group extends InstancePlugin {        
        constructor(config?: Partial<GroupConfig>);
        collapseAll(): void;
        expandAll(): void;
        toggleCollapse(recordOrId: Model|string, collapse: boolean): void;
    }

    type GridGroupSummaryConfig = {        
        collapseToHeader: boolean;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class GridGroupSummary extends InstancePlugin {        
        constructor(config?: Partial<GridGroupSummaryConfig>);
    }

    type HeaderMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class HeaderMenu extends ContextMenuBase {        
        constructor(config?: Partial<HeaderMenuConfig>);
    }

    type QuickFindConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class QuickFind extends InstancePlugin {        
        found: object[];
        foundCount: number;        
        constructor(config?: Partial<QuickFindConfig>);
        clear(): void;
        gotoFirstHit(): void;
        gotoHit(index: number): void;
        gotoLastHit(): void;
        gotoNextHit(): void;
        gotoPrevHit(): void;
        search(find: string, columnFieldOrId: string): void;
    }

    type RegionResizeConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class RegionResize extends InstancePlugin {        
        constructor(config?: Partial<RegionResizeConfig>);
    }

    type RowReorderConfig = {        
        disabled: boolean;
        hoverExpandTimeout: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class RowReorder extends InstancePlugin {        
        constructor(config?: Partial<RowReorderConfig>);
    }

    type SearchConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class Search extends InstancePlugin {        
        foundCount: number;
        isHitFocused: boolean;        
        constructor(config?: Partial<SearchConfig>);
        clear(): void;
        gotoFirstHit(): void;
        gotoHit(index: number): void;
        gotoLastHit(): void;
        gotoNextHit(): void;
        gotoPrevHit(): void;
        search(find: string, gotoHit?: boolean, reapply?: boolean): void;
    }

    type SortConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        multiSort: boolean;
        prioritizeColumns: boolean;
    }

    export class Sort extends InstancePlugin {        
        constructor(config?: Partial<SortConfig>);
    }

    type StickyCellsConfig = {        
        contentSelector: string;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class StickyCells extends InstancePlugin {        
        constructor(config?: Partial<StickyCellsConfig>);
    }

    type StripeConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class Stripe extends InstancePlugin {        
        constructor(config?: Partial<StripeConfig>);
    }

    type GridSummaryConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class GridSummary extends InstancePlugin {        
        constructor(config?: Partial<GridSummaryConfig>);
    }

    type TreeConfig = {        
        disabled: boolean;
        expandOnCellClick: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class Tree extends InstancePlugin {        
        constructor(config?: Partial<TreeConfig>);
        collapse(idOrRecord: string|number|Model): Promise<any>;
        collapseAll(): Promise<any>;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandAll(): Promise<any>;
        expandOrCollapseAll(collapse?: boolean, topNode?: Model): Promise<any>;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
    }

    type ContextMenuBaseConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        triggerEvent: string;
        type: string;
    }

    export abstract class ContextMenuBase extends InstancePlugin {        
        menu: Menu;
        menuContext: object;        
        constructor(config?: Partial<ContextMenuBaseConfig>);
    }

    type GridExcelExporterConfig = {        
        convertEmptyValueToEmptyString: boolean;
        dateFormat: string;
        disabled: boolean;
        exporterClass: TableExporter;
        exporterConfig: object;
        filename: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        zipcelx: object;
    }

    export class GridExcelExporter extends InstancePlugin {        
        constructor(config?: Partial<GridExcelExporterConfig>);
        export(config: object): void;
    }

    type GridPdfExportConfig = {        
        alignRows: boolean;
        clientURL: string;
        disabled: boolean;
        exportMask: string;
        exportProgressMask: string;
        exportServer: string;
        exporterType: string;
        exporters: Exporter[];
        fetchOptions: object;
        fileFormat: string;
        fileName: string;
        footerTpl: Function;
        headerTpl: Function;
        keepPathName: boolean;
        keepRegionSizes: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        openAfterExport: boolean;
        openInNewTab: boolean;
        orientation: string;
        paperFormat: string;
        repeatHeader: boolean;
        rowsRange: string;
        translateURLsToAbsolute: boolean|string;
    }

    export class GridPdfExport extends InstancePlugin {        
        currentExportPromise: Promise<any>;        
        constructor(config?: Partial<GridPdfExportConfig>);
        export(config: object): Promise<any>;
        showExportDialog(): Promise<any>;
    }

    type ExporterConfig = {        
        keepPathName: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        translateURLsToAbsolute: boolean|string;
    }

    export class Exporter implements Localizable, Events {        
        localeManager: LocaleManager;
        stylesheets: string[];        
        constructor(config?: Partial<ExporterConfig>);
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        hasListener(eventName: string): boolean;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        pageTpl(data: object): string;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        resumeEvents(): void;
        suspendEvents(queue?: boolean): void;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        updateLocalization(): void;
    }

    type RowConfig = {        
        cls: string|DomClassList|object;
    }

    export class Row extends Base {        
        bottom: number;
        cells: HTMLElement[];
        cls: DomClassList|object;
        dataIndex: number;
        elements: HTMLElement[];
        height: number;
        id: string|number;
        index: number;
        isFirst: boolean;
        offsetHeight: number;
        top: number;        
        constructor(config?: Partial<RowConfig>);
        addCls(classes: string|object|DomClassList): void;
        assignCls(classList: object): void;
        eachCell(fn: Function): void;
        eachElement(fn: Function): void;
        getCell(columnId: string|number): HTMLElement;
        getCells(region: string): HTMLElement[];
        getElement(region: string): HTMLElement;
        removeCls(classes: string|object|DomClassList): void;
    }

    type ScrollManagerConfig = {        
        direction: string;
        scrollSpeed: number;
        startScrollDelay: number;
        zoneWidth: number;
    }

    export class ScrollManager {        
        constructor(config?: Partial<ScrollManagerConfig>);
    }

    type TableExporterConfig = {        
        columns: string[]|object[];
        defaultColumnWidth: number;
        exportDateAsInstance: boolean;
        indent: boolean;
        indentationSymbol: string;
        showGroupHeader: boolean;
        target: Grid;
    }

    export class TableExporter extends Base {        
        constructor(config?: Partial<TableExporterConfig>);
        export(config: object): object;
    }

    type GridConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        autoHeight: boolean;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaults: object;
        destroyStore: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        draggable: boolean|object;
        emptyText: string;
        enableSticky: boolean;
        enableTextSelection: boolean;
        features: any;
        fillLastColumn: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        fullRowRefresh: boolean;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        plugins: Function[];
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        resizeToFitIncludesHeader: boolean;
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class Grid extends GridBase {        
        constructor(config?: Partial<GridConfig>);
    }

    type GridBaseConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        autoHeight: boolean;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaults: object;
        destroyStore: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        draggable: boolean|object;
        emptyText: string;
        enableSticky: boolean;
        enableTextSelection: boolean;
        features: any;
        fillLastColumn: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        fullRowRefresh: boolean;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        plugins: Function[];
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        resizeToFitIncludesHeader: boolean;
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class GridBase extends Panel implements Events, Pluggable, State, GridElementEvents, GridFeatures, GridResponsive, GridSelection, GridState, GridSubGrids {        
        bodyHeight: number;
        columnLines: boolean;
        columns: ColumnStore;
        data: object[];
        features: any;
        firstVisibleRow: Row;
        headerHeight: number;
        lastVisibleRow: Row;
        plugins: object;
        responsiveLevel: string;
        selectedCell: object;
        selectedCellCSSSelector: string;
        selectedRecord: Model;
        selectedRecords: Model[]|number[];
        state: object;
        store: Store|object;
        subGrids: object;
        transitionDuration: number;        
        constructor(config?: Partial<GridBaseConfig>);
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addPlugins(plugins: Function[]): void;
        collapse(idOrRecord: string|number|Model): Promise<any>;
        collapseAll(): void;
        deselectAll(keepFilteredOutSelection?: boolean): void;
        deselectCell(cellSelector: object): object;
        deselectRow(recordOrId: Model|string|number): void;
        deselectRows(recordOrIds: Model|string|number|Model[]|string[]|number[]): void;
        disableScrollingCloseToEdges(subGrid: SubGrid|string): void;
        enableScrollingCloseToEdges(subGrid: SubGrid|string): void;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandAll(): void;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
        getCell(cellContext: object): HTMLElement;
        getColumnFromElement(element: HTMLElement): Column;
        getHeaderElement(columnId: string|number|Column): HTMLElement;
        getPlugin(pluginClassOrName: string|Function): object;
        getRecordFromElement(element: HTMLElement): Model;
        getSubGrid(region: string): SubGrid;
        getSubGridFromColumn(column: string|Column): SubGrid;
        hasFeature(name: string): boolean;
        hasListener(eventName: string): boolean;
        hasPlugin(pluginClassOrName: string|Function): boolean;
        isSelectable(recordCellOrId: Model|object|string|number): boolean;
        isSelected(cellSelectorOrId: object|string|number|Model): boolean;
        maskBody(loadMask: string): Mask;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        refreshColumn(column: Column): void;
        refreshRows(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeListener(config: object, thisObj: object): void;
        renderContents(): void;
        renderRows(): void;
        restoreScroll(state?: object): void;
        resumeEvents(): void;
        scrollCellIntoView(cellContext: object): void;
        scrollColumnIntoView(column: Column|string|number, options?: object): Promise<any>;
        scrollRowIntoView(recordOrId: Model|string|number, options?: object): Promise<any>;
        scrollToBottom(): Promise<any>;
        scrollToTop(): Promise<any>;
        selectAll(): void;
        selectCell(cellSelector: object, scrollIntoView?: boolean, addToSelection?: boolean, silent?: boolean): object;
        selectRange(fromId: string|number, toId: string|number): void;
        selectRow(options: object|Model): void;
        spliceSelectedRecords(index: number, toRemove: object[]|number, toAdd: object[]|object): void;
        startEditing(cellContext: object): boolean;
        storeScroll(): object;
        suspendEvents(queue?: boolean): void;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
        unmaskBody(): void;
    }

    type SubGridConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        collapsed: boolean;
        columns: ColumnStore;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        region: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SubGrid extends Widget {        
        collapsed: boolean;
        flex: number|string;
        rowElements: HTMLElement[];
        viewRectangle: Rectangle;
        width: number;        
        constructor(config?: Partial<SubGridConfig>);
        collapse(): Promise<any>;
        expand(): Promise<any>;
        resizeColumnsToFitContent(): void;
        scrollColumnIntoView(column: Column|string|number, options?: object): Promise<any>;
    }

    type TreeGridConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        autoHeight: boolean;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaults: object;
        destroyStore: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        draggable: boolean|object;
        emptyText: string;
        enableSticky: boolean;
        enableTextSelection: boolean;
        features: any;
        fillLastColumn: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        fullRowRefresh: boolean;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        plugins: Function[];
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        resizeToFitIncludesHeader: boolean;
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TreeGrid extends Grid {        
        constructor(config?: Partial<TreeGridConfig>);
        collapse(idOrRecord: string|number|Model): Promise<any>;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
    }

    type ExportDialogConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        client: Grid;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePNGMultipageOption: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ExportDialog extends Popup {        
        constructor(config?: Partial<ExportDialogConfig>);
    }

    type GridElementEventsConfig = {        
        longPressTime: number;
    }

    export class GridElementEvents {        
        constructor(config?: Partial<GridElementEventsConfig>);
    }

    type GridFeaturesConfig = {        
        features: object;
    }

    export class GridFeatures {        
        features: any;        
        constructor(config?: Partial<GridFeaturesConfig>);
        hasFeature(name: string): boolean;
    }

    export class GridNavigation {        
        cellCSSSelector: string;
        focusedCell: object;
        isActionableLocation: boolean;        
        focusCell(cellSelector: object, options: object): object;
        isFocused(cellSelector: object|string|number): boolean;
        navigateDown(event?: Event): object;
        navigateLeft(event?: Event): object;
        navigateRight(event?: Event): object;
        navigateUp(event?: Event): object;
    }

    type GridResponsiveConfig = {        
        responsiveLevels: object;
    }

    export class GridResponsive {        
        responsiveLevel: string;        
        constructor(config?: Partial<GridResponsiveConfig>);
    }

    type GridSelectionConfig = {        
        selectionMode: object;
    }

    export class GridSelection {        
        selectedCell: object;
        selectedCellCSSSelector: string;
        selectedRecord: Model;
        selectedRecords: Model[]|number[];        
        constructor(config?: Partial<GridSelectionConfig>);
        deselectAll(keepFilteredOutSelection?: boolean): void;
        deselectCell(cellSelector: object): object;
        deselectRow(recordOrId: Model|string|number): void;
        deselectRows(recordOrIds: Model|string|number|Model[]|string[]|number[]): void;
        isSelectable(recordCellOrId: Model|object|string|number): boolean;
        isSelected(cellSelectorOrId: object|string|number|Model): boolean;
        selectAll(): void;
        selectCell(cellSelector: object, scrollIntoView?: boolean, addToSelection?: boolean, silent?: boolean): object;
        selectRange(fromId: string|number, toId: string|number): void;
        selectRow(options: object|Model): void;
        spliceSelectedRecords(index: number, toRemove: object[]|number, toAdd: object[]|object): void;
    }

    export class GridState {        
        state: object;
    }

    export class GridSubGrids {        
        subGrids: object;        
        getSubGrid(region: string): SubGrid;
        getSubGridFromColumn(column: string|Column): SubGrid;
    }

    type ResourceInfoColumnConfig = {        
        align: string;
        autoScaleThreshold: number;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        showEventCount: boolean;
        showImage: boolean;
        showRole: boolean|string;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        validNames: string[];
        width: number|string;
    }

    export class ResourceInfoColumn extends Column {        
        constructor(config?: Partial<ResourceInfoColumnConfig>);
    }

    type TimeAxisColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function|boolean;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class TimeAxisColumn extends Column {        
        constructor(config?: Partial<TimeAxisColumnConfig>);
        refreshHeader(): void;
    }

    type VerticalTimeAxisColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class VerticalTimeAxisColumn extends Column {        
        constructor(config?: Partial<VerticalTimeAxisColumnConfig>);
    }

    type AbstractCrudManagerConfig = {        
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        crudStores: Store[]|string[]|object[];
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        resetIdsBeforeSync: boolean;
        storeIdProperty: string;
        stores: Store[]|string[]|object[];
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        trackResponseType: boolean;
        writeAllFields: boolean;
    }

    export abstract class AbstractCrudManager extends Base implements AbstractCrudManagerMixin {        
        crudRevision: number;
        crudStores: object[];
        isCrudManagerLoading: boolean;
        isLoading: boolean;
        revision: number;
        stores: object[];
        syncApplySequence: object[];        
        constructor(config?: Partial<AbstractCrudManagerConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        abstract cancelRequest(promise: Promise<any>, reject: Function): void;
        commit(): void;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        abstract decode(response: string): object;
        doDestroy(): void;
        abstract encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        reject(): void;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        abstract sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type AbstractCrudManagerMixinConfig = {        
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        crudStores: Store[]|string[]|object[];
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        resetIdsBeforeSync: boolean;
        storeIdProperty: string;
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        trackResponseType: boolean;
        writeAllFields: boolean;
    }

    export abstract class AbstractCrudManagerMixin implements Delayable, Events {        
        crudRevision: number;
        crudStores: object[];
        isCrudManagerLoading: boolean;
        syncApplySequence: object[];        
        constructor(config?: Partial<AbstractCrudManagerMixinConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        abstract cancelRequest(promise: Promise<any>, reject: Function): void;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        abstract decode(response: string): object;
        doDestroy(): void;
        abstract encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        abstract sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    export class JsonEncoder {        
        decode(responseText: string): object;
        encode(request: object): string;
    }

    type CrudManagerViewConfig = {        
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
    }

    export class CrudManagerView {        
        crudManager: CrudManager;        
        constructor(config?: Partial<CrudManagerViewConfig>);
    }

    type AjaxTransportConfig = {        
        transport: object;
    }

    export abstract class AjaxTransport {        
        constructor(config?: Partial<AjaxTransportConfig>);
        cancelRequest(requestPromise: Promise<any>, reject: Function): void;
        sendRequest(request: object): Promise<any>;
    }

    type SchedulerAssignmentStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class SchedulerAssignmentStore extends AjaxStore implements AssignmentStoreMixin, SchedulerPartOfProject {        
        assignmentStore: SchedulerAssignmentStore;
        data: object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        project: SchedulerProjectModel;
        resourceStore: SchedulerResourceStore;        
        constructor(config?: Partial<SchedulerAssignmentStoreConfig>);
        add(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        addAsync(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        assignEventToResource(event: TimeSpan, resources: SchedulerResourceModel|SchedulerResourceModel[], assignmentSetupFn?: Function, removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        getAssignmentForEventAndResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel;
        getAssignmentsForEvent(event: TimeSpan): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel): SchedulerAssignmentModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): TimeSpan[];
        getResourcesForEvent(event: SchedulerEventModel): SchedulerResourceModel[];
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        loadDataAsync(data: object[]): void;
        mapAssignmentsForEvent(event: SchedulerEventModel, fn?: Function, filterFn?: Function): SchedulerEventModel[]|any[];
        mapAssignmentsForResource(resource: SchedulerResourceModel|number|string, fn?: Function, filterFn?: Function): SchedulerResourceModel[]|any[];
        removeAssignmentsForEvent(event: TimeSpan): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|any): void;
        unassignEventFromResource(event: TimeSpan|string|number, resources?: SchedulerResourceModel|string|number): SchedulerAssignmentModel|SchedulerAssignmentModel[];
    }

    type CrudManagerConfig = {        
        assignmentStore: SchedulerAssignmentStore|object;
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        crudStores: Store[]|string[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        eventStore: SchedulerEventStore|object;
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        project: SchedulerProjectModel;
        resetIdsBeforeSync: boolean;
        resourceStore: SchedulerResourceStore|object;
        storeIdProperty: string;
        stores: Store[]|string[]|object[];
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        trackResponseType: boolean;
        transport: object;
        writeAllFields: boolean;
    }

    export class CrudManager extends AbstractCrudManager implements SchedulerProjectCrudManager, JsonEncoder, AjaxTransport {        
        assignmentStore: SchedulerAssignmentStore;
        crudRevision: number;
        crudStores: object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        isCrudManagerLoading: boolean;
        resourceStore: SchedulerResourceStore;
        syncApplySequence: object[];
        timeRangesStore: Store;        
        constructor(config?: Partial<CrudManagerConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        cancelRequest(requestPromise: Promise<any>, reject: Function): void;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        decode(responseText: string): object;
        doDestroy(): void;
        encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type SchedulerDependencyStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class SchedulerDependencyStore extends AjaxStore implements SchedulerPartOfProject, DependencyStoreMixin {        
        assignmentStore: SchedulerAssignmentStore;
        data: object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        project: SchedulerProjectModel;
        resourceStore: SchedulerResourceStore;        
        constructor(config?: Partial<SchedulerDependencyStoreConfig>);
        add(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        addAsync(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        getDependencyForSourceAndTargetEvents(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getEventDependencies(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventPredecessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventSuccessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventsLinkingDependency(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getHighlightedDependencies(cls: string): DependencyBaseModel[];
        isValidDependency(dependencyOrFromId: SchedulerDependencyModel|number|string, toId?: number|string, type?: number): boolean;
        isValidDependencyToCreate(fromId: number|string, toId: number|string, type: number): boolean;
        loadDataAsync(data: object[]): void;
    }

    type SchedulerEventStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        removeUnassignedEvent: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class SchedulerEventStore extends AjaxStore implements SchedulerPartOfProject, SharedEventStoreMixin, EventStoreMixin, RecurringEventsMixin {        
        assignmentStore: SchedulerAssignmentStore;
        data: object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        modelClass: { new(data: object): Model };
        project: SchedulerProjectModel;
        resourceStore: SchedulerResourceStore;        
        constructor(config?: Partial<SchedulerEventStoreConfig>);
        add(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        addAsync(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        append(record: SchedulerEventModel): void;
        assignEventToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number|SchedulerResourceModel[]|string[]|number[], removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getAssignmentsForEvent(event: SchedulerEventModel|string|number): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel[];
        getEvents(): SchedulerEventModel[]|Map<any,any>;
        getEventsByStartDate(startDate: Date): SchedulerEventModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): SchedulerEventModel[];
        getEventsInTimeSpan(startDate: Date, endDate: Date, allowPartial?: boolean, onlyAssigned?: boolean): SchedulerEventModel[];
        getRecurringEvents(): SchedulerEventModel[];
        getRecurringTimeSpans(): TimeSpan[];
        getResourcesForEvent(event: SchedulerEventModel|string|number): SchedulerResourceModel[];
        getTotalTimeSpan(): object;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: SchedulerEventModel|null, resource: SchedulerResourceModel): boolean;
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        isEventPersistable(event: SchedulerEventModel): boolean;
        loadDataAsync(data: object[]): void;
        reassignEventFromResourceToResource(event: SchedulerEventModel, oldResource: SchedulerResourceModel|SchedulerResourceModel[], newResource: SchedulerResourceModel|SchedulerResourceModel[]): void;
        removeAssignmentsForEvent(event: SchedulerEventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
        unassignEventFromResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): void;
    }

    type SchedulerResourceStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class SchedulerResourceStore extends AjaxStore implements SchedulerPartOfProject, ResourceStoreMixin {        
        assignmentStore: SchedulerAssignmentStore;
        data: object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        project: SchedulerProjectModel;
        resourceStore: SchedulerResourceStore;        
        constructor(config?: Partial<SchedulerResourceStoreConfig>);
        add(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        addAsync(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        loadDataAsync(data: object[]): void;
    }

    type ResourceTimeRangeStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        resourceStore: SchedulerResourceStore;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class ResourceTimeRangeStore extends AjaxStore {        
        constructor(config?: Partial<ResourceTimeRangeStoreConfig>);
    }

    type TimeAxisConfig = {        
        allowNoId: boolean;
        autoAdjust: boolean;
        autoCommit: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        continuous: boolean;
        data: object[];
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fields: object[];
        filters: object|object[];
        groupers: object[];
        id: string|number;
        include: object;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
    }

    export class TimeAxis extends Store {        
        endDate: Date;
        isContinuous: boolean;
        startDate: Date;
        ticks: object[];
        viewPreset: ViewPreset;        
        constructor(config?: Partial<TimeAxisConfig>);
        dateInAxis(date: Date): boolean;
        filterBy(fn: Function, thisObj?: object): void;
        generateTicks(axisStartDate: Date, axisEndDate: Date, unit: string, increment: number): any[];
        getDateFromTick(tick: number, roundingMethod?: string): Date;
        getTickFromDate(date: Date): number;
        setTimeSpan(newStartDate: Date, newEndDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
        timeSpanInAxis(start: Date, end: Date): boolean;
    }

    export class AssignmentStoreMixin {        
        data: object[];        
        add(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        addAsync(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        assignEventToResource(event: TimeSpan, resources: SchedulerResourceModel|SchedulerResourceModel[], assignmentSetupFn?: Function, removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        getAssignmentForEventAndResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel;
        getAssignmentsForEvent(event: TimeSpan): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel): SchedulerAssignmentModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): TimeSpan[];
        getResourcesForEvent(event: SchedulerEventModel): SchedulerResourceModel[];
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        loadDataAsync(data: object[]): void;
        mapAssignmentsForEvent(event: SchedulerEventModel, fn?: Function, filterFn?: Function): SchedulerEventModel[]|any[];
        mapAssignmentsForResource(resource: SchedulerResourceModel|number|string, fn?: Function, filterFn?: Function): SchedulerResourceModel[]|any[];
        removeAssignmentsForEvent(event: TimeSpan): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|any): void;
        unassignEventFromResource(event: TimeSpan|string|number, resources?: SchedulerResourceModel|string|number): SchedulerAssignmentModel|SchedulerAssignmentModel[];
    }

    export class AttachToProjectMixin {        
        attachToAssignmentStore(store: SchedulerAssignmentStore): void;
        attachToCalendarManagerStore(store: Store): void;
        attachToDependencyStore(store: SchedulerDependencyStore): void;
        attachToEventStore(store: SchedulerEventStore): void;
        attachToProject(project: SchedulerProjectModel): void;
        attachToResourceStore(store: SchedulerResourceStore): void;
    }

    export class DependencyStoreMixin {        
        data: object[];        
        add(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        addAsync(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        getDependencyForSourceAndTargetEvents(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getEventDependencies(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventPredecessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventSuccessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventsLinkingDependency(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getHighlightedDependencies(cls: string): DependencyBaseModel[];
        isValidDependency(dependencyOrFromId: SchedulerDependencyModel|number|string, toId?: number|string, type?: number): boolean;
        isValidDependencyToCreate(fromId: number|string, toId: number|string, type: number): boolean;
        loadDataAsync(data: object[]): void;
    }

    export class EventStoreMixin {        
        assignEventToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number|SchedulerResourceModel[]|string[]|number[], removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getAssignmentsForEvent(event: SchedulerEventModel|string|number): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel[];
        getEvents(): SchedulerEventModel[]|Map<any,any>;
        getEventsByStartDate(startDate: Date): SchedulerEventModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): SchedulerEventModel[];
        getEventsInTimeSpan(startDate: Date, endDate: Date, allowPartial?: boolean, onlyAssigned?: boolean): SchedulerEventModel[];
        getResourcesForEvent(event: SchedulerEventModel|string|number): SchedulerResourceModel[];
        getTotalTimeSpan(): object;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: SchedulerEventModel|null, resource: SchedulerResourceModel): boolean;
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        isEventPersistable(event: SchedulerEventModel): boolean;
        reassignEventFromResourceToResource(event: SchedulerEventModel, oldResource: SchedulerResourceModel|SchedulerResourceModel[], newResource: SchedulerResourceModel|SchedulerResourceModel[]): void;
        removeAssignmentsForEvent(event: SchedulerEventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
        unassignEventFromResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): void;
    }

    export class SchedulerPartOfProject {        
        assignmentStore: SchedulerAssignmentStore;
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        project: SchedulerProjectModel;
        resourceStore: SchedulerResourceStore;
    }

    type ProjectConsumerConfig = {        
        destroyStores: boolean;
        project: SchedulerProjectModel|object;
    }

    export class ProjectConsumer {        
        isEngineReady: boolean;
        project: SchedulerProjectModel;        
        constructor(config?: Partial<ProjectConsumerConfig>);
        updateProject(project: SchedulerProjectModel): void;
        whenProjectReady(callback: Function): void;
    }

    type SchedulerProjectCrudManagerConfig = {        
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        crudStores: Store[]|string[]|object[];
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        project: SchedulerProjectModel;
        resetIdsBeforeSync: boolean;
        storeIdProperty: string;
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        trackResponseType: boolean;
        transport: object;
        writeAllFields: boolean;
    }

    export class SchedulerProjectCrudManager implements AbstractCrudManagerMixin, AjaxTransport, JsonEncoder {        
        crudRevision: number;
        crudStores: object[];
        isCrudManagerLoading: boolean;
        syncApplySequence: object[];        
        constructor(config?: Partial<SchedulerProjectCrudManagerConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        cancelRequest(requestPromise: Promise<any>, reject: Function): void;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        decode(responseText: string): object;
        doDestroy(): void;
        encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    export class RecurringEventsMixin extends RecurringTimeSpansMixin {        
        getRecurringEvents(): SchedulerEventModel[];
    }

    export class RecurringTimeSpansMixin {        
        getRecurringTimeSpans(): TimeSpan[];
    }

    export class ResourceStoreMixin {        
        data: object[];        
        add(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        addAsync(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        loadDataAsync(data: object[]): void;
    }

    type SharedEventStoreMixinConfig = {        
        removeUnassignedEvent: boolean;
    }

    export class SharedEventStoreMixin {        
        data: object[];
        modelClass: { new(data: object): Model };        
        constructor(config?: Partial<SharedEventStoreMixinConfig>);
        add(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        addAsync(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        append(record: SchedulerEventModel): void;
        loadDataAsync(data: object[]): void;
    }

    type RecurrenceLegendConfig = {        
        localeClass: Base;
        localizableProperties: string[];
    }

    export class RecurrenceLegend implements Localizable {        
        localeManager: LocaleManager;        
        constructor(config?: Partial<RecurrenceLegendConfig>);
        static getLegend(recurrence: RecurrenceModel, timeSpanStartDate?: Date): string;
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        updateLocalization(): void;
    }

    type AbstractTimeRangesConfig = {        
        disabled: boolean;
        enableResizing: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showHeaderElements: boolean;
        showTooltip: boolean;
        store: object|Store;
    }

    export abstract class AbstractTimeRanges extends InstancePlugin implements Delayable {        
        showHeaderElements: boolean;
        store: Store;
        timeRanges: TimeSpan[];        
        constructor(config?: Partial<AbstractTimeRangesConfig>);
        getTipHtml(): void;
    }

    type ColumnLinesConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ColumnLines extends InstancePlugin {        
        constructor(config?: Partial<ColumnLinesConfig>);
    }

    type DependenciesConfig = {        
        allowCreate: boolean;
        creationTooltip: object;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        pathFinderConfig: object;
        showCreationTooltip: boolean;
        showTooltip: boolean;
        terminalCls: string;
        terminalSides: string[];
        tooltip: object;
    }

    export class Dependencies extends InstancePlugin implements Delayable, DependencyCreation {        
        constructor(config?: Partial<DependenciesConfig>);
        abort(): void;
        draw(): void;
        drawDependency(dependency: SchedulerDependencyModel): void;
        drawForEvent(): void;
        getConnectorEndSide(timeSpanRecord: TimeSpan): string;
        getConnectorStartSide(timeSpanRecord: TimeSpan): string;
        hideTerminals(eventElement: HTMLElement): void;
        refreshDependency(dependency: SchedulerDependencyModel): void;
        releaseDependency(dependency: SchedulerDependencyModel): void;
        resolveDependencyRecord(element: HTMLElement): SchedulerDependencyModel;
        showTerminals(timeSpanRecord: TimeSpan, element: HTMLElement): void;
    }

    type DependencyEditConfig = {        
        autoClose: boolean;
        disabled: boolean;
        editorConfig: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        saveAndCloseOnEnter: boolean;
        showDeleteButton: boolean;
        showLagField: boolean;
        triggerEvent: string;
    }

    export class DependencyEdit extends InstancePlugin {        
        cancelButton: Button;
        deleteButton: Button;
        fromNameField: DisplayField;
        lagField: DurationField;
        saveButton: Button;
        toNameField: DisplayField;
        typeField: Combo;        
        constructor(config?: Partial<DependencyEditConfig>);
        editDependency(dependencyRecord: SchedulerDependencyModel): void;
        onAfterSave(dependencyRecord: SchedulerDependencyModel): void;
        onBeforeSave(dependencyRecord: SchedulerDependencyModel): void;
    }

    type EventContextMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class EventContextMenu extends EventMenu {        
        constructor(config?: Partial<EventContextMenuConfig>);
    }

    type EventDragConfig = {        
        constrainDragToResource: boolean;
        constrainDragToTimeSlot: boolean;
        constrainDragToTimeline: boolean;
        disabled: boolean;
        dragHelperConfig: object;
        dragTipTemplate: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showExactDropPosition: boolean;
        showTooltip: boolean;
        unifiedDrag: boolean;
        validatorFn: Function;
        validatorFnThisObj: object;
    }

    export class EventDrag extends DragBase {        
        constructor(config?: Partial<EventDragConfig>);
        getRelatedRecords(assignmentRecord: SchedulerAssignmentModel): SchedulerAssignmentModel[];
    }

    type EventDragCreateConfig = {        
        disabled: boolean;
        dragTolerance: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showTooltip: boolean;
        validatorFn: Function;
        validatorFnThisObj: object;
    }

    export class EventDragCreate extends DragCreateBase {        
        constructor(config?: Partial<EventDragCreateConfig>);
    }

    type EventDragSelectConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class EventDragSelect extends InstancePlugin implements Delayable {        
        constructor(config?: Partial<EventDragSelectConfig>);
    }

    type EventEditConfig = {        
        autoClose: boolean;
        dateFormat: string;
        disabled: boolean;
        editorConfig: object;
        endDateConfig: object;
        endTimeConfig: object;
        extraItems: string|object[];
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        readOnly: boolean;
        resourceFieldConfig: object;
        saveAndCloseOnEnter: boolean;
        showDeleteButton: boolean;
        showNameField: boolean;
        showRecurringUI: boolean;
        showResourceField: boolean;
        startDateConfig: object;
        startTimeConfig: object;
        timeFormat: string;
        triggerEvent: string;
        typeField: string;
        weekStartDay: number;
    }

    export class EventEdit extends EditBase implements RecurringEventEdit {        
        cancelButton: Button;
        deleteButton: Button;
        editRecurrenceButton: RecurrenceLegendButton;
        endDateField: DateField;
        endTimeField: TimeField;
        eventRecord: SchedulerEventModel;
        isEditing: boolean;
        nameField: TextField;
        readOnly: boolean;
        recurrenceCombo: RecurrenceCombo;
        resourceField: Combo;
        saveButton: Button;
        startDateField: DateField;
        startTimeField: TimeField;        
        constructor(config?: Partial<EventEditConfig>);
        editEvent(eventRecord: SchedulerEventModel, resourceRecord?: SchedulerResourceModel, element?: HTMLElement): void;
    }

    type EventFilterConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class EventFilter extends InstancePlugin {        
        constructor(config?: Partial<EventFilterConfig>);
    }

    type EventMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class EventMenu extends TimeSpanMenuBase {        
        constructor(config?: Partial<EventMenuConfig>);
        showContextMenuFor(eventRecord: SchedulerEventModel, options?: object): void;
    }

    type SchedulerEventResizeConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showExactResizePosition: boolean;
        showTooltip: boolean;
        tip: Tooltip|object;
        validatorFn: Function;
        validatorFnThisObj: object;
    }

    export class SchedulerEventResize extends ResizeBase {        
        constructor(config?: Partial<SchedulerEventResizeConfig>);
    }

    type EventTooltipConfig = {        
        autoUpdate: boolean;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        template: Function;
    }

    export class EventTooltip extends TooltipBase {        
        constructor(config?: Partial<EventTooltipConfig>);
    }

    type GroupSummaryConfig = {        
        collapseToHeader: boolean;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        renderer: Function;
        showTooltip: boolean;
        summaries: object[];
    }

    export class GroupSummary extends GridGroupSummary {        
        constructor(config?: Partial<GroupSummaryConfig>);
    }

    type HeaderContextMenuConfig = {        
        disabled: boolean;
        extraItems: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        processItems: Function;
    }

    export class HeaderContextMenu extends InstancePlugin {        
        constructor(config?: Partial<HeaderContextMenuConfig>);
    }

    type HeaderZoomConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class HeaderZoom extends InstancePlugin {        
        constructor(config?: Partial<HeaderZoomConfig>);
    }

    type LabelsConfig = {        
        blurAction: string;
        bottom: object;
        disabled: boolean;
        labelCls: string;
        left: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        right: object;
        top: object;
    }

    export class Labels extends InstancePlugin {        
        constructor(config?: Partial<LabelsConfig>);
    }

    type NonWorkingTimeConfig = {        
        disabled: boolean;
        enableResizing: boolean;
        highlightWeekends: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        maxTimeAxisUnit: string;
        showHeaderElements: boolean;
        showTooltip: boolean;
        store: object|Store;
    }

    export class NonWorkingTime extends AbstractTimeRanges {        
        constructor(config?: Partial<NonWorkingTimeConfig>);
    }

    type PanConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        vertical: boolean;
    }

    export class Pan extends InstancePlugin {        
        constructor(config?: Partial<PanConfig>);
    }

    type ResourceTimeRangesConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        store: ResourceTimeRangeStore;
    }

    export class ResourceTimeRanges extends ResourceTimeRangesBase {        
        constructor(config?: Partial<ResourceTimeRangesConfig>);
    }

    type ScheduleContextMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class ScheduleContextMenu extends ScheduleMenu {        
        constructor(config?: Partial<ScheduleContextMenuConfig>);
    }

    type ScheduleMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class ScheduleMenu extends TimeSpanMenuBase {        
        constructor(config?: Partial<ScheduleMenuConfig>);
    }

    type ScheduleTooltipConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ScheduleTooltip extends InstancePlugin {        
        constructor(config?: Partial<ScheduleTooltipConfig>);
        generateTipContent(context: object): void;
        getText(date: Date, event: Event, resourceRecord: SchedulerResourceModel): string;
    }

    type SimpleEventEditConfig = {        
        disabled: boolean;
        editorConfig: object;
        field: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        triggerEvent: string;
    }

    export class SimpleEventEdit extends InstancePlugin {        
        eventRecord: SchedulerEventModel;        
        constructor(config?: Partial<SimpleEventEditConfig>);
        editEvent(eventRecord: SchedulerEventModel, resourceRecord?: SchedulerResourceModel): void;
    }

    type StickyEventsConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class StickyEvents extends InstancePlugin {        
        constructor(config?: Partial<StickyEventsConfig>);
    }

    type SummaryConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        renderer: Function;
        showTooltip: boolean;
        summaries: object[];
    }

    export class Summary extends GridSummary {        
        constructor(config?: Partial<SummaryConfig>);
    }

    type TimeAxisHeaderMenuConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        processItems: Function;
        triggerEvent: string;
        type: string;
    }

    export class TimeAxisHeaderMenu extends HeaderMenu {        
        constructor(config?: Partial<TimeAxisHeaderMenuConfig>);
    }

    type TimeRangesConfig = {        
        currentDateFormat: string;
        disabled: boolean;
        enableResizing: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showCurrentTimeLine: boolean|object;
        showHeaderElements: boolean;
        showTooltip: boolean;
        store: object|Store;
        timeRanges: TimeSpan[]|object[];
    }

    export class TimeRanges extends AbstractTimeRanges {        
        disabled: boolean;
        showCurrentTimeLine: boolean;
        store: Store;
        timeRanges: TimeSpan[];        
        constructor(config?: Partial<TimeRangesConfig>);
        populateHeaderMenu(options: object): void;
    }

    type DragBaseConfig = {        
        constrainDragToTimeline: boolean;
        disabled: boolean;
        dragHelperConfig: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showExactDropPosition: boolean;
        showTooltip: boolean;
    }

    export abstract class DragBase extends InstancePlugin {        
        constructor(config?: Partial<DragBaseConfig>);
        getTipHtml(): void;
    }

    type DragCreateBaseConfig = {        
        disabled: boolean;
        dragTolerance: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showTooltip: boolean;
        validatorFnThisObj: object;
    }

    export class DragCreateBase extends InstancePlugin {        
        constructor(config?: Partial<DragCreateBaseConfig>);
        getTipHtml(): any;
    }

    type EditBaseConfig = {        
        autoClose: boolean;
        dateFormat: string;
        disabled: boolean;
        editorConfig: object;
        endDateConfig: object;
        endTimeConfig: object;
        extraItems: string|object[];
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        saveAndCloseOnEnter: boolean;
        showDeleteButton: boolean;
        showNameField: boolean;
        startDateConfig: object;
        startTimeConfig: object;
        timeFormat: string;
        weekStartDay: number;
    }

    export class EditBase extends InstancePlugin {        
        constructor(config?: Partial<EditBaseConfig>);
        onAfterSave(eventRecord: SchedulerEventModel): void;
        onBeforeSave(eventRecord: SchedulerEventModel): void;
    }

    type ResizeBaseConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showExactResizePosition: boolean;
        showTooltip: boolean;
        tip: Tooltip|object;
        validatorFn: Function;
        validatorFnThisObj: object;
    }

    export abstract class ResizeBase extends InstancePlugin {        
        constructor(config?: Partial<ResizeBaseConfig>);
    }

    type ResourceTimeRangesBaseConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export abstract class ResourceTimeRangesBase extends InstancePlugin {        
        constructor(config?: Partial<ResourceTimeRangesBaseConfig>);
    }

    type TimeSpanMenuBaseConfig = {        
        disabled: boolean;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        menu: object;
        menuConfig: object;
        triggerEvent: string;
        type: string;
    }

    export abstract class TimeSpanMenuBase extends ContextMenuBase {        
        constructor(config?: Partial<TimeSpanMenuBaseConfig>);
    }

    type TimeSpanRecordContextMenuBaseConfig = {        
        defaultItems: object;
        disabled: boolean;
        items: object|object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        processItems: Function;
        triggerEvent: string;
    }

    export abstract class TimeSpanRecordContextMenuBase extends InstancePlugin {        
        constructor(config?: Partial<TimeSpanRecordContextMenuBaseConfig>);
        abstract resolveRecord(): void;
        showContextMenuFor(record: TimeSpan, options?: object): void;
    }

    type TooltipBaseConfig = {        
        autoUpdate: boolean;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class TooltipBase extends InstancePlugin {        
        tooltip: Tooltip;        
        constructor(config?: Partial<TooltipBaseConfig>);
    }

    type ExcelExporterConfig = {        
        convertEmptyValueToEmptyString: boolean;
        dateFormat: string;
        disabled: boolean;
        exporterClass: ScheduleTableExporter;
        exporterConfig: object;
        filename: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        zipcelx: object;
    }

    export class ExcelExporter extends GridExcelExporter {        
        constructor(config?: Partial<ExcelExporterConfig>);
    }

    type PdfExportConfig = {        
        alignRows: boolean;
        clientURL: string;
        disabled: boolean;
        exportMask: string;
        exportProgressMask: string;
        exportServer: string;
        exporterType: string;
        exporters: Exporter[];
        fetchOptions: object;
        fileFormat: string;
        fileName: string;
        footerTpl: Function;
        headerTpl: Function;
        keepPathName: boolean;
        keepRegionSizes: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        openAfterExport: boolean;
        openInNewTab: boolean;
        orientation: string;
        paperFormat: string;
        rangeEnd: Date;
        rangeStart: Date;
        repeatHeader: boolean;
        rowsRange: string;
        scheduleRange: string;
        translateURLsToAbsolute: boolean|string;
    }

    export class PdfExport extends GridPdfExport {        
        constructor(config?: Partial<PdfExportConfig>);
    }

    type DependencyCreationConfig = {        
        allowCreate: boolean;
        creationTooltip: object;
        showCreationTooltip: boolean;
        terminalCls: string;
        terminalSides: string[];
    }

    export class DependencyCreation {        
        constructor(config?: Partial<DependencyCreationConfig>);
        abort(): void;
        hideTerminals(eventElement: HTMLElement): void;
        showTerminals(timeSpanRecord: TimeSpan, element: HTMLElement): void;
    }

    type RecurringEventEditConfig = {        
        showRecurringUI: boolean;
    }

    export class RecurringEventEdit {        
        editRecurrenceButton: RecurrenceLegendButton;
        recurrenceCombo: RecurrenceCombo;        
        constructor(config?: Partial<RecurringEventEditConfig>);
    }

    type SchedulerAssignmentModelConfig = {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        parentId: string|number;
        parentIndex: number;
        resource: string|number;
        resourceId: string|number;
    }

    export class SchedulerAssignmentModel extends Model implements AssignmentModelMixin {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        eventName: string;
        isPersistable: boolean;
        resource: string|number;
        resourceId: string|number;
        resourceName: string;        
        constructor(config?: Partial<SchedulerAssignmentModelConfig>);
        getResource(): SchedulerResourceModel;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        toString(): string;
    }

    type DependencyBaseModelConfig = {        
        bidirectional: boolean;
        cls: string;
        from: string|number;
        fromSide: string;
        lag: number;
        lagUnit: string;
        parentId: string|number;
        parentIndex: number;
        to: string|number;
        toSide: string;
        type: number;
    }

    export class DependencyBaseModel extends Model {        
        static Type: object;
        bidirectional: boolean;
        cls: string;
        from: string|number;
        fromEvent: SchedulerEventModel;
        fromSide: string;
        fullLag: Duration;
        hardType: number;
        isPersistable: boolean;
        lag: number;
        lagUnit: string;
        sourceEvent: SchedulerEventModel;
        targetEvent: SchedulerEventModel;
        to: string|number;
        toEvent: SchedulerEventModel;
        toSide: string;
        type: number;        
        constructor(config?: Partial<DependencyBaseModelConfig>);
        getHardType(): number;
        getSourceEvent(): SchedulerEventModel;
        getTargetEvent(): SchedulerEventModel;
        highlight(cls: string): void;
        isHighlightedWith(cls: string): boolean;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        setHardType(type: number): void;
        setLag(lag: number|string|object, lagUnit?: string): void;
        unhighlight(cls: string): void;
    }

    type SchedulerDependencyModelConfig = {        
        bidirectional: boolean;
        cls: string;
        from: string|number;
        fromSide: string;
        lag: number;
        lagUnit: string;
        parentId: string|number;
        parentIndex: number;
        to: string|number;
        toSide: string;
        type: number;
    }

    export class SchedulerDependencyModel extends DependencyBaseModel {        
        constructor(config?: Partial<SchedulerDependencyModelConfig>);
    }

    type SchedulerEventModelConfig = {        
        allDay: boolean;
        cls: DomClassList|string;
        draggable: boolean;
        duration: number;
        durationUnit: string;
        endDate: string|Date;
        eventColor: string;
        eventStyle: string;
        exceptionDates: object;
        iconCls: string;
        id: string|number;
        milestoneWidth: number;
        name: string;
        parentId: string|number;
        parentIndex: number;
        recurrenceRule: string;
        resizable: boolean|string;
        resourceId: string|number;
        startDate: string|Date;
        style: string;
    }

    export class SchedulerEventModel extends TimeSpan implements RecurringTimeSpan, EventModelMixin {        
        allDay: boolean;
        assignments: SchedulerAssignmentModel[];
        draggable: boolean;
        duration: number;
        endDate: string|Date;
        eventColor: string;
        eventStyle: string;
        exceptionDates: object;
        fullDuration: Duration;
        id: string|number;
        isDraggable: boolean;
        isInterDay: boolean;
        isOccurrence: boolean;
        isPersistable: boolean;
        isRecurring: boolean;
        isResizable: boolean|string;
        milestoneWidth: number;
        occurrenceIndex: number;
        predecessors: DependencyBaseModel[];
        recurrence: RecurrenceModel;
        recurrenceModel: string;
        recurrenceRule: string;
        resizable: boolean|string;
        resource: SchedulerResourceModel;
        resourceId: string|number;
        resources: SchedulerResourceModel[];
        startDate: string|Date;
        successors: DependencyBaseModel[];
        supportsRecurring: boolean;        
        constructor(config?: Partial<SchedulerEventModelConfig>);
        assign(resource: SchedulerResourceModel|string|number, removeExistingAssignments?: boolean): void;
        getOccurrencesForDateRange(startDate: Date, endDate?: Date): TimeSpan[];
        getResource(resourceId?: string): SchedulerResourceModel;
        hasException(date: Date): boolean;
        isAssignedTo(resource: SchedulerResourceModel|string|number): boolean;
        isEditable(fieldName: string): boolean;
        reassign(oldResourceId: SchedulerResourceModel|string|number, newResourceId: SchedulerResourceModel|string|number): void;
        remove(): void;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        setRecurrence(recurrence: object|string|RecurrenceModel, interval?: number, recurrenceEnd?: number|Date): void;
        shift(unit: string, amount: number): Promise<any>;
        unassign(resource?: SchedulerResourceModel|string|number): void;
    }

    type SchedulerProjectModelConfig = {        
        assignmentModelClass: SchedulerAssignmentModel;
        assignmentStore: SchedulerAssignmentStore|object;
        assignmentStoreClass: SchedulerAssignmentStore|object;
        assignmentsData: SchedulerAssignmentModel[];
        dependenciesData: SchedulerDependencyModel[];
        dependencyModelClass: SchedulerDependencyModel;
        dependencyStore: SchedulerDependencyStore|object;
        dependencyStoreClass: SchedulerDependencyStore|object;
        eventModelClass: SchedulerEventModel;
        eventStore: SchedulerEventStore|object;
        eventStoreClass: SchedulerEventStore|object;
        eventsData: SchedulerEventModel[];
        parentId: string|number;
        parentIndex: number;
        resourceModelClass: SchedulerResourceModel;
        resourceStore: SchedulerResourceStore|object;
        resourceStoreClass: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore|object;
        resourceTimeRangeStoreClass: ResourceTimeRangeStore|object;
        resourceTimeRangesData: ResourceTimeRangeModel[];
        resourcesData: SchedulerResourceModel[];
        silenceInitialCommit: boolean;
        stm: object|StateTrackingManager;
        timeRangeStore: Store|object;
        timeRangeStoreClass: Store|object;
        timeRangesData: TimeSpan[];
    }

    export class SchedulerProjectModel extends Model implements ProjectModelMixin {        
        assignmentStore: SchedulerAssignmentStore;
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        json: string;
        resourceStore: SchedulerResourceStore;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        stm: StateTrackingManager;
        timeRangeStore: Store;        
        constructor(config?: Partial<SchedulerProjectModelConfig>);
        commitAsync(): Promise<any>;
        loadInlineData(dataPackage: object): void;
        toJSON(): object;
    }

    type RecurrenceModelConfig = {        
        count: number;
        days: string[];
        endDate: Date;
        frequency: string;
        interval: number;
        monthDays: number[];
        months: number[];
        parentId: string|number;
        parentIndex: number;
        positions: number;
    }

    export class RecurrenceModel extends Model {        
        count: number;
        days: string[];
        endDate: Date;
        frequency: string;
        interval: number;
        isRecurrenceModel: boolean;
        monthDays: number[];
        months: number[];
        positions: number;
        rule: string;
        timeSpan: TimeSpan;        
        constructor(config?: Partial<RecurrenceModelConfig>);
    }

    type SchedulerResourceModelConfig = {        
        barMargin: number;
        cls: string;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        expanded: boolean;
        href: string;
        iconCls: string;
        id: string|number;
        image: string;
        imageUrl: string;
        name: string;
        parentId: string|number;
        parentIndex: number;
        resourceMargin: number;
        rowHeight: number;
        target: string;
    }

    export class SchedulerResourceModel extends GridRowModel implements ResourceModelMixin {        
        assignments: SchedulerAssignmentModel[];
        barMargin: number;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        events: SchedulerEventModel[];
        id: string|number;
        image: string;
        imageUrl: string;
        isPersistable: boolean;
        name: string;
        resourceMargin: number;
        rowHeight: number;        
        constructor(config?: Partial<SchedulerResourceModelConfig>);
        getEvents(): SchedulerEventModel[];
        setAsync(field: string|object, value: any, silent?: boolean): void;
        unassignAll(): void;
    }

    type ResourceTimeRangeModelConfig = {        
        cls: DomClassList|string;
        duration: number;
        durationUnit: string;
        endDate: string|Date;
        iconCls: string;
        name: string;
        parentId: string|number;
        parentIndex: number;
        resourceId: string|number;
        startDate: string|Date;
        style: string;
        timeRangeColor: string;
    }

    export class ResourceTimeRangeModel extends TimeSpan {        
        resourceId: string|number;
        timeRangeColor: string;        
        constructor(config?: Partial<ResourceTimeRangeModelConfig>);
    }

    type TimeSpanConfig = {        
        cls: DomClassList|string;
        duration: number;
        durationUnit: string;
        endDate: string|Date;
        iconCls: string;
        name: string;
        parentId: string|number;
        parentIndex: number;
        startDate: string|Date;
        style: string;
    }

    export class TimeSpan extends Model {        
        cls: DomClassList|string;
        dates: Date[];
        duration: number;
        durationUnit: string;
        endDate: string|Date;
        eventStore: SchedulerEventStore|EventStore;
        fullDuration: Duration;
        iconCls: string;
        isScheduled: boolean;
        name: string;
        startDate: string|Date;
        style: string;
        wbsCode: string;        
        constructor(config?: Partial<TimeSpanConfig>);
        exportToICS(icsEventConfig?: object): void;
        forEachDate(func: Function, thisObj: object): void;
        isEditable(fieldName: string): boolean;
        setDuration(duration: number, durationUnit: string): void;
        setEndDate(date: Date, keepDuration?: boolean): void;
        setStartDate(date: Date, keepDuration?: boolean): void;
        setStartEndDate(start: Date, end: Date, silent?: boolean): void;
        shift(unit: string, amount: number): void;
        split(splitPoint?: number): TimeSpan;
    }

    type AssignmentModelMixinConfig = {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        resource: string|number;
        resourceId: string|number;
    }

    export class AssignmentModelMixin {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        eventName: string;
        isPersistable: boolean;
        resource: string|number;
        resourceId: string|number;
        resourceName: string;        
        constructor(config?: Partial<AssignmentModelMixinConfig>);
        getResource(): SchedulerResourceModel;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        toString(): string;
    }

    type EventModelMixinConfig = {        
        allDay: boolean;
        draggable: boolean;
        duration: number;
        endDate: string|Date;
        eventColor: string;
        eventStyle: string;
        id: string|number;
        milestoneWidth: number;
        resizable: boolean|string;
        resourceId: string|number;
        startDate: string|Date;
    }

    export class EventModelMixin {        
        allDay: boolean;
        assignments: SchedulerAssignmentModel[];
        draggable: boolean;
        duration: number;
        endDate: string|Date;
        eventColor: string;
        eventStyle: string;
        fullDuration: Duration;
        id: string|number;
        isDraggable: boolean;
        isInterDay: boolean;
        isPersistable: boolean;
        isResizable: boolean|string;
        milestoneWidth: number;
        predecessors: DependencyBaseModel[];
        resizable: boolean|string;
        resource: SchedulerResourceModel;
        resourceId: string|number;
        resources: SchedulerResourceModel[];
        startDate: string|Date;
        successors: DependencyBaseModel[];        
        constructor(config?: Partial<EventModelMixinConfig>);
        assign(resource: SchedulerResourceModel|string|number, removeExistingAssignments?: boolean): void;
        getResource(resourceId?: string): SchedulerResourceModel;
        isAssignedTo(resource: SchedulerResourceModel|string|number): boolean;
        isEditable(fieldName: string): boolean;
        reassign(oldResourceId: SchedulerResourceModel|string|number, newResourceId: SchedulerResourceModel|string|number): void;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        shift(unit: string, amount: number): Promise<any>;
        unassign(resource?: SchedulerResourceModel|string|number): void;
    }

    type ProjectModelMixinConfig = {        
        assignmentModelClass: SchedulerAssignmentModel;
        assignmentStore: SchedulerAssignmentStore|object;
        assignmentStoreClass: SchedulerAssignmentStore|object;
        assignmentsData: SchedulerAssignmentModel[];
        dependenciesData: SchedulerDependencyModel[];
        dependencyModelClass: SchedulerDependencyModel;
        dependencyStore: SchedulerDependencyStore|object;
        dependencyStoreClass: SchedulerDependencyStore|object;
        eventModelClass: SchedulerEventModel;
        eventStore: SchedulerEventStore|object;
        eventStoreClass: SchedulerEventStore|object;
        eventsData: SchedulerEventModel[];
        resourceModelClass: SchedulerResourceModel;
        resourceStore: SchedulerResourceStore|object;
        resourceStoreClass: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore|object;
        resourceTimeRangeStoreClass: ResourceTimeRangeStore|object;
        resourceTimeRangesData: ResourceTimeRangeModel[];
        resourcesData: SchedulerResourceModel[];
        stm: object|StateTrackingManager;
        timeRangeStore: Store|object;
        timeRangeStoreClass: Store|object;
        timeRangesData: TimeSpan[];
    }

    export class ProjectModelMixin {        
        assignmentStore: SchedulerAssignmentStore|AssignmentStore;
        dependencyStore: SchedulerDependencyStore|DependencyStore;
        eventStore: SchedulerEventStore|EventStore;
        json: string;
        resourceStore: SchedulerResourceStore|ResourceStore;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        stm: StateTrackingManager;
        timeRangeStore: Store;        
        constructor(config?: Partial<ProjectModelMixinConfig>);
        commitAsync(): Promise<any>;
        loadInlineData(dataPackage: object): void;
        toJSON(): object;
    }

    type RecurringTimeSpanConfig = {        
        exceptionDates: object;
        recurrenceRule: string;
    }

    export class RecurringTimeSpan {        
        exceptionDates: object;
        isOccurrence: boolean;
        isRecurring: boolean;
        occurrenceIndex: number;
        recurrence: RecurrenceModel;
        recurrenceModel: string;
        recurrenceRule: string;
        supportsRecurring: boolean;        
        constructor(config?: Partial<RecurringTimeSpanConfig>);
        getOccurrencesForDateRange(startDate: Date, endDate?: Date): TimeSpan[];
        hasException(date: Date): boolean;
        remove(): void;
        setRecurrence(recurrence: object|string|RecurrenceModel, interval?: number, recurrenceEnd?: number|Date): void;
    }

    type ResourceModelMixinConfig = {        
        barMargin: number;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        id: string|number;
        image: string;
        imageUrl: string;
        name: string;
        resourceMargin: number;
        rowHeight: number;
    }

    export class ResourceModelMixin {        
        assignments: SchedulerAssignmentModel[];
        barMargin: number;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        events: SchedulerEventModel[];
        id: string|number;
        image: string;
        imageUrl: string;
        isPersistable: boolean;
        name: string;
        resourceMargin: number;
        rowHeight: number;        
        constructor(config?: Partial<ResourceModelMixinConfig>);
        getEvents(): SchedulerEventModel[];
        setAsync(field: string|object, value: any, silent?: boolean): void;
        unassignAll(): void;
    }

    // Singleton
    export class PresetManager extends PresetStore {        
        static deletePreset(id: string): void;
        static normalizePreset(presetOrId: string|object): ViewPreset;
        static registerPreset(id: string, config: object): ViewPreset;
    }

    type PresetStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        data: object[];
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fields: object[];
        filters: object|object[];
        groupers: object[];
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        transformFlatData: boolean;
        tree: boolean;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        zoomOrder: number;
    }

    export class PresetStore extends Store {        
        constructor(config?: Partial<PresetStoreConfig>);
    }

    type ViewPresetConfig = {        
        columnLinesFor: number;
        defaultSpan: number;
        displayDateFormat: string;
        headers: object[];
        mainHeaderLevel: number;
        name: string;
        parentId: string|number;
        parentIndex: number;
        rowHeight: number;
        shiftIncrement: number;
        shiftUnit: string;
        tickHeight: number;
        tickWidth: number;
        timeResolution: object;
    }

    export class ViewPreset extends Model {        
        columnLinesFor: number;
        defaultSpan: number;
        displayDateFormat: string;
        headers: object[];
        mainHeaderLevel: number;
        name: string;
        rowHeight: number;
        shiftIncrement: number;
        shiftUnit: string;
        tickHeight: number;
        tickWidth: number;
        timeResolution: object;        
        constructor(config?: Partial<ViewPresetConfig>);
    }

    type ViewPresetHeaderRowConfig = {        
        align: string;
        cellGenerator: Function;
        dateFormat: string;
        headerCellCls: string;
        increment: number;
        renderer: Function;
        thisObj: object;
        unit: string;
    }

    export class ViewPresetHeaderRow {        
        constructor(config?: Partial<ViewPresetHeaderRowConfig>);
    }

    type ScheduleTableExporterConfig = {        
        columns: string[]|object[];
        defaultColumnWidth: number;
        eventColumns: string[]|object[];
        exportDateAsInstance: boolean;
        includeUnassigned: boolean;
        indent: boolean;
        indentationSymbol: string;
        localeClass: Base;
        localizableProperties: string[];
        showGroupHeader: boolean;
        target: Grid;
    }

    export class ScheduleTableExporter extends TableExporter implements Localizable {        
        localeManager: LocaleManager;        
        constructor(config?: Partial<ScheduleTableExporterConfig>);
        static optionalL(text: string, templateData?: object): string;
        L(text: string, templateData?: object): string;
        updateLocalization(): void;
    }

    type ResourceHeaderConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        columnWidth: number;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        fillWidth: boolean;
        fitWidth: boolean;
        flex: number|string;
        floating: boolean;
        headerRenderer: Function;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ResourceHeader extends Widget {        
        fillWidth: boolean;
        fitWidth: boolean;        
        constructor(config?: Partial<ResourceHeaderConfig>);
        refresh(): void;
    }

    type SchedulerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class Scheduler extends SchedulerBase {        
        constructor(config?: Partial<SchedulerConfig>);
    }

    type SchedulerBaseConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class SchedulerBase extends TimelineBase implements EventNavigation, EventSelection, SchedulerDom, SchedulerDomEvents, SchedulerEventRendering, SchedulerRegions, SchedulerScroll, SchedulerState, SchedulerStores, TimelineDateMapper, TimelineDomEvents, TimelineEventRendering, TimelineScroll, TimelineViewPresets, TimelineZoomable, CrudManagerView, ProjectConsumer {        
        static eventColors: string;
        static eventStyles: string;
        assignmentStore: SchedulerAssignmentStore;
        assignments: SchedulerAssignmentModel[]|object[];
        barMargin: number;
        crudManager: CrudManager;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore;
        displayDateFormat: string;
        eventLayout: string;
        eventStore: SchedulerEventStore;
        events: SchedulerEventModel[]|object[];
        fillTicks: string;
        isEngineReady: boolean;
        maxZoomLevel: number;
        milestoneAlign: string;
        minZoomLevel: number;
        presets: PresetStore|object[];
        project: SchedulerProjectModel;
        resourceColumnWidth: number;
        resourceColumns: ResourceHeader;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resources: SchedulerResourceModel[]|object[];
        scrollLeft: number;
        scrollTop: number;
        selectedAssignments: SchedulerAssignmentModel[];
        selectedEvents: SchedulerEventModel[];
        snap: boolean;
        state: object;
        tickSize: number;
        timeRangeStore: Store;
        timeResolution: object|number;
        useInitialAnimation: boolean|string;
        viewPreset: ViewPreset|string;
        viewportCenterDate: Date;
        zoomLevel: number;        
        constructor(config?: Partial<SchedulerBaseConfig>);
        applyStartEndParameters(): void;
        clearEventSelection(): void;
        deselect(eventOrAssignment: SchedulerEventModel|SchedulerAssignmentModel): void;
        deselectAssignment(assignment: SchedulerAssignmentModel): void;
        deselectAssignments(assignments: SchedulerAssignmentModel[]): void;
        deselectEvent(event: SchedulerEventModel): void;
        deselectEvents(events: SchedulerEventModel[]): void;
        editEvent(eventRecord: SchedulerEventModel, resourceRecord?: SchedulerResourceModel, element?: HTMLElement): void;
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getDateFromDomEvent(e: Event, roundingMethod?: string, allowOutOfRange?: boolean): Date;
        getDateFromXY(xy: any[], roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getElementFromAssignmentRecord(assignmentRecord: SchedulerAssignmentModel): HTMLElement;
        getElementFromEventRecord(eventRecord: SchedulerEventModel, resourceRecord: SchedulerResourceModel): HTMLElement;
        getElementsFromEventRecord(eventRecord: SchedulerEventModel, resourceRecord?: SchedulerResourceModel): HTMLElement[];
        getMilestoneLabelWidth(eventRecord: SchedulerEventModel): number;
        getResourceEventBox(eventRecord: SchedulerEventModel, resourceRecord: SchedulerResourceModel, includeOutside?: boolean): Rectangle;
        getResourceRegion(resourceRecord: SchedulerResourceModel, startDate: Date, endDate: Date): Rectangle;
        getScheduleRegion(resourceRecord: SchedulerResourceModel, eventRecord: SchedulerEventModel): Rectangle;
        getStartEndDatesFromRectangle(rect: Rectangle, roundingMethod: string, duration: number): object;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
        isAssignmentSelected(assignment: SchedulerAssignmentModel): void;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: SchedulerEventModel|null, resource: SchedulerResourceModel): boolean;
        isEventSelected(event: SchedulerEventModel): void;
        onEventCreated(eventRecord: SchedulerEventModel): void;
        onEventDataGenerated(eventData: object): void;
        repaintEventsForResource(resourceRecord: SchedulerResourceModel): void;
        resolveAssignmentRecord(element: HTMLElement): SchedulerAssignmentModel;
        resolveDependencyRecord(element: HTMLElement): SchedulerDependencyModel;
        resolveEventRecord(element: HTMLElement): SchedulerEventModel;
        resolveResourceRecord(elementOrEvent: HTMLElement|Event, xy?: number[]): SchedulerResourceModel;
        restartInitialAnimation(initialAnimation: boolean|string): void;
        resumeRefresh(trigger: boolean): Promise<any>;
        scrollAssignmentIntoView(assignmentRecord: SchedulerAssignmentModel, index: number, options?: object): Promise<any>;
        scrollEventIntoView(eventRecord: SchedulerEventModel, options?: object): Promise<any>;
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollResourceEventIntoView(resourceRecord: SchedulerResourceModel, eventRecord: SchedulerEventModel, index: number, options?: object): Promise<any>;
        scrollResourceIntoView(resourceRecord: SchedulerResourceModel, options?: object): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
        select(eventOrAssignment: SchedulerEventModel|SchedulerAssignmentModel, preserveSelection?: boolean): void;
        selectAssignment(assignment: SchedulerAssignmentModel, preserveSelection?: boolean): void;
        selectAssignments(assignments: SchedulerAssignmentModel[]): void;
        selectEvent(event: SchedulerEventModel, preserveSelection?: boolean): void;
        selectEvents(events: SchedulerEventModel[]): void;
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
        suspendRefresh(): void;
        updateProject(project: SchedulerProjectModel): void;
        whenProjectReady(callback: Function): void;
        zoomIn(levels?: number): number;
        zoomInFull(): number;
        zoomOut(levels?: number): number;
        zoomOutFull(): number;
        zoomTo(config: object|string|number): void;
        zoomToFit(options?: object): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToSpan(config: object): number;
    }

    type TimelineBaseConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaults: object;
        destroyStore: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        eventColor: string;
        eventStyle: string;
        features: any;
        fillLastColumn: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        plugins: Function[];
        positioned: boolean;
        presets: object[];
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        resizeToFitIncludesHeader: boolean;
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export abstract class TimelineBase extends Grid implements TimelineDateMapper, TimelineDomEvents, TimelineEventRendering, TimelineScroll, TimelineViewPresets, TimelineZoomable, RecurringEvents {        
        static eventColors: string;
        static eventStyles: string;
        barMargin: number;
        displayDateFormat: string;
        endDate: Date;
        hasVisibleEvents: boolean;
        maxZoomLevel: number;
        minZoomLevel: number;
        presets: PresetStore|object[];
        scrollLeft: number;
        scrollTop: number;
        snap: boolean;
        startDate: Date;
        tickSize: number;
        timeAxis: TimeAxis;
        timeAxisSubGridElement: SubGrid;
        timeAxisViewModel: TimeAxisViewModel;
        timeResolution: object|number;
        viewPreset: ViewPreset|string;
        viewportCenterDate: Date;
        visibleDateRange: object;
        workingTime: object;
        zoomLevel: number;        
        constructor(config?: Partial<TimelineBaseConfig>);
        addPartner(otherTimeline: TimelineBase): void;
        formatDuration(The: number, nbrDecimals?: number): number;
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getDateFromDomEvent(e: Event, roundingMethod?: string, allowOutOfRange?: boolean): Date;
        getDateFromXY(xy: any[], roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getForegroundDomConfigs(configs: any[]): void;
        getHeaderDomConfigs(configs: any[]): void;
        getOccurrencesFor(recurringEvent: TimeSpan): TimeSpan[];
        getStartEndDatesFromRectangle(rect: Rectangle, roundingMethod: string, duration: number): object;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
        getVisibleDateRange(): object;
        preserveViewCenter(fn: Function, thisObj: object, args: any): void;
        refreshWithTransition(): void;
        removePartner(otherTimeline: TimelineBase): void;
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
        setEndDate(date: Date, keepDuration?: boolean): void;
        setStartDate(date: Date, keepDuration?: boolean): void;
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
        zoomIn(levels?: number): number;
        zoomInFull(): number;
        zoomOut(levels?: number): number;
        zoomOutFull(): number;
        zoomTo(config: object|string|number): void;
        zoomToFit(options?: object): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToSpan(config: object): number;
    }

    type SchedulerExportDialogConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        client: Grid;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePNGMultipageOption: boolean;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SchedulerExportDialog extends ExportDialog {        
        constructor(config?: Partial<SchedulerExportDialogConfig>);
    }

    type EventNavigationConfig = {        
        enableDeleteKey: boolean;
    }

    export class EventNavigation {        
        constructor(config?: Partial<EventNavigationConfig>);
    }

    type EventSelectionConfig = {        
        eventSelectionDisabled: boolean;
        maintainSelectionOnDatasetChange: boolean;
        multiEventSelect: boolean;
        triggerSelectionChangeOnRemove: boolean;
    }

    export class EventSelection {        
        selectedAssignments: SchedulerAssignmentModel[];
        selectedEvents: SchedulerEventModel[];        
        constructor(config?: Partial<EventSelectionConfig>);
        clearEventSelection(): void;
        deselect(eventOrAssignment: SchedulerEventModel|SchedulerAssignmentModel): void;
        deselectAssignment(assignment: SchedulerAssignmentModel): void;
        deselectAssignments(assignments: SchedulerAssignmentModel[]): void;
        deselectEvent(event: SchedulerEventModel): void;
        deselectEvents(events: SchedulerEventModel[]): void;
        isAssignmentSelected(assignment: SchedulerAssignmentModel): void;
        isEventSelected(event: SchedulerEventModel): void;
        select(eventOrAssignment: SchedulerEventModel|SchedulerAssignmentModel, preserveSelection?: boolean): void;
        selectAssignment(assignment: SchedulerAssignmentModel, preserveSelection?: boolean): void;
        selectAssignments(assignments: SchedulerAssignmentModel[]): void;
        selectEvent(event: SchedulerEventModel, preserveSelection?: boolean): void;
        selectEvents(events: SchedulerEventModel[]): void;
    }

    type RecurringEventsConfig = {        
        enableRecurringEvents: boolean;
    }

    export class RecurringEvents {        
        constructor(config?: Partial<RecurringEventsConfig>);
        getOccurrencesFor(recurringEvent: TimeSpan): TimeSpan[];
    }

    export class SchedulerDom {        
        getElementFromAssignmentRecord(assignmentRecord: SchedulerAssignmentModel): HTMLElement;
        getElementFromEventRecord(eventRecord: SchedulerEventModel, resourceRecord: SchedulerResourceModel): HTMLElement;
        getElementsFromEventRecord(eventRecord: SchedulerEventModel, resourceRecord?: SchedulerResourceModel): HTMLElement[];
        resolveAssignmentRecord(element: HTMLElement): SchedulerAssignmentModel;
        resolveEventRecord(element: HTMLElement): SchedulerEventModel;
        resolveResourceRecord(elementOrEvent: HTMLElement|Event, xy?: number[]): SchedulerResourceModel;
    }

    export class SchedulerDomEvents {
    }

    type SchedulerEventRenderingConfig = {        
        barMargin: number;
        defaultResourceImageName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        fillTicks: boolean;
        horizontalEventSorterFn: Function;
        milestoneAlign: string;
        milestoneCharWidth: number;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        useInitialAnimation: boolean|string;
    }

    export class SchedulerEventRendering {        
        eventLayout: string;
        fillTicks: string;
        milestoneAlign: string;
        resourceColumnWidth: number;
        resourceColumns: ResourceHeader;
        resourceMargin: number;
        useInitialAnimation: boolean|string;        
        constructor(config?: Partial<SchedulerEventRenderingConfig>);
        getMilestoneLabelWidth(eventRecord: SchedulerEventModel): number;
        onEventDataGenerated(eventData: object): void;
        repaintEventsForResource(resourceRecord: SchedulerResourceModel): void;
        restartInitialAnimation(initialAnimation: boolean|string): void;
    }

    export class SchedulerRegions {        
        getResourceEventBox(eventRecord: SchedulerEventModel, resourceRecord: SchedulerResourceModel, includeOutside?: boolean): Rectangle;
        getResourceRegion(resourceRecord: SchedulerResourceModel, startDate: Date, endDate: Date): Rectangle;
        getScheduleRegion(resourceRecord: SchedulerResourceModel, eventRecord: SchedulerEventModel): Rectangle;
    }

    export class SchedulerScroll {        
        scrollAssignmentIntoView(assignmentRecord: SchedulerAssignmentModel, index: number, options?: object): Promise<any>;
        scrollEventIntoView(eventRecord: SchedulerEventModel, options?: object): Promise<any>;
        scrollResourceEventIntoView(resourceRecord: SchedulerResourceModel, eventRecord: SchedulerEventModel, index: number, options?: object): Promise<any>;
        scrollResourceIntoView(resourceRecord: SchedulerResourceModel, options?: object): Promise<any>;
    }

    export class SchedulerState {        
        state: object;
    }

    type SchedulerStoresConfig = {        
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStores: boolean;
        endParamName: string;
        eventStore: SchedulerEventStore|object;
        events: SchedulerEventModel[]|object[];
        passStartEndParameters: boolean;
        project: SchedulerProjectModel|object;
        removeUnassignedEvent: boolean;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        startParamName: string;
        timeRanges: TimeSpan[]|object[];
    }

    export class SchedulerStores extends ProjectConsumer {        
        assignmentStore: SchedulerAssignmentStore;
        assignments: SchedulerAssignmentModel[]|object[];
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore;
        eventStore: SchedulerEventStore;
        events: SchedulerEventModel[]|object[];
        resourceStore: SchedulerResourceStore;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resources: SchedulerResourceModel[]|object[];
        timeRangeStore: Store;        
        constructor(config?: Partial<SchedulerStoresConfig>);
        applyStartEndParameters(): void;
    }

    export class TimelineDateMapper {        
        displayDateFormat: string;
        snap: boolean;
        timeResolution: object|number;
        viewportCenterDate: Date;        
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getDateFromDomEvent(e: Event, roundingMethod?: string, allowOutOfRange?: boolean): Date;
        getDateFromXY(xy: any[], roundingMethod?: string, local?: boolean, allowOutOfRange?: boolean): Date;
        getStartEndDatesFromRectangle(rect: Rectangle, roundingMethod: string, duration: number): object;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
    }

    export class TimelineDomEvents {
    }

    type TimelineEventRenderingConfig = {        
        barMargin: number;
        eventColor: string;
        eventStyle: string;
        managedEventSizing: boolean;
        tickSize: number;
    }

    export class TimelineEventRendering {        
        static eventColors: string;
        static eventStyles: string;
        barMargin: number;
        tickSize: number;        
        constructor(config?: Partial<TimelineEventRenderingConfig>);
    }

    export class TimelineScroll {        
        scrollLeft: number;
        scrollTop: number;        
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
    }

    type TimelineViewPresetsConfig = {        
        displayDateFormat: string;
        presets: object[];
        viewPreset: string|object;
    }

    export class TimelineViewPresets {        
        presets: PresetStore|object[];
        viewPreset: ViewPreset|string;        
        constructor(config?: Partial<TimelineViewPresetsConfig>);
    }

    type TimelineZoomableConfig = {        
        maxZoomLevel: number;
        minZoomLevel: number;
        visibleZoomFactor: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class TimelineZoomable {        
        maxZoomLevel: number;
        minZoomLevel: number;
        zoomLevel: number;        
        constructor(config?: Partial<TimelineZoomableConfig>);
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
        zoomIn(levels?: number): number;
        zoomInFull(): number;
        zoomOut(levels?: number): number;
        zoomOutFull(): number;
        zoomTo(config: object|string|number): void;
        zoomToFit(options?: object): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToSpan(config: object): number;
    }

    type TimeAxisViewModelConfig = {        
        listeners: object;
    }

    export class TimeAxisViewModel extends Events {        
        constructor(config?: Partial<TimeAxisViewModelConfig>);
        getDateFromPosition(position: number, roundingMethod?: string, allowOutOfRange?: boolean): Date;
        getDistanceBetweenDates(start: Date, end: Date): number;
        getDistanceForDuration(durationMS: number): number;
        getPositionFromDate(date: Date): number;
    }

    type RecurrenceConfirmationPopupConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceConfirmationPopup extends Popup {        
        cancelButton: Button;
        changeMultipleButton: Button;
        changeSingleButton: Button;        
        constructor(config?: Partial<RecurrenceConfirmationPopupConfig>);
        confirm(config: object): void;
        onCancelButtonClick(): void;
        onChangeMultipleButtonClick(): void;
        onChangeSingleButtonClick(): void;
        processMultipleRecords(): void;
        processSingleRecord(): void;
    }

    type RecurrenceEditorConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceEditor extends Popup {        
        constructor(config?: Partial<RecurrenceEditorConfig>);
        syncEventRecord(): void;
    }

    type RecurrenceLegendButtonConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        badge: string;
        centered: boolean;
        cls: string|object;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        href: string;
        html: string;
        htmlCls: string|object;
        icon: string;
        iconAlign: string;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        menu: object|object[]|Widget;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        owner: Widget;
        positioned: boolean;
        pressed: boolean;
        pressedIcon: string;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        target: string;
        text: string;
        textAlign: string;
        title: string;
        toggleGroup: string;
        toggleable: boolean;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceLegendButton extends Button {        
        recurrence: RecurrenceModel;        
        constructor(config?: Partial<RecurrenceLegendButtonConfig>);
    }

    type RecurrenceComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceCombo extends RecurrenceFrequencyCombo {        
        constructor(config?: Partial<RecurrenceComboConfig>);
    }

    type RecurrenceDaysButtonGroupConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object[]|Button[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        toggleGroup: boolean;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceDaysButtonGroup extends ButtonGroup {        
        constructor(config?: Partial<RecurrenceDaysButtonGroupConfig>);
    }

    type RecurrenceDaysComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceDaysCombo extends Combo {        
        constructor(config?: Partial<RecurrenceDaysComboConfig>);
    }

    type RecurrenceFrequencyComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceFrequencyCombo extends Combo {        
        constructor(config?: Partial<RecurrenceFrequencyComboConfig>);
    }

    type RecurrencePositionsComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrencePositionsCombo extends Combo {        
        constructor(config?: Partial<RecurrencePositionsComboConfig>);
    }

    type RecurrenceStopConditionComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class RecurrenceStopConditionCombo extends Combo {        
        constructor(config?: Partial<RecurrenceStopConditionComboConfig>);
    }

    type ResourceComboConfig = {        
        activateOnMouseover: boolean;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemTpl: Function;
        items: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        selected: Collection|object;
        showAnimation: boolean|object;
        store: object|Store;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ResourceCombo extends List {        
        constructor(config?: Partial<ResourceComboConfig>);
    }

    type ResourceFilterConfig = {        
        activateOnMouseover: boolean;
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        eventStore: SchedulerEventStore;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemTpl: Function;
        items: object[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        selected: Collection|object;
        showAnimation: boolean|object;
        store: object|Store;
        style: string;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ResourceFilter extends List {        
        constructor(config?: Partial<ResourceFilterConfig>);
    }

    type UndoRedoConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        color: string;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scheduler: Widget|string;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showZeroActionBadge: boolean;
        style: string;
        tag: string;
        text: boolean;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class UndoRedo extends Container {        
        constructor(config?: Partial<UndoRedoConfig>);
    }

    type DurationColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        decimalPrecision: number|boolean;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        format: string|object|NumberFormat;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        largeStep: number;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        max: number;
        min: number;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        step: number;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        unit: string;
        width: number|string;
    }

    export class DurationColumn extends NumberColumn {        
        step: number;        
        constructor(config?: Partial<DurationColumnConfig>);
    }

    type ResourceCalendarColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class ResourceCalendarColumn extends Column implements AttachToProjectMixin {        
        constructor(config?: Partial<ResourceCalendarColumnConfig>);
        attachToAssignmentStore(store: SchedulerAssignmentStore): void;
        attachToCalendarManagerStore(store: Store): void;
        attachToDependencyStore(store: SchedulerDependencyStore): void;
        attachToEventStore(store: SchedulerEventStore): void;
        attachToProject(project: SchedulerProjectModel): void;
        attachToResourceStore(store: SchedulerResourceStore): void;
    }

    type ScaleColumnConfig = {        
        align: string;
        autoSyncHtml: boolean;
        autoWidth: boolean|number|number[];
        cellCls: string;
        cellMenuItems: object;
        cls: string;
        draggable: boolean;
        editTargetSelector: string;
        editor: string|object|boolean;
        enableCellContextMenu: boolean;
        enableHeaderContextMenu: boolean;
        exportable: boolean;
        exportedType: string;
        field: string;
        filterType: string;
        filterable: boolean|Function|object;
        finalizeCellEdit: Function;
        fitMode: string;
        flex: number;
        groupRenderer: Function;
        groupable: boolean;
        headerMenuItems: object;
        headerRenderer: Function;
        hidden: boolean;
        hideable: boolean;
        htmlEncode: boolean;
        icon: string;
        instantUpdate: boolean;
        invalidAction: string;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        locked: boolean;
        minWidth: number|string;
        parentId: string|number;
        parentIndex: number;
        region: string;
        renderer: Function;
        resizable: boolean;
        responsiveLevels: object;
        revertOnEscape: boolean;
        searchable: boolean;
        showColumnPicker: boolean;
        sortable: boolean|Function|object;
        sum: string;
        summaries: object[];
        summaryRenderer: Function;
        tags: string[];
        text: string;
        tooltipRenderer: Function;
        touchConfig: object;
        tree: boolean;
        width: number|string;
    }

    export class ScaleColumn extends Column {        
        constructor(config?: Partial<ScaleColumnConfig>);
    }

    type AssignmentStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        taskStore: EventStore|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class AssignmentStore extends AjaxStore implements PartOfProject, AssignmentStoreMixin {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        data: object[];
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<AssignmentStoreConfig>);
        add(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        addAsync(records: SchedulerAssignmentModel|SchedulerAssignmentModel[]|object|object[], silent?: boolean): SchedulerAssignmentModel[];
        assignEventToResource(event: TimeSpan, resources: SchedulerResourceModel|SchedulerResourceModel[], assignmentSetupFn?: Function, removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        getAssignmentForEventAndResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel;
        getAssignmentsForEvent(event: TimeSpan): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel): SchedulerAssignmentModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): TimeSpan[];
        getResourcesForEvent(event: SchedulerEventModel): SchedulerResourceModel[];
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        loadDataAsync(data: object[]): void;
        mapAssignmentsForEvent(event: SchedulerEventModel, fn?: Function, filterFn?: Function): SchedulerEventModel[]|any[];
        mapAssignmentsForResource(resource: SchedulerResourceModel|number|string, fn?: Function, filterFn?: Function): SchedulerResourceModel[]|any[];
        removeAssignmentsForEvent(event: TimeSpan): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|any): void;
        unassignEventFromResource(event: TimeSpan|string|number, resources?: SchedulerResourceModel|string|number): SchedulerAssignmentModel|SchedulerAssignmentModel[];
    }

    type CalendarManagerStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        taskStore: EventStore|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class CalendarManagerStore extends AjaxStore implements PartOfProject {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<CalendarManagerStoreConfig>);
    }

    type DependencyStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        taskStore: EventStore|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class DependencyStore extends AjaxStore implements PartOfProject, DependencyStoreMixin {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        data: object[];
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<DependencyStoreConfig>);
        add(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        addAsync(records: SchedulerDependencyModel|SchedulerDependencyModel[]|object|object[], silent?: boolean): SchedulerDependencyModel[];
        getDependencyForSourceAndTargetEvents(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getEventDependencies(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventPredecessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventSuccessors(event: SchedulerEventModel): SchedulerDependencyModel[];
        getEventsLinkingDependency(sourceEvent: SchedulerEventModel|string, targetEvent: SchedulerEventModel|string): SchedulerDependencyModel;
        getHighlightedDependencies(cls: string): DependencyBaseModel[];
        isValidDependency(dependencyOrFromId: SchedulerDependencyModel|number|string, toId?: number|string, type?: number): boolean;
        isValidDependencyToCreate(fromId: number|string, toId: number|string, type: number): boolean;
        loadDataAsync(data: object[]): void;
    }

    type EventStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        removeUnassignedEvent: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        taskStore: EventStore|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class EventStore extends AjaxStore implements PartOfProject, SharedEventStoreMixin, EventStoreMixin, RecurringEventsMixin {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        data: object[];
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        modelClass: { new(data: object): Model };
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<EventStoreConfig>);
        add(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        addAsync(records: SchedulerEventModel|SchedulerEventModel[]|object|object[], silent?: boolean): SchedulerEventModel[];
        append(record: SchedulerEventModel): void;
        assignEventToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number|SchedulerResourceModel[]|string[]|number[], removeExistingAssignments?: boolean): SchedulerAssignmentModel[];
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getAssignmentsForEvent(event: SchedulerEventModel|string|number): SchedulerAssignmentModel[];
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel[];
        getEvents(): SchedulerEventModel[]|Map<any,any>;
        getEventsByStartDate(startDate: Date): SchedulerEventModel[];
        getEventsForResource(resource: SchedulerResourceModel|string|number): SchedulerEventModel[];
        getEventsInTimeSpan(startDate: Date, endDate: Date, allowPartial?: boolean, onlyAssigned?: boolean): SchedulerEventModel[];
        getRecurringEvents(): SchedulerEventModel[];
        getRecurringTimeSpans(): TimeSpan[];
        getResourcesForEvent(event: SchedulerEventModel|string|number): SchedulerResourceModel[];
        getTotalTimeSpan(): object;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: SchedulerEventModel|null, resource: SchedulerResourceModel): boolean;
        isEventAssignedToResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        isEventPersistable(event: SchedulerEventModel): boolean;
        loadDataAsync(data: object[]): void;
        reassignEventFromResourceToResource(event: SchedulerEventModel, oldResource: SchedulerResourceModel|SchedulerResourceModel[], newResource: SchedulerResourceModel|SchedulerResourceModel[]): void;
        removeAssignmentsForEvent(event: SchedulerEventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
        unassignEventFromResource(event: SchedulerEventModel|string|number, resource: SchedulerResourceModel|string|number): void;
    }

    type ResourceStoreConfig = {        
        allowNoId: boolean;
        autoCommit: boolean;
        autoLoad: boolean;
        autoTree: boolean;
        chainedFields: string[];
        chainedFilterFn: Function;
        createUrl: string;
        data: object[];
        deleteUrl: string;
        doRelayToMaster: string[];
        dontRelayToMaster: string;
        fetchOptions: object;
        fields: object[];
        filterParamName: string;
        filters: object|object[];
        groupers: object[];
        headers: object;
        httpMethods: object;
        id: string|number;
        keepUncommittedChanges: boolean;
        listeners: object;
        masterStore: Store;
        modelClass: { new(data: object): Model };
        pageParamName: string;
        pageSize: number;
        pageSizeParamName: string;
        pageStartParamName: string;
        params: object;
        parentIdParamName: string;
        readUrl: string;
        reapplyFilterOnAdd: boolean;
        reapplyFilterOnUpdate: boolean;
        responseDataProperty: string;
        responseSuccessProperty: string;
        responseTotalProperty: string;
        restfulFilter: boolean;
        sendAsFormData: boolean;
        sortParamName: string;
        sorters: object[]|string[];
        stm: StateTrackingManager;
        storage: Collection|object;
        syncDataOnLoad: boolean|object;
        taskStore: EventStore|object;
        transformFlatData: boolean;
        tree: boolean;
        updateUrl: string;
        useLocaleSort: boolean|string|object;
        useRawData: boolean|object;
        useRestfulMethods: boolean;
        writeAllFields: boolean;
    }

    export class ResourceStore extends AjaxStore implements PartOfProject, ResourceStoreMixin {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        data: object[];
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<ResourceStoreConfig>);
        add(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        addAsync(records: SchedulerResourceModel|SchedulerResourceModel[]|object|object[], silent?: boolean): SchedulerResourceModel[];
        loadDataAsync(data: object[]): void;
    }

    type PartOfProjectConfig = {        
        taskStore: EventStore|object;
    }

    export class PartOfProject {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<PartOfProjectConfig>);
    }

    type ProjectCrudManagerConfig = {        
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        crudStores: Store[]|string[]|object[];
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        project: SchedulerProjectModel;
        resetIdsBeforeSync: boolean;
        storeIdProperty: string;
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        trackResponseType: boolean;
        transport: object;
        writeAllFields: boolean;
    }

    export class ProjectCrudManager implements SchedulerProjectCrudManager {        
        crudRevision: number;
        crudStores: object[];
        isCrudManagerLoading: boolean;
        syncApplySequence: object[];        
        constructor(config?: Partial<ProjectCrudManagerConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        cancelRequest(requestPromise: Promise<any>, reject: Function): void;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        decode(responseText: string): object;
        doDestroy(): void;
        encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type EventResizeConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showExactResizePosition: boolean;
        showTooltip: boolean;
        tip: Tooltip|object;
        validatorFn: Function;
        validatorFnThisObj: object;
    }

    export class EventResize extends SchedulerEventResize {        
        constructor(config?: Partial<EventResizeConfig>);
    }

    type PercentBarConfig = {        
        allowResize: boolean;
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        showPercentage: boolean;
    }

    export class PercentBar extends InstancePlugin {        
        constructor(config?: Partial<PercentBarConfig>);
    }

    type ResourceNonWorkingTimeConfig = {        
        disabled: boolean;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
    }

    export class ResourceNonWorkingTime extends ResourceTimeRangesBase {        
        constructor(config?: Partial<ResourceNonWorkingTimeConfig>);
    }

    type TaskEditConfig = {        
        confirmDelete: boolean;
        disabled: boolean;
        editorClass: Widget;
        editorConfig: object;
        items: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        saveAndCloseOnEnter: boolean;
        showDeleteButton: boolean;
        triggerEvent: string;
        weekStartDay: number;
    }

    export class TaskEdit extends InstancePlugin implements ProTaskEditStm, Delayable {        
        isEditing: boolean;        
        constructor(config?: Partial<TaskEditConfig>);
        editEvent(taskRecord: EventModel|Function, resourceRecord?: ResourceModel, element?: HTMLElement): Promise<any>;
    }

    export class ProTaskEditStm {
    }

    type AssignmentModelConfig = {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        parentId: string|number;
        parentIndex: number;
        resource: string|number;
        resourceId: string|number;
    }

    export class AssignmentModel extends Model implements AssignmentModelMixin {        
        drawDependencies: boolean;
        event: string|number;
        eventId: string|number;
        eventName: string;
        isPersistable: boolean;
        resource: string|number;
        resourceId: string|number;
        resourceName: string;        
        constructor(config?: Partial<AssignmentModelConfig>);
        getResource(): SchedulerResourceModel;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        toString(): string;
    }

    type CalendarIntervalModelConfig = {        
        endDate: Date;
        isWorking: boolean;
        recurrentEndDate: string;
        recurrentStartDate: string;
        startDate: Date;
    }

    export class CalendarIntervalModel {        
        endDate: Date;
        isWorking: boolean;
        recurrentEndDate: string;
        recurrentStartDate: string;
        startDate: Date;        
        constructor(config?: Partial<CalendarIntervalModelConfig>);
        getEndDateSchedule(): object;
        getStartDateSchedule(): object;
        isRecurrent(): boolean;
        isStatic(): boolean;
    }

    type CalendarModelConfig = {        
        intervals: CalendarIntervalModel[];
        name: string;
        parentId: string|number;
        parentIndex: number;
        taskStore: EventStore|object;
        unspecifiedTimeIsWorking: boolean;
    }

    export class CalendarModel extends Model implements PartOfProject {        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        intervals: CalendarIntervalModel[];
        name: string;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;
        unspecifiedTimeIsWorking: boolean;        
        constructor(config?: Partial<CalendarModelConfig>);
        addInterval(interval: CalendarIntervalModel|object): CalendarIntervalModel[];
        addIntervals(intervals: CalendarIntervalModel[]|object[]): CalendarIntervalModel[];
        skipNonWorkingTime(date: Date, isForward?: boolean): Date;
    }

    type DependencyModelConfig = {        
        bidirectional: boolean;
        calendar: CalendarModel;
        cls: string;
        from: string|number;
        fromSide: string;
        lag: number;
        lagUnit: string;
        parentId: string|number;
        parentIndex: number;
        taskStore: EventStore|object;
        to: string|number;
        toSide: string;
        type: number;
    }

    export class DependencyModel extends DependencyBaseModel implements PartOfProject {        
        assignmentStore: AssignmentStore;
        calendar: CalendarModel;
        calendarManagerStore: CalendarManagerStore;
        dependencyStore: DependencyStore;
        eventStore: EventStore;
        project: ProjectModel;
        resourceStore: ResourceStore;
        taskStore: EventStore;        
        constructor(config?: Partial<DependencyModelConfig>);
    }

    type EventModelConfig = {        
        allDay: boolean;
        calendar: CalendarModel;
        cls: DomClassList|string;
        constraintDate: Date;
        constraintType: string;
        draggable: boolean;
        duration: number;
        durationUnit: string;
        earlyEndDate: Date;
        earlyStartDate: Date;
        effort: number;
        effortUnit: string;
        endDate: string|Date;
        eventColor: string;
        eventStyle: string;
        exceptionDates: object;
        iconCls: string;
        id: string|number;
        manuallyScheduled: boolean;
        milestoneWidth: number;
        name: string;
        note: string;
        parentId: string|number;
        parentIndex: number;
        percentDone: number;
        recurrenceRule: string;
        resizable: boolean|string;
        resourceId: string|number;
        showInTimeline: boolean;
        startDate: string|Date;
        style: string;
        taskStore: EventStore|object;
    }

    export class EventModel extends TimeSpan implements RecurringTimeSpan, EventModelMixin, PercentDoneMixin, PartOfProject {        
        allDay: boolean;
        assignmentStore: AssignmentStore;
        assignments: SchedulerAssignmentModel[];
        calendar: CalendarModel;
        calendarManagerStore: CalendarManagerStore;
        constraintDate: Date;
        constraintType: string;
        dependencyStore: DependencyStore;
        draggable: boolean;
        duration: number;
        earlyEndDate: Date;
        earlyStartDate: Date;
        effort: number;
        effortUnit: string;
        endDate: string|Date;
        eventColor: string;
        eventStore: EventStore;
        eventStyle: string;
        exceptionDates: object;
        fullDuration: Duration;
        id: string|number;
        isCompleted: boolean;
        isDraggable: boolean;
        isInProgress: boolean;
        isInterDay: boolean;
        isOccurrence: boolean;
        isPersistable: boolean;
        isRecurring: boolean;
        isResizable: boolean|string;
        isStarted: boolean;
        manuallyScheduled: boolean;
        milestoneWidth: number;
        note: string;
        occurrenceIndex: number;
        percentDone: number;
        predecessors: DependencyBaseModel[];
        project: ProjectModel;
        recurrence: RecurrenceModel;
        recurrenceModel: string;
        recurrenceRule: string;
        resizable: boolean|string;
        resource: SchedulerResourceModel;
        resourceId: string|number;
        resourceStore: ResourceStore;
        resources: SchedulerResourceModel[];
        showInTimeline: boolean;
        startDate: string|Date;
        successors: DependencyBaseModel[];
        supportsRecurring: boolean;
        taskStore: EventStore;        
        constructor(config?: Partial<EventModelConfig>);
        assign(resource: SchedulerResourceModel|string|number, removeExistingAssignments?: boolean): void;
        getAssignmentFor(resource: ResourceModel): AssignmentModel|null;
        getCalendar(): CalendarModel;
        getOccurrencesForDateRange(startDate: Date, endDate?: Date): TimeSpan[];
        getResource(resourceId?: string): SchedulerResourceModel;
        hasException(date: Date): boolean;
        isAssignedTo(resource: SchedulerResourceModel|string|number): boolean;
        isEditable(fieldName: string): boolean;
        reassign(oldResourceId: SchedulerResourceModel|string|number, newResourceId: SchedulerResourceModel|string|number): void;
        remove(): void;
        setAsync(field: string|object, value: any, silent?: boolean): void;
        setCalendar(calendar: CalendarModel): Promise<any>;
        setConstraint(constraintType: string, constraintDate?: Date): Promise<any>;
        setDuration(duration: number, unit?: string): Promise<any>;
        setEffort(effort: number, unit?: string): Promise<any>;
        setEndDate(date: Date, keepDuration?: boolean): Promise<any>;
        setRecurrence(recurrence: object|string|RecurrenceModel, interval?: number, recurrenceEnd?: number|Date): void;
        setStartDate(date: Date, keepDuration?: boolean): Promise<any>;
        shift(unit: string, amount: number): Promise<any>;
        unassign(resource?: SchedulerResourceModel|string|number): void;
    }

    type ProjectModelConfig = {        
        assignmentModelClass: AssignmentModel;
        assignmentStore: SchedulerAssignmentStore|object;
        assignmentStoreClass: AssignmentStore|object;
        assignmentsData: SchedulerAssignmentModel[];
        autoLoad: boolean;
        autoSync: boolean;
        autoSyncTimeout: number;
        calendar: CalendarModel;
        crudStores: Store[]|string[]|object[];
        daysPerMonth: number;
        daysPerWeek: number;
        dependenciesCalendar: string;
        dependenciesData: SchedulerDependencyModel[];
        dependencyModelClass: DependencyModel;
        dependencyStore: SchedulerDependencyStore|object;
        dependencyStoreClass: DependencyStore|object;
        direction: string;
        enableProgressNotifications: boolean;
        eventModelClass: EventModel;
        eventStore: SchedulerEventStore|object;
        eventStoreClass: EventStore|object;
        eventsData: SchedulerEventModel[];
        hoursPerDay: number;
        listeners: object;
        phantomIdField: string;
        phantomParentIdField: string;
        project: SchedulerProjectModel;
        resetIdsBeforeSync: boolean;
        resourceModelClass: ResourceModel;
        resourceStore: SchedulerResourceStore|object;
        resourceStoreClass: ResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore|object;
        resourceTimeRangeStoreClass: ResourceTimeRangeStore|object;
        resourceTimeRangesData: ResourceTimeRangeModel[];
        resourcesData: SchedulerResourceModel[];
        silenceInitialCommit: boolean;
        stm: object|StateTrackingManager;
        storeIdProperty: string;
        supportShortSyncResponse: boolean;
        syncApplySequence: string[];
        taskStore: EventStore|object;
        timeRangeStore: Store|object;
        timeRangeStoreClass: Store|object;
        timeRangesData: TimeSpan[];
        trackResponseType: boolean;
        transport: object;
        writeAllFields: boolean;
    }

    export class ProjectModel extends ProjectModelMixin implements PartOfProject, ProjectCrudManager, Events {        
        assignmentStore: AssignmentStore;
        calendar: CalendarModel;
        calendarManagerStore: CalendarManagerStore;
        crudRevision: number;
        crudStores: object[];
        daysPerMonth: number;
        daysPerWeek: number;
        dependenciesCalendar: string;
        dependencyStore: DependencyStore;
        direction: string;
        enableProgressNotifications: boolean;
        eventStore: EventStore;
        hoursPerDay: number;
        isCrudManagerLoading: boolean;
        project: ProjectModel;
        resourceStore: ResourceStore;
        syncApplySequence: object[];
        taskStore: EventStore;        
        constructor(config?: Partial<ProjectModelConfig>);
        addCrudStore(store: Store|string|object|Store[]|string[]|object[], position?: number, fromStore?: string|Store|object): void;
        addListener(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        addStoreToApplySequence(store: Store|object|Store[]|object[], position?: number, fromStore?: string|Store|object): void;
        cancelRequest(requestPromise: Promise<any>, reject: Function): void;
        commitAsync(): Promise<any>;
        commitCrudStores(): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        decode(responseText: string): object;
        doDestroy(): void;
        encode(request: object): string;
        getCrudStore(storeId: string): Store;
        getStoreDescriptor(storeId: string|Store): object;
        hasListener(eventName: string): boolean;
        load(options?: object): Promise<any>;
        loadCrudManagerData(response: object, options?: object): void;
        on(config: object|string, thisObj?: object|Function, oldThisObj?: object): Function;
        propagate(): Promise<any>;
        rejectCrudStores(): void;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        removeCrudStore(store: object|string|Store): void;
        removeListener(config: object, thisObj: object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        resumeAutoSync(): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        suspendAutoSync(): void;
        suspendEvents(queue?: boolean): void;
        sync(): Promise<any>;
        trigger(eventName: string, param?: object): boolean;
        un(config: object, thisObj?: object): void;
    }

    type ResourceModelConfig = {        
        barMargin: number;
        calendar: CalendarModel;
        cls: string;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        expanded: boolean;
        href: string;
        iconCls: string;
        id: string|number;
        image: string;
        imageUrl: string;
        name: string;
        parentId: string|number;
        parentIndex: number;
        resourceMargin: number;
        rowHeight: number;
        target: string;
    }

    export class ResourceModel extends GridRowModel implements ResourceModelMixin {        
        assignments: SchedulerAssignmentModel[];
        barMargin: number;
        calendar: CalendarModel;
        eventColor: string;
        eventLayout: string;
        eventStyle: string;
        events: SchedulerEventModel[];
        id: string|number;
        image: string;
        imageUrl: string;
        isPersistable: boolean;
        name: string;
        resourceMargin: number;
        rowHeight: number;        
        constructor(config?: Partial<ResourceModelConfig>);
        getCalendar(): CalendarModel;
        getEvents(): SchedulerEventModel[];
        setAsync(field: string|object, value: any, silent?: boolean): void;
        setCalendar(calendar: CalendarModel): Promise<any>;
        unassignAll(): void;
    }

    type PercentDoneMixinConfig = {        
        percentDone: number;
    }

    export class PercentDoneMixin {        
        isCompleted: boolean;
        isInProgress: boolean;
        isStarted: boolean;
        percentDone: number;        
        constructor(config?: Partial<PercentDoneMixinConfig>);
    }

    type ResourceHistogramConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        barTextEffortUnit: string;
        barTipEffortUnit: string;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        effortUnit: string;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getBarText: Function;
        getBarTip: Function;
        getDateConstraints: Function;
        getRectClass: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showBarText: boolean;
        showBarTip: boolean;
        showDirty: boolean;
        showMaxEffort: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class ResourceHistogram extends SchedulerBase {        
        constructor(config?: Partial<ResourceHistogramConfig>);
    }

    type SchedulerProConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class SchedulerPro extends SchedulerProBase {        
        constructor(config?: Partial<SchedulerProConfig>);
    }

    type SchedulerProBaseConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: SchedulerProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class SchedulerProBase extends SchedulerBase {        
        constructor(config?: Partial<SchedulerProBaseConfig>);
    }

    type CalendarFieldConfig = {        
        store: CalendarManagerStore;
    }

    export class CalendarField {        
        constructor(config?: Partial<CalendarFieldConfig>);
    }

    type ConstraintTypePickerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ConstraintTypePicker extends Combo {        
        constructor(config?: Partial<ConstraintTypePickerConfig>);
    }

    type DependencyTypePickerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class DependencyTypePicker extends Combo {        
        constructor(config?: Partial<DependencyTypePickerConfig>);
    }

    type EffortFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowNegative: boolean;
        allowedUnits: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoComplete: string;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        decimalPrecision: number;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        magnitude: number;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: number;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        unit: string;
        useAbbreviation: boolean;
        value: object|string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class EffortField extends DurationField {        
        constructor(config?: Partial<EffortFieldConfig>);
    }

    type EndDateFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        eventRecord: EventModel;
        flex: number|string;
        floating: boolean;
        format: string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keepTime: boolean|Date|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string|Date;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string|Date;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerFormat: string;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        project: ProjectModel;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: string|number|object;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string|Date;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class EndDateField extends DateField {        
        constructor(config?: Partial<EndDateFieldConfig>);
    }

    type GanttTaskEditorConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        calculateMask: string|null;
        calculateMaskDelay: number|null;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        durationDisplayPrecision: number;
        extraItems: object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tabsConfig: object;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class GanttTaskEditor extends TaskEditorBase {        
        constructor(config?: Partial<GanttTaskEditorConfig>);
    }

    type ModelComboConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ModelCombo extends Combo {        
        constructor(config?: Partial<ModelComboConfig>);
    }

    type SchedulerTaskEditorConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        calculateMask: string|null;
        calculateMaskDelay: number|null;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        durationDisplayPrecision: number;
        extraItems: object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tabsConfig: object;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SchedulerTaskEditor extends TaskEditorBase {        
        constructor(config?: Partial<SchedulerTaskEditorConfig>);
    }

    type SchedulingModePickerConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        caseSensitive: boolean;
        centered: boolean;
        chipView: object;
        clearTextOnPickerHide: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        displayField: string;
        displayValueRenderer: Function;
        draggable: boolean|object;
        editable: boolean;
        emptyText: string;
        encodeFilterParams: Function;
        filterOnEnter: boolean;
        filterOperator: string;
        filterParamName: string;
        filterSelected: boolean;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hidePickerOnSelect: boolean;
        hideTrigger: boolean;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        items: object[]|string[]|object;
        keyStrokeChangeDelay: number;
        keyStrokeFilterDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listCls: string;
        listItemTpl: Function;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        minChars: number;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        multiSelect: boolean;
        name: string;
        overlayAnchor: boolean;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerWidth: number;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        primaryFilter: object;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        store: Store;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggerAction: string;
        triggers: object;
        validateFilter: boolean;
        value: string|number[]|string[];
        valueField: string;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SchedulingModePicker extends Combo {        
        constructor(config?: Partial<SchedulingModePickerConfig>);
    }

    type StartDateFieldConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoComplete: string;
        autoExpand: boolean;
        badge: string;
        centered: boolean;
        clearable: boolean|object;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        disabled: boolean;
        draggable: boolean|object;
        editable: boolean;
        eventRecord: EventModel;
        flex: number|string;
        floating: boolean;
        format: string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        highlightExternalChange: boolean;
        hint: string|Function;
        hintHtml: string|Function;
        html: string;
        htmlCls: string|object;
        id: string;
        inputAlign: string;
        inputAttributes: object;
        inputWidth: string|number;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        keepTime: boolean|Date|string;
        keyStrokeChangeDelay: number;
        label: string;
        labelCls: string|object;
        labelWidth: string|number;
        labels: object;
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        max: string|Date;
        maxHeight: string|number;
        maxLength: number;
        maxWidth: string|number;
        min: string|Date;
        minHeight: string|number;
        minLength: number;
        minWidth: string|number;
        monitorResize: boolean;
        name: string;
        owner: Widget;
        picker: object;
        pickerAlignElement: string;
        pickerFormat: string;
        placeholder: string;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        project: ProjectModel;
        readOnly: boolean;
        ref: string;
        required: boolean;
        revertOnEscape: boolean;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        step: string|number|object;
        style: string;
        tabIndex: number;
        tag: string;
        textAlign: string;
        title: string;
        tooltip: string|object;
        triggers: object;
        value: string|Date;
        weekStartDay: number;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class StartDateField extends DateField {        
        constructor(config?: Partial<StartDateFieldConfig>);
    }

    type TaskEditorBaseConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        autoClose: boolean;
        autoShow: boolean;
        bbar: object[]|object;
        calculateMask: string|null;
        calculateMaskDelay: number|null;
        centered: boolean;
        closable: boolean;
        closeAction: string;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        durationDisplayPrecision: number;
        extraItems: object;
        flex: number|string;
        floating: boolean;
        focusOnToFront: boolean;
        footer: object|string;
        forElement: HTMLElement;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        modal: boolean;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        showOnClick: boolean;
        style: string;
        tabsConfig: object;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        title: string;
        tools: object;
        tooltip: string|object;
        trapFocus: boolean;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class TaskEditorBase extends Popup {        
        constructor(config?: Partial<TaskEditorBaseConfig>);
        loadEvent(record: EventModel): void;
    }

    type TimelineConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        allowOverlap: boolean;
        anchor: boolean;
        animateRemovingRows: boolean;
        appendTo: HTMLElement|string;
        assignmentStore: SchedulerAssignmentStore|object;
        assignments: SchedulerAssignmentModel[]|object[];
        autoAdjustTimeAxis: boolean;
        autoHeight: boolean;
        barMargin: number;
        bbar: object[]|object;
        centered: boolean;
        cls: string|object;
        columnLines: boolean;
        columns: object[]|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        contextMenuTriggerEvent: string;
        createEventOnDblClick: boolean;
        crudManager: object|AbstractCrudManagerMixin;
        crudManagerClass: AbstractCrudManagerMixin;
        data: object[];
        dataset: object;
        defaultBindProperty: string;
        defaultRegion: string;
        defaultResourceImageName: string;
        defaults: object;
        dependencies: SchedulerDependencyModel[]|object[];
        dependencyStore: SchedulerDependencyStore|object;
        destroyStore: boolean;
        destroyStores: boolean;
        disableGridRowModelWarning: boolean;
        disabled: boolean;
        displayDateFormat: string;
        draggable: boolean|object;
        durationDisplayPrecision: number|boolean;
        emptyText: string;
        enableDeleteKey: boolean;
        enableEventAnimations: boolean;
        enableRecurringEvents: boolean;
        enableSticky: boolean;
        enableTextSelection: boolean;
        endDate: Date|string;
        endParamName: string;
        eventBarTextField: string;
        eventBodyTemplate: Function;
        eventColor: string;
        eventLayout: string;
        eventRenderer: Function;
        eventRendererThisObj: object;
        eventSelectionDisabled: boolean;
        eventStore: SchedulerEventStore|object;
        eventStyle: string;
        events: SchedulerEventModel[]|object[];
        features: any;
        fillLastColumn: boolean;
        fillTicks: boolean;
        fixedRowHeight: boolean;
        flex: number|string;
        floating: boolean;
        footer: object|string;
        forceFit: boolean;
        fullRowRefresh: boolean;
        getDateConstraints: Function;
        getRowHeight: Function;
        header: object|string;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideHeaders: boolean;
        hideWhenEmpty: boolean;
        horizontalEventSorterFn: Function;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        loadMask: string|null;
        loadMaskDefaults: object|Mask;
        loadMaskError: object|Mask;
        localeClass: Base;
        localizableProperties: string[];
        longPressTime: number;
        maintainSelectionOnDatasetChange: boolean;
        managedEventSizing: boolean;
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        maxZoomLevel: number;
        milestoneAlign: string;
        milestoneCharWidth: number;
        milestoneLayoutMode: string;
        minHeight: string|number;
        minWidth: string|number;
        minZoomLevel: number;
        mode: string;
        monitorResize: boolean;
        multiEventSelect: boolean;
        namedItems: object;
        owner: Widget;
        partner: TimelineBase;
        passStartEndParameters: boolean;
        plugins: Function[];
        positioned: boolean;
        preCalculateHeightLimit: number;
        presets: object[];
        preventTooltipOnTouch: boolean;
        project: ProjectModel|object;
        readOnly: boolean;
        ref: string;
        removeUnassignedEvent: boolean;
        resizeToFitIncludesHeader: boolean;
        resourceColumns: object;
        resourceImageExtension: string;
        resourceImagePath: string;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore|object;
        resourceTimeRangeStore: ResourceTimeRangeStore;
        resourceTimeRanges: ResourceTimeRangeModel[]|object[];
        resources: SchedulerResourceModel[]|object[];
        responsiveLevels: object;
        ripple: boolean|object;
        rowHeight: number;
        scrollAction: string;
        scrollManager: object;
        scrollable: boolean|object|Scroller;
        scrollerClass: Scroller;
        selectionMode: object;
        showAnimation: boolean|object;
        showDirty: boolean;
        showRemoveRowInContextMenu: boolean;
        snap: boolean;
        snapRelativeToEventStartDate: boolean;
        startDate: Date|string;
        startParamName: string;
        stickyHeaders: boolean;
        store: Store|object;
        style: string;
        subGridConfigs: object;
        suppressFit: boolean;
        syncMask: string|null;
        tag: string;
        tbar: object[]|object;
        textAlign: string;
        textContent: boolean;
        tickSize: number;
        timeAxis: object|TimeAxis;
        timeRanges: TimeSpan[]|object[];
        title: string;
        tools: object;
        tooltip: string|object;
        transitionDuration: number;
        trapFocus: boolean;
        triggerSelectionChangeOnRemove: boolean;
        useInitialAnimation: boolean|string;
        verticalTimeAxisColumn: object;
        viewPreset: string|object;
        visibleDate: Date|object;
        visibleZoomFactor: number;
        weekStartDay: number;
        weight: number;
        width: string|number;
        workingTime: object;
        x: number;
        y: number;
        zoomKeepsOriginalTimespan: boolean;
        zoomOnMouseWheel: boolean;
        zoomOnTimeAxisDoubleClick: boolean;
    }

    export class Timeline extends Scheduler {        
        constructor(config?: Partial<TimelineConfig>);
    }

    type AdvancedTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class AdvancedTab extends FormTab {        
        constructor(config?: Partial<AdvancedTabConfig>);
    }

    type DependencyTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        taskComboSortField: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export abstract class DependencyTab extends EditorTab {        
        constructor(config?: Partial<DependencyTabConfig>);
    }

    type EditorTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class EditorTab extends Container implements EventLoader {        
        constructor(config?: Partial<EditorTabConfig>);
    }

    type FormTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class FormTab extends EditorTab {        
        constructor(config?: Partial<FormTabConfig>);
    }

    type GeneralTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class GeneralTab extends FormTab {        
        constructor(config?: Partial<GeneralTabConfig>);
    }

    type NotesTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class NotesTab extends FormTab {        
        constructor(config?: Partial<NotesTabConfig>);
    }

    type PredecessorsTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        taskComboSortField: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class PredecessorsTab extends DependencyTab {        
        constructor(config?: Partial<PredecessorsTabConfig>);
    }

    type ResourcesTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class ResourcesTab extends EditorTab {        
        constructor(config?: Partial<ResourcesTabConfig>);
    }

    type SchedulerAdvancedTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SchedulerAdvancedTab extends FormTab {        
        constructor(config?: Partial<SchedulerAdvancedTabConfig>);
    }

    type SchedulerGeneralTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SchedulerGeneralTab extends FormTab {        
        constructor(config?: Partial<SchedulerGeneralTabConfig>);
    }

    type SuccessorsTabConfig = {        
        adopt: HTMLElement|string;
        align: object|string;
        alignSelf: string;
        anchor: boolean;
        appendTo: HTMLElement|string;
        centered: boolean;
        cls: string|object;
        constrainTo: HTMLElement|Widget|Rectangle;
        content: string;
        contentElementCls: string|object;
        dataset: object;
        defaultBindProperty: string;
        defaults: object;
        dependencyIdField: string;
        disabled: boolean;
        draggable: boolean|object;
        flex: number|string;
        floating: boolean;
        height: string|number;
        hidden: boolean;
        hideAnimation: boolean|object;
        hideWhenEmpty: boolean;
        html: string;
        htmlCls: string|object;
        id: string;
        insertBefore: HTMLElement|string;
        insertFirst: HTMLElement|string;
        itemCls: string;
        items: object|object[]|Widget[];
        layout: string;
        layoutStyle: object;
        lazyItems: object|object[]|Widget[];
        listeners: object;
        localeClass: Base;
        localizableProperties: string[];
        margin: number|string;
        maskDefaults: object|Mask;
        masked: boolean|string|object|Mask;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        monitorResize: boolean;
        namedItems: object;
        owner: Widget;
        positioned: boolean;
        preventTooltipOnTouch: boolean;
        readOnly: boolean;
        ref: string;
        ripple: boolean|object;
        scrollAction: string;
        scrollable: boolean|object|Scroller;
        showAnimation: boolean|object;
        style: string;
        tag: string;
        taskComboSortField: string;
        textAlign: string;
        textContent: boolean;
        title: string;
        tooltip: string|object;
        weight: number;
        width: string|number;
        x: number;
        y: number;
    }

    export class SuccessorsTab extends DependencyTab {        
        constructor(config?: Partial<SuccessorsTabConfig>);
    }

    export class EventLoader {
    }

}