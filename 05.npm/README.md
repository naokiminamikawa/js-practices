# guitar-scale-cli

ギターや音楽理論の学習のためのスケール表示CLIです。

### ローカル開発

```bash
npm install
npm link
```

### 実行

```bash
guitar-scale C major
```

出力

```text
C D E F G A B
```

---

```bash
guitar-scale A minor
```

出力

```text
A B C D E F G
```

## 対応スケール

- Major
- Minor

## 開発

### Lint

```bash
npm run lint
```

### Format / Fix

```bash
npm run fix
```

## 技術仕様

Major

```text
全 全 半 全 全 全 半
```

Minor

```text
全 半 全 全 半 全 全
```

スケールは音程パターンを利用して動的に計算しています。
