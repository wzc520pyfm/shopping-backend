# shopping-backend
电商网站整合实战-后端

# 如何自动同步数据库到Sequelize模型
执行脚本
> yarn models -d 数据库名 -h 数据库host -u 数据库用户 -p 数据库连接端口 -x 数据库用户密码 -e mysql --cm p

模型同步后会在项目跟目录下生成models文件夹, 里面存放数据库模型。

# 如何使用环境变量
1. 在项目根目录下创建.env文件
2. 遵照key=value格式写入变量
   ```env
   # 比如:
   DB_USER="root"
   ```
3. 在文件中读取 `process.env.DB_USER`

