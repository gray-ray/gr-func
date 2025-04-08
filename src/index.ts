



/**
 * @description 字符串 填充
 * @param {string} str
 * @param {number} len 
 * @param {string} [padStr = "*"]
 * @param { 'prefix' | 'suffix' } [type = "prefix"]
 * @returns {string}
 */

export function getPadStr(str: string, len: number, padStr: string="*", type: 'prefix' | 'suffix'= 'prefix'): string{
  if (typeof len !== 'number') {
    throw new Error('len must be a number');
  }
  if (!padStr) {
    throw new Error("padStr cannot be empty");
  }
  if(type == 'prefix') {
    return str.padStart(len, padStr)
  }
  return str.padEnd(len,padStr)
}


/**
 * @description 获取当前数据类型
 * @param {any} a
 * @returns {string}
 */
export function getValueType (a: any): string{
  // Object.prototype.toString.call(a) => '[object Object]'
  //@ts-ignore
  return  Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1];
}

/**
 * @description 树遍历多条件查询
 * @param { object | Array } data 
 * @param {string} childKey
 * @param { Function } predicate
 * @returns {any} 
 */
export function findNode(data: object | Array<any>, childKey: string = 'children', predicate: (e: any) => boolean): any {
  if (!['Object', 'Array']?.includes(getValueType(data))) {
    throw new Error('data 必须为对象或者数组');
  }
  if (!childKey) {
    throw new Error("childKey cannot be empty");
  }

  const valueType = getValueType(data);

  const translateData = {
    'Object': [data],
    'Array': data,
  }

  // @ts-ignore
  const stack = translateData[valueType];

  while(stack?.length) {
    const  node = stack?.pop();

    if (predicate(node)) {

      return node;
    } else if(node?.[childKey]?.length) {

      stack?.push(...node?.[childKey])
    }

  }
  return undefined

}



/**
 * @description 校验url query 格式是否正确
 * @param { string} url
 * @returns { boolean}
 */
export function validateUrlQuery(url: string): boolean {

  try {
    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (e) {
      return false; // 解码失败说明格式有问题
    }

    // 提取 query 部分的正则
    const queryMatch = decodedUrl.match(/\?(.*)$/);
    if (!queryMatch) return true; // 没有 query 部分视为有效

    const query = queryMatch[1];
    if (!query) return true; // 空 query 部分（只有?）视为有效
    // 主校验正则：
    // 1. 允许键值对 key=value 或只有 key
    // 2. 键不能为空，值可以为空
    // 3. 允许被编码的字符
    // 4. 多个参数用 & 分隔
    // 5. 不允许以 & 开头或结尾，也不允许连续的 &&
    const queryRegex = /^(?:[^&=]+(?:=[^&=]*)?)(?:&[^&=]+(?:=[^&=]*)?)*$/;

  return queryRegex.test(query);
  } catch (error) {
    return false;
  }
}







export default {
  getPadStr,
  getValueType,
  findNode,
  validateUrlQuery
}