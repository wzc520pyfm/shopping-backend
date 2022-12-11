class HandleDataTool {
  /**
   * 将扁平数组结构转为Tree
   * @param {Array} items 要转换的数组
   * @param {String} idField 数据id
   * @param {String} pidField 数据父id
   * @param {String} childrenField 子项字段
   * @returns {Tree}
   */
  static arrayToTree(items, idField, pidField, childrenField) {
    const result = []
    const itemMap = {}

    for (const item of items) {
      const id = item[idField]
      const pid = item[pidField]
      if (!itemMap[id]) itemMap[id] = { [childrenField]: [] }
      itemMap[id] = { ...item, [childrenField]: itemMap[id][childrenField] }
      const treeItem = itemMap[id]
      if (pid === 0) result.push(treeItem)
      else {
        if (!itemMap[pid]) itemMap[pid] = { [childrenField]: [] }
        itemMap[pid][childrenField].push(treeItem)
      }
    }
    return result
  }
}

module.exports = HandleDataTool