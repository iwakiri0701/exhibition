$(function () {
  $(".js-fade").on("inview", function () {
    $(this).addClass("inview");
  });
});

function mv_scale(scroll) {
  // window.innerWidthで画面幅を取得
  // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
  if (window.innerWidth > 900) {
    // メインビジュアルのCSS（width）を変更する
    // widthの値をスクロール量にあわせて増やすことで画像を拡大させる
    $(".fv img").css({
      width: 100 / 3 + scroll / 10 + "%",
    });
    // スマホ表示の場合の処理（画面幅が900px以下の場合）
  } else {
    // メインビジュアルのCSS（width）を変更する
    // widthの値をスクロール量にあわせて減らすことで画像を縮小させる
    $(".fv img").css({
      width: 100 - scroll / 10 + "%",
    });
  }
}

$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".menu_button").on("click", function () {
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });
  // メニューのリンクをクリックした時
  $(".menu a").on("click", function () {
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });

  /*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function () {
    // リンクを取得
    let href = $(this).attr("href");
    // ジャンプ先のid名をセット
    let target = $(href == "#" || href == "" ? "html" : href);
    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    return false;
  });

  /*=================================================
  フェード表示
  ===================================================*/
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      // 要素（inviewクラス）が表示されたらshowクラスを追加する
      $(this).stop().addClass("show");
    }
  });

  /*=================================================
  スクロール時のイベント
  ===================================================*/
  $(window).scroll(function () {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();

    /*=================================================
    メインビジュアルの拡大・縮小
    ===================================================*/
    mv_scale(scroll);

    /*=================================================
    ロゴ、ハンバーガーメニューの表示
    ===================================================*/
    // スクロール位置が520pxを超えた場合
    if (scroll > 520) {
      // ロゴとハンバーガ―メニュをfadeInで表示する
      $(".logo").fadeIn(500);
      $(".menu_button").fadeIn(500);
      // スクロール位置が520px未満の場合
    } else {
      // ロゴとハンバーガ―メニュをfadeOutで非表示にする
      $(".logo").fadeOut(500);
      $(".menu_button").fadeOut(500);
    }

    /*=================================================
    サイドボタンを表示
    ===================================================*/
    // 画面下から#galleryまでの距離を取得
    let gallery_position = $("#gallery").offset().top - $(window).height();
    // 画面下から#accessまでの距離を取得
    let access_position = $("#access").offset().top - $(window).height();

    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
    if (window.innerWidth > 900) {
      // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
      if (scroll > gallery_position) {
        // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
        if (scroll < access_position) {
          $(".side_btn").css({
            transform: "rotate(-90deg) translateY(0)",
          });
          // #accessが表示されたら、#side-btnをスライドさせて非表示にする
        } else {
          $(".side_btn").css({
            transform: "rotate(-90deg) translateY(60px)",
          });
        }
        // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
      } else {
        $(".side_btn").css({
          transform: "rotate(-90deg) translateY(60px)",
        });
      }
    }

    let contact_position = $("#contact").offset().top - $(window).height();

    if (scroll > access_position) {
      if (scroll < contact_position) {
        $(".access_bg").fadeIn(500);
      } else {
        $(".access_bg").fadeOut(500);
      }
    } else {
      $(".access_bg").fadeOut(500);
    }
  });

  /*=================================================
  画面読み込み時と画面幅変更時のイベント
  ===================================================*/
  $(window).on("load resize", function () {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();

    /*=================================================
    メインビジュアルの拡大・縮小
    ===================================================*/
    mv_scale(scroll);
  });
});

/*=================================================
ハンバーガ―メニュー（共通処理）
===================================================*/
// ハンバーガーメニューをクリックした時とメニュー内のリンクをクリックした時の
// 処理が同じなので処理を共通化する
function hamburger() {
  // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
  // 存在しない場合を追加する処理を自動で行ってくれる
  $(".menu_button").toggleClass("active");

  if ($(".menu_button").hasClass("active")) {
    // hamburgerクラスにactiveクラスが存在する場合は、naviにもactiveクラスを追加する
    $(".menu").addClass("active");
  } else {
    // hamburgerクラスにactiveクラスが存在しない場合は、naviからactiveクラスを削除する
    $(".menu").removeClass("active");
  }
}

/*=================================================
メインビジュアルの拡大・縮小（共通処理）
===================================================*/
function mv_scale(scroll) {
  // window.innerWidthで画面幅を取得
  // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
  if (window.innerWidth > 900) {
    // メインビジュアルのCSS（width）を変更する
    // widthの値をスクロール量にあわせて増やすことで画像を拡大させる
    $(".fv img").css({
      width: 100 / 3 + scroll / 10 + "%",
    });
    // スマホ表示の場合の処理（画面幅が900px以下の場合）
  } else {
    // メインビジュアルのCSS（width）を変更する
    // widthの値をスクロール量にあわせて減らすことで画像を縮小させる
    $(".fv img").css({
      width: 100 - scroll / 10 + "%",
    });
  }
}
