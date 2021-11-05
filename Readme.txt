联系方式：wu380652029@126.com

运行方式
    环境安装：
        vue
        node.js
        MySQL 8.0.20
    数据文件：
        创建数据库course_selection
        在数据库中运行course_selection.sql文件导入数据
        在修改文件夹service\db\db.js中数据库信息：密码、用户名、端口、数据库名等
    运行：
        cmd: 在course_selection文件夹中 npm install
        cmd: 在course_selection\service 文件夹中 npm install
        cmd: 在course_selection\service 文件夹中 node app
        显示 success listen at port：3000 则后端连接成功
        开一个新的cmd
        cmd: 在course_selection文件夹中 npm run build
        cmd: 在course_selection文件夹中 npm run serve
        在浏览器中打开所给地址即可（一般会直接跳转）


