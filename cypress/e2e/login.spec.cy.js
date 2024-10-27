describe('Rakuten Login Page Tests', () => {
  // Test Case 1: Login with valid credentials
  it('should login with valid credentials', () => {
    cy.visit('https://login.account.rakuten.com/sso/authorize?client_id=rakuten_ichiba_top_web&service_id=s245&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fwww.rakuten.co.jp%2F#/sign_in');

    // ユーザーIDを入力
    cy.get('input[name="username"]').type('your_username'); // ユーザーIDの入力フィールドを指定
    cy.contains('[role="button"]', '次へ').should('be.visible').click();

    // パスワードの入力フィールドが表示されるまで待機
    cy.get('input[name="password"]').should('be.visible'); // パスワード入力フィールドを確認
    cy.get('input[name="password"]').type('your_password'); // パスワードを入力
    cy.contains('button', 'ログイン').click(); // ログインボタンをクリック

    // ログイン後に検索ボックスが表示されることを確認
    cy.get('#common-header-search-input').should('be.visible');
  });

  // Test Case 2: Login with invalid credentials
  it('should show error for invalid credentials', () => {
    cy.visit('https://login.account.rakuten.com/sso/authorize?client_id=rakuten_ichiba_top_web&service_id=s245&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fwww.rakuten.co.jp%2F#/sign_in');

    // 無効なユーザーIDの入力
    cy.get('input[name="username"]').type('invalid_username');
    cy.contains('[role="button"]', '次へ').should('be.visible').click(); // 次へボタンをクリック

    // エラーメッセージが表示されるか確認します
    cy.get('.error-message-class') // エラーメッセージのクラス名を適切に設定
      .should('be.visible')
      .and('contain', 'ユーザIDまたはメールアドレスに誤りがあるか、登録されていません。この問題が解決しない場合は、こちらからカスタマーサポートにお問い合わせください。'); // エラーメッセージの内容を確認
  });

  // Test Case 3: Logout
  it('should logout successfully', () => {
    // ログイン手順
    cy.visit('https://login.account.rakuten.com/sso/authorize?client_id=rakuten_ichiba_top_web&service_id=s245&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fwww.rakuten.co.jp%2F#/sign_in');
    cy.get('input[name="username"]').type('your_username'); // ユーザー名を入力
    cy.contains('[role="button"]', '次へ').should('be.visible').click(); // 次へボタンをクリック

    cy.get('input[name="password"]').type('your_password'); // パスワードを入力
    cy.get('button[type="submit"]').click();

    // ログイン後の画面で「会員情報」リンクが表示されていることを確認し、クリック
    cy.contains('span', '会員情報').click(); // "会員情報"を含むspanタグをクリック

    // 遷移したページのURLが会員情報ページであることを確認
    cy.url().should('include', 'https://my.rakuten.co.jp/?l-id=top_normal_myrakuten_account');

    // ログアウトボタンを押下してログアウト
    cy.contains('ログアウト').click(); // "ログアウト"のテキストを含む要素をクリック

    // ログアウト後のURLがログアウトページであることを確認
    cy.url().should('include', 'https://member.id.rakuten.co.jp/rms/nid/logout');

  });
});
