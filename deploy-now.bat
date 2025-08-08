@echo off
echo 🚀 开始部署塔罗牌项目到Vercel...
echo.
echo 📋 步骤1：确保项目已推送到GitHub...
git add .
git commit -m "🚀 准备部署到Vercel"
git push origin main
echo.
echo 📋 步骤2：打开Vercel部署页面...
start https://vercel.com/new/clone?repository-url=https://github.com/Ibook000/Tarot-Insight
echo.
echo ✅ 请在打开的浏览器页面中点击 "Deploy" 按钮
echo 🎯 部署地址预览：https://tarot-insight.vercel.app
echo.
pause