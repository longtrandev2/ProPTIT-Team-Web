- [CSS selectors: Khái niệm, cú pháp](#css-selectors-khái-niệm-cú-pháp)
  - [Khái niệm](#khái-niệm)
  - [8 Loại CSS selectors](#8-loại-css-selectors)
    - [1. Basic CSS Selectors](#1-basic-css-selectors)
    - [2. Descendant CSS Selectors](#2-descendant-css-selectors)
    - [3. Multiple CSS Selector](#3-multiple-css-selector)
    - [4. Combination CSS Selectors](#4-combination-css-selectors)
    - [5. Sibling CSS Selectors](#5-sibling-css-selectors)
    - [6. Pseudo CSS Selectors](#6-pseudo-css-selectors)
    - [7. Pseudo CSS Selectors (link và input)](#7-pseudo-css-selectors-link-và-input)
    - [8. Attribute CSS Selectors](#8-attribute-css-selectors)
- [3 kiểu chèn CSS](#3-kiểu-chèn-css)
    - [a. Inline CSS:](#a-inline-css)
    - [b. Internal CSS:](#b-internal-css)
  - [Thứ tự ưu tiên](#thứ-tự-ưu-tiên)
    - [1.Inernal, External -\> Cái](#1inernal-external---cái)
- [Colors, Backgrounds, Height, Width, Z-index, Overflow, Opacity](#colors-backgrounds-height-width-z-index-overflow-opacity)
- [Box Model, Borders, Padding, Margins](#box-model-borders-padding-margins)
- [Text, Fonts, Icons, List, Table](#text-fonts-icons-list-table)
- [Display (inline, block, none)](#display-inline-block-none)
- [Position (static, fixed, realative, absolute, sticky, ...)](#position-static-fixed-realative-absolute-sticky-)
- [Combinator selectors](#combinator-selectors)
- ["Pseudo-elements](#pseudo-elements)
- [Pseudo-classes"](#pseudo-classes)
- [Relative \& Absolute Units (rem, em, cm, px, ...)](#relative--absolute-units-rem-em-cm-px-)
- [!important](#important)
- [Math Functions](#math-functions)
- [Variables, Box Sizing, Reset CSS](#variables-box-sizing-reset-css)


# CSS selectors: Khái niệm, cú pháp 
## Khái niệm
- Hiểu đơn giản CSS Selector là thứ cho phép bạn nhắm mục tiêu tới các phần tử HTML để áp dụng các thuộc tính CSS cho chúng.

- CSS Selector giống như là đường đẫn, chỉ định để cho CSS biết bạn đang muốn điều chỉnh, tạo kiểu cho phần tử HTML nào vậy.
## 8 Loại CSS selectors
### 1. Basic CSS Selectors
- Bộ chọn CSS cơ bản (Basic CSS Selector) sử dụng chọn element / class / id.
- Chúng được sử dụng thường xuyên nhất và dễ nhớ nhất.
```html
<div id="app">
  <div class="container">
    <p class="hello">Hello</p>
    <p class="hola">Hola</p>
  </div>
  <div class="other">
    I am left behind...
  </div>
</div>
```
- Element Selector: `Element`. Nó chọn bất kỳ phần tử nào đó.

```css
p { color: blue; }
div { color: magenta; }
```

- `Class Selector`: .class. Nó chọn tất cả các phần tử có `class` đã cho.
```css
.hello {
  color: red;
}
```
- ID Selector: `#id`. Nó chọn tất cả các phần tử có `id` đã cho.
```css
#app {
  color: red;
}
```
- Universal selector: `*`. Nó chọn tất cả các phần tử.
```css
* {
  color: yellow;
}
```
### 2. Descendant CSS Selectors
- Đây là các **CSS Selector để chọn hậu duệ** của bất kỳ phần tử nào.

```html
<div class="container">
  <div class="paragraph-container">
    <p id="hola-id" class="hola-class">Hola World</p>
    <p class="hello-class">Hello World</p>
    <p class="hello-class again-class">Hello Again World</p>
  </div>
</div>
```
- Any descendant selector: `A B`. Chọn bất kỳ phần tử B nào là hậu duệ của A. Hậu duệ có thể được lồng rất sâu.
```css
.container .hello-class {
  color: red;
}
```
- Chúng ta có thể kết hợp với `*` để chọn tất cả các phần tử hậu duệ:
```css
.paragraph-container * {
  color: blue;
}
``` 
- CSS Selector trên chọn mọi phần tử bên trong `.paragraph-container`
- Child Selector: `A > B`. Không giống như *Any Descendant CSS Selector, CSS Selector này* chỉ chọn hậu duệ trực tiếp.

```css
.paragraph-container > .hello-class {
  color: blue;
}
```
- Trong khi đó, CSS Selector bên dưới sẽ không hoạt động vì class .`hello-class `trong HTML này không phải là hậu duệ trực tiếp.
```css
.container > .hello-class {
  color: blue;
}
```
### 3. Multiple CSS Selector
- Multiple CSS Selector cho phép chúng ta chọn nhiều phần tử không liên quan với nhau.
```html
<div class="container">
  <div class="paragraph-container">
    <p id="hola-id" class="hola-class">Hola world</p>
    <p class="hello-class">Hello world</p>
    <p class="hello-class again-class">Hello again world</p>
  </div>
  <p class="outside-class">I'm outside</p>
</div>
```
- Multiple CSS Selector: `A, B, C, D ... .` Để chọn nhiều phần tử / class / id.
```css
.outside-class, .again-class, .hola-class {
  color: purple;
}
```
### 4. Combination CSS Selectors
- Conbination CSS Selector cho phép bạn chọn thành phần rất cụ thể bằng nhiều tham chiếu.

- Trường hợp sử dụng phổ biến nhất là hiệu ứng làm nổi bật button khi được di chuột (hovered) / nhấp (clicked) bằng cách cung cấp cho chúng một class .active.
```html
<div class="container">
  <div class="paragraph-container">
    <p id="hola-id" class="hola-class">Hola world</p>
    <p class="hello-class">Hello world</p>
    <p class="hello-class active">Hello again world</p>
  </div>
  <p class="outside-class">I'm outside</p>
</div>
```
- Combination CSS Selector: AB. Cho phép chọn phần tử chứa cả A và B. Cú pháp trông giống như Descendant CSS Selector, ngoại trừ phần này không có khoảng trắng.
```css
p.active {
  color: yellow;
}
```
- Chúng ta có thể kết hợp nhiều thứ, không phải chỉ có class. (Nhớ là để chúng sát với nhau)
```css
p#hola-id {
  color: blue;
}
.hello-class.active {
  color: red;
}
```
### 5. Sibling CSS Selectors
- **Sibling CSS Selector** nhắm chọn các phần tử anh chị em.
```html
<div class="container">
  <div class="paragraph-container">
    <p id="hola-id" class="hola-class">Hola world</p>
    <p class="hello-class">Hello world</p>
    <p class="hello-class again-class">Hello again world</p>
  </div>
  <p class="outside-class">I'm outside</p>
</div>
```
- Bộ chọn Anh / Chị / Em liền kề (Nghiêm ngặt): `A + B`. Nhắm mục tiêu một phần tử anh chị em được đặt ngay sau phần tử đó.
```css
#hola-id + .hello-class {
  color: blue;
}
```
- Bộ chọn Anh / Chị / Em liền kề (Không nghiêm ngặt): A ~ B. Giống như bộ chọn bên trên nhưng không giới hạn 1 phần tử đầu tiên.
```css
#hola-id ~ .hello-class {
  color: purple;
}
```
- Bạn thấy không, nó chọn cả thẻ p bên dưới vì chúng là phần tử anh chị em với nhau và có class là .hello-class

- Lưu ý: Bộ chọn này không hoạt động ngược lại.

- Thế nên CSS bên dưới không hoạt động.
```css
.again-class ~ #hola-id {
  color: red
}
```
### 6. Pseudo CSS Selectors
```html
<div class="container">
  <div class="paragraph-container">
    <p id="hola-id" class="hola-class">Hola world</p>
    <p class="hello-class">Hello world</p>
    <p class="hello-class again-class">Hello again world</p>
  </div>

  <p class="outside-class">I'm outside</p>

  <ul id="list-id" class="list-class">
    <li class="list-item-class">First</li>
    <li class="list-item-class">Second</li>
    <li class="list-item-class">Third</li>
    <li class="list-item-class">Fourth</li>
    <li class="list-item-class">Fifth</li>
  </ul>

  <div class="single-paragraph-container">
    <p>I'm the only child of this span</p>
  </div>
</div>
```
- Chọn phần tử đầu tiên: `A:first-child`. Nó chọn đến phần tử con đầu tiên. (A phải có cha mẹ).
```css

li:first-child {
  color: blue;
}
```
- Chọn phần tử con cuối cùng: A:`last-child`. Hoạt động như A:`first-child`, ngoại trừ thay vì chọn phần tử con đầu tiên, nó chọn phần tử con cuối cùng.
```css
li:last-child {
  color: purple;
}
```
- Chỉ chọn phần tử con: A:`only-child`. Chọn tất cả A là con duy nhất của cha mẹ nó. Tương tự như bộ chọn phần tử con đầu tiên (A:first-child) và phần tử con cuối cùng (A:last-child). Ngoại trừ mục tiêu không được có anh chị em nào.
```css
p:only-child {
  color: red;
}
```
- Bộ chọn phần tử con thứ N: A:`nth-child(n)`. Nó chọn từng mục tiêu là con thứ n của cha mẹ nó.
```css
li:nth-child(2) {
  color: red;
}
```
- Bộ chọn con thứ N cuối cùng: A:`nth-last-child(n)`. Nó tương tự như bộ chọn con thứ N, ngoại trừ nó được tính từ cuối cùng.
```css
li:nth-last-child(2) {
  color: red;
}
```
- Không chọn: A:`not(B)`. Chọn tất cả các phần tử A mà không phải B.
```css
p:not(.outside-class) {
  color: blue;
}
```

- Bộ chọn loại đầu tiên: A:`first-of-type`. Nó chọn phần tử đầu tiên thuộc loại này trong số các phần tử anh chị em của nó.
```css
li:first-of-type {
  color: blue;
}
```
- Bộ chọn loại cuối cùng: A:last-of-type. Giống như trên, nhưng ngược lại.
```css
li:last-of-type {
  color: blue;
}
```
- Bộ chọn loại thứ N: A:`nth-of-type(n)`. Cũng giống như hai bộ chọn trên, nhưng nó chọn phần tử thứ N.
```css
li:nth-of-type(2) {
  color: blue;
}
```
- Bộ chọn Only type: A:only-of-type. Chọn phần tử chỉ có loại đó, không có Anh / Chị / Em.
```css
p:only-of-type {
  color: purple;
}
```
### 7. Pseudo CSS Selectors (link và input)
- Dưới đây là danh sách các pesudo selector khác. Chúng thường được liên kết với các liên kết (a) (mặc dù chúng có thể hoạt động với các phần tử không liên kết non-link).
```css
<div id="app">
  <a class="cheesyLink" href="#">I like cheese</a>
  <a class="sweetLink" href="#">I like donut</a>
  <div class="burger">I like cheezburger</div>
  <div class="container">
    <form onsubmit="event.preventDefault()">
      <input class="myinput"type="text" />
      <input class="mysubmit" type="submit" />
    </form>
  </div>
</div>
```
- Hover Selector: `A:hover`. Chọn phần tử được hover. Thường được sử dụng để làm nổi bật các liên kết.
```css
a:hover {
  color: red;
}

.burger:hover {
  color: red;
}
```
- Focus Selector: A:focus. Chọn phần tử bạn đang tập trung vào nó. Thường được sử dụng với input.
```css
input:focus {
  background: red;
}
```
- Active Selector: `A:active`. Chọn phần tử đang có trạng thái active.
```css
.cheesyLink:active {
  background: red;
}
```
- Lưu ý khi bạn click vào nó, nền (background) sẽ thay đổi.


- Link Selector: `A:link`. Nó chọn tất cả các link chưa được click.
```css
a:link {
  background: blue;
}
```
### 8. Attribute CSS Selectors
- Bộ chọn thuộc tính CSS (Attribute CSS Selector) sử dụng để chọn thuộc tính HTML (HTML Attributes).
```html
  <div for="chocolate">Chocolate</div>
  <div for="peanut">Peanut</div>
  <div for="butter">Butter</div>
  <div>Jelly</div>
```
- 
Bộ chọn thuộc tính cơ bản: `A[B]`. Chọn tất cả các phần tử `A` có thuộc tính `B`.
```css
div[for] {
  color: red;
}
```
- Bộ chọn thuộc tính cụ thể: `A[B="C"]`. Chọn các phần tử A có thuộc tính B với giá trị là C.
```css
div[for="chocolate"]{
  color: blue;
}
```
- Bộ chọn thuộc tính cụ thể (Bắt đầu với ...): `A[B^="C"]`. Chọn tất cả các phần tử `A` có thuộc tính `B` với giá trị bắt đầu là `C`. Ký tự `^` là ký tự thể hiện chuỗi bắt đầu (trong **Biểu thức chính quy** (Regex)).
```css
div[for^="cho"] {
  color: magenta;
}
```
- Bộ chọn thuộc tính cụ thể (Kết thúc với ...): `A[B$="C"]`. Chọn tất cả các phần tử`A` có thuộc tính `B` với giá trị kết thúc là `C`. Ký tự `$` là ký tự thể hiện chuỗi kết thúc trong (Biểu thức chính quy (Regex)).
```css
div[for$="er"] {
  color: yellow;
}
```
- 
Bộ chọn thuộc tính cụ thể (Chứ ký tự ...): `A[B*="C"]`. Chọn tất cả phần tử `A` với thuộc tính `B` chứa giá trị `C`.
```css
div[for*="ut"]{
  color: cyan;
}
```
# 3 kiểu chèn CSS
### a. Inline CSS: 
- Đây là cách thêm css trực tiếp trên thẻ html cần định dạng. Tập hợp các style css được khai báo bên trong thuộc tính style của thẻ.

- **Ưu điểm** của Internal CSS: Chỉ một trang ảnh hưởng bởi stylesheet Classes và IDs có thể được dùng bởi internal stylesheet. Không cần phải upload nhiều files. HTML và CSS có thể là một file.

- **Nhược điểm** của Internal CSS: Tăng thời gian load time. Nó ảnh hưởng tới một trang – không hữu dụng nếu bạn sử dụng cùng một CSS cho nhiều trang.
```html
<p style="color: red; font-size: 18px;">Đây là đoạn văn có màu đỏ và kích thước 18px.</p>
```
### b. Internal CSS:
- Bạn có thể đặt CSS trực tiếp trong phần của tệp HTML bằng cách sử dụng thẻ `<style>`

- **Ưu điểm** của External CSS: Kích thước trang HTML nhỏ hơn cấu trúc gọn hơn. Tốc độ load trang nhanh hơn. Một file .css có thể được dùng cho nhiều.

- **Nhược điểm** của External CSS: Cho tới khi external CSS được load lên, trang của bạn sẽ không được tải hoàn toàn.
```html
<head>
  <style>
    p {
      color: red;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <p>Đây là đoạn văn có màu đỏ và kích thước 18px.</p>
</body>
```
### c. External CSS: 
- Bạn có thể tạo một tệp CSS riêng biệt (ví dụ: styles.css) và sau đó liên kết tệp CSS đó vào tệp HTML bằng thẻ .

- **Ưu điểm** của Inline CSS: Hữu dụng nếu bạn muốn test hoặc xem trước thay đổi. Hữu dụng để sửa nhanh. Số requests HTTP ít hơn.

- **Nhược điểm** của Inline CSS: Inline CSS phải được áp dụng cho mỗi element.

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <p>Đây là đoạn văn có áp dụng CSS từ tệp styles.css.</p>
</body>
```

## Thứ tự ưu tiên
### 1.Inernal, External -> Cái nào có trước thì ưu tiên
### 2.Inline -> 1000
### 3.id -> 100
### 4.class -> 10
### 5.tag -> 1
### Equal specificity
### Universal selector and inherited ?

# Colors, Backgrounds, Height, Width, Z-index, Overflow, Opacity
## Colors
### 1. Cách khai báo màu:
- **Tên màu**: color: red;
- **Mã HEX**: color: #ff0000;
- **RGB**: color: rgb(255, 0, 0);
- **RGBA** (có độ trong suốt): color: rgba(255, 0, 0, 0.5);
- **HSL**: color: hsl(0, 100%, 50%);
- **HSLA**: color: hsla(0, 100%, 50%, 0.5);

### 2. Áp dụng cho:
- `color`: màu chữ

- `background-color`: màu nền

- `border-color`, `outline-color`
```css
p {
  color: white;
  background-color: black;
}
```
##  Backgrounds
### 1.`background-color` – Màu nền
```css
div {
  background-color: lightblue;
}
```
### 2. `background-image` – Hình nền
```css
div {
  background-image: url("image.jpg");
}
```
### 3. `background-repeat`
- `repeat` (mặc định)

- `no-repeat`

- `repeat-x` / `repeat-y`
```css
div {
  background-repeat: no-repeat;
}
```
### 4. `background-size`
- `cover`: bao phủ toàn bộ

- `contain`: chứa toàn bộ ảnh

- Hoặc kích thước cụ thể: 100px 200px

```css
div {
  background-size: cover;
}
```
### 5. `background-position`
```css
div {
  background-position: center top;
}
```
### 6. background-attachment
- `scroll`, `fixed`, `local`
```css
div {
  background-attachment: fixed;
}
```

### 7. background-clip
https://www.w3schools.com/cssref/playdemo.php?filename=playcss_background-clip
### 8. background-origin
https://www.w3schools.com/cssref/css3_pr_background-origin.php

## Height và Width
### 1. Đơn vị:
- px, em, %, vw, vh
### 2. Thuộc tính:
```css
div {
  width: 300px;
  height: 200px;
}
```
### 3. min-width, max-width, min-height, max-height
```css
img {
  max-width: 100%;
  height: auto;
}
```
## Z-index
### Dùng để xếp chồng phần tử (chỉ hoạt động với phần tử position khác static)
```css
div {
  position: absolute;
  z-index: 10;
}
```
- Số càng lớn thì nằm trên
- Âm được chấp nhận
## Overflow
- Quản lý nội dung tràn ra ngoài vùng hiển thị:
```css
div {
  width: 200px;
  height: 100px;
  overflow: hidden;
}
```
### Các giá trị:
- `visible` (mặc định): không cắt

- `hidden`: ẩn phần tràn ra

- `scroll`: luôn có thanh cuộn

- `auto`: có thanh cuộn nếu cần

```css
div {
  overflow: auto;
}
```
## Opacity
Điều chỉnh độ trong suốt từ 0 đến 1:
```css
div {
  opacity: 0.5; /* 50% trong suốt */
}
```
> Lưu ý: `opacity` ảnh hưởng toàn bộ phần tử và con của nó.

Nếu chỉ muốn màu nền trong suốt mà chữ không bị mờ, dùng `rgba()` hoặc `hsla()`:

```css
div {
  background-color: rgba(0, 0, 0, 0.5);
}
```

# Box Model, Borders, Padding, Margins
![alt text](img/boxmodel.png)
## 1. Content
- **Là phần "ruột" chính** của một phần tử HTML.
- Đây là nơi hiển thị **nội dung thực tế**, như: văn bản, hình ảnh, video,...
- Kích thước được xác định bằng các thuộc tính như `width` và `height`.

## 2. Padding
- **Là khoảng cách bên trong**, nằm giữa nội dung (content) và đường viền (border).
- Tạo khoảng trắng **bên trong phần tử**, giúp "nội dung không bị dính vào viền".
- Màu nền (`background-color`) **áp dụng cả cho padding**.
- Padding **hoàn toàn trong suốt** (không che nội dung khác).

```css
padding: 20px; /* Padding 20px cho cả 4 phía */
padding: 10px 15px; /* Trên-dưới 10px, trái-phải 15px */
padding: 10px 15px 5px /*Trẻn trái-phải dưới*/
padding: 5px 10px 15px 20px/*trên -> phải -> dưới -> trái
```
## 3. Border
- Là đường viền bao quanh padding và nội dung.

- Có thể tùy chỉnh độ dày, kiểu viền, màu sắc,...

- Có thể có hoặc không tùy ý (nếu không khai báo sẽ không hiển thị).
```css
border: 2px solid black; /* Viền 2px, kiểu solid, màu đen */
```
### Một số style
- `dotted` - Defines a dotted border
- `dashed` - Defines a dashed border
- `solid` - Defines a solid border
- `double` - Defines a double border
- `groove` - Defines a 3D grooved border. The effect depends on the border-color value
- `ridge` - Defines a 3D ridged border. The effect depends on the border-color value
- `inset` - Defines a 3D inset border. The effect depends on the border-color value
- `outset` - Defines a 3D outset border. The effect depends on the border-color value
- `none` - Defines no border
- `hidden` - Defines a hidden border
## 4. Margin
- Là khoảng cách bên ngoài border, tạo không gian giữa phần tử này và phần tử khác.

- Không có màu (hoàn toàn trong suốt).

- Không ảnh hưởng tới màu nền hay border của phần tử.

```css
margin: 20px; /* Margin 20px cho cả 4 phía */
margin: 10px auto; /* Trên-dưới 10px, trái-phải tự căn giữa */
```

# Text, Fonts, Icons, List, Table

---

##  1. TEXT - Thẻ văn bản trong HTML

###  Các thẻ HTML thông dụng

| Thẻ       | Chức năng                                | Ví dụ HTML                         |
|-----------|-------------------------------------------|------------------------------------|
| `<p>`     | Đoạn văn                                 | `<p>Đây là đoạn văn.</p>`          |
| `<h1>`~`<h6>` | Tiêu đề, từ lớn (h1) đến nhỏ (h6)     | `<h2>Tiêu đề phụ</h2>`             |
| `<span>`  | Thẻ nội dòng, dùng để bọc đoạn nhỏ       | `<span style="color:red">Hello</span>` |
| `<strong>`| In đậm (nhấn mạnh ngữ nghĩa)              | `<strong>Quan trọng</strong>`     |
| `<b>`     | In đậm (chỉ để làm nổi bật, không nhấn nghĩa)| `<b>In đậm</b>`                 |
| `<em>`    | In nghiêng (nhấn mạnh ngữ nghĩa)          | `<em>Ghi chú</em>`                 |
| `<i>`     | In nghiêng (không nhấn mạnh)              | `<i>Ví dụ</i>`                     |
| `<mark>`  | Bôi vàng                                 | `<mark>Chữ được đánh dấu</mark>`  |
| `<small>` | Nhỏ lại                                   | `<small>Chữ nhỏ</small>`          |
| `<del>`   | Gạch ngang văn bản                        | `<del>Giá cũ</del>`               |
| `<ins>`   | Gạch dưới (được chèn vào)                 | `<ins>Giá mới</ins>`              |

>  **Lưu ý**:
- Dùng `<strong>` và `<em>` ưu tiên hơn `<b>` và `<i>` vì có giá trị **ngữ nghĩa**, tốt cho SEO và đọc màn hình.
- `<p>` không được lồng `<p>` bên trong.

---

##  2. CSS Text Formatting

###  Thuộc tính CSS thường dùng để định dạng văn bản:

```css
selector {
  color: red;                     /* Màu chữ */
  font-size: 18px;                /* Cỡ chữ (px, em, rem, %, vw) */
  font-weight: bold;             /* Độ đậm: normal | bold | 100~900 */
  font-style: italic;            /* Kiểu chữ: normal | italic | oblique */
  text-align: center;            /* Căn lề: left | right | center | justify */
  text-decoration: underline;   /* Gạch chân, line-through, none */
  text-transform: uppercase;     /* Viết hoa: capitalize | lowercase | uppercase */
  letter-spacing: 2px;           /* Giãn chữ */
  line-height: 1.5;              /* Giãn dòng */
}
```
> **Lưu ý**:

- `font-size` dùng rem giúp responsive tốt hơn `px`.

- `text-align`: justify để căn đều hai bên như báo.

- `text-transform` hữu ích khi muốn auto viết hoa toàn bộ tiêu đề.
## 3. Fonts
### CSS Font-family và các thuộc tính liên quan:
```css
body {
  font-family: 'Roboto', Arial, sans-serif; /* Font chính, rồi fallback */
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
}
```

> **Lưu ý**:
- Dùng Google Fonts dễ dàng với:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```
## 4. Icons (biểu tượng)
### Dùng Font Awesome (rất phổ biến)
```html
<!-- CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```
```html
<i class="fa-solid fa-user"></i>
<i class="fa-brands fa-github"></i>
<i class="fa-regular fa-heart"></i>
```
> Lưu ý:

- `fa-solid`, `fa-regular`, `fa-brands` là kiểu icon (đặc, viền, thương hiệu).

- Có thể style icon bằng CSS:
```css
i {
  color: red;
  font-size: 24px;
}
```
## 5. List - Danh sách
### Các loại danh sách
| Thẻ    | Mô tả                           | Ví dụ                    |
| ------ | ------------------------------- | ------------------------ |
| `<ul>` | Danh sách không thứ tự (bullet) | `<ul><li>Item</li></ul>` |
| `<ol>` | Danh sách có thứ tự (1,2,3...)  | `<ol><li>Item</li></ol>` |
| `<li>` | Mỗi phần tử trong danh sách     | `<li>Phần tử</li>`       |
```css
ul {
  list-style-type: square; /* disc | circle | square | none */
  margin-left: 20px;
  padding-left: 0;
}
```
- Có thể dùng `list-style-image: url(icon.png);` để thay bullet bằng hình ảnh.

## 6. Table

###  Các thẻ cơ bản tạo bảng

| Thẻ     | Chức năng |
|---------|-----------|
| `<table>` | Tạo bảng |
| `<tr>`    | Tạo hàng (table row) |
| `<td>`    | Ô dữ liệu (table data cell) |
| `<th>`    | Ô tiêu đề (table header cell) |
| `<thead>` | Phần đầu bảng |
| `<tbody>` | Phần thân bảng |
| `<tfoot>` | Phần chân bảng |
| `<caption>` | Tiêu đề của bảng (hiển thị ở trên bảng) |
| `<colgroup>`, `<col>` | Nhóm cột / định dạng từng cột |

---

###  Thuộc tính của `<table>`

| Thuộc tính      | Ý nghĩa | Ví dụ |
|------------------|--------|--------|
| `border`         | Viền bảng (HTML cũ, nên dùng CSS) | `<table border="1">` |
| `cellspacing`    | Khoảng cách giữa các ô | `<table cellspacing="5">` |
| `cellpadding`    | Khoảng cách trong ô (padding nội bộ) | `<table cellpadding="5">` |
| `width`          | Chiều rộng bảng | `<table width="100%">` |
| `height`         | Chiều cao bảng | `<table height="200px">` |
| `align`          | Căn bảng (left/center/right – đã lỗi thời) | `<table align="center">` |
| `bgcolor`        | Màu nền bảng (HTML cũ) | `<table bgcolor="#f0f0f0">` |
| `style`          | Viết CSS trực tiếp | `<table style="border:1px solid">` |

> **Lưu ý**: Các thuộc tính như `border`, `cellpadding`, `bgcolor`, `align` là **HTML cổ điển (deprecated)** → nên dùng **CSS** thay thế.

---

### Thuộc tính của `<tr>`, `<td>`, `<th>`

####  `<tr>` (table row):

| Thuộc tính | Ý nghĩa | Ví dụ |
|------------|--------|--------|
| `align`    | Căn lề nội dung hàng | `<tr align="center">` |
| `bgcolor`  | Màu nền hàng | `<tr bgcolor="lightblue">` |

####  `<td>` và `<th>`:

| Thuộc tính | Ý nghĩa | Ví dụ |
|------------|--------|--------|
| `colspan`  | Gộp cột | `<td colspan="2">Gộp 2 cột</td>` |
| `rowspan`  | Gộp hàng | `<td rowspan="3">Gộp 3 hàng</td>` |
| `align`    | Căn lề ngang | `<td align="right">` |
| `valign`   | Căn lề dọc (`top`, `middle`, `bottom`) | `<td valign="top">` |
| `width`    | Đặt độ rộng ô | `<td width="150px">` |
| `height`   | Đặt độ cao ô | `<td height="50px">` |
| `bgcolor`  | Màu nền ô | `<td bgcolor="#ffeeee">` |

> **Lưu ý**:
- `<th>` mặc định **chữ in đậm** và **căn giữa**
- Dùng `colspan`/`rowspan` để tạo bảng phức tạp (bảng lưới, thống kê...)

---

### Ví dụ 
```html
<table table boder="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <caption>📅 Thời khoá biểu</caption>
  <thead style="background-color: #f0f0f0;">
    <tr>
      <th>Thứ</th>
      <th>Tiết 1</th>
      <th>Tiết 2</th>
      <th>Tiết 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Thứ 2</td>
      <td>Toán</td>
      <td>Lý</td>
      <td>Hóa</td>
    </tr>
    <tr>
      <td>Thứ 3</td>
      <td colspan="2">Văn (double)</td>
      <td>Thể dục</td>
    </tr>
    <tr>
      <td rowspan="2">Thứ 4</td>
      <td>GDCD</td>
      <td>Toán</td>
      <td>Lý</td>
    </tr>
    <tr>
      <td>Hóa</td>
      <td>Văn</td>
      <td>Sử</td>
    </tr>
  </tbody>
</table>
```
# Display (inline, block, none)
# Position (static, fixed, realative, absolute, sticky, ...)
# Combinator selectors
# "Pseudo-elements 
# Pseudo-classes"
# Relative & Absolute Units (rem, em, cm, px, ...)
### Font Units:
| Unit  | Ý nghĩa            | Ví dụ                   |
| ----- | ------------------ | ----------------------- |
| px    | Cố định            | `font-size: 16px;`      |
| em    | Theo phần tử cha   | `1em = cỡ cha`          |
| rem   | Theo root (`html`) | `1rem = html font-size` |
| %     | Theo phần tử cha   | `font-size: 120%;`      |
| vw/vh | Theo viewport      | `font-size: 2vw;`       |
# !important
# Math Functions
# Variables, Box Sizing, Reset CSS
