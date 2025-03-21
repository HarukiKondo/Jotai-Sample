# Jotai-Sample
React.js用の状態管理ライブラリJotailの調査・検証用リポジトリです。

## Jotai とは

JotaiはReactの状態管理ライブラリの1つ。

状態管理ライブラリは、Reactでは規模が大きいアプリケーションを開発する際に、多くの状態管理が必要になり、結果的に状態の制御が難しくなって開発効率が低下してしまう課題を解決するためのもの。

最近そこで話題になっているのが、 Jotai。

### Jotaiの特徴

- シンプルかつ柔軟に開発が可能
- 軽量なAPI
- TypeScriptで開発されている

### JotaiのCore API

- **atom** :  
    状態管理のための最小単位。グローバルステートとして状態を持つことができる。

- **useAtom** :  
    atomが持っている定義された状態を読み込んで状態管理を行う変数にセットします。ReactのuseStateとほぼ同じ感じ。

- **Store** :  
    Storeは共有するデータの保管場所を定義するものです。 `CreateStore` を使用することで、新しい空のストアを作成することができます。

    - **get** : atomの値を取得する。
    - **set** : atomの値を設定する。  
    - **sub** : atomの値を更新する。

- **Provider** :   
    `Provider` を使用することで、 Providerに閉じられたコンポーネントに限り、atomを使用することが可能になる。

    `Provider` と `Store` を使うことで空間的に切り分けられた環境でatomを使用することができます。

## 参考文献

- [Jotai公式サイト](https://jotai.org/)
- [GitHub - Jotai](https://github.com/pmndrs/jotai)
- [Zenn - 状態管理ライブラリ Jotaiの使い方](https://zenn.dev/cocomina/articles/how-to-use-jotai)
- [Zenn - React の状態管理ライブラリ Jotai の詳説と Tips](https://zenn.dev/akineko/articles/662bf324a10c82)
- [Qiita - 初学者でも分かるようにJotaiを丁寧に解説していく](https://qiita.com/moritakusan/items/9a5e8c315b2565a02848)
- [Jotai - Playground](https://tutorial.jotai.org/playground)
- []()
- []()
- []()