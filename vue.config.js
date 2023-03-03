const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false // 컴포넌트 이름 여러 글자로 설정 안해도 됨
});
