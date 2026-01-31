# 1. Tìm hiểu về Validation

## 1.1. Sử Dụng Spring Boot Validation Starter

Spring Boot cung cấp hỗ trợ **Bean Validation** thông qua `validation starter`.

Để thêm vào dự án (sử dụng Gradle):

```gradle
implementation('org.springframework.boot:spring-boot-starter-validation')
```

Tuy nhiên, nếu bạn đã bao gồm `web starter`, `validation starter` sẽ được tự động thêm vào:

```gradle
implementation('org.springframework.boot:spring-boot-starter-web')
```

> **Lưu ý:** `validation starter` thực chất chỉ thêm    dependency tới một phiên bản tương thích của **Hibernate Validator**, đây là triển khai được sử dụng rộng rãi nhất của đặc tả Bean Validation.

-----

## 1.2. Kiến Thức Cơ Bản về Bean Validation

Về cơ bản, **Bean Validation** hoạt động bằng cách định nghĩa các **ràng buộc (constraints)** cho các trường (**field**) của một **class** bằng cách chú thích chúng với các **annotations** nhất định.

### 1.2.1. Các Validation Annotations Thường Dùng

| Annotation | Mô tả |
| :--- | :--- |
| **`@NotNull`** | Trường không được là **`null`**. |
| **`@NotEmpty`** | Trường là một **Collection** hoặc **Array** không được rỗng. |
| **`@NotBlank`** | Trường là **`String`** không được rỗng (phải có ít nhất một ký tự không phải khoảng trắng). |
| **`@Min`** / **`@Max`** | Trường số phải lớn hơn hoặc nhỏ hơn một giá trị nhất định. |
| **`@Pattern`** | Trường **`String`** phải khớp với một biểu thức chính quy (**regex**) nhất định. |
| **`@Email`** | Trường **`String`** phải là một địa chỉ email hợp lệ. |

**Ví dụ về Entity:**

```java
class Customer {

  @Email
  private String email;

  @NotBlank
  private String name;
  
  // ...
}
```

### 1.2.2. Validator

Để kiểm tra xem một đối tượng có hợp lệ hay không, chúng ta truyền nó vào một **`Validator`**, đối tượng này sẽ kiểm tra các ràng buộc:

```java
Set<ConstraintViolation<Input>> violations = validator.validate(customer);
if (!violations.isEmpty()) {
  throw new ConstraintViolationException(violations);
}
```

-----

## 1.3. `@Validated` và `@Valid`

Trong nhiều trường hợp, Spring tự động thực hiện **validation**. Thay vì tạo đối tượng `Validator` thủ công, chúng ta sử dụng các **annotations** sau:

  * **`@Validated`**: Là **annotation** cấp **class**, dùng để báo cho Spring biết cần **validate** các tham số được truyền vào một phương thức của **class** được chú thích.
  * **`@Valid`**: Đặt trên tham số phương thức hoặc trường (**field**) để báo cho Spring biết đối tượng hoặc trường đó cần được **validate**.

-----

## 1.4. Validation Input cho Spring MVC Controller

Trong một request HTTP đến **Controller**, có ba loại input chính chúng ta có thể **validate**:

1.  **Request Body** (Phần thân của yêu cầu)
2.  **Path Variables** (Biến đường dẫn)
3.  **Request Parameters** (Tham số truy vấn)

### 1.4.1. Validating Request Body

Trong các yêu cầu **POST** và **PUT**, dữ liệu **JSON/XML** thường được truyền trong **Request Body** và được Spring tự động ánh xạ sang đối tượng Java.

**Lớp Input:**

```java
class Input {

  @Min(1)
  @Max(10)
  private int numberBetweenOneAndTen;

  @Pattern(regexp = "^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$")
  private String ipAddress;
  
  // ...
}
```

**Sử dụng `@Valid` trong Controller:**
Chúng ta chú thích tham số **`@RequestBody`** với **`@Valid`**:

```java
@RestController
class ValidateRequestBodyController {

  @PostMapping("/validateBody")
  ResponseEntity<String> validateBody(@Valid @RequestBody Input input) {
    return ResponseEntity.ok("valid");
  }
}
```

  * **Sử dụng `@Valid` trên các Loại phức tạp:** Nếu lớp `Input` chứa một trường là một loại phức tạp khác cần được **validate**, trường đó cũng cần được chú thích bằng **`@Valid`**.
  * **Xử lý Lỗi:** Nếu **validation** thất bại, nó sẽ kích hoạt **`MethodArgumentNotValidException`**. Mặc định, Spring dịch lỗi này thành **HTTP status 400 (Bad Request)**.

### 1.4.2. Validating Path Variables và Request Parameters

Đối với các kiểu dữ liệu nguyên thủy (**`int`**, **`String`**, v.v.) trong biến đường dẫn hoặc tham số truy vấn, cách **validate** hơi khác:

  * **Chú thích cấp Class:** **Controller** phải được chú thích bằng **`@Validated`** (cấp **class**).
  * **Chú thích cấp Tham số:** Các **ràng buộc (constraints)** (ví dụ: `@Min`) được đặt trực tiếp trên tham số phương thức.



```java
@RestController
@Validated // Bắt buộc phải có để validate tham số phương thức
class ValidateParametersController {

  @GetMapping("/validatePathVariable/{id}")
  ResponseEntity<String> validatePathVariable(
      @PathVariable("id") @Min(5) int id) { // Ràng buộc trực tiếp trên tham số
    return ResponseEntity.ok("valid");
  }
  
  @GetMapping("/validateRequestParameter")
  ResponseEntity<String> validateRequestParameter(
      @RequestParam("param") @Min(5) int param) { // Ràng buộc trực tiếp trên tham số
    return ResponseEntity.ok("valid");
  }
}
```

  * **Xử lý Lỗi:** Nếu **validation** thất bại, nó kích hoạt **`ConstraintViolationException`** (khác với `MethodArgumentNotValidException` của **Request Body**).
  * **Tùy chỉnh Xử lý Lỗi:** Theo mặc định, **`ConstraintViolationException`** gây ra **HTTP status 500 (Internal Server Error)**. Để trả về status **400 (Bad Request)**, chúng ta cần thêm một **`ExceptionHandler`**:

```java
@ExceptionHandler(ConstraintViolationException.class)
@ResponseStatus(HttpStatus.BAD_REQUEST)
ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
  return new ResponseEntity<>("not valid due to validation error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
}
```

-----

## 1.5. Validating Input cho Spring Service Method

Chúng ta có thể **validate** input cho bất kỳ **Spring Component** nào (ví dụ: **Service**) bằng cách kết hợp **`@Validated`** (cấp **class**) và **`@Valid`** (trên tham số):

```java
@Service
@Validated // Bắt buộc phải có trên class
class ValidatingService{

    void validateInput(@Valid Input input){ // @Valid trên tham số
      // do something    
    }
}
```

  * Nếu **validation** thất bại, nó sẽ ném ra **`ConstraintViolationException`**.

-----

## 1.6. Validating JPA Entities

Lớp phòng thủ cuối cùng cho **validation** là tầng **persistence (JPA Entities)**.

  * **Hibernate** (được sử dụng bởi **Spring Data**) hỗ trợ **Bean Validation** ngay từ đầu.
  * Chỉ cần thêm các **annotation ràng buộc (constraints)** vào các trường của **Entity**:



```java
@Entity
public class Input {

  @Id
  @GeneratedValue
  private Long id;

  @Min(1)
  @Max(10)
  private int numberBetweenOneAndTen;

  @Pattern(regexp = "^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$")
  private String ipAddress;
  
  // ...  
}
```

  * Bất cứ khi nào **Repository** được sử dụng để lưu trữ một đối tượng vi phạm ràng buộc, nó sẽ ném ra **`ConstraintViolationException`**.
  * **Lưu ý:** **Bean Validation** chỉ được kích hoạt bởi **Hibernate** khi **`EntityManager`** được **flush** (được thực hiện tự động trong một số trường hợp, nhưng đôi khi cần thực hiện thủ công, ví dụ trong **Integration Test**).
  * **Tắt Validation:** Có thể tắt **Bean Validation** trong **Spring Data repositories** bằng cách đặt thuộc tính: `spring.jpa.properties.javax.persistence.validation.mode` thành `none`.

-----

## 1.7. Custom Validator với Spring Boot

Nếu các **annotation** có sẵn không đủ, bạn có thể tạo **custom validator** riêng.

### 1.7.1. Tạo Custom Constraint Annotation (`@IpAddress`)

Một **custom annotation** phải có các thuộc tính sau:

  * **`message`**: Chỉ đến key trong `ValidationMessages.properties` để giải quyết thông báo lỗi.
  * **`groups`**: Cho phép định nghĩa **validation group** (sẽ nói sau).
  * **`payload`**: Cho phép định nghĩa **payload** (ít dùng).
  * **`@Constraint(validatedBy = IpAddressValidator.class)`**: Chỉ đến lớp triển khai **`ConstraintValidator`**.



```java
@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = IpAddressValidator.class)
@Documented
public @interface IpAddress {
  String message() default "{IpAddress.invalid}";
  Class<?>[] groups() default { };
  Class<? extends Payload>[] payload() default { };
}
```

### 1.7.2. Triển khai Validator (`IpAddressValidator`)

Lớp **validator** phải triển khai **interface** **`ConstraintValidator<A, T>`** (trong đó **`A`** là **annotation**, **`T`** là kiểu dữ liệu của trường).

```java
class IpAddressValidator implements ConstraintValidator<IpAddress, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    // Logic kiểm tra IP (bao gồm kiểm tra octet > 255)
    // ...
    try {
      // ... kiểm tra regex và giá trị octet ...
      return true; // Hợp lệ
    } catch (Exception e) {
      return false; // Không hợp lệ
    }
  }
}
```

Sau đó, bạn có thể sử dụng `@IpAddress` như bất kỳ **annotation ràng buộc** nào khác.

-----

## 1.8. Validating Programmatically (Thủ công)

Nếu bạn không muốn dựa vào hỗ trợ tích hợp sẵn của Spring, bạn có thể gọi API **Bean Validation** trực tiếp.

### 1.8.1. Tạo Validator thủ công (Không cần Spring)

```java
class ProgrammaticallyValidatingService {
  
  void validateInput(Input input) {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();
    Set<ConstraintViolation<Input>> violations = validator.validate(input);
    if (!violations.isEmpty()) {
      throw new ConstraintViolationException(violations);
    }
  }
}
```

### 1.8.2. Sử dụng Validator được Inject bởi Spring

Spring Boot cung cấp một **instance** **`Validator`** đã được cấu hình sẵn, bạn có thể **inject** nó vào **Service**:

```java
@Service
class ProgrammaticallyValidatingService {

  private Validator validator;

  // Spring tự động inject Validator vào constructor
  ProgrammaticallyValidatingService(Validator validator) { 
    this.validator = validator;
  }

  void validateInputWithInjectedValidator(Input input) {
    Set<ConstraintViolation<Input>> violations = validator.validate(input);
    if (!violations.isEmpty()) {
      throw new ConstraintViolationException(violations);
    }
  }
}
```

-----

## 1.9. Sử Dụng Validation Groups

**Validation Groups** là tính năng cho phép bạn định nghĩa các quy tắc **validation** chỉ được kích hoạt trong các trường hợp sử dụng (**use case**) cụ thể (ví dụ: "Create" và "Update").

### 1.9.1. Định nghĩa Marker Interfaces

Tạo các **interface trống (marker interfaces)** để đại diện cho các nhóm **validation**:

```java
interface OnCreate {}
interface OnUpdate {}
```

### 1.9.2. Áp dụng Groups cho Constraint Annotations

Sử dụng thuộc tính **`groups`** trong **constraint annotation**:

```java
class InputWithGroups {

  @Null(groups = OnCreate.class) // Phải là NULL khi Tạo
  @NotNull(groups = OnUpdate.class) // Không được NULL khi Cập nhật
  private Long id;
  
  // ...  
}
```

### 1.9.3. Kích hoạt Group bằng `@Validated`

Sử dụng **`@Validated`** (cấp **class**) và chỉ định nhóm **validation** cần kích hoạt trong **`@Validated`** (cấp phương thức):

```java
@Service
@Validated // Bắt buộc trên class
class ValidatingServiceWithGroups {

    @Validated(OnCreate.class) // Kích hoạt nhóm OnCreate
    void validateForCreate(@Valid InputWithGroups input){
      // do something    
    }

    @Validated(OnUpdate.class) // Kích hoạt nhóm OnUpdate
    void validateForUpdate(@Valid InputWithGroups input){
      // do something    
    }
}
```

> **Lưu ý về Validation Groups:** Việc sử dụng groups có thể trở thành **anti-pattern** vì nó trộn lẫn các mối quan tâm (**concerns**): **entity** phải biết các quy tắc **validation** cho tất cả các **use case** mà nó được sử dụng.

-----

## 1.10. Xử Lý Lỗi Validation

Khi **validation** thất bại, chúng ta nên trả về một cấu trúc dữ liệu lỗi có ý nghĩa, chứa chi tiết về từng lỗi cho **client**.

### 1.10.1. Định nghĩa Cấu trúc Lỗi

```java
public class ValidationErrorResponse {
  private List<Violation> violations = new ArrayList<>();
  // ... getter/setter/constructor
}

public class Violation {
  private final String fieldName;
  private final String message;
  // ... constructor/getter
}
```

### 1.10.2. Tạo Global Exception Handler (`@ControllerAdvice`)

Sử dụng **`@ControllerAdvice`** để xử lý tập trung các **ngoại lệ validation**:

```java
@ControllerAdvice
class ErrorHandlingControllerAdvice {

  // Xử lý lỗi cho Path Variables, Request Params, Service (ConstraintViolationException)
  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  ValidationErrorResponse onConstraintValidationException(
      ConstraintViolationException e) {
    ValidationErrorResponse error = new ValidationErrorResponse();
    for (ConstraintViolation violation : e.getConstraintViolations()) {
      error.getViolations().add(
        new Violation(violation.getPropertyPath().toString(), violation.getMessage()));
    }
    return error;
  }

  // Xử lý lỗi cho Request Body (MethodArgumentNotValidException)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  ValidationErrorResponse onMethodArgumentNotValidException(
      MethodArgumentNotValidException e) {
    ValidationErrorResponse error = new ValidationErrorResponse();
    for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
      error.getViolations().add(
        new Violation(fieldError.getField(), fieldError.getDefaultMessage()));
    }
    return error;
  }
}
```

**`@ControllerAdvice`** làm cho các phương thức xử lý ngoại lệ này khả dụng trên toàn bộ (**global**) các **controllers** trong ứng dụng, đọc thông tin lỗi từ các **exception** và ánh xạ chúng vào cấu trúc **`ValidationErrorResponse`**.

-----

# 2. Tìm hiểu về Exception handling

## 2.1. Xử Lý Ngoại Lệ Tập Trung trong Spring Boot REST API

**Exception handling** là một phần thiết yếu trong phát triển ứng dụng, đặc biệt là khi xây dựng các **Restful API** trong **Spring Boot**. Mục tiêu là thay vì trả về một lỗi hệ thống (như **HTTP Status 500**) không thân thiện, chúng ta sẽ trả về một phản hồi lỗi có cấu trúc, dễ hiểu cho người dùng/**client**.

### 2.1.1. Giới Thiệu các Annotation Chính

Spring Framework cung cấp một cơ chế mạnh mẽ để xử lý ngoại lệ trên toàn bộ ứng dụng bằng cách sử dụng các **Annotation** cấp **Class** và phương thức.

| Annotation | Loại | Phạm vi | Mục đích |
| :--- | :--- | :--- | :--- |
| **`@ControllerAdvice`** | Cấp **Class** | **Global** | Định nghĩa một **Class** chứa các phương thức xử lý ngoại lệ áp dụng cho **tất cả các `@Controller`** trong ứng dụng. |
| **`@RestControllerAdvice`** | Cấp **Class** | **Global** | Tương tự như **`@ControllerAdvice`**, nhưng kết hợp sẵn với **`@ResponseBody`**. Thường dùng cho **RESTful API** để trả về lỗi dưới dạng **JSON/XML**. |
| **`@ExceptionHandler`** | Cấp **Method** | Trong **Class `@Controller`**/`@ControllerAdvice` | Đánh dấu một phương thức là trình xử lý cho một loại ngoại lệ cụ thể (ví dụ: `IndexOutOfBoundsException.class`). |
| **`@ResponseStatus`** | Cấp **Method** hoặc **Class** | Trong **Handler Method** | Định nghĩa **HTTP status code** mà bạn muốn trả về cho **client**. |

-----

## 2.2. Triển Khai Demo

Chúng ta sẽ xây dựng một ví dụ đơn giản để minh họa việc xử lý ngoại lệ **`IndexOutOfBoundsException`** khi truy cập một đối tượng không tồn tại.

### 2.2.1. Bước 1: Thêm Dependency

Thêm **dependency** cần thiết cho **Spring Boot Web** vào file `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 2.2.2. Bước 2: Tạo Model

Tạo hai đối tượng đơn giản: **`Todo`** (dữ liệu chính) và **`ErrorMessage`** (cấu trúc phản hồi lỗi):

```java
import lombok.Data;
import lombok.AllArgsConstructor;

// Đối tượng dữ liệu chính
@Data
@AllArgsConstructor
public class Todo {
    private String title;
    private String detail;
}

// Đối tượng phản hồi lỗi tùy chỉnh
@Data
@AllArgsConstructor
public class ErrorMessage {
    private int statusCode;
    private String message;
}
```

### 2.2.3. Bước 3: Tạo Rest Controller (`RestApiController.java`)

**Controller** giả lập một danh sách **`Todo`** có sẵn. Phương thức **`getTodo`** sẽ ném ra **`IndexOutOfBoundsException`** nếu `todoId` không tồn tại trong danh sách.

```java
import org.springframework.web.bind.annotation.*;
import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/v1")
public class RestApiController {

    private List<Todo> todoList;

    @PostConstruct
    public void init() {
        // Khởi tạo danh sách 10 đối tượng (index 0 đến 9)
        todoList = IntStream.range(0, 10)
                 .mapToObj(i -> new Todo("title-" + i, "detail-" + i))
                 .collect(Collectors.toList());
    }

    @GetMapping("/todo/{todoId}")
    public Todo getTodo(@PathVariable(name = "todoId") Integer todoId) {
        // Nếu todoId > 9, IndexOutOfBoundsException sẽ bị ném ra
        return todoList.get(todoId); 
    }
}
```

### 2.2.4. Bước 4: Tạo Exception Handler Tập Trung (`ApiExceptionHandler.java`)

Sử dụng **`@RestControllerAdvice`** để áp dụng **Handler** này cho tất cả các **Rest Controller**:

```java
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.http.HttpStatus;

@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Xử lý ngoại lệ IndexOutOfBoundsException
     */
    @ExceptionHandler(IndexOutOfBoundsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST) // Định nghĩa HTTP Status 400
    public ErrorMessage todoException(Exception ex, WebRequest request) {
        // Tùy chỉnh ErrorMessage được trả về
        return new ErrorMessage(10100, "Đối tượng không tồn tại");
    }
    
    // Có thể thêm nhiều @ExceptionHandler khác tại đây
}
```

  * **`@RestControllerAdvice`**: Đảm bảo rằng Spring sẽ quét **Class** này để tìm các phương thức xử lý ngoại lệ.
  * **`@ExceptionHandler(IndexOutOfBoundsException.class)`**: Chỉ định rằng phương thức này sẽ xử lý mọi **`IndexOutOfBoundsException`** xảy ra trong bất kỳ **Controller** nào.
  * **`@ResponseStatus(value = HttpStatus.BAD_REQUEST)`**: Đặt **HTTP Status code** của phản hồi là **400 Bad Request**.

### 2.2.5. Bước 5: Chạy Thử và Kiểm tra

Chạy ứng dụng **Spring Boot** và gửi một request với `todoId` không hợp lệ (ví dụ: `11`):

```bash
GET http://localhost:8080/api/v1/todo/11
```

**Kết quả nhận được (HTTP Status 400 Bad Request):**

```json
{
"statusCode": 10100,
"message": "Đối tượng không tồn tại"
}
```

-----

## 2.3. Tóm Lược

Việc sử dụng **`@RestControllerAdvice`** (hoặc **`@ControllerAdvice`**) kết hợp với **`@ExceptionHandler`** cho phép bạn tạo ra một cơ chế xử lý ngoại lệ **tập trung và đồng nhất**. Điều này giúp mã nguồn của bạn sạch sẽ hơn (bằng cách loại bỏ các khối `try-catch` lặp lại trong **Controller**) và cung cấp trải nghiệm người dùng/**client** tốt hơn bằng cách trả về các phản hồi lỗi có cấu trúc và ý nghĩa.

-----

# 3. Override default fetch plan với join fetch / entity graph

## 3.1. Tại Sao Cần Ghi Đè Chiến Lược Fetch?

### 3.1.1. Chiến Lược Tải Mặc Định (LAZY vs EAGER)

Trong **JPA**, các mối quan hệ giữa các **Entity** được định nghĩa với một **chiến lược tải (fetch strategy)** mặc định:

  * **LAZY (Tải Trì hoãn):** Dữ liệu của mối quan hệ sẽ **chưa** được tải cùng với **Entity** gốc. Chúng chỉ được tải khi bạn **thực sự truy cập** chúng (ví dụ: gọi phương thức `get` trong mã code). Đây là mặc định cho các mối quan hệ **1:N** (`@OneToMany`) và **N:M** (`@ManyToMany`).
  * **EAGER (Tải Ngay lập tức):** Dữ liệu của mối quan hệ sẽ **luôn** được tải cùng với **Entity** gốc trong một truy vấn duy nhất. Đây là mặc định cho các mối quan hệ **N:1** (`@ManyToOne`) và **1:1** (`@OneToOne`).

### 3.1.2. Vấn Đề N+1 Select

Vấn đề **N+1 Select** thường xảy ra khi bạn lặp qua một tập hợp các **Entity** và truy cập một mối quan hệ **`LAZY`** của chúng.

1.  **1** truy vấn được thực hiện để lấy danh sách các **Entity** gốc (ví dụ: 100 đối tượng `Student`).
2.  Sau đó, một truy vấn **`SELECT`** mới được thực hiện cho mỗi lần bạn truy cập mối quan hệ **`LAZY`** của mỗi **Entity** (ví dụ: lấy `School` của từng `Student`).
3.  Tổng cộng: $1 + N$ (100) truy vấn.

Để giải quyết vấn đề này, chúng ta cần **ghi đè** chiến lược **`LAZY`** mặc định và buộc **JPA** tải các mối quan hệ cần thiết một cách **EAGER** thông qua một **`JOIN`** ngay trong truy vấn ban đầu.

-----

## 3.2. Phương Pháp 1: Sử Dụng JOIN FETCH (JPQL)

**`JOIN FETCH`** là một cú pháp trong **JPQL (Java Persistence Query Language)** cho phép bạn chỉ định các mối quan hệ nào cần được tải ngay lập tức bằng cách sử dụng **`JOIN`** trong câu lệnh **SQL** gốc.

### 3.2.1. Lý thuyết

  * **Mục đích:** Buộc **Persistence Provider** (Hibernate) sử dụng câu lệnh **`JOIN`** để kéo dữ liệu của các **Entity** liên quan vào kết quả trả về của truy vấn chính.
  * **Cú pháp:** `SELECT e FROM Entity e JOIN FETCH e.relationship`.

### 3.2.2. Ví dụ Code Chi tiết

Giả sử **Entity** **`Student`** có mối quan hệ **`@ManyToOne`** **LAZY** với **`School`**:

```java
// Entity
@Entity
public class Student {
    // ...
    @ManyToOne(fetch = FetchType.LAZY) // Mặc định là LAZY, hoặc bạn cố tình đặt LAZY
    private School school;
    // ...
}

// Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // 1. Ghi đè Fetch Plan với JOIN FETCH
    // Buộc tải eager mối quan hệ 'school'
    @Query("SELECT s FROM Student s JOIN FETCH s.school WHERE s.id = :studentId")
    Optional<Student> findByIdWithSchoolJoinFetch(@Param("studentId") Long studentId);

    // 2. Xử lý One-to-Many với DISTINCT (Cần thiết để tránh lặp lại dữ liệu)
    @Query("SELECT DISTINCT s FROM Student s JOIN FETCH s.school")
    List<Student> findAllStudentsWithSchoolEagerly();
}
```

### 3.2.3. Ưu điểm và Hạn chế

| | Ưu điểm | Hạn chế |
| :--- | :--- | :--- |
| **JOIN FETCH** | **Kiểm soát trực tiếp** cấu trúc câu lệnh `JOIN`. **Không cần cấu hình Entity**. | **Không tái sử dụng**: Phải viết lại cú pháp cho mỗi truy vấn cần ghi đè **Fetch Plan**. |

-----

## 3.3. Phương Pháp 2: Sử Dụng @EntityGraph (JPA Standard)

**`@EntityGraph`** là cơ chế được giới thiệu trong **JPA 2.1**, cho phép bạn định nghĩa các **"đồ thị thực thể" (Entity Graphs)** – các tập hợp thuộc tính cần được tải **EAGERLY** – và áp dụng chúng cho các phương thức **Repository**.

### 3.3.1. Lý thuyết

  * **Mục đích:** Tách biệt định nghĩa truy vấn với định nghĩa **Fetch Plan**. Bạn chỉ cần đặt tên cho **EntityGraph** hoặc mô tả nó, và **JPA** sẽ xử lý việc tạo câu lệnh **`JOIN`** (hoặc `SELECT` thứ cấp) phù hợp.
  * **Vị trí:** Có thể được định nghĩa trên **Entity** (`@NamedEntityGraph`) hoặc trực tiếp trên phương thức **Repository** (`@EntityGraph(attributePaths = {...})`).

### 3.3.2. Ví dụ Code Chi tiết

#### Bước 1: Định nghĩa Graph (Tùy chọn)

Định nghĩa **Graph** trên **Entity** `Student` (chỉ rõ mối quan hệ `school` cần tải):

```java
@Entity
@NamedEntityGraph(
    name = "student-with-school", // Tên của Entity Graph
    attributeNodes = {
        @NamedAttributeNode("school") // Tải eagerly mối quan hệ 'school'
    }
)
public class Student {
    // ...
    @ManyToOne(fetch = FetchType.LAZY)
    private School school; 
    // ...
}
```

#### Bước 2: Áp dụng Graph vào Repository

Áp dụng **`@EntityGraph`** lên phương thức **Repository** để ghi đè **Fetch Plan**:

```java
public interface StudentRepository extends JpaRepository<Student, Long> {

    // 1. Áp dụng EntityGraph đã đặt tên
    @EntityGraph(value = "student-with-school", type = EntityGraph.EntityGraphType.LOAD)
    List<Student> findAll(Sort sort); 
    
    // 2. Định nghĩa EntityGraph ẩn danh (thường dùng)
    @EntityGraph(attributePaths = {"school"}) 
    Optional<Student> findById(Long id);
    
    // 3. EntityGraph cho mối quan hệ lồng nhau
    @EntityGraph(attributePaths = {"school", "school.address"})
    List<Student> findAllWithSchoolAndAddress();
}
```

### 3.3.3. Các Kiểu EntityGraph (`EntityGraphType`)

Kiểu **`EntityGraph`** ảnh hưởng đến cách **JPA** xử lý các thuộc tính **không** được chỉ định trong đồ thị:

  * **`EntityGraphType.FETCH` (Mặc định):** Các thuộc tính được chỉ định trong **`@EntityGraph`** là **EAGER**. Các thuộc tính **LAZY** khác **vẫn là LAZY**. Các thuộc tính **EAGER** khác **vẫn là EAGER**.
  * **`EntityGraphType.LOAD`:** Các thuộc tính được chỉ định trong **`@EntityGraph`** là **EAGER**. Các thuộc tính còn lại sẽ sử dụng chiến lược **mặc định** đã được định nghĩa trên **Entity**.

### 3.3.4. Ưu điểm và Hạn chế

| | Ưu điểm | Hạn chế |
| :--- | :--- | :--- |
| **EntityGraph** | **Tiêu chuẩn JPA** và khả năng **tái sử dụng cao**. **Tách biệt** định nghĩa truy vấn với **Fetch Plan**. | **Cần cấu hình Entity** nếu sử dụng `@NamedEntityGraph`. |

-----

## 3.4. Tổng Kết và Khuyến Nghị

Để ghi đè **Fetch Plan** và giải quyết vấn đề **N+1 Select**, cả hai cơ chế **`JOIN FETCH`** và **`@EntityGraph`** đều là các giải pháp hiệu quả, nhưng chúng phục vụ các mục đích hơi khác nhau.

| Cơ chế | Cú pháp | Ứng dụng | Khuyến nghị |
| :--- | :--- | :--- | :--- |
| **`JOIN FETCH`** | `@Query("... JOIN FETCH ...")` | Khi cần **kiểm soát chi tiết** cú pháp **JPQL** (ví dụ: cần một loại `JOIN` cụ thể, hoặc trong các truy vấn phức tạp). | Sử dụng khi cần **chính xác** câu lệnh **SQL**. |
| **`@EntityGraph`** | `@EntityGraph(attributePaths = {...})` | **Phương pháp ưu tiên.** Khi cần sự rõ ràng, dễ bảo trì, và khả năng **tái sử dụng** cao cho các **Fetch Plan** trên các phương thức **Repository** tiêu chuẩn. | **Ưu tiên sử dụng** để duy trì sự tách biệt giữa logic truy vấn và logic tải dữ liệu. |

**Khuyến nghị chung:** Luôn ưu tiên sử dụng **`@EntityGraph`** cho các truy vấn **Repository** tiêu chuẩn để đảm bảo tính rõ ràng và khả năng bảo trì. Chỉ nên dùng **`JOIN FETCH`** khi **`@EntityGraph`** không thể giải quyết được nhu cầu tải dữ liệu cụ thể của bạn.