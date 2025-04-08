

### 常用函数方法集合


``` typescript
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
 * @param { string} query
 * @returns { boolean}
 */
export declare function validateUrlQuery(query: string): boolean;
/**
 * @description 判断url 格式是否正确 校验 query 是否正确
 * @param {string} url
 * @returns { boolean}
 */
export declare function validateUrl(url: string): void;
declare const _default: {
    getPadStr: typeof getPadStr;
    getValueType: typeof getValueType;
    findNode: typeof findNode;
    validateUrlQuery: typeof validateUrlQuery;
};
export default _default;

```

### 发布注意
根目录下创建 `.npmrc`
``` ini
@your-username:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}

```

创建 GitHub 个人访问令牌
前往 GitHub > Settings > Developer settings > Personal access tokens

生成新令牌，勾选 write:packages 和 read:packages 权限



### 安装注意
包其实发布在 GitHub Packages ，因此直接使用npm 安装默认 registry 是 npmjs.org

1. 一次安装
``` bash
pnpm add @gray-ray/gr-func --registry=https://npm.pkg.github.com

```
2. 项目中配置 .npmrc
``` ini
@your-username:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}

```
执行
``` bash 
pnpm add @gray-ray/gr-func
```
   