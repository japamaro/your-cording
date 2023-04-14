
alert('これは架空のwebサイトです。');

// ハンバーガーメニュー
const ham = $('#js-hamburger');
const nav = $('#js-nav');
ham.on('click', function () { //ハンバーガーメニューをクリックしたら
    ham.toggleClass('active'); // ハンバーガーメニューにactiveクラスを付け外し
    nav.toggleClass('active'); // ナビゲーションメニューにactiveクラスを付け外し
});

const link = $('#js-nav li a');
link.on('click', function () { //リンクをクリックしたら
    ham.removeClass('active'); // ハンバーガーメニューにactiveクラスを外し
    nav.removeClass('active'); // ナビゲーションメニューにactiveクラスを外す
});


// アコーディオンメニュー
const details_list = document.querySelectorAll(".js-details");

details_list.forEach(details => {
    const summary = details.querySelector(".js-summary");
    const content = details.querySelector(".content_inner");

    summary.addEventListener("click", (event) => {
        // デフォルトの挙動を無効化
        event.preventDefault();

        // detailsのopen属性を判定
        if (details.open) {
            // アコーディオンを閉じるときの処理
            // アニメーションを実行
            // const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);

            const closingAnim = content.animate([
                {
                    height: content.offsetHeight + 'px',
                    opacity: 1,
                }, {
                    height: 0,
                    opacity: 0,
                }
            ], 300);

            closingAnim.onfinish = () => {
                // アニメーションの完了後にopen属性を取り除く
                details.removeAttribute("open");
            };
        } else {
            // アコーディオンを開くときの処理
            // open属性を付与
            details.setAttribute("open", "true");

            // アニメーションを実行
            content.animate([
                {
                    height: 0,
                    opacity: 0,
                }, {
                    height: content.offsetHeight + 'px',
                    opacity: 1,
                }
            ], {
                duration: 300,
                easing: "ease-out"
            });
        }
    });
})

// swiper
// Swiperに大量のコードが集約されている。
const swiper = new Swiper('.swiper', {
    // ☆永遠にスライドがループする
    loop: true,
    // ☆loop: true,だけだとがたつきが出るのでこれを設定
    loopAditionalSlides: 1,
    autoplay: {
        // ☆次の自動スライドがくるまで4秒かかる
        delay: 4000,
        // ☆自分でそのスライドを動かしても自動再生がオフにならない
        disableOnInteraction: false,
    },
    // ☆0.8秒かけてアニメーション
    speed: 800,
    // ☆スライドがつかめるアイコンになる自分でもスライドを動かせる
    grabCursor: true,
    // ☆ちょうど真ん中にカードか来る設定
    centeredSlides: true,
    // ☆スライド間に余白をつける
    spaceBetween: 56,
    breakpoints: {
        // ☆0ピクセルから700ピクセルの間はスライドを1.2個表示させる。画面幅700ピクセルの時に画面に表示するものを1.2個にする。1にした場合、スライドの間に余白があかないので1以上にする。
        0: {
            slidesPerView: 1.2,
        },
        // ☆700ピクセル以降はauto　swiper-slideで指定した高さ、幅をレスポンシブ対応でも維持させるようにした。
        700: {
            slidesPerView: 'auto',
        },
        1000: {
            slidesPerView: 3,
        },
        1300: {
            slidesPerView: 3.8,
        },
        1500: {
            slidesPerView: 4.0,
        },
    }
});

// AOSフェードイン
AOS.init({
    offset: 150,
    duration: 700,
    easing: "ease-in-out-sine",
    delay: 700
});

// スムーススクロール
$(function () {
    // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
    $('a[href^="#"]').click(function () {
        // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
        var adjust = -90;
        // スクロールの速度（ミリ秒）
        var speed = 1200;
        // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
        var href = $(this).attr("href");
        // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
        var position = target.offset().top + adjust;
        // スムーススクロール linear（等速） or swing（変速）
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });
});


// フォーム

// フォームを記入しないと送信できない
$(document).ready(function () {

    const $submitBtn = $('#js-submit')
    $('#form input,#form textarea').on('change', function () {
        if (
            $('#form input[type="text"]').val() !== "" &&
            $('#form input[type="email"]').val() !== "" &&
            $('#form input[type="checkbox"]').val() !== "" &&
            $('#form #privacyCheck').prop('checked') === true
        ) {
            $submitBtn.prop('disabled', false);

        } else {
            $submitBtn.prop('disabled', true);
        }
    });

});


//   お問合せ完了メッセージを出す
$(document).ready(function () {

    $('#form').submit(function (event) {
        var formData = $('#form').serialize();
        $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSexPYHEuUejbsh6T4WNfih8KUUnTEhki0KPzZGnMoRSK0ALTg/formResponse",
            data: formData,
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function () {
                    $(".end-message").slideDown();
                    $(".submit-btn").fadeOut();
                    //window.location.href = "thanks.html";
                },
                200: function () {
                    $(".false-message").slideDown();
                }
            }
        });
        event.preventDefault();
    });

});


// プライバシーポリシーモーダルウィンドウ
$(function () {
    // 変数に要素を入れる
    var open = $('.modal-open'),
        close = $('.modal-close'),
        container = $('.modal-container');

    //開くボタンをクリックしたらモーダルを表示する
    open.on('click', function () {
        container.addClass('active');
        return false;
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.on('click', function () {
        container.removeClass('active');
    });

    //モーダルの外側をクリックしたらモーダルを閉じる
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.modal-body').length) {
            container.removeClass('active');
        }
    });
});


