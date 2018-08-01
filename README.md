# Emiya-multiple-template
用于创建复杂的基于webpack的多entry项目
## 1. 项目结构
```
.
├── LICENSE
├── README.md
├── config                                         # 配置文件
│   ├── paths.js
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
└── src
    ├── assets                                     # 存储通用素材的文件夹
    │   ├── fonts
    │   └── images
    │       ├── index.png
    │       ├── user-about-index.png
    │       ├── user-index.png
    │       └── user-info.png
    ├── css                                        # 存储css的文件夹，可以在js中直接引用css，如果有公用css会自动拆分并打包成公共模块
    │   ├── base.css                               
    │   ├── index.scss
    │   └── user
    │       ├── about
    │       │   └── index.scss
    │       ├── index.scss
    │       └── info.scss
    ├── js                                         # 存储js，js与view一一对应，且会生成相应的路径。如在这个项目中，会生成
    │   ├── index.js                               # /index.html
    │   ├── lib                                    # /user/index.html
    │   │   └── jquery.min.js                      # /user/info.html
    │   └── user                                   # /user/about/index.html
    │       ├── about                              # lib文件夹为公共库的存放路径，不会随之生成目录
    │       │   └── index.js
    │       ├── index.js
    │       └── info.js
    └── view                                       # 与js文件对应的视图文件
        ├── index.html
        └── user
            ├── about
            │   └── index.html
            ├── index.html
            └── info.html
```

## 2. 打包结构
```
.
├── commons                                             # 公用文件存放位置
│   ├── css
│   │   └── style-281a08734cb34f95d7c1.css
│   ├── images
│   │   ├── index.png
│   │   ├── user-about-index.png
│   │   ├── user-index.png
│   │   └── user-info.png
│   └── js
│       └── commons-281a08734cb34f95d7c1.js
├── index                                               # /index.html需要使用到的css和js资源
│   ├── css
│   │   └── style-281a08734cb34f95d7c1.css
│   └── js
│       └── entry-281a08734cb34f95d7c1.js
├── index.html
└── user                                                # /user/* 路径下所有的视图以及使用到的css和js资源
    ├── about
    │   ├── index
    │   │   ├── css
    │   │   │   └── style-281a08734cb34f95d7c1.css
    │   │   └── js
    │   │       └── entry-281a08734cb34f95d7c1.js
    │   └── index.html
    ├── index
    │   ├── css
    │   │   └── style-281a08734cb34f95d7c1.css
    │   └── js
    │       └── entry-281a08734cb34f95d7c1.js
    ├── index.html
    ├── info
    │   ├── css
    │   │   └── style-281a08734cb34f95d7c1.css
    │   └── js
    │       └── entry-281a08734cb34f95d7c1.js
    └── info.html
```
## 3. 开发规范
### 1. 目录一一对应
假设在`view`文件夹内有`/a/b/c/info.html`，则此时:
1. 在`js`文件夹内必须有`/a/b/c/info.js`
2. 在`css`文件夹内可选有`/a/b/c/info.scss`

