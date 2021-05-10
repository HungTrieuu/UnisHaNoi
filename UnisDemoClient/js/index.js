$(document).ready(function () {
  if (onZone) {
    adjustClientZone();
  } else {
    adjustClientMain();
  }

  $(window).resize(() => {
    // if (onZone) {
    //   adjustClientZone();
    // }
  });

  $(".zone").on("click", ".answer", function ($event) {
    $(this).find(".check").removeClass("display-none");

    const questionName = questionsMoc.find(
      (x) => x.Name === $(this).attr("name")
    );
    if (questionName) {
      if (!isMuted) {
        $(".sound-found")[0].play();
      }
      questionName.Done = true;
      setScoreFrame();

      setQuestionFrame();

      if (!questionsMoc.find((x) => !x.Done)) {
        if (!isMuted) {
          $(".sound-congratulation")[0].play();
        }

        showCongratulationForm();
      }
    }
  });

  $(".sound-on").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-off").removeClass("display-none");
    isMuted = true;
  });

  $(".sound-off").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-on").removeClass("display-none");
    isMuted = false;
  });

  $(".zone-selection .title-wrap").click(function () {
    $(
      `[name='${$(this).closest(".zone-selection").attr("zone")}']`
    ).removeClass("display-none");
    $(`.main`).addClass("display-none");
    onZone = true;
    restartZone();
    adjustClientZone();
  });

  $(".zone").on("click", ".congratulation-form .home", function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone").on("click", ".congratulation-form .bonus", function ($event) {
    $(".congratulation-form").remove();
    showBonusForm();
  });

  $(".zone").on("click", ".bonus-form .home", function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone").on("click", ".popup .close", function ($event) {
    $(this).closest(".popup").remove();
  });

  $(".zone-selection").mouseenter(function () {
    $(".main .mask").removeClass("display-none");
  });

  $(".zone-selection").mouseleave(function () {
    $(".main .mask").addClass("display-none");
  });

  $(".zone .question-form .phelix").click(function ($event) {
    $(this).siblings(".frame").toggleClass("display-none");
    $(this).siblings(".question-text").toggleClass("display-none");
    $(this).closest(".question-form").toggleClass("size-auto");
    $(this).toggleClass("colapse");
  });
});
