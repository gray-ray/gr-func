/**
 * @description 字符串 填充
 * @param {string} str
 * @param {number} len
 * @param {string} [padStr = "*"]
 * @param { 'prefix' | 'suffix' } [type = "prefix"]
 * @returns {string}
 */
export declare function getPadStr(str: string, len: number, padStr?: string, type?: 'prefix' | 'suffix'): string;
/**
 * @description 获取当前数据类型
 * @param {any} a
 * @returns {string}
 */
export declare function getValueType(a: any): string;
/**
 * @description 树遍历多条件查询
 * @param { object | Array } data
 * @param {string} childKey
 * @param { Function } predicate
 * @returns {any}
 */
export declare function findNode(data: object | Array<any>, childKey: string | undefined, predicate: (e: any) => boolean): any;
/**
 * @description 校验url query 格式是否正确
 * @param { string} url
 * @returns { boolean}
 */
export declare function validateUrlQuery(url: string): boolean;
declare const _default: {
    getPadStr: typeof getPadStr;
    getValueType: typeof getValueType;
    findNode: typeof findNode;
    validateUrlQuery: typeof validateUrlQuery;
};
export default _default;
