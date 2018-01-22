# web-crawler
使用puppeteer爬取网页，禁止页面渲染css，禁止页面加载图片

# 存在问题
本地测试10个并发请求没有问题，当并发为20个时，puppeteer的组件会报存在内存泄漏的风险，然后page.goto代码部分30s超时，如果优化可能需要从puppeteer库层面优化，难度较大
