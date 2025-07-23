- [Phần 1: Flex, Grid Layout:](#phần-1-flex-grid-layout)
- [Flexbox, Flex Attribute: direction, wrap, flow,...](#flexbox-flex-attribute-direction-wrap-flow)
  - [Flexbox](#flexbox)
    - [Khái niệm](#khái-niệm)
    - [Cách hoạt động](#cách-hoạt-động)
    - [Các thuộc tính](#các-thuộc-tính)
      - [Không sử dụng flexbox](#không-sử-dụng-flexbox)
      - [Dùng display để áp dụng flexbox](#dùng-display-để-áp-dụng-flexbox)
      - [flex-direction](#flex-direction)
      - [flex-direction: row-reverse](#flex-direction-row-reverse)
      - [flex-direction: column](#flex-direction-column)
      - [flex-direction: column-reverse](#flex-direction-column-reverse)
      - [flex-wrap](#flex-wrap)
      - [flex-flow](#flex-flow)
      - [justified-content](#justified-content)
      - [align-items](#align-items)
      - [align-content](#align-content)
- [Grid, GridView,...](#grid-gridview)
- [Z-index, Overflow, Align, Justify](#z-index-overflow-align-justify)
- [Phần 2: Responsive:](#phần-2-responsive)
- [Media Query](#media-query)
- [Phần 3: Style 1 số thành phần cơ bản](#phần-3-style-1-số-thành-phần-cơ-bản)
- [Dropdowns](#dropdowns)
- [Forms](#forms)
# Phần 1: Flex, Grid Layout:
# Flexbox, Flex Attribute: direction, wrap, flow,...
## Flexbox
### Khái niệm
- CSS flexbox là một one-dimensional(hay còn gọi là 1D) layout pattern, một trong những pattern giúp bạn dễ dàng thiết kế layout một cách linh hoạt và hiệu quả. Phân chia không gian giữa các items và kiểm soát căn chỉnh chúng trong container flex layout(vùng chứa). Với flexbox, chúng ta có thể dễ dàng sắp xếp các items từ trái sang phải, từ trên xuống dưới, đồng thời kiểm soát khoảng cách và thứ tự của các items trong container.
### Cách hoạt động
- Trước khi đi vào tìm hiểu sâu hơn về Flexbox, chúng ta cần nắm qua cấu trúc của Flexbox là như thế nào đã:
![alt text](img/flexbox.png)

Trong flexbox thì chủ yếu có hai thành phần chính là: thùng chứa cha (flex container) và các phần tử con nằm bên trong (flex items).
Ngoài ra chúng ta cũng cần quan tâm tới một số thuộc tính sau:

- **main start, main end, cross start, cross end**: Điểu bắt đầu của container theo main axis được gọi là main start, điểm kết thúc của container theo main axis gọi là main end, với cross start và cross cũng tương tự nhưng dựa theo cross axis.
- **main axis**: Trục này chính là hướng của các item hiển thị, mặc định thì sẽ chạy từ trái qua phải.
- **cross axis**: Trục này vuông góc với main axis, chạy từ trên xuống dưới.
main size: Là kích thước của mỗi item dựa theo trục main axis.
cross size: Là kích thước của mỗi item dựa theo trục cross axis.
### Các thuộc tính
Dưới đây là một số thuộc tính có thể sử dụng đối với flex container:
- display
- flex-direction
- flex-wrap
- flex-flow
- justified-content
- align-items
- align-content
#### Không sử dụng flexbox
```html
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex1.png)
#### Dùng display để áp dụng flexbox
Chúng ta cần phải sử dụng thuộc tính `display`. Đây là cách mà chúng ta định nghĩa một flex container, và cũng là việc bắt buộc nếu bạn làm việc với flexbox.
```html
<style>
.box {
    display: flex;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex2.png)
#### flex-direction
`flex-direction` dùng để chỉ định hướng hiển thì của các item, việc thay đổi hướng hiển thị flex cũng thể có thể cho phép ta thay đổi vị trí của các flex item.

**flex-direction: row**
`flex-direction: row` là giá trị mặc định khi sử dụng flexbox, không thực hiện bất kỳ thay đổi nào, chỉ đặt các item từ trái qua phải theo trục chính.
```html
<style>
.box {
    display: flex;
    flex-direction: row;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex3.png)
#### flex-direction: row-reverse
Giống với tên gọi, `flex-direction: row-reverse` ngược lại với `row`, các item sẽ được đặt từ phải qua trái.
```html
<style>
.box {
    display: flex;
    flex-direction: row-reverse;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex4.png)
#### flex-direction: column
Khi chúng ta xét `flex-direction: column`, lúc này trục chính sẽ đi từ trên xuống dưới vậy nên giờ đây các items sẽ được xếp chồng lên nhau.
```html
<style>
.box {
    display: flex;
    flex-direction: column;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex5.png)
#### flex-direction: column-reverse
Khi đó các items sẽ được xếp chống lên nhau nhưng theo chiều ngược lại. Hay để ý sẽ thấy ở ví dụ trên (1) sẽ ở trên cùng, nhưng khi sử dụng column-reverse (1) sẽ ở dưới cùng.
```css
<style>
.box {
    display: flex;
    flex-direction: column-reverse;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![alt text](img/ex6.png)
#### flex-wrap
`flex-wrap` dùng để kiểm soát việc bọc các items nằm gọn trong container. Nếu chúng ta giảm chiều rộng của trình duyệt, chúng ta có thể không nhìn thấy một số item trên cùng một dòng. Thuộc tính `flex-wrap` có thể giải quyết vấn đề đó:

- nowrap (mặc định): Không có gì thay đổi
- wrap: các items sẽ được bọc trọn trong container
- wrap-reverse
```html
<style>
.box {
    display: flex;
    flex-wrap: nowrap;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
    <div class="box-item">5</div>
    <div class="box-item">6</div>
    <div class="box-item">7</div>
    <div class="box-item">8</div>
    <div class="box-item">9</div>
</div>
```
nowrap
![img/ex7.png](img/ex7.png)
wrap
![alt text](img/ex8.png)
wrap-reverse
![alt text](img/ex9.png)
#### flex-flow
`flex-flow` là cách viết rút gọn của `flex-direction` và `flex-wrap`. Trong `flex-flow` giá trị đầu tiên là `flex-direction` và thứ 2 là `flex-wrap`
```html
<style>
.box {
  display: flex;
  flex-flow: row-reverse wrap;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
    <div class="box-item">5</div>
    <div class="box-item">6</div>
    <div class="box-item">7</div>
    <div class="box-item">8</div>
    <div class="box-item">9</div>
</div>
```
![alt text](img/ex10.png)
#### justified-content

`justified-content` dùng để căn chỉnh vị trí của các items so với trục chính(main axis). Có 6 giá trị có thể dùng đối với thuộc tính `justified-content`:

- flex-start: sẽ đặt item bắt đầu từ main start (và đây cũng là giá trị mặc định)
- flex-end:sẽ đặt item bắt đầu từ main end
- center: sẽ đặt tất cả item ở giữa trục main axis
- space-between: sẽ chia đều khoảng cách thừa và thêm nó vào giữa các item
- space-around: sẽ chia khoảng cách ở đầu và cuối. Khoảng cách ở đầu và cuối sẽ bằng 1 nửa khoảng cách ở giữa 2 item với nhau
- space-evenly: sẽ chia khoảng cách đều khoảng cách giữa các item với item, item và main start, item với main end bằng nhau
```html

<style>
.box {
  display: flex;
  justify-content: flex-start;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
flex-start
![alt text](img/ex11.png)
flex-end
![alt text](img/ex12.png)
center
![alt text](img/ex13.png)
space-between
![alt text](img/ex14.png)
space-around
![alt text](img/ex15.png)
space-evenly
![alt text](img/ex16.png)
#### align-items
Thuộc tính `align-items` dùng để xác định cách mà các flex item được đặt trong container dọc theo chiều cross axis.

- `align-items: stretch`: Chiều dài của item sẽ bằng chiều dài của cross axis.
- `align-items: flex-start`: Item được đặt ở điểm bắt đầu của cross start(trên cùng bên trái), và kích thước item không bị thay đổi.
- `align-items: flex-end`: Item được đặt ở điểm bắt đầu của cross end(dưới cùng bên trái)
- `align-items: center`: Item được đặt ở giữa điểm bắt đầu của cross start và điểm bắt đầu của cross end (ở giữa bên trái)
- `align-items: baseline`: Item sẽ được đặt dữ theo các ký tự thuộc item đó. Mục đích chính là căn chỉnh dữa liệu dòng văn bản của các item.
```html
<style>
.box {
  height: 300px;
  display: flex;
  align-items: stretch;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
align-items: stretch
![alt text](img/ex17.png)
align-items: flex-start
![alt text](img/ex18.png)
align-items: flex-end
![alt text](img/ex19.png)
align-items: center
![alt text](img/ex20.png)
align-items: baseline
![alt text](img/ex21.png)
#### align-content
Tương tự như `justify-content` chỉ khác một chỗ là thay vì căn theo trục main axis thì `align-content` căn theo trục cros axis.

- `align-content: stretch`
- `align-content: flex-start`
- `align-content: flex-end-`
- `align-content: center`
- `align-content: space-between`
- `align-content: space-around`
```html
<style>
.box {
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
align-content: stretch
![alt text](img/ex22.png)
align-content: flex-start
![alt text](img/ex23.png)
align-content: flex-end
![alt text](img/ex24.png)
align-content: center
![alt text](img/ex25.png)
align-content: space-between
![alt text](img/ex26.png)
align-content: space-around
![alt text](img/ex27.png)
# Grid, GridView,...
# Z-index, Overflow, Align, Justify
# Phần 2: Responsive:
# Media Query
# Phần 3: Style 1 số thành phần cơ bản
# Dropdowns
# Forms
