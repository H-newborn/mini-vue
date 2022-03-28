function btnClick() {
  import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
}

// 思考利用率 而不是缓存
// webpackPrefetch 等待核心代码下载好之后再下载
// webpackPrefetch 与核心代码并行加载
