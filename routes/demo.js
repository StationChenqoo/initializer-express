var express = require("express");
const { default: mongoose } = require("mongoose");
const { DBHelper } = require("../x/DBHelper");
const { StringUtils } = require("../x/StringUtils");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  response.send(JSON.stringify({ data: "HelloWorld.", status: true }));
});

/** 测试 */
router.get("/test", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  console.log(request.query.action);
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let datas = await connection.db.collection("test").find().toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({
    data: {
      decode: StringUtils.encode(""),
      encode: StringUtils.decode("QEkJV1zLRkjCFUNxsBCaRw=="),
    },
    status: true,
  });
});

/** 测试 */
router.get("/select51Job", async function (request, response, next) {
  const RENPHO = {
    date: "2020年02月 ~ 2020年6月",
    name: "深圳市润丰数码技术有限公司",
    result: ["Renpho Health (iOS: AppStore)", "Renpho跨境电商后台管理系统"],
    experience: [
      "独立负责React Native的开发，整合工厂硬件设备的SDK，封装视图；",
      "进行前端技术分享和技术培训；",
      "设备面板的搭建，按需加载JSBundle（App管理不同设备的JSBundle，定向进行设备更新）",
      "使用ts + hooks对现有的js + class对Web项目进行升级，处理升级到React 16产生的问题；",
    ],
  };

  const BINDO = {
    date: "2020年06月 ~ 2021年2月",
    name: "深圳边度网络科技有限公司",
    result: ["mPOS（iOS: AppStore）"],
    experience: [
      "编写原生android模块，集成讯飞语音SDK，进行TTS普通话、粤语和英语的语音播报；",
      "编写原生android模块，进行.zip的解压，.csv的处理；",
      "编写原生android模块，调用x86 POS机的硬件SDK进行热敏打印机的打印；",
      "编写原生android模块，进行八达通支付；",
      "调试模式的升级，可以在console输出android的网络请求日志，便于调试；",
      "React Native项目重构和升级，0.55版本升级到0.59版本，升级react-navigation 2.x到5.x版本，重构全局MobX+AsyncStorage为redux+redux-persist，Android support到AndroidX的升级，处理项目升级带来的其他的兼容性问题。",
    ],
  };

  const OLD = {
    date: "2020年06月及以前经历",
    name: "山东秋葵科技教育",
    result: ["秋葵教育App", "秋葵教育微信小程序", "秋葵教育后台管理系统"],
    experience: [
      "独立负责React Native进行iOS和android端的开发，微信小程序工具进行微信小程序的开发，SSH进行后端开发，ReactJS进行后台管理系统的开发；",
      "优化查询过程，百万数据统计学员课时毫秒级响应；",
      "定时任务进行MySQL数据的备份；",
      "搭建MySQL主从复制架构，进行读写分离；",
      "编写爬虫程序，对相关教育资源进行定向抓取；",
      "其他前后端全栈开发的相关工作 ...",
    ],
  };

  const ANDROID_DATAS = {
    intent: "Android / React Native / Flutter移动开发工程师",
    skills: [
      { icon: "tag-android.png", text: "Android" },
      { icon: "tag-flutter.png", text: "Flutter" },
      { icon: "tag-react-native.png", text: "React Native" },
      { icon: "tag-wechat.png", text: "微信小程序" },
      { icon: "tag-redux.png", text: "Redux" },
      { icon: "tag-jenkins.png", text: "Jenkins" },
    ],
    conclusion: [
      "熟练使用React Native和Flutter进行android和iOS跨平台应用的开发；",
      "熟悉iOS和android个手机厂商的上架流程；",
      "熟悉iOS和android屏幕适配、权限申请、状态管理、数据缓存等常见框架，了解基本原理；",
      "熟悉React Native进行CodePush热更新；",
      "熟练根据业务场景对组件抽象化，进行公共组件和通用逻辑的封装；",
      "了解Spring Boot / KoaJS，可以使用Java/NodeJS编写后端接口；",
      "熟练使用微信小程序开发者工具进行小程序的开发。",
    ],
    companies: [
      {
        date: "2020年06月 ~ 2022年9月",
        name: "云南白药集团上海健康产品有限公司",
        result: [
          "以下App/微信小程序，均已上线，可通过iOS和android应用商店，或者微信小程序进行体验 ...",
          "采之汲App (iOS: AppStore android: 华为、小米、OPPO、VIVO应用商店)",
          "采之汲微信小程序",
          "汲美微信小程序",
          "美创加App",
        ],
        experience: [
          "参加2023年Google IO/Connect开发者大会Flutter专场；",
          "和产品、UI、测试、运营、用户等相关人员完成App的需求 → 开发 → 测试 → 灰度 → 上线整个流程；",
          "对React Native和Flutter进行技术调研和选型，基本框架使用Flutter，需要热更新和需要WebView交互的页面使用React Native；",
          "高度还原设计稿，进行android和iOS的屏幕的适配；",
          "搭建公共组件库，进行常用组件的封装；",
          "用Redux和Provider进行整个App数据流状态的管理以及必要时的数据缓存的工作；",
          "用axios和dio进行网络请求的二次封装，处理多个接口同步/异步访问的复杂业务的处理；",
          "用react-navigation对不同业务场景，进行路由的清栈、重定向等;",
          "对接微信支付和支付宝进行App内应用支付；",
          "处理地理位置授权，以及地理编码和逆地理编码，火星坐标等问题，用SQLite封装省/市/区四级联动位置选择器；",
          "编写原生iOS/android模块，处理必要时的React Native/Flutter的对于原生模块的需求；",
          "编写animation，满足指定场景下的交互体验；",
          "处理iOS上架过程中，隐私政策、用户协议、隐私权限话术、权限申请的时机等被拒的问题；",
          "处理android上架过程中，权限申请的时机，各个手机厂商的消息通知的消息通道的对接进行消息推送；",
          "用CodePush进行App指定功能页面的热更新；",
          "对新人的代码进行Code review，进行前端技术分享和新人培训；",
          "优化用户体验，对App进行性监测，以及收集线上用户行为埋点，进行用户行为的分析。",
        ],
      },
      RENPHO,
      BINDO,
      OLD,
    ],
  };

  const JAVA_DATAS = {};

  const WEB_DATAS = {
    intent: "Web前端工程师",
    skills: [
      { icon: "tag-react.png", text: "React" },
      { icon: "tag-react-native.png", text: "React Native" },
      { icon: "tag-ts.png", text: "Ts" },
      { icon: "tag-node-js.png", text: "KoaJS" },
      { icon: "tag-wechat.png", text: "微信小程序" },
      // { icon: "tag-ant-design.png", text: "Ant Design" },
      { icon: "tag-redux.png", text: "Redux" },
      { icon: "tag-jenkins.png", text: "Jenkins" },
    ],
    conclusion: [
      "熟练使用React JS进行前端页面的开发；",
      "熟练使用Ant Design和Ant Design Pro进行组件的二次封装；",
      "熟悉各种富文本编辑器的二次封装；",
      "熟悉各种图形组件库的二次封装；",
      "熟练使用Ali Hooks以及自定义Hooks进行复杂业务逻辑的处理；",
      "熟悉Linux和Windows Server对于各种Web框架应用的部署；",
      "熟练使用微信小程序开发者工具进行小程序的开发。",
    ],
    result: [
      "采之汲App后台管理系统",
      "采之汲微信小程序后台管理系统",
      "汲美微信小程序后台管理系统",
      "美创加App后台管理系统",
    ],
    companies: [
      {
        date: "2020年06月 ~ 2022年9月",
        name: "云南白药集团上海健康产品有限公司",
        result: [
          "以下App/微信小程序，均已上线，可通过iOS和android应用商店，或者微信小程序进行体验 ...",
          "采之汲App后台管理系统",
          "采之汲微信小程序后台管理系统",
          "汲美微信小程序后台管理系统",
          "美创加App后台管理系统",
        ],
        experience: [
          "和产品、UI、测试、运营、用户等相关人员完成Web前端的需求 → 开发 → 测试 → 灰度 → 上线整个流程；",
          "参与制定RESTful接口规范，以及必要时的数据库MySQL/MongoDB/Redis的选型和表/文档设计；",
          "高度还原设计稿，进行PC和移动端屏幕的适配；",
          "搭建公共组件库，进行常用组件的封装；",
          "对Wang editor富文本编辑器进行二次封装，以及必要时候的实时预览等；",
          "用eCharts进行合适的图库选择以及数据展示；",
          "对网站的安全进行不断升级，对接口请求进行加密以及Token和Cookie的策略进行优化；",
          "参与搭建Jenkins和Docker，进行Web应用的一键构建打包和部署；",
          "对Ant Design进行二次封装，处理各种复杂业务需求下的组件的封装；",
          "用Redux进行Web应用的数据流状态的管理以及必要时的数据缓存的工作；",
          "用axios进行网络请求的二次封装，处理多个接口同步/异步访问的复杂业务的处理；",
          "用微信开发者工具进行微信小程序的开发；",
          "用Koa + MongoDB进行文档数据的存储以及对应API的开发；",
          "对新人的代码进行Code review，进行前端技术分享和新人培训；",
          "优化用户体验，对网站进行性监测，以及收集线上用户行为埋点，进行用户行为的分析。",
        ],
      },
      RENPHO,
      BINDO,
      OLD,
    ],
  };

  const MY = {};
  response.send({
    data: { android: ANDROID_DATAS, web: WEB_DATAS, java: JAVA_DATAS }[
      request.query.intent
    ],
    status: true,
  });
});

module.exports = router;
