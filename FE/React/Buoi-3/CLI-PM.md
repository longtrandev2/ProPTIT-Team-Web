# Tên gọi chung của mảng kỹ năng

**Frontend Tooling & Build Systems** (còn gọi là **JavaScript/Web Dev Toolchain**):
bao gồm *package managers (npm/yarn/pnpm), bundlers/dev servers (Vite/Webpack), CLI tools, cấu hình (Tailwind/PostCSS/TypeScript/ESLint/Prettier), lockfile, env, scripts…*

---

# Node & Frontend Tooling Cheat Sheet (npm • npx • yarn • configs)

## 1) Mental model (khung tư duy)

Bạn sẽ luôn có 3 lớp tool:

1. **Package manager** – cài thư viện: `npm`, `yarn`, `pnpm`.
2. **CLI / Bundler / Framework** – chạy dev server & build: `vite`, `next`, `webpack`, `cra`…
3. **Plugin / Processor** – xử lý CSS/JS: `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `eslint`, `prettier`.

**Luồng chung:** cài lib (PM) → chạy CLI qua `scripts` → đọc **config files** → dev server/build.

---

## 2) Các file “cấu hình” thường gặp

* **`package.json`**:

  * `scripts`: alias lệnh CLI (ví dụ `dev`, `build`…)
  * `dependencies` vs `devDependencies`
  * (tuỳ) `type:"module"`, `engines`, `browserslist`, `packageManager`…
* **Lockfile**: cố định phiên bản đã cài

  * npm: `package-lock.json` • yarn: `yarn.lock` • pnpm: `pnpm-lock.yaml`
* **`node_modules/`**: nơi đặt thư viện (không commit).
* **Bundler config**: `vite.config.ts/js`, `webpack.config.js`…
* **Tailwind / PostCSS**: `tailwind.config.js`, `postcss.config.js`
* **TypeScript**: `tsconfig.json`
* **Lint/Format**: `.eslintrc.*`, `.prettierrc.*`
* **Env**: `.env`, `.env.local` (Vite yêu cầu biến bắt đầu bằng `VITE_`)
* **Khác**: `.gitignore`, `README.md`, `src/`, `public/`

> Quy tắc vàng: tool có CLI gần như chắc có file `*.config.*` cùng tên.

---

## 3) `npm`, `npx`, `yarn`, `pnpm` – dùng khi nào?

* **npm** (mặc định với Node):

  * Cài lib: `npm i <pkg>` • Dev-only: `npm i -D <pkg>`
  * Gỡ: `npm uninstall <pkg>`
  * Chạy script: `npm run dev`
  * Chạy one-off binary: **`npx <bin>`** (vd: `npx tailwindcss init -p`)
* **yarn**:

  * v1: `yarn add`, `yarn add -D`, chạy script: `yarn dev`
  * v2+ (Berry): one-off tương đương `npx` là **`yarn dlx <bin>`**
* **pnpm** (nhanh, tiết kiệm ổ cứng):

  * `pnpm add`, `pnpm add -D`, chạy script: `pnpm dev`, one-off: `pnpm dlx`

> `npx`/`dlx` = chạy tạm một CLI (ưu tiên bản local nếu có). Không cần cài global.

---

## 4) Map lệnh nhanh (npm ↔ yarn ↔ pnpm)

| Tác vụ      | npm            | yarn (v1)                 | yarn (v2+)        | pnpm              |
| ----------- | -------------- | ------------------------- | ----------------- | ----------------- |
| Khởi tạo    | `npm init -y`  | `yarn init -y`            | `yarn init -y`    | `pnpm init`       |
| Cài deps    | `npm i pkg`    | `yarn add pkg`            | `yarn add pkg`    | `pnpm add pkg`    |
| Cài dev     | `npm i -D pkg` | `yarn add -D pkg`         | `yarn add -D pkg` | `pnpm add -D pkg` |
| Chạy script | `npm run dev`  | `yarn dev`                | `yarn dev`        | `pnpm dev`        |
| One-off bin | `npx bin`      | *(nếu đã cài)* `yarn bin` | `yarn dlx bin`    | `pnpm dlx bin`    |

---

## 5) `scripts` trong `package.json`

Ví dụ tối thiểu:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier -w ."
  }
}
```

* Chạy: `npm run dev` / `yarn dev` / `pnpm dev`
* Có **pre/post hooks**: `prebuild`, `postbuild` tự chạy trước/sau `build`

---

## 6) Versioning cần nhớ

* `^1.2.3` cho phép cập nhật **minor/patch**; `~1.2.3` chỉ **patch**; `1.2.3` **cố định**.
* **Lockfile** mới là thứ quyết định phiên bản thực tế đã cài.
* CI/Prod: ưu tiên `npm ci` (cài đúng lockfile, nhanh & reproducible).

---

## 7) Luồng setup điển hình

1. **Tạo project**

   * Tự build: `npm init -y`
   * Từ template: `npm create vite@latest myapp -- --template react`
2. **Cài libs** (ví dụ Tailwind + PostCSS + Autoprefixer)

   ```bash
   npm i -D tailwindcss postcss autoprefixer
   ```
3. **Khởi tạo config** (nếu tool hỗ trợ)

   ```bash
   npx tailwindcss init -p
   ```
4. **Viết config** và thêm directive vào CSS:

   ```css
   /* src/index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
5. **Thêm/chỉnh `scripts`** rồi chạy `dev`/`build`.

---

## 8) Ba công thức phổ biến (copy là chạy)

### A) React + Vite + Tailwind

```bash
npm create vite@latest myapp -- --template react
cd myapp
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# tailwind.config.js → content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"]
# src/index.css → @tailwind base; @tailwind components; @tailwind utilities;
# main.jsx → import "./index.css";
npm run dev
```

### B) HTML thuần + Tailwind CLI (không bundler)

```bash
npm init -y
npm i -D tailwindcss
npx tailwindcss init
# src/input.css → @tailwind base; @tailwind components; @tailwind utilities;
# build liên tục ra dist/output.css
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### C) Next.js + Tailwind

```bash
npx create-next-app@latest myapp
cd myapp
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# tailwind.config.js → content:
# ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}","./app/**/*.{js,ts,jsx,tsx}"]
npm run dev
```

> Dùng **yarn** thì thay `npm i -D` bằng `yarn add -D`; one-off dùng `yarn dlx`.

---

## 9) Khi nào dùng `npx` vs `npm run`?

* **`npx`**: gọi **một binary chưa cài** (hoặc chỉ cài tạm) – ví dụ scaffold dự án: `npx create-next-app`.
* **`npm run`**: gọi **binary đã là devDependency** trong dự án – đảm bảo đồng nhất trên mọi máy.

---

## 10) Windows / PowerShell tips

Xoá `node_modules` đúng cách:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json  # nếu muốn reset
npm cache verify
npm i
```

Lỗi thường gặp:

* `Missing script: "dev"` → thêm `"dev": "vite"` (và đã cài `vite`).
* Lỗi quyền/đường dẫn → chạy terminal **Administrator**, tránh ký tự lạ trong path.

---

## 11) PostCSS vs Tailwind vs Bundler (ai làm gì?)

* **Tailwind**: quét file theo `content`, sinh utility CSS (và purge unused).
* **PostCSS**: pipeline xử lý CSS; Tailwind hoạt động như **plugin PostCSS** khi dùng bundler.
* **Bundler (Vite/Webpack)**: đọc import JS/CSS, chạy plugin (TS, PostCSS…), bundle & optimize.
* **CLI thuần**: không dùng bundler vẫn có thể build CSS qua `npx tailwindcss ...`.

---

## 12) Patterns nên thuộc lòng

* **Local > Global**: cài CLI vào `devDependencies` và gọi bằng `npm run` → build reproducible.
* **Một nguồn sự thật**: lockfile + `npm ci` trên CI.
* **Config theo tên tool**: muốn chỉnh, mở `*.config.*`.
* **ENV rõ ràng**: Vite cần prefix `VITE_`; Next dùng `.env.local`.
* **Script hoá thao tác**: thêm `clean`, `typecheck`, `format`, `lint`…

Ví dụ:

```json
{
  "scripts": {
    "clean": "rimraf node_modules dist .turbo",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format": "prettier -w ."
  }
}
```

---

## 13) Troubleshooting nhanh

* **ERESOLVE peer deps**: đọc thông báo, khớp phiên bản; tạm thời có thể `--legacy-peer-deps` (không nên dài hạn).
* **`Cannot use import statement outside a module`**: bật ESM (`"type":"module"`) hoặc dùng `.mjs`/Vite template React.
* **`command not found`**: chưa cài vào `devDependencies` hoặc đang chạy ngoài project root.
* **Tailwind không áp dụng**: quên `@tailwind` trong CSS; sai `content` paths; chưa `import` CSS vào entry.

---

## 14) Bonus: Corepack (quản yarn/pnpm chuẩn)

Bật **Corepack** để quản lý phiên bản PM:

```bash
corepack enable
yarn --version
pnpm --version
```

Khai báo PM trong `package.json`:

```json
{
  "packageManager": "pnpm@9.0.0"
}
```

---

## 15) Checklist mở một dự án bất kỳ

1. Mở `package.json` → xem `scripts`, package manager, `engines`.
2. Kiểm tra lockfile → dùng đúng PM (`npm ci`/`yarn install`/`pnpm i`).
3. Tìm config: `vite.config.*`, `tailwind.config.*`, `postcss.config.*`, `tsconfig.json`…
4. `npm run dev` (hoặc tương ứng) → nếu lỗi, đọc log từ trên xuống.
5. Reset khi cần: xoá `node_modules` + lockfile → cài lại.

> Học công nghệ mới chủ yếu thay **tên CLI & file config**; quy trình tư duy y hệt.
