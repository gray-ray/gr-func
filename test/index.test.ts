

import { getPadStr, findNode, validateUrlQuery as isValidQueryWithRegex , memoize } from '../src/index';


// describe('getPadStr', () => {
//   // 测试前缀填充
//   test('should add prefix padding with default parameters', () => {
//     expect(getPadStr('abc', 5)).toBe('**abc');
//   });

//   test('should add prefix padding with custom pad string', () => {
//     expect(getPadStr('abc', 5, '-')).toBe('--abc');
//   });

//   test('should not add prefix padding when string length equals target length', () => {
//     expect(getPadStr('abc', 3)).toBe('abc');
//   });

//   test('should handle empty string with prefix padding', () => {
//     expect(getPadStr('', 3, '+')).toBe('+++');
//   });

//   // 测试后缀填充
//   test('should add suffix padding when type is suffix', () => {
//     expect(getPadStr('abc', 5, '*', 'suffix')).toBe('abc**');
//   });

//   test('should add suffix padding with custom pad string', () => {
//     expect(getPadStr('abc', 5, '=', 'suffix')).toBe('abc==');
//   });

//   test('should not add suffix padding when string length equals target length', () => {
//     expect(getPadStr('abc', 3, '*', 'suffix')).toBe('abc');
//   });

//   test('should handle empty string with suffix padding', () => {
//     expect(getPadStr('', 3, '-', 'suffix')).toBe('---');
//   });

//   // 测试边界情况
//   test('should return original string when target length is shorter', () => {
//     expect(getPadStr('abcde', 3)).toBe('abcde');
//   });

//   test('should handle multi-character pad string', () => {
//     expect(getPadStr('abc', 8, '123')).toBe('12312abc');
//   });

//   test('should handle multi-character pad string with suffix', () => {
//     expect(getPadStr('abc', 8, '123', 'suffix')).toBe('abc12312');
//   });

//   // 测试类型参数大小写不敏感
//   test('should handle uppercase type parameter', () => {
//     expect(getPadStr('abc', 5, '*', 'prefix')).toBe('**abc');
//   });

//   test('should handle mixed case type parameter', () => {
//     expect(getPadStr('abc', 5, '*', 'suffix')).toBe('abc**');
//   });

//   // 测试无效参数
//   test('should throw error when padStr is empty', () => {
//     expect(() => getPadStr('abc', 5, '')).toThrow('padStr cannot be empty');
//   });

//   test('should throw error when len is not a number', () => {
//     expect(() => getPadStr('abc', '5' as any)).toThrow('len must be a number');
//   });
// });



// describe('findNode', () => {
//   // 测试数据
//   const mockTree = {
//     id: 1,
//     name: 'root',
//     children: [
//       {
//         id: 2,
//         name: 'child1',
//         kids: [  // 测试自定义 childKey
//           { id: 4, name: 'grandchild1' }
//         ]
//       },
//       {
//         id: 3,
//         name: 'child2',
//         children: [
//           { id: 5, name: 'grandchild2' }
//         ]
//       }
//     ]
//   };

//   const mockArray = [
//     {
//       id: 10,
//       items: [
//         { id: 11 },
//         { id: 12 }
//       ]
//     },
//     {
//       id: 20,
//       items: [
//         { id: 21 }
//       ]
//     }
//   ];

//   // 1. 基本功能测试
//   test('should find node in object tree with default childKey', () => {
//     const result = findNode(mockTree, 'children', node => node.id === 5);
//     expect(result).toEqual({ id: 5, name: 'grandchild2' });
//   });

//   test('should find node in array tree', () => {
//     const result = findNode(mockArray, 'items', node => node.id === 21);
//     expect(result).toEqual({ id: 21 });
//   });

//   test('should find root node', () => {
//     const result = findNode(mockTree, 'children', node => node.id === 1);
//     expect(result).toEqual(mockTree);
//   });

//   // 2. 自定义 childKey 测试
//   test('should work with custom childKey', () => {
//     const result = findNode(mockTree, 'kids', node => node.id === 4);
//     expect(result).toEqual({ id: 4, name: 'grandchild1' });
//   });

//   // 3. 未找到节点测试
//   test('should return undefined when node not found', () => {
//     const result = findNode(mockTree, 'children', node => node.id === 99);
//     expect(result).toBeUndefined();
//   });

//   test('should return undefined for empty tree', () => {
//     const result = findNode({}, 'children', node => node.id === 1);
//     expect(result).toBeUndefined();
//   });

//   // 4. 边界条件测试
//   test('should handle node without children property', () => {
//     const tree = { id: 1, name: 'no-children' };
//     const result = findNode(tree, 'children', node => node.id === 1);
//     expect(result).toEqual(tree);
//   });

//   test('should handle empty children array', () => {
//     const tree = { id: 1, children: [] };
//     const result = findNode(tree, 'children', node => node.id === 1);
//     expect(result).toEqual(tree);
//   });

//   // 5. 错误处理测试
//   test('should throw error when data is not object or array', () => {
//     expect(() => findNode('string' as any, 'children', node => node.id === 1))
//       .toThrow('data 必须为对象或者数组');
//   });

//   test('should throw error when childKey is empty', () => {
//     expect(() => findNode(mockTree, '', node => node.id === 1))
//       .toThrow('childKey cannot be empty');
//   });

//   // 6. 复杂谓词测试
//   test('should work with complex predicate', () => {
//     const result = findNode(
//       mockTree,
//       'children',
//       node => node.name && node.name.startsWith('grand')
//     );
//     expect(result).toEqual({ id: 4, name: 'grandchild1' });
//   });

//   // 7. 性能测试
//   test('should handle deep tree without stack overflow', () => {
//     // 创建一个深度为1000的树
//     let deepTree = { id: 0,children: [] };
//     let current = deepTree;
//     for (let i = 1; i <= 1000; i++) {
//       current.children = [{ id: i }] as any;
//       current = current.children[0];
//     }
    
//     const result = findNode(deepTree, 'children', node => node.id === 1000);
//     expect(result).toEqual({ id: 1000 });
//   });
// });




// describe('URL Query 格式校验', () => {
//   // 正常情况测试
//   test('标准查询参数 - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=John&age=30')).toBe(true);
//   });

//   test('编码的查询参数 - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=John%20Doe&city=%E5%8C%97%E4%BA%AC')).toBe(true);
//   });

//   test('空值的参数 - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=&age=30')).toBe(true);
//   });

//   test('无值的参数 - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=John&age')).toBe(true);
//   });

//   test('相对路径URL - 应返回 true', () => {
//     expect(isValidQueryWithRegex('/path/to/resource?page=1&size=10')).toBe(true);
//   });

//   test('只有查询部分的URL - 应返回 true', () => {
//     expect(isValidQueryWithRegex('?lang=zh&theme=dark')).toBe(true);
//   });

//   test('没有查询参数的URL - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com')).toBe(true);
//   });

//   test('只有问号的URL - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?')).toBe(true);
//   });

//   // 异常情况测试
//   test('空键的参数 - 应返回 false', () => {
//     expect(isValidQueryWithRegex('https://example.com?=value&age=30')).toBe(false);
//   });

//   test('以&结尾的查询 - 应返回 false', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=John&')).toBe(false);
//   });

//   test('连续的&& - 应返回 false', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=John&&age=30')).toBe(false);
//   });

//   test('无效的编码URL - 应返回 false', () => {
//     expect(isValidQueryWithRegex('https://example.com?name=%ZZ')).toBe(false);
//   });

//   // test('包含非法字符的键 - 应返回 false', () => {
//   //   expect(isValidQueryWithRegex('https://example.com?na|me=John')).toBe(false);
//   // });

//   // 边界情况测试
//   test('超长查询参数 - 应返回 true', () => {
//     const longParam = 'a'.repeat(1000);
//     expect(isValidQueryWithRegex(`https://example.com?${longParam}=${longParam}`)).toBe(true);
//   });

//   test('多个参数混合情况 - 应返回 true', () => {
//     expect(isValidQueryWithRegex('https://example.com?a=1&b=2&c&d=&e=f%20g&h=%E4%B8%AD%E6%96%87')).toBe(true);
//   });
// });



describe('memoize', () => {
  test('caches results by default with JSON.stringify key', () => {
    const mockFn = jest.fn((x, y) => x + y);
    //@ts-ignore
    const memoized = memoize(mockFn,{});

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(mockFn).toHaveBeenCalledTimes(1); // 第二次命中缓存
  });

  test('expires cache after ttl', (done) => {
    const mockFn = jest.fn(x => x * 2);
    const memoized = memoize(mockFn, { ttl: 100 });
    
    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(mockFn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      expect(memoized(2)).toBe(4);
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 150);
  },1000);

  test('uses custom resolver', () => {
    const mockFn = jest.fn(id => ({ id }));
    const memoized = memoize(mockFn, {
      resolver: id => `user:${id}`,
    });

    expect(memoized(1)).toEqual({ id: 1 });
    expect(memoized(1)).toEqual({ id: 1 });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('applies LRU strategy when cache exceeds maxSize', () => {
    const mockFn = jest.fn(x => x);
    const memoized = memoize(mockFn, { maxSize: 2 });

    memoized(1); // cache: [1]
    memoized(2); // cache: [1,2]
    memoized(3); // cache should evict 1 → [2,3]

    expect(mockFn).toHaveBeenCalledTimes(3);
    memoized(2); // hit cache
    memoized(1); // should call again
    expect(mockFn).toHaveBeenCalledTimes(4);
  });
});
