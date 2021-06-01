# 我的餐廳清單2.1
一個使用Node.js, Express, handlebars, MongoDB打造的餐廳清單網站。可以瀏覽餐廳的資料與評分，並可以使用搜尋功能找到特定名稱或類型的餐廳。於2.0版本，可以自由新增、修改、刪除餐廳。

## 專案畫面
<h4> 專案首頁 </h4>
<img align="center" src="https://github.com/hazelisles/AC-restaurant-list/blob/master/images/main-page-demo-2.1.gif?raw=true" width="750"/>

<h4> 餐廳詳細資訊頁面 </h4>
<img align="center" src="https://github.com/hazelisles/AC-restaurant-list/blob/master/images/detail-page-demo-2.1.gif?raw=true" width="750"/>

## 功能描述
1. 可以在首頁瀏覽所有餐廳與它們的簡單資料
   * 名稱、照片、類別、評分
   * 可以依照選定排序類別進行瀏覽(v2.1)
   
2. 可以由各餐廳照片再點進去看各餐廳的詳細資訊
   * 英文名稱、類別、地址、電話、描述、照片
   * 可由地址後方箭號連結至Google Map
   * 餐廳名稱上方以百分比呈現5星級評分(v2.1)
   * 若有新增餐廳官網資訊可點選餐廳名稱連結至餐廳官網(v2.1)
   
3. 可以透過搜尋餐廳名稱、類別來找到特定的餐廳

4. 可以新增一家餐廳(v2.0)

5. 可以修改一家餐廳的資訊(v2.0)

6. 可以刪除一家餐廳(v2.0)

## 環境建置與需求
* [Node.js](https://nodejs.org/en/): v14.16.1

## 安裝與執行步驟
1. 打開終端機將專案下載至本地執行
```
git clone https://github.com/hazelisles/AC-restaurant-list.git
``` 
2. 進入專案資料夾
```
cd AC-restaurant-list
```
3. 安裝專案需求套件
```
npm install 
npm i nodemon
```
4. 產生預設餐廳資料至 MongoDB
```
npm run seed
```
終端機顯示 `mongodb connected!` 及 `Done!` 即完成資料載入
輸入 Ctrl + C 結束載入工作

5. 啟動伺服器，執行專案
```
npm run dev
```
終端機顯示 `Start listening on http://localhost:3000` 及 `mongodb connected!` 即成功啟動，可至 [http://localhost:3000](http://localhost:3000) 開始使用！

## 開發人員
[Hazel Chu](https://github.com/hazelisles)
